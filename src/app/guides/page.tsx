import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/BlogCard";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Trek guides, camping tips and weekend trip round-ups from the Tripshala team — real, practical detail on destinations near Bengaluru.",
};

export default function BlogPage() {
  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl font-medium">Guides</h1>
      <p className="mt-3 max-w-xl text-muted">
        Practical, specific write-ups on the destinations we run trips to — what
        to carry, when to go, and what to actually expect.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
}
