import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { PlaceholderMedia } from "./ui/PlaceholderMedia";
import { TripPhoto } from "./ui/TripPhoto";
import { Badge } from "./ui/Badge";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/guides/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg"
    >
      {post.coverImage ? (
        <TripPhoto
          src={post.coverImage}
          alt={post.coverImageLabel}
          aspect="aspect-[4/3]"
          className="rounded-none rounded-t-2xl border-0 border-b border-line"
        />
      ) : (
        <PlaceholderMedia label={post.coverImageLabel} aspect="aspect-[4/3]" className="rounded-none rounded-t-2xl border-0 border-b border-line" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold leading-snug group-hover:text-accent">
          {post.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-sm text-muted">
          <span>{post.publishedDate}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
