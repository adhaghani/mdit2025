"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useStartCountdown } from "@/hooks/useStartVoteCountdown";

// Centralized dates for the competition
const COMPETITION_DATES = {
  VOTE_OPENING_TIME: "2025-10-17T13:00:00+08:00", // October 17, 2025, 1.00 PM GMT+8
  VOTE_CLOSING_TIME: "2025-10-17T20:00:00+08:00", // October 17, 2025, 8.00 PM GMT+8
} as const;

interface CountdownContextType {
  // Main competition countdown
  hasVoteStarted: boolean;
  isExpired: boolean;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

  // Registration countdown
  timeUntilRegistration: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };

  // Dates for reference
  dates: typeof COMPETITION_DATES;
}

const CountdownContext = createContext<CountdownContextType | undefined>(
  undefined
);

interface CountdownProviderProps {
  children: React.ReactNode;
}

export function CountdownProvider({ children }: CountdownProviderProps) {
  // Main competition countdown
  const { hasVoteStarted, timeLeft, isExpired } = useStartCountdown(
    COMPETITION_DATES.VOTE_CLOSING_TIME,
    COMPETITION_DATES.VOTE_OPENING_TIME
  );

  // Registration countdown
  const { timeLeft: timeUntilRegistration } = useStartCountdown(
    COMPETITION_DATES.VOTE_OPENING_TIME
  );

  const value = useMemo(
    () => ({
      hasVoteStarted,
      isExpired,
      timeLeft,
      timeUntilRegistration,
      dates: COMPETITION_DATES,
    }),
    [hasVoteStarted, isExpired, timeLeft, timeUntilRegistration]
  );

  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  );
}

export function useCountdown() {
  const context = useContext(CountdownContext);
  if (context === undefined) {
    throw new Error("useCountdown must be used within a CountdownProvider");
  }
  return context;
}

// Export the dates for any component that might need them directly
export { COMPETITION_DATES };
