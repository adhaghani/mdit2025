"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { useCountdown } from "@/contexts/countdown-context";
import { Button } from "@/components/ui/button";
import { BlurFade } from "./magicui/blur-fade";
import { FOOTER_QUICK_LINK, GOOGLE_FORM_LINK, EVENT_DATA } from "./constant";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./animate-ui/radix/dialog";
import {
  Mail,
  Calendar,
  Users,
  Trophy,
  ExternalLink,
  ArrowRight,
  Heart,
  UniversityIcon,
} from "lucide-react";
import { QRCode } from "./ui/shadcn-io/qr-code";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const { hasStarted, isExpired } = useCountdown();

  const socialLinks = [
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@mdit_2025",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43V7.93a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.36z" />
        </svg>
      ),
      color: "hover:text-pink-500",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mdit2025/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "hover:text-purple-500",
    },
  ];

  const keyStats = [
    {
      icon: Users,
      label: "Participating Teams",
      value: EVENT_DATA.Expected_Team,
    },
    {
      icon: UniversityIcon,
      label: "Participating Universities",
      value: EVENT_DATA.Universities,
    },
    { icon: Trophy, label: "Prize Pool", value: EVENT_DATA.Total_Prize_Pool },
    { icon: Calendar, label: "Duration", value: EVENT_DATA.Competition_Days },
  ];

  return (
    <footer className="relative mt-20 pt-10 overflow-visible">
      {/* Background Pattern */}

      <div className="max-w-7xl my-10 mx-auto px-4 xl:px-0">
        {/* Key Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {keyStats.map((stat) => (
              <BlurFade
                inView
                delay={0.1}
                key={stat.label}
                className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center"
              >
                <div>
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <Text as="h3" className="text-2xl font-bold mb-1">
                    {stat.value}
                  </Text>
                  <Text as="p" className="text-muted-foreground text-sm">
                    {stat.label}
                  </Text>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-6">
              <BlurFade inView delay={0.1}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                    <div className="relative size-12 flex items-center justify-center bg-white dark:bg-black/50 rounded-full border border-border/50">
                      <Image
                        src="/mdit.svg"
                        alt="MDIT 2025 Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Text
                      as="h2"
                      className="text-xl font-bold font-mono bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    >
                      MDIT x DOSM Datathon
                    </Text>
                    <Text
                      as="p"
                      className="text-sm text-muted-foreground font-medium"
                    >
                      2025 National Competition
                    </Text>
                  </div>
                </div>
              </BlurFade>

              <BlurFade inView delay={0.15}>
                <Text as="p" className="text-muted-foreground leading-relaxed">
                  MDIT x DOSM Datathon 2025 is Malaysia&apos;s premier national
                  inter-varsity program fostering innovation and collaboration
                  among students in data science and analytics. Join us in
                  shaping the future of data-driven solutions.
                </Text>
              </BlurFade>

              {/* Contact Info */}
              <BlurFade inView delay={0.2}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>mditxdd2025@gmail.com</span>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 space-y-6">
              <BlurFade inView delay={0.25}>
                <Text as="h3" className="text-lg font-semibold text-foreground">
                  Quick Links
                </Text>
              </BlurFade>
              <ul className="space-y-3">
                {FOOTER_QUICK_LINK.map((link, index) => (
                  <li key={link.href}>
                    <BlurFade inView delay={0.3 + index * 0.05}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-muted-foreground hover:text-primary transition-colors text-sm py-1"
                      >
                        <span>{link.title}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </BlurFade>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <BlurFade inView delay={0.5}>
                <div className="pt-4">
                  <Text
                    as="h4"
                    className="text-sm font-semibold text-foreground mb-3"
                  >
                    Follow Us
                  </Text>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.name}
                        href={social.href}
                        className={`group flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 text-muted-foreground transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Registration CTA */}
            <div className="lg:col-span-4 space-y-6">
              <BlurFade inView delay={0.6}>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Text as="h3" className="text-lg font-bold mb-2">
                        {isExpired
                          ? "Registration Closed"
                          : hasStarted
                          ? "Registration Open!"
                          : "Registration Opening Soon"}
                      </Text>
                      <Text
                        as="p"
                        className="text-sm text-muted-foreground mb-4"
                      >
                        {isExpired
                          ? "Stay tuned for future datathon events and competitions!"
                          : hasStarted
                          ? "Secure your spot in Malaysia's biggest datathon competition!"
                          : "Get ready to showcase your data science skills with the best teams nationwide!"}
                      </Text>
                    </div>
                    {!hasStarted ? (
                      <Button
                        size="lg"
                        className="flex items-center gap-2 w-full"
                        disabled={true}
                      >
                        {isExpired
                          ? "Registration Closed"
                          : "Registration Opening Soon"}
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="lg"
                            className="flex items-center gap-2 w-full"
                            disabled={isExpired}
                          >
                            Register your Team
                            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="!h-fit gap-2">
                          <Text as="p" className="text-center">
                            Scan the QR code
                          </Text>
                          <QRCode
                            className="max-w-[200px] mx-auto"
                            data={GOOGLE_FORM_LINK}
                            robustness="Q"
                          />
                          <Text as="p" className="text-center my-4">
                            OR
                          </Text>
                          <div className="flex justify-center">
                            <Button
                              size="lg"
                              className="w-full justify-center gap-2 font-semibold"
                              asChild
                            >
                              <Link href={GOOGLE_FORM_LINK} target="_blank">
                                Register Now
                              </Link>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <BlurFade inView delay={0.7}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <Text
                  as="p"
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  © {currentYear} MDIT x DOSM Datathon. Made with
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                  for data enthusiasts.
                </Text>
                <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    this is a Live Event
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 -z-10 -right-0 w-screen lg:h-[600px] lg:w-auto rotate-90 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/13.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-left !overflow-visible"
        />
      </div>
      <div className="absolute top-0 -z-10 left-0 w-screen lg:h-[800px] lg:w-auto rotate-90 overflow-hidden pointer-events-none">
        <Image
          src={"/assets/bg-gradients/10.svg"}
          alt="Background Gradient"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-left !overflow-visible"
        />
      </div>
    </footer>
  );
};

export default Footer;
