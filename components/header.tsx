"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/radix/sheet";
import { MoreHorizontalIcon } from "lucide-react";
import { useStartCountdown } from "@/hooks/useStartCountdown";
import Image from "next/image";
import { Text } from "@/components/ui/text";

const Header = () => {
  const { hasStarted, timeLeft, isExpired } = useStartCountdown(
    "2025-08-30T00:00:00+08:00", // Count down to August 30
    "2025-08-10T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  return (
    <header className="max-w-7xl z-50 h-14 fixed top-4 left-[50%] translate-x-[-50%] w-full mx-auto px-4">
      <div className="flex justify-between h-full items-center bg-black/20 backdrop-blur-lg gap-4 border rounded-lg shadow-sm px-4 py-2 ">
        <div className=" flex items-center justify-center gap-2">
          <Image
            src="/mdit.svg"
            alt="MDIT 2025 Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <Text as="h4">MDIT 2025</Text>
        </div>
        <ul className="hidden md:flex items-center gap-4  justify-end">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/rules-regulation">Rules & Regulation</Link>
          </li>
          <li>
            <Link href="/frequently-asked-questions">FAQs</Link>
          </li>
          <li>
            <Link href={isExpired || !hasStarted ? "#" : "/register"}>
              <Button
                size="sm"
                className="flex items-center gap-2"
                disabled={isExpired || !hasStarted}
              >
                {isExpired
                  ? "Registeration Closed"
                  : hasStarted
                  ? "Register Now"
                  : "Coming Soon"}
              </Button>
            </Link>
          </li>
        </ul>
        {/* MOBILE TRIGGER */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MoreHorizontalIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
              <SheetHeader>
                <div className="flex items-center justify-center">
                  <Image
                    src="/mdit.svg"
                    alt="MDIT 2025 Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
                <SheetTitle>MDIT 2025</SheetTitle>
              </SheetHeader>
              <ul className="flex w-full flex-col items-center gap-4 pt-4">
                <li className="w-full">
                  <Link href="/" className="w-full block text-center py-3">
                    Home
                  </Link>
                </li>
                <li className="w-full">
                  <Link href="/about" className="w-full block text-center py-3">
                    About
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/contact"
                    className="w-full block text-center py-3"
                  >
                    Contact
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/frequently-asked-questions"
                    className="w-full block text-center py-3"
                  >
                    FAQs
                  </Link>
                </li>
                <li className="block w-full">
                  <Link
                    className="block w-full "
                    href={isExpired || !hasStarted ? "#" : "/register"}
                  >
                    <Button
                      size="sm"
                      className="flex items-center gap-2 w-full "
                      disabled={isExpired || !hasStarted}
                    >
                      {isExpired
                        ? "Registeration Closed"
                        : hasStarted
                        ? "Register Now"
                        : "Coming Soon"}
                    </Button>
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
          <div className="hidden sm:flex">
            <Link href={isExpired || !hasStarted ? "#" : "/register"}>
              <Button
                size="sm"
                className="flex items-center gap-2"
                disabled={isExpired || !hasStarted}
              >
                {isExpired
                  ? "Registeration Closed"
                  : hasStarted
                  ? "Register Now"
                  : "Coming Soon"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
