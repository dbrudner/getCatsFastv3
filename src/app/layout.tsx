import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import GetCatsFastThemeProvider from "./theme";
import AppProvider from "@/components/app-provider";
import Nav from "@/components/nav/nav";
import { StyledEngineProvider } from "@mui/material";

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
  const containerClassName = `min-h-screen bg-black text-white relative mb-40 md:mb-0 px-3 lg:p-0 absolute ${workSans.className}`

  return (
    <ClerkProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <StyledEngineProvider injectFirst>
        <GetCatsFastThemeProvider>
          <html lang="en">
            <body
              className={containerClassName}
            >
              <AppProvider>

                <div className="m-auto max-w-screen-sm">
                  {children}

                </div>
                <Analytics />
                <Nav />
              </AppProvider>

            </body>
          </html>
        </GetCatsFastThemeProvider>
      </StyledEngineProvider>
    </ClerkProvider>
  );
}
