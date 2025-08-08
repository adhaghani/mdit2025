"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getDeviceInfo, DeviceInfo } from "@/lib/device-utils";

interface DeviceContextType {
  deviceInfo: DeviceInfo | null;
  isWebGLSupported: boolean;
  shouldReducePerformance: boolean;
  shouldDisableWebGL: boolean;
  isLowEndDevice: boolean;
  isVeryLowEndDevice: boolean;
  isLoading: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}

export function DeviceProvider({ children }: DeviceProviderProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    try {
      const info = getDeviceInfo();
      setDeviceInfo(info);
    } catch (error) {
      console.warn("Failed to get device info:", error);
      // Fallback device info for safety
      setDeviceInfo({
        isMobile: false,
        isAndroid: false,
        isIOS: false,
        isLowEndDevice: false,
        hasReducedMotion: false,
        supportsWebGL: false,
        memoryInfo: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Computed values based on device info
  const isWebGLSupported = deviceInfo
    ? deviceInfo.supportsWebGL &&
      !deviceInfo.hasReducedMotion &&
      !deviceInfo.isLowEndDevice
    : false;

  const shouldReducePerformance = deviceInfo
    ? deviceInfo.isMobile ||
      deviceInfo.isLowEndDevice ||
      deviceInfo.hasReducedMotion ||
      !deviceInfo.supportsWebGL
    : true; // Default to reduced performance for safety

  const shouldDisableWebGL = deviceInfo
    ? deviceInfo.isLowEndDevice ||
      !deviceInfo.supportsWebGL ||
      deviceInfo.hasReducedMotion
    : true; // Default to disabled for safety

  const isLowEndDevice = deviceInfo ? deviceInfo.isLowEndDevice : false;

  const isVeryLowEndDevice =
    deviceInfo && typeof window !== "undefined"
      ? (() => {
          try {
            const navigatorWithMemory = navigator as any;
            return (
              deviceInfo.isLowEndDevice ||
              (navigatorWithMemory.deviceMemory !== undefined &&
                navigatorWithMemory.deviceMemory <= 1) ||
              navigator.hardwareConcurrency <= 1 ||
              /Android [1-5]\./i.test(navigator.userAgent) ||
              /iPhone [1-6]/i.test(navigator.userAgent)
            );
          } catch {
            return false;
          }
        })()
      : false;

  const value: DeviceContextType = {
    deviceInfo,
    isWebGLSupported,
    shouldReducePerformance,
    shouldDisableWebGL,
    isLowEndDevice,
    isVeryLowEndDevice,
    isLoading,
  };

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
}

// Hook for checking if device detection is ready
export function useDeviceReady() {
  const { isLoading } = useDevice();
  return !isLoading;
}

// Individual hooks for specific checks (for convenience)
export function useIsWebGLSupported() {
  const { isWebGLSupported, isLoading } = useDevice();
  return { isWebGLSupported, isLoading };
}

export function useShouldReducePerformance() {
  const { shouldReducePerformance, isLoading } = useDevice();
  return { shouldReducePerformance, isLoading };
}

export function useIsLowEndDevice() {
  const { isLowEndDevice, isLoading } = useDevice();
  return { isLowEndDevice, isLoading };
}

// Combined hook for performance-aware rendering
export function usePerformanceRendering() {
  const { isWebGLSupported, shouldReducePerformance, isLoading } = useDevice();

  return {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading,
    // Helper to check if we should render WebGL components
    canRenderWebGL: !isLoading && isWebGLSupported,
    // Helper to check if we should render high-performance components
    canRenderHighPerformance: !isLoading && !shouldReducePerformance,
    // Helper to check if we should use fallback rendering
    shouldUseFallback: !isLoading && shouldReducePerformance,
  };
}
