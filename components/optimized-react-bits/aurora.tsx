/*
  Optimized Aurora component with performance enhancements
*/

import React, { lazy } from "react";
import { withPerformanceOptimization, useStableProps } from "./performance-hoc";

// Lazy load the original component
const OriginalAurora = lazy(
  () => import("@/components/react-bits/Backgrounds/Aurora/Aurora")
);

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  time?: number;
  className?: string;
}

// Custom fallback for Aurora
const AuroraFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-blue-100/20 dark:from-pink-900/10 dark:via-purple-900/10 dark:to-blue-900/10">
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-xl animate-pulse" />
    </div>
  </div>
);

// Create the performance-optimized component
const PerformanceAurora = withPerformanceOptimization(OriginalAurora, {
  fallbackComponent: AuroraFallback,
  threshold: 0.1,
  rootMargin: "100px",
  unloadOnExit: false, // Keep loaded once visible for better UX
});

// Main exported component with props stabilization
const OptimizedAurora: React.FC<AuroraProps> = (props) => {
  const stableProps = useStableProps(props);
  return <PerformanceAurora {...stableProps} />;
};

// Memoized version with custom comparison
export const Aurora = React.memo(OptimizedAurora, (prevProps, nextProps) => {
  // Custom deep comparison for colorStops array
  const colorStopsEqual =
    prevProps.colorStops && nextProps.colorStops
      ? prevProps.colorStops.length === nextProps.colorStops.length &&
        prevProps.colorStops.every(
          (val, index) => val === nextProps.colorStops![index]
        )
      : prevProps.colorStops === nextProps.colorStops;

  return (
    colorStopsEqual &&
    prevProps.blend === nextProps.blend &&
    prevProps.amplitude === nextProps.amplitude &&
    prevProps.speed === nextProps.speed &&
    prevProps.time === nextProps.time &&
    prevProps.className === nextProps.className
  );
});

Aurora.displayName = "OptimizedAurora";

export default Aurora;
