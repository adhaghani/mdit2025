"use client";
import React, { memo, useMemo } from "react";
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
  const { hasStarted, timeLeft } = useStartCountdown(
    "2025-08-05T00:00:00+08:00", // Count down to August 30
    "2025-08-05T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  const { timeLeft: timeUntilRegistration } = useStartCountdown(
    "2025-08-05T00:00:00+08:00" // Count down to August 10
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
      <div className="relative h-screen min-h-fit">
        <BubbleBackground
          interactive
          className="absolute inset-0 z-0 rounded-lg opacity-30 hidden lg:block"
        />
        <div className="relative text-center py-10 flex flex-col item-center justify-center gap-4 z-10">
          <BlurFade
            inView
            delay={0.15}
            className="grid place-items-center w-fit mx-auto rounded-full"
          >
            <Image
              alt="Logo of MDIT"
              src={"/mdit_hires.png"}
              width={100}
              height={100}
              quality={100}
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
                Join 80+ expected talented teams from across Malaysia in this
                prestigious national datathon. Work with real government
                datasets and compete for RM11,000 in prizes.
              </Text>
            </BlurFade>

            {/* Countdown Timer */}
            <BlurFade inView delay={0.25}>
              <div className="mt-12 mb-8">
                <Text as="h3" className="mb-6">
                  {hasStarted
                    ? "Registration Closes In:"
                    : "Website Launched In:"}
                </Text>
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  {countdownValues.map((item) => (
                    <CountdownCard
                      key={item.label}
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Competition Statistics */}
            <BlurFade inView delay={0.3}>
              <div className="mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                  {/* Prize Pool */}
                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800/30 hover:shadow-lg transition-all duration-300">
                    <CardContent className="text-center p-6">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                      <Text
                        as="h4"
                        className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2"
                      >
                        RM11,000
                      </Text>
                      <Text as="p" className="text-sm text-muted-foreground">
                        Total Prize Pool
                      </Text>
                    </CardContent>
                  </Card>

                  {/* Expected Participants */}
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300">
                    <CardContent className="text-center p-6">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <Text
                        as="h4"
                        className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                      >
                        80+
                      </Text>
                      <Text as="p" className="text-sm text-muted-foreground">
                        Expected Teams
                      </Text>
                    </CardContent>
                  </Card>

                  {/* Universities */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800/30 hover:shadow-lg transition-all duration-300">
                    <CardContent className="text-center p-6">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <Text
                        as="h4"
                        className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
                      >
                        10+
                      </Text>
                      <Text as="p" className="text-sm text-muted-foreground">
                        Expected Participating Universities
                      </Text>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Competition Highlights */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>National Level Certificates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Real Datasets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Software Workshop provided</span>
                  </div>
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
