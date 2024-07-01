import { getLikes } from "@/actions/likes";
import { Cat } from "@/lib/core";
import Link from "next/link";
import DeleteCatButton from "../delete-cat-button";
import { LikeButton } from "./like-button";
import Image from "next/image";
import classnames from "classnames";

function timeAgo(date: Date) {
  const now = new Date();
  //@ts-ignore
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) {
    return seconds <= 1 ? 'a few seconds ago' : `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? 'one day ago' : `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? 'one month ago' : `${months} months ago`;
  }

  const years = Math.floor(days / 365);
  return years === 1 ? 'a year ago' : `${years} years ago`;

}

type CatCardProps = {
  cat: Cat;
  activeHashTag: string;
}

const mapCatTitle = (activeHashtag: string) => (string: string) => {
  if (string[0] === "#" && string.length > 1) {
    const className = classnames("font-bold", "#" + activeHashtag === string ? "text-orange-400" : "text-sky-300");
    return <Link key={string} href={`/cats/tag/${string.slice(1)}`}><span className={className}>{string}{" "}</span></Link>
  }
  return <span className="">{string + " "}</span>
}

function CatDescriptionWithHashTags({ cat, activeHashTag = "" }: { cat: Cat, activeHashTag: string; }) {
  {
    return <div className="flex flex-col gap-y-2">
      <div className="flex flex-wrap gap-x-2">
        {cat.title.split(" ").map(mapCatTitle(activeHashTag))}
      </div>
    </div>
  }
}

export default function CatCard({ cat, activeHashTag }: CatCardProps) {
  return <div key={cat.id}>
    <div className="flex flex-col relative">
      <p className="text-sm tracking-tighter leading-4 text-slate-400 font-extralight mb-1 text-right">{timeAgo(cat?.createdAt)}</p>
      <div>
        <Link href={`/cat/${cat.id}`}>
          <Image
            src={cat.image}
            width={1200}
            height={1200}
            alt={cat.title}
          />
        </Link>
      </div>
      <div className="flex justify-between items-start mt-1">
        <CatDescriptionWithHashTags cat={cat} activeHashTag={activeHashTag} />
      </div>

    </div>

  </div >
}

