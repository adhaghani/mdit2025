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
import { useCountdown } from "@/contexts/countdown-context";
import { QRCode } from "@/components/ui/shadcn-io/qr-code";
import { GOOGLE_FORM_LINK } from "./constant";
import Image from "next/image";
import { Text } from "@/components/ui/text";
// import { ModeToggle } from "./mode-toggle";
import { ScrollArea } from "./ui/scroll-area";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./animate-ui/radix/dialog";
const Header = memo(() => {
  const { hasStarted, isExpired } = useCountdown();

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
    <header className="max-w-7xl z-50 h-14 fixed top-4 left-[50%] translate-x-[-50%] w-full lg:mx-auto px-4">
      <div className="flex justify-between h-full items-center bg-white/50 dark:bg-black/20 backdrop-blur-lg gap-2 md:gap-4 border rounded-lg shadow-sm px-2 md:px-4 py-2 ">
        <Link href={"/"} className=" flex items-center justify-center gap-2">
          <Image
            src="/mdit.svg"
            alt="MDIT 2025 Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <Text as="h4" className="text-sm font-mono lg:text-xl">
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
                <div className="grid grid-cols-1 gap-3 p-4 w-[95vw] max-w-[300px]">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about-us"
                      className="group block select-none space-y-2 rounded-lg p-3 md:p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="text-xs md:text-sm font-semibold leading-none group-hover:text-primary transition-colors">
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
                      className="group block select-none space-y-2 rounded-lg p-3 md:p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="text-xs md:text-sm font-semibold leading-none group-hover:text-purple-600 transition-colors">
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
                      className="group block select-none space-y-2 rounded-lg p-3 md:p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="text-xs md:text-sm font-semibold leading-none group-hover:text-blue-600 transition-colors">
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
                      className="group block select-none space-y-2 rounded-lg p-3 md:p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:shadow-md"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="text-xs md:text-sm font-semibold leading-none group-hover:text-green-600 transition-colors">
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
            {/* <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              {/* <Link href={buttonHref}> */}
              {isButtonDisabled ? (
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  disabled={isButtonDisabled}
                >
                  {buttonText}
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex items-center gap-2"
                      disabled={isButtonDisabled}
                    >
                      {buttonText}
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

              {/* </Link> */}
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
            <SheetContent side={"right"} className="w-[300px] sm:w-[400px]">
              <ScrollArea className="h-[calc(100vh-4rem)]">
                <SheetHeader className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/mdit.svg"
                      alt="MDIT 2025 Logo"
                      width={50}
                      height={50}
                      className="w-12 h-12"
                    />
                  </div>
                  <SheetTitle className="text-center text-lg font-bold">
                    MDIT x DOSM Datathon 2025
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-2">
                  <div className="px-2 py-2">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">Home</span>
                    </Link>
                  </div>

                  <div className="px-2 py-1">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">
                      About
                    </div>
                    <div className="space-y-1 ml-2">
                      <Link
                        href="/about-us"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm group"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                        <span>About Us</span>
                      </Link>
                      <Link
                        href="/about-us/past-mdit"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm group"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></div>
                        <span>Past MDIT</span>
                      </Link>
                    </div>
                  </div>

                  <div className="px-2 py-2">
                    <Link
                      href="/event-details"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">Event Details</span>
                    </Link>
                  </div>

                  <div className="px-2 py-2">
                    <Link
                      href="/rules-regulation"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">Rules & Regulation</span>
                    </Link>
                  </div>

                  <div className="px-2 py-2">
                    <Link
                      href="/contact"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                    >
                      <div className="w-2 h-2 bg-pink-500 rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">Contact</span>
                    </Link>
                  </div>

                  <div className="px-2 py-2">
                    <Link
                      href="/frequently-asked-questions"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                    >
                      <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">FAQs</span>
                    </Link>
                  </div>

                  <div className="pt-4 px-2">
                    <div className="border-t pt-4">
                      <Link className="block w-full" href={buttonHref}>
                        <Button
                          size="lg"
                          className="w-full justify-center gap-2 font-semibold"
                          disabled={isButtonDisabled}
                        >
                          {buttonText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          {/* <div className="flex">
            <ModeToggle />
          </div> */}
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
