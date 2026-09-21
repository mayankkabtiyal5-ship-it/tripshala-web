# Deployment guide — step by step

Written assuming you haven't deployed a website like this before. Follow
these in order.

## 1. Accounts you need

- **GitHub** account (free) — github.com
- **Vercel** account (free tier is enough) — vercel.com — sign up with your GitHub account, it's one click
- **A WhatsApp Business number** — this is what all the "Book" and "WhatsApp Us" buttons message
- (Later, optional) **Google Analytics** account and **Meta Business Suite** account, for the analytics IDs

## 2. What to install on your computer

Only needed if you want to preview the site on your own laptop before it's live (recommended, but not required — Vercel can build it without you installing anything).

- **Node.js** (version 20 or newer) — download from nodejs.org, the "LTS" version
- A code editor — **VS Code** (free, code.visualstudio.com) is the standard choice

## 3. Run it locally (optional but recommended)

Open a terminal in this project folder and run:

```
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser. Changes you make to files
show up automatically.

## 4. Before you deploy: fill in the content checklist

Open **CONTENT_CHECKLIST.md** and go through it top to bottom. At minimum,
set your real WhatsApp number in `src/lib/site.ts` — the site will otherwise
message a placeholder number.

## 5. Push the code to GitHub

If this project isn't already a GitHub repository:

1. Go to github.com, click **New repository**, name it `tripshala-web`, leave it empty (no README), create it.
2. In your terminal, inside this project folder:
   ```
   git init
   git add .
   git commit -m "Tripshala website v1"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/tripshala-web.git
   git push -u origin main
   ```

## 6. Deploy to Vercel

1. Go to vercel.com, click **Add New → Project**.
2. Choose **Import Git Repository**, select `tripshala-web`.
3. Vercel auto-detects Next.js — leave all build settings on default.
4. Before clicking Deploy, open **Environment Variables** and add (see step 8 for where to get the values):
   - `NEXT_PUBLIC_GA_ID` (optional for now — can add later)
   - `NEXT_PUBLIC_FB_PIXEL_ID` (optional for now — can add later)
5. Click **Deploy**. In about a minute you'll get a live URL like `tripshala-web.vercel.app`.

Every time you push new commits to the `main` branch on GitHub, Vercel
automatically rebuilds and redeploys — you never manually "upload" the site
again.

## 7. Connect your domain (tripshala.in)

1. In your Vercel project, go to **Settings → Domains**, type `tripshala.in`, click **Add**.
2. Vercel shows you either an A record or a CNAME record to add.
3. Go to wherever you bought `tripshala.in` (your domain registrar's dashboard), find **DNS settings**, and add the record exactly as Vercel shows it.
4. DNS changes can take a few minutes to a few hours to take effect. Vercel's domain page shows a green checkmark once it's live.
5. Add `www.tripshala.in` the same way if you want both to work.

## 8. Configure WhatsApp

All WhatsApp behavior is controlled from **one file**: `src/lib/whatsapp.ts`
(message templates) and `src/lib/site.ts` (the number itself).

1. Open `src/lib/site.ts`.
2. Replace `whatsappNumber: "91XXXXXXXXXX"` with your real number, digits only, country code first, no `+` or spaces (e.g. `919876543210`).
3. Commit and push — Vercel redeploys automatically.

To change what any WhatsApp message says (the general enquiry text, the
trip-specific message, the referral message), edit the corresponding
function in `src/lib/whatsapp.ts`.

## 9. Configure analytics

### Google Analytics 4
1. Go to analytics.google.com, create a property for `tripshala.in`.
2. Find your **Measurement ID** (looks like `G-XXXXXXXXXX`) under Admin → Data Streams → your web stream.
3. In Vercel: **Settings → Environment Variables**, add `NEXT_PUBLIC_GA_ID` = that ID.
4. Redeploy (Vercel → Deployments → click the three dots on the latest one → Redeploy).

### Google Search Console
1. Go to search.google.com/search-console, add `tripshala.in` as a property.
2. Verify ownership using the DNS method (add a TXT record at your domain registrar, same place as step 7).
3. Once verified, submit `https://tripshala.in/sitemap.xml` under Sitemaps.

### Meta Pixel
1. Go to Meta Events Manager (business.facebook.com), create a Pixel.
2. Copy the **Pixel ID**.
3. In Vercel: add `NEXT_PUBLIC_FB_PIXEL_ID` = that ID. Redeploy.

Once both are set, the site automatically tracks: page views, trip page
views, WhatsApp clicks, Book clicks, form starts, form submissions, referral
code entries, and Instagram clicks — see `src/lib/analytics.ts` for the
full, named list.

### UTM links for Instagram
Any link you post on Instagram should include UTM parameters so Google
Analytics can tell you it came from there, e.g.:
```
https://tripshala.in/trips/sakleshpur-weekend-ride?utm_source=instagram&utm_medium=bio&utm_campaign=sakleshpur_oct
```
This needs no code changes — Next.js and GA4 read these automatically.

## 10. Test the live site

- Open the live URL on your phone — check the homepage, a trip page, and that the sticky "Book / WhatsApp" bar appears on mobile.
- Tap a WhatsApp button and confirm it opens WhatsApp with the right message and your real number.
- Fill out a booking form and confirm the WhatsApp handoff includes all the fields you entered.
- Check `/sitemap.xml` and `/robots.txt` load.
- Run the site through https://pagespeed.web.dev once it's live, to catch anything slow.

## Notes on what v1 deliberately does NOT include

Per the brief: no payment gateway, no user accounts, no custom admin
dashboard, no complex backend. Booking is: form → WhatsApp → manual
confirmation → (future) payment link. This is intentional, not a shortcut
that broke — see README.md for how to extend it later (Supabase is the
suggested next step if you outgrow WhatsApp-only lead capture).
