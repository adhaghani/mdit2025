"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { Threads } from "@/components/optimized-react-bits";
import SpotlightCard from "@/components/react-bits/Components/SpotlightCard/SpotlightCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDevice } from "@/contexts/device-context";

const DynamicIcons = {
  UsersIcon: dynamic(() => import("lucide-react").then((m) => m.Users), {
    ssr: false,
  }),
  AwardIcon: dynamic(() => import("lucide-react").then((m) => m.Award), {
    ssr: false,
  }),
  TargetIcon: dynamic(() => import("lucide-react").then((m) => m.Target), {
    ssr: false,
  }),
  LightbulbIcon: dynamic(() => import("lucide-react").then((m) => m.Lightbulb)),
  StarIcon: dynamic(() => import("lucide-react").then((m) => m.Star), {
    ssr: false,
  }),
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

const AboutUsPage = () => {
  // Get device information from context
  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  // Team members data organized by bureau
  const teamByBureau = {
    "Executive Committee": [
      {
        name: "Ikhwan Mukminin Bin Ahmad Sukri",
        role: "Program Director",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MT1.png",
      },
      {
        name: "Nur Faqihah Binti Mohd Nazri",
        role: "Deputy Program Director",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MT2.png",
      },
      {
        name: "Adlin Sofiya Binti Mohd Anizam",
        role: "Secretary 1",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MT3.png",
      },
      {
        name: "Nazaratul Aleeya Binti Mohd Nazri",
        role: "Secretary 2",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MT4.png",
      },
      {
        name: "Auni 'Izzati Binti Mohd Faizal",
        role: "Treasurer",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MT5.png",
      },
    ],
    "Program & Protocol Bureau": [
      {
        name: "Nur Nadia Syamimi Binti Mohd Nordin",
        role: "Head of Program Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/PP1.png",
      },
      {
        name: "Wan Nuraqilah Amna Binti Wan Muhammad",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/PP2.png",
      },
      {
        name: "Maliki Bin Nasarudin",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/PP3.png",
      },
      {
        name: "Salis Saadah Binti Shamsul Bahrin",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/PP4.png",
      },
      {
        name: "Nursufi Al-Insyirah Binti Nazir",
        role: "Program Bureau Member",
        designation: "Actuarial Science Student, UiTM Shah Alam",
        image: "/team/PP5.png",
      },
      {
        name: "Nur Dania Binti Sahrulniza",
        role: "Program Bureau Member",
        designation: "Actuarial Science Student, UiTM Shah Alam",
        image: "/team/PP6.png",
      },
      {
        name: "Syaripah Nur Anis Sofea Binti Syed Rijeno",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/PP7.png",
      },
    ],
    "Management Bureau": [
      {
        name: "Amira Adriana Binti Ahmad Tarmizi",
        role: "Head of Management Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/M1.png",
      },
      {
        name: "Muhammad Amir Hakim bin Isahrin",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/M2.png",
      },
      {
        name: "Brandon Ivan Rollend",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/M3.png",
      },
      {
        name: "Nur Eirdina Binti Mohd Nazri",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/M4.png",
      },
      {
        name: "Muhammad Fiqri Bin Sahrel",
        role: "Management Bureau Member",
        designation: "Computer Science Student, UiTM Shah Alam",
        image: "/team/M5.png",
      },
      {
        name: "Nur Aina Mardhiah Binti Muhamad Ruslan",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/M6.png",
      },
    ],
    "Technical & Logistic Bureau": [
      {
        name: "Ikhmal Hakimi Bin Mohd Zunaidi",
        role: "Head of Technical & Logistic Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/TL1.png",
      },
      {
        name: "Nurul Hanis Nadhirah Binti Norman",
        role: "Deputy Head of Technical & Logistic Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/TL2.png",
      },
      {
        name: "Mashitah Binti Rahman",
        role: "Technical & Logistic Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/TL3.png",
      },
      {
        name: "Emran Hafiz Bin M Abd Kohar",
        role: "Technical & Logistic Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/TL4.png",
      },
      {
        name: "Muhammad Fadhil Rais bin Mohd Harris",
        role: "Technical & Logistic Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/TL5.png",
      },
    ],
    "Judging & Scoring Bureau": [
      {
        name: "Imtinan Ilwani Binti Abdul Ghani",
        role: "Head of Judging & Scoring Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/JM1.png",
      },
      {
        name: "Nur Ain Adriana Binti Zulfiqar",
        role: "Judging & Scoring Bureau Member",
        designation: "Third Year Statistics Student, UiTM Shah Alam",
        image: "/team/JM2.png",
      },
      {
        name: "Siti Nurfarhah Binti Zahari",
        role: "Judging Bureau & Scoring Member",
        designation: "Third Year Statistics Student, UiTM Shah Alam",
        image: "/team/JM3.png",
      },
    ],
    "Multimedia & Publicity Bureau": [
      {
        name: "Puteri Nurain Binti Mazlan",
        role: "Head of Multimedia & Publicity Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MP1.png",
      },
      {
        name: "Nur Afrina Firzana Binti Othman",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MP2.png",
      },
      {
        name: "Megdelenny Anak Sim",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MP3.png",
      },
      {
        name: "Nik Nayly Alya Binti Nik Salimi",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MP4.png",
      },
      {
        name: "Aliyah Nadine Binti Azma Yazuddin",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MP5.png",
      },
      {
        name: "Muhammad 'Irfan Bin Rahmat",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Artificial Intelligence Student, UiTM Shah Alam",
        image: "/team/MP6.png",
      },
      {
        name: "Ahmad Adha bin Mohd Ghani",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Computer Science Student, UiTM Shah Alam",
        image: "/team/MP7.png",
      },
      {
        name: "Anis Adlina Binti Rohesan",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MP8.png",
      },
      {
        name: "Nurulhayati Binti Ahmad Fauzi",
        role: "Multimedia & Publicity Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/MP9.png",
      },
    ],
    "Corporate Relations Bureau": [
      {
        name: "Aina Batrisyia Binti Zulamri",
        role: "Head of Corporate Relations Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/CR1.png",
      },
      {
        name: "Mohamad Nazmi Aiman Bin Abdullah",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/CR2.png",
      },
      {
        name: "Amni Aizzati Binti Azmi",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/CR3.png",
      },
      {
        name: "Nuqman Aqeef Bin Abd Rahman",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/CR4.png",
      },

      {
        name: "Sofea Nur Batrisyia Binti Bisaludin",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/CR5.png",
      },
      {
        name: "Aisyah Nazihah Binti Ariffin",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/CR6.png",
      },
    ],
    "Special Tasks Bureau": [
      {
        name: "Dania Farzana",
        role: "Head of Special Task Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/ST1.png",
      },
      {
        name: "Nur Azreena Aiyna Binti Azlan",
        role: "Special Task Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/ST2.png",
      },
      {
        name: "Nursyahirah Binti Mulkiaman",
        role: "Special Task Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/ST3.png",
      },
      {
        name: "Nur Nadia Wahida Binti Zulkifli",
        role: "Special Task Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/ST4.png",
      },
    ],
  };

  // State for active tab
  const [activeTab, setActiveTab] = React.useState("Executive Committee");
  const bureauTabs = Object.keys(teamByBureau);

  // Past winners data (you can expand this)
  const pastWinners = [
    {
      year: "2024",
      team: "NanoGuardian",
      university: "Taylors University",
    },
    {
      year: "2023",
      team: "Rookie Patchers",
      university: "Universiti Kebangsaan Malaysia",
    },
    {
      year: "2021",
      team: "Fantastic Four",
      university: "Universiti Tun Hussein Onn Malaysia",
    },
  ];

  return (
    <>
      <div className="absolute w-screen lg:hidden -left-64 rotate-90 !overflow-visible">
        <Image
          src={"/assets/bg-gradients/11.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>
      {!deviceLoading && shouldReducePerformance ? null : isWebGLSupported ? (
        <div className="w-full h-[800px] hidden lg:block top-0 absolute -z-10">
          <Threads
            color={[
              0.5647058823529412, 0.19215686274509805, 0.8666666666666667,
            ]}
            amplitude={2}
            distance={0.6}
          />
        </div>
      ) : null}

      {/* Header Section */}
      <div className="text-center space-y-4 py-32 lg:py-48 px-4 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="font-mono text-primary">
            About Us
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-xl">
            Discover the vision, team, and partnerships behind Malaysia&apos;s
            premier data innovation competition
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="max-w-3xl mx-auto">
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
                <DynamicIcons.AwardIcon className="h-4 w-4 mr-2" />
                Explore Past MDIT Editions
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Our Story / About MDIT Section */}
      <div className="my-20 max-w-7xl px-4 mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center font-mono mb-12">
            Our Story & Vision
          </Text>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <BlurFade inView delay={0.15}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <DynamicIcons.TargetIcon className="h-6 w-6 text-primary" />
                <Text as="h3" className="text-xl font-semibold">
                  Why MDIT Was Created
                </Text>
              </div>
              <Text as="p" className="leading-relaxed">
                MDIT (Malaysia Data Innovation Talent) was born from the
                recognition that Malaysia needs skilled data professionals to
                drive its digital transformation. As industries increasingly
                rely on data-driven decision making, there was a critical gap
                between academic learning and practical application of data
                science skills.
              </Text>
              <Text as="p" className="leading-relaxed">
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
                <DynamicIcons.LightbulbIcon className="h-6 w-6 text-primary" />
                <Text as="h3" className="text-xl font-semibold">
                  Problems We Aim to Solve
                </Text>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p">
                    Lack of practical data science experience among graduates
                  </Text>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p">
                    Limited exposure to real government and industry datasets
                  </Text>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p">
                    Disconnect between academic curriculum and industry needs
                  </Text>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <Text as="p">
                    Need for more data-driven solutions in public policy
                  </Text>
                </li>
              </ul>
            </div>
          </BlurFade>
        </div>
      </div>
      <div className="absolute right-0 w-screen lg:h-[800px] lg:w-auto rotate-90 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/10.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-left !overflow-visible"
        />
      </div>

      {/* Meet the Team Section */}
      <div className="my-20 px-4 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center font-mono mb-6">
            Meet Our Team
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-center mb-12 max-w-2xl mx-auto">
            Dedicated individuals working tirelessly to make MDIT 2025 a
            transformative experience for all participants. Our team combines
            academic excellence with industry expertise.
          </Text>
        </BlurFade>

        {/* Bureau Tabs */}
        <BlurFade inView delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <ScrollArea className="w-full max-w-3xl whitespace-nowrap py-4">
              {bureauTabs.map((bureau) => (
                <Button
                  key={bureau}
                  variant={activeTab === bureau ? "default" : "outline"}
                  onClick={() => setActiveTab(bureau)}
                  className="text-sm px-4 py-2 mr-4"
                >
                  {bureau}
                </Button>
              ))}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </BlurFade>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamByBureau[activeTab as keyof typeof teamByBureau].map(
            (member, index) => (
              <BlurFade
                key={`${activeTab}-${index}`}
                inView
                delay={0.2 + index * 0.1}
              >
                <SpotlightCard
                  className="bg-card h-full"
                  spotlightColor="rgba(144, 49, 221, 0.5)"
                >
                  <CardContent className="p-0 !bg-none">
                    <div className="relative aspect-4/3 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={532}
                          height={400}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <DynamicIcons.UsersIcon className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <Text as="h4" className="font-semibold text-lg mb-0">
                      {member.name}
                    </Text>
                    <Text as="p" className="text-sm text-muted-foreground mb-3">
                      {member.designation}
                    </Text>
                    <Text as="p" className="text-primary font-medium mb-2">
                      {member.role}
                    </Text>
                  </CardContent>
                </SpotlightCard>
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
      <div className="my-20 px-4 max-w-7xl mx-auto">
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
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full mb-2">
                        <DynamicIcons.AwardIcon className="h-8 w-8" />
                      </div>
                      <Text as="p" className="font-bold text-yellow-700">
                        {winner.year} Winner
                      </Text>
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      <div className="flex flex-col md:gap-2">
                        <Text as="h4" className="font-semibold text-lg">
                          Team {winner.team}
                        </Text>
                        <Text as="p" className="text-primary font-medium">
                          {winner.university}
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

      <div className="absolute -left-0 lg:-left-32 w-screen lg:w-auto h-[800px] rotate-180 !overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/13.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-right !overflow-visible"
        />
      </div>

      {/* About inStats Association Section */}
      <div className="mt-20 px-4 mb-10 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2" className="text-center font-mono mb-12">
            About inStats
          </Text>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <BlurFade inView delay={0.15}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Image
                    src="/instats.svg"
                    alt="inStats Logo"
                    width={120}
                    height={120}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Text as="h3" className="text-xl font-semibold">
                  Leading Statistics Association at Universiti Teknologi MARA
                  (UiTM) Shah Alam
                </Text>
              </div>
              <Text as="p" className="leading-relaxed">
                Statistic Association (inStats) is the premier statistics club
                at UiTM, dedicated to fostering a vibrant community of data
                enthusiasts and professionals. Our mission is to empower
                students with the skills, knowledge, and networks needed to
                excel in the field of data science and analytics.
              </Text>
              <Text as="p" className="leading-relaxed">
                We organise a wide range of activities including workshops,
                seminars, and competitions to enhance practical skills and
                industry readiness. Our flagship event, MDIT, exemplifies our
                commitment to bridging the gap between academic learning and
                real-world data challenges.
              </Text>
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 text-center  rounded-lg  py-20">
          <BlurFade inView delay={0.1}>
            <Text as="h2" className="mb-4 font-mono">
              Ready to Be Part of Our Story?
            </Text>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Text
              as="p"
              styleVariant="muted"
              className="mb-6 max-w-2xl mx-auto"
            >
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
                  <DynamicIcons.UsersIcon className="h-5 w-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
