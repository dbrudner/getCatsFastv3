import { SignOutButton } from "@clerk/nextjs";
import {
  HomeIcon,
  PlusIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";

export default function Nav() {
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
      <Link href="/cats">
        <IconButton>
          <HomeIcon className="w-10 h-10" />
        </IconButton>
      </Link>
      <Link href="/cat/new">
        <IconButton>
          <PlusIcon className="w-10 h-10" />
        </IconButton>
      </Link>
    </div>
  );
}
