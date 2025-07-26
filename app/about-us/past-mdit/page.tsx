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
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";

const PastMDITPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  // Past MDIT editions data
  const pastEditions = {
    "2024": {
      year: "2024",
      theme: "Data for Sustainable Future",
      logo: "/mdit/mdit2024-logo.png", // Placeholder
      dates: "September 15 - October 20, 2024",
      venue: "UiTM Shah Alam, Selangor",
      totalTeams: 87,
      totalParticipants: 348,
      universities: 23,
      prizePool: "RM8,500",
      winner: {
        team: "DataMavens",
        university: "Universiti Malaya",
        members: [
          "Ahmad Rahman",
          "Siti Nurhaliza",
          "David Lim",
          "Priya Sharma",
        ],
        project: "Smart City Traffic Optimization",
        impact:
          "Adopted by Kuala Lumpur City Hall for traffic management system",
      },
      runnerUp: {
        team: "StatVanguard",
        university: "Universiti Teknologi Malaysia",
        project: "Healthcare Resource Prediction Model",
      },
      secondRunnerUp: {
        team: "DataCrafters",
        university: "Universiti Sains Malaysia",
        project: "Environmental Monitoring Dashboard",
      },
      highlights: [
        "First collaboration with Department of Environment Malaysia",
        "Introduction of real-time data challenges",
        "87% of participants reported improved data skills",
        "3 winning solutions implemented by government agencies",
      ],
      statistics: [
        { label: "Teams", value: "87", icon: Users },
        { label: "Participants", value: "348", icon: Users },
        { label: "Universities", value: "23", icon: University },
        { label: "Days", value: "36", icon: Calendar },
      ],
      gallery: [
        {
          src: "/mdit/2024/opening-ceremony.jpg",
          alt: "MDIT 2024 Opening Ceremony",
          category: "ceremony",
        },
        {
          src: "/mdit/2024/team-presentation-1.jpg",
          alt: "Team Presentation Session",
          category: "competition",
        },
        {
          src: "/mdit/2024/workshop-session.jpg",
          alt: "Data Science Workshop",
          category: "workshop",
        },
        {
          src: "/mdit/2024/judging-panel.jpg",
          alt: "Expert Judging Panel",
          category: "judging",
        },
        {
          src: "/mdit/2024/winner-announcement.jpg",
          alt: "Winner Announcement",
          category: "ceremony",
        },
        {
          src: "/mdit/2024/networking-session.jpg",
          alt: "Networking Session",
          category: "networking",
        },
        {
          src: "/mdit/2024/team-collaboration.jpg",
          alt: "Team Collaboration",
          category: "competition",
        },
        {
          src: "/mdit/2024/mentorship-session.jpg",
          alt: "Mentorship Session",
          category: "workshop",
        },
      ],
    },
    "2023": {
      year: "2023",
      theme: "Pioneering Data Innovation",
      logo: "/mdit/mdit2023-logo.png", // Placeholder
      dates: "August 20 - September 25, 2023",
      venue: "UiTM Shah Alam, Selangor",
      totalTeams: 52,
      totalParticipants: 208,
      universities: 15,
      prizePool: "RM5,000",
      winner: {
        team: "StatVanguard",
        university: "Universiti Teknologi Malaysia",
        members: ["Farah Ibrahim", "Michael Wong", "Aisha Kassim", "Raj Patel"],
        project: "Healthcare Resource Prediction",
        impact: "Implemented in regional hospitals for capacity planning",
      },
      runnerUp: {
        team: "DataExplorers",
        university: "Universiti Putra Malaysia",
        project: "Agricultural Yield Optimization",
      },
      secondRunnerUp: {
        team: "AnalyticsHub",
        university: "Universiti Kebangsaan Malaysia",
        project: "Education Performance Analytics",
      },
      highlights: [
        "Inaugural MDIT competition launch",
        "Partnership with Department of Statistics Malaysia established",
        "First national-level university data competition",
        "Foundation for annual data innovation talent development",
      ],
      statistics: [
        { label: "Teams", value: "52", icon: Users },
        { label: "Participants", value: "208", icon: Users },
        { label: "Universities", value: "15", icon: University },
        { label: "Days", value: "36", icon: Calendar },
      ],
      gallery: [
        {
          src: "/mdit/2023/inaugural-launch.jpg",
          alt: "MDIT 2023 Inaugural Launch",
          category: "ceremony",
        },
        {
          src: "/mdit/2023/first-briefing.jpg",
          alt: "Competition Briefing",
          category: "workshop",
        },
        {
          src: "/mdit/2023/team-registration.jpg",
          alt: "Team Registration",
          category: "registration",
        },
        {
          src: "/mdit/2023/data-workshop.jpg",
          alt: "Data Analysis Workshop",
          category: "workshop",
        },
        {
          src: "/mdit/2023/final-presentation.jpg",
          alt: "Final Presentations",
          category: "competition",
        },
        {
          src: "/mdit/2023/winning-team.jpg",
          alt: "Winning Team Celebration",
          category: "ceremony",
        },
        {
          src: "/mdit/2023/panel-discussion.jpg",
          alt: "Industry Panel Discussion",
          category: "networking",
        },
        {
          src: "/mdit/2023/closing-ceremony.jpg",
          alt: "Closing Ceremony",
          category: "ceremony",
        },
      ],
    },
  };

  const currentEdition =
    pastEditions[selectedYear as keyof typeof pastEditions];
  const availableYears = Object.keys(pastEditions).sort().reverse();

  // Gallery filter
  const [galleryFilter, setGalleryFilter] = useState("all");
  const galleryCategories = [
    "all",
    "ceremony",
    "competition",
    "workshop",
    "networking",
    "judging",
    "registration",
  ];

  const filteredGallery = currentEdition.gallery.filter(
    (item) => galleryFilter === "all" || item.category === galleryFilter
  );

  return (
    <>
      {/* Header Section */}
      <div className="text-center space-y-4 py-20 max-w-4xl mx-auto">
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
          <Text as="h1" className="text-primary">
            Past MDIT Editions
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="text-lg">
            Celebrating the journey of Malaysia's premier data innovation
            competition
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <Text as="p" styleVariant="muted" className="max-w-3xl mx-auto">
            Explore the history, achievements, and memorable moments from
            previous MDIT competitions. Witness how data science talents have
            evolved and contributed to Malaysia's digital transformation.
          </Text>
        </BlurFade>
      </div>

      {/* Year Selection */}
      <div className="my-12">
        <BlurFade inView delay={0.1}>
          <div className="flex justify-center gap-4 mb-8">
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
      <div className="my-16  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                {/* Logo Section */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 bg-white rounded-lg shadow-md p-4">
                    {/* Placeholder for MDIT logo */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <Text as="p" className="font-bold text-primary text-sm">
                        MDIT {currentEdition.year}
                      </Text>
                    </div>
                  </div>
                  <Text as="p" className="text-sm text-muted-foreground">
                    Official Logo
                  </Text>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-3 space-y-4">
                  <div>
                    <Text
                      as="h2"
                      className="text-3xl font-bold text-primary mb-2"
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
      <div className="my-16  max-w-7xl mx-auto">
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
      <div className="my-16  max-w-7xl mx-auto">
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
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Project:
                  </Text>
                  <Text as="p" className="mb-4">
                    {currentEdition.winner.project}
                  </Text>
                  <Text as="h4" className="font-semibold mb-2">
                    Team Members:
                  </Text>
                  <ul className="list-disc list-inside space-y-1">
                    {currentEdition.winner.members.map((member, index) => (
                      <li key={index} className="text-sm">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Real-world Impact:
                  </Text>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <Text as="p" className="text-sm leading-relaxed">
                      {currentEdition.winner.impact}
                    </Text>
                  </div>
                </div>
              </div>
            </CardContent>
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
                <Text as="p" className="text-sm text-muted-foreground">
                  {currentEdition.runnerUp.project}
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
                <Text as="p" className="text-sm text-muted-foreground">
                  {currentEdition.secondRunnerUp.project}
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="my-16  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-8">
            Key Highlights
          </Text>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentEdition.highlights.map((highlight, index) => (
            <BlurFade key={index} inView delay={0.15 + index * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <Text as="p" className="leading-relaxed">
                      {highlight}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="my-16  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-8">
            Photo Gallery - MDIT {currentEdition.year}
          </Text>
        </BlurFade>

        {/* Gallery Filter */}
        <BlurFade inView delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {galleryCategories.map((category) => (
              <Button
                key={category}
                variant={galleryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setGalleryFilter(category)}
                className="capitalize"
              >
                {category === "all" ? "All Photos" : category}
              </Button>
            ))}
          </div>
        </BlurFade>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredGallery.map((image, index) => (
            <BlurFade key={index} inView delay={0.2 + index * 0.05}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                  {/* Placeholder for actual images */}
                  <div className="text-center">
                    <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                    <Text as="p" className="text-sm text-muted-foreground px-2">
                      {image.alt}
                    </Text>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </BlurFade>
          ))}
        </div>

        {/* Gallery Note */}
        <BlurFade inView delay={0.3}>
          <div className="text-center mt-8">
            <Text as="p" styleVariant="muted" className="mb-4">
              Showing {filteredGallery.length} of{" "}
              {currentEdition.gallery.length} photos
            </Text>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All Photos
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Legacy Impact */}
      <div className="my-16  max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">
                <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                MDIT {currentEdition.year} Legacy Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Text
                as="p"
                styleVariant="muted"
                className="mb-6 max-w-2xl mx-auto leading-relaxed"
              >
                MDIT {currentEdition.year} was more than just a competition—it
                was a catalyst for innovation, collaboration, and real-world
                impact. The solutions developed continue to benefit Malaysian
                society and showcase the power of data science in solving
                national challenges.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/about-us">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More About MDIT
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/event-details">Join MDIT 2025</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Navigation */}
      <div className="my-16  max-w-7xl mx-auto">
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
    </>
  );
};

export default PastMDITPage;
