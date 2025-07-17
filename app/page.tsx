"use client";

import { Text } from "@/components/ui/text";
import NumberFlow from "@number-flow/react";
import { Card, CardContent } from "@/components/ui/card";
import { useStartCountdown } from "@/hooks/useStartCountdown";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { CountingNumber } from "@/components/animate-ui/text/counting-number";

const Page = () => {
  // Target date: August 30, 2025, GMT+8 (midnight)
  const { hasStarted, timeLeft, isExpired } = useStartCountdown(
    "2025-08-30T00:00:00+08:00", // Count down to August 30
    "2025-08-10T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  const { timeLeft: timeUntilRegistration } = useStartCountdown(
    "2025-08-10T00:00:00+08:00" // Count down to August 10
  );

  return (
    <>
      <div className="relative text-center min-h-fit py-18 flex flex-col item-center justify-center gap-4">
        <Text
          as="h1"
          className="absolute inset-0 !text-9xl flex items-center justify-center text-primary/30 z-0"
        >
          <CountingNumber number={2025} />
        </Text>
        <Text as="h1" className="relative z-10">
          MDIT
        </Text>
        <Text as="h1" className="relative z-10">
          X
        </Text>
        <Text as="h1" className="relative z-10">
          DOSM DATATHON
        </Text>
      </div>
      <div className="py-8">
        <Text as="h3" className="text-center mb-6">
          {isExpired
            ? "Registration has closed"
            : hasStarted
            ? "Countdown until Registration closed"
            : "Countdown until Registration begin"}
        </Text>
        <div className="flex justify-center w-fit mx-auto  rounded-lg items-center gap-4 flex-wrap">
          <div className="text-center space-y-2">
            {" "}
            <Card className="text-center">
              <CardContent>
                <NumberFlow
                  value={
                    hasStarted ? timeLeft.days : timeUntilRegistration.days
                  }
                  format={{ minimumIntegerDigits: 2 }}
                  className="lg:text-5xl md:text-3xl text-xl font-bold w-[21px] md:w-[40px] lg:w-[55px] text-primary"
                />
              </CardContent>
            </Card>
            <Text as="p" className="text-sm text-muted-foreground">
              Days
            </Text>
          </div>
          <div className="text-center space-y-2">
            <Card className="text-center">
              <CardContent>
                <NumberFlow
                  value={
                    hasStarted ? timeLeft.hours : timeUntilRegistration.hours
                  }
                  format={{ minimumIntegerDigits: 2 }}
                  className="lg:text-5xl md:text-3xl text-xl font-bold w-[21px] md:w-[40px] lg:w-[55px] text-primary"
                />
              </CardContent>
            </Card>
            <Text as="p" className="text-sm text-muted-foreground">
              Hours
            </Text>
          </div>
          <div className="text-center space-y-2">
            {" "}
            <Card className="text-center">
              <CardContent>
                <NumberFlow
                  value={
                    hasStarted
                      ? timeLeft.minutes
                      : timeUntilRegistration.minutes
                  }
                  format={{ minimumIntegerDigits: 2 }}
                  className="lg:text-5xl md:text-3xl text-xl w-[21px] md:w-[40px] lg:w-[55px] font-bold text-primary"
                />
              </CardContent>
            </Card>
            <Text as="p" className="text-sm text-muted-foreground">
              Minutes
            </Text>
          </div>
          <div className="text-center space-y-2">
            <Card className="text-center">
              <CardContent>
                <NumberFlow
                  value={
                    hasStarted
                      ? timeLeft.seconds
                      : timeUntilRegistration.seconds
                  }
                  format={{ minimumIntegerDigits: 2 }}
                  className="lg:text-5xl md:text-3xl text-xl font-bold w-[21px] lg:w-[55px] md:w-[40px] text-primary"
                />
              </CardContent>
            </Card>
            <Text as="p" className="text-sm text-muted-foreground">
              Seconds
            </Text>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 flex-wrap pb-8">
        {hasStarted && !isExpired ? (
          <Button size={"lg"} variant="default">
            Register Now
          </Button>
        ) : isExpired ? (
          <Button size={"lg"} variant="outline" disabled>
            Registration Closed
          </Button>
        ) : null}
        <Button size={"lg"} variant="outline">
          Learn More
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>
    </>
  );
};

export default Page;
``;
