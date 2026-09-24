import Link from "next/link";
import { Container } from "./ui/Container";
import { site } from "@/lib/site";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="print:hidden border-t border-line bg-paper-raised">
      <Container className="grid gap-10 py-16 md:grid-cols-4 md:py-20">
        <div>
          <Logo />
          <p className="mt-4 font-display text-lg italic leading-snug text-ink/80">{site.brandLine}</p>
          <p className="mt-3 text-sm text-muted">{site.description}</p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/trips" className="hover:text-ink">Trips</Link></li>
            <li><Link href="/corporate-school-trips" className="hover:text-ink">Corporate &amp; School Trips</Link></li>
            <li><Link href="/guides" className="hover:text-ink">Guides</Link></li>
            <li><Link href="/community" className="hover:text-ink">Community</Link></li>
            <li><Link href="/about" className="hover:text-ink">About</Link></li>
            <li><Link href="/faq" className="hover:text-ink">FAQ</Link></li>
            <li><Link href="/standard" className="hover:text-ink">The Tripshala Standard</Link></li>
            <li><Link href="/referral" className="hover:text-ink">Refer a friend — earn ₹299</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">Connect</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Instagram — @{site.instagramHandle}
              </a>
            </li>
            <li>
              <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Facebook
              </a>
            </li>
            <li><Link href="/contact" className="hover:text-ink">WhatsApp / Contact</Link></li>
            <li>
              <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                +91 {site.whatsappNumber.slice(2, 7)} {site.whatsappNumber.slice(7)}
              </a>
            </li>
            <li><a href={`mailto:${site.contactEmail}`} className="hover:text-ink">{site.contactEmail}</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">Policies</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/policies/terms" className="hover:text-ink">Terms</Link></li>
            <li><Link href="/policies/privacy" className="hover:text-ink">Privacy</Link></li>
            <li><Link href="/policies/cancellation" className="hover:text-ink">Cancellation &amp; Refund</Link></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. Based in {site.city}.
      </div>
    </footer>
  );
}
