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
  PresentationIcon,
  AwardIcon,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/radix/dialog";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EVENT_JUDGES } from "@/components/constant";

const EventDetailsPage = () => {
  // Competition benefits
  const benefits = [
    {
      icon: TrophyIcon,
      title: "Competitive Prize Pool",
      description: "Total prize pool of RM11,000 for top performing teams",
    },
    {
      icon: GraduationCapIcon,
      title: "Learning Experience",
      description: "Gain hands-on experience with real-world datasets",
    },
    {
      icon: PresentationIcon,
      title: "Industry Exposure",
      description: "Present to industry professionals and government officials",
    },
    {
      icon: AwardIcon,
      title: "Recognition",
      description: "Certificates and recognition from prestigious institutions",
    },
  ];

  // Requirements
  const requirements = [
    {
      title: "Educational Background",
      items: [
        "Currently enrolled as Diploma/Undergraduate student",
        "From any Malaysian university or institution",
        "All disciplines welcome (STEM and non-STEM)",
      ],
    },
    {
      title: "Technical Skills",
      items: [
        "Basic programming knowledge (any language)",
        "Understanding of data analysis concepts",
        "Willingness to learn new tools and technologies",
      ],
    },
    {
      title: "Team Composition",
      items: [
        "3-4 members per team (minimum 3, maximum 4)",
        "All members from the same institution",
        "Diverse skill sets recommended",
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
            MDIT 2025 is a national inter-varsity program aimed at fostering
            innovation and collaboration among students in the fields of data
            science and analytics. This competition provides a platform for
            students to showcase their analytical skills while working with real
            government datasets.
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

      {/* Competition Benefits */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Why Participate in MDIT 2025?
          </Text>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BlurFade key={index} inView delay={0.15 + index * 0.05}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Text as="p" styleVariant="muted" className="text-sm">
                    {benefit.description}
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
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

        <BlurFade inView delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="text-blue-600" />
                <Text as="h4">Team Requirements & Eligibility</Text>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Text as="h4" className="font-semibold mb-2">
                  Team Size
                </Text>
                <Text as="p" styleVariant="muted" className="text-sm">
                  • 3-4 members maximum
                  <br />
                  • Minimum 3 members required
                  <br />• All from same institution
                </Text>
              </div>
              <div>
                <Text as="h4" className="font-semibold mb-2">
                  Eligibility
                </Text>
                <Text as="p" styleVariant="muted" className="text-sm">
                  • Malaysian university students
                  <br />
                  • Diploma/Undergraduate level
                  <br />• International students welcome
                </Text>
              </div>
              <div>
                <Text as="h4" className="font-semibold mb-2">
                  Requirements
                </Text>
                <Text as="p" styleVariant="muted" className="text-sm">
                  • Valid student ID
                  <br />
                  • Enrollment verification
                  <br />• Team leader contact info
                </Text>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Detailed Requirements */}
      <div className="my-20">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Participant Requirements
          </Text>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requirements.map((req, index) => (
            <BlurFade key={index} inView delay={0.15 + index * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
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
              <CardContent className="w-full">
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
            the competition period.
          </Text>
        </BlurFade>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {PROGRAM_TIMELINE.map((item, index) => (
            <BlurFade key={index} inView delay={0.1 + index * 0.05}>
              <div className="flex flex-row items-start gap-6">
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
                    <div className="w-0.5 h-16 bg-border mt-2"></div>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 pb-8">
                  <Text as="h4" className="font-semibold mb-2">
                    {item.event}
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    {item.details}
                  </Text>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
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
