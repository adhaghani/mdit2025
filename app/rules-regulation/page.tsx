import React from "react";
import { Text } from "@/components/ui/text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/radix/accordion";
import { FAQ } from "@/components/constant";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <>
      <div className="text-center space-y-2 py-20 max-w-md mx-auto">
        <Text as="h1" className="text-primary">
          Rules & Regulation
        </Text>
        <Text as="p">
          Rules and Regulation you need to know before participating in MDIT
          2025 Datathon
        </Text>
      </div>
      <div className="pb-20 text-center">
        akan diletak disini, perlukan list lengkap
      </div>
      <div className="pb-4">
        <Text as="h2" className="text-center">
          Still have further questions?
        </Text>
        <Text as="p" className="text-center max-w-xl mx-auto">
          Our team has prepared a comprehensive pdf file that should answer most
          questions, however if you still have any questions, please{" "}
          <Link href="/contact" className="underline text-primary">
            reach out to us.
          </Link>
        </Text>
      </div>
      <div className="pb-20 flex justify-center">
        <Button size={"lg"}>Download FAQs PDF</Button>
      </div>
    </>
  );
};

export default page;
