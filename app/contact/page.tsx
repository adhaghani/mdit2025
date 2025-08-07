"use client";
import React, { useMemo, useCallback } from "react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MailIcon, MessageCircleIcon } from "lucide-react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  MditAurora,
  MditTextPressure,
} from "@/components/optimized-react-bits";
// Type definitions
interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  description: string;
  link: string;
}

interface SocialPlatform {
  name: string;
  handle: string;
  link: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
  cardClass: string;
  iconBg: string;
  titleClass: string;
  linkClass: string;
}

// Memoized ContactInfo component
const ContactInfoCard = React.memo(
  ({ info, index }: { info: ContactInfo; index: number }) => (
    <BlurFade key={index} inView delay={0.1 + index * 0.05}>
      <Card className="h-full transition-all duration-300">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <info.icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">{info.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          {info.link ? (
            <Link href={info.link} className="block">
              <Text
                as="p"
                className="font-semibold text-primary hover:underline"
              >
                {info.content}
              </Text>
            </Link>
          ) : (
            <Text as="p" className="font-semibold">
              {info.content}
            </Text>
          )}
          <Text as="p" styleVariant="muted" className="text-sm">
            {info.description}
          </Text>
        </CardContent>
      </Card>
    </BlurFade>
  )
);

ContactInfoCard.displayName = "ContactInfoCard";

// Memoized Social Media Card component
const SocialMediaCard = React.memo(
  ({ platform, delay }: { platform: SocialPlatform; delay: number }) => (
    <BlurFade inView delay={delay}>
      <Card
        className={`h-full transition-all duration-300 ${platform.cardClass}`}
      >
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-4 p-3 ${platform.iconBg} rounded-full w-fit`}
          >
            {typeof platform.icon === "string" ? (
              <Image
                src={platform.icon}
                alt={`${platform.name} icon`}
                width={24}
                height={24}
                className="size-10"
              />
            ) : (
              <platform.icon className="size-10 text-white" />
            )}
          </div>
          <CardTitle className={`text-lg ${platform.titleClass}`}>
            {platform.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <Link
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Text
              as="p"
              className={`font-semibold ${platform.linkClass} hover:underline`}
            >
              {platform.handle}
            </Text>
          </Link>
          <Text as="p" styleVariant="muted" className="text-sm">
            {platform.description}
          </Text>
        </CardContent>
      </Card>
    </BlurFade>
  )
);

SocialMediaCard.displayName = "SocialMediaCard";

const ContactPage = () => {
  // Memoize static data to prevent unnecessary re-renders
  const contactInfo = useMemo(
    () =>
      Object.freeze([
        {
          icon: MailIcon,
          title: "Email Us",
          content: "mditxdd2025@gmail.com",
          description: "Send us an email and we will respond within 24 hours",
          link: "mailto:mditxdd2025@gmail.com",
        },
      ] as const),
    []
  );

  const socialPlatforms = useMemo(
    () =>
      Object.freeze([
        {
          name: "Instagram",
          handle: "@mdit2025",
          link: "https://instagram.com/mdit2025",
          description: "Photos, stories, and highlights from the competition",
          icon: Instagram,
          cardClass:
            "bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800",
          iconBg: "bg-gradient-to-r from-pink-500 to-purple-600",
          titleClass: "text-pink-700 dark:text-pink-300",
          linkClass: "text-pink-600 dark:text-pink-400",
        },
        {
          name: "TikTok",
          handle: "@mdit2025",
          link: "https://tiktok.com/@mdit2025",
          description: "Quick tips, announcements, and fun competition moments",
          icon: "/tiktok.svg",
          cardClass:
            "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-800",
          iconBg: "bg-black",
          titleClass: "text-gray-700 dark:text-gray-300",
          linkClass: "text-gray-600 dark:text-gray-400",
        },
      ] as const),
    []
  );

  const whatsappContacts = useMemo(
    () =>
      Object.freeze([
        {
          name: "Muhammad Fiqri",
          role: "Support",
          number: "+60184727274",
          description:
            "General inquiries, registration issues, and competition guidelines",
        },
        {
          name: "Amira Adriana",
          role: "Support",
          number: "+60192766323",
          description:
            "General inquiries, registration issues, and competition guidelines",
        },
      ] as const),
    []
  );

  const frequentlyAskedTopics = useMemo(
    () =>
      Object.freeze([
        {
          title: "Registration Issues",
          description:
            "Having trouble with team registration, payment, or account setup? We are here to help.",
        },
        {
          title: "Technical Requirements",
          description:
            "Questions about software, datasets, submission formats, or technical specifications.",
        },
        {
          title: "Competition Rules",
          description:
            "Need clarification on eligibility, team composition, or competition guidelines.",
        },
        {
          title: "Event Logistics",
          description:
            "Information about venues, schedules, accommodation, or travel arrangements.",
        },
      ] as const),
    []
  );

  const createWhatsAppLink = useCallback(
    (number: string, name: string, role: string) => {
      const message = encodeURIComponent(
        `Hello ${name}, I would like to inquire about MDIT 2025. I understand you handle ${role.toLowerCase()} matters.`
      );
      return `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${message}`;
    },
    []
  );

  return (
    <>
      <div className="absolute w-full h-[500px] hidden lg:block sm:h-[3/4]">
        <MditAurora />
      </div>
      <div className="absolute z-10 opacity-40 hidden lg:block w-full max-h-[500px] h-fit">
        <MditTextPressure text="Contact" />
      </div>
      {/* Header Section */}
      <div className="text-center px-4 space-y-4 py-32 pt-48 max-w-7xl mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            Contact Us
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-lg">
            Have questions about MDIT 2025? We are here to help! Reach out to us
            through any of the channels below.
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" styleVariant="muted" className="max-w-2xl mx-auto">
            Whether you need clarification about registration, competition
            rules, or technical requirements, our team is ready to assist you on
            your journey to data innovation excellence.
          </Text>
        </BlurFade>
      </div>

      {/* Social Media Section */}
      <div className="my-20 px-4 max-w-7xl mx-auto">
        <BlurFade inView delay={0.25}>
          <Text as="h2" className="text-center mb-6">
            Follow Us on Social Media
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.3}>
          <Text
            as="p"
            styleVariant="muted"
            className="text-center mb-12 max-w-2xl mx-auto"
          >
            Stay updated with the latest news, behind-the-scenes content, and
            highlights from MDIT 2025. Connect with us on social media for
            real-time updates and community engagement.
          </Text>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <SocialMediaCard
              key={platform.name}
              platform={platform}
              delay={0.35 + index * 0.05}
            />
          ))}
        </div>
      </div>

      <div className="absolute lg:w-auto w-screen h-[300px] lg:h-[1200px]  -left-0 rotate-90 overflow-visible">
        <Image
          src={"/assets/bg-gradients/9.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="inset-0 w-full h-full object-cover !overflow-visible"
        />
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-7xl px-4 mx-auto grid grid-cols-1 gap-6 mt-20 mb-6">
        {contactInfo.map((info, index) => (
          <ContactInfoCard key={index} info={info} index={index} />
        ))}
      </div>

      {/* WhatsApp Contact Section */}
      <div className="max-w-7xl px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 mt-6">
        {/* WhatsApp Contact Cards */}
        <BlurFade inView delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircleIcon className="h-5 w-5 text-green-600" />
                Contact Our Team via WhatsApp
              </CardTitle>
              <Text as="p" styleVariant="muted">
                Get instant responses from our team members. Click the buttons
                below to start a WhatsApp conversation.
              </Text>
            </CardHeader>
            <CardContent className="space-y-4">
              {whatsappContacts.map((contact, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:border-green-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Text
                        as="h4"
                        className="font-semibold text-green-700 mb-1"
                      >
                        {contact.name}
                      </Text>
                      <Text as="p" className="text-sm text-green-600 mb-2">
                        {contact.role}
                      </Text>
                      <Text
                        as="p"
                        styleVariant="muted"
                        className="text-sm mb-3"
                      >
                        {contact.description}
                      </Text>{" "}
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        asChild
                      >
                        <Link
                          href={createWhatsAppLink(
                            contact.number,
                            contact.name,
                            contact.role
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircleIcon className="h-4 w-4 mr-2" />
                          Chat on WhatsApp
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <Text
                  as="p"
                  className="text-sm text-green-800 dark:text-green-200"
                >
                  💡 <strong>Tip:</strong> When contacting us, please mention
                  your inquiry type (registration, technical, rules, etc.) to
                  help us assist you better.
                </Text>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Additional Information */}
        <div className="space-y-6">
          <BlurFade inView delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {frequentlyAskedTopics.map((topic, index) => (
                  <div key={index}>
                    <Text as="h4" className="font-semibold mb-2">
                      {topic.title}
                    </Text>
                    <Text as="p" styleVariant="muted" className="text-sm">
                      {topic.description}
                    </Text>
                  </div>
                ))}
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.5}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/frequently-asked-questions" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    View FAQ Page
                  </Button>
                </Link>
                <Link href="/rules-regulation" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Competition Rules
                  </Button>
                </Link>
                <Link href="/event-details" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Event Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl px-4 mx-auto text-center py-20">
        <BlurFade inView delay={0.7}>
          <Text as="h2" className="mb-4">
            Ready to Join MDIT 2025?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.75}>
          <Text as="p" styleVariant="muted" className="mb-6 max-w-2xl mx-auto">
            Do not miss out on Malaysia premier data innovation competition.
            Register your team today!
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">Back to Home</Link>
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

export default ContactPage;
