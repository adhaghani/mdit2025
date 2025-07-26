"use client";
import { Text } from "@/components/ui/text";
import NumberFlow from "@number-flow/react";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  TrophyIcon,
  ArrowRightIcon,
  DollarSignIcon,
  BookOpenIcon,
  TargetIcon,
  LightbulbIcon,
  Users2Icon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStartCountdown } from "@/hooks/useStartCountdown";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/animate-ui/radix/tooltip";
import { CountingNumber } from "@/components/animate-ui/text/counting-number";
import Image from "next/image";
import Link from "next/link";
import {
  MDIT2023_IMAGE,
  MDIT2024_IMAGE,
  KEY_STATISTICS,
  COMPETITION_HIGHLIGHTS,
} from "@/components/constant";

const Page = () => {
  // Target date: August 30, 2025, GMT+8 (midnight)
  const { hasStarted, timeLeft, isExpired } = useStartCountdown(
    "2025-08-30T00:00:00+08:00", // Count down to August 30
    "2025-08-10T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  const { timeLeft: timeUntilRegistration } = useStartCountdown(
    "2025-08-10T00:00:00+08:00" // Count down to August 10
  );

  // Competition phases
  const phases = [
    {
      phase: "Registration",
      date: "Aug 15-30, 2025",
      description:
        "Complete team registration and confirm participation via payment.",
      icon: UsersIcon,
      status: "upcoming",
    },
    {
      phase: "Briefing & Workshops",
      date: "Sep 6-20, 2025",
      description:
        "Overview of competition structure, themes, and deliverables, followed by a workshop to enhance data and presentation skills.",
      icon: BookOpenIcon,
      status: "upcoming",
    },
    {
      phase: "Preliminary round",
      date: "Sep 21 - Oct 15, 2025",
      description:
        "Project Development, Report submission, and online video presentation.",
      icon: LightbulbIcon,
      status: "upcoming",
    },
    {
      phase: "Final Round ",
      date: "Oct 17-18, 2025",
      description:
        "Shortlisted teams will pitch their projects physically to expert judges, demonstrating analytical clarity and impact",
      icon: TrophyIcon,
      status: "upcoming",
    },
  ];

  return (
    <>
      {/* Hero Section with Background Pattern */}
      <div className="relative min-h-fit h-[90vh] max-h-[700px] overflow-hidden">
        <div className="relative text-center py-24 md:py-24 lg:py-32 flex flex-col item-center justify-center gap-4">
          <BlurFade
            inView
            delay={0.15}
            className="grid place-items-center w-fit mx-auto rounded-full"
          >
            <Image
              alt="Logo of MDIT"
              src={"/mdit.svg"}
              width={100}
              height={100}
            />
          </BlurFade>

          <div className="relative z-10 space-y-6">
            <BlurFade inView delay={0.1}>
              <Text as="h1" className="text-primary">
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
                Join 100+ talented students from across Malaysia in this
                prestigious national datathon. Work with real government
                datasets and compete for RM11,600 in prizes.
              </Text>
            </BlurFade>

            {/* Countdown Timer */}
            <BlurFade inView delay={0.25}>
              <div className="mt-12 mb-8">
                <Text as="h3" className="mb-6">
                  {hasStarted
                    ? "Registration Closes In:"
                    : "Registration Opens In:"}
                </Text>
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  <div className="text-center space-y-2">
                    <Card className="text-center">
                      <CardContent>
                        <NumberFlow
                          value={
                            hasStarted
                              ? timeLeft.days
                              : timeUntilRegistration.days
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
                            hasStarted
                              ? timeLeft.hours
                              : timeUntilRegistration.hours
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
            </BlurFade>

            {/* Call to Action Buttons */}
            <BlurFade inView delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  disabled={!hasStarted || isExpired}
                  className="text-lg px-8 py-6"
                  asChild
                >
                  {isExpired ? (
                    <Link href="#">Registeration has closed</Link>
                  ) : hasStarted ? (
                    <Link href="#register">
                      Register Your Team
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                  ) : (
                    <Link href="#">Registeration will open soon</Link>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                  asChild
                >
                  <Link href="/event-details">
                    Learn More
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* About MDIT Section */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            About MDIT x DOSM Datathon 2025
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <div className="max-w-4xl mx-auto space-y-6">
            <Text as="p" className="text-lg leading-relaxed text-center">
              The Malaysia Data Innovation Talent x DOSM Datathon 2025 is a
              premier national competition that brings together the brightest
              minds from universities across Malaysia to tackle real-world data
              challenges.
            </Text>
            <Text as="p" className="text-lg leading-relaxed text-center">
              Organized in collaboration with the Department of Statistics
              Malaysia (DOSM) and Statistics Association (inStats) at UiTM Shah
              Alam,this competition encourages participants to utilize official
              government datasets alongside other open data sources to develop
              innovative, data-driven solutions that address real-world national
              challenges.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <BlurFade inView delay={0.2}>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/20 rounded-full w-fit">
                    <TargetIcon className="h-8 w-8 text-primary" />
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    Our Mission
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Foster innovation and collaboration among students in data
                    science and analytics while bridging the gap between
                    academia and industry.
                  </Text>
                </div>
              </BlurFade>
              <BlurFade inView delay={0.25}>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/20 rounded-full w-fit">
                    <LightbulbIcon className="h-8 w-8 text-primary" />
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    Innovation Focus
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Encourage creative thinking and innovative approaches to
                    solve real-world data challenges using cutting-edge
                    technologies.
                  </Text>
                </div>
              </BlurFade>
              <BlurFade inView delay={0.3}>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/20 rounded-full w-fit">
                    <Users2Icon className="h-8 w-8 text-primary" />
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    Collaboration
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Build a network of future data scientists and create lasting
                    partnerships between students, academia, and industry.
                  </Text>
                </div>
              </BlurFade>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Competition Highlights */}
      <div className="my-20 px-4">
        <BlurFade inView delay={0.1}>
          <div className="text-center mb-16 space-y-4">
            <Text
              as="h2"
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Why Join MDIT x DOSM Datathon 2025?
            </Text>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
          </div>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center text-lg mb-16 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the unique opportunities and benefits that make MDIT 2025
            the most prestigious data science competition in Malaysia.
            Experience innovation, collaboration, and excellence like never
            before.
          </Text>
        </BlurFade>

        {/* Enhanced Grid Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Top row - 3 columns with enhanced cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {COMPETITION_HIGHLIGHTS.slice(0, 3).map((highlight, index) => (
              <BlurFade key={index} inView delay={0.2 + index * 0.1}>
                <Card
                  className={`group relative h-full overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${highlight.bgColor} backdrop-blur-sm`}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                  <CardHeader className="relative text-center pt-8 pb-4 z-10">
                    <div
                      className={`mx-auto mb-6 p-5 rounded-2xl w-fit relative overflow-hidden transition-all duration-500 group-hover:scale-110 ${highlight.bgColor
                        .replace("50", "100")
                        .replace("900/30", "800/50")}`}
                    >
                      {/* Icon glow effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                          highlight.color.includes("yellow")
                            ? "from-yellow-400 to-yellow-600"
                            : highlight.color.includes("blue")
                            ? "from-blue-400 to-blue-600"
                            : highlight.color.includes("green")
                            ? "from-green-400 to-green-600"
                            : "from-purple-400 to-purple-600"
                        }`}
                      ></div>
                      <highlight.icon
                        className={`h-10 w-10 relative z-10 transition-all duration-500 group-hover:rotate-12 ${highlight.color}`}
                      />
                    </div>
                    <CardTitle
                      className={`text-xl font-bold transition-all duration-300 group-hover:scale-105 ${highlight.color}`}
                    >
                      {highlight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative text-center pb-8 px-6 z-10">
                    <Text
                      as="p"
                      styleVariant="muted"
                      className="text-sm leading-relaxed transition-all duration-300 group-hover:text-foreground/80"
                    >
                      {highlight.description}
                    </Text>

                    {/* Decorative element */}
                    <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto"></div>
                  </CardContent>

                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-current opacity-20 rounded-full animate-pulse"></div>
                  <div
                    className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-current opacity-20 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </Card>
              </BlurFade>
            ))}
          </div>

          {/* Bottom row - 2 columns centered with special styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {COMPETITION_HIGHLIGHTS.slice(3, 5).map((highlight, index) => (
              <BlurFade key={index + 3} inView delay={0.5 + index * 0.1}>
                <Card
                  className={`group relative h-full overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${highlight.bgColor} backdrop-blur-sm`}
                >
                  {/* Enhanced gradient overlay for bottom cards */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Special glow effect for bottom cards */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                  <CardHeader className="relative text-center pt-8 pb-4 z-10">
                    <div
                      className={`mx-auto mb-6 p-6 rounded-2xl w-fit relative overflow-hidden transition-all duration-500 group-hover:scale-110 ${highlight.bgColor
                        .replace("50", "100")
                        .replace("900/30", "800/50")}`}
                    >
                      {/* Enhanced icon glow for bottom cards */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-primary/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <highlight.icon
                        className={`h-12 w-12 relative z-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${highlight.color}`}
                      />
                    </div>
                    <CardTitle
                      className={`text-xl font-bold transition-all duration-300 group-hover:scale-105 ${highlight.color}`}
                    >
                      {highlight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative text-center pb-8 px-6 z-10">
                    <Text
                      as="p"
                      styleVariant="muted"
                      className="text-sm leading-relaxed transition-all duration-300 group-hover:text-foreground/80"
                    >
                      {highlight.description}
                    </Text>

                    {/* Enhanced decorative element */}
                    <div className="mt-6 w-20 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40 mx-auto"></div>
                  </CardContent>

                  {/* Multiple floating particles for bottom cards */}
                  <div className="absolute top-6 right-6 w-2 h-2 bg-purple-500 opacity-30 rounded-full animate-bounce"></div>
                  <div
                    className="absolute top-4 right-10 w-1 h-1 bg-primary opacity-40 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-500 opacity-30 rounded-full animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Call to action section */}
        <BlurFade inView delay={0.8}>
          <div className="text-center max-w-7xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 border border-primary/20">
            <Text
              as="h3"
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Ready to Experience Excellence?
            </Text>
            <Text
              as="p"
              styleVariant="muted"
              className="mb-6 max-w-2xl mx-auto"
            >
              Join Malaysia's most prestigious datathon and be part of a
              transformative journey that will shape your future in data
              science.
            </Text>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Discover More Details
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Competition Phases */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Competition Phases
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center  mb-12 max-w-2xl mx-auto"
          >
            Explore the key phases of the MDIT x DOSM Datathon 2025, designed to
            guide participants from registration to the final round.
          </Text>
        </BlurFade>
        <div className=" mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => {
              const colors = [
                {
                  bg: "bg-emerald-100 dark:bg-emerald-900/30",
                  icon: "text-emerald-600",
                },
                {
                  bg: "bg-indigo-100 dark:bg-indigo-900/30",
                  icon: "text-indigo-600",
                },
                {
                  bg: "bg-rose-100 dark:bg-rose-900/30",
                  icon: "text-rose-600",
                },
                {
                  bg: "bg-amber-100 dark:bg-amber-900/30",
                  icon: "text-amber-600",
                },
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <BlurFade key={index} inView delay={0.2 + index * 0.05}>
                  <Card className="relative h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div
                        className={`mx-auto mb-4 p-3 ${colorScheme.bg} rounded-full w-fit`}
                      >
                        <phase.icon className={`h-6 w-6 ${colorScheme.icon}`} />
                      </div>
                      <CardTitle className="text-lg">{phase.phase}</CardTitle>
                      <Text
                        as="p"
                        className={`text-sm font-semibold ${colorScheme.icon}`}
                      >
                        {phase.date}
                      </Text>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Text as="p" styleVariant="muted" className="text-sm">
                        {phase.description}
                      </Text>
                    </CardContent>
                    {index < phases.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-7 transform -translate-y-1/2">
                        <ArrowRightIcon
                          className={`size-8 ${colorScheme.icon}/50`}
                        />
                      </div>
                    )}
                  </Card>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-gradient-to-r from-slate-100/50 to-gray-100/50 dark:from-slate-800/30 dark:to-gray-800/30 rounded-lg my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Competition at a Glance
          </Text>
        </BlurFade>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {KEY_STATISTICS.map((stat, index) => {
            const colors = [
              { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600" },
              {
                bg: "bg-purple-100 dark:bg-purple-900/30",
                text: "text-purple-600",
              },
              { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-600" },
              { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600" },
            ];
            const colorScheme = colors[index % colors.length];

            return (
              <BlurFade key={index} inView delay={0.15 + index * 0.05}>
                <Card className="text-center hover:shadow-lg transition-shadow bg-background border-2">
                  <CardContent className="p-6">
                    <div
                      className={`mx-auto mb-4 p-3 ${colorScheme.bg} rounded-full w-fit`}
                    >
                      <stat.icon className={`h-6 w-6 ${colorScheme.text}`} />
                    </div>
                    <Text
                      as="h3"
                      className={`text-2xl font-bold ${colorScheme.text} mb-2`}
                    >
                      {stat.value}
                    </Text>
                    <Text as="p" styleVariant="muted" className="text-sm">
                      {stat.label}
                    </Text>
                  </CardContent>
                </Card>
              </BlurFade>
            );
          })}
        </div>
      </div>

      {/* Organizers Section */}
      <div className="mt-20 max-w-7xl mx-auto mb-10">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Organizing Partners
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            MDIT 2025 is proudly organized in collaboration with leading
            institutions committed to advancing data science education and
            innovation in Malaysia.
          </Text>
        </BlurFade>
        <Card className="p-8">
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src="/uitm.svg"
                    alt="UiTM Logo"
                    width={140}
                    height={120}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-24 relative z-10 transition-transform duration-300"
                  />
                </div>
                <Text as="p" className="mt-4 text-sm font-medium text-center">
                  Universiti Teknologi MARA (UiTM)
                </Text>
              </div>

              <div className="text-center">
                <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Light mode logo */}
                  <Image
                    src="/dosm.svg"
                    alt="Department of Statistics Malaysia"
                    width={120}
                    height={120}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-24 relative z-10 mx-auto transition-transform duration-300 dark:hidden"
                  />
                  {/* Dark mode logo */}
                  <Image
                    src="/DOSM_Light.svg"
                    alt="Department of Statistics Malaysia"
                    width={120}
                    height={120}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-24 relative z-10 mx-auto transition-transform duration-300 hidden dark:block"
                  />
                </div>
                <Text as="p" className="mt-4 text-sm font-medium text-center">
                  Department of Statistics Malaysia (DOSM)
                </Text>
              </div>

              <div className="text-center">
                <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src="/instats.svg"
                    alt="InStats UiTM"
                    width={120}
                    height={120}
                    className="w-24 h-24 sm:w-24 sm:h-24 hover:scale-105 transition-transform"
                  />
                </div>
                <Text as="p" className="mt-4 text-sm font-medium text-center">
                  InStats UiTM Shah Alam
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sponsors Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Official Sponsors
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            We are grateful to our sponsors who make MDIT 2025 possible by
            supporting innovation and excellence in data science education
            across Malaysia.
          </Text>
        </BlurFade>
        <Card className="p-8">
          <CardContent>
            <TooltipProvider delayDuration={0}>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Platinum Sponsor"
                        width={120}
                        height={120}
                        className="w-28 h-28 sm:w-32 sm:h-32 relative z-10 transition-transform duration-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Platinum Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Gold Sponsor"
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 transition-transform duration-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Gold Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Silver Sponsor"
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 transition-transform duration-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Silver Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Bronze Sponsor"
                        width={120}
                        height={120}
                        className="w-20 h-20 sm:w-24 sm:h-24 relative z-10 transition-transform duration-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Bronze Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Technology Partner"
                        width={120}
                        height={120}
                        className="w-20 h-20 sm:w-24 sm:h-24 relative z-10 transition-transform duration-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Technology Partner
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>

      {/* Media Partners Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Media Partners
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            Our media partners help us reach talented students across Malaysia
            and spread awareness about the importance of data science and
            innovation in today&apos;s digital world.
          </Text>
        </BlurFade>
        <Card className="p-8">
          <CardContent>
            <TooltipProvider delayDuration={0}>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Media Partner 1"
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 transition-transform duration-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Media Partner 1
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Media Partner 2"
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 transition-transform duration-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Media Partner 2
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Media Partner 3"
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Media Partner 3
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/instats.svg"
                        alt="Media Partner 4"
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Media Partner 4
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>

      {/* Registration Section */}
      <div id="register" className="my-20 py-20 bg-primary/10 rounded-lg">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Ready to Register?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-8 max-w-2xl mx-auto"
          >
            Don&apos;t miss this opportunity to be part of Malaysia&apos;s most
            prestigious data science competition. Register your team now and
            start your journey toward data excellence!
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                disabled={!hasStarted}
                className="text-lg px-8 py-6"
              >
                {hasStarted ? "Register Now" : "Registration Opening Soon"}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link href="/frequently-asked-questions">
                  Have Questions? View FAQ
                </Link>
              </Button>
            </div>
            <Text as="p" className="text-sm text-muted-foreground">
              Registration deadline: August 30, 2025 • Limited slots available
            </Text>
          </div>
        </BlurFade>
      </div>

      {/* MDIT 2024 Memories */}
      <div className="max-w-7xl mx-auto py-16">
        <BlurFade delay={0.2}>
          <Text
            as="h2"
            className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent"
          >
            MDIT 2024 Memories
          </Text>
          <Text
            as="p"
            className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            Relive the excitement and innovation from last year&apos;s Malaysian
            Data Innovation Tournament. See the passion, dedication, and
            brilliant minds that made MDIT 2024 an unforgettable experience.
          </Text>
        </BlurFade>

        <BlurFade delay={0.4} className="my-3">
          <Card>
            <CardContent className="relative">
              <Marquee className="flex gap-4 rounded-lg">
                {MDIT2024_IMAGE.map((image, index) => (
                  <Image
                    key={index}
                    className="aspect-video object-cover md:max-w-xl max-w-[200px] w-full rounded-lg object-center"
                    src={image.src}
                    alt={image.alt}
                    quality={100}
                    width={500}
                    height={200}
                  />
                ))}
              </Marquee>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.4}>
          <Card>
            <CardContent className="relative">
              <Marquee reverse className="flex gap-4 rounded-lg">
                {MDIT2024_IMAGE.map((image, index) => (
                  <Image
                    key={index}
                    className="aspect-video object-cover md:max-w-xl max-w-[200px] w-full rounded-lg object-center"
                    src={image.src}
                    alt={image.alt}
                    quality={100}
                    width={500}
                    height={200}
                  />
                ))}
              </Marquee>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* MDIT 2023 Memories */}
      <div className="max-w-7xl mx-auto py-16">
        <BlurFade delay={0.2}>
          <Text
            as="h2"
            className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent"
          >
            MDIT 2023 Memories
          </Text>
          <Text
            as="p"
            className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          >
            Relive the excitement and innovation from last year&apos;s Malaysian
            Data Innovation Tournament. See the passion, dedication, and
            brilliant minds that made MDIT 2023 an unforgettable experience.
          </Text>
        </BlurFade>

        <BlurFade delay={0.4} className="my-3">
          <Card>
            <CardContent className="relative">
              <Marquee className="flex gap-4 rounded-lg [--duration:50s]">
                {MDIT2023_IMAGE.map((image, index) => (
                  <Image
                    key={index}
                    className="aspect-video object-cover md:max-w-xl max-w-[200px] w-full rounded-lg object-center"
                    src={image.src}
                    alt={image.alt}
                    quality={100}
                    width={500}
                    height={200}
                  />
                ))}
              </Marquee>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.4}>
          <Card>
            <CardContent className="relative">
              <Marquee
                reverse
                className="flex gap-4 rounded-lg [--duration:50s]"
              >
                {MDIT2023_IMAGE.map((image, index) => (
                  <Image
                    key={index}
                    className="aspect-video object-cover md:max-w-xl max-w-[200px] w-full rounded-lg object-center"
                    src={image.src}
                    alt={image.alt}
                    quality={100}
                    width={500}
                    height={200}
                  />
                ))}
              </Marquee>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </>
  );
};

export default Page;
