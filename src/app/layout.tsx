import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider, SignOutButton, SignedIn } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { IconButton, ThemeProvider } from "@mui/material";
import GetCatsFastThemeProvider from "./theme";
import Link from "next/link";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";
import classNames from "classnames";
import Nav from "@/components/nav/nav";

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
      <AppRouterCacheProvider>
        <GetCatsFastThemeProvider>
          <html lang="en">
            <body
              className={`${workSans.className} min-h-screen bg-black text-white relative`}
            >
              {children} <Analytics />
              <Nav />
            </body>
          </html>
        </GetCatsFastThemeProvider>
      </AppRouterCacheProvider>
    </ClerkProvider>
  );
}
