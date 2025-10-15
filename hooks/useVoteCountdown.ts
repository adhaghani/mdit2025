"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Use ref to store the target timestamp to avoid recalculating
  const targetTimestamp = useRef(new Date(targetDate).getTime());

  // Memoize the calculation function
  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const difference = targetTimestamp.current - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, []);

  useEffect(() => {
    // Update target timestamp if targetDate changes
    targetTimestamp.current = new Date(targetDate).getTime();

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  // Check if the target date has passed - memoized calculation
  const isExpired = Date.now() > targetTimestamp.current;

  return { ...timeLeft, isExpired };
};
