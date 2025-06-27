// This file demonstrates how to use the authentication system
// You can delete this file after understanding the usage

import {
  signInHandler,
  getAuthState,
  logout,
  createAuthHeaders,
} from "../index";

// Example 1: Sign in a user
export async function exampleSignIn() {
  const result = await signInHandler({
    username: "emilys",
    password: "emilyspass",
  });

  if (result.success) {
    console.log("User signed in successfully:", result.user);
  } else {
    console.error("Sign in failed:", result.error);
  }
}

// Example 2: Check authentication state
export function exampleCheckAuth() {
  const authState = getAuthState();

  if (authState.isAuthenticated) {
    console.log("User is authenticated:", authState.user);
    console.log("Access token available:", !!authState.accessToken);
  } else {
    console.log("User is not authenticated");
  }
}

// Example 3: Make an authenticated API request
export async function exampleAuthenticatedRequest() {
  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        ...createAuthHeaders(),
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      console.log("Current user data:", userData);
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error making authenticated request:", error);
  }
}

// Example 4: Logout user
export function exampleLogout() {
  logout(); // This will clear cookies and reload the page
}
