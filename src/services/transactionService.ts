import { GAME_CONFIG } from "./gameConfig";

export interface TransactionResult {
  success: boolean;
  message?: string;
  error?: string;
  transactionId?: string;
}

export interface TransactionPayload {
  amusement_id: number;
  stake_amount?: number;
  payout_amount?: number;
  stamp_id?: number;
}

export interface TransactionResponse {
  success: boolean;
  transaction_id?: string;
  message?: string;
  error?: string;
}

// Generic function to create any transaction with a custom payload
export async function createTransaction(
  payload: TransactionPayload,
  token: string | null
): Promise<TransactionResponse> {
  try {
    if (!token) {
      throw new Error("No authentication token provided");
    }

    console.log("Creating transaction with payload:", payload);

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Get raw text response first for debugging
    const responseText = await response.text();
    console.log("Transaction raw response:", responseText);

    // Try to parse as JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("Failed to parse response:", responseText);
      throw new Error(`Invalid response format: ${responseText}`);
    }

    if (!response.ok) {
      throw new Error(
        data.error ||
          data.message ||
          `Transaction failed with status: ${response.status}`
      );
    }

    return {
      success: true,
      transaction_id: data?.id || data?.transaction?.id,
      message: data?.message || "Transaction completed successfully",
    };
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}

// Main function to process payment
export async function processPayment(
  jwtToken: string | null
): Promise<TransactionResult> {
  if (!jwtToken) {
    return {
      success: false,
      error: "No JWT token available",
    };
  }

  try {
    const result = await createTransaction(
      {
        amusement_id: GAME_CONFIG.AMUSEMENT_ID,
        stake_amount: GAME_CONFIG.COST,
      },
      jwtToken
    );

    return {
      success: result.success,
      message: "Payment successful",
      transactionId: result.transaction_id,
    };
  } catch (error) {
    console.error("Payment processing error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Payment failed",
    };
  }
}

// Function to process rewards (cash or stamp)
export async function processReward(
  jwtToken: string | null,
  rewardType: "cash" | "stamp"
): Promise<TransactionResult> {
  if (!jwtToken) {
    return {
      success: false,
      error: "No JWT token available",
    };
  }

  try {
    let payload: TransactionPayload;

    if (rewardType === "cash") {
      payload = {
        amusement_id: GAME_CONFIG.AMUSEMENT_ID,
        payout_amount: 2.0,
      };
    } else {
      // For stamp rewards
      payload = {
        amusement_id: GAME_CONFIG.AMUSEMENT_ID,
        payout_amount: 0.1, // Small amount required for stamp transactions
        stamp_id: GAME_CONFIG.STAMP_ID,
      };
    }

    console.log(
      `Creating ${rewardType} reward transaction with payload:`,
      payload
    );

    const result = await createTransaction(payload, jwtToken);

    return {
      success: result.success,
      message:
        rewardType === "cash"
          ? "You received a €2 reward!"
          : "You received a new stamp for your collection!",
      transactionId: result.transaction_id,
    };
  } catch (error) {
    console.error(`${rewardType} reward processing error:`, error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : `${rewardType} reward failed`,
    };
  }
}
