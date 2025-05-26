import React, { useState } from "react";
import { useGameContext } from "./useGameContext";
import { processReward } from "./transactionService";
import Button from './../components/Button'
interface WinnerRewardsProps {
  onRewardClaimed: () => void;
  score: number;
}

const WinnerRewards: React.FC<WinnerRewardsProps> = ({ onRewardClaimed, score }) => {
  const { jwtToken } = useGameContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCashReward = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      console.log(
        jwtToken ? "Token exists" : "No token"
      );
      const result = await processReward(jwtToken, "cash");

      if (result.success) {
        setSuccessMessage(`Du har fått €3 och en stamp!`);
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
        jwtToken ? "Token exists" : "No token"
      );
      const result = await processReward(jwtToken, "stamp");

      if (result.success) {
        setSuccessMessage(`Du har mottagit en stamp!`);
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
{score > 150 ? (
        <Button
          onClick={handleCashReward}
          disabled={isProcessing}
          className="greenButton"
          >
          Hämta vinst & stamp
        </Button>
  ) : (
        <Button
          onClick={handleStampReward}
          disabled={isProcessing}
          className="greenButton"
          >
         Hämta stamp
        </Button>
 )}

  {error && (
    <div className="mt-4 p-2 bg-red-100 text-red-800 border border-red-300 rounded-lg w-full text-center">
      {error}
    </div>
  )}

</>
  );
};


export default WinnerRewards;