export interface DecodedToken {
  id: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export interface AuthResponse {
  userId?: string;
  authenticated?: boolean;
  error?: string;
}

/**
 * Verifies a JWT token on the client side
 * @param token JWT token
 * @returns Auth response with user ID and authentication status
 */
export function verifyToken(token: string): AuthResponse {
  try {
    const decoded = decodeJwt(token);

    if (!decoded || !decoded.id) {
      throw new Error("Invalid token format");
    }

    return {
      userId: decoded.id,
      authenticated: true,
    };
  } catch (err) {
    console.error(err);
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
export function decodeJwt(token: string): DecodedToken | null {
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

    return jsonPayload as DecodedToken;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
