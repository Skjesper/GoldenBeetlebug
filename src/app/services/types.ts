export interface EncouragementMessage {
    text: string;
    visible: boolean;
  }
  
  export interface PaymentResponse {
    success: boolean;
    hasSufficientBalance: boolean;
    transactionId?: string;
    message?: string;
    error?: string;
  }
  
  export type EncouragementGenerator = (text: string) => string;
  
  export interface GameConfig {
    AMUSEMENT_ID: number;
    GROUP_ID: number;
    COST: number;
    CURRENCY: string;
    STAMP_ID: number;
  }
  