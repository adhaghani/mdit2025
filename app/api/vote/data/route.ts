import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export async function POST(request: NextRequest) {
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
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const body = await request.json();
    const { icNumber } = body;

    // Validate IC number format (same as redeem license)
    const icPattern = /^\d{6}-\d{2}-\d{4}$/;
    if (!icNumber || !icPattern.test(icNumber)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid IC number format. Please use XXXXXX-XX-XXXX format.",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    console.log("🔍 Searching for IC:", icNumber);

    // Call Supabase function with domain headers (similar to get_user_credentials)
    const { data, error } = await supabase.rpc("get_voting_credentials", {
      p_ic_number: icNumber,
    });

    console.log("✅ Function result:", data);
    console.log("❌ Function error:", error);

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
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    const origin = request.headers.get("origin") || "https://www.mdit2025.my";
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST",
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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
