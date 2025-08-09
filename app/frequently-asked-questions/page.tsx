"use client";

import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/radix/accordion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FAQ } from "@/components/constant";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MditAuroraSubtle } from "@/components/optimized-react-bits";
import { useDevice } from "@/contexts/device-context";

const DynamicIcons = {
  Search: dynamic(() => import("lucide-react").then((mod) => mod.Search)),
  Download: dynamic(() => import("lucide-react").then((mod) => mod.Download)),
  MessageCircle: dynamic(() =>
    import("lucide-react").then((mod) => mod.MessageCircle)
  ),
  Phone: dynamic(() => import("lucide-react").then((mod) => mod.Phone)),
  Mail: dynamic(() => import("lucide-react").then((mod) => mod.Mail)),
  Clock: dynamic(() => import("lucide-react").then((mod) => mod.Clock)),
  HelpCircle: dynamic(() =>
    import("lucide-react").then((mod) => mod.HelpCircle)
  ),
  FileText: dynamic(() => import("lucide-react").then((mod) => mod.FileText)),
  Users: dynamic(() => import("lucide-react").then((mod) => mod.Users)),
  Trophy: dynamic(() => import("lucide-react").then((mod) => mod.Trophy)),
  CheckCircle: dynamic(() =>
    import("lucide-react").then((mod) => mod.CheckCircle)
  ),
  Info: dynamic(() => import("lucide-react").then((mod) => mod.Info)),
  List: dynamic(() => import("lucide-react").then((mod) => mod.List)),
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

const FrequentlyAskedQuestionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter FAQs based on search term
  const filteredFAQs = FAQ.filter((faq) => {
    const searchLower = searchTerm.toLowerCase();

    // Search in question and answer
    const matchesQuestionOrAnswer =
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower);

    // Search in list items if they exist
    const matchesList = faq.list
      ? faq.list.some((item) => item.toLowerCase().includes(searchLower))
      : false;

    // Search in subtext if it exists
    const matchesSubtext = faq.subtext
      ? faq.subtext.toLowerCase().includes(searchLower)
      : false;

    return matchesQuestionOrAnswer || matchesList || matchesSubtext;
  });

  // FAQ categories for easy navigation
  const faqCategories = [
    {
      title: "General Information",
      icon: DynamicIcons.HelpCircle,
      keywords: ["what is"],
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      title: "Registration",
      icon: DynamicIcons.Users,
      keywords: ["registration"],
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      title: "Competition Details",
      icon: DynamicIcons.Trophy,
      keywords: ["competition"],
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
  ];

  const handleCategoryFilter = (keywords: string[]) => {
    const categoryTerms = keywords.join(" ");
    setSearchTerm(categoryTerms);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Get device information from context
  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  const isReleased = true;

  if (!isReleased) {
    return (
      <div className="text-center py-64">
        <Text as="h1" className="text-2xl font-bold mb-4">
          Frequently Asked Question Page Coming Soon
        </Text>
        <Text as="p" className="text-lg text-muted-foreground">
          The FAQ section for MDIT 2025 will be released soon. Please check back
          later for updates.
        </Text>
      </div>
    );
  }

  return (
    <>
      {!deviceLoading && shouldReducePerformance ? (
        <>
          <div className="absolute left-0 -top-1/2 lg:-left-128 w-screen lg:w-auto lg:h-[1200px] h-auto rotate-180 overflow-hidden -z-10 pointer-events-none">
            <Image
              src={"/assets/bg-gradients/13.svg"}
              alt="Background Gradient"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-left !overflow-visible"
            />
          </div>
          <div className="absolute right-1/2 lg:-right-128 w-[200px] lg:w-auto  h-auto lg:h-[800px] rotate-50 overflow-hidden -z-10 pointer-events-none">
            <Image
              src={"/assets/bg-gradients/12.svg"}
              alt="Background Gradient"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-left !overflow-visible"
            />
          </div>
        </>
      ) : isWebGLSupported ? (
        <div className="absolute w-full h-[300px] hidden lg:block sm:h-[500px]">
          <MditAuroraSubtle />
        </div>
      ) : null}

      {/* Header Section */}
      <div className="text-center space-y-4 px-4 py-32 lg:py-48 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            Frequently Asked Questions
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-xl">
            Find answers to common questions about MDIT 2025 Datathon
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="max-w-2xl mx-auto">
            Could not find what you are looking for? Use the search function
            below or browse by category. If you still need help, don not
            hesitate to contact our support team.
          </Text>
        </BlurFade>
      </div>

      <div className="absolute left-0 lg:-left-32 w-screen lg:w-auto h-[800px] overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/13.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-right !overflow-visible"
        />
      </div>
      {/* Search Bar */}
      <BlurFade inView delay={0.25}>
        <div className="max-w-2xl mx-auto mb-12 ">
          <div className="relative">
            <DynamicIcons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Clear
              </Button>
            )}
          </div>
          {searchTerm && (
            <Text as="p" styleVariant="muted" className="mt-2 text-center">
              Found {filteredFAQs.length} result(s) for: {searchTerm}
            </Text>
          )}
        </div>
      </BlurFade>

      {/* Category Filter */}
      <div className="grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-7xl mx-auto">
        {faqCategories.map((category, index) => (
          <BlurFade key={index} inView delay={0.3 + index * 0.05}>
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${category.color}`}
              onClick={() => handleCategoryFilter(category.keywords)}
            >
              <CardContent className="p-4 text-center">
                <category.icon className="h-8 w-8 mx-auto mb-2" />
                <Text as="h4" className="font-semibold text-sm">
                  {category.title}
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="pb-20 px-4">
        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <BlurFade key={index} inView delay={0.15}>
                <AccordionItem
                  value={`item-${index}`}
                  className="max-w-4xl mx-auto"
                >
                  <AccordionTrigger className="text-left">
                    <Text as="h3" className="text-lg font-semibold pr-4">
                      {faq.question}
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <div className="space-y-4">
                      <Text as="p" className="leading-relaxed">
                        {faq.answer}
                      </Text>

                      {faq.list && (
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                          <div className="flex items-center gap-2 mb-3">
                            <DynamicIcons.List className="h-4 w-4 text-primary" />
                            <Text
                              as="h4"
                              className="font-semibold text-primary text-sm"
                            >
                              Details:
                            </Text>
                          </div>
                          <div className="space-y-3">
                            {faq.list.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-start gap-3"
                              >
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 mt-0.5 flex-shrink-0">
                                  <DynamicIcons.CheckCircle className="h-3 w-3 text-primary" />
                                </div>
                                <Text
                                  as="p"
                                  className="text-sm leading-relaxed"
                                >
                                  {item}
                                </Text>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {faq.subtext && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start gap-3">
                            <DynamicIcons.Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <Text
                                as="h4"
                                className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1"
                              >
                                Important Note:
                              </Text>
                              <Text
                                as="p"
                                className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed"
                              >
                                {faq.subtext}
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>
            ))}
          </Accordion>
        ) : (
          <BlurFade inView delay={0.4}>
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="p-8">
                <DynamicIcons.Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <Text as="h3" className="text-lg font-semibold mb-2">
                  No FAQs found
                </Text>
                <Text as="p" styleVariant="muted" className="mb-4">
                  We could not find any FAQs matching your search term:
                  {searchTerm}.
                </Text>
                <Button onClick={clearSearch} variant="outline">
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          </BlurFade>
        )}
      </div>

      <div className="absolute right-0 lg:-right-32 h-[800px] rotate-0 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/9.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 px-4 md:grid-cols-3 gap-6 my-20 max-w-7xl mx-auto">
        <BlurFade inView delay={0.5}>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <DynamicIcons.Download className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Download Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Text as="p" styleVariant="muted" className="mb-4">
                Get comprehensive guidelines and documentation
              </Text>
              <Button className="w-full" asChild>
                <Link href="/assets/documents/MDIT_2025_FAQ.pdf">
                  <DynamicIcons.Download className="h-4 w-4 mr-2" />
                  Download FAQ PDF
                </Link>
              </Button>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade inView delay={0.55}>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <DynamicIcons.MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <Text as="p" styleVariant="muted" className="mb-4">
                Still have questions? Our team is here to help
              </Text>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/contact">
                  <DynamicIcons.MessageCircle className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade inView delay={0.6}>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <DynamicIcons.FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rules & Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <Text as="p" styleVariant="muted" className="mb-4">
                Review complete competition rules and regulations
              </Text>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/rules-regulation">
                  <DynamicIcons.FileText className="h-4 w-4 mr-2" />
                  View Rules
                </Link>
              </Button>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Emergency Contact Info */}
      <BlurFade
        inView
        delay={0.65}
        className="bg-primary/5 border-primary/20 max-w-3xl mx-auto backdrop-blur-xl"
      >
        <Card className="bg-transparent border border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-primary flex items-center justify-center gap-2">
              <DynamicIcons.Clock className="h-5 w-5" />
              Need Immediate Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Text as="p">
              For urgent matters during the competition period, contact our
              emergency support:
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center gap-2">
                <DynamicIcons.Phone className="h-4 w-4 text-primary" />
                <Text as="p" className="font-semibold">
                  +60 18-472 727
                </Text>
              </div>
              <div className="flex items-center justify-center gap-2">
                <DynamicIcons.Mail className="h-4 w-4 text-primary" />
                <Text as="p" className="font-semibold">
                  mditxdd2025@gmail.com
                </Text>
              </div>
              <div className="flex items-center justify-center gap-2">
                <DynamicIcons.Clock className="h-4 w-4 text-primary" />
                <Text as="p" className="font-semibold">
                  24/7 During Competition
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Call to Action */}
      <div className="text-center px-4 py-20">
        <BlurFade inView delay={0.7}>
          <Text as="h2" className="mb-4">
            Ready to Join MDIT 2025?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.75}>
          <Text as="p" styleVariant="muted" className="mb-6 max-w-2xl mx-auto">
            Now that you have all the information you need, it is time to
            register your team and start your data innovation journey!
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">Register Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/event-details">Learn More</Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </>
  );
};

export default FrequentlyAskedQuestionsPage;
