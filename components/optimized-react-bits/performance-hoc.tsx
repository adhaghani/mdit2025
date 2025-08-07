/*
  Performance optimization Higher-Order Component for react-bits components
  Provides lazy loading, viewport detection, reduced motion support, and memoization
*/

import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
  ComponentType,
} from "react";

interface PerformanceHOCOptions {
  /**
   * Custom fallback component to show while loading or when reduced motion is preferred
   */
  fallbackComponent?: ComponentType<any>;
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
  } = options;

  const DefaultFallback = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-900/50 animate-pulse" />
  );

  const WrappedComponent = React.memo<P>((props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Check for reduced motion preference
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);

      // Intersection Observer for viewport detection
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting;
          setIsVisible(isIntersecting);

          if (isIntersecting && !hasBeenVisible) {
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
    }, [hasBeenVisible, threshold, rootMargin]);

    const shouldRender = prefersReducedMotion
      ? false
      : unloadOnExit
      ? isVisible
      : hasBeenVisible;

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
export const useStableProps = <T extends Record<string, any>>(props: T): T => {
  return React.useMemo(() => {
    return { ...props };
  }, [
    // Create stable dependencies
    Object.keys(props)
      .map((key) =>
        Array.isArray(props[key]) ? JSON.stringify(props[key]) : props[key]
      )
      .join("|"),
  ]);
};

/**
 * Hook for viewport visibility detection
 */
export const useViewportVisibility = (
  threshold: number = 0,
  rootMargin: string = "0px"
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
 * Hook for reduced motion detection
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};
