// API utility function that automatically adds bearer token to requests

import { getAccessToken } from "../components/authorization/utils/auth";

type TokenProvider = () => string | null | Promise<string | null>;

// Default token provider - gets token from cookies using existing auth utils
const defaultTokenProvider: TokenProvider = () => {
  return getAccessToken();
};

// Configuration for the API
interface ApiConfig {
  tokenProvider?: TokenProvider;
  baseURL?: string;
}

let config: ApiConfig = {
  tokenProvider: defaultTokenProvider,
};

// Configure the API
export const configureApi = (newConfig: Partial<ApiConfig>) => {
  config = { ...config, ...newConfig };
};

// Main API function that wraps fetch with automatic bearer token
export const $api = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  // Get the token
  const token = await config.tokenProvider?.();

  // Prepare headers
  const headers = new Headers(init?.headers);

  // Add bearer token if available
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Add default content-type if not specified and body is present
  if (init?.body && !headers.has("Content-Type")) {
    // Only set JSON content-type for objects, not FormData or strings
    if (typeof init.body === "object" && !(init.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
  }

  // Construct the full URL if baseURL is configured
  let url = input;
  if (
    config.baseURL &&
    typeof input === "string" &&
    !input.startsWith("http")
  ) {
    url = `${config.baseURL.replace(/\/$/, "")}/${input.replace(/^\//, "")}`;
  }

  // Make the request with modified headers
  return fetch(url, {
    ...init,
    headers,
  });
};

// Convenience methods for common HTTP methods
export const api = {
  get: (url: string, init?: Omit<RequestInit, "method">) =>
    $api(url, { ...init, method: "GET" }),

  post: (
    url: string,
    data?: any,
    init?: Omit<RequestInit, "method" | "body">
  ) =>
    $api(url, {
      ...init,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: (url: string, data?: any, init?: Omit<RequestInit, "method" | "body">) =>
    $api(url, {
      ...init,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: (
    url: string,
    data?: any,
    init?: Omit<RequestInit, "method" | "body">
  ) =>
    $api(url, {
      ...init,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: (url: string, init?: Omit<RequestInit, "method">) =>
    $api(url, { ...init, method: "DELETE" }),
};

export default $api;
