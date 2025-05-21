import jwt from "jsonwebtoken";

export interface DecodedToken {
  id: string;
  [key: string]: any;
}

export interface AuthResponse {
  userId?: string;
  authenticated?: boolean;
  error?: string;
}

/**
 * Verifies a JWT token on the server side
 * @param token JWT token
 * @param secretKey Secret key for verification
 * @returns Auth response with user ID and authentication status
 */
export function verifyToken(token: string, secretKey: string): AuthResponse {
  try {
    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    return {
      userId: decoded.id,
      authenticated: true,
    };
  } catch (error) {
    return {
      error: "Invalid token",
      authenticated: false,
    };
  }
}

/**
 * Decodes a JWT token without verification (client-side)
 * @param token JWT token string
 * @returns Decoded payload or null if decoding fails
 */
export function decodeJwt(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payloadB64 = parts[1];

    const base64 = payloadB64.replace(/-/g, "+").replace(/_/g, "/");

    const rawPayload =
      typeof window !== "undefined"
        ? window.atob(base64)
        : Buffer.from(base64, "base64").toString("utf-8");

    const jsonPayload = JSON.parse(rawPayload);

    return jsonPayload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
