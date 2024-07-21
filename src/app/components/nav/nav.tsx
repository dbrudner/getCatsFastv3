"use client";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserNotificationsNavButton from "./user-notifications-nav-button";

const highlighItem = (shouldHighlight: boolean) => {
  return classNames(shouldHighlight ? "text-white" : "text-slate-600");
};

function useHighlightNavItemIfPathMatches() {
  const pathname = usePathname();

  return (path: string) => highlighItem(path === pathname);
}

export function useHighlightNavIconButtonIfActive() {
  const highlightNavIconButtonIfPathMatches =
    useHighlightNavItemIfPathMatches();

  return (path: string) =>
    classNames(
      highlightNavIconButtonIfPathMatches(path),
      baseNavIconButtonClassnames,
    );
}

function NavItem({ path, children }: NavItemProps) {
  return <Link href={path}>{children}</Link>;
}

type NavIconButtonProps = {
  path: string;
  Icon: (className: string) => JSX.Element;
};

function NavIconButton({ path, Icon }: NavIconButtonProps) {
  const highlightNavIconButtonIfActive = useHighlightNavIconButtonIfActive();

  return (
    <NavItem path={path}>
      <IconButton className={highlightNavIconButtonIfActive(path)}>
        {Icon(highlightNavIconButtonIfActive(path))}
      </IconButton>
    </NavItem>
  );
}

export const baseNavIconButtonClassnames = "w-10 h-10";
const bottomMobileNavClassNames =
  "fixed bottom-0 left-0 w-screen flex flex-row items-center justify-around p-4 bg-black border-slate-700 border-t lg:bg-transparent bg-slate-900";
const sideNavClassNames =
  "lg:start-auto lg:flex-col lg:gap-y-4 lg:h-screen lg:top-0 lg:left-0 lg:w-24 lg:items-center lg:border-t-0 lg:justify-start fixed";

type NavItemProps = {
  path: string;
  children: React.ReactNode;
};

function mapClassNameToNavIconButton(Icon: any) {
  return function (className: string) {
    return <Icon className={className} />;
  };
}

export default function Nav() {
  const highlightNavItemIfActive = useHighlightNavItemIfPathMatches();
  const navClassNames = classNames(
    sideNavClassNames,
    bottomMobileNavClassNames,
  );

  return (
    <div className={navClassNames}>
      <div className="hidden md:block">
        <NavItem path="/cats">
          <Button variant="text" size="small">
            <span className={highlightNavItemIfActive("/cats")}>Cats</span>
          </Button>
        </NavItem>
      </div>
      <NavIconButton Icon={mapClassNameToNavIconButton(HomeIcon)} path="/" />
      <NavIconButton
        Icon={mapClassNameToNavIconButton(PlusIcon)}
        path="/cat/new"
      />
      <UserNotificationsNavButton />
      <SignedIn>
        <SignOutButton>
          <span className="hover:text-white text-slate-600 cursor-pointer">
            Log Out
          </span>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <Link href="/signin">
          <span className="hover:text-white text-slate-600 cursor-pointer">
            Sign In
          </span>
        </Link>
      </SignedOut>
    </div>
  );
}
