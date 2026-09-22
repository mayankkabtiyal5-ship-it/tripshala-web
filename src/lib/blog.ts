// BLOG / GUIDES CONTENT — real, non-placeholder content (unlike the SAMPLE
// trip data in trips.ts). This is the site's SEO/organic-discovery layer:
// long-tail, informational searches ("skandagiri night trek what to carry")
// that a trip listing page alone won't rank for.
//
// To add a new post: copy an object below, give it a new unique `slug`,
// and it will automatically appear on /blog and get its own /blog/[slug]
// page. No other file needs to change (it's also picked up by sitemap.ts).

import { FAQItem } from "./trips";

export type BlogContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string; // one or two sentences — used on the listing page and as meta description
  publishedDate: string; // display string, e.g. "20 Sep 2026"
  readingTime: string; // e.g. "6 min read"
  tags: string[];
  coverImageLabel: string;
  coverImage?: string;
  relatedTripSlugs?: string[]; // slugs from trips.ts — rendered as "Book this trip" CTAs
  content: BlogContentBlock[];
  faqs?: FAQItem[];
}

export const posts: BlogPost[] = [
  {
    id: "b1",
    slug: "best-weekend-trips-from-bangalore",
    title: "15 Best Weekend Trips From Bangalore (2026 Guide)",
    excerpt:
      "Every weekend-worthy destination within a few hours of Bengaluru, sorted by how you'd actually travel — bike, Tempo Traveller or bus — with real distances and what each one is actually good for.",
    publishedDate: "22 Sep 2026",
    readingTime: "9 min read",
    tags: ["Guides", "Bangalore"],
    coverImageLabel: "The Tripshala community on a weekend trip",
    coverImage: "/photos/ig-aerial-group.jpg",
    relatedTripSlugs: [
      "sakleshpur-weekend-ride",
      "coorg-coffee-country-escape",
      "hampi-heritage-weekend",
      "manchanabele-lake-camping",
      "kabini-wildlife-safari-weekend",
      "savandurga-sunrise-trek",
      "skandagiri-night-trek",
    ],
    content: [
      {
        type: "paragraph",
        text: "Ask ten people in Bengaluru where to go for the weekend and you'll get the same five answers — Coorg, Chikmagalur, Hampi, and if someone's feeling adventurous, Gokarna. All good calls, but the city sits within striking distance of a lot more than that, and how far you should go really depends on how much of your weekend you're willing to spend in transit.",
      },
      {
        type: "paragraph",
        text: "So instead of another generic list, here's one sorted by commitment level: what you can do in under 100km without losing a whole day, what's worth a proper two-day trip, and what deserves a long weekend if you can get one.",
      },
      { type: "heading", text: "Under 100km — back the same day" },
      {
        type: "paragraph",
        text: "These don't need you to take a day off. Leave early, be back for dinner.",
      },
      {
        type: "list",
        items: [
          "Nandi Hills (60km) — the classic sunrise ride, done and dusted before 9am",
          "Savandurga (60km) — a genuine trek up one of the largest monolith hills in Asia, moderate difficulty, roughly 4 hours round trip",
          "Skandagiri (70km) — a night trek timed for the 'sea of clouds' at sunrise, best from October through February",
          "Manchanabele (40km) — the closest overnight escape there is; camp by the reservoir without giving up your whole weekend",
        ],
      },
      { type: "heading", text: "2 Days / 1 Night — the classic weekend trip" },
      {
        type: "paragraph",
        text: "This is the sweet spot for most people: leave Saturday morning, back Sunday evening, no annual leave required.",
      },
      {
        type: "list",
        items: [
          "Sakleshpur — ghat roads through coffee estates, best done on a bike if you ride",
          "Coorg (Kodagu) — misty hills, waterfalls, and filter coffee that actually justifies the hype",
          "Hampi — a different kind of weekend entirely: ruins, boulders, and a landscape unlike anywhere else in Karnataka",
          "Kabini — genuinely one of India's best wildlife destinations, and closer to Bengaluru than most people assume",
        ],
      },
      { type: "heading", text: "Weekday escapes, if your schedule allows" },
      {
        type: "paragraph",
        text: "Chikmagalur on a weekday is a completely different experience from Chikmagalur on a Saturday — the same coffee estates and sunrise treks, minus the crowds.",
      },
      { type: "heading", text: "Long weekend (3+ days) — worth the extra day off" },
      {
        type: "paragraph",
        text: "Munnar's tea hills and Kochi–Alleppey's backwaters are both close enough for a long weekend but far enough that trying to compress them into two days does them a disservice. Take the extra day.",
      },
      {
        type: "paragraph",
        text: "One honest note: every trip above is easier when someone else has already worked out the route, the stay and the stops. That's the whole reason Tripshala exists — pick a trip below and the planning's already done.",
      },
    ],
    faqs: [
      { question: "What's the best month for weekend trips from Bangalore?", answer: "October through February is the sweet spot for most of these — post-monsoon greenery, clear skies for sunrise treks like Skandagiri and Nandi Hills, and comfortable daytime temperatures for hill destinations like Coorg and Chikmagalur." },
      { question: "Do I need my own vehicle?", answer: "No — most of the trips above run as group trips with a Tempo Traveller, bus, or (for bike-ride trips) a lead and sweep rider, so you don't need to plan or drive yourself." },
    ],
  },
  {
    id: "b2",
    slug: "skandagiri-night-trek-guide",
    title: "Skandagiri Night Trek: What to Actually Expect",
    excerpt:
      "The sea-of-clouds photo everyone's seen is real, but the late-night start and the climb itself catch a lot of first-timers off guard. Here's what the night actually looks like.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Trekking", "Guides"],
    coverImageLabel: "Trekkers climbing through cloud cover before dawn",
    coverImage: "/photos/gallery-foggy-trek.jpg",
    relatedTripSlugs: ["skandagiri-night-trek"],
    content: [
      {
        type: "paragraph",
        text: "Skandagiri's entire reputation rests on one thing: a blanket of fog sitting in the valley below while the summit stays completely clear, visible only in the hour or so around sunrise. Miss that window and you've just done a fairly ordinary hill climb in the dark. Time it right and it's one of the better views within 100km of Bengaluru.",
      },
      { type: "heading", text: "Why it's a night trek, not a morning one" },
      {
        type: "paragraph",
        text: "The cloud layer forms overnight and usually burns off within an hour or two of sunrise, which is why every operator (Tripshala included) starts the climb well before midnight rather than at dawn. You want to already be at the top, settled in, when the light starts changing — not still climbing.",
      },
      { type: "heading", text: "What the night actually looks like" },
      {
        type: "list",
        items: [
          "Assembly around 11pm, on the road by 11:30pm — this is the part people underestimate; you're trekking, not sleeping, through what would normally be your bedtime",
          "The climb itself takes roughly 2 hours at a steady pace, entirely in the dark aside from torches",
          "You'll reach the summit around 4am, with a couple of hours to spare before first light — this is when the fort ruins are worth exploring",
          "Sunrise (and the sea of clouds, conditions permitting) happens around 6am",
          "Descent and the drive back mean you're home by mid-morning — the rest of your Sunday is untouched",
        ],
      },
      { type: "heading", text: "What to actually carry" },
      {
        type: "list",
        items: [
          "A torch or headlamp — non-negotiable, the trail isn't lit",
          "A warm layer — it's noticeably colder at the top at 4am than the Bengaluru weather suggests",
          "At least a litre of water — there's nowhere to refill",
          "Grippy shoes — some sections are loose scree, not paved trail",
        ],
      },
      { type: "heading", text: "Best time of year" },
      {
        type: "paragraph",
        text: "October to February gives you the best odds of an actual cloud layer, plus cooler, more comfortable night temperatures for the climb. Summer months work too but skip the fog spectacle most people are climbing for.",
      },
      {
        type: "quote",
        text: "It's a genuinely moderate trek — no technical climbing — but doing it on effectively no sleep, in the dark, is the part that catches people off guard, not the gradient.",
      },
    ],
    faqs: [
      { question: "Is the sea of clouds guaranteed?", answer: "No — it depends on humidity and weather that night, same as any cloud formation. October–February gives the best odds, but no trek operator can guarantee it." },
      { question: "Is it safe to trek at night?", answer: "Yes, when done with a group and a lead/sweep guide on a known route with torches and a first-aid kit — which is how any trip should be run. Solo night trekking on an unfamiliar trail is a different story." },
      { question: "How fit do I need to be?", answer: "Moderate fitness is enough. It's about 2 hours of steady climbing, done at night when it's cool rather than in daytime heat, which honestly makes it easier than a lot of day treks." },
    ],
  },
  {
    id: "b3",
    slug: "manchanabele-camping-guide",
    title: "Manchanabele Lake Camping: Everything You Need to Know",
    excerpt:
      "Forty kilometres out and it already feels like a different state — here's what a night camping by the Manchanabele reservoir is actually like, and what to bring (or not bring).",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Camping", "Guides"],
    coverImageLabel: "Group photo by the Manchanabele reservoir",
    coverImage: "/photos/community-lake-group.jpg",
    relatedTripSlugs: ["manchanabele-lake-camping"],
    content: [
      {
        type: "paragraph",
        text: "Manchanabele is the answer to a very specific problem: you want the campfire, the tent, the night under actual stars — but you don't want to give up your whole weekend to get there. At roughly 40km from the city, it's the closest genuine overnight escape from Bengaluru.",
      },
      { type: "heading", text: "What the reservoir is like" },
      {
        type: "paragraph",
        text: "Manchanabele Dam holds back the Arkavathi river, and the campsites along its banks look out over open water ringed by low hills — a proper reservoir view, not a pond with a marketing photo. It's popular with the city's rock-climbing and rappelling crowd too, so don't be surprised to see other groups around, especially on weekends.",
      },
      { type: "heading", text: "A typical overnight, hour by hour" },
      {
        type: "list",
        items: [
          "Afternoon departure (around 3pm) — you're not racing dawn traffic or losing your whole Saturday to travel",
          "Camp is set up by early evening, with snacks and tea by the water",
          "Bonfire dinner after dark — this is the part people remember most",
          "Sunrise over the reservoir the next morning, followed by a kayaking session",
          "Back in Bengaluru by late morning, Sunday afternoon still entirely free",
        ],
      },
      { type: "heading", text: "What to pack (and what not to)" },
      {
        type: "list",
        items: [
          "A change of clothes and basic toiletries — tents, sleeping bags and the campsite setup are typically handled by whoever's organising",
          "A light jacket — it cools down noticeably by the water at night, even when Bengaluru feels warm",
          "A power bank — charging points are limited to none at most lakeside campsites",
          "Leave the fancy shoes at home — expect grass, mud near the shoreline, and general campsite dust",
        ],
      },
      { type: "heading", text: "Best time to go" },
      {
        type: "paragraph",
        text: "Post-monsoon through winter (October–February) is ideal — the reservoir is fullest right after the monsoon, and night temperatures are comfortable for tent camping. Peak summer gets hot enough that the appeal drops off fast.",
      },
    ],
    faqs: [
      { question: "Do I need to bring my own tent?", answer: "Not for an organised trip — tents, sleeping bags and campsite setup are usually included. Check the specific trip's inclusions to confirm." },
      { question: "Is Manchanabele safe for swimming?", answer: "The reservoir isn't a managed swimming spot, and water levels/currents near the dam can be unpredictable — stick to organised activities like the included kayaking session rather than swimming on your own." },
      { question: "What happens if it rains?", answer: "A good operator monitors the forecast and moves the group to a covered stay nearby if tent camping becomes unsafe — worth confirming this policy before you book." },
    ],
  },
  {
    id: "b4",
    slug: "savandurga-trek-guide",
    title: "Savandurga Trek Guide: Climbing One of Asia's Largest Monoliths",
    excerpt:
      "A moderate, one-day trek 60km from Bengaluru with real exposed-granite sections and views of three reservoirs from the top. Here's what to know before you go.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Trekking", "Guides"],
    coverImageLabel: "Group at the base of the Savandurga monolith",
    coverImage: "/photos/hero-riders-savandurga.jpg",
    relatedTripSlugs: ["savandurga-sunrise-trek"],
    content: [
      {
        type: "paragraph",
        text: "Savandurga sits about 60km west of Bengaluru via Magadi Road, and it's one of the largest monolith hill formations in Asia — a single, mostly bare granite mass that makes for a very different kind of trek than the forested hills further south.",
      },
      { type: "heading", text: "How hard is it, really" },
      {
        type: "paragraph",
        text: "Officially moderate, and that's fair — it's about 2km of ascent and 2km of descent, roughly 4 hours round trip at a comfortable pace. The catch is the exposed granite face near the top: no technical climbing, but real elevation with nothing to hold onto, which is a different kind of tiring than a shaded forest trail.",
      },
      { type: "heading", text: "What you'll see along the way" },
      {
        type: "list",
        items: [
          "The Savandurga fort and temple ruins, dating back to around 1340 AD",
          "Views of the Manchanabele, Thippagondanahalli and Magadi reservoirs from the summit",
          "Unexpected cave and forest terrain tucked near the top, before the rock opens up again",
        ],
      },
      { type: "heading", text: "Best time to go" },
      {
        type: "paragraph",
        text: "Late September through February, with October–November as the sweet spot. Summer (March–May) turns the exposed granite into a genuine heat hazard with almost no shade; monsoon (June–September) makes the rock dangerously slippery. This isn't a trek to attempt outside the dry, cool months.",
      },
      { type: "heading", text: "What to wear and carry" },
      {
        type: "list",
        items: [
          "Trekking or sports shoes with real grip — smooth soles on granite is how people slip",
          "At least a litre of water; there's no shade cover for most of the climb",
          "Sun protection — cap, sunscreen — even in the cooler months, the exposed rock reflects heat",
        ],
      },
    ],
    faqs: [
      { question: "Is Savandurga good for beginners?", answer: "Yes, with the caveat that 'beginner-friendly' here means no technical climbing skill required, not that it's easy — reasonable fitness and comfort with exposed granite sections are still needed." },
      { question: "Is it suitable for kids?", answer: "Not recommended for children under 12 given the steep, exposed sections near the summit." },
      { question: "Do I need a permit?", answer: "Yes, a permit is required through the Aranya Vihaara (Karnataka Forest Department) process — an organised trip typically handles this as part of the trek lead's planning." },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const ALL_TAGS: string[] = Array.from(new Set(posts.flatMap((p) => p.tags)));
