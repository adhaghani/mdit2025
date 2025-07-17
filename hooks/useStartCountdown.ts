"use client";

import { useState, useEffect } from "react";
import { useCountdown } from "./useCountdown";

export const useStartCountdown = (targetDate: string, startDate?: string) => {
  const [hasStarted, setHasStarted] = useState(!startDate); // If no startDate, start immediately
  const countdownData = useCountdown(targetDate);

  useEffect(() => {
    // If no start date is provided, the countdown starts immediately
    if (!startDate) {
      setHasStarted(true);
      return;
    }

    const checkStartDate = () => {
      const start = new Date(startDate);
      const now = new Date();

      if (now >= start) {
        setHasStarted(true);
      } else {
        setHasStarted(false);
      }
    };

    // Check immediately
    checkStartDate();

    // Check every second to see if we've reached the start date
    const timer = setInterval(checkStartDate, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [startDate]);

  // Return countdown data only if countdown has started, otherwise return zeros
  return {
    hasStarted,
    isExpired: hasStarted ? countdownData.isExpired : false,
    timeLeft: hasStarted
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
  };
};
