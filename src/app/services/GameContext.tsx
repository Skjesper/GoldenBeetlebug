"use client";

import { createContext } from "react";
import type { EncouragementMessage, EncouragementGenerator } from "./types";

interface GameContextProps {
  input: string;
  setInput: (input: string) => void;
  hasWon: boolean;
  setHasWon: (hasWon: boolean) => void;
  attempts: number;
  setAttempts: (attempts: number) => void;
  encouragement: EncouragementMessage;
  setEncouragement: (text: string, visible: boolean) => void;
  hasPaid: boolean;
  setHasPaid: (hasPaid: boolean) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  typingTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
  resetGame: () => void;
  encouragingMessages: EncouragementGenerator[];
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);