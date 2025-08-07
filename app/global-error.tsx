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
  BugIcon,
  MailIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Image from "next/image";

// Type definitions
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

interface ErrorAction {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  variant: "default" | "outline" | "destructive";
}

const GlobalError = memo(({ error, reset }: ErrorPageProps) => {
  // Log error for debugging
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  // Memoize error actions
  const errorActions = useMemo<ErrorAction[]>(
    () => [
      {
        title: "Try Again",
        description: "Attempt to reload the application",
        action: "Retry",
        onClick: reset,
        icon: RefreshCwIcon,
        variant: "default",
      },
      {
        title: "Go Home",
        description: "Return to the main page",
        action: "Go Home",
        onClick: () => (window.location.href = "/"),
        icon: HomeIcon,
        variant: "outline",
      },
      {
        title: "Go Back",
        description: "Return to the previous page",
        action: "Go Back",
        onClick: () => window.history.back(),
        icon: ArrowLeftIcon,
        variant: "outline",
      },
    ],
    [reset]
  );

  // Determine error type and message
  const errorInfo = useMemo(() => {
    const isNetworkError =
      error.message.includes("fetch") || error.message.includes("network");
    const isChunkError =
      error.message.includes("ChunkLoadError") ||
      error.message.includes("Loading chunk");

    if (isChunkError) {
      return {
        title: "Loading Error",
        description:
          "Failed to load application resources. This usually happens after an update.",
        code: "CHUNK_LOAD_ERROR",
        suggestion: "Please refresh the page to load the latest version.",
      };
    } else if (isNetworkError) {
      return {
        title: "Network Error",
        description:
          "Unable to connect to our servers. Please check your internet connection.",
        code: "NETWORK_ERROR",
        suggestion: "Check your connection and try again.",
      };
    } else {
      return {
        title: "Application Error",
        description: "Something went wrong while running the application.",
        code: "APPLICATION_ERROR",
        suggestion:
          "Try refreshing the page or contact support if the problem persists.",
      };
    }
  }, [error.message]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center p-4">
          <div className="max-w-4xl mt-32 mx-auto text-center space-y-8">
            {/* Logo Section */}
            <BlurFade delay={0.1}>
              <div className="flex justify-center mb-6">
                <Image
                  src="/mdit.svg"
                  alt="MDIT 2025 Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
            </BlurFade>

            {/* Main Error Content */}
            <BlurFade delay={0.2}>
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangleIcon className="h-12 w-12 text-destructive" />
                </div>
                <Text as="h1" className="text-3xl lg:text-4xl font-bold">
                  {errorInfo.title}
                </Text>
                <Text
                  as="p"
                  styleVariant="muted"
                  className="text-lg max-w-2xl mx-auto leading-relaxed"
                >
                  {errorInfo.description}
                </Text>
                <Text
                  as="p"
                  className="text-sm text-destructive/80 font-medium"
                >
                  {errorInfo.suggestion}
                </Text>
              </div>
            </BlurFade>

            {/* Action Buttons */}
            <BlurFade delay={0.3}>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl">
                    What would you like to do?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {errorActions.map((action, index) => (
                      <BlurFade key={index} delay={0.4 + index * 0.1}>
                        <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                          <CardContent className="p-6 text-center space-y-4">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <action.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-2">
                              <Text as="h3" className="font-semibold">
                                {action.title}
                              </Text>
                              <Text
                                as="p"
                                styleVariant="muted"
                                className="text-sm"
                              >
                                {action.description}
                              </Text>
                            </div>
                            <Button
                              variant={action.variant}
                              size="sm"
                              className="w-full"
                              onClick={action.onClick}
                            >
                              {action.action}
                            </Button>
                          </CardContent>
                        </Card>
                      </BlurFade>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Error Details (Development Mode) */}
            {process.env.NODE_ENV === "development" && (
              <BlurFade delay={0.5}>
                <Card className="p-6 text-left">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BugIcon className="h-5 w-5" />
                      Error Details (Development Mode)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Text as="p" className="font-semibold text-sm mb-2">
                          Error Code:
                        </Text>
                        <code className="text-xs bg-muted p-2 rounded block">
                          {errorInfo.code}
                        </code>
                      </div>
                      {error.digest && (
                        <div>
                          <Text as="p" className="font-semibold text-sm mb-2">
                            Digest:
                          </Text>
                          <code className="text-xs bg-muted p-2 rounded block">
                            {error.digest}
                          </code>
                        </div>
                      )}
                      <div>
                        <Text as="p" className="font-semibold text-sm mb-2">
                          Error Message:
                        </Text>
                        <code className="text-xs bg-muted p-2 rounded block whitespace-pre-wrap">
                          {error.message}
                        </code>
                      </div>
                      {error.stack && (
                        <div>
                          <Text as="p" className="font-semibold text-sm mb-2">
                            Stack Trace:
                          </Text>
                          <code className="text-xs bg-muted p-2 rounded block whitespace-pre-wrap max-h-40 overflow-auto">
                            {error.stack}
                          </code>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            )}

            {/* Support Information */}
            <BlurFade delay={0.6}>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 justify-center">
                    <MailIcon className="h-5 w-5" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Text as="p" styleVariant="muted" className="text-sm">
                    If this error persists, please contact our support team with
                    the following information:
                  </Text>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <Text as="p" className="font-semibold text-sm">
                      Error Information:
                    </Text>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Error Code: {errorInfo.code}</li>
                      <li>• Time: {new Date().toISOString()}</li>
                      <li>
                        • URL:{" "}
                        {typeof window !== "undefined"
                          ? window.location.href
                          : "N/A"}
                      </li>
                      {error.digest && <li>• Digest: {error.digest}</li>}
                    </ul>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Footer */}
            <BlurFade delay={0.7}>
              <Text as="p" styleVariant="muted" className="text-xs">
                MDIT 2025 • Malaysia Data Innovation Talent
              </Text>
            </BlurFade>
          </div>
        </div>
      </body>
    </html>
  );
});

GlobalError.displayName = "GlobalError";

export default GlobalError;
