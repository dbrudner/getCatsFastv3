"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loading from "./loading/loading";
import { CircularProgress, LinearProgress } from "@mui/material";

function OpacityOnHover({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="transition-opacity opacity-85 hover:opacity-100">
      {children}
    </div>
  );
}

function GrowOnHover({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="transform transition-transform hover:scale-105 active:scale-100">
      {children}
    </div>
  );
}

function Card({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4 border-2 rounded-lg text-slate-500 flex flex-col items-center md:items-start hover:text-green-300 hover:bg-slate-800">
      {children}
    </div>
  );
}

function LinkCard({
  title,
  description,
  imageSrc,
  href,
}: Readonly<{
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}>) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative" onClick={() => setClicked(true)}>
      <OpacityOnHover>
        <GrowOnHover>
          <Link href={href}>
            <Card>
              <h2 className="text-5xl font-bold">{title}</h2>
              <p>{description}</p>
              <Image src={imageSrc} alt={title} width="400" height="400" />
              {clicked && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                  <svg width={0} height={0}>
                    <defs>
                      <linearGradient
                        id="circular-progress-gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <CircularProgress
                    sx={{
                      "svg circle": {
                        stroke: "url(#circular-progress-gradient)",
                      },
                    }}
                  />
                </div>
              )}
            </Card>
          </Link>
        </GrowOnHover>
      </OpacityOnHover>
    </div>
  );
}

export function GetCatsLinkCard() {
  return (
    <LinkCard
      title="Get Cats"
      description="Get cats from the internet."
      imageSrc="/getcats.png"
      href="/cats"
    />
  );
}

export function SendCatsLinkCard() {
  return (
    <LinkCard
      title="Send Cat"
      description="Send cat to the internet."
      imageSrc="/sendcats.png"
      href="/cat/new"
    />
  );
}
