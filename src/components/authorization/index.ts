// Types
export type {
  AuthResponse,
  LoginCredentials,
  AuthState,
  UserInfo,
} from "./types/auth.types";

// Authentication functions
export { signInHandler } from "./utils/signIn";
export {
  getAuthState,
  logout,
  logoutWithRedirect,
  isAuthenticated,
  getAccessToken,
  getUser,
  createAuthHeaders,
} from "./utils/auth";

// Cookie utilities
export {
  setCookie,
  getCookie,
  deleteCookie,
  clearAuthCookies,
  COOKIE_NAMES,
} from "./utils/cookies";

// Components
export { default as SignUpForm } from "./SignUpForm";
