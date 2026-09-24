// Self-serve referral codes — no accounts system on this site, so codes are
// generated deterministically from name + phone instead of being issued and
// stored ahead of time. The same person typing the same name + phone always
// gets the same code back, which means:
//   - nothing needs to be reserved in a database before it can be shown
//   - a returning visitor can always recover their own code by re-entering
//     the same details
//   - collisions are possible in theory (two different people landing on
//     the same 4 letters + last 4 digits) but vanishingly unlikely for a
//     business this size — if that ever becomes a real problem, swap this
//     for a random code stored in a new Supabase table instead.
//
// The code is also logged as a best-effort "referral-code-issued" record in
// the existing `leads` table (see ReferralCodeTool) purely so the internal
// /internal/referrals summary page can label a code with the name of the
// person who owns it — nothing about redemption depends on that record
// existing.

import { site } from "./site";

export function generateReferralCode(name: string, phone: string): string {
  const cleanedName = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
  const namePart = (cleanedName || "TSHA").slice(0, 4).padEnd(4, "X");
  const digits = phone.replace(/\D/g, "");
  const phonePart = digits.slice(-4).padStart(4, "0");
  return `${namePart}${phonePart}`;
}

export function buildReferralLink(code: string): string {
  return `${site.url}/trips?ref=${encodeURIComponent(code)}`;
}

// A referred friend's browser remembers the code here (not cookies — this
// never needs to be read server-side) from the moment they land on a
// ?ref=CODE link until they submit a booking form, however many pages they
// browse in between.
export const REFERRAL_STORAGE_KEY = "tripshala_referral_code";

export function storeReferralCode(code: string) {
  try {
    localStorage.setItem(REFERRAL_STORAGE_KEY, code);
  } catch {
    // Private browsing / storage disabled — the referral simply won't
    // carry through to the booking form. Not worth surfacing to the visitor.
  }
}

export function readStoredReferralCode(): string | null {
  try {
    return localStorage.getItem(REFERRAL_STORAGE_KEY);
  } catch {
    return null;
  }
}
