"use client";
import { Text } from "@/components/ui/text";
import NumberFlow from "@number-flow/react";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  TrophyIcon,
  ArrowRightIcon,
  GraduationCapIcon,
  AwardIcon,
  DollarSignIcon,
  BookOpenIcon,
  PresentationIcon,
  TargetIcon,
  LightbulbIcon,
  Users2Icon,
  BrainIcon,
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

const Page = () => {
  // Target date: August 30, 2025, GMT+8 (midnight)
  const { hasStarted, timeLeft, isExpired } = useStartCountdown(
    "2025-08-30T00:00:00+08:00", // Count down to August 30
    "2025-08-10T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  const { timeLeft: timeUntilRegistration } = useStartCountdown(
    "2025-08-10T00:00:00+08:00" // Count down to August 10
  );

  // Key statistics
  const statistics = [
    { label: "Total Prize Pool", value: "RM 11,000", icon: TrophyIcon },
    { label: "Universities", value: "50+", icon: GraduationCapIcon },
    { label: "Expected Teams", value: "60+", icon: Users2Icon },
    { label: "Competition Days", value: "43", icon: CalendarIcon },
  ];

  // Competition highlights
  const highlights = [
    {
      icon: TrophyIcon,
      title: "Massive Prize Pool",
      description: "RM11,000 in total prizes with RM3,500 for first place",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: BrainIcon,
      title: "Real-World Datasets",
      description: "Work with actual government data from DOSM",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: PresentationIcon,
      title: "Industry Exposure",
      description: "Present to experts from PwC, DOSM, and UiTM",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: AwardIcon,
      title: "National Recognition",
      description: "Prestigious competition with certificates and trophies",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Competition phases
  const phases = [
    {
      phase: "Registration",
      date: "Aug 15-30, 2025",
      description: "Team registration and payment",
      icon: UsersIcon,
      status: "upcoming",
    },
    {
      phase: "Workshops",
      date: "Sep 6-20, 2025",
      description: "Online training and skill development",
      icon: BookOpenIcon,
      status: "upcoming",
    },
    {
      phase: "Competition",
      date: "Sep 21 - Oct 15, 2025",
      description: "Data analysis and solution development",
      icon: LightbulbIcon,
      status: "upcoming",
    },
    {
      phase: "Finals",
      date: "Oct 17-18, 2025",
      description: "Final presentations and awards ceremony",
      icon: TrophyIcon,
      status: "upcoming",
    },
  ];

  const Image_src_2024 = [
    {
      src: "/assets/mdit2024/DSC_0088.jpg",
      alt: "MDIT 2024 Image 1",
    },
    {
      src: "/assets/mdit2024/DSC_0148.jpg",
      alt: "MDIT 2024 Image 2",
    },
    {
      src: "/assets/mdit2024/DSC_0180.jpg",
      alt: "MDIT 2024 Image 3",
    },
    {
      src: "/assets/mdit2024/DSC_0198.jpg",
      alt: "MDIT 2024 Image 4",
    },
    {
      src: "/assets/mdit2024/DSC_0216.jpg",
      alt: "MDIT 2024 Image 5",
    },
    {
      src: "/assets/mdit2024/DSC_0248.jpg",
      alt: "MDIT 2024 Image 6",
    },
    {
      src: "/assets/mdit2024/DSC_0290.jpg",
      alt: "MDIT 2024 Image 7",
    },
  ];

  const Image_src_2023 = [
    {
      src: "/assets/mdit2023/DSC_0127.jpg",
      alt: "MDIT 2023 Image 1",
    },
    {
      src: "/assets/mdit2023/DSC_0133.jpg",
      alt: "MDIT 2023 Image 2",
    },
    {
      src: "/assets/mdit2023/DSC_0141.jpg",
      alt: "MDIT 2023 Image 3",
    },
    {
      src: "/assets/mdit2023/DSC_0143.jpg",
      alt: "MDIT 2023 Image 4",
    },
    {
      src: "/assets/mdit2023/DSC_0194.jpg",
      alt: "MDIT 2023 Image 5",
    },
    {
      src: "/assets/mdit2023/DSC_0221.jpg",
      alt: "MDIT 2023 Image 6",
    },
    {
      src: "/assets/mdit2023/DSC_0239.jpg",
      alt: "MDIT 2023 Image 7",
    },
    {
      src: "/assets/mdit2023/DSC_0255.jpg",
      alt: "MDIT 2023 Image 8",
    },
    {
      src: "/assets/mdit2023/DSC_0256.jpg",
      alt: "MDIT 2023 Image 9",
    },
  ];

  return (
    <>
      {/* Hero Section with Background Pattern */}
      <div className="relative min-h-fit h-[90vh] max-h-[700px] overflow-hidden">
        <div className="relative text-center py-24 md:py-24 lg:py-32 flex flex-col item-center justify-center gap-4">
          <BlurFade
            inView
            delay={0.05}
            className="absolute inset-0 !text-9xl flex items-center justify-center text-primary/30 z-0"
          >
            <Text
              as="h1"
              className="absolute inset-0 !text-9xl flex items-center justify-center text-primary/30 z-0"
            >
              <CountingNumber number={2025} />
            </Text>
          </BlurFade>

          <div className="relative z-10 space-y-6">
            <BlurFade inView delay={0.1}>
              <Text as="h1" className="text-primary">
                MDIT x DOSM Datathon 2025
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
                Join 200+ talented students from across Malaysia in this
                prestigious national datathon. Work with real government
                datasets and compete for RM11,000 in prizes.
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

      {/* Statistics Section */}
      <div className="py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Competition at a Glance
          </Text>
        </BlurFade>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {statistics.map((stat, index) => (
            <BlurFade key={index} inView delay={0.15 + index * 0.05}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Text
                    as="h3"
                    className="text-2xl font-bold text-primary mb-2"
                  >
                    {stat.value}
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    {stat.label}
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Competition Highlights */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Why Join MDIT 2025?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center  mb-12 max-w-2xl mx-auto"
          >
            Discover the unique opportunities and benefits that make MDIT 2025
            the most prestigious data science competition in Malaysia.
          </Text>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <BlurFade key={index} inView delay={0.2 + index * 0.05}>
              <Card
                className={`h-full hover:shadow-lg transition-shadow ${highlight.bgColor}`}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-white rounded-full shadow-sm w-fit">
                    <highlight.icon className={`h-8 w-8 ${highlight.color}`} />
                  </div>
                  <CardTitle className={`text-lg ${highlight.color}`}>
                    {highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Text
                    as="p"
                    styleVariant="muted"
                    className={`text-sm text-black`}
                  >
                    {highlight.description}
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* About MDIT Section */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            About MDIT 2025
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <div className="max-w-4xl mx-auto space-y-6">
            <Text as="p" className="text-lg leading-relaxed text-center">
              The Malaysia Data Innovation and Technology (MDIT) Datathon 2025
              is a premier national competition that brings together the
              brightest minds from universities across Malaysia to tackle
              real-world data challenges.
            </Text>
            <Text as="p" className="text-lg leading-relaxed text-center">
              Organized in collaboration with the Department of Statistics
              Malaysia (DOSM) and Universiti Teknologi MARA (UiTM), this
              competition provides participants with the opportunity to work
              with authentic government datasets and develop innovative
              solutions that can impact policy-making and national development.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <BlurFade inView delay={0.2}>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
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
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
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
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
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

      {/* Competition Phases */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Competition Journey
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            Follow the complete journey from registration to the final awards
            ceremony. Each phase is designed to build your skills and challenge
            your creativity.
          </Text>
        </BlurFade>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <BlurFade key={index} inView delay={0.2 + index * 0.05}>
                <Card className="relative h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <phase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <Text as="p" className="text-sm font-semibold text-primary">
                      {phase.date}
                    </Text>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Text as="p" styleVariant="muted" className="text-sm">
                      {phase.description}
                    </Text>
                  </CardContent>
                  {index < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <ArrowRightIcon className="h-6 w-6 text-primary/30" />
                    </div>
                  )}
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Quick Overview */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Quick Event Overview
          </Text>
        </BlurFade>
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BlurFade inView delay={0.15}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="text-pink-600" />
                    <Text as="h4">Competition Period</Text>
                  </CardTitle>
                  <Text as="p" className="font-semibold">
                    6 September - 18 October 2025
                  </Text>
                </CardHeader>
                <CardContent>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    • Registration: Aug 15-30, 2025
                    <br />
                    • Workshops: Sep 6-20, 2025
                    <br />
                    • Competition: Sep 21 - Oct 15
                    <br />• Finals: Oct 17-18, 2025
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
            <BlurFade inView delay={0.2}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="text-cyan-600" />
                    <Text as="h4">Event Format</Text>
                  </CardTitle>
                  <Text as="p" className="font-semibold">
                    Hybrid (Online + Physical)
                  </Text>
                </CardHeader>
                <CardContent>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    • Online workshops and training
                    <br />
                    • Remote competition phase
                    <br />
                    • Physical final presentations
                    <br />• Live ceremony at UiTM Shah Alam
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
            <BlurFade inView delay={0.25}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSignIcon className="text-green-600" />
                    <Text as="h4">Registration</Text>
                  </CardTitle>
                  <Text as="p" className="font-semibold">
                    RM150.00 per team
                  </Text>
                </CardHeader>
                <CardContent>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    • Non-refundable registration fee
                    <br />
                    • Limited slots available
                    <br />
                    • First-come, first-served basis
                    <br />• Online payment required
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
          <BlurFade inView delay={0.3}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="text-blue-600" />
                  <Text as="h4">Team Requirements & Eligibility</Text>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Team Composition
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    • 3-4 members per team
                    <br />
                    • All from same institution
                    <br />• Diverse backgrounds encouraged
                  </Text>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Eligibility Criteria
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    • Malaysian university students
                    <br />
                    • Diploma/Undergraduate level
                    <br />• All disciplines welcome
                  </Text>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Requirements
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    • Valid student identification
                    <br />
                    • Team leader contact details
                    <br />• University enrollment proof
                  </Text>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
        <BlurFade inView delay={0.35}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/event-details">
                View Complete Details
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/rules-regulation">Read Rules & Regulations</Link>
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Registration Section */}
      <div
        id="register"
        className="my-20 py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg"
      >
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
              <Button size="lg" className="text-lg px-8 py-6">
                {hasStarted ? "Register Now" : "Registration Opens Soon"}
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

      {/* Organizers Section */}
      <div className="mt-20 mb-10">
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
            <TooltipProvider>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/dosm.svg"
                      alt="Department of Statistics Malaysia"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Department of Statistics Malaysia (DOSM)
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/uitm.svg"
                      alt="UiTM Logo"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Universiti Teknologi MARA (UiTM)
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="InStats UiTM"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    InStats UiTM Shah Alam
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>

      {/* Sponsors Section */}
      <div className="my-20">
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
            <TooltipProvider>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Platinum Sponsor"
                      width={120}
                      height={120}
                      className="w-28 h-28 sm:w-32 sm:h-32 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Platinum Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Gold Sponsor"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Gold Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Silver Sponsor"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Silver Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Bronze Sponsor"
                      width={120}
                      height={120}
                      className="w-20 h-20 sm:w-24 sm:h-24 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Bronze Sponsor
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Technology Partner"
                      width={120}
                      height={120}
                      className="w-20 h-20 sm:w-24 sm:h-24 hover:scale-105 transition-transform"
                    />
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
      <div className="my-20">
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
            <TooltipProvider>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Media Partner 1"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Media Partner 1
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Media Partner 2"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Media Partner 2
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Media Partner 3"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow>
                    Media Partner 3
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/instats.svg"
                      alt="Media Partner 4"
                      width={120}
                      height={120}
                      className="w-24 h-24 sm:w-28 sm:h-28 hover:scale-105 transition-transform"
                    />
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

      {/* MDIT 2024 Memories */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
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

        <BlurFade delay={0.4}>
          <Marquee className="flex gap-4 rounded-lg">
            {Image_src_2024.map((image, index) => (
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
        </BlurFade>
        <BlurFade delay={0.4}>
          <Marquee reverse className="flex gap-4 rounded-lg">
            {Image_src_2024.map((image, index) => (
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
        </BlurFade>
      </div>

      {/* MDIT 2023 Memories */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
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

        <BlurFade delay={0.4}>
          <Marquee className="flex gap-4 rounded-lg [--duration:50s]">
            {Image_src_2023.map((image, index) => (
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
        </BlurFade>
        <BlurFade delay={0.4}>
          <Marquee reverse className="flex gap-4 rounded-lg [--duration:50s]">
            {Image_src_2023.map((image, index) => (
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
        </BlurFade>
      </div>
    </>
  );
};

export default Page;
