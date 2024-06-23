import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import GetCatsFastThemeProvider from "./theme";
import AppProvider from "@/components/app-provider";

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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <GetCatsFastThemeProvider>
        <html lang="en">
          <body
            className={`${workSans.className} min-h-screen bg-black text-white relative max-w-screen-sm m-auto`}
          >
            <AppProvider>
              {children} <Analytics />
              {/* <Nav /> */}
            </AppProvider>
          </body>
        </html>
      </GetCatsFastThemeProvider>
    </ClerkProvider>
  );
}
