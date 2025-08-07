/**
 * Simple React hook for device detection
 */

import { useState, useEffect } from "react";
import { isLowEndDevice, isVeryLowEndDevice } from "@/lib/device-utils";

export function useDeviceDetection() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isVeryLowEnd, setIsVeryLowEnd] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsLowEnd(isLowEndDevice());
    setIsVeryLowEnd(isVeryLowEndDevice());
  }, []);

  return {
    isLowEnd,
    isVeryLowEnd,
    isClient, // Use this to avoid hydration mismatches
  };
}

/**
 * Simple hook that just returns whether device is low-end
 */
export function useIsLowEndDevice(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setIsLowEnd(isLowEndDevice());
  }, []);

  return isLowEnd;
}
