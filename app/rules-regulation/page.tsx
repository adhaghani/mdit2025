import React from "react";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  FileText,
  Shield,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Download,
  ExternalLink,
} from "lucide-react";

const RulesRegulationPage = () => {
  const sections = [
    {
      title: "Eligibility & Team Formation",
      icon: Users,
      rules: [
        "Open to all university students currently enrolled in Malaysian institutions",
        "Teams must consist of 3-4 members maximum",
        "At least 3 members required to participate",
        "All team members must be from the same university",
        "Each participant can only be part of one team",
        "Mixed-year teams are allowed (undergraduate and postgraduate)",
        "International students studying in Malaysia are eligible",
      ],
    },
    {
      title: "Registration Requirements",
      icon: FileText,
      rules: [
        "Registration fee: RM150.00 per team (non-refundable)",
        "Complete online registration form must be submitted",
        "All team members student IDs must be provided",
        "Valid university enrollment verification required",
        "Team leader must provide active contact information",
        "Registration deadline: August 30, 2025, 11:59 PM",
        "Limited slots available - first come, first served",
      ],
    },
    {
      title: "Competition Guidelines",
      icon: Trophy,
      rules: [
        "Competition period: September 6 - October 18, 2025",
        "Dataset will be provided at the start of competition",
        "Teams must use only the provided dataset",
        "External data sources are strictly prohibited",
        "All work must be original and completed during competition period",
        "Plagiarism or cheating will result in immediate disqualification",
        "Teams may use any programming language or analytical tools",
      ],
    },
    {
      title: "Submission Requirements",
      icon: Calendar,
      rules: [
        "Final submissions due: October 18, 2025, 11:59 PM",
        "Submissions must include complete code and documentation",
        "Report must be in PDF format, maximum 20 pages",
        "All code must be properly commented and reproducible",
        "Presentation slides required for finalists",
        "Late submissions will not be accepted under any circumstances",
        "File size limit: 100MB for complete submission package",
      ],
    },
    {
      title: "Code of Conduct",
      icon: Shield,
      rules: [
        "Respectful behavior towards all participants and organizers",
        "No sharing of solutions or approaches with other teams",
        "Professional communication in all interactions",
        "Report any violations to competition officials immediately",
        "Adhere to academic integrity standards",
        "No discrimination based on race, gender, religion, or nationality",
        "Maintain confidentiality of competition materials",
      ],
    },
    {
      title: "Technical Requirements",
      icon: CheckCircle,
      rules: [
        "Stable internet connection required throughout competition",
        "Backup systems recommended for critical work",
        "Teams responsible for their own hardware and software",
        "Virtual environments encouraged for reproducibility",
        "Version control (Git) strongly recommended",
        "Cloud platforms allowed but not required",
        "Technical support available during business hours only",
      ],
    },
  ];

  const importantNotes = [
    {
      type: "warning",
      title: "Disqualification Criteria",
      content: [
        "Use of external datasets beyond provided materials",
        "Plagiarism or copying from other sources",
        "Violation of code of conduct",
        "Incomplete team registration or documentation",
        "Late submission beyond deadline",
        "Fraudulent information in registration",
      ],
    },
    {
      type: "info",
      title: "Judging Criteria",
      content: [
        "Technical Innovation (25%)",
        "Data Analysis Quality (25%)",
        "Practical Application (20%)",
        "Presentation & Communication (15%)",
        "Code Quality & Documentation (15%)",
      ],
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="text-center space-y-4 py-20 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            Rules & Regulations
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-lg">
            Complete guidelines and requirements for participating in MDIT 2025
            Datathon
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" styleVariant="muted" className="max-w-3xl mx-auto">
            Please read all rules carefully before registering. By participating
            in MDIT 2025, you agree to abide by all the rules and regulations
            outlined below. Violation of any rule may result in
            disqualification.
          </Text>
        </BlurFade>
      </div>

      {/* Rules Sections */}
      <div className="space-y-8 my-20">
        {sections.map((section, index) => (
          <BlurFade key={index} inView delay={0.1 + index * 0.05}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <Text as="p" className="text-sm">
                        {rule}
                      </Text>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Important Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-20">
        {importantNotes.map((note, index) => (
          <BlurFade key={index} inView delay={0.3 + index * 0.1}>
            <Card
              className={`${
                note.type === "warning"
                  ? "border-red-200 bg-red-50/50"
                  : "border-blue-200 bg-blue-50/50"
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${
                    note.type === "warning" ? "text-red-700" : "text-blue-700"
                  }`}
                >
                  {note.type === "warning" ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {note.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          note.type === "warning" ? "bg-red-400" : "bg-blue-400"
                        }`}
                      />
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

      {/* Timeline Reminder */}
      <BlurFade inView delay={0.5}>
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              Important Dates to Remember
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Text as="h4" className="font-semibold text-primary">
                  Registration Deadline
                </Text>
                <Text as="p">August 30, 2025</Text>
              </div>
              <div>
                <Text as="h4" className="font-semibold text-primary">
                  Competition Period
                </Text>
                <Text as="p">Sept 6 - Oct 18, 2025</Text>
              </div>
              <div>
                <Text as="h4" className="font-semibold text-primary">
                  Final Presentation
                </Text>
                <Text as="p">October 17, 2025</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Download Section */}
      <div className="text-center py-20">
        <BlurFade inView delay={0.6}>
          <Text as="h2" className="mb-4">
            Download Complete Guidelines
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.65}>
          <Text as="p" styleVariant="muted" className="mb-8 max-w-2xl mx-auto">
            Get the comprehensive PDF version of all rules, regulations, and
            guidelines for your reference.
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download Rules PDF
            </Button>
            <Button size="lg" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Online Guidelines
            </Button>
          </div>
        </BlurFade>
      </div>

      {/* Contact Section */}
      <div className="pb-20">
        <BlurFade inView delay={0.75}>
          <Text as="h2" className="text-center mb-4">
            Still have questions?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.8}>
          <Text as="p" className="text-center max-w-2xl mx-auto mb-8">
            Our team has prepared comprehensive documentation to answer most
            questions. However, if you need clarification on any rule or
            requirement, please don&apos;t hesitate to{" "}
            <Link href="/contact" className="underline text-primary">
              contact us
            </Link>
            .
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.85}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Support</Link>
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

export default RulesRegulationPage;
