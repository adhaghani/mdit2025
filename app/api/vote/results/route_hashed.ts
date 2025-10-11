import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service role for results access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Domain validation function (same as redeem license)
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

export async function GET(request: NextRequest) {
  try {
    // Get origin for CORS headers
    const origin = request.headers.get("origin") || "https://www.mdit2025.my";

    // Domain validation
    if (!isValidDomain(request)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access denied: Invalid domain",
        },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    // Call Supabase function to get voting results
    const { data, error } = await supabase.rpc("get_voting_results");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Database error occurred. Please try again later.",
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "https://www.mdit2025.my";

  if (!isValidDomain(request)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
