"use client";

import React, { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  Trophy,
  University,
  MapPin,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { MDIT2023_IMAGE, MDIT2024_IMAGE } from "@/components/constant";
import Threads from "@/components/react-bits/Backgrounds/Threads/Threads";

const PastMDITPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  // Past MDIT editions data
  const pastEditions = {
    "2024": {
      year: "2024",
      theme: "Finding Digital And Green Skills",
      logo: "/mdit2024.png", // Placeholder
      dates: "September 27 - November 2, 2024",
      venue: "PICCA Convention Centre @ Butterworth Arena",
      totalTeams: 80,
      totalParticipants: 320,
      universities: 13,
      prizePool: "RM9,600",
      winner: {
        team: "NanoGuardian",
        university: "Taylors University",
      },
      runnerUp: {
        team: "4Cast",
        university: "Universiti Kebangsaan Malaysia",
      },
      secondRunnerUp: {
        team: "3 + 1 = 400",
        university: "Universiti Putra Malaysia",
      },
      statistics: [
        { label: "Teams", value: "80", icon: Users },
        { label: "Participants", value: "320", icon: Users },
        { label: "Universities", value: "13", icon: University },
        { label: "Days", value: "37", icon: Calendar },
      ],
    },
    "2023": {
      year: "2023",
      theme: null,
      logo: "/mdit2023.png", // Placeholder
      dates: "August 28 - September 26, 2023",
      venue: "Bank Negara Malaysia, Kuala Lumpur",
      totalTeams: 100,
      totalParticipants: 400,
      universities: 15,
      prizePool: "RM9,999",
      winner: {
        team: "Rookie Patchers",
        university: "Universiti Kebangsaan Malaysia",
      },
      runnerUp: {
        team: "The Guys",
        university: "Asia Pacific University",
      },
      secondRunnerUp: {
        team: "Lion Hearts",
        university: "University of Nottingham Malaysia",
      },
      statistics: [
        { label: "Teams", value: "100", icon: Users },
        { label: "Participants", value: "400", icon: Users },
        { label: "Universities", value: "15", icon: University },
        { label: "Days", value: "30", icon: Calendar },
      ],
    },
    "2021": {
      year: "2021",
      theme: null,
      logo: "/mdit2021.png", // Placeholder
      dates: "November 13 - December 11, 2021",
      venue: "Online",
      totalTeams: 74,
      totalParticipants: 296,
      universities: 15,
      prizePool: "RM9,999",
      winner: {
        team: "Fantastic Four",
        university: "Universiti Tun Hussein Onn Malaysia",
      },
      runnerUp: {
        team: "SKADOOSH",
        university: "Universiti Teknologi MARA",
      },
      secondRunnerUp: {
        team: "Gen Alpha",
        university: "Universiti Kebangsaan Malaysia",
      },
      statistics: [
        { label: "Teams", value: "74", icon: Users },
        { label: "Participants", value: "296", icon: Users },
        { label: "Universities", value: "15", icon: University },
        { label: "Days", value: "28", icon: Calendar },
      ],
    },
  };

  const currentEdition =
    pastEditions[selectedYear as keyof typeof pastEditions];
  const availableYears = Object.keys(pastEditions).sort().reverse();

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="text-center space-y-4 px-4 pt-32 pb-20 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to About Us
          </Link>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="h1" className="font-mono text-primary">
            Past MDIT Editions
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="text-lg">
            Celebrating the journey of Malaysia&apos;s premier data innovation
            competition
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <Text as="p" styleVariant="muted" className="max-w-3xl mx-auto">
            Explore the history, achievements, and memorable moments from
            previous MDIT competitions. Witness how data science talents have
            evolved and contributed to Malaysia&apos;s digital transformation.
          </Text>
        </BlurFade>
      </div>
      <div className="w-full h-[500px] top-0 absolute -z-10">
        <Threads
          color={[0.5647058823529412, 0.19215686274509805, 0.8666666666666667]}
          amplitude={2}
          distance={0.6}
        />
      </div>

      <div className="absolute w-screen lg:w-auto lg:h-[1200px] -left-32  lg:-left-64 rotate-90 !overflow-visible">
        <Image
          src={"/assets/bg-gradients/8.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>

      {/* Year Selection */}
      <div className="my-12">
        <BlurFade inView delay={0.1}>
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {availableYears.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
                className="text-lg px-6 py-3"
              >
                MDIT {year}
              </Button>
            ))}
          </div>
        </BlurFade>
      </div>

      {/* Edition Header */}
      <div className="my-16 px-4  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1} className="backdrop-blur-lg">
          <Card className="bg-card/50">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                {/* Logo Section */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 bg-white rounded-lg shadow-md p-2">
                    {/* Placeholder for MDIT logo */}
                    <Image
                      src={currentEdition.logo}
                      alt={`MDIT ${currentEdition.year} Logo`}
                      width={256}
                      height={256}
                    />
                  </div>
                  <Text as="p" className="text-sm ">
                    Official Logo
                  </Text>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-3 space-y-4">
                  <div>
                    <Text
                      as="h2"
                      className="text-3xl font-bold font-mono text-primary mb-2"
                    >
                      MDIT {currentEdition.year}
                    </Text>
                    <Text
                      as="p"
                      className="text-xl font-semibold text-muted-foreground"
                    >
                      {currentEdition.theme}
                    </Text>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <Text as="p">{currentEdition.dates}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <Text as="p">{currentEdition.venue}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <Text as="p">Prize Pool: {currentEdition.prizePool}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <Text as="p">
                        {currentEdition.totalTeams} Participating Teams
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Statistics Section */}
      <div className="my-16 px-4  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-8">
            MDIT {currentEdition.year} by Numbers
          </Text>
        </BlurFade>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentEdition.statistics.map((stat, index) => (
            <BlurFade key={index} inView delay={0.15 + index * 0.05}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Text
                    as="h3"
                    className="text-3xl font-bold text-primary mb-2"
                  >
                    {stat.value}
                  </Text>
                  <Text as="p" className="text-sm font-medium">
                    {stat.label}
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Winners Section */}
      <div className="my-16 px-4  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-8">
            MDIT {currentEdition.year} Champions
          </Text>
        </BlurFade>

        {/* Champion */}
        <BlurFade inView delay={0.15}>
          <Card className="mb-6 border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-yellow-400 rounded-full">
                  <Trophy className="h-6 w-6 text-yellow-800" />
                </div>
                <div>
                  <Text as="h3" className="text-xl">
                    🏆 Champion: Team {currentEdition.winner.team}
                  </Text>
                  <Text
                    as="p"
                    className="text-yellow-700 dark:text-yellow-300 font-semibold"
                  >
                    {currentEdition.winner.university}
                  </Text>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </BlurFade>

        {/* Runner-ups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BlurFade inView delay={0.2}>
            <Card className="border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gray-400 rounded-full">
                    <Award className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <Text as="h4">🥈 1st Runner-up</Text>
                    <Text
                      as="p"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                    >
                      Team {currentEdition.runnerUp.team}
                    </Text>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-sm mb-2 font-medium">
                  {currentEdition.runnerUp.university}
                </Text>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.25}>
            <Card className="border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-orange-400 rounded-full">
                    <Award className="h-5 w-5 text-orange-700" />
                  </div>
                  <div>
                    <Text as="h4">🥉 2nd Runner-up</Text>
                    <Text
                      as="p"
                      className="text-sm font-semibold text-orange-600 dark:text-orange-300"
                    >
                      Team {currentEdition.secondRunnerUp.team}
                    </Text>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" className="text-sm mb-2 font-medium">
                  {currentEdition.secondRunnerUp.university}
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Gallery Marquees */}
      {selectedYear === "2024" || selectedYear === "2023" ? (
        <>
          <div className="absolute lg:w-auto w-screen lg:h-[1200px]  -right-0 rotate-90 !overflow-visible">
            <Image
              src={"/assets/bg-gradients/9.svg"}
              alt="Background Gradient"
              width={1920}
              height={1080}
              className="inset-0 w-full h-full object-cover !overflow-visible"
            />
          </div>

          <div className="my-16 px-4  max-w-7xl mx-auto">
            <BlurFade inView delay={0.1}>
              <Text as="h2" className="text-center mb-8">
                Photo Gallery - MDIT {currentEdition.year}
              </Text>
            </BlurFade>
            <BlurFade delay={0.4} className="my-6">
              <Card>
                <CardContent className="relative">
                  <Marquee className="flex gap-4 rounded-lg">
                    {selectedYear === "2024"
                      ? MDIT2024_IMAGE.map((image, index) => (
                          <Image
                            key={index}
                            className="aspect-video object-cover md:max-w-xl max-w-[200px] w-full rounded-lg object-center"
                            src={image.src}
                            alt={image.alt}
                            quality={100}
                            width={500}
                            height={200}
                          />
                        ))
                      : MDIT2023_IMAGE.map((image, index) => (
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
                    {selectedYear === "2024"
                      ? MDIT2024_IMAGE.map((image, index) => (
                          <Image
                            key={index}
                            className="aspect-video object-cover md:max-w-xl max-w-[200px] w-full rounded-lg object-center"
                            src={image.src}
                            alt={image.alt}
                            quality={100}
                            width={500}
                            height={200}
                          />
                        ))
                      : MDIT2023_IMAGE.map((image, index) => (
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
      ) : null}

      {/* Navigation */}
      <div className="my-16 px-4  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <div className="flex justify-between items-center">
            <div>
              {availableYears.indexOf(selectedYear) <
                availableYears.length - 1 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedYear(
                      availableYears[availableYears.indexOf(selectedYear) + 1]
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  MDIT{" "}
                  {availableYears[availableYears.indexOf(selectedYear) + 1]}
                </Button>
              )}
            </div>
            <div>
              {availableYears.indexOf(selectedYear) > 0 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedYear(
                      availableYears[availableYears.indexOf(selectedYear) - 1]
                    )
                  }
                  className="flex items-center gap-2"
                >
                  MDIT{" "}
                  {availableYears[availableYears.indexOf(selectedYear) - 1]}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default PastMDITPage;
