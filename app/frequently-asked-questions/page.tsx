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
      <div className="text-center space-y-2 py-20 max-w-sm mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1" className="text-primary">
            FAQs
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p">
            Some of the Frequently Asked Questions we received from our
            participants
          </Text>
        </BlurFade>
      </div>
      <div className="pb-20">
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((faq, index) => (
            <BlurFade key={index} inView delay={0.1 * (index + 1)}>
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="max-w-3xl mx-auto"
              >
                <AccordionTrigger className="text-left">
                  <Text as="h2" className="text-lg font-semibold">
                    {faq.question}
                  </Text>
                </AccordionTrigger>
                <AccordionContent>
                  <Text as="p">{faq.answer}</Text>
                </AccordionContent>
              </AccordionItem>
            </BlurFade>
          ))}
        </Accordion>
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
