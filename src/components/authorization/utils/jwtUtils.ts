import { decodeJwt } from "jose";
import type { JWTPayload, TokenStore } from "../types/auth.types";

/**
 * Decode and validate a JWT token
 * @param token - The JWT token string
 * @returns TokenStore object with decoded data and validation status
 */
export function decodeAndValidateToken(token: string): TokenStore {
  try {
    // Decode the JWT token
    const decoded = decodeJwt(token) as JWTPayload;

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const isExpired = decoded.exp < currentTime;

    // Create expiration date
    const expiresAt = new Date(decoded.exp * 1000);

    return {
      decodedToken: decoded,
      isValid: !isExpired,
      expiresAt,
    };
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return {
      decodedToken: null,
      isValid: false,
      expiresAt: null,
    };
  }
}

/**
 * Check if a JWT token is valid (not expired and properly formatted)
 * @param token - The JWT token string
 * @returns boolean indicating if token is valid
 */
export function isJWTValid(token: string): boolean {
  try {
    const decoded = decodeJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp ? decoded.exp > currentTime : false;
  } catch (error) {
    console.error("JWT validation failed:", error);
    return false;
  }
}

/**
 * Get expiration time from JWT token
 * @param token - The JWT token string
 * @returns Date object or null if invalid
 */
export function getJWTExpiration(token: string): Date | null {
  try {
    const decoded = decodeJwt(token);
    return decoded.exp ? new Date(decoded.exp * 1000) : null;
  } catch (error) {
    console.error("Failed to get JWT expiration:", error);
    return null;
  }
}

/**
 * Get user info from JWT token
 * @param token - The JWT token string
 * @returns Decoded JWT payload or null if invalid
 */
export function getUserFromJWT(token: string): JWTPayload | null {
  try {
    return decodeJwt(token) as JWTPayload;
  } catch (error) {
    console.error("Failed to get user from JWT:", error);
    return null;
  }
}
