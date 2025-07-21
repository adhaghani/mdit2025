"use client";

import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/radix/accordion";
import { FAQ } from "@/components/constant";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Download,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  FileText,
  Users,
  Trophy,
} from "lucide-react";

const FrequentlyAskedQuestionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter FAQs based on search term
  const filteredFAQs = FAQ.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FAQ categories for easy navigation
  const faqCategories = [
    {
      title: "General Information",
      icon: HelpCircle,
      keywords: ["what is"],
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      title: "Registration",
      icon: Users,
      keywords: ["registration"],
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      title: "Competition Details",
      icon: Trophy,
      keywords: ["competition"],
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
    {
      title: "Technical Requirements",
      icon: FileText,
      keywords: ["technical"],
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
  ];

  const handleCategoryFilter = (keywords: string[]) => {
    const categoryTerms = keywords.join(" ");
    setSearchTerm(categoryTerms);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const isReleased = false;

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
      {/* Header Section */}
      <div className="text-center space-y-4 py-20 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            Frequently Asked Questions
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-lg">
            Find answers to common questions about MDIT 2025 Datathon
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" styleVariant="muted" className="max-w-2xl mx-auto">
            Could not find what you are looking for? Use the search function
            below or browse by category. If you still need help, don not
            hesitate to contact our support team.
          </Text>
        </BlurFade>
      </div>

      {/* Search Bar */}
      <BlurFade inView delay={0.25}>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
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
      <div className="pb-20">
        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <BlurFade key={index} inView delay={0.15}>
                <AccordionItem
                  value={`item-${index}`}
                  className="max-w-4xl mx-auto"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <Text as="h3" className="text-lg font-semibold pr-4">
                      {faq.question}
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <Text
                      as="p"
                      className="text-muted-foreground leading-relaxed"
                    >
                      {faq.answer}
                    </Text>
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>
            ))}
          </Accordion>
        ) : (
          <BlurFade inView delay={0.4}>
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="p-8">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20">
        <BlurFade inView delay={0.5}>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Download Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Text as="p" styleVariant="muted" className="mb-4">
                Get comprehensive guidelines and documentation
              </Text>
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download FAQ PDF
              </Button>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade inView delay={0.55}>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <Text as="p" styleVariant="muted" className="mb-4">
                Still have questions? Our team is here to help
              </Text>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/contact">
                  <MessageCircle className="h-4 w-4 mr-2" />
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
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rules & Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <Text as="p" styleVariant="muted" className="mb-4">
                Review complete competition rules and regulations
              </Text>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/rules-regulation">
                  <FileText className="h-4 w-4 mr-2" />
                  View Rules
                </Link>
              </Button>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Emergency Contact Info */}
      <BlurFade inView delay={0.65}>
        <Card className="bg-primary/5 border-primary/20 max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-primary flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" />
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
                <Phone className="h-4 w-4 text-primary" />
                <Text as="p" className="font-semibold">
                  +60 12-345 6789
                </Text>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <Text as="p" className="font-semibold">
                  info@mdit2025.my
                </Text>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <Text as="p" className="font-semibold">
                  24/7 During Competition
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Call to Action */}
      <div className="text-center py-20">
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
