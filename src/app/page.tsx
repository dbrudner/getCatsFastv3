import Link from "next/link";
import { GetCatsLinkCard, SendCatsLinkCard } from "./components/card";

function TermsAndConditions() {
  return (
    <Link className="text-blue-500" href="/terms-and-conditions">
      Terms and Conditions
    </Link>
  );
}

function FooterLinks() {
  return (
    <div className="flex gap-x-2 justify-center">
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/partners">Partners</Link>
    </div>
  );
}

function ActionsContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row flex-between w-full justify-center md:justify-between gap-10">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen-md m-auto flex-col items-center justify-center p-4 md:p-0">
      <div className="w-full mb-10">
        <h1 className="text-6xl font-bold text-white">
          Welcome to{" "}
          <span className="text-sky-300 text-8xl hidden md:inline">
            GetCatsFast
          </span>
          <span className="text-sky-300 text-6xl md:text-8xl inline md:hidden">
            Get Cats Fast
          </span>
        </h1>
        <p className="text-2xl text-slate-600">
          The fastest way to get cats there is.
        </p>
      </div>
      <ActionsContainer>
        <GetCatsLinkCard />
        <SendCatsLinkCard />
      </ActionsContainer>
    </main>
  );
}
