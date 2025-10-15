"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useCountdown } from "./useVoteCountdown";

export const useStartCountdown = (targetDate: string, startDate?: string) => {
  const [hasVoteStarted, setHasStarted] = useState(!startDate); // If no startDate, start immediately
  const countdownData = useCountdown(targetDate);

  // Use ref to store the start timestamp to avoid recalculating
  const startTimestamp = useRef(startDate ? new Date(startDate).getTime() : 0);
  ``;
  // Memoize the check function
  const checkStartDate = useCallback(() => {
    if (!startDate) {
      setHasStarted(true);
      return;
    }

    const now = Date.now();
    if (now >= startTimestamp.current) {
      setHasStarted(true);
    } else {
      setHasStarted(false);
    }
  }, [startDate]);

  useEffect(() => {
    // Update start timestamp if startDate changes
    if (startDate) {
      startTimestamp.current = new Date(startDate).getTime();
    }

    // If no start date is provided, the countdown starts immediately
    if (!startDate) {
      setHasStarted(true);
      return;
    }

    // Check immediately
    checkStartDate();

    // Check every second to see if we've reached the start date
    const timer = setInterval(checkStartDate, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [startDate, checkStartDate]);

  // Memoize the return value to prevent unnecessary re-renders
  const returnValue = useMemo(
    () => ({
      hasVoteStarted,
      isExpired: hasVoteStarted ? countdownData.isExpired : false,
      timeLeft: hasVoteStarted
        ? {
            days: countdownData.days,
            hours: countdownData.hours,
            minutes: countdownData.minutes,
            seconds: countdownData.seconds,
          }
        : {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
    }),
    [hasVoteStarted, countdownData]
  );

  return returnValue;
};
