"use client";
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const baseNavItemClassnames = "text-slate-600";
const baseNavIconButtonClassnames = "w-10 h-10";

type NavItemProps = {
  path: string;
  children: React.ReactNode;
};

function NavItem({ path, children }: NavItemProps) {
  return <Link href={path}>{children}</Link>;
}

export default function Nav() {
  const pathname = usePathname();

  function highlightNavItemIfActive(path: string) {
    return classNames(baseNavItemClassnames, {
      "text-white": pathname === path,
    });
  }

  function highlightNavIconButtonIfActive(path: string) {
    return classNames(
      highlightNavItemIfActive(path),
      baseNavIconButtonClassnames,
    );
  }

  const bottomMobileNavClassNames =
    "fixed bottom-0 left-0 w-screen flex flex-row items-center justify-around p-4 bg-black border-indigo-500 border-t-2";

  const sideNavClassNames =
    "lg:start-auto lg:flex-col lg:gap-y-4 lg:h-screen lg:top-0 lg:left-0 lg:w-24 lg:items-center lg:border-t-0 lg:justify-start fixed";

  const navClassNames = classNames(
    sideNavClassNames,
    bottomMobileNavClassNames,
  );

  return (
    <div className={navClassNames}>
      <NavItem path="/cats">
        <Button variant="text" size="small">Cats</Button>
      </NavItem>
      <NavItem path="/">
        <IconButton>
          <HomeIcon className={highlightNavIconButtonIfActive("/")} />
        </IconButton>
      </NavItem>
      <NavItem path="/cat/new">
        <IconButton>
          <PlusIcon className={highlightNavIconButtonIfActive("/cat/new")} />
        </IconButton>
      </NavItem>
    </div>
  );
}
