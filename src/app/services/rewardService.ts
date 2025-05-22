// import { GAME_CONFIG } from "./gameConfig";

// export interface RewardResult {
//   success: boolean;
//   message?: string;
//   error?: string;
//   transactionId?: string;
// }

// type RewardType = "cash" | "stamp";

// export async function processReward(
//   jwtToken: string | null,
//   rewardType: RewardType
// ): Promise<RewardResult> {
//   if (!jwtToken) {
//     return {
//       success: false,
//       error: "No JWT token available",
//     };
//   }

//   try {
//     let transactionPayload;

//     if (rewardType === "cash") {
//       transactionPayload = {
//         amusement_id: GAME_CONFIG.AMUSEMENT_ID,
//         payout_amount: 3.0,
//       };
//     } else {
     
//       transactionPayload = {
//         amusement_id: GAME_CONFIG.AMUSEMENT_ID,
//         stamp_id: GAME_CONFIG.STAMP_ID,
//       };
//     }

//     console.log("Sending transaction payload:", transactionPayload);

//     const response = await fetch("/api/transactions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       body: JSON.stringify(transactionPayload),
//     });

//     if (!response.ok) {
//       let errorData;
//       try {
//         errorData = await response.json();
//       } catch (e) {
//         const text = await response.text();
//         throw new Error(
//           text || `Request failed with status ${response.status}`
//         );
//       }

//       // Extract error message from data
//       const errorMessage =
//         errorData.error ||
//         errorData.message ||
//         errorData.errors?.message ||
//         JSON.stringify(errorData.errors) ||
//         "Unknown error";

//       throw new Error(errorMessage);
//     }

//     const data = await response.json();

//     return {
//       success: true,
//       message:
//         rewardType === "cash"
//           ? "You received a €3 reward!"
//           : "You received a new stamp for your collection!",
//       transactionId: data?.transaction?.id || data?.id || `tx-${Date.now()}`,
//     };
//   } catch (error) {
//     console.error("Reward processing error:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Reward failed",
//     };
//   }
// }
