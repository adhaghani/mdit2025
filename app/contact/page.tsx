"use client";
import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  UserIcon,
  MessageCircleIcon,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    {
      icon: MailIcon,
      title: "Email Us",
      content: "info@mdit2025.my",
      description: "Send us an email and we will respond within 24 hours",
      link: "mailto:info@mdit2025.my",
    },
    {
      icon: PhoneIcon,
      title: "For any Inquiry",
      content: "+60 3-5521 1234",
      description: "Available during office hours",
      link: "tel:+60355211234",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="text-center space-y-4 py-20 max-w-3xl mx-auto">
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

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 mb-6">
        {contactInfo.map((info, index) => (
          <BlurFade key={index} inView delay={0.1 + index * 0.05}>
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
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
        ))}
      </div>

      {/* Contact Form and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 mt-6">
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <Text as="p" className="text-green-800 text-sm">
                      ✅ Thank you! Your message has been sent successfully. We
                      will get back to you soon.
                    </Text>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <Text as="p" className="text-red-800 text-sm">
                      ❌ Sorry, there was an error sending your message. Please
                      try again.
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
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Registration Issues
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Having trouble with team registration, payment, or account
                    setup? We are here to help.
                  </Text>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Technical Requirements
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Questions about software, datasets, submission formats, or
                    technical specifications.
                  </Text>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Competition Rules
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Need clarification on eligibility, team composition, or
                    competition guidelines.
                  </Text>
                </div>
                <div>
                  <Text as="h4" className="font-semibold mb-2">
                    Event Logistics
                  </Text>
                  <Text as="p" styleVariant="muted" className="text-sm">
                    Information about venues, schedules, accommodation, or
                    travel arrangements.
                  </Text>
                </div>
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
      <div className="text-center py-20">
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
