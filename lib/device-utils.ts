/**
 * Device detection utilities for performance optimization
 */

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export interface DeviceInfo {
  isMobile: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isLowEndDevice: boolean;
  hasReducedMotion: boolean;
  supportsWebGL: boolean;
  memoryInfo?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export function getDeviceInfo(): DeviceInfo {
  // Add SSR safety check
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isAndroid: false,
      isIOS: false,
      isLowEndDevice: false,
      hasReducedMotion: false,
      supportsWebGL: false,
      memoryInfo: undefined,
    };
  }

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Check for reduced motion preference
  const hasReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Check WebGL support
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  const supportsWebGL = !!gl;

  // Basic low-end device detection
  const navigatorWithMemory = navigator as NavigatorWithMemory;
  const isLowEndDevice =
    isMobile &&
    (navigator.hardwareConcurrency <= 2 || // 2 or fewer CPU cores
      (navigatorWithMemory.deviceMemory !== undefined &&
        navigatorWithMemory.deviceMemory <= 3) || // 2GB or less RAM (if available)
      /Android [1-6]\./i.test(navigator.userAgent)); // Older Android versions

  // Memory info (Chrome only)
  const performanceWithMemory = performance as PerformanceWithMemory;
  const memoryInfo = performanceWithMemory.memory
    ? {
        usedJSHeapSize: performanceWithMemory.memory.usedJSHeapSize,
        totalJSHeapSize: performanceWithMemory.memory.totalJSHeapSize,
        jsHeapSizeLimit: performanceWithMemory.memory.jsHeapSizeLimit,
      }
    : undefined;

  return {
    isMobile,
    isAndroid,
    isIOS,
    isLowEndDevice,
    hasReducedMotion,
    supportsWebGL,
    memoryInfo,
  };
}

export function shouldReducePerformance(): boolean {
  const device = getDeviceInfo();
  return (
    device.isMobile ||
    device.isLowEndDevice ||
    device.hasReducedMotion ||
    !device.supportsWebGL
  );
}

export function shouldDisableWebGL(): boolean {
  const device = getDeviceInfo();
  return (
    device.isLowEndDevice || !device.supportsWebGL || device.hasReducedMotion
  );
}

export function isWebGLSupported(): boolean {
  const device = getDeviceInfo();
  return (
    device.supportsWebGL && !device.hasReducedMotion && !device.isLowEndDevice
  );
}

export function getOptimalFrameRate(): number {
  const device = getDeviceInfo();
  if (device.isLowEndDevice) return 30;
  if (device.isMobile) return 45;
  return 60;
}

/**
 * Simple function to check if the current device is low-end
 * Returns true if the device should use reduced performance mode
 *
 * @returns {boolean} true if device is low-end, false otherwise
 */
export function isLowEndDevice(): boolean {
  // Add SSR safety check
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const device = getDeviceInfo();
    return device.isLowEndDevice;
  } catch (error) {
    // Fallback to basic mobile detection if getDeviceInfo fails
    console.warn(
      "Device detection failed, falling back to basic mobile check:",
      error
    );
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}

/**
 * Enhanced low-end device detection with additional checks
 * More comprehensive than isLowEndDevice()
 *
 * @returns {boolean} true if device should use minimal performance mode
 */
export function isVeryLowEndDevice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const device = getDeviceInfo();
    const navigatorWithMemory = navigator as NavigatorWithMemory;

    return (
      device.isLowEndDevice ||
      (navigatorWithMemory.deviceMemory !== undefined &&
        navigatorWithMemory.deviceMemory <= 1) || // 1GB or less
      navigator.hardwareConcurrency <= 1 || // Single core
      /Android [1-5]\./i.test(navigator.userAgent) || // Very old Android
      /iPhone [1-6]/i.test(navigator.userAgent) // Very old iPhone
    );
  } catch (error) {
    console.warn("Enhanced device detection failed:", error);
    return false;
  }
}
