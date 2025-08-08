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
  null
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
