import { Container } from "@/components/ui/Container";

// Skeleton shown while a trip page streams in during client navigation.
export default function LoadingTrip() {
  return (
    <div aria-busy="true" aria-label="Loading trip">
      <section className="border-b border-line bg-paper-raised">
        <Container className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
          <div className="skeleton aspect-[4/3] w-full rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-6 w-40 rounded-full" />
            <div className="skeleton h-12 w-4/5 rounded-xl" />
            <div className="skeleton h-12 w-3/5 rounded-xl" />
            <div className="skeleton h-5 w-2/3 rounded-full" />
            <div className="skeleton h-10 w-48 rounded-full" />
          </div>
        </Container>
      </section>
      <Container className="grid gap-12 py-12 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <div className="skeleton h-8 w-48 rounded-xl" />
          <div className="skeleton h-40 w-full rounded-2xl" />
          <div className="skeleton h-64 w-full rounded-2xl" />
        </div>
        <div className="skeleton h-96 w-full rounded-2xl" />
      </Container>
    </div>
  );
}
