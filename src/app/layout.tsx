import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Sumit Gill | Professional Software Developer & UI/UX Expert",
  description: "Explore the portfolio of Sumit Gill, a skilled Software Engineer and Full-Stack Developer specializing in React, Next.js, Flutter, and Android development. Crafting rich digital experiences.",
  keywords: ["Sumit Gill", "Software Developer", "Full Stack Developer", "React Developer", "Next.js", "Flutter Developer", "Android Developer", "Web Design", "Portfolio"],
  authors: [{ name: "Sumit Gill" }],
  creator: "Sumit Gill",
  openGraph: {
    title: "Sumit Gill | Software Developer",
    description: "I build exceptional and accessible digital experiences for the web and mobile.",
    url: "https://sumitgill.dev", // Replace with your real URL when deployed
    siteName: "Sumit Gill Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit Gill | Software Developer",
    description: "I build exceptional and accessible digital experiences for the web and mobile.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
