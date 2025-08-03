"use client";

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Users, Award, Target, Lightbulb, Star } from "lucide-react";

const AboutUsPage = () => {
  // Team members data organized by bureau
  const teamByBureau = {
    "High Committee": [
      {
        name: "Ikhwan Mukminin Abdul Aziz",
        role: "Program Director",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-6.jpg",
      },
      {
        name: "Nur Faqihah Binti Mohd Nazri",
        role: "Deputy Program Director",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-7.jpg",
      },
      {
        name: "Adlin Sofiya Binti Mohd Anizam",
        role: "Secretary 1",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-8.jpg",
      },
      {
        name: "Nazaratul Aleeya Binti Mohd Nazri",
        role: "Secretary 2",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-9.jpg",
      },
      {
        name: "Auni 'Izzati Binti Mohd Faizal",
        role: "Treasurer",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-9.jpg",
      },
    ],
    "Program & Protocol Bureau": [
      {
        name: "Nur Nadia Syamimi Binti Mohd Nordin",
        role: "Head of Program Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-10.jpg",
      },
      {
        name: "Wan Nuraqilah Amna Binti Wan Muhammad",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-10.jpg",
      },
      {
        name: "Maliki Bin Nasarudin",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-11.jpg",
      },
      {
        name: "Salis Saadah Binti Shamsul Bahrin",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-12.jpg",
      },
      {
        name: "Nursufi Al-Insyirah Binti Nazir",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-13.jpg",
      },
      {
        name: "Nur Dania Binti Sahrulniza",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-14.jpg",
      },
      {
        name: "Syaripah Nur Anis Sofea Binti Syed Rijeno",
        role: "Program Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-14.jpg",
      },
    ],
    "Management Bureau": [
      {
        name: "Amira Adriana Binti Ahmad Tarmizi",
        role: "Head of Management Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-27.jpg",
      },
      {
        name: "Muhammad Amir Hakim bin Isahrin",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-28.jpg",
      },
      {
        name: "Brandon Ivan Rollend",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-29.jpg",
      },
      {
        name: "Nur Eirdina Binti Mohd Nazri",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-30.jpg",
      },
      {
        name: "Muhammad Fiqri Bin Sahrel",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-30.jpg",
      },
      {
        name: "Nur Aina Mardhiah Binti Muhamad Ruslan",
        role: "Management Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-30.jpg",
      },
    ],
    "Technical & Logistic Bureau": [
      {
        name: "Ikhmal Hakimi Bin Mohd Zunaidi",
        role: "Head of Technical Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-15.jpg",
      },
      {
        name: "Nurul Hanis Nadhirah Binti Norman",
        role: "Deputy Head of Technical Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-16.jpg",
      },
      {
        name: "Mashitah Binti Rahman",
        role: "Technical Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-17.jpg",
      },
      {
        name: "Muhammad Fadhil Rais bin Mohd Harris",
        role: "Technical Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-18.jpg",
      },
      {
        name: "Emran Hafiz Bin M Abd Kohar",
        role: "Technical Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-18.jpg",
      },
    ],
    "Judge & Marking Bureau": [
      {
        name: "Imtinan Ilwani Binti Abdul Ghani",
        role: "Head of Judging Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-19.jpg",
      },
      {
        name: "Nur Ain Adriana Binti Zulfiqar",
        role: "Deputy Head of Judging Bureau",
        designation: "Third Year Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-20.jpg",
      },
      {
        name: "Siti Nurfarhah Binti Zahari",
        role: "Judging Bureau Member",
        designation: "Third Year Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-21.jpg",
      },
    ],
    "Multimedia & Publicity Bureau": [
      {
        name: "Puteri Nurain Binti Mazlan",
        role: "Head of Multimedia Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-23.jpg",
      },
      {
        name: "Nur Afrina Firzana Binti Othman",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-24.jpg",
      },
      {
        name: "Megdelenny Anak Sim",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-25.jpg",
      },
      {
        name: "Nik Nayly Alya Binti Nik Salimi",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-26.jpg",
      },
      {
        name: "Aliyah Nadine Binti Azma Yazuddin",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-26.jpg",
      },
      {
        name: "Muhammad 'Irfan Bin Rahmat",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-26.jpg",
      },
      {
        name: "Ahmad Adha bin Mohd Ghani",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-26.jpg",
      },
      {
        name: "Anis Adlina Binti Rohesan",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-26.jpg",
      },
      {
        name: "Nurulhayati Binti Ahmad Fauzi",
        role: "Multimedia Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-26.jpg",
      },
    ],
    "Corporate Relations Bureau": [
      {
        name: "Aina Batrisyia Binti Zulamri",
        role: "Head of Corporate Relations Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-27.jpg",
      },
      {
        name: "Mohamad Nazmi Aiman Bin Abdullah",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-28.jpg",
      },
      {
        name: "Amni Aizzati Binti Azmi",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-29.jpg",
      },
      {
        name: "Nuqman Aqeef Bin Abd Rahman",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-30.jpg",
      },

      {
        name: "Sofea Nur Batrisyia Binti Bisaludin",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-30.jpg",
      },
      {
        name: "Aisyah Nazihah Binti Ariffin",
        role: "Corporate Relations Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-30.jpg",
      },
    ],
    "Special Task Bureau": [
      {
        name: "Dania Farzana",
        role: "Head of Special Task Bureau",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-27.jpg",
      },
      {
        name: "Nur Azreena Aiyna Binti Azlan",
        role: "Special Task Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-28.jpg",
      },
      {
        name: "Nursyahirah Binti Mulkiaman",
        role: "Special Task Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-29.jpg",
      },
      {
        name: "Nur Nadia Wahida Binti Zulkifli",
        role: "Special Task Bureau Member",
        designation: "Statistics Student, UiTM Shah Alam",
        image: "/team/placeholder-team-30.jpg",
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
      <div className="absolute w-screen lg:w-auto lg:h-[1200px]  lg:-left-128 -left-64 rotate-90 !overflow-visible">
        <Image
          src={"/assets/bg-gradients/11.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>

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
                <Lightbulb className="h-6 w-6 text-primary" />
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
      <div className="absolute w-screen lg:w-auto lg:h-[800px]  -right-0 rotate-90 !overflow-visible">
        <Image
          src={"/assets/bg-gradients/10.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>

      {/* Meet the Team Section */}
      <div className="my-20 max-w-7xl mx-auto">
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
                  <CardContent>
                    <div className="relative aspect-video mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary" />
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

      <div className="absolute h-[800px]  -left-64 rotate-180 !overflow-visible">
        <Image
          src={"/assets/bg-gradients/13.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
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
