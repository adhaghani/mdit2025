"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const [siteIsLive, setSiteIsLive] = useState(false);

  useEffect(() => {
    // Check if the current date is after August 1, 2025
    const launchDate = new Date("2025-08-01T00:00:00+08:00");
    const now = new Date();
    setSiteIsLive(now >= launchDate);
  }, []);

  return (
    <>
      {siteIsLive && <Header />}
      <main
        className={`max-w-7xl mx-auto px-4 py-2 ${siteIsLive ? "mt-18" : ""}`}
      >
        {children}
      </main>
      {siteIsLive && <Footer />}
    </>
  );
}
