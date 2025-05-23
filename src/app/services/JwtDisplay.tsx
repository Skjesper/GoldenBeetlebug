'use client'
import { useEffect, useState } from "react";
import { useGameContext } from "./useGameContext";
import { decodeJwt } from "./auth";

export default function JwtDisplay() {
  const { jwtToken, setJwtToken } = useGameContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "*",
          'https://yrgobanken.vip/',
          "https://tivoli.yrgobanken.vip"
        ];

        if (!allowedOrigins.includes(event.origin)) {
          
          return;
        }

        if (event.data && event.data.type === "JWT_TOKEN") {
          const { token } = event.data;

          setJwtToken(token);
          console.log("JWT token set");
          const decoded = decodeJwt(token);
          if (decoded) {
            setError(null);
          } else {
            setError("Failed to decode token");
          }

          
        }
      } catch (err) {
        console.error("Error processing message:", err);
        setError("Error processing message from parent application");
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent !== window) {
      window.parent.postMessage({ type: "GAME_READY" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setJwtToken]);

  if (!jwtToken) {
    return null;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
        <p className="text-sm text-red-700">Error: {error}</p>
      </div>
    );
  }

  return null;
}