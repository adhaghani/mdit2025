"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useCountdown } from "@/contexts/countdown-context";

const RegistrationClosingSoonBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { hasStarted, timeLeft, isExpired } = useCountdown();

  // Auto-hide banner if registration has expired
  useEffect(() => {
    if (isExpired) {
      setIsVisible(false);
    }
  }, [isExpired]);

  const handleClose = () => {
    setIsVisible(false);
    // Store in localStorage to remember user's choice for this session
    sessionStorage.setItem("registrationBannerClosed", "true");
  };

  // Check if user previously closed the banner
  useEffect(() => {
    const wasClosed = sessionStorage.getItem("registrationBannerClosed");
    if (wasClosed === "true") {
      setIsVisible(false);
    }
  }, []);

  const isUrgent = timeLeft.days <= 5; // Mark as urgent if 5 days or less
  const isCritical = timeLeft.days <= 3; // Mark as critical if 3 days or less

  if (!isVisible || isExpired || !hasStarted) return null;

  return (
    <div className="max-w-7xl z-50 fixed top-20 left-[50%] translate-x-[-50%] w-full lg:mx-auto px-4">
      <div className="backdrop-blur-sm rounded-xl">
        <Card
          className={`w-full border-2 shadow-lg !backdrop-blur-md transition-all duration-300 ${
            isCritical
              ? "bg-red-950/90 border-red-500 animate-pulse"
              : isUrgent
              ? "bg-orange-950/90 border-orange-500"
              : "bg-blue-950/90 border-blue-500"
          }`}
        >
          <CardContent className="relative flex items-center justify-between gap-4">
            {/* Icon and Content */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`flex-shrink-0 p-2 rounded-full ${
                  isCritical
                    ? "bg-red-500/20 text-red-400"
                    : isUrgent
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {isCritical ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Text
                    as="h4"
                    className={`font-bold text-sm sm:text-base ${
                      isCritical
                        ? "text-red-200"
                        : isUrgent
                        ? "text-orange-200"
                        : "text-blue-200"
                    }`}
                  >
                    {isCritical
                      ? "🚨 LAST CHANCE!"
                      : isUrgent
                      ? "⚠️ Registration Closing Soon!"
                      : "⏰ Registration has been extended, register now!."}
                  </Text>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span
                      className={`font-mono font-bold ${
                        isCritical
                          ? "text-red-300"
                          : isUrgent
                          ? "text-orange-300"
                          : "text-blue-300"
                      }`}
                    >
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </span>
                    <span className="text-gray-300">remaining</span>
                  </div>
                </div>

                <Text as="p" className="text-xs sm:text-sm text-gray-300 mt-1">
                  {isCritical
                    ? "Registration is closing soon! Secure your spot now."
                    : isUrgent
                    ? "Only a few days left to register for MDIT 2025. Don't miss out!"
                    : "Limited slots available. Register your team before the deadline."}
                </Text>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute -top-6 right-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className=" hover:bg-gray-800/50 p-1 rounded-full cursor-pointer"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationClosingSoonBanner;
