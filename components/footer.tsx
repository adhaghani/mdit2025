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
      <div className=" mx-auto p-4 py-6 h-fit border shadow-sm bg-black/20 backdrop-blur-lg rounded-lg ">
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
              MDIT 2025 is a national interFvarsity program held in
              collaboration with Faculty of Computer Science and Mathematics
              Universiti Teknologi MARA, Department of Statistics Malaysia and
              INSTAT Club.
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
                  href="/event-details"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Event Details
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/rules-regulation"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Rules & Regulation
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
            <h3 className="font-semibold text-foreground">Follow Us @</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43V7.93a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.36z" />
                </svg>
                <span>Tiktok</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
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
