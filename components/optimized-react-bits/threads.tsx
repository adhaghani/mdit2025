/*
  Optimized Threads component with performance enhancements
*/

import React, { lazy } from "react";
import { withPerformanceOptimization, useStableProps } from "./performance-hoc";

// Lazy load the original component
const OriginalThreads = lazy(
  () => import("@/components/react-bits/Backgrounds/Threads/Threads")
);

interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  className?: string;
}

// Custom fallback for Threads
const ThreadsFallback = () => (
  null
);

// Create the performance-optimized component
const PerformanceThreads = withPerformanceOptimization(OriginalThreads, {
  fallbackComponent: ThreadsFallback,
  threshold: 0.1,
  rootMargin: "100px",
  unloadOnExit: false, // Keep loaded once visible for better UX
});

// Main exported component with props stabilization
const OptimizedThreads: React.FC<ThreadsProps> = (props) => {
  const stableProps = useStableProps(props);
  return <PerformanceThreads {...stableProps} />;
};

// Memoized version with custom comparison
export const Threads = React.memo(OptimizedThreads, (prevProps, nextProps) => {
  // Custom deep comparison for color array
  const colorEqual =
    prevProps.color && nextProps.color
      ? prevProps.color.every((val, index) => val === nextProps.color![index])
      : prevProps.color === nextProps.color;

  return (
    colorEqual &&
    prevProps.amplitude === nextProps.amplitude &&
    prevProps.distance === nextProps.distance &&
    prevProps.enableMouseInteraction === nextProps.enableMouseInteraction &&
    prevProps.className === nextProps.className
  );
});

Threads.displayName = "OptimizedThreads";

export default Threads;
