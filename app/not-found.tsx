"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  HomeIcon,
  SearchIcon,
  ArrowLeftIcon,
  MapPinIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
} from "lucide-react";
import Image from "next/image";

// Type definitions
interface QuickLink {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SupportOption {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: "default" | "outline" | "secondary";
}

const NotFoundPage = memo(() => {
  // Memoize quick navigation links
  const quickLinks = useMemo<QuickLink[]>(
    () => [
      {
        href: "/",
        label: "Homepage",
        description: "Back to MDIT 2025 main page",
        icon: HomeIcon,
      },
      {
        href: "/about-us",
        label: "About Us",
        description: "Learn about MDIT 2025",
        icon: MapPinIcon,
      },
      {
        href: "/event-details",
        label: "Event Details",
        description: "Competition information",
        icon: SearchIcon,
      },
      {
        href: "/contact",
        label: "Contact",
        description: "Get in touch with us",
        icon: SearchIcon,
      },
    ],
    []
  );

  // Memoize support options
  const supportOptions = useMemo<SupportOption[]>(
    () => [
      {
        title: "Go Back",
        description: "Return to the previous page",
        action: "Go Back",
        href: "#",
        icon: ArrowLeftIcon,
        variant: "outline",
      },
      {
        title: "Refresh Page",
        description: "Try reloading this page",
        action: "Refresh",
        href: "#",
        icon: RefreshCwIcon,
        variant: "secondary",
      },
      {
        title: "Contact Support",
        description: "Need help? Contact our team",
        action: "Contact Us",
        href: "/contact",
        icon: AlertTriangleIcon,
        variant: "default",
      },
    ],
    []
  );

  // Handle back button click
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
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
            <Text
              as="h1"
              className="text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 tracking-tight"
            >
              404
            </Text>
            <Text as="h2" className="text-2xl lg:text-3xl font-bold">
              Page Not Found
            </Text>
            <Text
              as="p"
              styleVariant="muted"
              className="text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Oops! It looks like you&apos;ve ventured into uncharted data
              territory. The page you&apos;re looking for doesn&apos;t exist or
              may have been moved.
            </Text>
          </div>
        </BlurFade>

        {/* Quick Actions */}
        <BlurFade delay={0.3}>
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supportOptions.map((option, index) => (
                  <BlurFade key={index} delay={0.4 + index * 0.1}>
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <option.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <Text as="h3" className="font-semibold">
                            {option.title}
                          </Text>
                          <Text as="p" styleVariant="muted" className="text-sm">
                            {option.description}
                          </Text>
                        </div>
                        {option.href === "#" ? (
                          <Button
                            variant={option.variant}
                            size="sm"
                            className="w-full"
                            onClick={
                              option.title === "Go Back"
                                ? handleBack
                                : option.title === "Refresh Page"
                                ? handleRefresh
                                : undefined
                            }
                          >
                            {option.action}
                          </Button>
                        ) : (
                          <Link href={option.href} className="block">
                            <Button
                              variant={option.variant}
                              size="sm"
                              className="w-full"
                            >
                              {option.action}
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </BlurFade>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Quick Navigation */}
        <BlurFade delay={0.5}>
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl">Quick Navigation</CardTitle>
              <Text as="p" styleVariant="muted">
                Or explore these popular sections of MDIT 2025
              </Text>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                  <BlurFade key={index} delay={0.6 + index * 0.1}>
                    <Link href={link.href} className="block h-full">
                      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
                        <CardContent className="p-6 text-center space-y-4">
                          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full flex items-center justify-center">
                            <link.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <Text as="h3" className="font-semibold">
                              {link.label}
                            </Text>
                            <Text
                              as="p"
                              styleVariant="muted"
                              className="text-sm"
                            >
                              {link.description}
                            </Text>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </BlurFade>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Additional Help */}
        <BlurFade delay={0.7}>
          <div className="space-y-4">
            <Text as="p" styleVariant="muted" className="text-sm">
              If you believe this is an error, please{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
                contact our support team
              </Link>{" "}
              with the URL you were trying to access.
            </Text>
            <Text as="p" styleVariant="muted" className="text-xs">
              Error Code: 404 • Page Not Found • MDIT 2025
            </Text>
          </div>
        </BlurFade>
      </div>
    </div>
  );
});

NotFoundPage.displayName = "NotFoundPage";

export default NotFoundPage;
