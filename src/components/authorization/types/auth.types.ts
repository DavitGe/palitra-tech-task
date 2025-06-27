export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// JWT decoded token payload interface
export interface JWTPayload {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number; // issued at
  exp: number; // expiration time
  [key: string]: any; // for any additional claims
}

// Global token store interface
export interface TokenStore {
  decodedToken: JWTPayload | null;
  isValid: boolean;
  expiresAt: Date | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenData: TokenStore; // Add decoded token information
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
