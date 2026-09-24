import { Container } from "@/components/ui/Container";

export default function LoadingTrips() {
  return (
    <Container className="py-12" aria-busy="true">
      <div className="skeleton h-5 w-40 rounded-full" />
      <div className="skeleton mt-4 h-12 w-80 rounded-xl" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
            <div className="skeleton aspect-[4/3]" />
            <div className="space-y-3 p-5">
              <div className="skeleton h-4 w-24 rounded-full" />
              <div className="skeleton h-6 w-3/4 rounded-lg" />
              <div className="skeleton h-4 w-full rounded-full" />
              <div className="skeleton h-4 w-2/3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
