import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with anon key for guest access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Domain validation function (same as participant voting)
function isValidDomain(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // List of allowed domains
  const allowedDomains = [
    "https://mdit2025.my",
    "https://www.mdit2025.my",
    "https://staging.mdit2025.my",
    "https://dev.mdit2025.my",
    "https://api.mdit2025.my",
  ];

  // Check origin header
  if (origin && allowedDomains.includes(origin)) {
    return true;
  }

  // Check referer header
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (allowedDomains.includes(refererOrigin)) {
        return true;
      }
    } catch (error) {
      // Invalid referer URL
    }
  }

  // Allow localhost for development
  if (process.env.NODE_ENV === "development") {
    if (origin?.includes("localhost") || referer?.includes("localhost")) {
      return true;
    }
  }

  return false;
}

// Handle preflight OPTIONS request
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(request: NextRequest) {
  // Domain validation
  if (!isValidDomain(request)) {
    console.warn("Unauthorized access attempt to guest voting data from:", {
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
    });
    return NextResponse.json({ error: "Unauthorized domain" }, { status: 403 });
  }

  try {
    console.log("Fetching guest voting data from database...");

    // Call the get_guest_voting_data function
    const { data, error } = await supabase.rpc("get_guest_voting_data");

    if (error) {
      console.error("Database error fetching guest voting data:", error);
      return NextResponse.json(
        { error: "Failed to fetch voting data" },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    if (!data || !data.success) {
      console.log("Guest voting data fetch failed:", data?.error);
      return NextResponse.json(
        {
          success: false,
          error: data?.error || "Failed to fetch voting data",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    console.log("Successfully fetched guest voting data");

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Unexpected error in guest voting data route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
