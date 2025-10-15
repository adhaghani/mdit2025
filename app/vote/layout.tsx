import React from "react";
import { CountdownProvider } from "@/contexts/vote-countdown-context";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CountdownProvider>{children}</CountdownProvider>;
};

export default layout;
