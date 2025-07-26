import type { Metadata } from "next";
import { Outfit, Merriweather, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "MDIT 2025 - Malaysia Data Innovation Talent | National Inter-Varsity Datathon",
  description:
    "MDIT 2025 is a national inter-varsity program aimed at fostering innovation and collaboration among students in the fields of computer science and mathematics. Join the datathon competition organized by UiTM INSTATS Club in collaboration with Department of Statistics Malaysia (DOSM).",
  keywords: [
    "MDIT 2025",
    "Malaysia Data Innovation Talent",
    "datathon",
    "inter-varsity competition",
    "data science",
    "statistics",
    "UiTM",
    "DOSM",
    "INSTATS",
    "university students",
    "data analytics",
    "innovation",
    "computer science",
    "mathematics",
  ],
  authors: [{ name: "adhaghani" }],
  creator: "adhaghani",
  publisher: "Universiti Teknologi MARA",
  category: "Education",
  classification: "Competition",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://mdit2025.vercel.app",
    title: "MDIT 2025 - Malaysia Data Innovation Talent",
    description:
      "National inter-varsity datathon competition fostering innovation in data science and analytics among Malaysian university students.",
    siteName: "MDIT 2025",
    images: [
      {
        url: "/mdit2025.png",
        width: 1200,
        height: 630,
        alt: "MDIT 2025 - Malaysia Data Innovation Talent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MDIT 2025 - Malaysia Data Innovation Talent",
    description:
      "National inter-varsity datathon competition fostering innovation in data science and analytics among Malaysian university students.",
    images: ["/mdit2025.png"],
  },
  metadataBase: new URL("https://mdit2025.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "event:start_date": "2025-08-15",
    "event:end_date": "2025-10-18",
    "event:location": "Malaysia",
    "event:type": "Competition",
    organization: "Universiti Teknologi MARA",
    partner: "Department of Statistics Malaysia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/mdit2025_16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/mdit2025_32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/mdit2025_48.png"
          sizes="48x48"
          type="image/png"
        />
        <link
          rel="icon"
          href="/mdit2025_64.png"
          sizes="64x64"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/mdit2025_64.png" />
      </head>
      <Analytics />
      <body
        className={`${outfit.variable} ${merriweather.variable} ${sourceCodePro.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed h-[100vh] w-[100vw] left-0 top-0 -z-10">
            <FlickeringGrid
              className="relative inset-0 z-0"
              squareSize={5}
              gridGap={10}
              color="#8b5cf6"
              maxOpacity={0.12}
              flickerChance={0.1}
            />
          </div>
          <Header />
          <main className="mx-auto px-4 py-2 mt-18">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
