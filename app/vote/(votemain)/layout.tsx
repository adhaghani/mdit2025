"use client";

import React, { useEffect, useState } from "react";
import { useCountdown } from "@/contexts/vote-countdown-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Clock, AlertCircle } from "lucide-react";
import NumberFlow from "@number-flow/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { hasVoteStarted, timeLeft, isExpired, timeUntilRegistration } =
    useCountdown();
  const router = useRouter();
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    // If voting hasn't started or has expired, redirect to home
    if (!hasVoteStarted || isExpired) {
      if (!hasShownToast) {
        if (isExpired) {
          toast.error("Voting has ended.");
        } else if (!hasVoteStarted) {
          toast.info("Voting has not started yet.");
        }
        setHasShownToast(true);
      }

      // Redirect after a short delay
      const timeout = setTimeout(() => {
        router.push("/");
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [hasVoteStarted, isExpired, router, hasShownToast]);

  // Show countdown if voting hasn't started
  if (!hasVoteStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="text-center pt-12 pb-8">
            <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto">
              <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <Text as="h2" className="mb-4">
              Voting Starts Soon
            </Text>
            <Text as="p" className="text-muted-foreground mb-8">
              Get ready! Voting will begin in:
            </Text>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="text-center">
                <Card>
                  <CardContent>
                    <NumberFlow
                      value={timeUntilRegistration.days}
                      format={{ minimumIntegerDigits: 2 }}
                      className="text-4xl font-bold text-primary"
                    />
                  </CardContent>
                </Card>
                <Text as="p" className="text-sm text-muted-foreground mt-2">
                  Days
                </Text>
              </div>

              <div className="text-center">
                <Card>
                  <CardContent>
                    <NumberFlow
                      value={timeUntilRegistration.hours}
                      format={{ minimumIntegerDigits: 2 }}
                      className="text-4xl font-bold text-primary"
                    />
                  </CardContent>
                </Card>
                <Text as="p" className="text-sm text-muted-foreground mt-2">
                  Hours
                </Text>
              </div>

              <div className="text-center">
                <Card>
                  <CardContent>
                    <NumberFlow
                      value={timeUntilRegistration.minutes}
                      format={{ minimumIntegerDigits: 2 }}
                      className="text-4xl font-bold text-primary"
                    />
                  </CardContent>
                </Card>
                <Text as="p" className="text-sm text-muted-foreground mt-2">
                  Minutes
                </Text>
              </div>

              <div className="text-center">
                <Card>
                  <CardContent>
                    <NumberFlow
                      value={timeUntilRegistration.seconds}
                      format={{ minimumIntegerDigits: 2 }}
                      className="text-4xl font-bold text-primary"
                    />
                  </CardContent>
                </Card>
                <Text as="p" className="text-sm text-muted-foreground mt-2">
                  Seconds
                </Text>
              </div>
            </div>

            <Text as="p" className="text-sm text-muted-foreground">
              Redirecting to homepage...
            </Text>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show expired message if voting has ended
  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="text-center pt-12 pb-8">
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-full w-fit mx-auto">
              <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <Text as="h2" className="mb-4">
              Voting Has Ended
            </Text>
            <Text as="p" className="text-muted-foreground mb-4">
              Thank you for your interest! The voting period has concluded.
            </Text>
            <Text as="p" className="text-sm text-muted-foreground">
              Redirecting to homepage...
            </Text>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If voting is active, render the children (voting page)
  return <>{children}</>;
};

export default Layout;
