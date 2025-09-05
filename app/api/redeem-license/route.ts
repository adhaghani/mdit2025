import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Domain validation function
function isValidDomain(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Debug logging (remove in production)
  console.log("Domain validation debug:");
  console.log("Origin:", origin);
  console.log("Referer:", referer);

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
    console.log("Origin validation: PASSED");
    return true;
  }

  // Check referer header
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;
      console.log("Referer origin:", refererOrigin);

      if (allowedDomains.includes(refererOrigin)) {
        console.log("Referer validation: PASSED");
        return true;
      }
    } catch (error) {
      console.log("Error parsing referer URL:", error);
    }
  }

  // Alternative regex pattern as fallback
  const validDomainPattern =
    /^https:\/\/(www\.|staging\.|dev\.|api\.)?mdit2025\.my$/;

  if (origin && validDomainPattern.test(origin)) {
    console.log("Origin regex validation: PASSED");
    return true;
  }

  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (validDomainPattern.test(refererOrigin)) {
        console.log("Referer regex validation: PASSED");
        return true;
      }
    } catch (error) {
      console.log("Error in referer regex validation:", error);
    }
  }

  // Allow localhost for development
  if (process.env.NODE_ENV === "development") {
    if (origin?.includes("localhost") || referer?.includes("localhost")) {
      console.log("Localhost validation: PASSED");
      return true;
    }
  }

  console.log("Domain validation: FAILED");
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

    // Validate IC number format
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

    // Call Supabase function with domain headers
    const { data, error } = await supabase.rpc("get_license_key", {
      p_ic_number: icNumber,
    });

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
