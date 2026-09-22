# Deployment guide — step by step

Written assuming you haven't deployed a website like this before. Follow
these in order.

## 1. Accounts you need

- **GitHub** account (free) — github.com
- **Vercel** account (free tier is enough) — vercel.com — sign up with your GitHub account, it's one click
- **A WhatsApp Business number** — this is what all the "Book" and "WhatsApp Us" buttons message
- **Supabase** account (free tier is enough) — supabase.com — sign up with GitHub, for storing a backup copy of every booking-form lead
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
4. Before clicking Deploy, open **Environment Variables** and add (see step 8b for Supabase, step 9 for the analytics IDs):
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (recommended — this is what saves booking leads as a backup)
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

## 8b. Configure Supabase (saves a backup copy of every booking lead)

The booking form on every trip page still hands off to WhatsApp exactly as
before — this step doesn't change that. It adds a second, invisible step:
every submission also gets saved to a Supabase table, so you never lose a
lead who filled the form but closed the tab before hitting send in
WhatsApp. Until you do this, the site works exactly the same — it just
skips the backup save.

1. Go to supabase.com, sign in with GitHub, click **New project**.
   - Pick any name (e.g. `tripshala`), a strong database password (Supabase
     generates one for you — save it somewhere, you likely won't need it
     again), and the region closest to your users (e.g. Mumbai/`ap-south-1`
     if available).
2. Once the project finishes setting up, open the **SQL Editor** (left
   sidebar), click **New query**, paste in the entire contents of
   `supabase/schema.sql` from this project, and click **Run**. This creates
   the `leads` table.
3. Go to **Project Settings → API**. You need two values:
   - **Project URL** — this is `SUPABASE_URL`
   - **service_role** key, under "Project API keys" (click "Reveal" — this
     is a secret key, treat it like a password) — this is `SUPABASE_SERVICE_ROLE_KEY`
4. In Vercel: **Settings → Environment Variables**, add both:
   - `SUPABASE_URL` = your Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your service_role key
5. Redeploy (Vercel → Deployments → click the three dots on the latest one → Redeploy).
6. To check it's working: fill out a booking form on the live site, then in
   Supabase go to **Table Editor → leads** — your test submission should
   appear as a new row within a few seconds.

**To view and manage leads day to day**, use Supabase's Table Editor — it
works like a spreadsheet (filter, sort, search). Update the `status` column
by hand as you follow up: `new` → `contacted` → `confirmed` (or
`cancelled`).

**Important:** only ever put the **service_role** key in Vercel's
environment variables, never in any file you commit to GitHub (it's
already excluded via `.gitignore` if you ever create a local `.env.local`
file for testing) and never in front-end code — it has full read/write
access to your database with no restrictions.

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
- If you've set up Supabase (step 8b), check that same test submission shows up as a row in **Table Editor → leads**.
- Check `/sitemap.xml` and `/robots.txt` load.
- Run the site through https://pagespeed.web.dev once it's live, to catch anything slow.

## Notes on what v1 deliberately does NOT include

Per the brief: no payment gateway, no user accounts, no custom admin
dashboard. Booking is: form → WhatsApp (primary) + Supabase (backup record)
→ manual confirmation → (future) payment link. Supabase's own Table Editor
stands in for a custom admin dashboard for now — see README.md's "Lead
storage" section for how that's wired up, and for how to extend it further
(e.g. a real dashboard, automated WhatsApp follow-ups) if you outgrow it.
