import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "Why Tripshala exists, and how a Tripshala trip actually gets planned.",
};

export default function AboutPage() {
  return (
    <Container className="py-14">
      <h1 className="font-display text-4xl font-extrabold">Why Tripshala exists</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-lg text-muted">
          <p>
            Every Friday, the same conversation happens in a hundred group
            chats across Bengaluru: &ldquo;let&apos;s go somewhere this
            weekend.&rdquo; Everyone agrees. Nobody plans it. By Sunday
            evening, the group chat has 47 unread messages and everyone spent
            the weekend exactly where they started.
          </p>
          <p>
            Tripshala exists to make that Friday conversation actually turn
            into a Saturday morning departure. We find the route. We find the
            stay. We figure out where to stop for breakfast and whether the
            group needs a Tempo Traveller or just a full tank of petrol. You
            show up.
          </p>
          <p>
            We&apos;re not a travel agency selling packages, and we&apos;re
            not a biker gang that happens to tolerate outsiders. We&apos;re
            the group that actually does the planning nobody else wants to
            do — bike rides for people who ride, Tempo Traveller trips for
            people who don&apos;t, and both kinds of people on the same
            WhatsApp group by the end of the weekend.
          </p>
        </div>
        <PlaceholderMedia label="Founder / team photo from an early trip" aspect="aspect-[4/5]" />
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-paper-raised p-8 text-center">
        <h2 className="font-display text-2xl font-bold">Come find out for yourself.</h2>
        <p className="mt-2 text-muted">The next trip is already planned. You just have to show up.</p>
        <div className="mt-5">
          <Button href="/trips" variant="primary">Explore Upcoming Trips</Button>
        </div>
      </div>
    </Container>
  );
}
