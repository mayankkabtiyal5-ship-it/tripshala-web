# Content I need from Mayank (before launch)

Everything below is currently sample/placeholder content, clearly marked in
the code with `SAMPLE`, `TODO`, or `isSample: true`. Here's exactly where
each thing goes.

| What | Where it goes | Current placeholder |
| --- | --- | --- |
| Logo | Replace the text wordmark in `src/components/Header.tsx` (and `Footer.tsx`) with an `<Image>` of your real logo, or keep the text wordmark if that's the actual brand mark | Text: "Tripshala" |
| WhatsApp number | `src/lib/site.ts` → `whatsappNumber` | `"91XXXXXXXXXX"` |
| Contact email | `src/lib/site.ts` → `contactEmail` | `hello@tripshala.in` |
| Instagram handle/URL | `src/lib/site.ts` → `instagramHandle`, `instagramUrl` | `tripshala.in` (this looks correct already — confirm) |
| Real trip dates, prices, seats | `src/lib/trips.ts` — every field is realistic in shape but the values are samples | 5 sample trips, `isSample: true` on each |
| Real trip photos | Replace every `<PlaceholderMedia label="..." />` with a real `<Image>` once you have photography — search the codebase for `PlaceholderMedia` to find every spot (there are ~25) | Labelled placeholder blocks |
| Real testimonials | `src/components/home/CommunityTeaser.tsx` and `src/app/community/page.tsx` — both have a `testimonials` array marked `SAMPLE TESTIMONIAL` | 2-3 sample quotes each |
| Payment link/process | `src/app/faq/page.tsx` ("How do I pay?" answer) and `DEPLOYMENT.md` | Marked SAMPLE, describes manual WhatsApp confirmation |
| Cancellation policy | `src/app/policies/cancellation/page.tsx` and the FAQ entry in `src/app/faq/page.tsx` | Bracketed placeholder terms |
| Terms & Privacy Policy | `src/app/policies/terms/page.tsx`, `src/app/policies/privacy/page.tsx` | Starter templates — **have a professional review these before publishing**, they are not legally sufficient as-is |
| Safety process specifics | `src/app/faq/page.tsx` ("Safety" section) — ride-leader process, emergency contact, bike-readiness checklist | Marked SAMPLE — see Section 44 of your brief for what to define operationally first |
| Referral reward | `src/app/referral/page.tsx` — pick one of the 3 reward options shown and delete the other two; also set the actual ₹ amount | All 3 shown, ride credit implemented as default in code |
| Domain | Already assumed to be `tripshala.in` in `src/lib/site.ts` → `url` | — |
| Google Analytics ID | Vercel environment variable `NEXT_PUBLIC_GA_ID` | Not set — analytics silently no-ops until set |
| Meta Pixel ID | Vercel environment variable `NEXT_PUBLIC_FB_PIXEL_ID` | Not set — analytics silently no-ops until set |
| Google Places API key (for the homepage "suggest a hidden gem" search) | Vercel environment variable `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` — see DEPLOYMENT.md "8c. Configure Google Places" | Not set — falls back to a plain text field until set |
| Community milestone numbers | `src/app/community/page.tsx` → `Milestone` components | Marked "SAMPLE" |

## Pre-launch checklist

- [ ] Real WhatsApp number set and tested (opens WhatsApp with correct pre-filled message, on both iOS and Android)
- [ ] At least 1 real trip with a real date, real price, and real seat count replacing the 5 samples
- [ ] Cancellation policy finalised and published
- [ ] Terms & Privacy Policy reviewed by someone qualified, not just this starter template
- [ ] Real photos replace at least the homepage hero, trip cards, and community section placeholders
- [ ] Google Analytics + Search Console connected, sitemap submitted
- [ ] Meta Pixel connected if you plan to run Meta ads
- [ ] Domain connected and showing the green checkmark in Vercel
- [ ] Tested on an actual phone, not just desktop browser resized small
- [ ] Referral reward decided (one option, not all three)

## 10 things to do the day you go live

1. Post the launch on Instagram with the site link in bio, using a UTM tag so you can see the traffic in GA4.
2. Send the link to your existing WhatsApp community and ask them to check it works on their phone.
3. Do one real booking flow yourself, start to finish, on your own phone.
4. Check Search Console isn't reporting any crawl errors (can take a day to show).
5. Confirm the WhatsApp number receiving enquiries is being actively monitored — a fast reply is the single biggest conversion lever you have.
6. Double-check the cancellation policy and pricing shown match what you'll actually honour.
7. Screenshot the live site on mobile and desktop for your own records / to compare against future versions.
8. Set a calendar reminder to check GA4 after 48 hours — see which trip pages got the most views vs enquiries.
9. Ask 2-3 people outside the project to try booking on their own phone and tell you where they got confused.
10. Keep the sample trips' `isSample` structure in mind — as you add real trips, copy the pattern, don't rebuild it.
