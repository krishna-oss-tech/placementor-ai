import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'PlaceMentor AI - #1 AI Placement Prep for Engineering Students',
  description: 'Practice AI mock interviews, get resume ATS score, prepare for TCS, Infosys, Wipro placements. Free for engineering students in India.',
  keywords: 'placement preparation, mock interview, resume analyzer, TCS interview, Infosys interview, engineering placement, AI interview practice, campus placement India',
  openGraph: {
    title: 'PlaceMentor AI - Crack Your Placement with AI',
    description: 'AI-powered placement prep for Indian engineering students. Mock interviews, resume review, company-specific prep.',
    url: 'https://placementor-ai.vercel.app',
    siteName: 'PlaceMentor AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlaceMentor AI - AI Placement Prep',
    description: 'Practice mock interviews and crack your placement with AI.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
