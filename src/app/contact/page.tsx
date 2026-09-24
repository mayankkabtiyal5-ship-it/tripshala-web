import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Tripshala on WhatsApp or email — for trip enquiries, referrals or partnerships.",
};

const options = [
  {
    title: "General enquiry",
    body: "Not sure which trip, or just want to know more about how Tripshala works.",
    action: whatsappMessages.general(),
    cta: "Talk to Tripshala",
  },
  {
    title: "Referral",
    body: "Want to bring a friend or ask how the referral programme works.",
    action: whatsappMessages.referral(),
    cta: "Ask about referrals",
  },
  {
    title: "Partnership",
    body: "Homestays, cafés, gear brands or communities wanting to work with us.",
    action: whatsappMessages.partnership(),
    cta: "Talk partnerships",
  },
];

export default function ContactPage() {
  return (
    <Container className="py-14">
      <h1 className="font-display text-4xl font-medium">Talk to Tripshala</h1>
      <p className="mt-3 max-w-xl text-muted">
        WhatsApp is the fastest way to reach us — pick the reason below and
        we&apos;ll open a chat with the right message already started.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {options.map((o) => (
          <div key={o.title} className="flex flex-col rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-semibold">{o.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted">{o.body}</p>
            <Button
              href={o.action}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              className="mt-4"
            >
              {o.cta}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-raised p-6 text-sm text-muted">
        Prefer email? Write to{" "}
        <a href={`mailto:${site.contactEmail}`} className="font-medium text-ink underline">
          {site.contactEmail}
        </a>
        . {site.name} is based in {site.city}.
      </div>
    </Container>
  );
}
