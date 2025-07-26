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
      {/* Prize Pool Section */}
      <div className="text-center py-24 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 rounded-2xl my-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-pink-400/20 rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10">
          <BlurFade inView delay={0.1}>
            <div className="mb-8">
              <Text as="h2" className="mb-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Grand Prize Pool
              </Text>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
          </BlurFade>
          
          <BlurFade inView delay={0.15}>
            <div className="mb-16">
              <Text
                as="h1"
                className="text-primary flex gap-2 items-center justify-center text-7xl md:text-9xl lg:text-[10rem] font-black mb-4"
              >
                RM
                <CountingNumber
                  decimalPlaces={2}
                  decimalSeparator="."
                  inView
                  number={110000}
                  className="text-primary"
                />
              </Text>
              <Text as="p" styleVariant="muted" className="text-lg font-medium">
                In total prize money and recognition awards
              </Text>
            </div>
          </BlurFade>

          {/* Main Prize Breakdown - Hierarchical Layout */}
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Champion - Largest Card */}
            <BlurFade inView delay={0.2}>
              <div className="flex justify-center">
                <Card className="w-full max-w-md bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 border-2 border-yellow-300 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  {/* Crown decoration */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <TrophyIcon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pt-12 pb-4">
                    <CardTitle className="text-2xl font-bold text-yellow-800 mb-2">🏆 CHAMPION</CardTitle>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <Text as="p" className="text-yellow-700 font-medium">1st Place Winner</Text>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <Text as="h2" className="text-5xl font-black text-yellow-700 mb-4">
                      RM 3,500
                    </Text>
                    <div className="space-y-2">
                      <Text as="p" className="text-yellow-600 font-semibold">✨ Champion Trophy</Text>
                      <Text as="p" className="text-yellow-600 font-semibold">📜 Winner Certificates</Text>
                      <Text as="p" className="text-yellow-600 font-semibold">🎖️ Medal of Excellence</Text>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>

            {/* Runner-up positions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <BlurFade inView delay={0.25}>
                <Card className="bg-gradient-to-br from-gray-50 via-slate-100 to-gray-100 border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                      <AwardIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pt-10 pb-4">
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2">🥈 RUNNER-UP</CardTitle>
                    <Text as="p" className="text-gray-600 font-medium">2nd Place Winner</Text>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <Text as="h3" className="text-3xl font-bold text-gray-700 mb-3">
                      RM 2,500
                    </Text>
                    <div className="space-y-1">
                      <Text as="p" className="text-gray-600 text-sm">🏆 Runner-up Trophy</Text>
                      <Text as="p" className="text-gray-600 text-sm">📜 Certificates</Text>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              <BlurFade inView delay={0.3}>
                <Card className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <AwardIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pt-10 pb-4">
                    <CardTitle className="text-xl font-bold text-orange-800 mb-2">🥉 THIRD PLACE</CardTitle>
                    <Text as="p" className="text-orange-600 font-medium">3rd Place Winner</Text>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <Text as="h3" className="text-3xl font-bold text-orange-700 mb-3">
                      RM 1,500
                    </Text>
                    <div className="space-y-1">
                      <Text as="p" className="text-orange-600 text-sm">🏆 Third Place Trophy</Text>
                      <Text as="p" className="text-orange-600 text-sm">📜 Certificates</Text>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>

            {/* Finalists */}
            <BlurFade inView delay={0.35}>
              <div className="flex justify-center">
                <Card className="w-full max-w-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CheckIcon className="h-6 w-6 text-blue-600" />
                      <CardTitle className="text-lg font-bold text-blue-800">FINALISTS</CardTitle>
                      <CheckIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Text as="p" className="text-blue-600 font-medium">4th - 10th Place (7 Teams)</Text>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <Text as="h3" className="text-2xl font-bold text-blue-700 mb-3">
                      RM 500 <span className="text-sm font-normal">each</span>
                    </Text>
                    <Text as="p" className="text-blue-600 text-sm">🏅 Finalist Certificates + Recognition</Text>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

        {/* Special Awards Section */}
        <div className="mt-12">
          <BlurFade inView delay={0.4}>
            <Text as="h3" className="text-center mb-8 text-2xl font-semibold">
              Special Recognition Awards
            </Text>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <BlurFade inView delay={0.45}>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="text-center">
                  <AwardIcon className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <CardTitle className="text-purple-800 text-sm">
                    Pitching Excellence Award
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Text
                    as="h4"
                    className="text-xl font-bold text-purple-700 mb-2"
                  >
                    RM 200
                  </Text>
                  <Text as="p" className="text-purple-600 text-xs">
                    Best presentation and communication skills
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade inView delay={0.5}>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="text-center">
                  <AwardIcon className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <CardTitle className="text-green-800 text-sm">
                    Critical Thinking & Defence Award
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Text
                    as="h4"
                    className="text-xl font-bold text-green-700 mb-2"
                  >
                    RM 200
                  </Text>
                  <Text as="p" className="text-green-600 text-xs">
                    Outstanding analytical reasoning and Q&A defense
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade inView delay={0.55}>
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                <CardHeader className="text-center">
                  <AwardIcon className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                  <CardTitle className="text-indigo-800 text-sm">
                    Innovation Excellence Award
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Text
                    as="h4"
                    className="text-xl font-bold text-indigo-700 mb-2"
                  >
                    RM 200
                  </Text>
                  <Text as="p" className="text-indigo-600 text-xs">
                    Most creative and innovative solution approach
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
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
            the competition period. Click on any event to view detailed
            information.
          </Text>
        </BlurFade>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {PROGRAM_TIMELINE.map((item, index) => (
            <BlurFade key={index} inView delay={0.1 + index * 0.05}>
              <Dialog>
                <DialogTrigger asChild>
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
                        className="text-xs text-primary mt-2 font-medium"
                      >
                        Click for details
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
