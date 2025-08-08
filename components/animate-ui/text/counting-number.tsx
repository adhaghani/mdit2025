"use client";

import * as React from "react";
import {
  type SpringOptions,
  type UseInViewOptions,
  useInView,
  useMotionValue,
  useSpring,
} from "motion/react";

type CountingNumberProps = React.ComponentProps<"span"> & {
  number: number;
  fromNumber?: number;
  padStart?: boolean;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
  decimalSeparator?: string;
  thousandSeparator?: string;
  transition?: SpringOptions;
  decimalPlaces?: number;
};

function CountingNumber({
  ref,
  number,
  fromNumber = 0,
  padStart = false,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  decimalSeparator = ".",
  thousandSeparator = "",
  transition = { stiffness: 90, damping: 50 },
  decimalPlaces = 0,
  className,
  ...props
}: CountingNumberProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLSpanElement);

  // Helper function to add thousand separators - memoized to prevent useEffect re-runs
  const addThousandSeparator = React.useCallback(
    (num: string, separator: string): string => {
      if (!separator) return num;

      const parts = num.split(".");
      const integerPart = parts[0];
      const decimalPart = parts[1];

      // Add thousand separators to integer part
      const formattedInteger = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        separator
      );

      return decimalPart
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;
    },
    []
  ); // Empty dependency array since this function doesn't depend on any props or state

  const numberStr = number.toString();
  const decimals =
    typeof decimalPlaces === "number"
      ? decimalPlaces
      : numberStr.includes(".")
      ? numberStr.split(".")[1]?.length ?? 0
      : 0;

  const motionVal = useMotionValue(fromNumber);
  const springVal = useSpring(motionVal, transition);
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  React.useEffect(() => {
    if (isInView) motionVal.set(number);
  }, [isInView, number, motionVal]);

  React.useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (localRef.current) {
        let formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toString();

        // Apply thousand separators before replacing decimal separator
        if (thousandSeparator) {
          formatted = addThousandSeparator(formatted, thousandSeparator);
        }

        if (decimals > 0) {
          formatted = formatted.replace(".", decimalSeparator);
        }

        if (padStart) {
          const finalIntLength = Math.floor(Math.abs(number)).toString().length;
          const [intPart, fracPart] = formatted.split(decimalSeparator);
          const paddedInt = intPart?.padStart(finalIntLength, "0") ?? "";
          formatted = fracPart
            ? `${paddedInt}${decimalSeparator}${fracPart}`
            : paddedInt;
        }

        localRef.current.textContent = formatted;
      }
    });
    return () => unsubscribe();
  }, [
    springVal,
    decimals,
    padStart,
    number,
    decimalSeparator,
    thousandSeparator,
    addThousandSeparator,
  ]);

  const finalIntLength = Math.floor(Math.abs(number)).toString().length;
  let initialText = padStart
    ? "0".padStart(finalIntLength, "0") +
      (decimals > 0 ? decimalSeparator + "0".repeat(decimals) : "")
    : "0" + (decimals > 0 ? decimalSeparator + "0".repeat(decimals) : "");

  // Apply thousand separators to initial text if needed
  if (thousandSeparator && !padStart) {
    const initialNumber =
      "0" + (decimals > 0 ? "." + "0".repeat(decimals) : "");
    initialText = addThousandSeparator(initialNumber, thousandSeparator);
    if (decimals > 0) {
      initialText = initialText.replace(".", decimalSeparator);
    }
  }

  return (
    <span
      ref={localRef}
      data-slot="counting-number"
      className={className}
      {...props}
    >
      {initialText}
    </span>
  );
}

export { CountingNumber, type CountingNumberProps };
