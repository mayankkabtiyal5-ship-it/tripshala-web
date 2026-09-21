import { Container } from "../ui/Container";

const benefits = [
  {
    icon: "🧭",
    title: "Curated routes",
    body: "We figure out where to go and how to get there, from ghat roads to lesser-known heritage towns.",
  },
  {
    icon: "🫂",
    title: "Good people",
    body: "Meet riders and travellers who also want to get out of the city for a weekend — most trips run in small groups on purpose.",
  },
  {
    icon: "💬",
    title: "No planning headache",
    body: "You don't need 47 messages in a group chat to decide where you're going. We've already decided.",
  },
  {
    icon: "🔁",
    title: "Different every weekend",
    body: "Rides, hidden places, food stops, nature and heritage — the format changes, the quality doesn't.",
  },
];

export function WhyTripshala() {
  return (
    <section className="border-b border-line bg-paper-raised py-16">
      <Container>
        <h2 className="font-display text-3xl font-bold">Why Tripshala</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-line bg-white p-6">
              <div className="text-3xl">{b.icon}</div>
              <h3 className="mt-3 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
