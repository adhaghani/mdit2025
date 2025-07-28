"use client";
import React, { useMemo, useCallback, useState } from "react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  MailIcon,
  PhoneIcon,
  SendIcon,
  UserIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Instagram, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  icon: React.ComponentType<{ className?: string }>;
  cardClass: string;
  iconBg: string;
  titleClass: string;
  linkClass: string;
}

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
            <platform.icon className="h-6 w-6 text-white" />
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
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
        {
          icon: PhoneIcon,
          title: "For any Inquiry",
          content: "+60 3-5521 1234",
          description: "Available during office hours",
          link: "tel:+60355211234",
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
          icon: MessageSquare,
          cardClass:
            "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-800",
          iconBg: "bg-gradient-to-r from-gray-800 to-black",
          titleClass: "text-gray-700 dark:text-gray-300",
          linkClass: "text-gray-600 dark:text-gray-400",
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

  const onSubmit = useCallback(
    async (data: ContactFormValues) => {
      setSubmitStatus("idle");
      console.log("Form submitted:", data);
      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSubmitStatus("success");
        form.reset();
      } catch (error) {
        setSubmitStatus("error");
        console.error("Error submitting form:", error);
      } finally {
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    },
    [form]
  );

  return (
    <>
      {/* Header Section */}
      <div className="text-center  space-y-4 py-20 max-w-7xl mx-auto">
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
      <div className="my-20 max-w-7xl mx-auto">
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

      {/* Contact Information Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 mb-6">
        {contactInfo.map((info, index) => (
          <ContactInfoCard key={index} info={info} index={index} />
        ))}
      </div>

      {/* Contact Form and Additional Info */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 mt-6">
        {/* Contact Form */}
        <BlurFade inView delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircleIcon className="h-5 w-5 text-primary" />
                Send us a Message
              </CardTitle>
              <Text as="p" styleVariant="muted">
                Fill out the form below and we will get back to you as soon as
                possible.
              </Text>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Full Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                type="text"
                                placeholder="Enter your full name"
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="What is this regarding?"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Message <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="Please provide details about your inquiry..."
                            className="resize-vertical"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <Text as="p" className="text-green-800 text-sm">
                        ✅ Thank you! Your message has been sent successfully.
                        We will get back to you soon.
                      </Text>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <Text as="p" className="text-red-800 text-sm">
                        ❌ Sorry, there was an error sending your message.
                        Please try again.
                      </Text>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
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

          <BlurFade inView delay={0.6}>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text as="p" className="mb-2">
                  For urgent matters during the competition period:
                </Text>
                <Text as="p" className="font-semibold">
                  📱 WhatsApp: +60 12-345 6789
                </Text>
                <Text as="p" styleVariant="muted" className="text-sm mt-2">
                  Available 24/7 during competition dates (Sept 6 - Oct 18,
                  2025)
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto text-center py-20">
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
