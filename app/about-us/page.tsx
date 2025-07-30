"use client";

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Award,
  Target,
  Lightbulb,
  Star,

} from "lucide-react";

const AboutUsPage = () => {
  // Team members data organized by bureau
  const teamByBureau = {
    "High Committee": [
      {
        name: "Dr. Sarah Ahmad",
        role: "Chairman, Majlis Tertinggi",
        designation:
          "Senior Lecturer, Faculty of Computer & Mathematical Sciences",
        image: "/team/placeholder-team-1.jpg",
        bio: "Leading digital transformation initiatives in higher education with focus on data science excellence.",
      },
      {
        name: "Prof. Ahmad Hassan",
        role: "Vice Chairman",
        designation: "Dean, Faculty of Computer & Mathematical Sciences",
        image: "/team/placeholder-team-2.jpg",
        bio: "Providing strategic oversight and academic guidance for competition excellence.",
      },
      {
        name: "Dr. Nurul Huda",
        role: "Secretary General",
        designation: "Associate Professor, Statistics Department",
        image: "/team/placeholder-team-3.jpg",
        bio: "Coordinating high-level committee decisions and strategic planning initiatives.",
      },
    ],
    "Program Bureau": [
      {
        name: "Ahmad Firdaus",
        role: "Head of Program Bureau",
        designation: "Final Year Statistics Student",
        image: "/team/placeholder-team-4.jpg",
        bio: "Passionate about creating meaningful learning experiences through data competition programs.",
      },
      {
        name: "Siti Fatimah",
        role: "Deputy Head of Program",
        designation: "Computer Science Undergraduate",
        image: "/team/placeholder-team-5.jpg",
        bio: "Ensuring seamless execution of competition phases and participant experience.",
      },
      {
        name: "Muhammad Arif",
        role: "Workshop Coordinator",
        designation: "Mathematics Student",
        image: "/team/placeholder-team-6.jpg",
        bio: "Organizing educational workshops and skill development sessions for participants.",
      },
    ],
    "Technical Bureau": [
      {
        name: "Nurul Aina",
        role: "Head of Technical Bureau",
        designation: "Computer Science Graduate Student",
        image: "/team/placeholder-team-7.jpg",
        bio: "Ensuring technical excellence and innovation in all competition aspects.",
      },
      {
        name: "Khalid Rahman",
        role: "Platform Developer",
        designation: "Software Engineering Student",
        image: "/team/placeholder-team-8.jpg",
        bio: "Developing and maintaining competition platforms and technical infrastructure.",
      },
      {
        name: "Aisyah Zain",
        role: "Data Systems Manager",
        designation: "Data Science Postgraduate",
        image: "/team/placeholder-team-9.jpg",
        bio: "Managing dataset preparation and technical evaluation systems.",
      },
    ],
    "Corporate Network Bureau": [
      {
        name: "Muhammad Haziq",
        role: "Head of Corporate Network Bureau",
        designation: "Statistics Undergraduate",
        image: "/team/placeholder-team-10.jpg",
        bio: "Building strategic partnerships to enhance industry collaboration and opportunities.",
      },
      {
        name: "Diana Syafiqah",
        role: "Partnership Manager",
        designation: "Business Analytics Student",
        image: "/team/placeholder-team-11.jpg",
        bio: "Developing relationships with industry partners and sponsors for mutual benefit.",
      },
      {
        name: "Ravi Kumar",
        role: "Industry Liaison",
        designation: "Economics & Statistics Student",
        image: "/team/placeholder-team-12.jpg",
        bio: "Facilitating connections between participants and industry professionals.",
      },
    ],
    "Judging Bureau": [
      {
        name: "Siti Aminah",
        role: "Head of Judging Bureau",
        designation: "Data Science Postgraduate",
        image: "/team/placeholder-team-13.jpg",
        bio: "Coordinating expert evaluation processes to ensure fair and comprehensive assessment.",
      },
      {
        name: "Ahmad Zikri",
        role: "Assessment Coordinator",
        designation: "Applied Statistics Student",
        image: "/team/placeholder-team-14.jpg",
        bio: "Developing evaluation criteria and managing the judging process workflow.",
      },
    ],
    "Multimedia Bureau": [
      {
        name: "Puteri Nurain",
        role: "Head of Multimedia Bureau",
        designation: "Statistic Students",
        image: "/team/placeholder-team-15.jpg",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        name: "Ahmad Adha",
        role: "Multimedia Bureau",
        designation: "Computer Science Student",
        image: "/team/placeholder-team-16.jpg",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        name: "Ahmad Adha",
        role: "Multimedia Bureau",
        designation: "Computer Science Student",
        image: "/team/placeholder-team-16.jpg",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    "Protocol Bureau": [
      {
        name: "Noor Azlan",
        role: "Head of Protocol Bureau",
        designation: "International Relations Student",
        image: "/team/placeholder-team-18.jpg",
        bio: "Ensuring proper protocols and ceremonial aspects of competition events.",
      },
      {
        name: "Sarah Michelle",
        role: "Event Coordinator",
        designation: "Hospitality Management Student",
        image: "/team/placeholder-team-19.jpg",
        bio: "Coordinating logistics and ensuring smooth execution of all competition events.",
      },
    ],
  };

  // State for active tab
  const [activeTab, setActiveTab] = React.useState("High Committee");
  const bureauTabs = Object.keys(teamByBureau);


  // Past winners data (you can expand this)
  const pastWinners = [
    {
      year: "2024",
      team: "Team 1",
      university: "Universiti Teknologi MARA",
      project: "Smart City Traffic Optimization",
    },
    {
      year: "2023",
      team: "Team 2",
      university: "Universiti Teknologi MARA",
      project: "Healthcare Resource Prediction",
    },
    {
      year: "2021",
      team: "Team 2",
      university: "Universiti Teknologi MARA",
      project: "Healthcare Resource Prediction",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="text-center space-y-4 py-20 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="font-mono text-primary">
            About Us
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-lg">
            Discover the vision, team, and partnerships behind Malaysia&apos;s
            premier data innovation competition
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" styleVariant="muted" className="max-w-3xl mx-auto">
            Learn about our mission to nurture the next generation of data
            scientists and how we&apos;re contributing to Malaysia&apos;s
            digital transformation journey through innovative education and
            competition platforms.
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
          <Text as="h2" className="text-center font-mono mb-12">
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
      </div>

      {/* Meet the Team Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center font-mono mb-6">
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

        {/* Bureau Tabs */}
        <BlurFade inView delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {bureauTabs.map((bureau) => (
              <Button
                key={bureau}
                variant={activeTab === bureau ? "default" : "outline"}
                onClick={() => setActiveTab(bureau)}
                className="text-sm px-4 py-2"
              >
                {bureau}
              </Button>
            ))}
          </div>
        </BlurFade>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamByBureau[activeTab as keyof typeof teamByBureau].map(
            (member, index) => (
              <BlurFade
                key={`${activeTab}-${index}`}
                inView
                delay={0.2 + index * 0.1}
              >
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
            )
          )}
        </div>

        {/* Bureau Info */}
        <BlurFade inView delay={0.3}>
          <div className="mt-8 text-center">
            <Card className="bg-muted/80 backdrop-blur-xs border-muted/40 shadow-none">
              <CardContent className="p-6">
                <Text as="p" className="text-sm text-muted-foreground">
                  Showing{" "}
                  {teamByBureau[activeTab as keyof typeof teamByBureau].length}{" "}
                  team members from {activeTab}
                </Text>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>

      {/* Hall of Fame / Past Editions Section */}
      <div className="my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center font-mono mb-6">
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
                <CardContent>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* About inStats Association Section */}
      <div className="mt-20 mb-10 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center font-mono mb-12">
            About inStats Association
          </Text>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <BlurFade inView delay={0.15}>
            <div className="space-y-6">
              <Text as="h3" className="text-xl font-semibold">
                Leading Statistics Club at Universiti Teknologi MARA (UiTM) Shah
                Alam
              </Text>
              <Text as="p" styleVariant="muted" className="leading-relaxed">
                inStats Association is the premier statistics club at UiTM,
                dedicated to fostering a vibrant community of data enthusiasts
                and professionals. Our mission is to empower students with the
                skills, knowledge, and networks needed to excel in the field of
                data science and analytics.
              </Text>
              <Text as="p" styleVariant="muted" className="leading-relaxed">
                We organize a wide range of activities including workshops,
                seminars, and competitions to enhance practical skills and
                industry readiness. Our flagship event, MDIT, exemplifies our
                commitment to bridging the gap between academic learning and
                real-world data challenges.
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
                      Including MDIT, fostering innovation and practical skills.
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
      </div>

      {/* Call to Action */}
      <div className="text-center max-w-7xl mx-auto py-20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="mb-4 font-mono">
            Ready to Be Part of Our Story?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" styleVariant="muted" className="mb-6 max-w-2xl mx-auto">
            Join MDIT 2025 and contribute to Malaysia&apos;s data innovation
            journey. Together, we can build a data-driven future that benefits
            all Malaysians.
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
