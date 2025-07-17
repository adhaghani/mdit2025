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
import Image from "next/image";
import { Text } from "@/components/ui/text";

const Header = () => {
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
            <Link href="/frequently-asked-questions">FAQs</Link>
          </li>
        </ul>
        {/* MOBILE TRIGGER */}
        <div className="md:hidden flex">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MoreHorizontalIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              test
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
