import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getSupabaseServerClient } from "@/lib/supabase";

// Internal-only. Not linked from nav, not in the sitemap, disallowed in
// robots.ts, and gated behind a shared-secret query param below — there's
// no accounts/login system on this site, so this is the lightweight
// equivalent: set INTERNAL_DASHBOARD_KEY in Vercel, then open this page as
// /internal/referrals?key=that-value. Treat the URL itself as a secret.

export const metadata: Metadata = {
  title: "Referrals (internal)",
  robots: { index: false, follow: false },
};

interface LeadRow {
  id: string;
  created_at: string;
  trip_slug: string | null;
  trip_name: string | null;
  name: string;
  phone: string;
  referral_code: string | null;
  status: string;
}

export default async function InternalReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!process.env.INTERNAL_DASHBOARD_KEY || key !== process.env.INTERNAL_DASHBOARD_KEY) {
    // Deliberately generic — this should look like any other unknown route,
    // not confirm that a protected page exists at this URL.
    return (
      <Container className="py-14">
        <p className="text-sm text-muted">Not found.</p>
      </Container>
    );
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return (
      <Container className="py-14">
        <h1 className="font-display text-3xl font-extrabold">Referral codes</h1>
        <p className="mt-3 text-sm text-muted">
          Supabase isn&apos;t configured yet (see DEPLOYMENT.md) — there&apos;s nothing to show until leads start
          being saved there.
        </p>
      </Container>
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at, trip_slug, trip_name, name, phone, referral_code, status")
    .not("referral_code", "is", null)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return (
      <Container className="py-14">
        <h1 className="font-display text-3xl font-extrabold">Referral codes</h1>
        <p className="mt-3 text-sm text-muted">Couldn&apos;t load referrals right now — try again shortly.</p>
      </Container>
    );
  }

  const groups = new Map<string, LeadRow[]>();
  for (const row of data as LeadRow[]) {
    const code = row.referral_code as string;
    if (!groups.has(code)) groups.set(code, []);
    groups.get(code)!.push(row);
  }
  const codes = Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <Container className="py-14">
      <h1 className="font-display text-3xl font-extrabold">Referral codes</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        {codes.length} code{codes.length === 1 ? "" : "s"} in use. A code&apos;s owner is whoever generated it on
        /referral; every other row under it is someone who entered that code while booking. This page is
        read-only — mark an actual reward as paid by updating that lead&apos;s <code>status</code> in the
        Supabase Table Editor.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {codes.length === 0 && <p className="text-sm text-muted">No referral activity yet.</p>}

        {codes.map(([code, rows]) => {
          const issuer = rows.find((r) => r.trip_slug === "referral-code-issued");
          const uses = rows.filter((r) => r.trip_slug !== "referral-code-issued");
          return (
            <div key={code} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-display text-lg font-bold tracking-wide">{code}</span>
                  {issuer && (
                    <span className="ml-2 text-sm text-muted">
                      — {issuer.name} ({issuer.phone})
                    </span>
                  )}
                </div>
                <span className="rounded-full bg-paper-raised px-3 py-1 text-xs font-semibold text-muted">
                  {uses.length} use{uses.length === 1 ? "" : "s"}
                </span>
              </div>

              {uses.length > 0 ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase text-muted">
                        <th className="pb-2 pr-4 font-medium">Name</th>
                        <th className="pb-2 pr-4 font-medium">Phone</th>
                        <th className="pb-2 pr-4 font-medium">Trip</th>
                        <th className="pb-2 pr-4 font-medium">Date</th>
                        <th className="pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uses.map((row) => (
                        <tr key={row.id} className="border-t border-line">
                          <td className="py-2 pr-4">{row.name}</td>
                          <td className="py-2 pr-4">{row.phone}</td>
                          <td className="py-2 pr-4">{row.trip_name || "—"}</td>
                          <td className="py-2 pr-4">{new Date(row.created_at).toLocaleDateString("en-IN")}</td>
                          <td className="py-2">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">No bookings with this code yet.</p>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
