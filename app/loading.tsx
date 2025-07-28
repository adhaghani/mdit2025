"use client";

import React, { memo } from "react";
import { Text } from "@/components/ui/text";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";

// Loading animation component
const LoadingSpinner = memo(() => (
  <div className="relative">
    {/* Outer ring */}
    <div className="w-16 h-16 border-4 border-muted/20 border-t-primary rounded-full animate-spin"></div>
    {/* Inner ring */}
    <div className="absolute inset-2 w-12 h-12 border-4 border-muted/10 border-b-purple-500 rounded-full animate-spin-reverse"></div>
    {/* Center dot */}
    <div className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-primary to-purple-500 rounded-full animate-pulse"></div>
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

// Loading dots animation
const LoadingDots = memo(() => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        className="w-2 h-2 bg-primary rounded-full animate-bounce"
        style={{
          animationDelay: `${index * 0.2}s`,
          animationDuration: "1s",
        }}
      ></div>
    ))}
  </div>
));

LoadingDots.displayName = "LoadingDots";

const Loading = memo(() => {
  return (
    <div className="fixed top-0 left-0 min-w-screen z-[100000] min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* Logo Section */}
        <BlurFade delay={0.1}>
          <div className="flex justify-center mb-6">
            <Image
              src="/mdit.svg"
              alt="MDIT 2025 Logo"
              width={80}
              height={80}
              className="w-20 h-20 animate-pulse"
            />
          </div>
        </BlurFade>

        {/* Loading Spinner */}
        <BlurFade delay={0.2}>
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        </BlurFade>

        {/* Loading Text */}
        <BlurFade delay={0.3}>
          <div className="space-y-4">
            <Text as="h2" className="text-xl lg:text-2xl font-semibold">
              Loading MDIT 2025
            </Text>
            <Text as="p" styleVariant="muted" className="text-base">
              Preparing your data innovation experience
            </Text>
          </div>
        </BlurFade>

        {/* Loading Dots */}
        <BlurFade delay={0.4}>
          <div className="flex justify-center">
            <LoadingDots />
          </div>
        </BlurFade>

        {/* Progress indicator */}
        <BlurFade delay={0.5}>
          <div className="space-y-3">
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full animate-pulse"></div>
            </div>
            <Text as="p" styleVariant="muted" className="text-sm">
              Setting up your session...
            </Text>
          </div>
        </BlurFade>

        {/* Additional loading states for longer loads */}
        <BlurFade delay={0.6}>
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="w-1 h-1 bg-current rounded-full animate-ping"></div>
              <Text as="p" className="text-xs">
                This is taking longer than usual
              </Text>
              <div
                className="w-1 h-1 bg-current rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
            <Text as="p" styleVariant="muted" className="text-xs">
              Thank you for your patience
            </Text>
          </div>
        </BlurFade>
      </div>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;
