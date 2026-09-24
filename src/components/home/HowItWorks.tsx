import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";

const steps = [
  {
    number: "01",
    title: "Pick a trip",
    body: "Browse rides, hill escapes, heritage weekends and day trips — filter by the kind of weekend you're after.",
  },
  {
    number: "02",
    title: "Reserve your seat",
    body: "Come solo or bring your people. A short form and a quick WhatsApp confirmation, and your seat is held.",
  },
  {
    number: "03",
    title: "Show up",
    body: "The route, the stops and the stay are handled. Arrive at your pickup point with a full tank or a packed bag.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="eyebrow">How it works</p>
        <h2 className="mt-4 max-w-xl text-4xl font-medium leading-[1.1] md:text-5xl">
          Three steps, then the open road.
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.number} delay={i * 110} className="border-t border-ink/10 pt-6">
              <div className="font-display text-5xl font-light italic text-accent">{s.number}</div>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
