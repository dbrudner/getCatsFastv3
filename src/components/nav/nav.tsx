"use client";
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const baseNavItemClassnames = "w-8 h-8 text-slate-600";

type NavItemProps = {
  path: string;
  children: React.ReactNode;
};

function NavItem({ path, children }: NavItemProps) {
  return (
    <Link href={path}>
      <IconButton>{children}</IconButton>
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();

  function highlightIconIfActive(path: string) {
    return classNames(baseNavItemClassnames, {
      "text-white": pathname === path,
    });
  }

  const bottomMobileNavClassNames =
    "fixed bottom-0 left-0 w-screen flex flex-row justify-around p-4 bg-black border-indigo-500 border-t-2";

  const sideNavClassNames =
    "lg:start-auto lg:flex-col lg:gap-y-4 lg:h-screen lg:top-0 lg:left-0 lg:w-24 lg:items-center lg:border-t-0 lg:justify-start fixed";

  const navClassNames = classNames(
    sideNavClassNames,
    bottomMobileNavClassNames
  );

  return (
    <div className={navClassNames}>
      <NavItem path="/cats">
        <p className={highlightIconIfActive("/cats")}>Cats</p>
      </NavItem>
      <NavItem path="/">
        <HomeIcon className={highlightIconIfActive("/")} />
      </NavItem>
      <NavItem path="/cat/new">
        <PlusIcon className={highlightIconIfActive("/cat/new")} />
      </NavItem>
    </div>
  );
}
