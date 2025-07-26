import React from "react";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[70vh] min-h-fit">
      <Button size={"lg"} variant={"secondary"} className="w-full py-10">
        Click me
      </Button>
      <Button size={"lg"} variant={"secondary"} className="w-full py-10">
        Click me
      </Button>
      <Button size={"lg"} variant={"secondary"} className="w-full py-10">
        Click me
      </Button>
      <Button size={"lg"} variant={"secondary"} className="w-full py-10">
        Click me
      </Button>
    </div>
  );
};

export default page;
