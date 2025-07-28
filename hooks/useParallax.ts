"use client";

import { useEffect, useState, useCallback } from "react";

interface ParallaxOptions {
  speed?: number; // 0.1 to 1.0, where 1.0 is normal scroll speed
  direction?: "up" | "down";
  disabled?: boolean; // Disable on mobile for performance
}

export const useParallax = ({
  speed = 0.5,
  direction = "up",
  disabled = false,
}: ParallaxOptions = {}) => {
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (disabled) return;

    const scrollTop = window.pageYOffset;
    const parallaxOffset = scrollTop * speed * (direction === "up" ? -1 : 1);
    setOffset(parallaxOffset);
  }, [speed, direction, disabled]);

  useEffect(() => {
    if (disabled) return;

    // Throttle scroll events for performance
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll, disabled]);

  return offset;
};

// Hook for CSS transform parallax (more performant)
export const useParallaxTransform = (options: ParallaxOptions = {}) => {
  const offset = useParallax(options);

  return {
    transform: `translateY(${offset}px)`,
    willChange: options.disabled ? "auto" : "transform",
  };
};

// Hook to detect mobile for disabling parallax
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};
