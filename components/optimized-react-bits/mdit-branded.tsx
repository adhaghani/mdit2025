/*
  Pre-configured react-bits components with MDIT 2025 brand defaults
  
  These components use consistent branding props to eliminate unnecessary re-renders
  and provide a consistent visual experience across the site.
*/

import React from "react";
import {
  Aurora as BaseAurora,
  Threads as BaseThreads,
  TextPressure as BaseTextPressure,
} from "./index";

// MDIT 2025 Brand Colors and Settings
const MDIT_BRAND = {
  aurora: {
    colorStops: ["#F7F7F7", "#C25AFF", "#7869FE"],
    blend: 1,
    speed: 0.3,
  },
  threads: {
    color: [0.7, 0.3, 1] as [number, number, number],
    distance: 0.5,
  },
  textPressure: {
    textColor: "#9031DD",
    strokeColor: "#ff0000",
    minFontSize: 24,
    flex: false,
    alpha: true,
    stroke: false,
    width: true,
    weight: true,
    italic: false,
  },
};

// Pre-configured Aurora with MDIT branding
// No props needed - uses consistent brand colors across all pages
export const MditAurora = React.memo(() => (
  <BaseAurora {...MDIT_BRAND.aurora} />
));

// Variant for pages that need different amplitude
export const MditAuroraSubtle = React.memo(() => (
  <BaseAurora {...MDIT_BRAND.aurora} amplitude={0.4} />
));

// Pre-configured Threads with MDIT branding
interface MditThreadsProps {
  amplitude?: number;
  enableMouseInteraction?: boolean;
  className?: string;
}

export const MditThreads = React.memo<MditThreadsProps>(
  ({ amplitude = 2, enableMouseInteraction = false, className }) => (
    <BaseThreads
      {...MDIT_BRAND.threads}
      amplitude={amplitude}
      enableMouseInteraction={enableMouseInteraction}
      className={className}
    />
  )
);

// Pre-configured TextPressure with MDIT branding
interface MditTextPressureProps {
  text: string;
  className?: string;
}

export const MditTextPressure = React.memo<MditTextPressureProps>(
  ({ text, className }) => (
    <BaseTextPressure
      {...MDIT_BRAND.textPressure}
      text={text}
      className={className}
    />
  )
);

// Set display names for debugging
MditAurora.displayName = "MditAurora";
MditAuroraSubtle.displayName = "MditAuroraSubtle";
MditThreads.displayName = "MditThreads";
MditTextPressure.displayName = "MditTextPressure";

// Export individual brand configurations for custom usage
export const MDIT_AURORA_CONFIG = MDIT_BRAND.aurora;
export const MDIT_THREADS_CONFIG = MDIT_BRAND.threads;
export const MDIT_TEXT_PRESSURE_CONFIG = MDIT_BRAND.textPressure;
