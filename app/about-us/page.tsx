"use client";

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Users,
  Award,
  Target,
  Lightbulb,
  Globe,
  Star,
  ExternalLink,
  Quote,
} from "lucide-react";

const AboutUsPage = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Dr. Sarah Ahmad",
      role: "Chairman, Majlis Tertinggi",
      designation:
        "Senior Lecturer, Faculty of Computer & Mathematical Sciences",
      image: "/team/placeholder-team-1.jpg", // You'll need to add actual images
      bio: "Leading digital transformation initiatives in higher education with focus on data science excellence.",
    },
    {
      name: "Ahmad Firdaus",
      role: "Head of Program Bureau",
      designation: "Final Year Statistics Student",
      image: "/team/placeholder-team-2.jpg",
      bio: "Passionate about creating meaningful learning experiences through data competition programs.",
    },
    {
      name: "Nurul Aina",
      role: "Head of Technical Bureau",
      designation: "Computer Science Graduate Student",
      image: "/team/placeholder-team-3.jpg",
      bio: "Ensuring technical excellence and innovation in all competition aspects.",
    },
    {
      name: "Muhammad Haziq",
      role: "Head of Corporate Network Bureau",
      designation: "Statistics Undergraduate",
      image: "/team/placeholder-team-4.jpg",
      bio: "Building strategic partnerships to enhance industry collaboration and opportunities.",
    },
    {
      name: "Siti Aminah",
      role: "Head of Judging Bureau",
      designation: "Data Science Postgraduate",
      image: "/team/placeholder-team-5.jpg",
      bio: "Coordinating expert evaluation processes to ensure fair and comprehensive assessment.",
    },
  ];

  // Advisors and partners data
  const advisorsPartners = [
    {
      name: "Department of Statistics Malaysia (DOSM)",
      type: "Government Partner",
      logo: "/dosm.svg",
      description:
        "Official statistical agency providing datasets and expertise for real-world data challenges.",
      quote:
        "MDIT bridges the gap between academic learning and practical data application in government sectors.",
    },
    {
      name: "Universiti Teknologi MARA (UiTM)",
      type: "Academic Partner",
      logo: "/uitm.svg",
      description:
        "Leading public university providing academic oversight and institutional support.",
      quote:
        "Supporting the next generation of data scientists through innovative competition platforms.",
    },
    {
      name: "Faculty of Computer & Mathematical Sciences",
      type: "Academic Unit",
      logo: "/uitm.svg", // You might want a specific faculty logo
      description:
        "Providing academic guidance and ensuring educational quality standards.",
      quote:
        "Fostering excellence in computational thinking and mathematical reasoning among students.",
    },
  ];

  // Milestones data
  const milestones = [
    {
      year: "2023",
      title: "MDIT Inaugural Edition",
      description:
        "First national datathon launched with 50+ teams from 15 universities",
      achievement: "Foundation laid for annual data innovation competition",
    },
    {
      year: "2024",
      title: "Expanded Reach",
      description: "Grew to 80+ teams with international student participation",
      achievement: "Established partnerships with government agencies",
    },
    {
      year: "2025",
      title: "National Recognition",
      description:
        "Official endorsement from DOSM and alignment with MyDIGITAL initiatives",
      achievement: "Largest prize pool and industry involvement to date",
    },
  ];

  // Past winners data (you can expand this)
  const pastWinners = [
    {
      year: "2024",
      team: "DataMavens",
      university: "Universiti Malaya",
      project: "Smart City Traffic Optimization",
      impact: "Adopted by Kuala Lumpur City Hall for traffic management",
    },
    {
      year: "2023",
      team: "StatVanguard",
      university: "Universiti Teknologi Malaysia",
      project: "Healthcare Resource Prediction",
      impact: "Implemented in regional hospitals for capacity planning",
    },
  ];

  // inStats achievements
  const inStatsAchievements = [
    {
      metric: "500+",
      label: "Active Members Nationwide",
      description: "Statistics students across Malaysian universities",
    },
    {
      metric: "25+",
      label: "Universities Represented",
      description: "From leading public and private institutions",
    },
    {
      metric: "50+",
      label: "Industry Partnerships",
      description: "With government agencies and private sectors",
    },
    {
      metric: "100+",
      label: "Successful Graduates",
      description: "Now working in data science and analytics roles",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="text-center space-y-4 py-20 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            About Us
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-lg">
            Discover the vision, team, and partnerships behind Malaysia's
            premier data innovation competition
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" styleVariant="muted" className="max-w-3xl mx-auto">
            Learn about our mission to nurture the next generation of data
            scientists and how we're contributing to Malaysia's digital
            transformation journey through innovative education and competition
            platforms.
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <div className="flex justify-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/about-us/past-mdit">
                <Award className="h-4 w-4 mr-2" />
                Explore Past MDIT Editions
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Our Story / About MDIT Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Our Story & Vision
          </Text>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <BlurFade inView delay={0.15}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <Text as="h3" className="text-xl font-semibold">
                  Why MDIT Was Created
                </Text>
              </div>
              <Text as="p" styleVariant="muted" className="leading-relaxed">
                MDIT (Malaysia Data Innovation Talent) was born from the
                recognition that Malaysia needs skilled data professionals to
                drive its digital transformation. As industries increasingly
                rely on data-driven decision making, there was a critical gap
                between academic learning and practical application of data
                science skills.
              </Text>
              <Text as="p" styleVariant="muted" className="leading-relaxed">
                Our competition bridges this gap by providing students with
                real-world datasets from government agencies, challenging them
                to develop innovative solutions that address actual national
                priorities and societal needs.
              </Text>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <Text as="h3" className="text-xl font-semibold">
                  Problems We Aim to Solve
                </Text>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p" styleVariant="muted">
                    Lack of practical data science experience among graduates
                  </Text>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p" styleVariant="muted">
                    Limited exposure to real government and industry datasets
                  </Text>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p" styleVariant="muted">
                    Disconnect between academic curriculum and industry needs
                  </Text>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p" styleVariant="muted">
                    Need for more data-driven solutions in public policy
                  </Text>
                </li>
              </ul>
            </div>
          </BlurFade>
        </div>

        {/* National Alignment */}
        <BlurFade inView delay={0.25}>
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                Alignment with National Initiatives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">MyDIGITAL</span>
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    MyDIGITAL Initiative
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Supporting Malaysia's digital economy transformation through
                    data literacy and innovation
                  </Text>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">IR4.0</span>
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    Industry 4.0
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Preparing future workforce for data-driven industrial
                    revolution and smart manufacturing
                  </Text>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">SDGs</span>
                  </div>
                  <Text as="h4" className="font-semibold mb-2">
                    UN SDGs
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Contributing to sustainable development goals through
                    data-driven solutions and evidence-based policy
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Milestones */}
        <BlurFade inView delay={0.3}>
          <div className="mb-12">
            <Text as="h3" className="text-center text-2xl font-semibold mb-8">
              Our Journey & Milestones
            </Text>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <BlurFade key={index} inView delay={0.35 + index * 0.05}>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center md:text-left">
                          <span className="text-3xl font-bold text-primary">
                            {milestone.year}
                          </span>
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <Text as="h4" className="font-semibold text-lg">
                            {milestone.title}
                          </Text>
                          <Text as="p" styleVariant="muted">
                            {milestone.description}
                          </Text>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <Text
                              as="p"
                              className="text-sm font-medium text-primary"
                            >
                              {milestone.achievement}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Meet the Team Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Meet Our Team
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            Dedicated individuals working tirelessly to make MDIT 2025 a
            transformative experience for all participants. Our team combines
            academic excellence with industry expertise.
          </Text>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <BlurFade key={index} inView delay={0.2 + index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                    {/* Placeholder for team member image */}
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <Text as="h4" className="font-semibold text-lg mb-1">
                    {member.name}
                  </Text>
                  <Text as="p" className="text-primary font-medium mb-2">
                    {member.role}
                  </Text>
                  <Text as="p" className="text-sm text-muted-foreground mb-3">
                    {member.designation}
                  </Text>
                  <Text as="p" className="text-sm leading-relaxed">
                    {member.bio}
                  </Text>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* About inStats Association Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            About inStats Association
          </Text>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <BlurFade inView delay={0.15}>
            <div className="space-y-6">
              <Text as="h3" className="text-xl font-semibold">
                Leading Statistics Education in Malaysia
              </Text>
              <Text as="p" styleVariant="muted" className="leading-relaxed">
                The inStats Association is the premier organization representing
                statistics students across Malaysian universities. Founded with
                the mission to advance statistical education and create
                opportunities for students to apply their knowledge in
                real-world scenarios.
              </Text>
              <Text as="p" styleVariant="muted" className="leading-relaxed">
                We serve as a bridge between academic learning and professional
                development, organizing competitions, workshops, seminars, and
                networking events that prepare our members for successful
                careers in data science, analytics, and research.
              </Text>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-primary" />
                <Text as="p" className="font-medium">
                  Empowering the next generation of data professionals
                </Text>
              </div>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Key Initiatives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text as="p" className="font-medium">
                      Annual Data Science Competitions
                    </Text>
                    <Text as="p" className="text-sm text-muted-foreground">
                      Including MDIT and specialized analytical challenges
                    </Text>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text as="p" className="font-medium">
                      Industry Mentorship Programs
                    </Text>
                    <Text as="p" className="text-sm text-muted-foreground">
                      Connecting students with data science professionals
                    </Text>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text as="p" className="font-medium">
                      Skill Development Workshops
                    </Text>
                    <Text as="p" className="text-sm text-muted-foreground">
                      Advanced training in statistical software and
                      methodologies
                    </Text>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <Text as="p" className="font-medium">
                      Research Collaboration
                    </Text>
                    <Text as="p" className="text-sm text-muted-foreground">
                      Facilitating joint research projects with government
                      agencies
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* inStats Achievements */}
        <BlurFade inView delay={0.25}>
          <Card className="bg-gradient-to-r from-secondary/5 to-secondary/10 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-center">
                inStats Association Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {inStatsAchievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <Text
                      as="h3"
                      className="text-3xl font-bold text-primary mb-1"
                    >
                      {achievement.metric}
                    </Text>
                    <Text as="p" className="font-semibold mb-2">
                      {achievement.label}
                    </Text>
                    <Text as="p" className="text-sm text-muted-foreground">
                      {achievement.description}
                    </Text>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Advisors & Partners Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Our Advisors & Strategic Partners
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            We are proud to collaborate with leading institutions and
            organizations that share our vision of advancing data science
            education and innovation in Malaysia.
          </Text>
        </BlurFade>

        <div className="space-y-8">
          {advisorsPartners.map((partner, index) => (
            <BlurFade key={index} inView delay={0.2 + index * 0.1}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                    {/* Logo Section */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-3 p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <Text as="h3" className="text-xl font-semibold">
                          {partner.name}
                        </Text>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {partner.type}
                        </span>
                      </div>
                      <Text
                        as="p"
                        styleVariant="muted"
                        className="mb-4 leading-relaxed"
                      >
                        {partner.description}
                      </Text>
                      <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <Text as="p" className="italic text-sm">
                          "{partner.quote}"
                        </Text>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Hall of Fame / Past Editions Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-6">
            Hall of Fame
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            Celebrating the outstanding achievements of past MDIT champions and
            their innovative solutions that have made real-world impact.
          </Text>
        </BlurFade>

        <div className="space-y-6">
          {pastWinners.map((winner, index) => (
            <BlurFade key={index} inView delay={0.2 + index * 0.1}>
              <Card className="border-l-4 border-l-yellow-500">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full mb-2">
                        <Award className="h-8 w-8" />
                      </div>
                      <Text as="p" className="font-bold text-yellow-700">
                        {winner.year} Winner
                      </Text>
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                        <Text as="h4" className="font-semibold text-lg">
                          Team {winner.team}
                        </Text>
                        <Text as="p" className="text-primary font-medium">
                          {winner.university}
                        </Text>
                      </div>
                      <Text as="p" className="font-medium">
                        Project: {winner.project}
                      </Text>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <Text
                          as="p"
                          className="text-sm text-green-700 font-medium"
                        >
                          Real-world Impact: {winner.impact}
                        </Text>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.4}>
          <div className="text-center mt-12">
            <Text as="p" styleVariant="muted" className="mb-6">
              Join the ranks of innovative data scientists who are shaping
              Malaysia's future through data-driven solutions.
            </Text>
            <Button size="lg" asChild>
              <Link href="/event-details">
                <Award className="h-5 w-5 mr-2" />
                Join MDIT 2025
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Media & Recognition Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center mb-12">
            Media & Recognition
          </Text>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlurFade inView delay={0.15}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ExternalLink className="h-5 w-5" />
                  Press Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" styleVariant="muted" className="mb-4">
                  Featured in leading Malaysian tech publications and university
                  newsletters for promoting data science education.
                </Text>
                <Button variant="outline" size="sm">
                  View Articles
                </Button>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" styleVariant="muted" className="mb-4">
                  Recognized by Malaysian universities and government agencies
                  for excellence in educational innovation and student
                  development.
                </Text>
                <Button variant="outline" size="sm">
                  View Awards
                </Button>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.25}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" styleVariant="muted" className="mb-4">
                  Hear from past participants, judges, and industry partners
                  about their transformative MDIT experience.
                </Text>
                <Button variant="outline" size="sm">
                  Read Stories
                </Button>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center max-w-7xl mx-auto py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="mb-4">
            Ready to Be Part of Our Story?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" styleVariant="muted" className="mb-6 max-w-2xl mx-auto">
            Join MDIT 2025 and contribute to Malaysia's data innovation journey.
            Together, we can build a data-driven future that benefits all
            Malaysians.
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/event-details">Register Your Team</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Users className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </>
  );
};

export default AboutUsPage;
