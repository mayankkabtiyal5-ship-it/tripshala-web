import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Referral Programme",
  description: "Bring a friend on a Tripshala trip and both of you get rewarded.",
};

// NOTE FOR MAYANK: ₹500 is a reasonable starting credit amount for trips in
// the ₹799–₹10,999 range, but it's your call — change REFERRAL_CREDIT below
// and it updates everywhere on this page.
const REFERRAL_CREDIT = 500;

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
        <h2 className="font-display text-2xl font-bold">What you both get</h2>
        <div className="mt-4 rounded-2xl border border-line bg-white p-6">
          <p className="text-sm text-muted">
            Once your friend&apos;s trip is confirmed, you both get{" "}
            <strong className="text-ink">₹{REFERRAL_CREDIT.toLocaleString("en-IN")} credit</strong> toward
            your next Tripshala trip. It costs nothing until it&apos;s actually redeemed on a real booking, and
            it&apos;s the same reward every time — no confusing tiers.
          </p>
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
