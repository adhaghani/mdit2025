"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { useStartCountdown } from "@/hooks/useStartCountdown";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const { hasStarted, timeLeft, isExpired } = useStartCountdown(
    "2025-08-30T00:00:00+08:00", // Count down to August 30
    "2025-08-10T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  return (
    <footer className="max-w-7xl pb-4 mt-auto mx-auto px-4">
      <div className=" mx-auto p-4 py-6 h-fit border bg-black/20 backdrop-blur-lg rounded-lg ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="size-10 flex items-center justify-center">
                <Image
                  src="/mdit.svg"
                  alt="MDIT 2025 Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <Text as="h4" className="font-bold text-lg">
                  MDIT 2025
                </Text>
              </div>
            </div>
            <p className="text-muted-foreground text-justify text-sm leading-relaxed">
              MDIT 2025 is a national intervarsity program held in collaboration
              with Faculty of Computer Science and Mathematics Universiti
              Teknologi MARA, Department of Statistics Malaysia and INSTAT Club.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 ">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/frequently-asked-questions"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Follow Us</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
                <span>Twitter</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>GitHub</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-2">
            <Text as="h3">
              {isExpired
                ? "Registration has closed"
                : hasStarted
                ? "Registration is open"
                : "Registration will open soon."}
            </Text>
            <Text as="p">
              {isExpired
                ? "Stay tuned for future events!"
                : hasStarted
                ? "Register now to MDIT 2025 and be the best amongst the best!"
                : "Prepare your team, sharpen your skills, and get ready to innovate!"}
            </Text>

            <Button
              size="sm"
              className="flex items-center gap-2 w-full"
              disabled={isExpired || !hasStarted}
            >
              {isExpired
                ? "Registeration Closed"
                : hasStarted
                ? "Register Now"
                : "Coming Soon"}
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-border">
          <Text as="p" styleVariant="muted" className="text-center">
            © {currentYear} MDIT 2025. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
