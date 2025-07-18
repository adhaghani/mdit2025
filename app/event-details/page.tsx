import { Text } from "@/components/ui/text";
import { PROGRAM_TIMELINE } from "@/components/constant";
import { TimelineItem, Timeline } from "@/components/ui/timeline";
import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardContent,
  type PreviewCardProps,
  type PreviewCardContentProps,
} from "@/components/animate-ui/base/preview-card";
import { div } from "motion/react-client";

const page = () => {
  return (
    <>
      <div className="text-center space-y-2 py-20 max-w-md mx-auto">
        <Text as="h1" className="text-primary">
          Event Details
        </Text>
        <Text as="p">
          Everything you need to know about MDIT x DOSM Datathon 2025 Datathon
        </Text>
      </div>
      <div className="text-center space-y-2 py-20 max-w-md mx-auto">
        <Text as="h1">Timeline</Text>
        <Text as="p" styleVariant="muted">
          Timeline of the program
        </Text>
      </div>
      <div className="text-center space-y-2 py-20 max-w-md mx-auto">
        <Text as="h1">Timeline</Text>
        <Text as="p" styleVariant="muted">
          Timeline of the program
        </Text>
      </div>
      <div className="flex flex-col gap-10 mb-20">
        {PROGRAM_TIMELINE.map((item, index) => (
          <div className=" flex flex-row items-start gap-4" key={index}>
            {/* Date */}
            <div className=" sm:flex-1 flex justify-end items-start">
              <Text as="p" styleVariant="muted">
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </div>
            {/* Line/Dot */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
              {index < PROGRAM_TIMELINE.length - 1 && (
                <div className="w-0.5 h-16 bg-border mt-2"></div>
              )}
            </div>
            <div className=" flex-1 flex flex-col gap-1.5 items-start justify-start">
              <Text as="h4">{item.event}</Text>
              <Text as="p" styleVariant="muted">
                {item.details}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
