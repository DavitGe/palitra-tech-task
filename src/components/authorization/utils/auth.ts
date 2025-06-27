import type { AuthState, UserInfo } from "../types/auth.types";
import { getCookie, clearAuthCookies, COOKIE_NAMES } from "./cookies";

export function getAuthState(): AuthState {
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  const refreshToken = getCookie(COOKIE_NAMES.REFRESH_TOKEN);
  const userInfoStr = getCookie(COOKIE_NAMES.USER_INFO);

  let user: UserInfo | null = null;
  if (userInfoStr) {
    try {
      user = JSON.parse(userInfoStr);
    } catch (error) {
      console.error("Failed to parse user info from cookie:", error);
      clearAuthCookies();
    }
  }

  const isAuthenticated = !!(accessToken && refreshToken && user);

  return {
    isAuthenticated,
    user,
    accessToken,
    refreshToken,
  };
}

export function logout(): void {
  clearAuthCookies();
  // Router will automatically redirect to auth page since user is no longer authenticated
  // No need to manually reload the page
}

// Enhanced logout function that can work with navigation
export function logoutWithRedirect(navigateFn?: (path: string) => void): void {
  clearAuthCookies();
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
  const userInfoStr = getCookie(COOKIE_NAMES.USER_INFO);
  if (!userInfoStr) return null;

  try {
    return JSON.parse(userInfoStr);
  } catch (error) {
    console.error("Failed to parse user info:", error);
    return null;
  }
}

// Helper function to add authorization header to fetch requests
export function createAuthHeaders(): HeadersInit {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
