import { useEffect, useState } from "react";
import { useGameContext } from "./GameContext";
import { decodeJwt } from "./auth";

/**
 * Component to receive and display JWT token from parent application
 */
export default function JwtDisplay() {
  const { jwtToken, setJwtToken } = useGameContext();
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "*",
          "https://tivoli.yrgobanken.vip"
        ];

        if (!allowedOrigins.includes(event.origin)) {
          console.log(
            `Ignoring message from unauthorized origin: ${event.origin}`
          );
          return;
        }

        if (event.data && event.data.type === "JWT_TOKEN") {
          const { token } = event.data;

          setJwtToken(token);

          console.log("JWT token set in context:", token);
          const decoded = decodeJwt(token);
          if (decoded) {
            setDecodedToken(decoded);
            setError(null);
          } else {
            setError("Failed to decode token");
          }

          console.log("Received JWT token from parent application");
        }
      } catch (err) {
        console.error("Error processing message:", err);
        setError("Error processing message from parent application");
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent !== window) {
      window.parent.postMessage({ type: "GAME_READY" }, "*");
      console.log("Game ready message sent to parent");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setJwtToken]);

  if (!jwtToken) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
        <p className="text-sm text-yellow-700">
          Waiting for JWT token from parent application...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
        <p className="text-sm text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg border-2 border-[#e0d5c5] mb-6">
      <h2 className="text-xl font-bold mb-3">JWT Token Information</h2>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Raw Token:</h3>
        <div className="bg-gray-50 p-3 rounded overflow-auto max-h-24">
          <p className="text-xs font-mono break-all">{jwtToken}</p>
        </div>
      </div>

      {decodedToken && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Decoded Content:
          </h3>
          <div className="bg-gray-50 p-3 rounded overflow-auto max-h-80">
            <pre className="text-xs font-mono whitespace-pre-wrap">
              {JSON.stringify(decodedToken, null, 2)}
            </pre>
          </div>

          {decodedToken.exp && (
            <div className="mt-3 text-xs">
              <p>
                <span className="font-medium">Expires:</span>{" "}
                {new Date(decodedToken.exp * 1000).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}