import { Container } from "../ui/Container";

const steps = [
  {
    number: "01",
    title: "Pick a trip",
    body: "Find a ride or getaway that looks like your kind of weekend — filter by bike ride, weekend, heritage, nature or however you like to travel.",
  },
  {
    number: "02",
    title: "Book your spot",
    body: "Join solo or bring your people. A short form and a WhatsApp message is all it takes.",
  },
  {
    number: "03",
    title: "Show up and explore",
    body: "We've handled the route, the stops and the stay. You just need to show up with a full tank or a packed bag.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-line py-16">
      <Container>
        <h2 className="font-display text-3xl font-bold">How Tripshala works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.number}>
              <div className="font-display text-4xl font-extrabold text-accent">{s.number}</div>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
