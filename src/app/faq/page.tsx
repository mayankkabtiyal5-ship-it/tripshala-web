import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we get asked most before someone books a Tripshala trip.",
};

const groups = [
  {
    heading: "Who can join",
    items: [
      { question: "Is there an age limit?", answer: "Tripshala trips are for adults, 18 and up — there's no upper age limit. Some trips are more physically demanding than others; check the difficulty level on each trip page." },
      { question: "Can I come alone?", answer: "Yes — most of our travellers start out solo. It's genuinely one of the easiest ways to meet people in Bengaluru who also want to get out of the city." },
      { question: "Is this beginner-friendly?", answer: "Depends on the trip. Bike rides list a difficulty level and expected riding experience; Tempo Traveller and bus trips generally need no prior experience at all." },
      { question: "New to Bengaluru — is this still for me?", answer: "Yes, several of our regulars started exactly this way. It's a fast way to build a local circle." },
    ],
  },
  {
    heading: "Bikes, Tempo Travellers and buses",
    items: [
      { question: "Do I need my own bike?", answer: "Only for trips explicitly listed as bike-ride trips. Every trip page states its transport mode clearly." },
      { question: "What if I don't ride?", answer: "Choose a trip that uses a Tempo Traveller or bus instead — same destinations, same planning, no riding required." },
      { question: "Is my bike required to meet any condition?", answer: "Yes — before every bike-ride trip, do a quick check: tyres (tread and air pressure), brakes (front and rear), headlight/taillight working, chain lubricated, and no fluid leaks. You'll also need a valid driving licence, RC and PUC certificate for your bike, and your own ISI-marked helmet. If anything's unsure, message us on WhatsApp before the trip and we'll help you sort it." },
    ],
  },
  {
    heading: "Safety",
    items: [
      { question: "What's the safety process on a ride?", answer: "Every trip has a lead rider out front and a sweep rider at the back, so no one gets left behind. You get a route briefing before departure, and the trip's WhatsApp group is used for live updates and to flag any issue — a breakdown, a slower pace needed, or a route change. If you break down, the group is notified immediately and the trip waits or arranges help before continuing." },
      { question: "What happens if the weather changes?", answer: "The trip lead makes the call on route or schedule changes, and updates go out on the trip's WhatsApp group immediately." },
      { question: "What should I carry?", answer: "A packing list specific to each trip is shared after booking. General basics: ID, any medication you need, water, and weather-appropriate layers." },
    ],
  },
  {
    heading: "Booking, payments and cancellations",
    items: [
      { question: "How do I book?", answer: "Fill the short form on any trip page — it opens WhatsApp with your details pre-filled. A real person confirms your seat from there." },
      { question: "How do I pay?", answer: "Payment is confirmed manually over WhatsApp after you book — a real person will share payment details and confirm your seat once you've paid. We don't take payment through the website." },
      { question: "What's the cancellation policy?", answer: "See our full Cancellation & Refund Policy — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
      { question: "Where do we meet?", answer: "Each trip's exact assembly point is shared after booking, and again the day before departure." },
      { question: "What's the group size?", answer: "Varies by trip — check the trip page's Quick Info section for the exact cap." },
    ],
  },
  {
    heading: "Stay and food",
    items: [
      { question: "What's the stay like?", answer: "Usually a homestay or budget-comfort guesthouse, twin/triple sharing — specified per trip." },
      { question: "Is food included?", answer: "Varies by trip — check the Included/Not Included section on each trip page." },
    ],
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <Container className="py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <h1 className="font-display text-4xl font-extrabold">Frequently asked questions</h1>
      <p className="mt-3 max-w-xl text-muted">
        Can&apos;t find your answer here? Just ask — a real person replies on WhatsApp.
      </p>

      <div className="mt-10 space-y-10">
        {groups.map((g) => (
          <section key={g.heading}>
            <h2 className="font-display text-xl font-bold">{g.heading}</h2>
            <div className="mt-4">
              <FAQAccordion items={g.items} />
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-paper-raised p-8 text-center">
        <h2 className="font-display text-xl font-bold">Still have a question?</h2>
        <div className="mt-4">
          <Button href={whatsappMessages.general()} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            Ask us on WhatsApp
          </Button>
        </div>
      </div>
    </Container>
  );
}
