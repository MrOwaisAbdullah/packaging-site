import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { getSettings } from "@/lib/sanity";
import "./globals.css";

// Dynamically import components to avoid blocking hydration
const WhatsAppFloat = dynamic(
  () => import("@/components/whatsapp/WhatsAppFloat")
);
const Analytics = dynamic(
  () => import("@/components/analytics/Analytics")
);

/* ============================================================
   TYPOGRAPHY SETUP (Constitution requirement)
   - Headings: Outfit (700, 600, 500, 400)
   - Body: Plus Jakarta Sans (400, 500, 600, 700)
   ============================================================ */

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NextLevel Packaging UAE | Premium Packaging Materials Dubai",
    template: "%s | NextLevel Packaging UAE",
  },
  description:
    "Leading packaging materials supplier in Dubai, UAE. Corrugated boxes, stretch films, bubble wrap, and more. Wholesale prices with fast delivery across UAE.",
  keywords: [
    "packaging materials UAE",
    "corrugated boxes Dubai",
    "bubble wrap UAE",
    "stretch films Sharjah",
    "packaging supplies Dubai",
    "wholesale packaging UAE",
  ],
  authors: [{ name: "NextLevel Packaging" }],
  creator: "NextLevel Packaging",
  publisher: "NextLevel Packaging",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NextLevel Packaging UAE",
    title: "NextLevel Packaging UAE | Premium Packaging Materials",
    description:
      "Leading packaging materials supplier in Dubai, UAE. Corrugated boxes, stretch films, bubble wrap, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextLevel Packaging UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextLevel Packaging UAE | Premium Packaging Materials",
    description:
      "Leading packaging materials supplier in Dubai, UAE. Corrugated boxes, stretch films, bubble wrap, and more.",
    images: ["/og-image.png"],
  },
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, categories] = await Promise.all([
    getSettings(),
    import("@/lib/sanity").then(mod => mod.getCategories())
  ])

  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body min-h-screen flex flex-col">
        <OrganizationJsonLd settings={settings} />
        <Analytics />
        <Header categories={categories} />
        <main className="flex-1 pt-[100px]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
