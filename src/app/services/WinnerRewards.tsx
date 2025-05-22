import React, { useState } from "react";
import { useGameContext } from "./GameContext";
import { processReward } from "./transactionService";
import Button from './../components/Button'
import { GameProvider } from "./GameContext";
import { decodeJwt } from "./auth";
import { JwtDisplay } from './JwtDisplay'

interface WinnerRewardsProps {
  onRewardClaimed: () => void;
}

const WinnerRewards: React.FC<WinnerRewardsProps> = ({ onRewardClaimed }) => {
  const { jwtToken } = useGameContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCashReward = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      console.log(
        "Processing cash reward with token:",
        jwtToken ? "Token exists" : "No token"
      );
      const result = await processReward(jwtToken, "cash");

      if (result.success) {
        setSuccessMessage(`You received a €2 reward!`);
        onRewardClaimed();
      } else {
        setError(result.error || "Failed to process cash reward");
      }
    } catch (error) {
      console.error("Cash reward error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStampReward = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      console.log(
        "Processing stamp reward with token:",
        jwtToken ? "Token exists" : "No token"
      );
      const result = await processReward(jwtToken, "stamp");

      if (result.success) {
        setSuccessMessage(`You received a new stamp for your collection!`);
        onRewardClaimed();
      } else {
        setError(result.error || "Failed to process stamp reward");
      }
    } catch (error) {
      console.error("Stamp reward error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  if (successMessage) {
    return (
      <div className="mt-8 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg w-full text-center">
        {successMessage}
      </div>
    );
  }

  return (
<>
<GameProvider>

        <Button
          onClick={handleCashReward}
          disabled={isProcessing}
          >
          cash
        </Button>

        <Button
          onClick={handleStampReward}
          disabled={isProcessing}
          >
         stamp
        </Button>

</GameProvider>

</>
  );
};

export default WinnerRewards;