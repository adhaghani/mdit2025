"use client";

import React, { memo, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  WrenchIcon,
  ClockIcon,
  MailIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { MaintenanceInfo, MaintenanceUpdate } from "@/types";
// Type definitions

const MaintenancePage = memo(() => {
  // State for countdown timer
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  // Maintenance information (this would typically come from an API or config)
  const maintenanceInfo = useMemo<MaintenanceInfo>(
    () => ({
      title: "Scheduled System Maintenance",
      description:
        "We are performing essential updates to improve your MDIT 2025 experience.",
      estimatedDuration: "2-3 hours",
      startTime: new Date("2025-08-01T02:00:00Z"), // Example maintenance window
      endTime: new Date("2025-08-01T05:00:00Z"),
      reason: "Server upgrades and security enhancements",
      status: "in-progress",
    }),
    []
  );

  // Maintenance updates
  const maintenanceUpdates = useMemo<MaintenanceUpdate[]>(
    () => [
      {
        timestamp: new Date("2025-08-01T02:00:00Z"),
        message:
          "Maintenance has begun. User registration system temporarily unavailable.",
        type: "info",
      },
      {
        timestamp: new Date("2025-08-01T02:30:00Z"),
        message:
          "Database optimization in progress. Expected completion in 1-2 hours.",
        type: "info",
      },
      {
        timestamp: new Date("2025-08-01T03:15:00Z"),
        message:
          "Server upgrades completed successfully. Testing new features.",
        type: "success",
      },
    ],
    []
  );

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endTime = maintenanceInfo.endTime;
      const diff = endTime.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining("Maintenance should be completing soon...");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [maintenanceInfo.endTime]);

  // Get status color and icon
  const statusInfo = useMemo(() => {
    switch (maintenanceInfo.status) {
      case "scheduled":
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          icon: ClockIcon,
          label: "Scheduled",
        };
      case "in-progress":
        return {
          color: "text-orange-500",
          bgColor: "bg-orange-500/10",
          icon: WrenchIcon,
          label: "In Progress",
        };
      case "completed":
        return {
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          icon: CheckCircleIcon,
          label: "Completed",
        };
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-500/10",
          icon: AlertCircleIcon,
          label: "Unknown",
        };
    }
  }, [maintenanceInfo.status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo Section */}
        <BlurFade delay={0.1}>
          <div className="flex mt-32 justify-center mb-6">
            <Image
              src="/mdit.svg"
              alt="MDIT 2025 Logo"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
        </BlurFade>

        {/* Main Maintenance Content */}
        <BlurFade delay={0.2}>
          <div className="space-y-6">
            <div
              className={`mx-auto w-24 h-24 ${statusInfo.bgColor} rounded-full flex items-center justify-center mb-6`}
            >
              <statusInfo.icon className={`h-12 w-12 ${statusInfo.color}`} />
            </div>
            <Text as="h1" className="text-3xl lg:text-4xl font-bold">
              {maintenanceInfo.title}
            </Text>
            <Text
              as="p"
              styleVariant="muted"
              className="text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {maintenanceInfo.description}
            </Text>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.bgColor}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${statusInfo.color.replace(
                  "text-",
                  "bg-"
                )} animate-pulse`}
              ></div>
              <div className={`text-sm font-medium ${statusInfo.color}`}>
                Status: {statusInfo.label}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Countdown Timer */}
        {maintenanceInfo.status === "in-progress" && (
          <BlurFade delay={0.3}>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 justify-center">
                  <ClockIcon className="h-5 w-5" />
                  Estimated Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-primary">
                    {timeRemaining}
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.max(
                          20,
                          Math.min(80, 60 + Math.random() * 20)
                        )}%`, // Simulated progress
                      }}
                    ></div>
                  </div>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Expected completion:{" "}
                    {maintenanceInfo.endTime.toLocaleString()}
                  </Text>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* Maintenance Details */}
        <BlurFade delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Maintenance Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div>
                  <Text as="p" className="font-semibold text-sm mb-1">
                    Duration:
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    {maintenanceInfo.estimatedDuration}
                  </Text>
                </div>
                <div>
                  <Text as="p" className="font-semibold text-sm mb-1">
                    Start Time:
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    {maintenanceInfo.startTime.toLocaleString()}
                  </Text>
                </div>
                <div>
                  <Text as="p" className="font-semibold text-sm mb-1">
                    Reason:
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    {maintenanceInfo.reason}
                  </Text>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">What We&apos;re Doing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text as="p" className="text-sm">
                    Upgrading server infrastructure
                  </Text>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text as="p" className="text-sm">
                    Implementing security enhancements
                  </Text>
                </div>
                <div className="flex items-start gap-3">
                  <WrenchIcon className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <Text as="p" className="text-sm">
                    Optimizing database performance
                  </Text>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <Text as="p" className="text-sm">
                    Testing new features
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>

        {/* Live Updates */}
        <BlurFade delay={0.5}>
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-lg">Live Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-left max-h-60 overflow-y-auto">
                {maintenanceUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/20"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        update.type === "success"
                          ? "bg-green-500"
                          : update.type === "warning"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="space-y-1">
                      <Text as="p" className="text-sm">
                        {update.message}
                      </Text>
                      <Text as="p" styleVariant="muted" className="text-xs">
                        {update.timestamp.toLocaleTimeString()}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Action Buttons */}
        <BlurFade delay={0.6}>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
              >
                <RefreshCwIcon className="h-4 w-4" />
                Refresh Page
              </Button>
              <Link href="/contact">
                <Button variant="secondary" className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </BlurFade>

        {/* Footer */}
        <BlurFade delay={0.7}>
          <div className="space-y-2">
            <Text as="p" styleVariant="muted" className="text-sm">
              Thank you for your patience during this maintenance window.
            </Text>
            <Text as="p" styleVariant="muted" className="text-xs">
              MDIT 2025 • Malaysia Data Innovation Talent • Follow us for
              updates
            </Text>
          </div>
        </BlurFade>
      </div>
    </div>
  );
});

MaintenancePage.displayName = "MaintenancePage";

export default MaintenancePage;
