import type { AuthState, UserInfo, TokenStore } from "../types/auth.types";
import { getCookie, clearAuthCookies, COOKIE_NAMES } from "./cookies";
import { decodeAndValidateToken } from "./jwtUtils";
import { setTokenData, clearTokenData, getTokenData } from "./tokenStore";

export function getAuthState(): AuthState {
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  const refreshToken = getCookie(COOKIE_NAMES.REFRESH_TOKEN);
  const userInfoStr = getCookie(COOKIE_NAMES.USER_INFO);

  // Initialize token data with default values
  let tokenData: TokenStore = {
    decodedToken: null,
    isValid: false,
    expiresAt: null,
  };

  let user: UserInfo | null = null;
  let isTokenValid = false;

  // Validate and decode JWT token if it exists
  if (accessToken) {
    tokenData = decodeAndValidateToken(accessToken);
    isTokenValid = tokenData.isValid;

    // Store decoded token data in global store
    setTokenData(tokenData);

    // If token is invalid, clear auth data
    if (!isTokenValid) {
      console.warn("Access token is expired or invalid, clearing auth data");
      clearAuthCookies();
      clearTokenData();
      return {
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        tokenData,
      };
    }

    // If JWT is valid, prefer user data from token over cookie
    if (tokenData.decodedToken && tokenData.isValid) {
      const decoded = tokenData.decodedToken;
      user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        gender: "", // JWT might not have gender, fallback to empty string
        image: "", // JWT might not have image, fallback to empty string
      };
    }
  }

  // Fallback to cookie user info if JWT doesn't contain user data or is invalid
  if (!user && userInfoStr) {
    try {
      const cookieUser = JSON.parse(userInfoStr);
      // Only use cookie user if token is valid or if there's no token
      if (isTokenValid || !accessToken) {
        user = cookieUser;
      }
    } catch (error) {
      console.error("Failed to parse user info from cookie:", error);
      clearAuthCookies();
      clearTokenData();
    }
  }

  // User is authenticated if we have valid token, refresh token, and user data
  const isAuthenticated = !!(isTokenValid && refreshToken && user);

  return {
    isAuthenticated,
    user,
    accessToken,
    refreshToken,
    tokenData,
  };
}

export function logout(): void {
  clearAuthCookies();
  clearTokenData(); // Clear the global token store
  // Router will automatically redirect to auth page since user is no longer authenticated
  // No need to manually reload the page
}

// Enhanced logout function that can work with navigation
export function logoutWithRedirect(navigateFn?: (path: string) => void): void {
  clearAuthCookies();
  clearTokenData(); // Clear the global token store
  if (navigateFn) {
    navigateFn("/auth");
  } else {
    // Fallback to reload if no navigation function provided
    window.location.href = "/auth";
  }
}

export function isAuthenticated(): boolean {
  return getAuthState().isAuthenticated;
}

export function getAccessToken(): string | null {
  return getCookie(COOKIE_NAMES.ACCESS_TOKEN);
}

export function getUser(): UserInfo | null {
  // Get user from current auth state (which includes JWT validation)
  return getAuthState().user;
}

// Helper function to add authorization header to fetch requests
export function createAuthHeaders(): HeadersInit {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// New helper function to get token data from global store
export function getGlobalTokenData() {
  return getTokenData();
}
