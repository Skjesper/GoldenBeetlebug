import type { GameConfig } from "./types";

export const GAME_CONFIG: GameConfig = {
  AMUSEMENT_ID: 11, // Default value, override with env if available
  GROUP_ID: 8,
  COST: 2.0,
  CURRENCY: "EUR",
  STAMP_ID: 1, // Default value, override with env if available
};

console.log("Game configuration:", GAME_CONFIG);
