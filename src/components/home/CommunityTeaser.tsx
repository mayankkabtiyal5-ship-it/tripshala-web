import { Container } from "../ui/Container";
import { PlaceholderMedia } from "../ui/PlaceholderMedia";
import { Button } from "../ui/Button";

const testimonials = [
  {
    quote: "SAMPLE TESTIMONIAL — replace with a real one before launch. e.g. 'Went in not knowing anyone, came back with a group I still ride with.'",
    name: "Sample rider, Sakleshpur trip",
  },
  {
    quote: "SAMPLE TESTIMONIAL — replace with a real one before launch. e.g. 'Zero planning on my end. Just showed up and it was sorted.'",
    name: "Sample traveller, Coorg trip",
  },
];

export function CommunityTeaser() {
  return (
    <section className="border-b border-line py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">The people make the trip.</h2>
          <Button href="/community" variant="outline">See the community</Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PlaceholderMedia label="Group photo at a chai stop" />
          <PlaceholderMedia label="Bikes lined up at a homestay" />
          <PlaceholderMedia label="Bonfire evening, Chikmagalur trip" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-2xl border border-dashed border-line bg-paper-raised p-6 text-sm italic text-muted">
              &ldquo;{t.quote}&rdquo;
              <footer className="mt-3 not-italic font-medium text-ink">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
