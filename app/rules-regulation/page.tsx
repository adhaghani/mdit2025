"use client";

import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  MditAurora,
  MditTextPressure,
} from "@/components/optimized-react-bits";
import { useDevice } from "@/contexts/device-context";

const DynamicIcons = {
  AlertTriangle: dynamic(
    () => import("lucide-react").then((m) => m.AlertTriangle),
    {
      ssr: false,
    }
  ),
  CheckCircle: dynamic(
    () => import("lucide-react").then((m) => m.CheckCircle),
    {
      ssr: false,
    }
  ),
  Download: dynamic(() => import("lucide-react").then((m) => m.Download), {
    ssr: false,
  }),
  ExternalLink: dynamic(
    () => import("lucide-react").then((m) => m.ExternalLink),
    {
      ssr: false,
    }
  ),
  ChevronDown: dynamic(
    () => import("lucide-react").then((m) => m.ChevronDown),
    {
      ssr: false,
    }
  ),
  Users: dynamic(() => import("lucide-react").then((m) => m.Users), {
    ssr: false,
  }),
  Shield: dynamic(() => import("lucide-react").then((m) => m.Shield), {
    ssr: false,
  }),
  FileText: dynamic(() => import("lucide-react").then((m) => m.FileText), {
    ssr: false,
  }),
  Calendar: dynamic(() => import("lucide-react").then((m) => m.Calendar), {
    ssr: false,
  }),
  Award: dynamic(() => import("lucide-react").then((m) => m.Award), {
    ssr: false,
  }),
  Eye: dynamic(() => import("lucide-react").then((m) => m.Eye), {
    ssr: false,
  }),
  Target: dynamic(() => import("lucide-react").then((m) => m.Target), {
    ssr: false,
  }),
  TrendingUp: dynamic(() => import("lucide-react").then((m) => m.TrendingUp), {
    ssr: false,
  }),
  BarChart: dynamic(() => import("lucide-react").then((m) => m.BarChart), {
    ssr: false,
  }),
  Presentation: dynamic(
    () => import("lucide-react").then((m) => m.Presentation),
    {
      ssr: false,
    }
  ),
};

const BlurFade = dynamic(
  () => import("@/components/magicui/blur-fade").then((mod) => mod.BlurFade),
  { ssr: false }
);

const RulesRegulationPage = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "all"
  );

  // Categorize rules for better organization
  const ruleCategories = [
    {
      id: "eligibility",
      title: "Eligibility & Team Formation",
      icon: DynamicIcons.Users,
      color: "bg-blue-500",
      rules: [1, 2, 3, 4],
    },
    {
      id: "registration",
      title: "Registration & Fees",
      icon: DynamicIcons.FileText,
      color: "bg-green-500",
      rules: [5, 6, 7, 8],
    },
    {
      id: "development",
      title: "Development Guidelines",
      icon: DynamicIcons.Shield,
      color: "bg-purple-500",
      rules: [9, 10, 11, 12],
    },
    {
      id: "submission",
      title: "Submission Requirements",
      icon: DynamicIcons.Award,
      color: "bg-orange-500",
      rules: [13, 14, 15],
    },
    {
      id: "ethics",
      title: "Ethics & Conduct",
      icon: DynamicIcons.Eye,
      color: "bg-red-500",
      rules: [16, 17, 18, 19, 20, 21, 22],
    },
    {
      id: "evaluation",
      title: "Evaluation & Final Events",
      icon: DynamicIcons.Calendar,
      color: "bg-indigo-500",
      rules: [23, 24],
    },
  ];

  const RulesRegulation = [
    {
      id: 1,
      title: "Eligibility",
      details: {
        text: "Participation is open to Diploma and Undergraduate students from Public (IPTA) and  Private  (IPTS)  Higher  Education  Institutions  in  Malaysia.  All  participants must be Malaysian citizens.",
        list: null,
      },
    },
    {
      id: 2,
      title: "Team Composition",
      details: {
        text: "Each team must consist of FOUR (4) students from the same university and ONE (1) supervising lecturer.",
        list: null,
      },
    },
    {
      id: 3,
      title: "Team Member Changes",
      details: {
        text: "No team changes are allowed after the registration deadline unless approved by the organising committee under exceptional circumstances.",
        list: null,
      },
    },
    {
      id: 4,
      title: "Supervisor Role",
      details: {
        text: "The supervising lecturer is expected to provide guidance and advisory support only, and not to be directly involved in the product development.",
        list: null,
      },
    },
    {
      id: 5,
      title: "Registration & Fees",
      details: {
        text: "Registration must be completed through the official MDIT x DD 2025 portal. Each team is required to pay a non-refundable RM150 entry fee.",
        list: null,
      },
    },
    {
      id: 6,
      title: "Official Receipt and Claim Procedures",
      details: {
        text: "The official receipt will be issued throughout the competition. It may be used by teams to claim the registration fee from their universities, subject to their internal procedures. Participants must manage their own claims with their universities, as the organisers will not provide assistance or take any responsibility.",
        list: null,
      },
    },
    {
      id: 7,
      title: "Mandatory WhatsApp Group Participation",
      details: {
        text: "Upon confirmation of registration, participants must join the official WhatsApp group ‘PARTICIPANTS MDIT x DD 2025’ using the provided link. All official announcements and updates will be made through this group.",
        list: null,
      },
    },
    {
      id: 8,
      title: "Mandatory Attendance",
      details: {
        text: "All participants are required to be present and actively involved in every session organised throughout the competition.",
        list: null,
      },
    },
    {
      id: 9,
      title: "Development Timeline",
      details: {
        text: "All projects must be completed within the competition’s specified timeframe. Late submissions will not be accepted or evaluated.",
        list: null,
      },
    },
    {
      id: 10,
      title: "Data Sources",
      details: {
        text: "Participants must use open and publicly accessible datasets. The use of fabricated, simulated, or fictional data is strictly prohibited. All data must be authentic, reliable, and sourced from credible platforms. Recommended data sources include (but are not limited to):",
        list: [
          "OpenDOSM (Department of Statistics Malaysia)",
          "eStatistik",
          "data.gov.my (Malaysian Government Open Data Portal)",
          "World Bank Open Data",
          "Monthly Highlights and Statistics Dataset by Bank Negara Malaysia",
          "UN Data",
        ],
        extra:
          "Extra marks will be awarded for use of Malaysian official data (e.g., OpenDOSM, eStatistik, StatsDW IDL), subject to judging criteria.",
      },
    },
    {
      id: 11,
      title: "Tools & Equipment",
      details: {
        text: "Participants  may  use  any  hardware  and software of their choice, but must provide and use their own ICT equipment throughout the competition.",
        list: null,
      },
    },
    {
      id: 12,
      title: "Originality and Use of Third-Party Materials",
      details: {
        text: "All submitted work must be the original work of the team. Teams may use third-party libraries, frameworks, pre-trained models, and openly licensed datasets as long as they clearly cite and list each external resource in the Project Report and reproducibility package, and also document how those resources were used and integrated. Submissions that copy, plagiarise, or otherwise use proprietary intellectual property without licence or attribution will be disqualified.",
        list: null,
      },
    },
    {
      id: 13,
      title: "Required Submissions",
      details: {
        text: "Each team must submit:",
        list: [
          "A dashboard in PDF containing the source file (eg., .pbix, .xslm, etc.)",
          "A recorded presentation video",
          "A project report using the template provided by the organisers",
        ],
      },
    },
    {
      id: 14,
      title: "Final Submission",
      details: {
        text: "Once submitted, no changes or resubmissions are allowed. The final version will be evaluated as is.",
        list: null,
      },
    },
    {
      id: 15,
      title: "Dashboard Accessibility",
      details: {
        text: "The final product must be delivered in dashboard form and must remain accessible until the evaluation process is complete.",
        list: null,
      },
    },
    {
      id: 16,
      title: "Ethical Data Use",
      details: {
        text: "Participants must not use any personally identifiable or confidential data without permission. Plagiarism or using copied content (e.g., dashboards) will result in disqualification.",
        list: null,
      },
    },
    {
      id: 17,
      title: "Intellectual Property Rights",
      details: {
        text: "Participants retain full ownership of their projects. However, the organisers reserve non-exclusive rights to showcase, publish, or exhibit the project for promotional or educational use, with proper credit to the team.",
        list: null,
      },
    },
    {
      id: 18,
      title: "Personal Data Protection",
      details: {
        text: "All personal data shared with the organisers will be securely stored and used only  according  to  competition  rules,  unless  explicit  consent  is given for other purposes.",
        list: null,
      },
    },
    {
      id: 19,
      title: "Prohibition of Harmful Software",
      details: {
        text: "Submissions must be free from harmful elements such as viruses, trojans, spyware, or any code that could damage or disrupt systems.",
        list: null,
      },
    },
    {
      id: 20,
      title: "Inappropriate Content Prohibited",
      details: {
        text: "Submissions containing offensive, violent, defamatory, or insulting content especially against the organisers or any unauthorized copyrighted material will be disqualified.",
        list: null,
      },
    },
    {
      id: 21,
      title: "Violation of Rules",
      details: {
        text: "The organizer reserves the right to disqualify or cancel any team’s entry if rules or submission requirements are violated.",
        list: null,
      },
    },
    {
      id: 22,
      title: "Liability Disclaimer",
      details: {
        text: "The organisers will not be held responsible for any incidents, health issues, damages, or losses incurred during participation.",
        list: null,
      },
    },
    {
      id: 23,
      title: "Final Decision by Judges",
      details: {
        text: "All decisions by the judging panel, including the selection of winners, are final and cannot be appealed.",
        list: null,
      },
    },
    {
      id: 24,
      title: "E-Certificate Eligibility",
      details: {
        text: "E-certificates of participation will be issued only to participants who submit their final  products  within  the  deadline.  Certificates  will  be  emailed  after  the competition ends.",
        list: null,
      },
    },
  ];

  const importantNotes = [
    {
      type: "warning",
      title: "Disqualification Criteria",
      content: [
        "Failure to attend mandatory sessions organised throughout the competition without prior approval from the organising committee",
        "Failure to join the official WhatsApp group 'PARTICIPANTS MDIT x DD 2025' after registration confirmation",
        "Using fabricated, simulated, or fictional data instead of authentic, publicly accessible datasets",
        "Using personally identifiable or confidential data without proper permission",
        "Plagiarism or copying content from other sources, including existing dashboards",
        "Using proprietary intellectual property without proper licence or attribution",
        "Failure to clearly cite and document third-party libraries, frameworks, pre-trained models, or datasets used",
        "Late submission beyond the specified deadline (no extensions will be granted)",
        "Incomplete submissions missing required components (dashboard PDF with source files, presentation video, or project report)",
        "Submitting work that is not the original work of the team",
        "Submissions containing harmful software elements such as viruses, trojans, spyware, or disruptive code",
        "Submissions containing offensive, violent, defamatory, or insulting content, particularly against organisers",
        "Using unauthorised copyrighted material without proper licence",
        "Team member changes after the registration deadline without organising committee approval under exceptional circumstances",
        "Failure to maintain dashboard accessibility during the evaluation period",
        "Providing fraudulent information during registration or in submissions",
        "Incomplete team registration or missing required documentation",
        "Violation of any competition rules or submission requirements as outlined in the official guidelines",
        "Failure to use own ICT equipment throughout the competition as required",
        "Non-compliance with the mandatory team composition of four (4) students and one (1) supervising lecturer from the same university",
      ],
    },
    {
      type: "info",
      title: "Judging Criteria",
      content: [
        {
          type: "Part A: Project Content",
          weight: 60,
          details: [
            "Data Selection",
            "Introduction",
            "Literature Review",
            "Methodology & Data Analysis",
            "Findings & Results",
            "Conclusion",
            "Originality & Commercial Value",
          ],
        },
        {
          type: "Part B: Project Presentation",
          weight: 40,
          details: [
            "Quality of Presentation",
            "Subject Knowledge",
            "Ability to Answer Questions",
            "Teamwork & Collaboration",
            "Creativity & Innovation",
            "Time Management",
          ],
        },
      ],
    },
  ];

  const SpecialAwardCategories = [
    {
      award: "Pitching Excellence Award",
      type: "individual",
      details:
        "Awarded to the individual who delivers the most effective and engaging presentation, demonstrating clarity, confidence, good structure, strong audience connection, and appropriate pacing.",
    },
    {
      award: "Critical Thinking & Defence Award",
      type: "Team",
      details:
        "Recognises the team that shows excellent knowledge of their project, works well together, responds confidently to questions, handles feedback positively, and defends their ideas with strong logic and reasoning.",
    },
    {
      award: "Innovation Excellence Award",
      type: "Team",
      details:
        "Honours the team that showcases the most original and innovative ideas, with clear data organisation, impactful visual design, practical applications, and potential for scalability.",
    },
  ];

  const isReleased = true;

  // Get device information from context
  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  if (!isReleased) {
    return (
      <div className="text-center py-64">
        <Text as="h1" className="text-2xl font-bold mb-4">
          Rules & Regulations Coming Soon
        </Text>
        <Text as="p" className="text-lg text-muted-foreground">
          The rules and regulations for MDIT 2025 will be released soon. Please
          check back later for updates.
        </Text>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
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
      ) : isWebGLSupported ? (
        <div className="absolute w-full h-[500px] hidden lg:block sm:h-[3/4]">
          <MditAurora />
        </div>
      ) : null}

      {isWebGLSupported ? (
        <div className="absolute opacity-40 hidden lg:block w-full h-fit -z-10">
          <MditTextPressure text="Rules" />
        </div>
      ) : null}
      <div className="text-center space-y-4 py-32 relative lg:py-64 px-4 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            Rules & Regulations
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-xl">
            Complete guidelines and requirements for participating in MDIT 2025
            Datathon
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="max-w-3xl mx-auto">
            Please read all rules carefully before registering. By participating
            in MDIT 2025, you agree to abide by all the rules and regulations
            outlined below. Violation of any rule may result in
            disqualification.
          </Text>
        </BlurFade>
      </div>

      <div className="absolute left-0 h-[700px] rotate-0 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/12.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>

      {/* Table of Contents */}
      <div className="mt-12 mb-4 px-4 max-w-7xl mx-auto">
        <BlurFade inView delay={0.25}>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DynamicIcons.FileText className="h-5 w-5" />
                Quick Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ruleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setExpandedCategory(category.id)}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      expandedCategory === category.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${category.color} text-white`}
                      >
                        <category.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <Text as="h3" className="font-semibold text-sm">
                          {category.title}
                        </Text>
                        <Text as="p" className="text-xs text-muted-foreground">
                          {category.id === "awards"
                            ? `${SpecialAwardCategories.length} awards`
                            : `${category.rules.length} rules`}
                        </Text>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  variant={expandedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExpandedCategory("all")}
                >
                  Show All Rules
                </Button>
                {ruleCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      expandedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setExpandedCategory(category.id)}
                  >
                    {category.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Rules Sections */}
      <div className="mt-4 mb-20 px-4 max-w-7xl mx-auto space-y-8">
        {ruleCategories.map((category, categoryIndex) => {
          if (expandedCategory !== "all" && expandedCategory !== category.id) {
            return null;
          }

          const categoryRules = RulesRegulation.filter((rule) =>
            category.rules.includes(rule.id)
          );

          return (
            <BlurFade
              key={category.id}
              inView
              delay={0.1 + categoryIndex * 0.05}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${category.color} text-white`}
                    >
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {category.title}
                      </CardTitle>
                      <Text as="p" className="text-muted-foreground">
                        {categoryRules.length} regulations in this category
                      </Text>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {categoryRules.map((rule, index) => (
                      <div
                        key={rule.id}
                        className={`border border-border rounded-lg transition-all duration-200 ${
                          activeSection === rule.id
                            ? "border-primary shadow-md"
                            : "hover:border-primary/50 hover:shadow-sm"
                        }`}
                      >
                        <button
                          onClick={() =>
                            setActiveSection(
                              activeSection === rule.id ? null : rule.id
                            )
                          }
                          className="w-full p-4 text-left flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-[2.5rem] justify-center"
                            >
                              {rule.id}
                            </Badge>
                            <Text as="h4" className="font-semibold">
                              {rule.title}
                            </Text>
                          </div>
                          <DynamicIcons.ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeSection === rule.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {activeSection === rule.id && (
                          <div className="px-4 pb-4 pt-2 border-t border-border">
                            <div className="bg-muted/30 rounded-lg p-4">
                              <Text as="p" className="leading-relaxed">
                                {rule.details.text}
                              </Text>

                              {rule.details.list && (
                                <div className="mt-4 space-y-2">
                                  {rule.details.list.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className="flex items-start gap-3"
                                    >
                                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                      <Text as="p" className="text-sm">
                                        {item}
                                      </Text>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {rule.details.extra && (
                                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                  <div className="flex items-start gap-2">
                                    <DynamicIcons.CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <Text
                                        as="h4"
                                        className="font-semibold text-blue-700 dark:text-blue-400 mb-2"
                                      >
                                        Additional Information
                                      </Text>
                                      <Text
                                        as="p"
                                        className="text-blue-600 dark:text-blue-300 text-sm"
                                      >
                                        {rule.details.extra}
                                      </Text>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          );
        })}
      </div>
      <div className="absolute left-0 lg:-left-32 h-[900px] rotate-0 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/9.png"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          unoptimized
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>

      {/* Important Notes - Enhanced Design */}
      <div className="my-20 px-4 max-w-7xl mx-auto">
        <BlurFade inView delay={0.3}>
          <div className="text-center mb-12">
            <Text as="h2" className="text-3xl font-bold mb-4">
              Critical Information
            </Text>
            <Text
              as="p"
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Essential details about disqualification criteria and judging
              standards
            </Text>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Disqualification Criteria Card */}
          <BlurFade inView delay={0.4}>
            <Card className="h-full transition-all duration-200 hover:shadow-lg border-red-200 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-900/20 dark:to-red-800/10 dark:border-red-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-red-700 dark:text-red-400">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                    <DynamicIcons.AlertTriangle className="h-6 w-6" />
                  </div>
                  {importantNotes[0].title}
                </CardTitle>
                <Text
                  as="p"
                  className="text-sm text-red-600/80 dark:text-red-400/80"
                >
                  {Array.isArray(importantNotes[0].content)
                    ? importantNotes[0].content.length
                    : 0}{" "}
                  critical violations that lead to immediate disqualification
                </Text>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80 pr-4">
                  <div className="space-y-3">
                    {Array.isArray(importantNotes[0].content) &&
                      importantNotes[0].content.every(
                        (item) => typeof item === "string"
                      ) &&
                      (importantNotes[0].content as string[]).map(
                        (item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-start gap-3 group p-3 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors bg-red-100 dark:bg-red-900/50 group-hover:bg-red-200 dark:group-hover:bg-red-800/50">
                              <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                                {itemIndex + 1}
                              </span>
                            </div>
                            <Text
                              as="p"
                              className="text-sm leading-relaxed group-hover:text-foreground transition-colors"
                            >
                              {item}
                            </Text>
                          </div>
                        )
                      )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Judging Criteria Card */}
          <BlurFade inView delay={0.5}>
            <Card className="h-full transition-all duration-200 hover:shadow-lg border-blue-200 bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/10 dark:border-blue-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-blue-700 dark:text-blue-400">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <DynamicIcons.Target className="h-6 w-6" />
                  </div>
                  {importantNotes[1].title}
                </CardTitle>
                <Text
                  as="p"
                  className="text-sm text-blue-600/80 dark:text-blue-400/80"
                >
                  Each team will be evaluated by a panel of expert judges.
                  Scoring will be based on the following key criteria.
                </Text>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80 pr-4">
                  <div className="space-y-6">
                    {Array.isArray(importantNotes[1].content) &&
                      importantNotes[1].content.every(
                        (item) => typeof item === "object"
                      ) &&
                      (
                        importantNotes[1].content as Array<{
                          type: string;
                          weight: number;
                          details: string[];
                        }>
                      ).map((category, categoryIndex) => (
                        <div key={categoryIndex} className="group">
                          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                            <div className="flex items-center gap-2">
                              {categoryIndex === 0 ? (
                                <DynamicIcons.BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              ) : (
                                <DynamicIcons.Presentation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              )}
                              <Text
                                as="h4"
                                className="font-semibold text-blue-800 dark:text-blue-300"
                              >
                                {category.type}
                              </Text>
                            </div>
                            <Badge
                              variant="secondary"
                              className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                            >
                              {category.weight}%
                            </Badge>
                          </div>

                          <div className="ml-4 space-y-2">
                            {category.details.map(
                              (detail: string, detailIndex: number) => (
                                <div
                                  key={detailIndex}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 flex-shrink-0" />
                                  <Text as="p" className="text-sm">
                                    {detail}
                                  </Text>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}

                    <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <DynamicIcons.TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <Text
                          as="h4"
                          className="font-semibold text-blue-800 dark:text-blue-300 text-sm"
                        >
                          Scoring Distribution
                        </Text>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Text as="p" className="text-xs">
                            Project Content
                          </Text>
                          <Text as="p" className="text-xs font-medium">
                            60%
                          </Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text as="p" className="text-xs">
                            Project Presentation
                          </Text>
                          <Text as="p" className="text-xs font-medium">
                            40%
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Special Awards Section */}
      <div className="my-20 px-4 max-w-7xl mx-auto">
        <BlurFade inView delay={0.6}>
          <div className="text-center mb-12">
            <Text as="h2" className="text-3xl font-bold mb-4">
              Special Awards
            </Text>
            <Text
              as="p"
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              In addition to the main competition prizes, exceptional teams and
              individuals can earn recognition through these special award
              categories
            </Text>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SpecialAwardCategories.map((award, index) => {
            // Define color schemes based on award type
            let colorScheme;
            if (award.award === "Pitching Excellence Award") {
              colorScheme = {
                cardBg: "bg-gradient-to-br from-purple-50 to-purple-100",
                border: "border-purple-200",
                iconBg: "bg-gradient-to-br from-purple-400 to-purple-600",
                badgeBg: "bg-purple-100 dark:bg-purple-900/50",
                badgeText: "text-purple-700 dark:text-purple-300",
                titleText: "text-purple-700 dark:text-purple-400",
                contentText: "text-purple-800/80 dark:text-purple-800/80",
                iconText: "text-purple-600 dark:text-purple-400",
              };
            } else if (award.award === "Critical Thinking & Defence Award") {
              colorScheme = {
                cardBg: "bg-gradient-to-br from-green-50 to-emerald-100",
                border: "border-green-200",
                iconBg: "bg-gradient-to-br from-green-400 to-emerald-600",
                badgeBg: "bg-green-100 dark:bg-green-900/50",
                badgeText: "text-green-700 dark:text-green-300",
                titleText: "text-green-700 dark:text-green-400",
                contentText: "text-green-800/80 dark:text-green-800/80",
                iconText: "text-green-600 dark:text-green-400",
              };
            } else {
              // Innovation Excellence Award
              colorScheme = {
                cardBg: "bg-gradient-to-br from-indigo-50 to-blue-100",
                border: "border-indigo-200",
                iconBg: "bg-gradient-to-br from-indigo-400 to-blue-600",
                badgeBg: "bg-blue-100 dark:bg-blue-900/50",
                badgeText: "text-blue-700 dark:text-blue-300",
                titleText: "text-blue-700 dark:text-blue-400",
                contentText: "text-blue-800/80 dark:text-blue-800/80",
                iconText: "text-blue-600 dark:text-blue-400",
              };
            }

            return (
              <BlurFade key={index} inView delay={0.7 + index * 0.1}>
                <Card
                  className={`h-full transition-all duration-200 hover:shadow-lg ${colorScheme.cardBg} ${colorScheme.border} dark:from-opacity-20 dark:to-opacity-10`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${colorScheme.iconBg}`}>
                        <DynamicIcons.Award className="h-6 w-6 text-white" />
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${colorScheme.badgeBg} ${colorScheme.badgeText}`}
                      >
                        {award.type}
                      </Badge>
                    </div>
                    <CardTitle className={`text-xl ${colorScheme.titleText}`}>
                      {award.award}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text
                      as="p"
                      className={`text-sm leading-relaxed ${colorScheme.contentText}`}
                    >
                      {award.details}
                    </Text>
                  </CardContent>
                </Card>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade inView delay={1.0}>
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-purple-50 via-green-50 to-blue-50 dark:from-purple-900/30 dark:via-green-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-3">
              <DynamicIcons.Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <Text
                as="h4"
                className="font-semibold text-purple-800 dark:text-purple-300"
              >
                Award Recognition
              </Text>
            </div>
            <Text
              as="p"
              className="text-sm text-purple-800/80 dark:text-purple-200/80"
            >
              Special award winners will receive cash prize of RM200 and
              recognition during the final presentation ceremony. These awards
              are separate from the main competition prizes and celebrate
              specific excellence areas in the competition.
            </Text>
          </div>
        </BlurFade>
      </div>

      {/* Download Section - Enhanced */}
      <div>
        <div className="max-w-7xl mx-auto px-4">
          <BlurFade inView delay={0.6} className="">
            <div className="text-center mb-8">
              <Text as="h2" className="text-3xl font-bold mb-4">
                Download Complete Guidelines
              </Text>
              <Text
                as="p"
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Get the comprehensive PDF version of all rules, regulations, and
                guidelines for your reference.
              </Text>
            </div>
          </BlurFade>

          <BlurFade
            inView
            delay={0.65}
            className="max-w-2xl  mx-auto backdrop-blur-3xl bg-gradient-to-br p-6 shadow-md rounded-lg h-full from-primary/10 via-primary/5 to-background border-primary/20 overflow-hidden relative "
          >
            <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <DynamicIcons.Download className="h-8 w-8 text-primary" />
            </div>
            <Text as="h3" className="text-center font-semibold mb-2">
              Official Rules PDF
            </Text>
            <Text
              as="p"
              className="text-center text-sm text-muted-foreground mb-4"
            >
              Complete documentation including all 30 rules and regulations
            </Text>
            <Button size="lg" className="w-full" asChild>
              <Link href="/assets/documents/MDIT_2025_RULES_AND_REGULATIONS.pdf">
                <DynamicIcons.Download className="h-4 w-4 mr-2" />
                Download PDF
              </Link>
            </Button>
          </BlurFade>
        </div>
      </div>
      {/* Timeline Reminder - Enhanced */}
      <div className="px-4 max-w-7xl mx-auto">
        <BlurFade
          inView
          delay={0.5}
          className="shadow-lg backdrop-blur-3xl rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 overflow-hidden relative  my-20 px-4 max-w-7xl mx-auto"
        >
          <Card className="bg-transparent border-0 shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12" />
            <CardHeader className="text-center relative">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DynamicIcons.Calendar className="h-6 w-6 text-primary" />
                <CardTitle className=" text-2xl">
                  Important Dates to Remember
                </CardTitle>
              </div>
              <Text as="p" className="text-muted-foreground">
                Mark your calendar with these critical deadlines
              </Text>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center group">
                  <div className="bg-green-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <DynamicIcons.FileText className="h-8 w-8 text-green-200" />
                  </div>
                  <Badge className="mb-2">Phase 1</Badge>
                  <Text as="h4" className="font-semibold text-primary mb-1">
                    Registration Deadline
                  </Text>
                  <Text as="p" className="text-lg font-medium">
                    30 August, 2025
                  </Text>
                  <Text as="p" className="text-sm ]mt-1">
                    Last day to register your team
                  </Text>
                </div>
                <div className="text-center group">
                  <div className="bg-primary/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <DynamicIcons.Shield className="h-8 w-8 text-primary" />
                  </div>
                  <Badge className="mb-2">Phase 2</Badge>
                  <Text as="h4" className="font-semibold text-primary mb-1">
                    Competition Period
                  </Text>
                  <Text as="p" className="text-lg font-medium">
                    6 September - 21 September, 2025
                  </Text>
                  <Text as="p" className="text-sm ]mt-1">
                    Development and submission phase
                  </Text>
                </div>
                <div className="text-center group">
                  <div className="bg-cyan-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <DynamicIcons.Award className="h-8 w-8 text-cyan-200" />
                  </div>
                  <Badge className="mb-2">Phase 3</Badge>
                  <Text as="h4" className="font-semibold text-primary mb-1">
                    Final Presentation
                  </Text>
                  <Text as="p" className="text-lg font-medium">
                    17 October, 2025
                  </Text>
                  <Text as="p" className="text-sm ]mt-1">
                    Live pitching by the top 10 finalists
                  </Text>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-primary/20 text-center">
                <Text as="p" className="text-sm text-muted-foreground mb-4">
                  All dates are in Malaysia Standard Time (GMT+8)
                </Text>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
      {/* Contact Section - Enhanced */}
      <div className="pb-20 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <BlurFade inView delay={0.75}>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <DynamicIcons.Users className="h-10 w-10 text-primary" />
                </div>
                <Text as="h2" className="text-2xl font-bold mb-4">
                  Still have questions?
                </Text>
                <Text
                  as="p"
                  className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
                >
                  Our team has prepared comprehensive documentation to answer
                  most questions. However, if you need clarification on any rule
                  or requirement, please don&apos;t hesitate to{" "}
                  <Link
                    href="/contact"
                    className="underline text-primary font-medium hover:text-primary/80"
                  >
                    contact us
                  </Link>
                  .
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="shadow-lg">
                    <Link href="/contact">
                      <DynamicIcons.Users className="h-4 w-4 mr-2" />
                      Contact Support
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/frequently-asked-questions">
                      <DynamicIcons.CheckCircle className="h-4 w-4 mr-2" />
                      View FAQ
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <Text as="p" className="text-sm text-muted-foreground">
                    Response time: Usually within 24 hours on business days
                  </Text>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </>
  );
};

export default RulesRegulationPage;
