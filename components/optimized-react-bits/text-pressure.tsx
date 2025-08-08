/*
  Optimized TextPressure component with performance enhancements
*/

import React, { lazy } from "react";
import { withPerformanceOptimization, useStableProps } from "./performance-hoc";

// Lazy load the original component
const OriginalTextPressure = lazy(
  () =>
    import("@/components/react-bits/TextAnimations/TextPressure/TextPressure")
);

interface TextPressureProps {
  text?: string;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  className?: string;
}

// Custom fallback for TextPressure
const TextPressureFallback = ({ text = "Loading..." }: { text?: string }) => (
  null
);

// Create the performance-optimized component
const PerformanceTextPressure = withPerformanceOptimization(
  OriginalTextPressure,
  {
    threshold: 0.2,
    rootMargin: "50px",
    unloadOnExit: false,
  }
);

// Main exported component with props stabilization
const OptimizedTextPressure: React.FC<TextPressureProps> = (props) => {
  const stableProps = useStableProps(props);

  // Custom fallback that shows the actual text
  const CustomFallback = () => <TextPressureFallback text={props.text} />;

  return (
    <div className="w-full h-full">
      <React.Suspense fallback={<CustomFallback />}>
        <PerformanceTextPressure {...stableProps} />
      </React.Suspense>
    </div>
  );
};

// Memoized version with custom comparison
export const TextPressure = React.memo(
  OptimizedTextPressure,
  (prevProps, nextProps) => {
    return (
      prevProps.text === nextProps.text &&
      prevProps.flex === nextProps.flex &&
      prevProps.alpha === nextProps.alpha &&
      prevProps.stroke === nextProps.stroke &&
      prevProps.width === nextProps.width &&
      prevProps.weight === nextProps.weight &&
      prevProps.italic === nextProps.italic &&
      prevProps.textColor === nextProps.textColor &&
      prevProps.strokeColor === nextProps.strokeColor &&
      prevProps.minFontSize === nextProps.minFontSize &&
      prevProps.className === nextProps.className
    );
  }
);

TextPressure.displayName = "OptimizedTextPressure";

export default TextPressure;
