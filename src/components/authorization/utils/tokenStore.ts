import type { TokenStore, JWTPayload } from "../types/auth.types";

// Global token store - accessible from anywhere
let globalTokenStore: TokenStore = {
  decodedToken: null,
  isValid: false,
  expiresAt: null,
};

// Getter function to access token data from anywhere
export function getTokenData(): TokenStore {
  return { ...globalTokenStore };
}

// Setter function to update token data
export function setTokenData(tokenData: TokenStore): void {
  globalTokenStore = { ...tokenData };
}

// Helper function to get decoded token payload
export function getDecodedToken(): JWTPayload | null {
  return globalTokenStore.decodedToken;
}

// Helper function to check if token is valid
export function isTokenValid(): boolean {
  return globalTokenStore.isValid;
}

// Helper function to get token expiration
export function getTokenExpiration(): Date | null {
  return globalTokenStore.expiresAt;
}

// Clear token data
export function clearTokenData(): void {
  globalTokenStore = {
    decodedToken: null,
    isValid: false,
    expiresAt: null,
  };
}
