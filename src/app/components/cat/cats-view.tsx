"use client";
import Masonry from "@mui/lab/Masonry";
import timeAgo from "@/app/utils/time-ago";
import { Cat } from "@/lib/core";
import {
  CakeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyDollarIcon,
  ListBulletIcon,
  PlusIcon,
  StarIcon,
  TableCellsIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import {
  ToggleButtonGroup,
  ToggleButton,
  Link,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteCatButton from "../delete-cat-button";
import { LikeButton } from "./like-button";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";

type CatsMenuItemProps = {
  active: boolean;
  onClick: () => void;
  Icon: any;
  children: React.ReactNode;
};

const CatsMenuItem: React.FC<CatsMenuItemProps> = ({
  active,
  onClick,
  Icon,
  children,
}) => {
  const colorClassName = classNames(
    active ? "text-sky-300" : "text-slate-400",
    "hover:text-sky-300",
  );

  const menuItemClassName = classNames(
    active ? "bg-slate-700" : "bg-slate-900",
    "hover:text-sky-300",
    colorClassName,
  );

  const iconClassName = classNames("w-5 h-5 mr-4");

  const textClassName = classNames("text-sm tracking-widest");

  return (
    <MenuItem onClick={onClick} className={menuItemClassName}>
      <Icon className={iconClassName} />
      <span className={textClassName}>{children}</span>
    </MenuItem>
  );
};

const CatDescriptionWithHashTags = ({ cat }: { cat: Cat }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-wrap gap-x-1 font-bold text-xl">
        {cat.title.split(" ").map(mapCatTitle)}
      </div>
    </div>
  );
};

const mapCatTitle = (string: string) => {
  if (string[0] === "#" && string.length > 1) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        key={string}
        href={`/cats/tag/${string.slice(1)}`}
      >
        <span className="text-sky-300 font-bold text-xl">{string} </span>
      </Link>
    );
  }
  return (
    <span key={string} className="">
      {string}
    </span>
  );
};

type CatCardProps = { cat: Cat; userId: string };

const CatCard: React.FC<CatCardProps> = ({
  cat,
  userId,
}: {
  cat: Cat;
  userId: string;
}) => {
  const isCatOwner = cat.userId === userId;

  return (
    <div>
      <div className="flex flex-col relative">
        <p className="text-sm tracking-tighter leading-4 text-slate-400 font-extralight mb-1 text-right">
          {timeAgo(cat.createdAt)}
        </p>
        <div>
          <Link href={`/cat/${cat.id}`}>
            <Image src={cat.image} width={1200} height={1200} alt={cat.title} />
          </Link>
        </div>
        <div className="flex justify-between items-start mt-1">
          <CatDescriptionWithHashTags cat={cat} />
          <div className="flex flex-col items-end min-w-24">
            <LikeButton catId={cat.id} userId={userId} className="flex" />
          </div>
        </div>

        {isCatOwner && <DeleteCatButton catId={cat.id} />}
      </div>
    </div>
  );
};

type Props = { catsWithLikes: any[]; userId: string };

export default function CatsView({ catsWithLikes, userId }: Props) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [query, setQuery] = useState<"new" | "top" | "best" | "all">("top");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const catsListView = (
    <div className="flex flex-col gap-y-24 items-center mb-48">
      <div className="flex flex-col max-w-full gap-y-10">
        {catsWithLikes.map((catWithLike) => (
          <CatCard key={catWithLike.id} cat={catWithLike} userId={userId} />
        ))}
      </div>
    </div>
  );

  const catsGridView = (
    <div className="mt-5">
      <Masonry columns={3}>
        {catsWithLikes.map((catWithLike) => (
          <Link href={`/cat/${catWithLike.id}`} key={catWithLike.id}>
            <Image
              height={600}
              width={600}
              alt={catWithLike.title}
              src={catWithLike.image}
              key={catWithLike.id}
            />
          </Link>
        ))}
      </Masonry>
    </div>
  );

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>
            <ToggleButtonGroup size="large" value={view}>
              <ToggleButton value="list" onChange={() => setView("list")}>
                <ListBulletIcon className="h-4 w-4" />
              </ToggleButton>
              <ToggleButton value="grid" onChange={() => setView("grid")}>
                <TableCellsIcon className="h-4 w-4" />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            <IconButton onClick={handleClick}>
              {open ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              disableScrollLock
              sx={{
                ".MuiList-root": {
                  py: 0,
                },
              }}
            >
              <CatsMenuItem
                Icon={PlusIcon}
                onClick={() => setQuery("new")}
                active={query === "new"}
              >
                New
              </CatsMenuItem>
              <CatsMenuItem
                Icon={TrophyIcon}
                onClick={() => setQuery("top")}
                active={query === "top"}
              >
                Top
              </CatsMenuItem>
              <CatsMenuItem
                Icon={CakeIcon}
                onClick={() => setQuery("best")}
                active={query === "best"}
              >
                Best
              </CatsMenuItem>
              <CatsMenuItem
                Icon={StarIcon}
                onClick={() => setQuery("all")}
                active={query === "all"}
              >
                All
              </CatsMenuItem>
            </Menu>
          </div>
        </div>

        <div>{view === "list" ? catsListView : catsGridView}</div>
      </div>
    </div>
  );
}
