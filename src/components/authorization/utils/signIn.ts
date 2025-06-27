import type {
  AuthResponse,
  LoginCredentials,
  UserInfo,
} from "../types/auth.types";
import { setCookie, COOKIE_NAMES } from "./cookies";

// Constants
const API_CONFIG = {
  LOGIN_URL: "https://dummyjson.com/user/login",
  DEFAULT_EXPIRES_IN_MINS: 30,
  ACCESS_TOKEN_DAYS: 7,
  REFRESH_TOKEN_DAYS: 30,
  USER_INFO_DAYS: 7,
} as const;

const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error: Please check your internet connection",
  PARSE_ERROR: "Server error: Unable to process response",
  UNKNOWN_ERROR: "Unknown error occurred",
} as const;

export async function signInHandler(credentials: LoginCredentials): Promise<{
  success: boolean;
  user?: UserInfo;
  error?: string;
}> {
  try {
    const response = await fetch(API_CONFIG.LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        expiresInMins: API_CONFIG.DEFAULT_EXPIRES_IN_MINS,
      }),
    });

    // Try to parse the response body
    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      // If we can't parse the response, return a generic error
      throw new Error(`${ERROR_MESSAGES.PARSE_ERROR} (${response.status})`);
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
    setCookie(
      COOKIE_NAMES.ACCESS_TOKEN,
      authData.accessToken,
      API_CONFIG.ACCESS_TOKEN_DAYS
    );
    setCookie(
      COOKIE_NAMES.REFRESH_TOKEN,
      authData.refreshToken,
      API_CONFIG.REFRESH_TOKEN_DAYS
    );

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

    setCookie(
      COOKIE_NAMES.USER_INFO,
      JSON.stringify(userInfo),
      API_CONFIG.USER_INFO_DAYS
    );

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
        error: ERROR_MESSAGES.NETWORK_ERROR,
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
}
