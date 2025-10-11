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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  // Domain validation
  if (!isValidDomain(request)) {
    console.warn("Unauthorized access attempt to guest vote submission from:", {
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
    });
    return NextResponse.json({ error: "Unauthorized domain" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, votes } = body;

    console.log(
      "Processing guest vote submission for email:",
      email?.substring(0, 3) + "***"
    );

    // Validate required fields
    if (!email || !votes) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and votes are required",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Validate vote structure
    if (
      !votes.pitchingExcellence ||
      !votes.criticalThinking ||
      !votes.aiInnovation
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "All three vote categories are required",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Call the submit_guest_vote function
    const { data, error } = await supabase.rpc("submit_guest_vote", {
      p_email: email,
      p_pitching_excellence: votes.pitchingExcellence,
      p_critical_thinking: votes.criticalThinking,
      p_ai_innovation: votes.aiInnovation,
    });

    if (error) {
      console.error("Database error submitting guest vote:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit vote. Please try again.",
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    if (!data || !data.success) {
      console.log("Guest vote submission failed:", data?.error);
      return NextResponse.json(
        {
          success: false,
          error: data?.error || "Failed to submit vote",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    console.log("Guest vote submitted successfully");

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Unexpected error in guest vote submission route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
