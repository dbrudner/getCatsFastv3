import Image from "next/image";
import Link from "next/link";

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

function Card({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-slate-500 flex flex-col items-center md:items-start">
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
  return (
    <div className="">
      <OpacityOnHover>
        <GrowOnHover>
          <Link href={href}>
            <Card>
              <h2 className="text-5xl font-bold">{title}</h2>
              <p>{description}</p>
              <Image src={imageSrc} alt={title} width="400" height="400" />
            </Card>
          </Link>
        </GrowOnHover>
      </OpacityOnHover>
    </div>
  );
}

function GetCatsLinkCard() {
  return (
    <LinkCard
      title="Get Cats"
      description="Get cats from the internet."
      imageSrc="/receive-cats.webp"
      href="/cats"
    />
  );
}

function SendCatsLinkCard() {
  return (
    <LinkCard
      title="New Cat"
      description="Send cat to the internet."
      imageSrc="/send-cats.webp"
      href="/cat/new"
    />
  );
}

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

export default function Home() {
  return (
    <main className="flex min-h-screen m-auto flex-col items-center justify-center p-4 md:p-0">
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
