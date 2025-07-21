"use client";

import React from "react";
import { Text } from "@/components/ui/text";
import { PROGRAM_TIMELINE } from "@/components/constant";
import { CountingNumber } from "@/components/animate-ui/text/counting-number";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  TrophyIcon,
  CheckIcon,
  GraduationCapIcon,
  DollarSignIcon,
  AwardIcon,
  GitGraphIcon,
  InfoIcon,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/radix/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/animate-ui/radix/hover-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EVENT_JUDGES } from "@/components/constant";

const EventDetailsPage = () => {
  // Requirements
  const requirements = [
    {
      icon: GraduationCapIcon,
      title: "Educational Background",
      items: [
        "Currently enrolled as Diploma/Undergraduate program",
        "From any Malaysian university or institution (IPTA/IPTS), including international students",
        "Student from all academic disciplines (STEM and non-STEM) are encouraged to participate",
      ],
    },
    {
      icon: GitGraphIcon,
      title: "Technical Skills",
      items: [
        "Fundamental understanding of data analysis and visualization concepts",
        "Familiarity with any basic statistical tools (SPSS, SAS, Excel etc.)",
        "Openness to learn and apply new tools or technologies during the competition",
      ],
    },
    {
      icon: UsersIcon,
      title: "Team Composition",
      items: [
        "Each team must consist of 4 members with 1 advisor",
        "All team members must be from the same institution",
        "Teams with a mix of technical, analytical, and communication skills are highly encouraged",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="text-center space-y-6 py-20 max-w-4xl mx-auto">
        <BlurFade delay={0.1} inView>
          <Text as="h1" className="text-primary">
            MDIT x DOSM Datathon 2025
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="h2" className="text-2xl font-semibold">
            Premier Data Innovation Competition
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="text-lg max-w-3xl mx-auto leading-relaxed">
            MDIT x DOSM Datathon 2025 is a national inter-varsity program aimed
            at fostering innovation and collaboration among students in the
            fields of data science and analytics. This competition provides a
            platform for students to showcase their analytical skills while
            working with real government datasets.
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <Text as="p" styleVariant="muted" className="max-w-2xl mx-auto">
            Organized in collaboration with the Department of Statistics
            Malaysia (DOSM) and Universiti Teknologi MARA (UiTM), this
            competition bridges the gap between academic learning and real-world
            data challenges.
          </Text>
        </BlurFade>
      </div>

      {/* Prize Pool Section */}
      <div className="text-center py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="mb-6">
            Total Prize Pool
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="h1"
            className="text-primary flex gap-2 items-center justify-center text-6xl md:text-8xl lg:text-9xl font-bold mb-12"
          >
            RM
            <CountingNumber
              decimalPlaces={2}
              decimalSeparator="."
              inView
              number={11000}
              className="text-primary"
            />
          </Text>
        </BlurFade>

        {/* Prize Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <BlurFade inView delay={0.2}>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader className="text-center">
                <TrophyIcon className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                <CardTitle className="text-yellow-800">1st Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Text
                  as="h3"
                  className="text-2xl font-bold text-yellow-700 mb-2"
                >
                  RM 3,500
                </Text>
                <Text as="p" className="text-yellow-600 text-sm">
                  Champion Trophy + Certificates
                </Text>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.25}>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
              <CardHeader className="text-center">
                <AwardIcon className="h-8 w-8 mx-auto text-gray-600 mb-2" />
                <CardTitle className="text-gray-800">2nd Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Text as="h3" className="text-2xl font-bold text-gray-700 mb-2">
                  RM 2,500
                </Text>
                <Text as="p" className="text-gray-600 text-sm">
                  Runner-up Trophy + Certificates
                </Text>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader className="text-center">
                <AwardIcon className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <CardTitle className="text-orange-800">3rd Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Text
                  as="h3"
                  className="text-2xl font-bold text-orange-700 mb-2"
                >
                  RM 1,500
                </Text>
                <Text as="p" className="text-orange-600 text-sm">
                  Third Place Trophy + Certificates
                </Text>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.35}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="text-center">
                <CheckIcon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-blue-800">Finalists</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Text as="h3" className="text-2xl font-bold text-blue-700 mb-2">
                  RM 500
                </Text>
                <Text as="p" className="text-blue-600 text-sm">
                  Each (4th-10th place) + Certificates
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Event Details */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Event Information
          </Text>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BlurFade inView delay={0.15}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="text-pink-600" />
                  <Text as="h4">Competition Period</Text>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" className="font-semibold mb-2">
                  September 6 - October 18, 2025
                </Text>
                <Text as="p" styleVariant="muted" className="text-sm">
                  • Registration: Aug 15-30, 2025
                  <br />
                  • Competition: Sept 6 - Oct 18
                  <br />
                  • Final Presentation: Oct 17
                  <br />• Closing Ceremony: Oct 18
                </Text>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinIcon className="text-cyan-600" />
                  <Text as="h4">Event Format</Text>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" className="font-semibold mb-2">
                  Hybrid (Online + Physical)
                </Text>
                <Text as="p" styleVariant="muted" className="text-sm">
                  • Online workshops and competitions
                  <br />
                  • Physical final presentations
                  <br />
                  • Venue: UiTM Shah Alam
                  <br />• Live streaming available
                </Text>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.25}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSignIcon className="text-green-600" />
                  <Text as="h4">Registration</Text>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" className="font-semibold mb-2">
                  RM150.00 per team
                </Text>
                <Text as="p" styleVariant="muted" className="text-sm">
                  • Non-refundable fee
                  <br />
                  • Limited slots available
                  <br />
                  • First-come, first-served
                  <br />• Online payment only
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Detailed Requirements */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Eligibility & Team Requirements
          </Text>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requirements.map((req, index) => (
            <BlurFade key={index} inView delay={0.15 + index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <req.icon className="inline-block mr-2 h-5 w-5 text-primary" />
                    {req.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {req.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <Text as="p" className="text-sm">
                          {item}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Judges Section */}
      <div className="my-20">
        <BlurFade delay={0.1} inView>
          <Text as="h2" className="text-center mb-6">
            Meet Our Expert Judges
          </Text>
        </BlurFade>
        <BlurFade delay={0.15} inView>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            Our panel consists of industry experts, government officials, and
            academic leaders who will evaluate projects based on innovation,
            technical excellence, and practical application.
          </Text>
        </BlurFade>

        {EVENT_JUDGES && EVENT_JUDGES.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENT_JUDGES.map((judge, index) => (
              <BlurFade key={index} inView delay={0.2 + index * 0.05}>
                <Dialog>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent>
                      <div className="relative aspect-square border rounded-lg mb-4 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="absolute top-2 right-2"
                            variant="secondary"
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                      </div>
                      <Text as="h4" className="font-semibold mb-1">
                        {judge.name}
                      </Text>
                      <Text as="p" styleVariant="muted" className="text-sm">
                        {judge.title}
                      </Text>
                    </CardContent>
                  </Card>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Judge #{index + 1}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="relative flex-1 aspect-video sm:aspect-square border rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                        <Text as="p" styleVariant="muted">
                          Professional Photo
                        </Text>
                      </div>
                      <div className="flex-1">
                        <Text as="h3" className="text-lg font-semibold mb-2">
                          {judge.name}
                        </Text>
                        <Text as="p" styleVariant="muted" className="mb-4">
                          {judge.title}
                        </Text>
                        <Text as="p" className="text-justify leading-relaxed">
                          {judge.bio}
                        </Text>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </BlurFade>
            ))}
          </div>
        ) : (
          <BlurFade inView delay={0.25}>
            <Card className="w-full">
              <CardContent className="w-full py-32">
                <Text as="h3" className="text-center">
                  Judges will be announced soon!
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        )}
      </div>

      {/* Timeline Section */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Competition Timeline
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            Stay informed about all important dates and milestones throughout
            the competition period.{" "}
            <span className="hidden md:inline">
              Hover over each event for detailed information.
            </span>
            <span className="md:hidden">
              Tap on any event to view more details.
            </span>
          </Text>
        </BlurFade>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {PROGRAM_TIMELINE.map((item, index) => (
            <BlurFade key={index} inView delay={0.1 + index * 0.05}>
              {/* Desktop: HoverCard */}
              <div className="hidden md:block">
                <HoverCard openDelay={80} closeDelay={80}>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-row items-start gap-6 cursor-pointer hover:bg-muted/30 p-4 rounded-lg transition-colors group">
                      {/* Date */}
                      <div className="min-w-[120px] text-right">
                        <Text as="p" className="font-semibold">
                          {new Date(item.date).toLocaleDateString("en-MY", {
                            month: "short",
                            day: "numeric",
                          })}
                        </Text>
                        <Text as="p" styleVariant="muted" className="text-sm">
                          {new Date(item.date).getFullYear()}
                        </Text>
                      </div>
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                        {index < PROGRAM_TIMELINE.length - 1 && (
                          <div className="w-0.5 h-24 bg-border mt-2"></div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-2">
                          <item.icon className="h-4 w-4 text-primary" />
                          <Text as="h4" className="font-semibold">
                            {item.event}
                          </Text>
                          <InfoIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                        </div>
                        <Text as="p" styleVariant="muted" className="text-sm">
                          {item.details}
                        </Text>
                        <Text
                          as="p"
                          className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Hover for more details
                        </Text>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent side="right" className="w-96 p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5 text-primary" />
                        <Text as="h4" className="font-semibold">
                          {item.event}
                        </Text>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Text
                            as="p"
                            className="font-medium text-muted-foreground text-sm"
                          >
                            Time:
                          </Text>
                          <Text as="p" className="text-sm">
                            {item.extendedDetails.time}
                          </Text>
                        </div>
                        <div>
                          <Text
                            as="p"
                            className="font-medium text-muted-foreground text-sm"
                          >
                            Location:
                          </Text>
                          <Text as="p" className="text-sm">
                            {item.extendedDetails.location}
                          </Text>
                        </div>
                      </div>

                      <div>
                        <Text
                          as="p"
                          className="font-medium text-muted-foreground text-sm mb-2"
                        >
                          Description:
                        </Text>
                        <Text as="p" className="text-sm leading-relaxed">
                          {item.extendedDetails.description}
                        </Text>
                      </div>

                      <div>
                        <Text
                          as="p"
                          className="font-medium text-muted-foreground text-sm mb-2"
                        >
                          Requirements:
                        </Text>
                        <ul className="text-sm space-y-1">
                          {item.extendedDetails.requirements.map(
                            (req, reqIndex) => (
                              <li
                                key={reqIndex}
                                className="flex items-start gap-2"
                              >
                                <CheckIcon className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              {/* Mobile: Dialog */}
              <div className="md:hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex flex-row items-start gap-4 cursor-pointer hover:bg-muted/30 p-4 rounded-lg transition-colors active:bg-muted/50">
                      {/* Date */}
                      <div className="min-w-[100px] text-right">
                        <Text as="p" className="font-semibold text-sm">
                          {new Date(item.date).toLocaleDateString("en-MY", {
                            month: "short",
                            day: "numeric",
                          })}
                        </Text>
                        <Text as="p" styleVariant="muted" className="text-xs">
                          {new Date(item.date).getFullYear()}
                        </Text>
                      </div>
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg"></div>
                        {index < PROGRAM_TIMELINE.length - 1 && (
                          <div className="w-0.5 h-12 bg-border mt-1"></div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="h-4 w-4 text-primary" />
                          <Text as="h4" className="font-semibold text-sm">
                            {item.event}
                          </Text>
                          <InfoIcon className="h-4 w-4 text-primary ml-auto" />
                        </div>
                        <Text as="p" styleVariant="muted" className="text-xs">
                          {item.details}
                        </Text>
                        <Text
                          as="p"
                          className="text-xs text-primary mt-1 font-medium"
                        >
                          Tap for details
                        </Text>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <item.icon className="h-5 w-5 text-primary" />
                        {item.event}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <Text
                            as="p"
                            className="font-medium text-muted-foreground text-sm"
                          >
                            Time:
                          </Text>
                          <Text as="p" className="text-sm">
                            {item.extendedDetails.time}
                          </Text>
                        </div>
                        <div>
                          <Text
                            as="p"
                            className="font-medium text-muted-foreground text-sm"
                          >
                            Location:
                          </Text>
                          <Text as="p" className="text-sm">
                            {item.extendedDetails.location}
                          </Text>
                        </div>
                      </div>

                      <div>
                        <Text
                          as="p"
                          className="font-medium text-muted-foreground text-sm mb-2"
                        >
                          Description:
                        </Text>
                        <Text as="p" className="text-sm leading-relaxed">
                          {item.extendedDetails.description}
                        </Text>
                      </div>

                      <div>
                        <Text
                          as="p"
                          className="font-medium text-muted-foreground text-sm mb-2"
                        >
                          Requirements:
                        </Text>
                        <ul className="text-sm space-y-2">
                          {item.extendedDetails.requirements.map(
                            (req, reqIndex) => (
                              <li
                                key={reqIndex}
                                className="flex items-start gap-2"
                              >
                                <CheckIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-20 bg-secondary/20 rounded-lg">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="mb-4">
            Ready to Showcase Your Data Skills?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" styleVariant="muted" className="mb-8 max-w-2xl mx-auto">
            Join hundreds of talented students from across Malaysia in this
            prestigious data innovation competition. Register your team today
            and start your journey towards data excellence!
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">Register Your Team</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/rules-regulation">View Competition Rules</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/frequently-asked-questions">View FAQ</Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </>
  );
};

export default EventDetailsPage;
