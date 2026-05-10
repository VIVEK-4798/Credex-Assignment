import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Free AI Spend Audit Tool | Find Hidden Savings",
  description: "Get a free audit of your AI tool spending in under 2 minutes. Find out if your startup is overpaying for AI tools and discover potential savings.",
  keywords: "AI tools, spending audit, cost optimization, SaaS audit, ChatGPT, Claude, AI spend management",
  authors: [{ name: "AI Spend Audit" }],
  creator: "AI Spend Audit",
  publisher: "AI Spend Audit",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free AI Spend Audit Tool | Find Hidden Savings",
    description: "Find out if your startup is overpaying for AI tools. Get actionable recommendations in 2 minutes.",
    type: "website",
    url: "https://ai-spend-audit.com",
    siteName: "AI Spend Audit",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Spend Audit - Find hidden AI spending",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Spend Audit Tool",
    description: "Find out if your startup is overpaying for AI tools.",
    images: ["/og-image.png"],
    creator: "@aispendaudit",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "AI Spend Audit",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AI Spend Audit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="preconnect" href="https://api.resend.com" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.openai.com" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
        
        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AI Spend Audit",
              "description": "Free audit of your AI tool spending in under 2 minutes",
              "url": "https://ai-spend-audit.com",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
              "creator": {
                "@type": "Organization",
                "name": "AI Spend Audit",
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": "https://ai-spend-audit.com/audit",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
