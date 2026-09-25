import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { WeekendAlerts } from "../WeekendAlerts";

export function WeekendAlertsSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(110%_90%_at_10%_0%,#6b2e15_0%,#2a1a12_50%,#1c1917_100%)] py-20 text-paper md:py-24">
      <Container>
        <Reveal className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-16">
          <div>
            <p className="eyebrow !text-[#f3b58f]">Weekend alerts</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.08] md:text-5xl">Not this weekend? We&apos;ll tell you about the next one.</h2>
            <p className="mt-4 max-w-md leading-relaxed text-paper/70">
              Every week, one WhatsApp message with the trips leaving soon and how many seats are left — so you hear first, before they fill up.
            </p>
          </div>
          <WeekendAlerts context="homepage" />
        </Reveal>
      </Container>
    </section>
  );
}
