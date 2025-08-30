"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useStartCountdown } from "@/hooks/useStartCountdown";

// Centralized dates for the competition
const COMPETITION_DATES = {
  REGISTRATION_START: "2025-08-10T10:00:00+08:00", // August 10, 2025, 10.00 AM GMT+8
  COMPETITION_START: "2025-09-05T23:59:00+08:00", // August 30, 2025
} as const;

interface CountdownContextType {
  // Main competition countdown
  hasStarted: boolean;
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
  const { hasStarted, timeLeft, isExpired } = useStartCountdown(
    COMPETITION_DATES.COMPETITION_START,
    COMPETITION_DATES.REGISTRATION_START
  );

  // Registration countdown
  const { timeLeft: timeUntilRegistration } = useStartCountdown(
    COMPETITION_DATES.REGISTRATION_START
  );

  const value = useMemo(
    () => ({
      hasStarted,
      isExpired,
      timeLeft,
      timeUntilRegistration,
      dates: COMPETITION_DATES,
    }),
    [hasStarted, isExpired, timeLeft, timeUntilRegistration]
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
