import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import { ToastProvider } from "@/components/Toast";
import GlobalCalendly from "@/components/GlobalCalendly";

export const metadata: Metadata = {
  title: "Sumit Gill | Full-Stack Developer & Software Engineer",
  description: "Portfolio of Sumit Gill — a passionate full-stack developer specializing in React, Next.js, Flutter, and mobile app development. Based in Bathinda, Punjab, India.",
  keywords: ["Sumit Gill", "Gill Tech Solutions India", "Full Stack Developer", "React Developer", "Next.js", "Flutter Developer", "Android Developer", "Software Engineer", "Portfolio", "Bathinda"],
  authors: [{ name: "Sumit Gill" }],
  creator: "Sumit Gill",
  openGraph: {
    title: "Sumit Gill | Full-Stack Developer",
    description: "Building exceptional web & mobile experiences with modern technologies.",
    url: "https://gilltechsolutionsindia.info",
    siteName: "Sumit Gill — Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit Gill | Full-Stack Developer",
    description: "Building exceptional web & mobile experiences with modern technologies.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CustomCursor />
          <ScrollProgress />
          <GlobalCalendly />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

