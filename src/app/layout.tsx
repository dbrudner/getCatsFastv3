import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get Cats Fast",
  description: "Get Cats Really Fast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} min-h-screen`}>
        {children} <Analytics />
      </body>
    </html>
  );
}
