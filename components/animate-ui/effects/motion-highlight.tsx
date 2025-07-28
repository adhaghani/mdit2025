"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MotionHighlightProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  controlledItems?: boolean;
  transition?: object;
  enabled?: boolean;
}

interface MotionHighlightItemProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  activeClassName?: string;
}

const MotionHighlight = React.forwardRef<
  HTMLDivElement,
  MotionHighlightProps
>(({ children, className, hover, controlledItems, enabled, ...props }, ref) => {
  return (
    <div 
      ref={ref} 
      className={cn("relative", className)} 
      data-hover={hover}
      data-controlled-items={controlledItems}
      data-enabled={enabled}
      {...props}
    >
      {children}
    </div>
  );
});
MotionHighlight.displayName = "MotionHighlight";

const MotionHighlightItem = React.forwardRef<
  HTMLDivElement,
  MotionHighlightItemProps
>(({ children, className, disabled, activeClassName, ...props }, ref) => {
  return (
    <div 
      ref={ref} 
      className={cn("relative", className)} 
      data-disabled={disabled}
      data-active-class={activeClassName}
      {...props}
    >
      {children}
    </div>
  );
});
MotionHighlightItem.displayName = "MotionHighlightItem";

export { MotionHighlight, MotionHighlightItem };
