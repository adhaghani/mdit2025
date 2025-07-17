import React from "react";
import { Text } from "@/components/ui/text";
const page = () => {
  return (
    <>
      <div className="text-center space-y-2 max-w-sm mx-auto">
        <Text as="h1">FAQs</Text>
        <Text as="p">
          Some of the Frequently Asked Questions we received from all
          participants
        </Text>
      </div>
    </>
  );
};

export default page;
