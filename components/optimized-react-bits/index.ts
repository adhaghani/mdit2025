/*
  Optimized react-bits components with performance enhancements
  
  Import these instead of the original components for better performance:
  - Lazy loading
  - Viewport-based rendering
  - Reduced motion support
  - Props memoization
  - Custom fallback components
*/

// Export optimized components
export { default as Threads } from "./threads";
export { default as Aurora } from "./aurora";
export { default as TextPressure } from "./text-pressure";

// Export MDIT branded components (no props needed - prevents re-renders)
export {
  MditAurora,
  MditAuroraSubtle,
  MditThreads,
  MditTextPressure,
  MDIT_AURORA_CONFIG,
  MDIT_THREADS_CONFIG,
  MDIT_TEXT_PRESSURE_CONFIG,
} from "./mdit-branded";

// Export performance utilities for custom usage
export {
  withPerformanceOptimization,
  useStableProps,
  useViewportVisibility,
  useReducedMotion,
} from "./performance-hoc";

// Re-export types (you can extend these as needed)
export interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
  className?: string;
}

export interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  time?: number;
  className?: string;
}

export interface TextPressureProps {
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
