"use client";
import React, { memo, useMemo, lazy } from "react";
import { Text } from "@/components/ui/text";
import NumberFlow from "@number-flow/react";

import { Card, CardContent } from "@/components/ui/card";
import { useStartCountdown } from "@/hooks/useStartCountdown";

import { BlurFade } from "@/components/magicui/blur-fade";

import Image from "next/image";

import { BubbleBackground } from "@/components/animate-ui/backgrounds/bubble";

// Memoized components for better performance
const CountdownCard = memo(
  ({ value, label }: { value: number; label: string }) => (
    <div className="text-center space-y-2">
      <Card className="text-center">
        <CardContent>
          <NumberFlow
            value={value}
            format={{ minimumIntegerDigits: 2 }}
            className="lg:text-5xl md:text-3xl text-xl font-bold w-[21px] md:w-[40px] lg:w-[55px] text-primary"
          />
        </CardContent>
      </Card>
      <Text as="p" className="text-sm text-muted-foreground">
        {label}
      </Text>
    </div>
  )
);

CountdownCard.displayName = "CountdownCard";

const Page = memo(() => {
  // Target date: August 30, 2025, GMT+8 (midnight)
  const { hasStarted, timeLeft, isExpired } = useStartCountdown(
    "2025-08-30T00:00:00+08:00", // Count down to August 30
    "2025-08-10T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  const { timeLeft: timeUntilRegistration } = useStartCountdown(
    "2025-08-10T00:00:00+08:00" // Count down to August 10
  );

  // Memoize countdown values to prevent unnecessary re-renders
  const countdownValues = useMemo(() => {
    const values = hasStarted ? timeLeft : timeUntilRegistration;
    return [
      { value: values.days, label: "Days" },
      { value: values.hours, label: "Hours" },
      { value: values.minutes, label: "Minutes" },
      { value: values.seconds, label: "Seconds" },
    ];
  }, [hasStarted, timeLeft, timeUntilRegistration]);

  return (
    <>
      {/* Hero Section with Background Pattern */}
      <div className="relative h-screen max-h-[calc(100vh-32px)]">
        <BubbleBackground
          interactive
          className="absolute inset-0 z-0 rounded-lg opacity-30 hidden lg:block"
        />
        <div className="relative text-center py-24 md:py-24 lg:py-32 flex flex-col item-center justify-center gap-4 z-10">
          <BlurFade
            inView
            delay={0.15}
            className="grid place-items-center w-fit mx-auto rounded-full"
          >
            <Image
              alt="Logo of MDIT"
              src={"/mdit.svg"}
              width={100}
              height={100}
            />
          </BlurFade>

          <div className="relative z-10 space-y-6">
            <BlurFade inView delay={0.1}>
              <Text
                as="h1"
                className="text-primary font-mono tracking-wider font-bold uppercase"
              >
                Malaysia Data Innovation Talent
                <br />x <br /> DOSM Datathon 2025
              </Text>
            </BlurFade>
            <BlurFade inView delay={0.15}>
              <Text
                as="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto"
              >
                Malaysia&apos;s Premier Data Innovation Competition
              </Text>
            </BlurFade>
            <BlurFade inView delay={0.2}>
              <Text
                as="p"
                styleVariant="muted"
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              >
                Join 100+ talented students from across Malaysia in this
                prestigious national datathon. Work with real government
                datasets and compete for RM11,600 in prizes.
              </Text>
            </BlurFade>

            {/* Countdown Timer */}
            <BlurFade inView delay={0.25}>
              <div className="mt-12 mb-8">
                <Text as="h3" className="mb-6">
                  {hasStarted
                    ? "Registration Closes In:"
                    : "Registration Opens In:"}
                </Text>
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  {countdownValues.map((item, index) => (
                    <CountdownCard
                      key={item.label}
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </>
  );
});

Page.displayName = "Page";

export default Page;
