import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Referral Programme",
  description: "Bring a friend on a Tripshala trip and both of you get rewarded.",
};

// Three commercially sensible reward options — pick ONE for v1 (ride credit
// is implemented as the default below since it costs nothing until it's
// redeemed on a real trip, unlike a cash or merchandise reward).
const rewardOptions = [
  {
    name: "Ride credit (recommended for v1)",
    body: "Both the referrer and the friend get ₹[X] credit toward their next Tripshala trip. Costs nothing until redeemed on an actual booking, and keeps both people coming back.",
  },
  {
    name: "Straight discount",
    body: "The friend books at ₹[X] off; the referrer gets the same off their next trip. Simpler to explain, but has to be funded out of margin on the very next booking.",
  },
  {
    name: "Merchandise / experience upgrade",
    body: "A Tripshala cap, a free upgraded stay, or a seat priority for their next popular trip. Costs less cash but takes more operational effort to fulfil consistently.",
  },
];

export default function ReferralPage() {
  return (
    <Container className="py-14">
      <h1 className="font-display text-4xl font-extrabold">Bring a friend. Ride more. Pay less.</h1>
      <p className="mt-3 max-w-xl text-muted">
        Tripshala grows through the people already on it — not just ads. Here&apos;s how referrals work.
      </p>

      <section className="mt-10 grid gap-6 sm:grid-cols-3">
        <Step number="1" title="Get your code" body="Every rider gets a personal referral code — ask for yours on WhatsApp." />
        <Step number="2" title="Friend books with it" body="Your friend enters your code in the referral field when booking any trip." />
        <Step number="3" title="You both get rewarded" body="Once their trip is confirmed, the reward lands for both of you." />
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Reward structure — 3 options</h2>
        <p className="mt-2 text-sm text-muted">
          SAMPLE — pick one before launch and delete the other two from this page. Ride credit is implemented as the v1 default in the booking form.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {rewardOptions.map((r) => (
            <div key={r.name} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-semibold">{r.name}</h3>
              <p className="mt-2 text-sm text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-dashed border-line bg-paper-raised p-6 text-sm text-muted">
        <strong className="text-ink">Preventing abuse (set this up before launch):</strong> cap rewards to one per confirmed (not just booked) trip, require the friend to be a genuinely new customer, and hold the reward until after the referred trip is completed — not at the point of booking.
      </section>

      <div className="mt-10 text-center">
        <Button href={whatsappMessages.referral()} target="_blank" rel="noopener noreferrer" variant="whatsapp">
          Get my referral code
        </Button>
      </div>
    </Container>
  );
}

function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold text-accent">{number}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
