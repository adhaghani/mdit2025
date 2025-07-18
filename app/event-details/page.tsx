import { Text } from "@/components/ui/text";
import { PROGRAM_TIMELINE } from "@/components/constant";

import { CountingNumber } from "@/components/animate-ui/text/counting-number";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/radix/dialog";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <>
      <BlurFade delay={0.1} inView>
        <div className="text-center space-y-2 pt-20 pb-10 max-w-xl mx-auto">
          <Text as="h1">What is MIDT x DD 2025?</Text>
          <Text as="p" styleVariant="muted">
            What exactly is MIDT and what you should know
          </Text>
        </div>
      </BlurFade>
      <div className="space-y-3">
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-center max-w-[800px] mt-4 mx-auto">
            MDIT 2025 is a national inter-varsity program aimed at fostering
            innovation and collaboration among students in the fields of
            computer science and mathematics. This competition aims to ignite
            the minds of participants, motivating them to think critically about
            data studies and become skilled in precise and transparent analysis.
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="text-center max-w-[800px] mt-4 mx-auto">
            MDIT 2025 is a national inter-varsity program aimed at fostering
            innovation and collaboration among students in the fields of
            computer science and mathematics. This competition aims to ignite
            the minds of participants, motivating them to think critically about
            data studies and become skilled in precise and transparent analysis.
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <Text as="p" className="text-center max-w-[800px] mt-4 mx-auto">
            MDIT 2025 is a national inter-varsity program aimed at fostering
            innovation and collaboration among students in the fields of
            computer science and mathematics. This competition aims to ignite
            the minds of participants, motivating them to think critically about
            data studies and become skilled in precise and transparent analysis.
          </Text>
        </BlurFade>
      </div>

      <div className="text-center space-y-2 py-40 w-full mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1">with a Prize Pool of</Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="h1"
            className="text-primary flex mt-10 gap-2 items-center justify-center text-6xl md:!text-8xl lg:!text-9xl font-bold mx-auto"
          >
            RM
            <CountingNumber
              decimalPlaces={2}
              decimalSeparator="."
              inView
              number={11000}
              className="text-white"
            />
          </Text>
        </BlurFade>
      </div>
      <div className="text-center space-y-2 py-7 w-full mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h2">First Place Prize</Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text
            as="h1"
            className="text-primary flex mt-6 gap-2 items-center justify-center text-5xl md:!text-6xl lg:!text-7xl font-bold mx-auto"
          >
            RM
            <CountingNumber
              decimalPlaces={2}
              decimalSeparator="."
              inView
              number={3500}
              className="text-white"
            />
          </Text>
        </BlurFade>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4 justify-center">
        <div className="text-center space-y-2 py-7 w-full mx-auto">
          <BlurFade inView delay={0.1}>
            <Text as="h2">First Runner Up</Text>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Text
              as="h1"
              className="text-primary flex mt-6 gap-2 items-center justify-center md:!text-5xl lg:!text-6xl font-bold mx-auto"
            >
              RM
              <CountingNumber
                decimalPlaces={2}
                decimalSeparator="."
                inView
                number={2500}
                className="text-white"
              />
            </Text>
          </BlurFade>
        </div>

        <div className="text-center space-y-2 py-7 w-full mx-auto">
          <BlurFade delay={0.1} inView>
            <Text as="h2">Second Runner Up</Text>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Text
              as="h1"
              className="text-primary flex mt-6 gap-2 items-center justify-center md:!text-5xl lg:!text-6xl font-bold mx-auto"
            >
              RM
              <CountingNumber
                decimalPlaces={2}
                decimalSeparator="."
                inView
                number={1500}
                className="text-white"
              />
            </Text>
          </BlurFade>
        </div>
      </div>
      <div className="text-center space-y-2 py-7 pb-20 w-full mx-auto">
        <BlurFade delay={0.1} inView>
          <Text as="h2">4th - 10th place</Text>
        </BlurFade>
        <BlurFade delay={0.15} inView>
          <Text
            as="h1"
            className="text-primary flex mt-6 gap-2 items-center justify-center text-3xl md:!text-4xl lg:!text-5xl font-bold mx-auto"
          >
            RM
            <CountingNumber
              decimalPlaces={2}
              decimalSeparator="."
              inView
              number={500}
              className="text-white"
            />{" "}
            <span className="text-lg mt-auto text-white font-normal">
              / each group
            </span>
          </Text>
        </BlurFade>
      </div>
      <div className="text-center space-y-2 pt-20 pb-10 max-w-md mx-auto">
        <BlurFade delay={0.15} inView>
          <Text as="h1">Meet The Judges</Text>
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <Text as="p" styleVariant="muted">
            The Judges whom will be evaluating the participants projects
          </Text>
        </BlurFade>
      </div>
      <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-20 gap-4 mx-auto">
        <BlurFade inView delay={0.15}>
          <Dialog>
            <Card>
              <CardContent>
                <div className="relative aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      variant={"secondary"}
                      className="absolute top-2 right-2"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  Image Goes here
                </div>
                <div className="mt-3">
                  <Text as="p">AHMAD ADHA BIN MOHD GHANI</Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                </div>
              </CardContent>
            </Card>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>First Judge</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative flex-1 aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  Image Goes here
                </div>
                <div className="flex-1">
                  <Text as="p" className="text-lg font-semibold">
                    AHMAD ADHA BIN MOHD GHANI
                  </Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                  <Text as="p" className="mt-4 text-justify">
                    Ahmad Adha is a seasoned professional with extensive
                    experience in data analytics and business intelligence,
                    currently serving as a PwC Trust Ambassador.
                  </Text>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Dialog>
            <Card>
              <CardContent>
                <div className="relative aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      variant={"secondary"}
                      className="absolute top-2 right-2"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  Image Goes here
                </div>
                <div className="mt-3">
                  <Text as="p">AHMAD ADHA BIN MOHD GHANI</Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                </div>
              </CardContent>
            </Card>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>First Judge</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative flex-1 aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  Image Goes here
                </div>
                <div className="flex-1">
                  <Text as="p" className="text-lg font-semibold">
                    AHMAD ADHA BIN MOHD GHANI
                  </Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                  <Text as="p" className="mt-4 text-justify">
                    Ahmad Adha is a seasoned professional with extensive
                    experience in data analytics and business intelligence,
                    currently serving as a PwC Trust Ambassador.
                  </Text>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <Dialog>
            <Card>
              <CardContent>
                <div className="relative aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      variant={"secondary"}
                      className="absolute top-2 right-2"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  Image Goes here
                </div>
                <div className="mt-3">
                  <Text as="p">AHMAD ADHA BIN MOHD GHANI</Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                </div>
              </CardContent>
            </Card>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>First Judge</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative flex-1 aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  Image Goes here
                </div>
                <div className="flex-1">
                  <Text as="p" className="text-lg font-semibold">
                    AHMAD ADHA BIN MOHD GHANI
                  </Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                  <Text as="p" className="mt-4 text-justify">
                    Ahmad Adha is a seasoned professional with extensive
                    experience in data analytics and business intelligence,
                    currently serving as a PwC Trust Ambassador.
                  </Text>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </BlurFade>
        <BlurFade inView delay={0.3}>
          <Dialog>
            <Card>
              <CardContent>
                <div className="relative aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      variant={"secondary"}
                      className="absolute top-2 right-2"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  Image Goes here
                </div>
                <div className="mt-3">
                  <Text as="p">AHMAD ADHA BIN MOHD GHANI</Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                </div>
              </CardContent>
            </Card>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>First Judge</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative flex-1 aspect-video sm:aspect-square border rounded-lg grid place-items-center">
                  Image Goes here
                </div>
                <div className="flex-1">
                  <Text as="p" className="text-lg font-semibold">
                    AHMAD ADHA BIN MOHD GHANI
                  </Text>
                  <Text as="p" styleVariant="muted">
                    PwC Trust Ambassador, PwC Malaysia
                  </Text>
                  <Text as="p" className="mt-4 text-justify">
                    Ahmad Adha is a seasoned professional with extensive
                    experience in data analytics and business intelligence,
                    currently serving as a PwC Trust Ambassador.
                  </Text>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </BlurFade>
      </div>
      <div className="text-center space-y-2 py-20 max-w-md mx-auto">
        <Text as="h1">Requirements</Text>
        <Text as="p" styleVariant="muted">
          requirements for the participants to join MDIT x DOSM Datathon 2025
        </Text>
      </div>
      <div className="text-center space-y-2 py-20 max-w-md mx-auto">
        <BlurFade inView delay={0.1}>
          <Text as="h1">Timeline</Text>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" styleVariant="muted">
            Timeline of the program
          </Text>
        </BlurFade>
      </div>
      <div className="flex flex-col gap-10 mb-20">
        {PROGRAM_TIMELINE.map((item, index) => (
          <div className=" flex flex-row items-start gap-4" key={index}>
            {/* Date */}
            <div className=" sm:flex-1 min-w-[80px] flex justify-end items-start">
              <BlurFade inView delay={0.1}>
                <Text as="p" styleVariant="muted">
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </BlurFade>
            </div>
            {/* Line/Dot */}
            <div>
              <BlurFade
                delay={0.15}
                inView
                className="flex flex-col items-center"
              >
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                {index < PROGRAM_TIMELINE.length - 1 && (
                  <div className="w-0.5 h-16 bg-border mt-2"></div>
                )}
              </BlurFade>
            </div>
            <div className=" flex-1 flex flex-col gap-1.5 items-start justify-start">
              <BlurFade delay={0.2} inView>
                <Text as="h4">{item.event}</Text>
              </BlurFade>
              <BlurFade delay={0.25} inView>
                <Text as="p" styleVariant="muted">
                  {item.details}
                </Text>
              </BlurFade>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
