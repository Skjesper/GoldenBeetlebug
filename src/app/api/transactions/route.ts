import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Extract the JWT token from Authorization header
    const authHeader = request.headers.get("Authorization");
    console.log("Auth header:", authHeader);

    const authToken = authHeader?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "No JWT token provided" },
        { status: 401 }
      );
    }

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API key not configured on server");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const payload = await request.json();

    // Add debug logging for the payload
    console.log("Transaction payload received:", payload);

    // Get the base URL from environment or use default
    const baseUrl = process.env.API_URL || "http://localhost:8000";

    // Ensure the URL is properly formatted with /api/transactions
    const apiUrl = baseUrl.endsWith("/api")
      ? `${baseUrl}/transactions`
      : `${baseUrl}/api/transactions`;

    console.log(`Forwarding request to ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    // Get response body as text first to help with debugging
    const text = await response.text();
    console.log("Response from external API:", text);

    // Try to parse the response as JSON
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      return NextResponse.json(
        { error: "Invalid JSON response from external API", rawResponse: text },
        { status: 502 }
      );
    }

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        (data?.errors ? JSON.stringify(data.errors) : null) ||
        `Transaction failed with status: ${response.status}`;

      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Transaction processing error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Server error during transaction processing",
      },
      { status: 500 }
    );
  }
}
