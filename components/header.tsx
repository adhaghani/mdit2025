"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/radix/sheet";
import { MoreHorizontalIcon } from "lucide-react";
import { useStartCountdown } from "@/hooks/useStartCountdown";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { ModeToggle } from "./mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
const Header = memo(() => {
  const { hasStarted, isExpired } = useStartCountdown(
    "2025-08-30T00:00:00+08:00", // Count down to August 30
    "2025-08-10T00:00:00+08:00" // Optional: Start countdown on August 10
  );

  // Memoize button text to prevent recalculation
  const buttonText = useMemo(() => {
    if (isExpired) return "Registration Closed";
    if (hasStarted) return "Register Now";
    return "Coming Soon";
  }, [isExpired, hasStarted]);

  // Memoize button href to prevent recalculation
  const buttonHref = useMemo(() => {
    return isExpired || !hasStarted ? "#" : "/register";
  }, [isExpired, hasStarted]);

  // Memoize button disabled state
  const isButtonDisabled = useMemo(() => {
    return isExpired || !hasStarted;
  }, [isExpired, hasStarted]);

  return (
    <header className="max-w-7xl z-50 h-14 fixed top-4 left-[50%] translate-x-[-50%] w-full lg:mx-auto px-4  xl:px-0">
      <div className="flex justify-between h-full items-center bg-white/50 dark:bg-black/20 backdrop-blur-lg gap-4 border rounded-lg shadow-sm px-4 py-2 ">
        <Link href={"/"} className=" flex items-center justify-center gap-2">
          <Image
            src="/mdit.svg"
            alt="MDIT 2025 Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <Text as="h4" className="text-sm lg:text-xl">
            MDIT x DOSM Datathon 2025
          </Text>
        </Link>
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-3 p-6 md:w-[500px] lg:w-[600px]">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about-us"
                      className="group block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                          About Us
                        </div>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-muted-foreground/80">
                        Learn about our mission, team, and the journey of MDIT
                        2025.
                      </p>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/about-us/past-mdit"
                      className="group block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="text-sm font-semibold leading-none group-hover:text-purple-600 transition-colors">
                          View Past MDIT
                        </div>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-muted-foreground/80">
                        Explore memories and highlights from previous
                        competitions.
                      </p>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/event-details"
                      className="group block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="text-sm font-semibold leading-none group-hover:text-blue-600 transition-colors">
                          Event Details
                        </div>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-muted-foreground/80">
                        Complete information about the competition structure and
                        timeline.
                      </p>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/rules-regulation"
                      className="group block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="text-sm font-semibold leading-none group-hover:text-green-600 transition-colors">
                          Rules & Regulation
                        </div>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-muted-foreground/80">
                        Official rules, guidelines, and competition
                        requirements.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/frequently-asked-questions">FAQs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={buttonHref}>
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  disabled={isButtonDisabled}
                >
                  {buttonText}
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
                  <Link
                    href="/about-us"
                    className="w-full block text-center py-3"
                  >
                    About Us
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/event-details"
                    className="w-full block text-center py-3"
                  >
                    Event Details
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
                    href="/rules-regulation"
                    className="w-full block text-center py-3"
                  >
                    Rules & Regulation
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
                  <Link className="block w-full " href={buttonHref}>
                    <Button
                      size="sm"
                      className="flex items-center gap-2 w-full "
                      disabled={isButtonDisabled}
                    >
                      {buttonText}
                    </Button>
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
          <div className="flex">
            <ModeToggle />
          </div>
          <div className="hidden sm:flex">
            <Link href={buttonHref}>
              <Button
                size="sm"
                className="flex items-center gap-2"
                disabled={isButtonDisabled}
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
