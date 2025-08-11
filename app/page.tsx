"use client";
import React, { memo, useMemo, lazy, Suspense, useState } from "react";
import { Text } from "@/components/ui/text";
import NumberFlow from "@number-flow/react";
import dynamic from "next/dynamic";
import { GOOGLE_FORM_LINK } from "@/components/constant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountdown } from "@/contexts/countdown-context";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/animate-ui/radix/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/animate-ui/radix/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import {
  MDIT2023_IMAGE,
  MDIT2024_IMAGE,
  COMPETITION_HIGHLIGHTS,
  ORGANIZERS,
  OFFICIAL_SPONSORS,
  MEDIA_PARTNERS,
} from "@/components/constant";
import {
  MediaPlayer,
  MediaPlayerCaptions,
  MediaPlayerControls,
  MediaPlayerControlsOverlay,
  MediaPlayerError,
  MediaPlayerFullscreen,
  MediaPlayerLoading,
  MediaPlayerPiP,
  MediaPlayerPlay,
  MediaPlayerSeek,
  MediaPlayerSeekBackward,
  MediaPlayerSeekForward,
  MediaPlayerSettings,
  MediaPlayerTime,
  MediaPlayerVideo,
  MediaPlayerVolume,
  MediaPlayerVolumeIndicator,
} from "@/components/ui/media-player";

import {
  MditAurora,
  MditTextPressure,
} from "@/components/optimized-react-bits";
import { useDevice } from "@/contexts/device-context";
import {
  CompetitionPhase,
  CompetitionHighlight,
  Statistic,
  Organizer,
  Sponsor,
  MediaPartner,
  MarqueeImageData,
  SponsorDialogProps,
} from "@/types";

const DynamicMux = dynamic(() => import("@mux/mux-video-react"), {
  ssr: false,
});

// Lazy load heavy components
const Marquee = lazy(() =>
  import("@/components/magicui/marquee").then((m) => ({ default: m.Marquee }))
);

const DynamicIcons = {
  UsersIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.UsersIcon }))
  ),
  TrophyIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.TrophyIcon }))
  ),
  ArrowRightIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.ArrowRightIcon }))
  ),
  BookOpenIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.BookOpenIcon }))
  ),
  TargetIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.TargetIcon }))
  ),
  LightbulbIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.LightbulbIcon }))
  ),
  Users2Icon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.Users2Icon }))
  ),
  ExternalLinkIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.ExternalLinkIcon }))
  ),
  ChevronRightIcon: dynamic(() =>
    import("lucide-react").then((m) => ({ default: m.ChevronRightIcon }))
  ),
};

const BlurFade = dynamic(
  () =>
    import("@/components/magicui/blur-fade").then((m) => ({
      default: m.BlurFade,
    })),
  {
    ssr: false,
  }
);

// Memoized components for better performance
const CountdownCard = memo(
  ({ value, label }: { value: number; label: string }) => (
    <div className="text-center space-y-2">
      <Card className="text-center">
        <CardContent>
          <NumberFlow
            value={value}
            format={{ minimumIntegerDigits: 2 }}
            className="lg:text-5xl md:text-3xl text-xl font-bold w-[21px] md:w-[40px] lg:w-[55px] text-primary"
          />
        </CardContent>
      </Card>
      <Text as="p" className="text-sm text-muted-foreground">
        {label}
      </Text>
    </div>
  )
);

CountdownCard.displayName = "CountdownCard";

const PhaseCard = memo(
  ({ phase, index }: { phase: CompetitionPhase; index: number }) => {
    const colors = useMemo(
      () => [
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
      ],
      []
    );

    const colorScheme = useMemo(
      () => colors[index % colors.length],
      [colors, index]
    );

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
          {index < 3 && (
            <div className="hidden lg:block absolute top-1/2 -right-7 transform -translate-y-1/2">
              <DynamicIcons.ArrowRightIcon
                className={`size-8 ${colorScheme.icon}/50`}
              />
            </div>
          )}
        </Card>
      </BlurFade>
    );
  }
);

PhaseCard.displayName = "PhaseCard";

// Memoized Statistic Card component
const StatisticCard = memo(
  ({ stat, index }: { stat: Statistic; index: number }) => {
    const colors = useMemo(
      () => [
        { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600" },
        { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600" },
        { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-600" },
        { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600" },
      ],
      []
    );

    const colorScheme = useMemo(
      () => colors[index % colors.length],
      [colors, index]
    );

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
  }
);

StatisticCard.displayName = "StatisticCard";

// Memoized Competition Highlight Card
const CompetitionHighlightCard = memo(
  ({
    highlight,
    index,
  }: {
    highlight: CompetitionHighlight;
    index: number;
  }) => (
    <BlurFade key={index} inView delay={0.2 + index * 0.1}>
      <Card
        className={`group relative h-full overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${highlight.bgColor} backdrop-blur-sm`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

        <CardHeader className="relative text-center pt-8 pb-4 z-10">
          <div
            className={`mx-auto mb-6 p-5 rounded-2xl w-fit relative overflow-hidden transition-all duration-500 group-hover:scale-110 ${highlight.bgColor
              .replace("50", "100")
              .replace("900/30", "800/50")}`}
          >
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
          <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto"></div>
        </CardContent>

        <div className="absolute top-4 right-4 w-2 h-2 bg-current opacity-20 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-current opacity-20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </Card>
    </BlurFade>
  )
);

CompetitionHighlightCard.displayName = "CompetitionHighlightCard";

// Memoized Organizer Card
const OrganizerCard = memo(
  ({ organizer, index }: { organizer: Organizer; index: number }) => (
    <div key={index} className="text-center">
      <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {organizer.logoLight ? (
          <>
            <Image
              src={organizer.logo}
              alt={organizer.logoAlt}
              width={organizer.width}
              height={organizer.height}
              className={`${organizer.className} relative z-10 mx-auto transition-transform duration-300 dark:hidden`}
              loading="lazy"
            />
            <Image
              src={organizer.logoLight}
              alt={organizer.logoAlt}
              width={organizer.width}
              height={organizer.height}
              className={`${organizer.className} relative z-10 mx-auto transition-transform duration-300 hidden dark:block`}
              loading="lazy"
            />
          </>
        ) : (
          <Image
            src={organizer.logo}
            alt={organizer.logoAlt}
            width={organizer.width}
            height={organizer.height}
            className={`${organizer.className} relative z-10 transition-transform duration-300`}
            loading="lazy"
          />
        )}
      </div>
      <Text as="p" className="mt-4 text-sm font-medium text-center">
        {organizer.name}
      </Text>
    </div>
  )
);

OrganizerCard.displayName = "OrganizerCard";

// Memoized Sponsor Card
const SponsorCard = memo(
  ({ sponsor, index }: { sponsor: Sponsor; index: number }) => (
    <Tooltip key={index}>
      <TooltipTrigger>
        <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={sponsor.logo}
            alt={sponsor.logoAlt}
            width={sponsor.width}
            height={sponsor.height}
            className={`${sponsor.className} relative z-10 transition-transform duration-300`}
            loading="lazy"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" arrow>
        <p>{sponsor.name}</p>
      </TooltipContent>
    </Tooltip>
  )
);

SponsorCard.displayName = "SponsorCard";

// Memoized Media Partner Card
const MediaPartnerCard = memo(
  ({ partner, index }: { partner: MediaPartner; index: number }) => (
    <Tooltip key={index}>
      <TooltipTrigger>
        <div className="group relative p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-primary/10 hover:to-purple-500/10 border border-muted/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={partner.logo}
            alt={partner.logoAlt}
            width={partner.width}
            height={partner.height}
            className={`${partner.className} relative z-10 transition-transform duration-300`}
            loading="lazy"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" arrow>
        <p>{partner.name}</p>
      </TooltipContent>
    </Tooltip>
  )
);

MediaPartnerCard.displayName = "MediaPartnerCard";

// Memoized Marquee Image component
const MarqueeImage = memo(
  ({ image, index }: { image: MarqueeImageData; index: number }) => (
    <Image
      key={`${image.src}-${index}`}
      className="aspect-video object-cover md:max-w-xl max-w-[200px] w-full rounded-lg object-center"
      src={image.src}
      alt={image.alt}
      width={500}
      height={200}
      quality={75}
      loading="lazy"
    />
  )
);

MarqueeImage.displayName = "MarqueeImage";

const SponsorDialog = ({ sponsor, children }: SponsorDialogProps) => {
  const [open, setOpen] = useState(false);

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
      case "gold":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      case "silver":
        return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300";
      case "bronze":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200";
      case "technology":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm text-white">
            Click to learn more about {sponsor.name}
          </p>
        </TooltipContent>
        <DialogContent className="max-w-md">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.logoAlt}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center space-y-2">
              <DialogTitle className="text-xl font-bold">
                {sponsor.name}
              </DialogTitle>
              <div
                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getTierBadgeColor(
                  sponsor.tier
                )}`}
              >
                {sponsor.tier}{" "}
                {sponsor.tier === "technology" ? "Partner" : "Sponsor"}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {sponsor.description && (
              <div>
                <DialogDescription className="text-sm leading-relaxed">
                  {sponsor.description}
                </DialogDescription>
              </div>
            )}

            {(sponsor.industry || sponsor.founded || sponsor.headquarters) && (
              <div className="grid grid-cols-1 gap-3 pt-4 border-t">
                {sponsor.industry && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Industry:
                    </span>
                    <span className="text-sm">{sponsor.industry}</span>
                  </div>
                )}
                {sponsor.founded && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Founded:
                    </span>
                    <span className="text-sm">{sponsor.founded}</span>
                  </div>
                )}
                {sponsor.headquarters && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Headquarters:
                    </span>
                    <span className="text-sm">{sponsor.headquarters}</span>
                  </div>
                )}
              </div>
            )}

            {sponsor.website && (
              <div className="pt-4">
                <Button
                  className="w-full"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                    <DynamicIcons.ExternalLinkIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Tooltip>
    </Dialog>
  );
};

const Page = memo(() => {
  // Get all countdown data from centralized context
  const { hasStarted, timeLeft, isExpired, timeUntilRegistration } =
    useCountdown();

  // Get device information from context
  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  // Memoize competition phases to prevent recreation on every render
  const phases = useMemo(
    () => [
      {
        phase: "Registration",
        date: "10-30 August, 2025",
        description:
          "Complete team registration and confirm participation via payment.",
        icon: DynamicIcons.UsersIcon,
        status: "upcoming",
      },
      {
        phase: "Briefing & Workshops",
        date: "6-7 September, 2025",
        description:
          "Overview of competition structure, themes, and deliverables, followed by a workshop to enhance data and presentation skills.",
        icon: DynamicIcons.BookOpenIcon,
        status: "upcoming",
      },
      {
        phase: "Preliminary Round",
        date: "8-21 September, 2025",
        description:
          "Dashboard development, report submission, and online video presentation.",
        icon: DynamicIcons.LightbulbIcon,
        status: "upcoming",
      },
      {
        phase: "Final Round ",
        date: "17 October, 2025",
        description:
          "Shortlisted teams will pitch their projects physically to expert judges, demonstrating analytical clarity and impact.",
        icon: DynamicIcons.TrophyIcon,
        status: "upcoming",
      },
    ],
    []
  );

  // Memoize countdown values to prevent unnecessary re-renders
  const countdownValues = useMemo(() => {
    const values = hasStarted ? timeLeft : timeUntilRegistration;
    return [
      { value: values.days, label: "Days" },
      { value: values.hours, label: "Hours" },
      { value: values.minutes, label: "Minutes" },
      { value: values.seconds, label: "Seconds" },
    ];
  }, [hasStarted, timeLeft, timeUntilRegistration]);

  // Memoize button state
  const buttonState = useMemo(() => {
    if (isExpired)
      return { text: "Registration has closed", href: "#", disabled: true };
    if (hasStarted)
      return {
        text: "Register Your Team",
        href: GOOGLE_FORM_LINK,
        disabled: false,
      };
    return { text: "Registration will open soon", href: "#", disabled: true };
  }, [isExpired, hasStarted]);

  return (
    <div className="relative">
      {/* Hero Section with Background Pattern */}

      <div className=" relative min-h-fit h-[90vh] rounded-lg overflow-hidden lg:overflow-visible max-h-[700px]">
        {/* <div className="absolute w-full rounded-lg px-4 overflow-hidden lg:hidden block h-full">
          <MobileGradientBackground />
        </div> */}
        {!deviceLoading && isWebGLSupported ? (
          <div className="absolute z-10 opacity-40 hidden lg:block w-full max-h-[500px] h-fit">
            <MditTextPressure text="2025" />
          </div>
        ) : null}
        {/* Generic 2025 text for smaller screens */}
        <div className="absolute z-10 opacity-30 lg:hidden w-full h-full flex items-center justify-center pointer-events-none">
          <div className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-black text-primary/20 select-none tracking-wider font-mono">
            2025
          </div>
        </div>
        {!deviceLoading && shouldReducePerformance ? (
          <>
            <div className="absolute left-0 -top-1/2 lg:-left-128 w-screen lg:w-auto lg:h-[1200px] h-auto rotate-180 overflow-hidden -z-10 pointer-events-none">
              <Image
                src={"/assets/bg-gradients/13.png"}
                alt="Background Gradient"
                width={1920}
                height={1080}
                className="w-full h-full object-cover object-left !overflow-visible"
              />
            </div>
          </>
        ) : (
          !deviceLoading &&
          !shouldReducePerformance && (
            <div className="absolute w-full h-[500px] hidden lg:block sm:h-[3/4]">
              <MditAurora />
            </div>
          )
        )}
        <div className="relative text-center py-32 overflow-visible flex flex-col item-center justify-center gap-4">
          <BlurFade
            inView
            delay={0.15}
            className="grid place-items-center w-fit mx-auto rounded-full"
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Image
                alt="Logo of MDIT"
                src={"/mdit2025.png"}
                width={100}
                height={100}
              />
              <Image
                alt="Logo of DOSM"
                src={"/DOSM_Light.svg"}
                width={200}
                height={100}
              />
            </div>
          </BlurFade>

          <div className="relative px-4 z-10 space-y-6">
            <BlurFade inView delay={0.1}>
              <Text
                as="h1"
                className="text-primary font-mono tracking-wider font-bold"
              >
                MALAYSIA DATA INNOVATION TALENT
                <br />x <br /> DOSM DATATHON 2025
              </Text>
            </BlurFade>
            <BlurFade inView delay={0.15}>
              <Text
                as="h2"
                className="text-2xl font-extrabold md:text-3xl lg:text-4xl max-w-4xl mx-auto"
              >
                Malaysia&apos;s Premier Data Innovation Competition
              </Text>
            </BlurFade>
            <BlurFade inView delay={0.2}>
              <Text
                as="p"
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              >
                Join 100+ talented students from across Malaysia in this
                prestigious national datathon. Work with real government
                datasets and compete for RM9,600 in prizes.
              </Text>
            </BlurFade>

            {/* Countdown Timer */}
            <BlurFade inView delay={0.25}>
              <div className="mt-12 mb-8">
                <Text as="h3" className="mb-6">
                  {hasStarted
                    ? "Registration Currently open! it will close in:"
                    : "Registration Opens In:"}
                </Text>
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  {countdownValues.map((item) => (
                    <CountdownCard
                      key={item.label}
                      value={item.value}
                      label={item.label}
                    />
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Call to Action Buttons */}
            <BlurFade inView delay={0.3}>
              <div className="flex flex-col sm:flex-row px-4 gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  disabled={!hasStarted || isExpired}
                  className="text-lg px-8 py-6"
                  asChild
                >
                  {buttonState.disabled ? (
                    <Link href={buttonState.href}>{buttonState.text}</Link>
                  ) : (
                    <Link href={buttonState.href}>
                      {buttonState.text}
                      <DynamicIcons.ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
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
                    <DynamicIcons.ChevronRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      <div className="absolute right-0 lg:right-32 w-screen lg:w-auto h-auto rotate-180 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/13.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-left !overflow-visible"
        />
      </div>
      {/* About MDIT Section */}
      <div className="my-20 relative">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center font-mono mb-6 relative z-10">
            About MDIT x DOSM Datathon 2025
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <div className="max-w-4xl mx-auto space-y-6 px-4">
            <Text as="p" className="text-lg leading-relaxed text-center">
              The Malaysia Data Innovation Talent x DOSM Datathon 2025 is a
              premier national competition that brings together the brightest
              minds from universities across Malaysia to tackle real-world data
              challenges.
            </Text>
            <Text as="p" className="text-lg leading-relaxed text-center">
              Organised in collaboration with the Department of Statistics
              Malaysia (DOSM) and Statistics Association (inStats) at UiTM Shah
              Alam, this competition encourages participants to utilize official
              government datasets alongside other open data sources to develop
              innovative, data-driven solutions that address real-world national
              challenges.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <BlurFade inView delay={0.2}>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-emerald-500/20 rounded-full w-fit">
                    <DynamicIcons.TargetIcon className="h-8 w-8 text-emerald-500" />
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    Our Mission
                  </Text>
                  <Text as="p" className="text-sm">
                    Foster innovation and collaboration among students in data
                    science and analytics while bridging the gap between
                    academia and industry.
                  </Text>
                </div>
              </BlurFade>
              <BlurFade inView delay={0.25}>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-blue-500/20 rounded-full w-fit">
                    <DynamicIcons.LightbulbIcon className="h-8 w-8 text-blue-500" />
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    Innovation Focus
                  </Text>
                  <Text as="p" className="text-sm">
                    Encourage creative thinking and innovative approaches to
                    solve real-world data challenges using cutting-edge
                    technologies.
                  </Text>
                </div>
              </BlurFade>
              <BlurFade inView delay={0.3}>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-green-500/20 rounded-full w-fit">
                    <DynamicIcons.Users2Icon className="h-8 w-8 text-green-500" />
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    Collaboration
                  </Text>
                  <Text as="p" className="text-sm">
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
      <div className="my-20 px-4 relative">
        <BlurFade inView delay={0.1}>
          <div className="text-center mb-16 space-y-4 relative z-10">
            <Text
              as="h2"
              className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {COMPETITION_HIGHLIGHTS.slice(0, 3).map((highlight, index) => (
              <BlurFade key={index} inView delay={0.2 + index * 0.1}>
                <Card
                  className={`cursor-default group relative h-full overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${highlight.bgColor} backdrop-blur-sm`}
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
        <BlurFade inView delay={0.8} className="max-w-7xl mx-auto">
          <div className="text-center max-w-7xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 border border-primary/20">
            <Text
              as="h3"
              className="text-2xl font-bold font-mono mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Ready to Experience Excellence?
            </Text>
            <Text
              as="p"
              styleVariant="muted"
              className="mb-6 max-w-2xl mx-auto"
            >
              Join Malaysia&apos;s most prestigious datathon and be part of a
              transformative journey that will shape your future in data
              science.
            </Text>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href={"/event-details"}>
                Discover More Details
                <DynamicIcons.ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>

      <div className="absolute left-0 lg:-left-32 w-screen lg:w-auto h-[900px] overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/8.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-right !overflow-visible"
        />
      </div>

      {/* Competition Phases */}
      <div className="my-20 max-w-7xl mx-auto px-4">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Competition Phases
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center  mb-12 max-w-2xl mx-auto relative z-10"
          >
            Explore the key phases of the MDIT x DOSM Datathon 2025, designed to
            guide participants from registration to the final round.
          </Text>
        </BlurFade>
        <div className=" mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <PhaseCard key={phase.phase} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Current Statistics Section */}
      <div className="py-20 rounded-lg px-4 max-w-7xl mx-auto my-20 relative overflow-hidden">
        {/* Background decorative elements */}

        <div className="relative z-10">
          <BlurFade inView delay={0.1}>
            <div className="text-center mb-12 space-y-4">
              <Text
                as="h2"
                className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                MDIT 2025 Current Statistics
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
              Live statistics showing the growing participation and excitement
              for MDIT 2025 across Malaysian universities.
            </Text>
          </BlurFade>

          {/* Main Statistics Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              <BlurFade inView delay={0.2}>
                <Card className="group relative h-full text-center bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10 border-2 border-primary/20 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <CardContent className="relative p-8 z-10">
                    <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <DynamicIcons.Users2Icon className="h-8 w-8 text-purple-600 group-hover:text-purple-500 transition-colors duration-300" />
                    </div>
                    <Text
                      as="h3"
                      className="text-3xl lg:text-4xl font-black text-purple-600 mb-3 group-hover:text-purple-500 transition-colors duration-300"
                    >
                      <NumberFlow
                        value={1}
                        format={{ minimumIntegerDigits: 1 }}
                      />
                    </Text>
                    <Text
                      as="p"
                      className="text-sm font-medium group-hover:text-foreground/90 transition-colors duration-300"
                    >
                      Teams registered
                    </Text>
                  </CardContent>
                </Card>
              </BlurFade>

              <BlurFade inView delay={0.25}>
                <Card className="group relative h-full text-center bg-gradient-to-br from-blue-500/10 via-primary/5 to-blue-500/10 border-2 border-blue-500/20 hover:border-blue-500/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <CardContent className="relative p-8 z-10">
                    <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <DynamicIcons.BookOpenIcon className="h-8 w-8 text-blue-600 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                    <Text
                      as="h3"
                      className="text-3xl lg:text-4xl font-black text-blue-600 mb-3 group-hover:text-blue-500 transition-colors duration-300"
                    >
                      <NumberFlow
                        value={1}
                        format={{ minimumIntegerDigits: 1 }}
                      />
                    </Text>
                    <Text
                      as="p"
                      className="text-sm font-medium group-hover:text-foreground/90 transition-colors duration-300"
                    >
                      Universities participating
                    </Text>
                  </CardContent>
                </Card>
              </BlurFade>

              <BlurFade inView delay={0.3}>
                <Card className="group relative h-full text-center bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-emerald-500/10 border-2 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <CardContent className="relative p-8 z-10">
                    <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40 rounded-2xl w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <DynamicIcons.UsersIcon className="h-8 w-8 text-emerald-600 group-hover:text-emerald-500 transition-colors duration-300" />
                    </div>
                    <Text
                      as="h3"
                      className="text-3xl lg:text-4xl font-black text-emerald-600 mb-3 group-hover:text-emerald-500 transition-colors duration-300"
                    >
                      <NumberFlow
                        value={4}
                        format={{ minimumIntegerDigits: 1 }}
                      />
                    </Text>
                    <Text
                      as="p"
                      className="text-sm font-medium group-hover:text-foreground/90 transition-colors duration-300"
                    >
                      Total participants
                    </Text>
                  </CardContent>
                </Card>
              </BlurFade>

              <BlurFade inView delay={0.35}>
                <Card className="group relative h-full text-center bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-amber-500/10 border-2 border-amber-500/20 hover:border-amber-500/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <CardContent className="relative p-8 z-10">
                    <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 rounded-2xl w-fit shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <DynamicIcons.TrophyIcon className="h-8 w-8 text-amber-600 group-hover:text-amber-500 transition-colors duration-300" />
                    </div>
                    <Text
                      as="h3"
                      className="text-3xl lg:text-4xl font-black text-amber-600 mb-3 group-hover:text-amber-500 transition-colors duration-300"
                    >
                      <NumberFlow
                        value={timeLeft.days}
                        format={{ minimumIntegerDigits: 1 }}
                      />
                    </Text>
                    <Text
                      as="p"
                      className="text-sm font-medium group-hover:text-foreground/90 transition-colors duration-300"
                    >
                      Days until registration closes
                    </Text>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
          </div>

          {/* Registration Progress Card */}
          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto mt-12">
            <BlurFade inView delay={0.4}>
              <Card className="group relative text-center hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 border-2 border-primary/20 hover:border-primary/40 overflow-hidden">
                {/* Enhanced background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <CardContent className="relative p-8 z-10">
                  <div className="mb-6">
                    <Text
                      as="h4"
                      className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
                    >
                      Registration progress
                    </Text>
                    <div className="w-full bg-muted/50 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
                        style={{ width: "0.833%" }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                      </div>
                    </div>
                    <Text as="p" className="text-base font-medium">
                      1 out of 120 slots filled
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>

          {/* Real-time Update Notice */}
          <BlurFade inView delay={0.6}>
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full border border-primary/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Text as="p" styleVariant="muted" className="text-sm">
                  Last updated: 28 July 2025 at 16:43 GMT+8
                </Text>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      <div className="absolute right-0 lg:-right-32 w-screen lg:w-auto lg:h-[600px] overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/9.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-left !overflow-visible"
        />
      </div>

      {/* Partnerships & Collaborations Section */}
      <div className="my-32 px-4 max-w-7xl mx-auto relative">
        <BlurFade inView delay={0.1}>
          <div className="text-center mb-20 space-y-4 relative z-10">
            <Text
              as="h2"
              className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Our Partners & Collaborators
            </Text>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
            <Text as="p" className="text-lg max-w-3xl mx-auto leading-relaxed">
              MDIT 2025 is made possible through strategic partnerships with
              leading institutions, organisations, and media partners who share
              our vision of advancing data science innovation in Malaysia.
            </Text>
          </div>
        </BlurFade>

        {/* Organizing Partners */}
        <BlurFade inView delay={0.2}>
          <div className="mb-16">
            <div className="text-center mb-8">
              <Text as="h3" className="text-2xl font-bold text-primary mb-2">
                Organising Partners
              </Text>
              <Text as="p" className="text-sm">
                Leading institutions driving data science education and
                innovation
              </Text>
            </div>
            <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl p-12 border border-primary/10 overflow-visible">
              {/* Desktop View */}
              <div className="hidden md:flex flex-wrap items-center justify-center gap-6 md:gap-12">
                {ORGANIZERS.map((organizer, index) => (
                  <BlurFade
                    key={organizer.name}
                    inView
                    delay={0.3 + index * 0.1}
                  >
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-primary/30">
                        {organizer.logoLight ? (
                          <>
                            <Image
                              src={organizer.logo}
                              alt={organizer.logoAlt}
                              width={organizer.width}
                              height={organizer.height}
                              className={`${organizer.className} mx-auto transition-transform duration-300 group-hover:scale-105 dark:hidden`}
                              loading="lazy"
                            />
                            <Image
                              src={organizer.logoLight}
                              alt={organizer.logoAlt}
                              width={organizer.width}
                              height={organizer.height}
                              className={`${organizer.className} mx-auto transition-transform duration-300 group-hover:scale-105 hidden dark:block`}
                              loading="lazy"
                            />
                          </>
                        ) : (
                          <Image
                            src={organizer.logo}
                            alt={organizer.logoAlt}
                            width={organizer.width}
                            height={organizer.height}
                            className={`${organizer.className} mx-auto transition-transform duration-300 group-hover:scale-105`}
                            loading="lazy"
                          />
                        )}
                        <Text
                          as="p"
                          className="mt-4 text-sm text-center group-hover:text-purple-300 transition-colors"
                        >
                          {organizer.name}
                        </Text>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>

              {/* Mobile Carousel View */}
              <div className="md:hidden">
                <Carousel
                  className="w-full max-w-sm mx-auto"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {ORGANIZERS.map((organizer, index) => (
                      <CarouselItem
                        key={organizer.name}
                        className="pl-2 md:pl-4 "
                      >
                        <BlurFade inView delay={0.3 + index * 0.1}>
                          <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-primary/30">
                              {organizer.logoLight ? (
                                <>
                                  <Image
                                    src={organizer.logo}
                                    alt={organizer.logoAlt}
                                    width={organizer.width}
                                    height={organizer.height}
                                    className={`${organizer.className} mx-auto transition-transform duration-300 group-hover:scale-105 dark:hidden`}
                                    loading="lazy"
                                  />
                                  <Image
                                    src={organizer.logoLight}
                                    alt={organizer.logoAlt}
                                    width={organizer.width}
                                    height={organizer.height}
                                    className={`${organizer.className} mx-auto transition-transform duration-300 group-hover:scale-105 hidden dark:block`}
                                    loading="lazy"
                                  />
                                </>
                              ) : (
                                <Image
                                  src={organizer.logo}
                                  alt={organizer.logoAlt}
                                  width={organizer.width}
                                  height={organizer.height}
                                  className={`${organizer.className} mx-auto transition-transform duration-300 group-hover:scale-105`}
                                  loading="lazy"
                                />
                              )}
                              <Text
                                as="p"
                                className="mt-2 text-xs font-medium text-center text-primary group-hover:text-purple-600 transition-colors"
                              >
                                {organizer.name}
                              </Text>
                            </div>
                          </div>
                        </BlurFade>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Sponsors & Media Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-12">
          {/* Official Sponsors */}
          <BlurFade inView delay={0.4}>
            <div className="h-full">
              <div className="text-center mb-6">
                <Text
                  as="h3"
                  className="text-2xl font-bold text-purple-600 mb-2"
                >
                  Official Sponsors
                </Text>
                <Text as="p" className="text-sm">
                  Supporting innovation and excellence in data science
                </Text>
              </div>
              <div className="bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10 rounded-2xl p-12 border border-purple-200/50 dark:border-purple-800/30 h-full min-h-[300px] flex items-center justify-center overflow-visible">
                {OFFICIAL_SPONSORS.length > 0 ? (
                  <>
                    <TooltipProvider delayDuration={0}>
                      {/* Desktop View */}
                      <div className="hidden md:flex flex-wrap items-center justify-center gap-8">
                        {OFFICIAL_SPONSORS.map((sponsor, index) => (
                          <SponsorDialog key={index} sponsor={sponsor}>
                            <div className="group relative p-3 cursor-pointer">
                              <div className="absolute inset-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                              <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 hover:border-purple-300 overflow-hidden">
                                <Image
                                  src={sponsor.logo}
                                  alt={sponsor.logoAlt}
                                  width={sponsor.width}
                                  height={sponsor.height}
                                  className={`${sponsor.className} transition-transform duration-300 group-hover:scale-105`}
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </SponsorDialog>
                        ))}
                      </div>

                      {/* Mobile Carousel View */}
                      <div className="md:hidden w-full">
                        <Carousel
                          className="w-full max-w-sm mx-auto"
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                        >
                          <CarouselContent className="-ml-2 md:-ml-4">
                            {OFFICIAL_SPONSORS.map((sponsor, index) => (
                              <CarouselItem
                                key={index}
                                className="pl-2 md:pl-4 basis-1/2"
                              >
                                <SponsorDialog sponsor={sponsor}>
                                  <div className="group relative p-2 cursor-pointer">
                                    <div className="absolute inset-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                    <div className="relative bg-white dark:bg-gray-900 p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 hover:border-purple-300 overflow-hidden">
                                      <Image
                                        src={sponsor.logo}
                                        alt={sponsor.logoAlt}
                                        width={sponsor.width}
                                        height={sponsor.height}
                                        className={`${sponsor.className} transition-transform duration-300 group-hover:scale-105 mx-auto`}
                                        loading="lazy"
                                      />
                                    </div>
                                  </div>
                                </SponsorDialog>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    </TooltipProvider>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-6 p-4 bg-purple-100/50 dark:bg-purple-900/30 rounded-full w-fit">
                      <DynamicIcons.TrophyIcon className="h-16 w-16 text-purple-400" />
                    </div>
                    <Text
                      as="h4"
                      className="text-xl font-semibold mb-3 text-purple-600"
                    >
                      Sponsors list coming soon
                    </Text>
                    <Text
                      as="p"
                      className="text-sm text-purple-500/70 mb-4 max-w-xs"
                    >
                      We are actively seeking partnerships with organisations
                      that share our vision
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      asChild
                    >
                      <Link href="/contact">Become a Sponsor</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </BlurFade>

          {/* Media Partners */}
          <BlurFade inView delay={0.5}>
            <div className="h-full">
              <div className="text-center mb-6">
                <Text as="h3" className="text-2xl font-bold text-blue-600 mb-2">
                  Media Partners
                </Text>
                <Text as="p" className="text-sm">
                  Spreading awareness and connecting communities
                </Text>
              </div>
              <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 rounded-2xl p-12 border border-blue-200/50 dark:border-blue-800/30 h-full min-h-[300px] flex items-center justify-center overflow-visible">
                <TooltipProvider delayDuration={0}>
                  {MEDIA_PARTNERS.length > 0 ? (
                    <>
                      {/* Desktop View */}
                      <div className="hidden md:flex flex-wrap items-center justify-center gap-8">
                        {MEDIA_PARTNERS.map((partner, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger>
                              <div className="group relative p-3">
                                <div className="absolute inset-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 hover:border-blue-300 overflow-hidden">
                                  <Image
                                    src={partner.logo}
                                    alt={partner.logoAlt}
                                    width={partner.width}
                                    height={partner.height}
                                    className={`${partner.className} transition-transform duration-300 group-hover:scale-105`}
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" arrow>
                              <p>{partner.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>

                      {/* Mobile Carousel View */}
                      <div className="md:hidden w-full">
                        <Carousel
                          className="w-full max-w-sm mx-auto"
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                        >
                          <CarouselContent className="-ml-2 md:-ml-4">
                            {MEDIA_PARTNERS.map((partner, index) => (
                              <CarouselItem
                                key={index}
                                className="pl-2 md:pl-4 basis-1/2"
                              >
                                <div className="group relative p-2">
                                  <div className="absolute inset-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                  <div className="relative bg-white dark:bg-gray-900 p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 hover:border-blue-300 overflow-hidden">
                                    <Image
                                      src={partner.logo}
                                      alt={partner.logoAlt}
                                      width={partner.width}
                                      height={partner.height}
                                      className={`${partner.className} transition-transform duration-300 group-hover:scale-105 mx-auto`}
                                      loading="lazy"
                                    />
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto mb-6 p-4 bg-blue-100/50 dark:bg-blue-900/30 rounded-full w-fit">
                        <DynamicIcons.Users2Icon className="h-16 w-16 text-blue-400" />
                      </div>
                      <Text
                        as="h4"
                        className="text-xl font-semibold mb-3 text-blue-600"
                      >
                        Media Partners list coming soon
                      </Text>
                      <Text
                        as="p"
                        className="text-sm text-blue-500/70 mb-4 max-w-xs"
                      >
                        We are building partnerships with leading media
                        organisations
                      </Text>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        asChild
                      >
                        <Link href="/contact">Partner With Us</Link>
                      </Button>
                    </div>
                  )}
                </TooltipProvider>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Partnership Call to Action */}
        <BlurFade inView delay={0.6}>
          <div className="mt-32 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary/20">
              <Text
                as="h3"
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              >
                Join our partnership network
              </Text>
              <Text
                as="p"
                styleVariant="muted"
                className="mb-6 max-w-2xl mx-auto"
              >
                Interested in partnering with MDIT 2025? We welcome
                collaborations with organisations that share our commitment to
                advancing data science education and innovation in Malaysia.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600"
                  asChild
                >
                  <Link href="/contact">
                    Become a Partner
                    <DynamicIcons.ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about-us">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Registration Section */}
      <div id="register" className="my-20 px-4 py-20 bg-primary/10 rounded-lg">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Ready to register?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-8 max-w-2xl mx-auto relative z-10"
          >
            Don&apos;t miss this opportunity to be part of Malaysia&apos;s most
            prestigious data science competition. Register your team now and
            start your journey toward data excellence!
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <div className="text-center space-y-6 relative z-10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                disabled={!hasStarted || isExpired}
                className="text-lg px-8 py-6"
                asChild
              >
                <Link
                  href={isExpired ? "#" : hasStarted ? GOOGLE_FORM_LINK : "#"}
                >
                  {isExpired
                    ? "Registration Closed"
                    : hasStarted
                    ? "Register Now"
                    : "Registration Opening Soon"}
                  <DynamicIcons.ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
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

      <div className="absolute left-0 lg:-left-32 w-screen lg:w-auto lg:h-[1200px] h-auto -z-10 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/11.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-right !overflow-visible"
        />
      </div>
      <div className="max-w-7xl mx-auto py-16 px-4">
        <Text as="h2" className="text-3xl font-bold mb-4">
          Watch our recap video for the past MDIT!
        </Text>
        <MediaPlayer autoHide>
          <MediaPlayerVideo asChild>
            <DynamicMux playbackId="OUmM1TFY4k7n7WQBbo01600YTa9Y00x8PWaHGvaVNbLG00g" />
          </MediaPlayerVideo>
          <MediaPlayerLoading />
          <MediaPlayerError />
          <MediaPlayerVolumeIndicator />
          <MediaPlayerControls className="flex-col items-start gap-2.5">
            <MediaPlayerControlsOverlay />
            <MediaPlayerSeek />
            <div className="flex w-full items-center gap-2">
              <div className="flex flex-1 items-center gap-2">
                <MediaPlayerPlay />
                <MediaPlayerSeekBackward />
                <MediaPlayerSeekForward />
                <MediaPlayerVolume expandable />
                <MediaPlayerTime />
              </div>
              <div className="flex items-center gap-2">
                <MediaPlayerCaptions />
                <MediaPlayerSettings />
                <MediaPlayerPiP />
                <MediaPlayerFullscreen />
              </div>
            </div>
          </MediaPlayerControls>
        </MediaPlayer>
      </div>
      {/* MDIT 2024 Memories */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <BlurFade delay={0.2}>
          <Text
            as="h2"
            className="text-3xl font-mono font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent"
          >
            MDIT 2024 Memories
          </Text>
          <Text as="p" className=" text-center mb-12 max-w-2xl mx-auto">
            Relive the excitement and innovation from last year&apos;s Malaysian
            Data Innovation Talent. See the passion, dedication, and brilliant
            minds that made MDIT 2024 an unforgettable experience.
          </Text>
        </BlurFade>

        <BlurFade delay={0.4} className="my-3">
          <Card>
            <CardContent className="relative">
              <Suspense
                fallback={
                  <div className="h-32 bg-muted/50 rounded-lg animate-pulse" />
                }
              >
                <Marquee className="flex gap-4 rounded-lg">
                  {MDIT2024_IMAGE.map((image, index) => (
                    <MarqueeImage
                      key={`mdit2024-1-${index}`}
                      image={image}
                      index={index}
                    />
                  ))}
                </Marquee>
              </Suspense>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.4}>
          <Card>
            <CardContent className="relative">
              <Suspense
                fallback={
                  <div className="h-32 bg-muted/50 rounded-lg animate-pulse" />
                }
              >
                <Marquee reverse className="flex gap-4 rounded-lg">
                  {MDIT2024_IMAGE.map((image, index) => (
                    <MarqueeImage
                      key={`mdit2024-2-${index}`}
                      image={image}
                      index={index}
                    />
                  ))}
                </Marquee>
              </Suspense>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* MDIT 2023 Memories */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <BlurFade delay={0.2}>
          <Text
            as="h2"
            className="text-3xl font-mono font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent"
          >
            MDIT 2023 Memories
          </Text>
          <Text as="p" className="text-center mb-12 max-w-2xl mx-auto">
            Relive the excitement and innovation from last year&apos;s Malaysian
            Data Innovation Talent. See the passion, dedication, and brilliant
            minds that made MDIT 2023 an unforgettable experience.
          </Text>
        </BlurFade>

        <BlurFade delay={0.4} className="my-3">
          <Card>
            <CardContent className="relative">
              <Suspense
                fallback={
                  <div className="h-48 animate-pulse bg-muted rounded-lg" />
                }
              >
                <Marquee className="flex gap-4 rounded-lg [--duration:50s]">
                  {MDIT2023_IMAGE.map((image, index) => (
                    <MarqueeImage key={index} image={image} index={index} />
                  ))}
                </Marquee>
              </Suspense>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
        <BlurFade delay={0.4}>
          <Card>
            <CardContent className="relative">
              <Suspense
                fallback={
                  <div className="h-48 animate-pulse bg-muted rounded-lg" />
                }
              >
                <Marquee
                  reverse
                  className="flex gap-4 rounded-lg [--duration:50s]"
                >
                  {MDIT2023_IMAGE.map((image, index) => (
                    <MarqueeImage key={index} image={image} index={index} />
                  ))}
                </Marquee>
              </Suspense>
              {/* Gradient mask for seamless fade effect */}
              <div className="absolute left-5 top-0 w-22 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute right-5 top-0 w-22 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </div>
  );
});

Page.displayName = "Page";

export default Page;
