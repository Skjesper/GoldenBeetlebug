import { GAME_CONFIG } from "./gameConfig";


export interface PaymentResult {
  success: boolean;
  message?: string;
  error?: string;
  transactionId?: string;
}

export async function processPayment(
  jwtToken: string | null
): Promise<PaymentResult> {
  if (!jwtToken) {
    return {
      success: false,
      error: "No JWT token available",
    };
  }

  try {
    const transactionPayload = {
      amusement_id: GAME_CONFIG.AMUSEMENT_ID,
      stake_amount: GAME_CONFIG.COST,
    };

    console.log("Creating transaction with payload:", transactionPayload);

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(transactionPayload),
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(
        data.error || `Payment failed with status: ${response.status}`
      );
    }

    return {
      success: true,
      message: "Payment successful",
      transactionId: data?.id || data?.transaction?.id || `tx-${Date.now()}`,
    };
  } catch (error) {
    console.error("Payment processing error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Payment failed",
    };
  }
}