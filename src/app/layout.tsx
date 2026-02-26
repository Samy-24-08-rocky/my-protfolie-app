import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Sumit Gill | Professional Software Developer Portfolio",
  description: "Explore the portfolio of Sumit Gill, a skilled Software Developer specializing in React, Next.js, Flutter, and Android development.",
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
