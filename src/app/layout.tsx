import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Car Picker AI - Find Your Perfect Car with AI | Smart Car Recommendations",
  description:
    "Discover your ideal car with our AI-powered recommendation system. Answer 20 smart questions and get personalized vehicle matches based on your lifestyle, budget, and preferences. Free car finder tool.",
  keywords: [
    "car finder",
    "AI car recommendations",
    "car buying guide",
    "vehicle matcher",
    "car selection tool",
    "automotive AI",
    "car picker",
    "find perfect car",
    "car recommendation engine",
    "smart car finder",
  ].join(", "),
  authors: [{ name: "Car Picker AI" }],
  creator: "Car Picker AI",
  publisher: "Car Picker AI",
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
    locale: "en_US",
    url: "https://carpicker-ai.vercel.app",
    siteName: "Car Picker AI",
    title: "Car Picker AI - Find Your Perfect Car with AI",
    description:
      "Discover your ideal car with our AI-powered recommendation system. Get personalized vehicle matches based on your lifestyle and preferences.",
    images: [
      {
        url: "https://carpicker-ai.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Car Picker AI - Smart Car Recommendations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Picker AI - Find Your Perfect Car with AI",
    description:
      "Get personalized car recommendations with our AI-powered matching system. Answer questions, get results instantly.",
    images: ["https://carpicker-ai.vercel.app/og-image.jpg"],
    creator: "@carpickerai",
  },
  alternates: {
    canonical: "https://carpicker-ai.vercel.app",
  },
  category: "Automotive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Car Picker AI",
              description:
                "AI-powered car recommendation system that helps users find their perfect vehicle based on lifestyle and preferences",
              url: "https://carpicker-ai.vercel.app",
              applicationCategory: "AutomotiveBusinessApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              provider: {
                "@type": "Organization",
                name: "Car Picker AI",
                description: "Advanced AI-powered car recommendation platform",
              },
              featureList: [
                "20 Smart Questions Assessment",
                "AI-Powered Vehicle Analysis",
                "Personalized Car Recommendations",
                "Match Score Visualization",
                "Lifestyle-Based Matching",
              ],
            }),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7658109687581666"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
