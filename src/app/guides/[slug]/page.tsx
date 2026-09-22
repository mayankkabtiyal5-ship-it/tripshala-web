import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { TripPhoto } from "@/components/ui/TripPhoto";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { TripCard } from "@/components/TripCard";
import { Button } from "@/components/ui/Button";
import { getPostBySlug, posts, BlogContentBlock } from "@/lib/blog";
import { getTripBySlug } from "@/lib/trips";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
      type: "article",
    },
  };
}

function ContentBlockView({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-8 font-display text-2xl font-bold">{block.text}</h2>;
    case "paragraph":
      return <p className="mt-4 text-muted">{block.text}</p>;
    case "list":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted">
              <span className="text-accent">✓</span> {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-2 border-accent pl-4 text-lg italic text-ink">
          {block.text}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedTrips = (post.relatedTripSlugs ?? [])
    .map((s) => getTripBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    image: post.coverImage ? `${site.url}${post.coverImage}` : undefined,
  };

  const faqJsonLd = post.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      )}

      <section className="border-b border-line bg-paper-raised">
        <Container className="py-10 md:py-14">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted">
            <span>{post.publishedDate}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 md:grid-cols-3">
        <article className="md:col-span-2">
          {post.coverImage ? (
            <TripPhoto src={post.coverImage} alt={post.coverImageLabel} aspect="aspect-[16/9]" priority />
          ) : (
            <PlaceholderMedia label={post.coverImageLabel} aspect="aspect-[16/9]" />
          )}

          <div className="mt-2">
            {post.content.map((block, i) => (
              <ContentBlockView key={i} block={block} />
            ))}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-4">
                <FAQAccordion items={post.faqs} />
              </div>
            </section>
          )}
        </article>

        <aside className="h-fit space-y-6 md:sticky md:top-24">
          {relatedTrips.length > 0 && (
            <div className="rounded-2xl border border-line bg-white p-5">
              <h2 className="font-display text-lg font-bold">
                {relatedTrips.length > 1 ? "Related trips" : "Book this trip"}
              </h2>
              <div className="mt-4 space-y-4">
                {relatedTrips.slice(0, 3).map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-line bg-paper-raised p-5 text-center">
            <p className="text-sm text-muted">Have a question we didn&apos;t cover?</p>
            <div className="mt-3">
              <Button href="/faq" variant="outline" className="w-full">
                Read our FAQ
              </Button>
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
