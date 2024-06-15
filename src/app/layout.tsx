import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import GetCatsFastThemeProvider from "./theme";

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
    <ClerkProvider>
      <AppRouterCacheProvider>
        <GetCatsFastThemeProvider>
          <html lang="en">
            <body
              className={`${workSans.className} min-h-screen bg-black text-white`}
            >
              {children} <Analytics />
            </body>
          </html>
        </GetCatsFastThemeProvider>
      </AppRouterCacheProvider>
    </ClerkProvider>
  );
}
