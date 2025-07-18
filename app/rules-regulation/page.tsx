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
import { BlurFade } from "@/components/magicui/blur-fade";

const page = () => {
  return (
    <>
      <div className="text-center space-y-2 py-20 max-w-md mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            Rules & Regulation
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p">
            Rules and Regulation you need to know before participating in MDIT
            2025 Datathon
          </Text>
        </BlurFade>
      </div>
      <div className="pb-20 text-center">
        akan diletak disini, perlukan list lengkap
      </div>
      <div className="pb-4">
        <BlurFade inView delay={0.2}>
          <Text as="h2" className="text-center">
            Still have further questions?
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <Text as="p" className="text-center max-w-xl mx-auto">
            Our team has prepared a comprehensive pdf file that should answer
            most questions, however if you still have any questions, please{" "}
            <Link href="/contact" className="underline text-primary">
              reach out to us.
            </Link>
          </Text>
        </BlurFade>
      </div>
      <div className="pb-20 flex justify-center">
        <BlurFade inView delay={0.25}>
          <Button size={"lg"}>Download FAQs PDF</Button>
        </BlurFade>
      </div>
    </>
  );
};

export default page;
