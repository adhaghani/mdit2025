/*
  Performance optimization Higher-Order Component for react-bits components
  Provides lazy loading, viewport detection, reduced motion support, device detection, and memoization
*/

import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
  ComponentType,
} from "react";
import { getDeviceInfo, shouldDisableWebGL } from "@/lib/device-utils";

interface PerformanceHOCOptions {
  /**
   * Custom fallback component to show while loading or when reduced motion is preferred
   */
  fallbackComponent?: ComponentType<unknown>;
  /**
   * Intersection observer threshold (0-1)
   */
  threshold?: number;
  /**
   * Root margin for intersection observer
   */
  rootMargin?: string;
  /**
   * Whether to unload the component when it goes out of view
   */
  unloadOnExit?: boolean;
  /**
   * Whether to respect user's reduced motion preference
   */
  respectReducedMotion?: boolean;
  /**
   * Whether to respect device capabilities (disable WebGL on low-end devices)
   */
  respectDeviceCapabilities?: boolean;
}

/**
 * Higher-Order Component that wraps react-bits components with performance optimizations
 */
export const withPerformanceOptimization = <P extends object>(
  Component: ComponentType<P>,
  options: PerformanceHOCOptions = {}
) => {
  const {
    fallbackComponent: FallbackComponent,
    threshold = 0.1,
    rootMargin = "50px",
    unloadOnExit = false,
    respectReducedMotion = true,
    respectDeviceCapabilities = true,
  } = options;

  const DefaultFallback = () => (
    null
  );

  const WrappedComponent = React.memo<P>((props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [shouldDisableGraphics, setShouldDisableGraphics] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Check device capabilities and motion preferences
      const deviceInfo = getDeviceInfo();
      setPrefersReducedMotion(deviceInfo.hasReducedMotion);
      setShouldDisableGraphics(shouldDisableWebGL());

      // Check for reduced motion preference changes
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handleChange = () => {
        const newDeviceInfo = getDeviceInfo();
        setPrefersReducedMotion(newDeviceInfo.hasReducedMotion);
        setShouldDisableGraphics(shouldDisableWebGL());
      };

      mediaQuery.addEventListener("change", handleChange);

      // Intersection Observer for viewport detection
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting;
          setIsVisible(isIntersecting);

          if (isIntersecting) {
            setHasBeenVisible(true);
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        observer.disconnect();
        mediaQuery.removeEventListener("change", handleChange);
      };
    }, []); // Empty dependency array since we want this to run only once

    const shouldRender =
      (!respectDeviceCapabilities || !shouldDisableGraphics) &&
      (!respectReducedMotion || !prefersReducedMotion)
        ? unloadOnExit
          ? isVisible
          : hasBeenVisible
        : false;

    const Fallback = FallbackComponent || DefaultFallback;

    return (
      <div ref={ref} className="w-full h-full">
        {shouldRender ? (
          <Suspense fallback={<Fallback />}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Fallback />
        )}
      </div>
    );
  });

  WrappedComponent.displayName = `withPerformanceOptimization(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

/**
 * Hook to stabilize props and prevent unnecessary re-renders
 */
export const useStableProps = <T extends object>(props: T): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => {
    return { ...props };
  }, [JSON.stringify(props)]);
};

/**
 * Hook for viewport visibility detection
 */
export const useViewportVisibility = (
  threshold: number = 0,
  rootMargin: string = "0px"
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible] as const;
};

/**
 * Hook for reduced motion and device capability detection
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const deviceInfo = getDeviceInfo();
    setPrefersReducedMotion(deviceInfo.hasReducedMotion);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      const newDeviceInfo = getDeviceInfo();
      setPrefersReducedMotion(newDeviceInfo.hasReducedMotion);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook for device capability detection
 */
export const useDeviceCapabilities = () => {
  const [deviceInfo, setDeviceInfo] = useState(() => {
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
    return getDeviceInfo();
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo(getDeviceInfo());
    };

    // Check on mount and when visibility changes
    updateDeviceInfo();

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", updateDeviceInfo);

    return () => {
      mediaQuery.removeEventListener("change", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};
