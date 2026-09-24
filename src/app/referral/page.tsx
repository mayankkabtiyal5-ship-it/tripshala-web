import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ReferralCodeTool } from "@/components/ReferralCodeTool";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Referral Programme",
  description: "Bring a friend on a Tripshala trip and both of you get rewarded.",
};

// NOTE FOR MAYANK: change REFERRAL_CREDIT below and it updates everywhere
// on this page.
const REFERRAL_CREDIT = 299;

export default function ReferralPage() {
  return (
    <Container className="py-14">
      <h1 className="font-display text-4xl font-medium">Bring a friend. Ride more. Pay less.</h1>
      <p className="mt-3 max-w-xl text-muted">
        Tripshala grows through the people already on it — not just ads. Get your code below, no waiting on us.
      </p>

      <section className="mt-10 grid gap-6 sm:grid-cols-3">
        <Step number="1" title="Get your code" body="Enter your name and phone below — your code and shareable link show up instantly." />
        <Step number="2" title="Share your link" body="Send your link on WhatsApp. It fills the code in automatically when your friend books — nothing for them to type or remember." />
        <Step number="3" title="You both get rewarded" body="Once their trip is confirmed, the reward lands for both of you." />
      </section>

      <section className="mt-14 max-w-xl">
        <h2 className="font-display text-2xl font-medium">Get your code</h2>
        <div className="mt-4">
          <ReferralCodeTool />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-medium">What you both get</h2>
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

      <p className="mt-10 text-center text-sm text-muted">
        Questions about how it works?{" "}
        <Button href={whatsappMessages.referral()} target="_blank" rel="noopener noreferrer" variant="whatsapp" className="ml-2">
          Ask on WhatsApp
        </Button>
      </p>
    </Container>
  );
}

function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-medium text-accent">{number}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
