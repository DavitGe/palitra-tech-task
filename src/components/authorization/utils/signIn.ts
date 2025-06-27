import type {
  AuthResponse,
  LoginCredentials,
  UserInfo,
} from "../types/auth.types";
import { setCookie, COOKIE_NAMES } from "./cookies";

export async function signInHandler(credentials: LoginCredentials): Promise<{
  success: boolean;
  user?: UserInfo;
  error?: string;
}> {
  try {
    const response = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30, // optional, defaults to 60
      }),
    });

    // Try to parse the response body
    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      // If we can't parse the response, return a generic error
      throw new Error(
        `Server error: Unable to process response (${response.status})`
      );
    }

    if (!response.ok) {
      // Extract error message from API response
      const errorMessage =
        responseData.message ||
        responseData.error ||
        `Login failed: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const authData: AuthResponse = responseData;

    // Store tokens in cookies
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, authData.accessToken, 7); // 7 days
    setCookie(COOKIE_NAMES.REFRESH_TOKEN, authData.refreshToken, 30); // 30 days

    // Store user info in cookies
    const userInfo: UserInfo = {
      id: authData.id,
      username: authData.username,
      email: authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      gender: authData.gender,
      image: authData.image,
    };

    setCookie(COOKIE_NAMES.USER_INFO, JSON.stringify(userInfo), 7);

    return {
      success: true,
      user: userInfo,
    };
  } catch (error) {
    console.error("Sign in error:", error);

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Network error: Please check your internet connection",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
