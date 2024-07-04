import Link from "next/link";

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-2">
      {tags.map((tag: string) => (
        <Link key={tag} href={`/cats/tag/${tag}`}>
          <span className="font-bold text-sky-300">{`#${tag} `}</span>
        </Link>
      ))}
    </div>
  );
}
