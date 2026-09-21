import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <div className="font-display text-6xl font-extrabold text-accent">404</div>
      <h1 className="mt-4 font-display text-2xl font-bold">
        Looks like we&apos;re between adventures here.
      </h1>
      <p className="mt-2 max-w-sm text-muted">
        This page took a wrong turn. The trips didn&apos;t.
      </p>
      <div className="mt-6">
        <Button href="/trips" variant="primary">See upcoming trips</Button>
      </div>
    </Container>
  );
}
