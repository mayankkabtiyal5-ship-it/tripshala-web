// BLOG / GUIDES CONTENT — real, non-placeholder content (unlike the SAMPLE
// trip data in trips.ts). This is the site's SEO/organic-discovery layer:
// long-tail, informational searches ("skandagiri night trek what to carry")
// that a trip listing page alone won't rank for.
//
// To add a new post: copy an object below, give it a new unique `slug`,
// and it will automatically appear on /guides and get its own /guides/[slug]
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
  {
    id: "b5",
    slug: "coorg-travel-guide",
    title: "Coorg Travel Guide: What to Actually Expect From Kodagu",
    excerpt:
      "Misty hills, real filter coffee, and a lot of tourist traps in between. Here's how to spend a weekend in Coorg without wasting it on the wrong stops.",
    publishedDate: "22 Sep 2026",
    readingTime: "6 min read",
    tags: ["Destination Guides", "Guides"],
    coverImageLabel: "Misty hills and coffee estates in Coorg",
    coverImage: "/photos/coorg-misty-hills.jpg",
    relatedTripSlugs: ["coorg-coffee-country-escape"],
    content: [
      {
        type: "paragraph",
        text: "Coorg (officially Kodagu) is the most-searched weekend destination from Bengaluru for a reason — it's close enough for two days, cool enough to escape the city heat, and photogenic enough that everyone's seen it on Instagram before they've been. The catch is that a lot of the 'must-visit' list is now genuinely crowded, especially on weekends.",
      },
      { type: "heading", text: "How far is it, really" },
      {
        type: "paragraph",
        text: "Around 250km from Bengaluru, roughly 5-6 hours by road depending on the route and traffic through Mysuru. That's why it's built as an overnight trip, not a same-day one — the drive alone eats a big chunk of a single day.",
      },
      { type: "heading", text: "What's actually worth your time" },
      {
        type: "list",
        items: [
          "A working coffee estate walk with someone who actually farms it — not a roadside 'coffee museum'",
          "Abbey Falls, best visited early morning before the tour buses arrive",
          "Raja's Seat at sunset, purely for the view over the valley",
          "A homestay meal — Coorg's pandi curry and akki roti are worth seeking out over a restaurant menu",
        ],
      },
      { type: "heading", text: "When to go" },
      {
        type: "paragraph",
        text: "October to March is the reliable window — post-monsoon greenery without the mud, and comfortable daytime temperatures. Monsoon season (June–September) turns Coorg genuinely lush but also genuinely wet; roads and waterfalls are dramatic but plan for rain gear and slower travel.",
      },
      { type: "heading", text: "The honest downside" },
      {
        type: "paragraph",
        text: "Coorg's popularity means peak weekends get crowded at the well-known spots, and traffic on the Bengaluru–Mysuru–Madikeri stretch can add real time to your drive. Going with a group that already has a route planned around the crowds (rather than hitting every top-10-list stop) tends to make for a better trip than winging it.",
      },
    ],
    faqs: [
      { question: "Is Coorg good for a first-time weekend trip?", answer: "Yes — it's one of the easier destinations for first-timers since the roads are good, homestays are plentiful, and there's no trekking fitness required for the main sights." },
      { question: "Is 2 days enough for Coorg?", answer: "Enough to hit the highlights (one estate walk, one waterfall, one viewpoint) without rushing, though Coorg genuinely has enough to fill 3-4 days if you have them." },
    ],
  },
  {
    id: "b6",
    slug: "hampi-travel-guide",
    title: "Hampi Travel Guide: Ruins, Boulders and a Landscape Unlike Anywhere Else",
    excerpt:
      "Hampi doesn't look like the rest of Karnataka — a UNESCO World Heritage landscape of temple ruins scattered across a boulder-strewn valley. Here's how to actually see it in a weekend.",
    publishedDate: "22 Sep 2026",
    readingTime: "6 min read",
    tags: ["Destination Guides", "Guides"],
    coverImageLabel: "Vittala Temple's stone chariot at Hampi",
    coverImage: "/photos/hampi-vittala-temple.jpg",
    relatedTripSlugs: ["hampi-heritage-weekend"],
    content: [
      {
        type: "paragraph",
        text: "Hampi was the capital of the Vijayanagara Empire, and what's left is a UNESCO World Heritage Site spread across a landscape that looks more like Mars than South India — enormous granite boulders, temple ruins, and the Tungabhadra river cutting through the middle of it all.",
      },
      { type: "heading", text: "Getting there" },
      {
        type: "paragraph",
        text: "It's a genuine haul — around 340km and 6+ hours by road, which is why most trips run it as an overnight bus both ways rather than a long day drive. You lose a travel day to the bus, but you arrive rested and the daylight hours are entirely free for exploring.",
      },
      { type: "heading", text: "What not to skip" },
      {
        type: "list",
        items: [
          "Vittala Temple and its stone chariot — Hampi's most photographed structure, for good reason",
          "Matanga Hill at sunrise or sunset for a panoramic view over the entire ruin field",
          "A coracle ride on the Tungabhadra river",
          "Hemakuta Hill's cluster of smaller, quieter temples if you want to skip the crowds at the main sites",
        ],
      },
      { type: "heading", text: "Practical notes" },
      {
        type: "list",
        items: [
          "Hampi gets genuinely hot — carry more water than you think you need, especially March–May",
          "Distances between sites are larger than they look on a map; renting a bicycle or moped locally covers ground faster than walking",
          "Alcohol isn't sold within the heritage zone — plan accordingly if that matters to you",
        ],
      },
      { type: "heading", text: "Best time to visit" },
      {
        type: "paragraph",
        text: "November to February — cool enough to walk between sites comfortably. Summer (March–May) is punishingly hot on exposed rock with little shade.",
      },
    ],
    faqs: [
      { question: "How many days do you need in Hampi?", answer: "A weekend (2 full days on the ground) covers the major sites comfortably. History or photography enthusiasts could easily fill 3-4 days." },
      { question: "Is Hampi a heavy walking trip?", answer: "Yes, expect a fair amount of walking on uneven, rocky ground between ruins — comfortable closed shoes matter more here than at most other weekend destinations." },
    ],
  },
  {
    id: "b7",
    slug: "chikmagalur-travel-guide",
    title: "Chikmagalur Travel Guide: Coffee, Peaks and When to Skip the Weekend Crowd",
    excerpt:
      "Karnataka's coffee capital, and home to its highest peak — here's what makes Chikmagalur different from Coorg, and why a weekday trip changes the experience entirely.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Destination Guides", "Guides"],
    coverImageLabel: "Sunrise over a Chikmagalur peak",
    coverImage: "/photos/chikmagalur-peak.jpg",
    relatedTripSlugs: ["chikmagalur-weekday-escape"],
    content: [
      {
        type: "paragraph",
        text: "Chikmagalur gets compared to Coorg constantly, and while they're both coffee country in the Western Ghats, they're not interchangeable. Chikmagalur is hillier, home to Mullayanagiri (Karnataka's highest peak), and generally has a slightly more rugged, trek-friendly character than Coorg's rolling estate roads.",
      },
      { type: "heading", text: "Distance and drive" },
      {
        type: "paragraph",
        text: "About 245km from Bengaluru, roughly 5-5.5 hours by road — similar distance to Coorg, which is why people often end up choosing between the two rather than doing both in one trip.",
      },
      { type: "heading", text: "The case for going on a weekday" },
      {
        type: "paragraph",
        text: "Chikmagalur's sunrise treks and estate roads get genuinely busy on weekends, to the point where the pre-dawn queue for a Mullayanagiri sunrise can undercut the whole point of going. A weekday trip trades a day of leave for near-empty trails and none of the traffic getting in or out.",
      },
      { type: "heading", text: "What to do" },
      {
        type: "list",
        items: [
          "Sunrise trek up Mullayanagiri or the nearby Kemmangundi range",
          "A working coffee estate tour — Chikmagalur is literally where coffee was first cultivated in India, per local legend, by Baba Budan",
          "Hebbe Falls, if you don't mind a short jeep ride in to reach it",
        ],
      },
      { type: "heading", text: "When to go" },
      {
        type: "paragraph",
        text: "October–February for clear peak views and comfortable trekking weather. Monsoon (June–September) turns the hills a spectacular green but also brings fog that can completely block the summit views you're going for.",
      },
    ],
    faqs: [
      { question: "Chikmagalur or Coorg — which is better?", answer: "Chikmagalur leans more toward peaks and trekking, Coorg toward estate walks and a gentler pace. Neither is objectively better — it depends on whether you want a hike or a slow weekend." },
      { question: "Do I need trekking experience for Mullayanagiri?", answer: "No — it's a moderate, well-marked trail suitable for reasonably fit first-timers, not a technical climb." },
    ],
  },
  {
    id: "b8",
    slug: "nandi-hills-sunrise-ride-guide",
    title: "Nandi Hills Sunrise Ride: The Complete First-Timer's Guide",
    excerpt:
      "It's the ride every Bengaluru rider does at some point — here's how to actually time it right, what the road is like, and why so many people do it more than once.",
    publishedDate: "22 Sep 2026",
    readingTime: "4 min read",
    tags: ["Destination Guides", "Guides"],
    coverImageLabel: "Sunrise over the Nandi Hills valley",
    coverImage: "/photos/nandi-hills-sunrise.jpg",
    relatedTripSlugs: ["nandi-hills-sunrise-ride"],
    content: [
      {
        type: "paragraph",
        text: "Nandi Hills is the default answer to 'where can I ride this weekend without planning anything' for a reason — it's close, the road up is genuinely good for riding, and the sunrise from the top is reliably worth the early alarm.",
      },
      { type: "heading", text: "Timing is everything" },
      {
        type: "paragraph",
        text: "The whole trip hinges on leaving early enough. From Hebbal, it's about an hour's ride, so a 5am departure gets you to the top with time to spare before sunrise. Leave any later and you're watching the sunrise from the queue of traffic, not the summit.",
      },
      { type: "heading", text: "What the road is actually like" },
      {
        type: "paragraph",
        text: "Smooth, well-maintained, and genuinely enjoyable riding with real switchbacks near the top — approachable for less experienced riders while still being fun for people who ride more seriously. It gets busy after sunrise as the day-tourist crowd arrives by car, which is part of why the early start matters beyond just catching the light.",
      },
      { type: "heading", text: "What to carry" },
      {
        type: "list",
        items: [
          "A light jacket — it's noticeably colder at the top before sunrise than in the city",
          "Your license, RC and PUC — there are occasional checks on the route",
          "A little extra time for the filter coffee stop most groups make on the way up",
        ],
      },
    ],
    faqs: [
      { question: "Is Nandi Hills good for a first ride?", answer: "Yes — it's one of the most beginner-friendly rides near Bengaluru, with a good road surface and no technical riding required." },
      { question: "How early should I leave?", answer: "By 5am at the latest if you want to catch sunrise with time to settle in at the top rather than arriving as the sun's already up." },
    ],
  },
  {
    id: "b9",
    slug: "coorg-vs-chikmagalur-vs-sakleshpur",
    title: "Coorg vs Chikmagalur vs Sakleshpur: Which Weekend Trip Should You Pick?",
    excerpt:
      "All three are coffee country in the Western Ghats, all three are roughly a similar distance from Bengaluru — so what actually separates them? Here's the honest comparison.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Comparisons", "Guides"],
    coverImageLabel: "Riders on the Sakleshpur ghat road",
    coverImage: "/photos/sakleshpur-ghat-road.jpg",
    relatedTripSlugs: ["coorg-coffee-country-escape", "chikmagalur-weekday-escape", "sakleshpur-weekend-ride"],
    content: [
      {
        type: "paragraph",
        text: "These three come up in the same breath so often that picking between them can feel arbitrary — they're all in the Western Ghats, all coffee-growing hill country, all a comparable distance from Bengaluru. But they're not the same trip, and which one's right depends on what you actually want out of the weekend.",
      },
      { type: "heading", text: "Coorg — for a gentler, slower weekend" },
      {
        type: "paragraph",
        text: "The most polished of the three, with the most homestay and hospitality infrastructure. Best if you want good food, a relaxed pace, and don't need to hike or ride to enjoy the trip.",
      },
      { type: "heading", text: "Chikmagalur — for peaks and sunrise treks" },
      {
        type: "paragraph",
        text: "More rugged and trek-oriented, home to Karnataka's highest peak. Best if you want an actual physical activity built into the trip, not just scenery from a car window.",
      },
      { type: "heading", text: "Sakleshpur — for the ride itself" },
      {
        type: "paragraph",
        text: "The ghat road to Sakleshpur is the real draw here, not any single destination — it's built for people who ride and want the journey to be the highlight, with a waterfall trek as a bonus on arrival.",
      },
      { type: "heading", text: "Quick decision guide" },
      {
        type: "list",
        items: [
          "Want to just relax and eat well? → Coorg",
          "Want a sunrise trek and a real peak? → Chikmagalur",
          "Want to ride, not just arrive? → Sakleshpur",
          "Can't decide and have a long weekend? → All three are close enough to combine into a longer loop if you have the time",
        ],
      },
    ],
    faqs: [
      { question: "Which is closest to Bengaluru?", answer: "Sakleshpur and Coorg are broadly similar at 220-250km; Chikmagalur is comparable too — none of the three has a dramatically shorter drive than the others." },
      { question: "Which is best for someone who doesn't ride a bike?", answer: "Coorg or Chikmagalur — both run comfortably as Tempo Traveller trips, whereas Sakleshpur's main appeal is specifically the ride." },
    ],
  },
  {
    id: "b10",
    slug: "bike-trip-vs-tempo-traveller",
    title: "Bike Trip vs Tempo Traveller: Which Should You Choose for Your First Group Trip?",
    excerpt:
      "Same destinations, completely different experience. Here's how to decide which mode of travel actually suits you — not just which sounds more exciting.",
    publishedDate: "22 Sep 2026",
    readingTime: "4 min read",
    tags: ["Comparisons", "Guides"],
    coverImageLabel: "Group with bikes and a Tempo Traveller before departure",
    coverImage: "/photos/bike-or-tempo-group.jpg",
    relatedTripSlugs: ["sakleshpur-weekend-ride", "coorg-coffee-country-escape"],
    content: [
      {
        type: "paragraph",
        text: "A lot of first-timers assume the bike trip is the 'real' adventure and the Tempo Traveller is the fallback option. That's not quite right — they're just built for different things, and picking the wrong one for your situation is the more common mistake than picking the 'wrong' vehicle.",
      },
      { type: "heading", text: "Choose a bike trip if..." },
      {
        type: "list",
        items: [
          "You already ride regularly and are comfortable with 4-5 hours of riding in a day",
          "The road itself is part of what you're excited about, not just the destination",
          "You own a bike in good condition, or can arrange one, along with a valid licence, RC and PUC",
          "You don't mind being more exposed to weather and road conditions",
        ],
      },
      { type: "heading", text: "Choose a Tempo Traveller if..." },
      {
        type: "list",
        items: [
          "You don't ride, or don't want to ride for that many hours straight",
          "You're going with friends who have mixed riding experience or none at all",
          "You'd rather arrive fresh and spend your energy on the destination, not the drive",
          "The trip includes long stretches (3+ hours one way) where riding fatigue becomes a real factor",
        ],
      },
      { type: "heading", text: "A practical middle ground" },
      {
        type: "paragraph",
        text: "Some destinations run both options — check the specific trip page. If you're unsure, the Tempo Traveller is the safer first choice; you can always graduate to a bike trip once you know what a multi-hour ride day actually feels like.",
      },
    ],
    faqs: [
      { question: "Is a bike trip more expensive?", answer: "Not necessarily — bike trips often work out cheaper since fuel for your own bike is usually excluded rather than built into the price, but it depends on the specific trip." },
      { question: "Can I switch from a bike trip to Tempo Traveller after booking?", answer: "Message the trip's WhatsApp group as early as possible — switching is easier before final headcounts are locked in, and not guaranteed once a trip is close to departure." },
    ],
  },
  {
    id: "b11",
    slug: "nandi-hills-vs-skandagiri-vs-savandurga",
    title: "Nandi Hills vs Skandagiri vs Savandurga: Which Sunrise Trip Suits You?",
    excerpt:
      "Three early-morning classics near Bengaluru, three completely different experiences — a bike ride, a night trek, and a day trek. Here's how to pick.",
    publishedDate: "22 Sep 2026",
    readingTime: "4 min read",
    tags: ["Comparisons", "Guides"],
    coverImageLabel: "Trekkers on a granite rock face at sunrise",
    coverImage: "/photos/gallery-group-rocks.jpg",
    relatedTripSlugs: ["nandi-hills-sunrise-ride", "skandagiri-night-trek", "savandurga-sunrise-trek"],
    content: [
      {
        type: "paragraph",
        text: "All three get pitched as 'the sunrise trip near Bengaluru,' and people often assume they're interchangeable. They're not — one's a bike ride, one's a night trek, and one's a day trek, and the physical demand and experience are genuinely different.",
      },
      { type: "heading", text: "Nandi Hills — easiest, and the only one on two wheels" },
      {
        type: "paragraph",
        text: "If you ride, this is the lowest-effort option — you're sitting on a bike the whole way, the road is smooth, and there's no trekking involved. Best pick if you want the sunrise without physical exertion beyond the ride itself.",
      },
      { type: "heading", text: "Skandagiri — for the sea-of-clouds view, if you can handle a night trek" },
      {
        type: "paragraph",
        text: "This is the most demanding of the three purely because of timing — you're trekking at night, on very little sleep, for roughly 2 hours of climbing. The payoff (fog sitting in the valley below a clear summit) is also the most dramatic of the three, when conditions cooperate.",
      },
      { type: "heading", text: "Savandurga — a real day trek with real elevation" },
      {
        type: "paragraph",
        text: "No bike, no night trek — just a straightforward, moderate day climb up one of Asia's largest monoliths, with exposed granite sections that make it feel more physically substantial than Nandi Hills despite being a similar overall time commitment.",
      },
      {
        type: "list",
        items: [
          "Want it easy and you ride? → Nandi Hills",
          "Want the most dramatic view and don't mind losing sleep? → Skandagiri",
          "Want a proper trek without a 4am wakeup? → Savandurga",
        ],
      },
    ],
    faqs: [
      { question: "Which is best for someone who's never trekked before?", answer: "Savandurga — it's a genuine trek but moderate and done in daylight, which is an easier introduction than a night trek like Skandagiri." },
      { question: "Can I do all three eventually?", answer: "Plenty of people do — they're different enough experiences that doing all three doesn't feel repetitive, and none require specialised gear beyond good shoes." },
    ],
  },
  {
    id: "b12",
    slug: "what-to-pack-weekend-bike-trip",
    title: "What to Pack for a Weekend Bike Trip From Bangalore",
    excerpt:
      "The difference between a comfortable ride and a miserable one usually comes down to what's in your bag. Here's the actual packing list, not the generic one.",
    publishedDate: "22 Sep 2026",
    readingTime: "4 min read",
    tags: ["Practical Guides", "Guides"],
    coverImageLabel: "Bikes lined up before a weekend ride",
    coverImage: "/photos/community-bikes-lineup.jpg",
    relatedTripSlugs: ["sakleshpur-weekend-ride", "chikmagalur-weekday-escape"],
    content: [
      {
        type: "paragraph",
        text: "Most packing lists for bike trips are generic enough to apply to any trip. This one's specific to what actually matters on a 2-day ghat-road ride from Bengaluru.",
      },
      { type: "heading", text: "On your body" },
      {
        type: "list",
        items: [
          "ISI-marked helmet — non-negotiable, and yours, not a rental you've never worn before",
          "Riding jacket with elbow/shoulder protection if you have one — ghat roads have real curves",
          "Full-length riding pants or jeans, never shorts",
          "Riding gloves — grip matters more than people expect on long stretches",
        ],
      },
      { type: "heading", text: "In your bag" },
      {
        type: "list",
        items: [
          "A change of clothes for the destination, plus one spare riding layer in case of rain",
          "A dry bag or rain cover for your backpack — even outside monsoon, ghat weather is unpredictable",
          "Power bank and cable — phone battery drains fast running navigation and camera",
          "Basic first-aid: band-aids, any personal medication, motion sickness tablets if relevant",
          "Cash — small towns and estate stops don't always take cards",
        ],
      },
      { type: "heading", text: "On the bike" },
      {
        type: "list",
        items: [
          "Valid driving licence, RC and PUC certificate — always, not just for this trip",
          "A basic puncture kit if you're comfortable using one, though the group's lead rider usually carries emergency tools too",
        ],
      },
      {
        type: "paragraph",
        text: "One thing people consistently forget: sun protection. A full day of riding means real sun exposure on your hands, neck and face even on a cool day — sunscreen and a buff or neck gaiter go a long way.",
      },
    ],
    faqs: [
      { question: "Do I need riding gear if it's an easy trip like Nandi Hills?", answer: "Helmet, always. Full riding gear is less critical for short, easy rides but still recommended — road conditions can change fast, and it costs nothing to be prepared." },
      { question: "What if it rains?", answer: "Pack a rain cover for your bag regardless of forecast — Western Ghats weather changes quickly, and getting caught without one is a common regret." },
    ],
  },
  {
    id: "b13",
    slug: "bike-trip-checklist-rc-puc-helmet",
    title: "Bike Trip Checklist: RC, PUC, Helmet and What Else You Actually Need",
    excerpt:
      "The paperwork and bike-condition checks that matter before any group ride — the stuff that's easy to forget until you're stopped at a checkpoint or stranded with a breakdown.",
    publishedDate: "22 Sep 2026",
    readingTime: "4 min read",
    tags: ["Practical Guides", "Guides"],
    coverImageLabel: "Riders lined up for a pre-ride bike check",
    coverImage: "/photos/gallery-riders-lineup.jpg",
    relatedTripSlugs: ["sakleshpur-weekend-ride", "nandi-hills-sunrise-ride"],
    content: [
      {
        type: "heading", text: "Documents — check these the night before, not the morning of" },
      {
        type: "list",
        items: [
          "Valid driving licence (the actual card, not just a photo on your phone — some checkpoints want the physical document)",
          "Registration Certificate (RC) of the bike",
          "Valid Pollution Under Control (PUC) certificate",
          "Insurance — check the expiry date, it's the one people forget most often",
        ],
      },
      { type: "heading", text: "Bike condition — a 10-minute check that prevents most breakdowns" },
      {
        type: "list",
        items: [
          "Tyres: tread depth and correct air pressure, both wheels",
          "Brakes: front and rear, test them before you're on the highway",
          "Lights: headlight and taillight both working — you may be riding before sunrise",
          "Chain: lubricated, not visibly dry or rusted",
          "Fluid check: no visible leaks under the bike",
        ],
      },
      { type: "heading", text: "Gear" },
      {
        type: "list",
        items: [
          "Your own ISI-marked helmet, properly fastened, not just worn loose",
          "Riding gloves and, ideally, a jacket with basic protection",
        ],
      },
      {
        type: "paragraph",
        text: "If anything on this list feels uncertain — an expired PUC, a brake that doesn't feel right — sort it out before the trip, not during. Most group trips have a WhatsApp group specifically to flag issues like this in advance; use it.",
      },
    ],
    faqs: [
      { question: "What happens if my PUC has expired?", answer: "Get it renewed before the trip — it's a quick process at most fuel stations, and riding without valid PUC risks a fine at any checkpoint along the route." },
      { question: "Does the group carry spare tools for breakdowns?", answer: "A lead or sweep rider typically carries basic emergency tools, but it's not a substitute for making sure your own bike is in good condition before you start." },
    ],
  },
  {
    id: "b14",
    slug: "first-time-group-trip-what-to-expect",
    title: "First Time on a Group Trip? Here's What Actually Happens",
    excerpt:
      "Booking your first trip with strangers is a bigger mental hurdle than the trip itself. Here's a real walkthrough of what happens from booking to being back home.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Practical Guides", "Guides"],
    coverImageLabel: "The Tripshala community on a trip together",
    coverImage: "/photos/about-team-rocks.jpg",
    relatedTripSlugs: [],
    content: [
      {
        type: "paragraph",
        text: "The most common hesitation isn't the trip itself — it's not knowing what to expect from travelling with a group of strangers. Here's what actually happens, step by step.",
      },
      { type: "heading", text: "After you book" },
      {
        type: "paragraph",
        text: "You get added to a trip-specific WhatsApp group. This is where everything happens from here — the exact assembly point, a packing list specific to that trip, any last-minute updates, and a place to ask questions before you go.",
      },
      { type: "heading", text: "The day of" },
      {
        type: "paragraph",
        text: "You show up at the assembly point at the stated time. There's a quick headcount and briefing, then the group moves together — with a lead person out front and someone at the back, so nobody gets left behind or lost.",
      },
      { type: "heading", text: "During the trip" },
      {
        type: "paragraph",
        text: "Most people are in the same boat you are — either solo or with one or two friends, not already knowing everyone. Meals, stops, and activities are group moments by default, and it's genuinely one of the faster ways to end up with a small circle of new people you keep in touch with after.",
      },
      { type: "heading", text: "If something goes wrong" },
      {
        type: "paragraph",
        text: "A breakdown, someone falling behind, a change in weather — all of it gets flagged on the trip WhatsApp group immediately, and the trip lead makes the call on how to handle it. You're never navigating an issue alone.",
      },
      {
        type: "quote",
        text: "The awkwardness people worry about — not knowing anyone — usually disappears by the first meal stop. Everyone's there for the same reason.",
      },
    ],
    faqs: [
      { question: "Can I come completely alone?", answer: "Yes — most travellers on these trips start out solo. It's one of the easiest ways to meet people in Bengaluru who also want to get out of the city." },
      { question: "What if I don't get along with the group?", answer: "In practice this is rare given the shared interest that brought everyone together, but you're never obligated to stick with any particular subgroup — trips are casual enough that you can pace yourself." },
    ],
  },
  {
    id: "b15",
    slug: "how-to-choose-trip-difficulty-level",
    title: "How to Choose the Right Trip Difficulty Level for You",
    excerpt:
      "Every trip lists Easy, Moderate or Challenging — but what does that actually mean in practice? Here's how to read it honestly against your own fitness.",
    publishedDate: "22 Sep 2026",
    readingTime: "4 min read",
    tags: ["Practical Guides", "Guides"],
    coverImageLabel: "Trekkers climbing through cloud cover",
    coverImage: "/photos/gallery-foggy-trek.jpg",
    relatedTripSlugs: ["savandurga-sunrise-trek", "skandagiri-night-trek", "nandi-hills-sunrise-ride"],
    content: [
      {
        type: "paragraph",
        text: "Difficulty ratings get thrown around loosely across the travel industry, so here's what Easy, Moderate and Challenging actually mean on a trip page, in practical terms.",
      },
      { type: "heading", text: "Easy" },
      {
        type: "paragraph",
        text: "No trekking fitness required. Think flat ground, a short walk, or being seated for a ride. Nandi Hills' bike ride, most heritage and coastal trips, and any Tempo Traveller trip without a hike attached fall here. If you can comfortably walk around a mall for an hour, you're fine.",
      },
      { type: "heading", text: "Moderate" },
      {
        type: "paragraph",
        text: "Real elevation, a few hours of sustained walking or riding, but nothing technical. Savandurga and Skandagiri sit here — a genuine workout, but achievable with average fitness and no prior trekking experience. Expect some breathlessness, not exhaustion.",
      },
      { type: "heading", text: "Challenging" },
      {
        type: "paragraph",
        text: "Longer duration, steeper or more technical terrain, and generally best attempted only if you already have some trekking or endurance-riding experience. Tripshala flags these clearly on the trip page — if you're unsure whether you're ready, message the WhatsApp group before booking, not after.",
      },
      { type: "heading", text: "A practical way to self-assess" },
      {
        type: "list",
        items: [
          "Can you climb 5-6 flights of stairs without stopping? → You're likely fine for Moderate",
          "Do you exercise regularly (running, cycling, gym)? → Challenging trips are probably within reach",
          "Managing a chronic condition or new to any physical activity? → Start with Easy and build up",
        ],
      },
    ],
    faqs: [
      { question: "What if I'm not sure which level I'm ready for?", answer: "Message the trip's WhatsApp group before booking — trip leads would rather answer a fitness question upfront than have someone struggle mid-trek." },
      { question: "Do difficulty levels account for weather?", answer: "The base rating assumes normal conditions. Rain or extreme heat can make any trip feel harder than its listed difficulty — the trip lead will flag this if conditions change." },
    ],
  },
  {
    id: "b16",
    slug: "best-waterfalls-near-bangalore",
    title: "Best Waterfalls Near Bangalore for a Day Trip",
    excerpt:
      "You don't need a whole weekend for a good waterfall. Here are the ones actually worth the drive from Bangalore, sorted by distance.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Listicles", "Guides"],
    coverImageLabel: "Waterfall in the hills near a tea estate",
    coverImage: "/photos/munnar-tea-estate-falls.jpg",
    relatedTripSlugs: ["chikmagalur-weekday-escape"],
    content: [
      {
        type: "paragraph",
        text: "Monsoon and just after (June through early October) is when these are at their best — most of them slow to a trickle or dry up entirely by peak summer.",
      },
      { type: "heading", text: "Under 50km" },
      {
        type: "list",
        items: [
          "Thottikallu Falls, Kanakapura (~35km) — locally nicknamed the 'golden-faced' falls, strong currents so it's a viewing spot, not a swimming one",
          "Muthyalamaduvu Falls, Anekal (~40km) — in Pearl Valley, with panoramic hill views and accessible most of the year despite rough approach roads",
        ],
      },
      { type: "heading", text: "50-100km" },
      {
        type: "list",
        items: [
          "Chunchi Falls, Kanakapura (~63km) — on the Arkavati river, involves a short trek over slippery rock, best in the monsoon window",
          "Mekedatu, Kanakapura (~93km) — less a single waterfall than a dramatic gorge where the Kaveri narrows; also popular with cyclists",
        ],
      },
      { type: "heading", text: "Worth the longer drive" },
      {
        type: "list",
        items: [
          "Shivanasamudra Falls, Mandya (~130km) — where the Kaveri splits into two separate falls (Gaganachukki and Barachukki), with coracle rides available at Barachukki",
          "Hebbe Falls, near Chikmagalur (~250km) — reached via a short jeep ride through a coffee estate, worth combining with a Chikmagalur trip rather than a standalone day trip",
        ],
      },
      {
        type: "paragraph",
        text: "A practical note: rocks around any of these get slippery fast once wet, and current strength is easy to underestimate. Stick to viewing areas unless a spot is explicitly marked and monitored for swimming.",
      },
    ],
    faqs: [
      { question: "When do these waterfalls dry up?", answer: "Most reduce significantly by March-April and stay low until the monsoon returns in June — plan a waterfall day trip for July through early October for the best flow." },
      { question: "Is it safe to swim at these waterfalls?", answer: "Not recommended at most of them — currents and slippery rocks cause accidents every year at unmonitored spots. Stick to designated viewing areas." },
    ],
  },
  {
    id: "b17",
    slug: "best-budget-weekend-trips-under-5000",
    title: "Best Budget Weekend Trips Under ₹5,000 From Bangalore",
    excerpt:
      "A genuine weekend away doesn't need to be expensive. Here's what's realistically achievable near Bangalore without breaking the bank.",
    publishedDate: "22 Sep 2026",
    readingTime: "4 min read",
    tags: ["Listicles", "Guides"],
    coverImageLabel: "Group of riders lined up for a budget-friendly weekend trip",
    coverImage: "/photos/community-bikes-lineup.jpg",
    relatedTripSlugs: ["sakleshpur-weekend-ride", "manchanabele-lake-camping", "savandurga-sunrise-trek"],
    content: [
      {
        type: "paragraph",
        text: "A full weekend away doesn't have to cost what a flight-and-hotel trip does. Here's what's genuinely achievable near Bengaluru without stretching your budget.",
      },
      { type: "heading", text: "Under ₹1,500 — a single day out" },
      {
        type: "paragraph",
        text: "Day treks like Savandurga or a night trek like Skandagiri typically run in this range, covering transport, a guide and basic refreshments — the lowest-commitment way to get out of the city for well under a full weekend's budget.",
      },
      { type: "heading", text: "₹2,000–3,000 — an overnight escape" },
      {
        type: "paragraph",
        text: "Overnight camping trips (like a lake camping trip near the city) fall here — tent, bonfire dinner, breakfast, and a kayaking session included, without the cost of a longer multi-day itinerary.",
      },
      { type: "heading", text: "₹4,000–5,000 — a full 2D1N bike trip" },
      {
        type: "paragraph",
        text: "A classic weekend bike ride with a homestay, meals and a lead rider typically lands in this bracket. This is the sweet spot for a proper weekend away without the cost of a Tempo Traveller trip with a longer stay.",
      },
      { type: "heading", text: "Ways to keep costs down further" },
      {
        type: "list",
        items: [
          "Book early — trips with dynamic seat-based pricing tend to get pricier as they fill up",
          "Choose bike trips over Tempo Traveller if you ride, since fuel for your own bike (excluded from most trip prices) is still usually cheaper than a shared vehicle seat",
          "Travel with a group of friends to split any optional add-ons",
        ],
      },
    ],
    faqs: [
      { question: "What's typically not included in the price?", answer: "Most trips exclude at least one meal (usually lunch), personal expenses, and fuel for bike trips — check the specific trip's inclusions/exclusions before budgeting." },
      { question: "Are there hidden costs to watch for?", answer: "Entry or permit fees at some trek locations are sometimes paid on the spot rather than bundled into the trip price — these are called out on the trip page when applicable." },
    ],
  },
  {
    id: "b18",
    slug: "best-trips-for-solo-travellers-bangalore",
    title: "Best Trips for Solo Travellers Near Bangalore",
    excerpt:
      "Travelling alone doesn't mean travelling lonely. Here's how to pick a first solo trip near Bangalore, and why group trips solve the actual problem with going solo.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Listicles", "Guides"],
    coverImageLabel: "A solo rider on the road",
    coverImage: "/photos/ig-solo-rider.jpg",
    relatedTripSlugs: ["nandi-hills-sunrise-ride", "hampi-heritage-weekend", "manchanabele-lake-camping"],
    content: [
      {
        type: "paragraph",
        text: "The hesitation around solo travel is rarely about being alone on the road — it's about arriving somewhere new with nobody to share it with. A group trip solves exactly that problem while still letting you travel entirely on your own terms.",
      },
      { type: "heading", text: "Best low-commitment first solo trip" },
      {
        type: "paragraph",
        text: "A half-day ride like Nandi Hills is the easiest possible entry point — low cost, low time commitment, and a built-in group the moment you show up at the assembly point.",
      },
      { type: "heading", text: "Best for a solo traveller who wants a real destination" },
      {
        type: "paragraph",
        text: "Hampi rewards solo exploration — its temples and boulder landscape are genuinely meditative to wander at your own pace, and the overnight bus format means you're never navigating logistics alone.",
      },
      { type: "heading", text: "Best for a solo overnight without overcommitting" },
      {
        type: "paragraph",
        text: "An overnight camping trip is a good next step up — you get the novelty of a night away without the multi-day commitment, and a bonfire dinner is about as easy a way to start talking to strangers as travel gets.",
      },
      { type: "heading", text: "What actually makes solo group travel work" },
      {
        type: "list",
        items: [
          "You're never the only solo person — most of any given group started out exactly the same way",
          "Meals and stops are shared by default, so there's no awkward 'eating alone' moment to plan around",
          "You can be as social or as quiet as you want — nobody's tracking your participation",
        ],
      },
    ],
    faqs: [
      { question: "Is it awkward being the only one who came alone?", answer: "In practice, no — solo travellers make up a large share of who books these trips in the first place, so you're rarely actually the only one." },
      { question: "Is solo travel on these trips safe for women?", answer: "Trips run with a lead and sweep person, a shared WhatsApp group for real-time updates, and a fixed group structure throughout — the same safety setup applies to everyone regardless of who's travelling solo." },
    ],
  },
  {
    id: "b19",
    slug: "best-monsoon-getaways-near-bangalore",
    title: "Best Monsoon Getaways Near Bangalore",
    excerpt:
      "Monsoon turns the Western Ghats into a different landscape entirely — full waterfalls, deep green hills, and noticeably fewer crowds. Here's where it's actually worth going.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Seasonal", "Guides"],
    coverImageLabel: "Misty hills during the monsoon season",
    coverImage: "/photos/coorg-misty-hills.jpg",
    relatedTripSlugs: ["coorg-coffee-country-escape", "manchanabele-lake-camping"],
    content: [
      {
        type: "paragraph",
        text: "Most people avoid travelling in monsoon, which is exactly why it's worth considering — waterfalls are at full flow, hills are at their greenest, and popular spots are noticeably less crowded than the October-February rush.",
      },
      { type: "heading", text: "Best for waterfall chasing" },
      {
        type: "paragraph",
        text: "This is peak season for spots like Chunchi and Shivanasamudra Falls — flows that trickle to nothing by summer are at their most dramatic in July and August.",
      },
      { type: "heading", text: "Best for the classic misty-hills experience" },
      {
        type: "paragraph",
        text: "Coorg in the rain is a genuinely different trip from Coorg in December — mist rolling over the estates, the smell of wet earth, and a slower, quieter pace since fewer people are travelling.",
      },
      { type: "heading", text: "Best low-commitment monsoon trip" },
      {
        type: "paragraph",
        text: "A lakeside camping trip works well even in light monsoon conditions — reservoirs are fullest right after heavy rain, and a good operator moves the group to covered accommodation if conditions turn genuinely unsafe for tents.",
      },
      { type: "heading", text: "What to actually plan around" },
      {
        type: "list",
        items: [
          "Trekking destinations with exposed rock (Savandurga, for one) are best avoided in monsoon — wet granite is genuinely hazardous",
          "Ghat roads can be slower and require more caution if you're riding — reduce speed expectations accordingly",
          "Pack for rain properly: a dry bag, rain cover, and a spare set of clothes matter more this season than any other",
        ],
      },
    ],
    faqs: [
      { question: "Is it safe to travel during monsoon?", answer: "Yes, with the right precautions — avoid exposed granite treks, ride more cautiously on ghat roads, and always check with the trip lead if weather turns severe close to departure." },
      { question: "What's the best monsoon month specifically?", answer: "July and August tend to have the most reliable waterfall flow, while June and September are transitional and can be hit-or-miss depending on the year's rainfall pattern." },
    ],
  },
  {
    id: "b20",
    slug: "best-winter-trek-destinations-near-bangalore",
    title: "Best Winter Trek Destinations Near Bangalore (Oct-Feb)",
    excerpt:
      "Cool mornings, clear skies and comfortable daytime temperatures make October through February the best trekking window near Bangalore. Here's where to spend it.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Seasonal", "Guides"],
    coverImageLabel: "Trekking group on exposed rock in cool weather",
    coverImage: "/photos/gallery-group-rocks.jpg",
    relatedTripSlugs: ["savandurga-sunrise-trek", "skandagiri-night-trek", "chikmagalur-weekday-escape"],
    content: [
      {
        type: "paragraph",
        text: "October through February is objectively the best window for trekking near Bengaluru — post-monsoon trails have dried out, skies are clear for the views the treks are built around, and daytime heat that makes summer climbs miserable is gone.",
      },
      { type: "heading", text: "For the sea-of-clouds view" },
      {
        type: "paragraph",
        text: "Skandagiri's famous cloud-layer view is genuinely season-dependent — it's most reliable in this exact window, so a winter Skandagiri trek is a meaningfully different (better) bet than one attempted outside these months.",
      },
      { type: "heading", text: "For a real day climb" },
      {
        type: "paragraph",
        text: "Savandurga's exposed granite face is at its safest and most comfortable in winter — no monsoon slipperiness, no summer heat radiating off the bare rock.",
      },
      { type: "heading", text: "For a peak with a proper sunrise" },
      {
        type: "paragraph",
        text: "Chikmagalur's Mullayanagiri trek rewards a winter visit with clear, fog-free summit views — monsoon fog can block the exact payoff you're climbing for.",
      },
      { type: "heading", text: "A note on what to pack" },
      {
        type: "paragraph",
        text: "Don't underestimate how cold Karnataka's hills get before sunrise in December-January — carry a proper warm layer even though Bengaluru itself rarely feels that cold at ground level.",
      },
    ],
    faqs: [
      { question: "Which months specifically are best?", answer: "November through January tends to be the sweet spot — driest trails, clearest skies, and the most comfortable temperatures for climbing." },
      { question: "Is early morning cold a real concern?", answer: "Yes, especially on night treks or pre-dawn starts — summit temperatures can be noticeably lower than what you'd expect leaving Bengaluru, so a warm layer is worth the extra bag space." },
    ],
  },
  {
    id: "b21",
    slug: "best-long-weekend-trip-ideas-bangalore",
    title: "Best Long Weekend Trip Ideas From Bangalore",
    excerpt:
      "When you've got an extra day, don't waste it on a destination built for two. Here's where the extra time actually pays off.",
    publishedDate: "22 Sep 2026",
    readingTime: "5 min read",
    tags: ["Seasonal", "Guides"],
    coverImageLabel: "Backwaters canal near Kochi and Alleppey",
    coverImage: "/photos/kochi-alleppey-backwaters-canal.jpg",
    relatedTripSlugs: ["munnar-tea-hills-long-weekend", "kochi-alleppey-backwaters-getaway"],
    content: [
      {
        type: "paragraph",
        text: "A lot of destinations get compressed into a rushed 2D1N trip when they'd genuinely benefit from an extra day. If you've got a long weekend, here's where that extra time actually changes the experience rather than just adding more driving.",
      },
      { type: "heading", text: "Munnar's tea hills" },
      {
        type: "paragraph",
        text: "Munnar is far enough (and has enough to see — tea gardens, Top Station, multiple viewpoints) that compressing it into two days means spending a disproportionate share of your trip in the car. A long weekend lets you actually settle into the pace the destination calls for.",
      },
      { type: "heading", text: "Kochi and Alleppey's backwaters" },
      {
        type: "paragraph",
        text: "A houseboat stay on the backwaters is close to pointless if you're rushing straight back the next morning — the whole appeal is slowing down. Combined with Kochi's old town, this genuinely needs the extra day to not feel rushed.",
      },
      { type: "heading", text: "How to think about the extra day" },
      {
        type: "list",
        items: [
          "Use it for the slow parts — a houseboat, a full day at altitude in Munnar, not more driving",
          "Long weekends fill up faster than regular weekends — book earlier than you think you need to",
          "If you're combining a long drive with limited time regardless, a long weekend justifies the travel time far better than a rushed 2-day trip to the same place would",
        ],
      },
    ],
    faqs: [
      { question: "How much extra distance justifies a long weekend over a regular one?", answer: "As a rough rule, anywhere requiring 6+ hours of one-way travel benefits from a 3-day format so you're not spending a disproportionate share of the trip in transit." },
      { question: "Do long weekend trips cost significantly more?", answer: "They cost more in absolute terms (an extra night, extra meals) but often work out better value per day than a rushed 2-day trip to a destination that needed more time anyway." },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const ALL_TAGS: string[] = Array.from(new Set(posts.flatMap((p) => p.tags)));
