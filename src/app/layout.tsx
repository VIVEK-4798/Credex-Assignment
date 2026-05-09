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
  title: "Free AI Spend Audit Tool | Find Hidden Savings",
  description: "Get a free audit of your AI tool spending in under 2 minutes. Find out if your startup is overpaying for AI tools and discover potential savings.",
  keywords: "AI tools, spending audit, cost optimization, SaaS audit, ChatGPT, Claude",
  openGraph: {
    title: "Free AI Spend Audit Tool",
    description: "Find out if your startup is overpaying for AI tools. Get actionable recommendations in 2 minutes.",
    type: "website",
    url: "https://ai-spend-audit.com",
    siteName: "AI Spend Audit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Spend Audit Tool",
    description: "Find out if your startup is overpaying for AI tools.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
