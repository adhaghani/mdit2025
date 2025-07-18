"use client";

import { Text } from "@/components/ui/text";
import NumberFlow from "@number-flow/react";
import {
  CalendarIcon,
  CalendarSearchIcon,
  MapPinIcon,
  MonitorSmartphoneIcon,
  MonitorXIcon,
  UsersIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useStartCountdown } from "@/hooks/useStartCountdown";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { CountingNumber } from "@/components/animate-ui/text/counting-number";
import Image from "next/image";

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
      <div className="min-h-fit h-[90vh] max-h-[700px]">
        <div className="relative text-center py-24 md:py-24 lg:py-32 flex flex-col item-center justify-center gap-4">
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
      </div>
      <div className="my-20">
        <Text as="h1" className="text-center">
          About <span className="text-primary">MDIT 2025</span>
        </Text>
        <Text as="p" className="text-center max-w-[800px] mt-4 mx-auto">
          MDIT 2025 is a national inter-varsity program aimed at fostering
          innovation and collaboration among students in the fields of computer
          science and mathematics. This competition aims to ignite the minds of
          participants, motivating them to think critically about data studies
          and become skilled in precise and transparent analysis.
        </Text>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Objective of MDIT</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
            tenetur sint facilis accusantium similique eveniet in corporis ut
            inventore quisquam.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">
              Experience you will gain
            </CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quod.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">What can you expect</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nam
            adipisci reiciendis. Provident dignissimos cumque sapiente rem qui.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">What will you learn</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
            laudantium sint, corporis quae ratione autem?
          </CardContent>
        </Card>
      </div>
      <div className="my-20">
        <Text as="h1" className="text-center">
          Event Details
        </Text>
      </div>
      <div className="my-20 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon />
                <Text as="h4">Date</Text>
              </CardTitle>
              <Text as="p">6 September - 18 October 2025</Text>
            </CardHeader>
            <CardContent>1</CardContent>
          </Card>{" "}
          <Card>
            {" "}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon />
                <Text as="h4">Location</Text>
              </CardTitle>
              <Text as="p">To Be Announced</Text>
            </CardHeader>
            <CardContent>2</CardContent>
          </Card>{" "}
          <Card>
            {" "}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MonitorSmartphoneIcon />
                <Text as="h4">Event Format</Text>
              </CardTitle>

              <Text as="p">Online and Physical</Text>
            </CardHeader>
            <CardContent>3</CardContent>
          </Card>
        </div>
        <Card>
          {" "}
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon />
              <Text as="h4">Team Requirement</Text>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3">
            <div>
              <Text as="h4">Team Size</Text>
              <Text as="p">4 members per team with a minimum of 3 members</Text>
            </div>
            <div>
              <Text as="h4">Eligibility</Text>
              <Text as="p">
                Open to all University Students across Malaysia
              </Text>
            </div>
            <div>
              <Text as="h4">Registration Fee</Text>
              <Text as="p">100% Free, limited slots are available</Text>
            </div>
          </CardContent>
        </Card>
        <Button className="ml-auto">
          View More Details <ChevronRightIcon />
        </Button>
      </div>
      <div className="mt-20 mb-10">
        <Text as="h1" className="text-center">
          Organizers
        </Text>
        <Text
          as="p"
          styleVariant="muted"
          className="text-center max-w-[800px] mt-4 mx-auto"
        >
          This event was organized by the INSTATS club of Universiti Teknologi
          MARA, Shah Alam with the support of Faculty of Computer Sciene and
          Mathematics UiTM Shah Alam and in Collaboration with Department of
          Statistic Malaysia (DOSM)
        </Text>
      </div>
      <div className="mt-10 mb-20">
        <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12 flex-wrap">
          <div className="flex flex-col justify-center items-center gap-2 max-w-[400px] w-full">
            <Image
              src="/uitm.svg"
              alt="UiTM Logo"
              width={100}
              height={100}
              className="w-32 h-16 sm:w-48 sm:h-24"
            />
            <Text as="p" className="text-center">
              Faculty of Computer Science and Mathematics,
              <br /> Universiti Teknologi MARA
            </Text>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 max-w-[400px] w-full">
            <Image
              src="/dosm.svg"
              alt="DOSM Logo"
              width={100}
              height={100}
              className="w-32 h-16 sm:w-48 sm:h-24"
            />
            <Text as="p" className="text-center">
              Department of Statistics Malaysia,
              <br /> Ministry of Economy Malaysia
            </Text>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 max-w-[400px] w-full">
            <Image
              src="/instats.svg"
              alt="MDIT 2025 Logo"
              width={100}
              height={100}
              className="w-24 h-24 sm:w-24 sm:h-24 "
            />
            <Text as="p" className="text-center">
              Statistic Club,
              <br /> INSTATS
            </Text>
          </div>
        </div>
      </div>
      <div className="my-20">
        <Text as="h1" className="text-center">
          Sponsors
        </Text>
        <Text as="p" className="text-center max-w-[800px] mt-4 mx-auto">
          MDIT 2025 is a national inter-varsity program aimed at fostering
          innovation and collaboration among students in the fields of computer
          science and mathematics. This competition aims to ignite the minds of
          participants, motivating them to think critically about data studies
          and become skilled in precise and transparent analysis.
        </Text>
      </div>
      <div className="my-20">
        <Text as="h1" className="text-center">
          Media Partner
        </Text>
        <Text as="p" className="text-center max-w-[800px] mt-4 mx-auto">
          MDIT 2025 is a national inter-varsity program aimed at fostering
          innovation and collaboration among students in the fields of computer
          science and mathematics. This competition aims to ignite the minds of
          participants, motivating them to think critically about data studies
          and become skilled in precise and transparent analysis.
        </Text>
      </div>
    </>
  );
};

export default Page;
``;
