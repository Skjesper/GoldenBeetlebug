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
   * Verifies a JWT token on the client side
   * @param token JWT token
   * @param secretKey Secret key for verification (note: client-side verification is less secure)
   * @returns Auth response with user ID and authentication status
   */
  export function verifyToken(token: string): AuthResponse {
    try {
      // För klientsidan använder vi främst decodeJwt och litar på token
      // OBS: Detta är mindre säkert än server-verifiering men fungerar för klientsida
      const decoded = decodeJwt(token);
      
      if (!decoded || !decoded.id) {
        throw new Error("Invalid token format");
      }
  
      // På klientsidan kan vi inte verifiera signaturen ordentligt utan ytterligare bibliotek
      return {
        userId: decoded.id,
        authenticated: true, // Obs: Vi antar att token är giltig eftersom vi inte kan verifiera
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