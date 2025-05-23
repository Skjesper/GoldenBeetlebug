"use client";

import React, {
  createContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
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

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [input, setInput] = useState<string>("");
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [encouragement, setEncouragementState] = useState<EncouragementMessage>(
    {
      text: "",
      visible: false,
    }
  );
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const setEncouragement = (text: string, visible: boolean) => {
    setEncouragementState({ text, visible });
  };

  const resetGame = () => {
    setInput("");
    setHasWon(false);
    setAttempts(0);
    setEncouragement("", false);
    setHasPaid(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const encouragingMessages: Array<(text: string) => string> = [
    (text: string) => `"${text}" is simmering, but not quite done!`,
    (text: string) => `Wow, "${text}" is a tasty guess!`,
    (text: string) => `"${text}" is an interesting ingredient!`,
    (text: string) => `"${text}" is, sadly, not Paneer.`,
    (text: string) => `"${text}?" Really? Why not Paneer?`,
  ];

  return (
    <GameContext.Provider
      value={{
        input,
        setInput,
        hasWon,
        setHasWon,
        attempts,
        setAttempts,
        encouragement,
        setEncouragement,
        hasPaid,
        setHasPaid,
        isProcessing,
        setIsProcessing,
        paymentError,
        setPaymentError,
        jwtToken,
        setJwtToken,
        inputRef,
        typingTimerRef,
        resetGame,
        encouragingMessages,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
