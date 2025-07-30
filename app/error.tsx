"use client";

import React, { memo, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  HomeIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  WifiOffIcon,
  ServerIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Image from "next/image";

// Type definitions
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

interface ErrorSolution {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  variant: "default" | "outline" | "secondary";
}

const ErrorPage = memo(({ error, reset }: ErrorPageProps) => {
  // Log error for debugging
  useEffect(() => {
    console.error("Layout Error:", error);
  }, [error]);

  // Determine error type and provide solutions
  const errorAnalysis = useMemo(() => {
    const message = error.message.toLowerCase();

    if (message.includes("network") || message.includes("fetch")) {
      return {
        type: "Network Error",
        description:
          "Unable to connect to our servers. Please check your internet connection.",
        icon: WifiOffIcon,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
      };
    } else if (message.includes("server") || message.includes("500")) {
      return {
        type: "Server Error",
        description:
          "Our servers are experiencing issues. We're working to fix this.",
        icon: ServerIcon,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
      };
    } else {
      return {
        type: "Application Error",
        description:
          "Something unexpected happened. This error has been logged.",
        icon: AlertTriangleIcon,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
      };
    }
  }, [error.message]);

  // Memoize error solutions
  const errorSolutions = useMemo<ErrorSolution[]>(
    () => [
      {
        title: "Try Again",
        description: "Reload the page to attempt recovery",
        action: "Retry",
        onClick: reset,
        icon: RefreshCwIcon,
        variant: "default",
      },
      {
        title: "Go Back",
        description: "Return to the previous page",
        action: "Go Back",
        onClick: () => {
          if (typeof window !== "undefined") {
            window.history.back();
          }
        },
        icon: ArrowLeftIcon,
        variant: "outline",
      },
      {
        title: "Homepage",
        description: "Start over from the main page",
        action: "Go Home",
        onClick: () => {
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        },
        icon: HomeIcon,
        variant: "secondary",
      },
    ],
    [reset]
  );

  // Troubleshooting steps
  const troubleshootingSteps = useMemo(
    () => [
      "Check your internet connection",
      "Clear your browser cache and cookies",
      "Disable browser extensions temporarily",
      "Try using a different browser",
      "Contact support if the problem persists",
    ],
    []
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Logo Section */}
        <BlurFade delay={0.1}>
          <div className="flex justify-center mb-6">
            <Image
              src="/mdit.svg"
              alt="MDIT 2025 Logo"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>
        </BlurFade>

        {/* Error Header */}
        <BlurFade delay={0.2}>
          <div className="space-y-4">
            <div
              className={`mx-auto w-20 h-20 ${errorAnalysis.bgColor} rounded-full flex items-center justify-center mb-6`}
            >
              <errorAnalysis.icon
                className={`h-10 w-10 ${errorAnalysis.color}`}
              />
            </div>
            <Text as="h1" className="text-2xl lg:text-3xl font-bold">
              {errorAnalysis.type}
            </Text>
            <Text
              as="p"
              styleVariant="muted"
              className="text-base max-w-xl mx-auto leading-relaxed"
            >
              {errorAnalysis.description}
            </Text>
          </div>
        </BlurFade>

        {/* Solution Actions */}
        <BlurFade delay={0.3}>
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {errorSolutions.map((solution, index) => (
                  <BlurFade key={index} delay={0.4 + index * 0.1}>
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <CardContent className="p-4 text-center space-y-3">
                        <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <solution.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <Text as="h3" className="font-semibold text-sm">
                            {solution.title}
                          </Text>
                          <Text as="p" styleVariant="muted" className="text-xs">
                            {solution.description}
                          </Text>
                        </div>
                        <Button
                          variant={solution.variant}
                          size="sm"
                          className="w-full"
                          onClick={solution.onClick}
                        >
                          {solution.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </BlurFade>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Troubleshooting Guide */}
        <BlurFade delay={0.5}>
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Troubleshooting Steps</CardTitle>
              <Text as="p" styleVariant="muted" className="text-sm">
                If the error persists, try these steps:
              </Text>
            </CardHeader>
            <CardContent>
              <div className="text-left space-y-3">
                {troubleshootingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <Text as="p" className="text-sm">
                      {step}
                    </Text>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support Team
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === "development" && (
          <BlurFade delay={0.6}>
            <Card className="p-6 text-left">
              <CardHeader>
                <CardTitle className="text-lg">Development Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Text as="p" className="font-semibold text-sm mb-2">
                    Error Message:
                  </Text>
                  <code className="text-xs bg-muted p-3 rounded block">
                    {error.message}
                  </code>
                </div>
                {error.digest && (
                  <div>
                    <Text as="p" className="font-semibold text-sm mb-2">
                      Digest:
                    </Text>
                    <code className="text-xs bg-muted p-3 rounded block">
                      {error.digest}
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* Footer */}
        <BlurFade delay={0.7}>
          <div className="space-y-2">
            <Text as="p" styleVariant="muted" className="text-sm">
              Need immediate assistance?{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
                Contact our support team
              </Link>
            </Text>
            <Text as="p" styleVariant="muted" className="text-xs">
              MDIT 2025 • Error ID: {error.digest || "UNKNOWN"} •{" "}
              {new Date().toLocaleString()}
            </Text>
          </div>
        </BlurFade>
      </div>
    </div>
  );
});

ErrorPage.displayName = "ErrorPage";

export default ErrorPage;
