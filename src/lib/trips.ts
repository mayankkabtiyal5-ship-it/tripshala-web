// SAMPLE TRIP DATA — everything in this file with `isSample: true` is
// placeholder content (dates, prices, seat counts, inclusions) for
// demonstrating the site. Replace with real trips before launch.
// To add a new trip: copy an object below, give it a new unique `slug`,
// and it will automatically appear on /trips and get its own /trips/[slug] page.
// No other file needs to change.

export type TripCategory =
  | "Bike Rides"
  | "One Day"
  | "Weekend"
  | "2 Days"
  | "Weekday"
  | "Adventure"
  | "Heritage"
  | "Nature"
  | "Trek"
  | "Camping"
  | "Coastal"
  | "Wildlife"
  | "Temple Trails"
  | "Long Weekend";

export type BookingStatus = "open" | "few-left" | "sold-out" | "closed";

export type ItineraryKind = "travel" | "meal" | "activity" | "stay" | "free";

export interface ItineraryItem {
  time: string;
  label: string;
  detail?: string; // 1-2 sentences: what you'll actually see/do/eat, plus any practical tip
  kind?: ItineraryKind;
  included?: boolean; // true = covered by the trip price, false = pay on your own
}

export interface ItineraryDay {
  day: number;
  title: string;
  summary?: string; // the shape of the day in a sentence or two
  stats?: {
    drive?: string; // e.g. "~5 hrs · 230 km"
    stay?: string;
    meals?: string; // included meals only
  };
  items: ItineraryItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TripMoment {
  src: string;
  alt: string;
  caption?: string;
}

export interface Departure {
  start: string; // YYYY-MM-DD — the day the group leaves Bengaluru
  end: string; // YYYY-MM-DD — the day you're back
  note?: string; // e.g. "Gandhi Jayanti long weekend"
  seatsLeft?: number;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  destination: string;
  startingPoint: string;
  endingPoint: string; // drop-off point — usually the same as startingPoint for a round trip, but state it explicitly rather than assuming
  pickupPoints?: string[]; // several named zones across the city to pick from (Tempo Traveller/Bus trips) — omit for trips with a single assembly point (e.g. bike rides, which convoy together)
  departures?: Departure[]; // fixed-date batches; past ones hide automatically (see lib/departures.ts)
  date: string; // display string — a real fixed date once you have one (e.g. "18-19 Oct 2026"), or "Next batch — ask on WhatsApp" until then
  duration: string; // e.g. "2 Days / 1 Night"
  transport: "Bike" | "Tempo Traveller" | "Bus" | "Bike or Tempo Traveller";
  price: number; // per person, INR
  originalPrice?: number; // per person, INR — set this ONLY when a real discount is running; TripCard then shows a struck-through original price and a "Save ₹X" badge next to the current price. Leave unset for regular pricing — never fill it in just to make a card look more attractive.
  seatsTotal: number;
  seatsLeft: number;
  bookingStatus: BookingStatus;
  difficulty: "Easy" | "Moderate" | "Challenging";
  stay: string;
  food: string;
  categories: TripCategory[];
  coverImageLabel: string; // placeholder label until real photography exists
  coverImage?: string; // real photo path (public/), once available — falls back to the placeholder when unset
  gallery: string[]; // placeholder labels
  photos?: TripMoment[]; // real photos from past runs of this trip — shown as a "From past trips" gallery on the trip page
  description: string[]; // paragraphs
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  whoFor: string[];
  faqs: FAQItem[];
  isSample?: boolean;
}

export const trips: Trip[] = [
  {
    id: "t1",
    slug: "sakleshpur-weekend-ride",
    title: "Sakleshpur Weekend Ride",
    destination: "Sakleshpur, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    departures: [
      {"start": "2026-10-02", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20},
      {"start": "2026-10-03", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night",
    transport: "Bike",
    price: 4999,
    originalPrice: 5900, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 20,
    seatsLeft: 6,
    bookingStatus: "few-left",
    difficulty: "Moderate",
    stay: "Homestay, twin sharing",
    food: "Breakfast and dinner included, lunch stops are pay-as-you-go",
    categories: ["Bike Rides", "Weekend", "2 Days", "Nature", "Adventure"],
    coverImageLabel: "Riders on the Sakleshpur ghat road, misty coffee estates",
    coverImage: "/photos/sakleshpur-ghat-road.jpg",
    gallery: [
      "Group photo at the first breakfast stop",
      "Bikes lined up outside a homestay",
      "Waterfall trek on day 2",
    ],
    description: [
      "Leave Bengaluru before the city wakes up, ride through coffee country, stop for filter coffee where the estate owner still roasts it themselves, and spend the afternoon at a waterfall most tourists never find.",
      "This is the ride we send people on when they say they want to actually feel like they went somewhere, not just drove somewhere. Rolling ghat roads, real elevation change, and a homestay dinner that beats every restaurant on the highway.",
    ],
    highlights: [
      "Ghat road riding through coffee and spice estates",
      "A waterfall trek that isn't on the main tourist route",
      "Homestay dinner cooked by the family that owns it",
      "Small group — this trip caps at 20 riders, not 60",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "NH75 west into Malnad coffee country",
        "summary": "An early roll-out on the Hassan highway, a proper South Indian breakfast on the way, then the last stretch into the green, hilly Malnad around Sakleshpur. Afternoon waterfall trek, evening at the homestay.",
        "stats": {
          "drive": "~5–6 hrs · 225 km",
          "stay": "Homestay, Sakleshpur",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "05:30",
            "label": "Assembly, briefing and bike check",
            "detail": "Meet the lead and sweep riders, run through hand signals and the ride formation, and check tyres, chain and lights. Arrive with a full tank.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Roll out via Nelamangala onto NH75",
            "detail": "We clear the city before traffic builds and settle into a steady pace on the Bengaluru–Mangaluru highway, past Kunigal's lakes and farmland.",
            "kind": "travel"
          },
          {
            "time": "08:30",
            "label": "Breakfast on the highway near Yediyur",
            "detail": "Around 95 km in: hot idli-vada or dosa and strong filter coffee at a highway eatery, then a stretch and a fuel top-up.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Regroup and fuel stop past Hassan",
            "detail": "A short halt beyond the Hassan bypass. Top up here; pumps thin out once you head into the estate roads around Sakleshpur.",
            "kind": "travel"
          },
          {
            "time": "12:30",
            "label": "Arrive Sakleshpur, check into the homestay",
            "detail": "Hills, mist and coffee bushes under tall shade trees take over from the plains. Freshen up and rest before the afternoon.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "13:15",
            "label": "Lunch in town (on your own)",
            "detail": "Simple meals and rice plates in Sakleshpur town, or whatever your homestay can arrange at extra cost.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Guided trek to a quieter waterfall",
            "detail": "With our local guide, a short walk through estate and forest edge to a lesser-visited fall; the exact one depends on season and water levels. Wear shoes with grip; rocks are slippery.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:00",
            "label": "Back at the homestay, evening at leisure",
            "detail": "Hot showers, tea on the verandah and the sound of the estate settling in for the night.",
            "kind": "free"
          },
          {
            "time": "20:00",
            "label": "Homestay dinner cooked by the family",
            "detail": "Home-style Malnad cooking served family-style; the menu follows the family and the season, so ask what's on the stove.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Estate morning, then the ride home",
        "summary": "Breakfast in the cool of the hills, a slow walk through a working coffee estate, then an unhurried ride back along NH75 with a lunch halt on the way.",
        "stats": {
          "drive": "~5 hrs · 225 km",
          "stay": "Return to Bengaluru",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Breakfast at the homestay",
            "detail": "A slow start with a home-cooked breakfast and estate coffee while the morning mist lifts off the slopes.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Coffee estate walk",
            "detail": "Walk between coffee bushes shaded by silver oak, with pepper vines climbing the trunks. Learn how the crop moves from blossom to harvest to drying yard.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Check out and pack the bikes",
            "detail": "Load up, bike check and a quick briefing on the return route and regroup points.",
            "kind": "travel"
          },
          {
            "time": "11:00",
            "label": "Ride out towards Hassan",
            "detail": "The estate roads give way to highway again. If you missed it on the way in, look out for the Hemavathi river near town.",
            "kind": "travel"
          },
          {
            "time": "13:00",
            "label": "Lunch halt en route (on your own)",
            "detail": "A highway lunch stop around Hassan or Channarayapatna, with thali and South Indian meals the easy choice.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Tea and regroup stop",
            "detail": "A short break to rest hands and backs before the final run into Bengaluru traffic.",
            "kind": "free"
          },
          {
            "time": "17:00",
            "label": "Arrive Bengaluru, ride ends",
            "detail": "Back at the assembly point. Timing depends on highway and city traffic at Nelamangala.",
            "kind": "travel"
          }
        ]
      }
    ],
    inclusions: [
      "Route planning and a lead + sweep rider",
      "1 night homestay, twin sharing",
      "Breakfast (both days) and Day 1 dinner",
      "Waterfall trek guide",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Fuel for your own bike",
      "Lunch on both days",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Riders comfortable with 4-5 hours of ghat-road riding a day",
      "Solo riders looking to join a group",
      "Friends who want the route and stay planned for them",
    ],
    faqs: [
      { question: "Do I need my own bike?", answer: "Yes, this specific trip is ride-your-own-bike. If you don't ride, check our Tempo Traveller trips instead." },
      { question: "Can I come alone?", answer: "Yes — most riders on this trip come solo and ride in the group." },
      { question: "Is this beginner-friendly?", answer: "You should be comfortable riding 200+ km a day on ghat roads. It's not a beginner's first long ride." },
      { question: "What if the weather changes?", answer: "The lead rider makes real-time calls on route changes; the WhatsApp group gets updated immediately." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t2",
    slug: "nandi-hills-sunrise-ride",
    title: "Nandi Hills Sunrise Ride",
    destination: "Nandi Hills, Karnataka",
    startingPoint: "Hebbal, Bengaluru",
    endingPoint: "Hebbal, Bengaluru",
    departures: [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 15},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 15}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "Half day (4-5 hours)",
    transport: "Bike",
    price: 799,
    seatsTotal: 15,
    seatsLeft: 15,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Not applicable — same-day return",
    food: "Filter coffee stop included, breakfast on your own",
    categories: ["Bike Rides", "One Day", "Nature"],
    coverImageLabel: "Sunrise over the Nandi Hills valley, riders silhouetted",
    coverImage: "/photos/nandi-hills-sunrise.jpg",
    gallery: ["Pre-dawn assembly point", "Valley view from the top", "Group breakfast stop"],
    description: [
      "The ride that started it all — out of the city while it's still dark, up the hill in time to watch the valley catch the first light, back home before most people are out of bed.",
      "No planning, no figuring out where to stop for coffee. Just show up at 4:45am with a full tank.",
    ],
    highlights: [
      "First light from the top — we're at the gate the moment it opens",
      "A genuinely good filter coffee stop on the way up",
      "Back home by mid-morning — the whole day is still yours",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Dawn ride up Nandi Hills",
        "summary": "Out of Hebbal in the dark, up Bellary Road past the airport, a quick coffee, and into the gate queue as it opens at 6am. First light over the valley from the top, a short walk, and home by nine.",
        "stats": {
          "drive": "~2 hrs · 100 km round trip"
        },
        "items": [
          {
            "time": "04:45",
            "label": "Assemble at Hebbal",
            "detail": "Quick briefing and headcount under the flyover lights. Full tank, a warm layer and gloves; it is noticeably colder at the top.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "05:00",
            "label": "Ride out on Bellary Road (NH44)",
            "detail": "Empty roads past the airport towards Chikkaballapur, then the turn-off for the hills. About 50 km to the gate.",
            "kind": "travel"
          },
          {
            "time": "05:35",
            "label": "Filter coffee stop on the way up",
            "detail": "A short, hot, strong filter coffee near the foothills to warm the hands before the climb. Kept brief so we reach the gate before it opens.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "05:50",
            "label": "Hairpins to the gate, queue for opening",
            "detail": "The road winds up through a string of hairpins. Gates open at 6am; weekends draw a queue, so we aim to be near the front.",
            "kind": "travel"
          },
          {
            "time": "06:10",
            "label": "First light from the top",
            "detail": "At around 1,478 m, on a good morning the valley below sits under a sea of cloud as the light comes up. Sunrise is earliest mid-year, so timing varies by season.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "06:50",
            "label": "Walk to Tipu's Drop and Yoga Nandeeshwara",
            "detail": "An easy stroll to the sheer cliff edge of Tipu's Drop and the old stone Yoga Nandeeshwara temple on the summit, with the fort walls along the way.",
            "kind": "free"
          },
          {
            "time": "07:30",
            "label": "Breakfast on the hill (on your own)",
            "detail": "Time for idli, dosa or a second coffee at the eateries on top before the ride down.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "08:00",
            "label": "Ride back to Hebbal",
            "detail": "Down the hairpins in daylight and back along NH44 before the city traffic properly wakes up.",
            "kind": "travel"
          },
          {
            "time": "09:00",
            "label": "Trip ends at Hebbal",
            "detail": "The whole day is still yours. If you have time on another visit, the ancient Bhoga Nandeeshwara temple in Nandi village at the base is worth a detour.",
            "kind": "travel"
          }
        ]
      }
    ],
    inclusions: ["Lead rider", "One coffee stop", "Trip WhatsApp group"],
    exclusions: ["Fuel", "Breakfast", "Entry ticket (if applicable)"],
    whoFor: ["First-timers wanting a low-commitment taste of a Tripshala ride", "Early risers", "Anyone who wants their whole Sunday back"],
    faqs: [
      { question: "Can I bring a friend?", answer: "Yes, just add them when booking so we know the final headcount." },
      { question: "Do I need my own bike?", answer: "Yes, for this ride. It's an easy, short route suitable for less experienced riders." },
      { question: "Where do we meet?", answer: "Exact assembly point in Hebbal shared after booking." },
    ],
    isSample: true,
  },
  {
    "id": "t3",
    "slug": "coorg-coffee-country-escape",
    "title": "Coorg Coffee Country Escape",
    "destination": "Coorg (Kodagu), Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Banashankari (BDA Complex)",
      "RR Nagar (Mysore Road)",
      "Kengeri (Mysore Road)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 4999,
    "originalPrice": 5599,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Homestay amid a coffee estate, triple/quad sharing",
    "food": "Saturday breakfast and dinner, Sunday breakfast",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature",
      "Trek"
    ],
    "coverImageLabel": "Morning mist rolling over the grassy ridges of Mandalpatti",
    "gallery": [],
    "description": [
      "Coorg smells of wet earth, ripening pepper and roasting coffee, and the hills fold into each other in every shade of green. This weekend takes you up to the grassy ridge of Mandalpatti in the early light, past the roar of Abbey Falls, to Raja Seat for sunset, and into a homestay tucked inside a working coffee estate where the evening ends around a bonfire.",
      "We leave Bengaluru on Friday night so you wake up in the hills. Sunday is slower: a morning walk between the coffee bushes, the elephants at Harangi, the quiet backwaters of the reservoir, and the gold-roofed monastery at Bylakuppe before the drive home down Mysore Road."
    ],
    "highlights": [
      "An early jeep climb to Mandalpatti, where the cloud often sits below the ridge you are standing on",
      "Raja Seat at sunset, then the coffee, spice and homemade-chocolate shops of Madikeri market",
      "A morning walk through the homestay's own coffee estate, followed by the elephants at Harangi and the golden temple at Bylakuppe",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Mandalpatti ridge, Abbey Falls and Raja Seat",
        "summary": "An overnight drive puts you in Coorg before dawn and on the Mandalpatti ridge soon after. The day moves from waterfall spray to a sunset over the valleys and ends with dinner by the bonfire.",
        "stats": {
          "drive": "~6.5 hrs overnight · 260 km, plus ~1.5 hrs local",
          "stay": "Coffee estate homestay near Madikeri",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "22:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari (BDA Complex), RR Nagar and Kengeri on Mysore Road. Keep a warm layer and your walking shoes in your day bag, not the boot.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:00",
            "label": "Reach the homestay and freshen up",
            "detail": "A quick wash and a cup of estate coffee while the hills are still dark. Leave your big bag here; you only need a jacket and water for the ridge.",
            "kind": "free",
            "included": true
          },
          {
            "time": "05:45",
            "label": "Jeep ride up to Mandalpatti",
            "detail": "The last stretch to Mandalpatti is a rough forest track open only to local 4x4 jeeps. Expect a bumpy half hour through shola and grassland; the jeep fare is paid on the spot.",
            "kind": "travel",
            "included": false
          },
          {
            "time": "06:30",
            "label": "Short hike to the Mandalpatti viewpoint",
            "detail": "A brief, steady walk up the grassy spine to the top, around 1,600 m. On clear mornings the valleys fill with cloud below you; in the monsoon it can be misty and windy.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Breakfast at the homestay and check in",
            "detail": "A Kodava breakfast, often akki roti or puttu with curry, then time to shower and rest. Rooms are triple or quad sharing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Abbey Falls",
            "detail": "A short walk downhill through coffee and pepper vines to a hanging bridge facing the falls. Fullest from July to October; the path back up is steep, so go slow.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "13:00",
            "label": "Lunch in Madikeri",
            "detail": "Pay-as-you-go. Try pandi curry with kadambuttu, Coorg's steamed rice balls, at a local restaurant in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Rest at the homestay",
            "detail": "A slow afternoon on the verandah or a nap to make up for the night on the road.",
            "kind": "free",
            "included": true
          },
          {
            "time": "17:15",
            "label": "Sunset at Raja Seat",
            "detail": "The old royal garden on Madikeri's western edge looks over layered ridges towards the Kerala border. Entry is covered; stay until the valley turns blue.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:30",
            "label": "Wander Madikeri market",
            "detail": "Browse for filter coffee powder, cardamom, pepper, homemade wines and chocolate. Carry cash for the smaller stalls.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner and bonfire at the homestay",
            "detail": "Dinner together, then stories around the fire under the estate trees. Tomorrow starts early with a walk among the coffee.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "22:00",
            "label": "Overnight at the coffee estate homestay",
            "detail": "Nights are cool and often damp; keep a light jacket and socks handy.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Coffee rows, elephants and Bylakuppe",
        "summary": "A morning among the coffee bushes, then the elephants at Harangi and the reservoir's backwaters. We end at Namdroling Monastery before the drive home.",
        "stats": {
          "drive": "~2 hrs local, then ~5.5 hrs · 225 km back",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Coffee estate walk",
            "detail": "Walk the estate paths under silver oak shade while the birds are loud. Learn how arabica and robusta differ, and how pepper vines climb the shade trees.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast and check-out",
            "detail": "A last estate breakfast and a cup of the homestay's coffee, then bags back into the Tempo Traveller.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Harangi Elephant Camp",
            "detail": "The forest department camp near Kushalnagar keeps its elephants by the river. Watch the morning routine of bathing and feeding; any hands-on activity is paid on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "11:30",
            "label": "Harangi backwaters",
            "detail": "A quiet stop by the reservoir behind Harangi dam, where dead trees stand in still water. Good for photos and a stretch before the road.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:45",
            "label": "Namdroling Monastery, Bylakuppe",
            "detail": "Three giant gilded statues fill the main temple of this large Tibetan monastery. Dress modestly, walk clockwise and keep your voice low inside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:45",
            "label": "Lunch in Bylakuppe",
            "detail": "Pay-as-you-go. The Tibetan cafes near the monastery serve momos, thukpa and butter tea.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Depart for Bengaluru",
            "detail": "We head out via Hunsur and Mysore Road, with a tea stop along the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Kengeri, RR Nagar, Banashankari and RMZ Ecospace, roughly 20:30 to 22:00 depending on Sunday traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in a coffee estate homestay near Madikeri, triple/quad sharing, with a bonfire",
      "Saturday breakfast and dinner, Sunday breakfast",
      "Raja Seat entry",
      "Guided walk through the homestay's coffee estate",
      "Sightseeing as per itinerary: Mandalpatti, Abbey Falls, Raja Seat, Madikeri market, Harangi, Namdroling Monastery",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: both lunches and anything on the road",
      "Mandalpatti jeep fare, elephant activities and any optional adventure sports",
      "Entry fees not listed above, including Abbey Falls and Harangi camp",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants a green, unhurried weekend without planning a thing",
      "Coffee lovers curious about how it is actually grown",
      "Solo travellers and friend groups happy with shared rooms and a bonfire evening"
    ],
    "faqs": [
      {
        "question": "How far is Coorg from Bengaluru?",
        "answer": "Madikeri is about 260 km away, roughly 6 to 7 hours by road. We drive overnight on Friday so you arrive before sunrise, and return on Sunday afternoon to reach Bengaluru around 20:30 to 22:00."
      },
      {
        "question": "Can I join alone?",
        "answer": "Yes. Many people on our trips come solo, and the shared homestay rooms and bonfire evening make it easy to settle into the group. Rooms are allotted with same-gender sharing unless you are travelling with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "Comfortable shoes with grip, a light rain jacket or poncho, a warm layer for the early morning, a small day bag, a water bottle, basic medicines and some cash for jeeps, entry tickets and market shopping."
      },
      {
        "question": "Is Mandalpatti a difficult trek?",
        "answer": "No. The jeep does most of the climb; from where it stops it is a short, steady walk to the viewpoint. In the monsoon the track can be closed or the view lost in cloud, and we adjust the timing on the day."
      },
      {
        "question": "Is Abbey Falls worth it outside the monsoon?",
        "answer": "It is at its most dramatic between July and October. From January to May the flow thins, but the walk through the coffee and pepper to reach it is still pleasant."
      }
    ],
    "coverImage": "/photos/coorg-misty-hills.jpg",
    "photos": [
      {
        "src": "/photos/coorg-group-selfie.jpg",
        "alt": "The group at the Coorg sign on a past trip",
        "caption": "The Coorg crew"
      }
    ]
  },
  {
    "id": "t4",
    "slug": "hampi-heritage-weekend",
    "title": "Hampi Heritage Weekend",
    "destination": "Hampi, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 4999,
    "originalPrice": 5899,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Guesthouse dorms near Anegundi, multi-sharing, allotted by gender",
    "food": "Breakfast on Saturday and Sunday",
    "categories": [
      "Weekend",
      "2 Days",
      "Heritage",
      "Nature"
    ],
    "coverImageLabel": "The stone chariot at Vittala Temple in soft morning light",
    "gallery": [],
    "description": [
      "Hampi is a landscape that looks half built and half tumbled: honey-coloured boulders piled into impossible towers, paddy fields and banana groves along the Tungabhadra, and the ruins of the Vijayanagara capital scattered across it all. Walking here feels less like visiting a monument and more like wandering through a city that stepped away for a moment.",
      "We drive up overnight on Friday and spend Saturday on the quieter north bank, around the old fort town of Anegundi and the boulder-ringed Sanapur lake, finishing with sunset on the rocks. Sunday belongs to the great temples and royal enclosures, starting at Vittala the moment it opens, with every site ticket covered."
    ],
    "highlights": [
      "Vittala Temple at opening time, with the stone chariot and the carved pillars before the crowds and the heat arrive",
      "Virupaksha, still a living temple after more than a thousand years, and the Lotus Mahal in the royal women's enclosure",
      "Anegundi's village lanes and Sanapur lake among giant boulders, with a sunset on the rocks",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Anegundi, Sanapur lake and a boulder sunset",
        "summary": "Wake up among the boulders after the overnight drive. The day stays on the quieter north bank of the river, from the fort town of Anegundi to a sunset over Sanapur lake.",
        "stats": {
          "drive": "~8 hrs overnight · 340 km, plus ~1 hr local",
          "stay": "Guesthouse dorms near Anegundi",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "21:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur Metro, Goraguntepalya and the Nelamangala toll on Tumkur Road. Pack a cap and sunscreen; Hampi's rocks hold the heat all day.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:45",
            "label": "Arrive near Hampi, check in and rest",
            "detail": "We reach the guesthouse on the Anegundi side of the Tungabhadra around dawn. Dorms are shared and split by gender; take a shower and a short nap.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast at the stay",
            "detail": "A simple breakfast, usually poha, idli or eggs with chai, served in the courtyard.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Anegundi fort and village",
            "detail": "Walk the old gateways and fort walls of the town that predates the Vijayanagara capital, then the lanes of whitewashed houses where women weave banana-fibre crafts.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch near Anegundi",
            "detail": "Pay-as-you-go at one of the relaxed cafes on the north bank; thali, wood-fired pizza and fresh lime soda are all easy to find.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Rest through the afternoon heat",
            "detail": "Hampi afternoons are fierce for most of the year. Back to the stay for a siesta or a book in a hammock.",
            "kind": "free",
            "included": true
          },
          {
            "time": "16:00",
            "label": "Sanapur lake",
            "detail": "A reservoir ringed by giant boulders and paddy fields. Round coracle rides are optional and paid locally; do not swim, as the water is deep and crocodiles are reported.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:45",
            "label": "Sunset from the boulders",
            "detail": "A short scramble up the rocks for the sun going down over the lake and the ruined hills. Wear shoes with grip and carry a torch for the walk back.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner on the north bank",
            "detail": "Pay-as-you-go. Most cafes here have floor seating and a slow, easy pace; order early as kitchens close by around 22:00.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight at the guesthouse",
            "detail": "Early night; breakfast is at 06:45 so we can be at Vittala when the gates open.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Vittala, Virupaksha and the royal centre",
        "summary": "An early start for Vittala at opening, then the living temple of Virupaksha, the Lotus Mahal and the museum. We leave in the late afternoon for the drive home.",
        "stats": {
          "drive": "~1.5 hrs local, then ~7.5 hrs · 340 km back",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:45",
            "label": "Breakfast and check-out",
            "detail": "Eat, pack and load bags into the Tempo Traveller. Carry water, a hat and a small towel for the day.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Drive round to the Hampi side",
            "detail": "We cross the Tungabhadra by road via Kampli and Kamalapur, about an hour through sugarcane and banana country.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Vijaya Vittala Temple",
            "detail": "Gates open at 08:30. See the stone chariot, the slender musical pillars of the main hall and the carved horses and dancers. The last stretch is by battery buggy or a short walk.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Virupaksha Temple and Hampi Bazaar",
            "detail": "A working temple whose tall gopuram overlooks the old bazaar street. Leave footwear outside, dress modestly and look for the pinhole image of the tower inside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch near Hampi",
            "detail": "Pay-as-you-go. A North Karnataka meal with jolada rotti and ennegai is worth trying.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Lotus Mahal and the Elephant Stables",
            "detail": "Inside the royal women's enclosure, the Lotus Mahal blends Indian and Islamic arches; next door, a long row of domed stables once housed the royal elephants.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "15:00",
            "label": "Archaeological Museum, Kamalapur",
            "detail": "Sculptures, weapons, coins and a large floor model of the whole site help the day's ruins fall into place. Open 10:00 to 17:00, closed Fridays.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:00",
            "label": "Depart for Bengaluru",
            "detail": "We join NH48 near Hosapete and head south, stopping for a pay-as-you-go dinner on the highway.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "23:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Nelamangala, Goraguntepalya, Yeshwanthpur and RMZ Ecospace, roughly 23:30 to 00:30 depending on traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in guesthouse dorms near Anegundi, multi-sharing and allotted by gender",
      "Breakfast on Saturday and Sunday",
      "Entry tickets for the heritage sites on the itinerary, including Vittala Temple, the Zenana Enclosure and the museum",
      "All local sightseeing transport between sites",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: lunches, dinners and snacks",
      "Coracle rides and any optional adventure sports",
      "Entry fees not listed above, and camera fees where charged",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "History lovers who want to see Hampi properly in a single weekend",
      "Photographers chasing golden-hour light on stone and boulders",
      "Solo travellers and friends comfortable with dorm-style stays"
    ],
    "faqs": [
      {
        "question": "How far is Hampi from Bengaluru?",
        "answer": "About 340 km, roughly 7 to 8 hours by road along NH48. We drive overnight on Friday and leave Hampi at 16:00 on Sunday, reaching Bengaluru around midnight."
      },
      {
        "question": "Can I come on my own?",
        "answer": "Yes. Many people join solo, and the shared dorms and group meals make it easy to find company. Dorms are allotted by gender."
      },
      {
        "question": "What should I carry?",
        "answer": "Light cotton clothes that cover shoulders and knees for the temples, a cap, sunscreen, sunglasses, a refillable water bottle, sturdy shoes for the rocks, a torch and some cash for meals and coracles."
      },
      {
        "question": "When is the best time to visit Hampi?",
        "answer": "October to February is the most comfortable, with cool mornings and green fields after the monsoon. From March to May the afternoons are very hot, which is why we rest in the middle of the day and see the big sites early."
      },
      {
        "question": "Why do we start so early on Sunday?",
        "answer": "Vittala opens at 08:30 and is at its best in the soft morning light before the tour buses arrive. Being there at opening also gets the long outdoor walking done before the heat."
      }
    ],
    "coverImage": "/photos/hampi-vittala-temple.jpg",
    "photos": [
      {
        "src": "/photos/hampi-stone-chariot-hd.jpg",
        "alt": "The stone chariot at Vittala Temple, Hampi",
        "caption": "Stone chariot, Vittala Temple"
      },
      {
        "src": "/photos/hampi-hut-stay-camp.jpg",
        "alt": "Thatched huts and tents against Hampi’s boulder hills",
        "caption": "Hut stay near Hampi"
      }
    ]
  },
  {
    "id": "t5",
    "slug": "chikmagalur-weekday-escape",
    "title": "Chikmagalur Weekend Escape",
    "destination": "Chikmagalur, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 4999,
    "originalPrice": 5899,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Moderate",
    "stay": "Homestay rooms or tents near Chikmagalur, multi-sharing",
    "food": "Saturday breakfast and dinner, Sunday breakfast",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature",
      "Trek",
      "Heritage"
    ],
    "coverImageLabel": "The stepped path to Mullayanagiri summit above a sea of cloud",
    "gallery": [],
    "description": [
      "Chikmagalur is where Karnataka climbs highest: the Baba Budangiri range rises out of coffee country in long grassy ridges, and at dawn the valleys below are often lost under cloud. This weekend puts you on top of Mullayanagiri, the state's highest peak, early in the morning, then down a jeep track to the spray of Jhari Falls and on to a still lake for sunset.",
      "We leave Bengaluru on Friday night and arrive before first light. Sunday slows down with a morning at Belur, where the Hoysala sculptors carved dancers, musicians and elephants into soapstone in astonishing detail, and a stop at the Yagachi reservoir before the drive home."
    ],
    "highlights": [
      "Dawn on Mullayanagiri, Karnataka's highest peak, as soon as the checkpost opens",
      "A 4x4 ride down to Jhari Falls, tumbling through coffee and forest",
      "Sunset at Hirekolale lake and the carved Hoysala temple at Belur",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Mullayanagiri, Jhari Falls and Hirekolale",
        "summary": "An overnight drive and straight up to Mullayanagiri as the gates open. A jeep ride to Jhari Falls follows, then a late breakfast, a lazy afternoon and sunset by Hirekolale lake.",
        "stats": {
          "drive": "~6 hrs overnight · 245 km, plus ~2 hrs local",
          "stay": "Homestay rooms or tents near Chikmagalur",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "22:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur Metro, Goraguntepalya and the Nelamangala toll on Tumkur Road. Wear your walking shoes on board; we go straight to the peak.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "04:45",
            "label": "Reach the stay, freshen up",
            "detail": "A quick wash and a hot tea. Leave your big bag here and take a jacket, water and a torch.",
            "kind": "free",
            "included": true
          },
          {
            "time": "05:30",
            "label": "Drive to the Kaimara checkpost",
            "detail": "The hill road to Mullayanagiri needs a pre-booked online vehicle pass and opens around 06:00. We book the pass in advance and queue early for the first slot.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:15",
            "label": "Climb to Mullayanagiri summit",
            "detail": "From the parking, a climb of a few hundred stone steps leads to a small Shiva temple at about 1,930 m. On clear mornings cloud fills the valleys; it is cold and windy at the top.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:15",
            "label": "4x4 jeep to Jhari Falls",
            "detail": "The last stretch to Jhari is a steep, rutted estate track that only local jeeps can manage. Expect to be jolted; the shared jeep fare is paid on the spot.",
            "kind": "travel",
            "included": false
          },
          {
            "time": "08:45",
            "label": "Jhari Falls",
            "detail": "The falls drop through coffee and forest into a shallow pool. Strongest after the monsoon; rocks are slippery, so stay near the edge and keep phones in a pouch.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:45",
            "label": "Late breakfast and check in",
            "detail": "A hearty Malnad breakfast back at the stay, then a shower. Rooms or tents are multi-sharing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch in Chikmagalur town",
            "detail": "Pay-as-you-go. Try a Malnad meal with akki rotti and a strong filter coffee.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Rest at the stay",
            "detail": "Catch up on sleep after the early start, or sit out among the coffee bushes.",
            "kind": "free",
            "included": true
          },
          {
            "time": "17:00",
            "label": "Sunset at Hirekolale lake",
            "detail": "A quiet reservoir ringed by the Baba Budangiri hills, about 10 km from town. The ridges turn dark against an orange sky as the sun sets behind them.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner and bonfire at the stay",
            "detail": "Dinner together around the fire, weather permitting, then an easy night.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "22:00",
            "label": "Overnight near Chikmagalur",
            "detail": "Nights can be chilly even in summer; keep a warm layer out.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Belur's Hoysala temple and Yagachi",
        "summary": "A slow breakfast, then the sculpted Chennakeshava temple at Belur and the Yagachi reservoir next door. We head home after lunch.",
        "stats": {
          "drive": "~1 hr local, then ~5.5 hrs · 220 km back",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "08:00",
            "label": "Breakfast and check-out",
            "detail": "An unhurried breakfast and a final coffee before we load the bags.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Chennakeshava Temple, Belur",
            "detail": "The twelfth-century Hoysala temple is covered in soapstone carvings, from friezes of elephants to the famous bracket figures of dancers. Take time over the pillars inside the hall.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Yagachi reservoir",
            "detail": "A wide stretch of water just outside Belur, good for a walk along the bank. Boating and water sports here are optional and paid on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Belur",
            "detail": "Pay-as-you-go at a local restaurant in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Depart for Bengaluru",
            "detail": "Back via Hassan and the Kunigal highway, with a tea stop on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Nelamangala, Goraguntepalya, Yeshwanthpur and RMZ Ecospace, roughly 19:30 to 21:00 depending on Sunday traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night near Chikmagalur in homestay rooms or tents, multi-sharing",
      "Saturday breakfast and dinner, Sunday breakfast",
      "Mullayanagiri vehicle pass, booked online in advance",
      "Entry charges for the places on the itinerary",
      "Sightseeing as per itinerary: Mullayanagiri, Jhari Falls, Hirekolale lake, Belur and Yagachi",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: both lunches and snacks",
      "Jhari Falls jeep fare, water sports at Yagachi and any optional adventure sports",
      "Entry fees not listed above, and camera fees where charged",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants mountain views and waterfalls without a long trek",
      "First-timers who want a mix of hills, coffee country and a heritage temple",
      "Solo travellers and friend groups happy with shared rooms or tents"
    ],
    "faqs": [
      {
        "question": "How far is Chikmagalur from Bengaluru?",
        "answer": "About 245 km, around 5 to 6 hours by road via Nelamangala and Hassan. We leave on Friday night, and on Sunday we reach Bengaluru around 19:30 to 21:00."
      },
      {
        "question": "Can I join alone?",
        "answer": "Yes. Plenty of people on our trips come solo, and the group settles in quickly over the early start and the bonfire. Rooms and tents are shared with the same gender unless you come with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "Shoes with good grip, a warm jacket and a windcheater for the summit, a rain poncho in the monsoon, a torch, a water bottle, basic medicines and cash for the jeep and small purchases."
      },
      {
        "question": "Do we need a permit for Mullayanagiri?",
        "answer": "Every vehicle needs a pre-booked online pass for the hill road, with limited numbers per slot, and the road opens around 06:00. We book ours in advance. If the district closes the road for weather or crowd control, we switch to another viewpoint and tell you in the group."
      },
      {
        "question": "Is the Mullayanagiri climb hard?",
        "answer": "It is short but steep, a few hundred steps from the parking. Most people manage it in 20 to 30 minutes at an easy pace; the wind at the top is the real challenge."
      }
    ],
    "coverImage": "/photos/chikmagalur-peak.jpg"
  },
  {
    "id": "t6",
    "slug": "munnar-tea-hills-long-weekend",
    "title": "Munnar Tea Hills Weekend",
    "destination": "Munnar, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back late Sunday night)",
    "transport": "Tempo Traveller",
    "price": 6999,
    "originalPrice": 8399,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Cabin-frame cottages or tents near Munnar, triple sharing",
    "food": "Saturday breakfast and dinner, Sunday breakfast",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature"
    ],
    "coverImageLabel": "Sunrise over cloud-filled valleys from Kolukkumalai tea estate",
    "gallery": [],
    "description": [
      "Munnar is tea country at its most sculpted: hillsides clipped into neat green contours, silver oak standing guard over them, and cool air that smells of eucalyptus and damp earth. The roads curl past reservoirs and grassland, and every bend opens onto another fold of estate.",
      "We drive overnight on Friday and wake up in the hills. Saturday covers the classic Munnar circuit to Mattupetty and Echo Point, ending with an evening of Kalaripayattu, Kerala's old martial art. On Sunday we leave in the dark for Suryanelli and ride a jeep up to Kolukkumalai for sunrise and the Jaguar Rock viewpoint, then head home after a late breakfast."
    ],
    "highlights": [
      "Sunrise from Kolukkumalai, among the highest tea estates anywhere, reached by 4x4 from Suryanelli",
      "The Jaguar Rock viewpoint, with the Tamil Nadu plains spread out far below",
      "Photo Point, Mattupetty Dam and Echo Point, then an evening Kalaripayattu performance",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Into the tea hills: Mattupetty and Kalari",
        "summary": "The overnight drive climbs into Munnar by morning. After breakfast and some rest, the afternoon runs through tea slopes, a reservoir and an echoing valley, and the evening ends with Kalaripayattu.",
        "stats": {
          "drive": "~12 hrs overnight · 480 km, plus ~2 hrs local",
          "stay": "Cabin-frame cottages or tents near Munnar",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "20:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Keep a neck pillow and a shawl handy; the ghat roads are winding, so carry motion-sickness tablets if you need them.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Tea stop at the foot of the hills",
            "detail": "A stretch and chai halt near Udumalpet before the climb through Chinnar and Marayoor's sandalwood country.",
            "kind": "free",
            "included": false
          },
          {
            "time": "08:30",
            "label": "Arrive Munnar, breakfast and check in",
            "detail": "Breakfast at the stay, then showers and a nap. Cottages and tents are triple sharing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Munnar",
            "detail": "Pay-as-you-go. A Kerala meals plate on banana leaf or appam with stew are good bets in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Photo Point",
            "detail": "A roadside stretch where the tea bushes run in tight rows right down to a stream. Stay on the paths; the estates are private and working.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "14:45",
            "label": "Mattupetty Dam",
            "detail": "A reservoir about 13 km from town, framed by grassland and eucalyptus. Boating is optional and paid on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "15:45",
            "label": "Echo Point",
            "detail": "A lakeside spot on the way to Kundala where the hills send your voice back. The corn and carrot sellers here are a good snack stop.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:00",
            "label": "Kalaripayattu performance",
            "detail": "An hour of Kerala's traditional martial art in a small theatre: leaps, sticks, swords and fire. Tickets are bought at the door on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "19:30",
            "label": "Dinner at the stay",
            "detail": "Dinner together, then an early night. Tomorrow's alarm is at 03:00.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "21:00",
            "label": "Overnight near Munnar",
            "detail": "Lay out warm layers, closed shoes and a torch tonight. Kolukkumalai is cold before dawn in every season.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Kolukkumalai sunrise and Jaguar Rock",
        "summary": "A pre-dawn drive to Suryanelli and a jeep climb for sunrise at Kolukkumalai and the Jaguar Rock viewpoint. After a late breakfast we start the long drive back.",
        "stats": {
          "drive": "~2 hrs local + ~3 hrs jeep, then ~12 hrs · 480 km back",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "03:30",
            "label": "Leave for Suryanelli",
            "detail": "About an hour in the dark past sleeping estates to Suryanelli, where the Kolukkumalai jeeps start.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "04:30",
            "label": "Jeep climb to Kolukkumalai",
            "detail": "Switch to 4x4 jeeps for a rough, rocky estate track, roughly an hour and more up. The jeep fare is paid on the spot; keep valuables zipped away and hold on.",
            "kind": "travel",
            "included": false
          },
          {
            "time": "06:00",
            "label": "Sunrise over Kolukkumalai",
            "detail": "From around 2,100 m, watch the light spread over layered ridges, often above a sea of cloud. Sunrise falls between about 06:00 and 06:40 through the year.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "07:00",
            "label": "Jaguar Rock viewpoint",
            "detail": "A short walk to a rock outcrop named for its crouching shape, with steep drops to the Tamil Nadu plains. Stay well back from the edge, especially when it is windy.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:15",
            "label": "Jeep back down to Suryanelli",
            "detail": "The descent shows the tea slopes you climbed through in the dark.",
            "kind": "travel",
            "included": false
          },
          {
            "time": "10:00",
            "label": "Late breakfast and check-out",
            "detail": "A proper breakfast at the stay, a shower and time to pack.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Depart Munnar for Bengaluru",
            "detail": "We wind down the ghats through Marayoor and join the highway on the plains.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "14:00",
            "label": "Lunch en route",
            "detail": "Pay-as-you-go at a highway restaurant near Udumalpet.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner, then the final stretch into Bengaluru.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "23:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City, Silk Board and RMZ Ecospace, roughly 23:30 to 01:00 depending on traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in cabin-frame cottages or tents near Munnar, triple sharing",
      "Saturday breakfast and dinner, Sunday breakfast",
      "Sightseeing as per itinerary: Photo Point, Mattupetty Dam, Echo Point, Kolukkumalai and Jaguar Rock",
      "Pre-dawn transfer to Suryanelli for the Kolukkumalai sunrise",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges, including driver night charges"
    ],
    "exclusions": [
      "Meals not listed above: both lunches, Sunday dinner and snacks",
      "Kolukkumalai jeep fare, boating and any optional adventure sports",
      "Entry fees not listed above, including Kalaripayattu tickets and the Kolukkumalai estate entry",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants Munnar's tea hills in one weekend without taking leave",
      "Early risers happy to trade a 03:00 alarm for a sunrise above the clouds",
      "Solo travellers and friends comfortable with long drives and shared rooms"
    ],
    "faqs": [
      {
        "question": "How far is Munnar from Bengaluru?",
        "answer": "About 480 km, around 11 to 12 hours by road via Salem and Udumalpet. We drive overnight on Friday and leave Munnar late on Sunday morning, reaching Bengaluru around midnight. Holiday traffic can add time."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Many people join solo, and the long drive and early starts bring the group together quickly. Rooms are shared with the same gender unless you travel with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm jacket, cap and gloves for Kolukkumalai, a rain jacket, comfortable closed shoes, a torch, a neck pillow for the drive, motion-sickness tablets if you need them, and cash for the jeep and tickets."
      },
      {
        "question": "Is the Kolukkumalai jeep ride safe?",
        "answer": "It is rough rather than risky. Local drivers run this track every day, but it is bumpy for over an hour each way, so it is not ideal for anyone with back problems or in pregnancy. Tell us beforehand and we will suggest an alternative for the morning."
      },
      {
        "question": "Will I definitely see the sunrise?",
        "answer": "Not always. From June to September cloud and rain can hide it entirely, though the drifting mist is beautiful in its own way. October to March gives the clearest mornings."
      }
    ],
    "coverImage": "/photos/munnar-tea-estate-falls.jpg",
    "photos": [
      {
        "src": "/photos/munnar-group-lakeside.jpg",
        "alt": "Tripshala group by the lake in Munnar",
        "caption": "Lakeside, Munnar"
      },
      {
        "src": "/photos/munnar-mattupetty-boats.jpg",
        "alt": "Boats on the lake below the Munnar hills",
        "caption": "Mattupetty lake"
      },
      {
        "src": "/photos/munnar-tea-slopes.jpg",
        "alt": "Rolling tea slopes under a cliff in Munnar",
        "caption": "Tea country"
      }
    ]
  },
  {
    "id": "t7",
    "slug": "kochi-alleppey-backwaters-getaway",
    "title": "Kochi & Alleppey Backwaters Weekend",
    "destination": "Kochi and Alleppey, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Monday morning)",
    "transport": "Tempo Traveller",
    "price": 6299,
    "originalPrice": 7899,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Guesthouse in Kochi, triple sharing",
    "food": "Saturday breakfast",
    "categories": [
      "Weekend",
      "2 Days",
      "Coastal",
      "Heritage"
    ],
    "coverImageLabel": "A shikara gliding down a palm-lined canal near Alleppey",
    "gallery": [],
    "description": [
      "Kochi is a port city layered with centuries of traders: spice warehouses and antique shops in Mattancherry's Jew Town, Portuguese and Dutch houses in Fort Kochi, and walls painted with some of the best street art in the country. Alleppey, an hour and a half south, is slower still, a lattice of canals and paddy fields where life happens at the water's edge.",
      "We leave on Friday night and arrive in Kochi on Saturday morning for a day of old lanes, cafes and a sunset cruise off Marine Drive. On Sunday we head down the coast to the quiet sands of Marari, stop for toddy and Kerala food, and glide through Alleppey's narrow canals in a shikara before the overnight drive home."
    ],
    "highlights": [
      "Mattancherry's Jew Town, Fort Kochi's street art and its old cafes, explored on foot",
      "A sunset cruise on the harbour off Marine Drive",
      "Marari's uncrowded beach and a toddy shop lunch of tapioca and fish curry",
      "A shikara ride through Alleppey's narrow backwater canals, where the big houseboats cannot go"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Jew Town, Fort Kochi cafes and a harbour cruise",
        "summary": "Arrive in Kochi on Saturday morning after the overnight drive. The day is for spice lanes, street art, cafe stops and a sunset out on the water.",
        "stats": {
          "drive": "~12 hrs overnight · 550 km, plus ~1 hr local",
          "stay": "Guesthouse in Kochi",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Pack light cottons and a small umbrella; Kochi is humid and showers come without warning.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Tea stop on the highway",
            "detail": "A stretch and chai halt near Palakkad as the landscape turns to palms and paddy.",
            "kind": "free",
            "included": false
          },
          {
            "time": "08:30",
            "label": "Arrive Kochi, breakfast and check in",
            "detail": "A Kerala breakfast of puttu, appam or idiyappam, then showers and a rest. Rooms are triple sharing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Jew Town, Mattancherry",
            "detail": "Wander past spice warehouses and antique shops towards the Paradesi Synagogue. The synagogue is closed on Fridays and Saturdays, so on this trip we see it from the lane outside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Cafe hopping and lunch",
            "detail": "Pay-as-you-go. Fort Kochi's old bungalows hold cafes serving everything from fish moilee to cold brew; we will point out a few favourites.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Fort Kochi walk",
            "detail": "Street art on warehouse walls, St Francis Church and the cantilevered Chinese fishing nets on the shore. Afternoons are hot, so we move slowly and stop often.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:00",
            "label": "Sunset cruise off Marine Drive",
            "detail": "About an hour on the harbour past container ships, fishing boats and the islands as the sun drops. Tickets are paid on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "19:30",
            "label": "Dinner in Kochi",
            "detail": "Pay-as-you-go. Try a Kerala parotta with beef or a seafood thali.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight in Kochi",
            "detail": "Check-out is at 07:30 tomorrow; pack tonight.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Marari beach, toddy and a shikara ride",
        "summary": "Down the coast to Marari's quiet sands, a toddy shop lunch, and an afternoon gliding through Alleppey's canals. We finish before dusk and start the overnight drive home.",
        "stats": {
          "drive": "~2 hrs local, then ~13 hrs overnight · 600 km back"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Check out and drive to Marari",
            "detail": "About an hour and a half south along the coast road. Grab a quick breakfast on the way at your own cost.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "09:15",
            "label": "Marari beach",
            "detail": "A long, clean beach backed by coconut palms and fishing hamlets. The sea has strong currents, so paddle only where locals say it is safe.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Toddy tasting and lunch",
            "detail": "Pay-as-you-go at a licensed toddy shop: mild palm toddy with kappa, fish curry and fiery pickles. Toddy is only for those 23 and over in Kerala; soft drinks are always available.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Shikara ride through Alleppey's canals",
            "detail": "A slow, canopied boat slips down narrow canals past paddy fields, churches and homes on the water. Paid on your own; boats return well before dusk.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "17:00",
            "label": "Tea by the water, then depart",
            "detail": "A short break by the canal before we leave Alleppey for the overnight drive home.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:00",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant, then settle in for the night.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 3,
        "title": "Early-morning arrival in Bengaluru",
        "summary": "We roll into Bengaluru early on Monday and drop you at the same pickup points.",
        "stats": {
          "drive": "Final stretch of the overnight drive"
        },
        "items": [
          {
            "time": "06:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City, Silk Board and RMZ Ecospace, roughly 06:30 to 07:30 depending on the overnight roads.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in a guesthouse in Kochi, triple sharing",
      "Saturday breakfast",
      "Guided exploration of Kochi: Jew Town, Mattancherry, Fort Kochi cafes and street art",
      "Transfers to Marari beach and Alleppey as per itinerary",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and dinners, and Sunday breakfast",
      "Marine Drive cruise, shikara ride, toddy and any optional adventure sports",
      "Entry fees not listed above",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants Kochi and the backwaters in a single weekend",
      "Food lovers keen on Kerala seafood, cafes and toddy shop cooking",
      "Solo travellers and friends fine with two overnight drives"
    ],
    "faqs": [
      {
        "question": "How far are Kochi and Alleppey from Bengaluru?",
        "answer": "Kochi is about 550 km, roughly 11 to 12 hours by road via Salem and Coimbatore. Alleppey is about 600 km, 12 to 13 hours. We drive overnight both ways, reaching Bengaluru early on Monday morning."
      },
      {
        "question": "Can I join alone?",
        "answer": "Yes. Solo travellers are a big part of our groups, and the cafe hopping and shared meals make it easy to find company. Rooms are shared with the same gender unless you come with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "Light, breathable clothes, something that covers shoulders and knees for churches and the synagogue lane, sunscreen, sunglasses, a small umbrella, sandals, a neck pillow for the drives and cash for the cruise, shikara and toddy shop."
      },
      {
        "question": "Why a shikara and not a houseboat?",
        "answer": "Shikaras are small enough to slip into the narrow village canals that big houseboats cannot enter, so you see backwater life up close in a couple of hours. Like houseboats, they must be back and moored by dusk, which is why we ride in the afternoon."
      },
      {
        "question": "Can I skip the toddy?",
        "answer": "Of course. The toddy shop is as much about the food as the drink, and there are always soft drinks and tender coconut. Toddy is only served to those of legal drinking age."
      }
    ],
    "coverImage": "/photos/kochi-alleppey-backwaters-canal.jpg",
    "photos": [
      {
        "src": "/photos/kochi-mattancherry-group.jpg",
        "alt": "Group on the stairs at Mattancherry Palace, Kochi",
        "caption": "Mattancherry Palace, Kochi"
      },
      {
        "src": "/photos/alleppey-lighthouse.jpg",
        "alt": "The red-and-white Alleppey lighthouse",
        "caption": "Alleppey lighthouse"
      }
    ]
  },
  {
    "id": "t8",
    "slug": "pondicherry-weekend-getaway",
    "title": "Pondicherry Weekend Getaway",
    "destination": "Puducherry",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 5999,
    "originalPrice": 7399,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "AC hotel rooms with a pool, triple/quad sharing (1 night, Saturday)",
    "food": "Breakfast on Saturday and Sunday; other meals are pay-as-you-go at local cafés",
    "categories": [
      "Weekend",
      "2 Days",
      "Coastal",
      "Heritage"
    ],
    "coverImageLabel": "Pastel colonial houses and bougainvillea on a quiet White Town street",
    "gallery": [],
    "description": [
      "Puducherry moves at its own pace: waves slapping against the rocks at dawn, the smell of fresh bread in the French Quarter, and streets painted in shades of mustard and rose. It is close enough for a weekend and different enough to feel like a proper escape.",
      "We leave Bengaluru on Friday night and reach the seafront in time for sunrise. Saturday is Auroville and a boat across to Paradise Beach, with a pool at the hotel to come back to. Sunday is for White Town, the Aurobindo Ashram and the mangroves, before an evening drive home."
    ],
    "highlights": [
      "Sunrise over the Bay of Bengal from Rock Beach, straight off the overnight drive",
      "Auroville and the golden Matrimandir, seen from its viewing point across the gardens",
      "A boat ride to Paradise Beach, and another through the Ariyankuppam mangroves",
      "Extra room on board: 11 seats on our 13-seater Tempo Traveller, so nobody is squeezed into the back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Overnight to the coast, Auroville and Paradise",
        "summary": "Leave on Friday night and reach the rocky seafront as the sky turns pink. After breakfast and a shower, the day moves from Auroville's red-earth forest to an afternoon on a sandbar beach reached by boat.",
        "stats": {
          "drive": "~8 hrs overnight · 310 km, plus ~1.5 hrs local",
          "stay": "AC hotel with a pool, Puducherry",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "21:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Eat dinner before boarding and keep a light jacket handy; the AC runs cool overnight.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "02:00",
            "label": "Tea halt past Krishnagiri",
            "detail": "A short stretch-and-chai stop on the highway before we turn east through Tiruvannamalai and Villupuram towards the coast.",
            "kind": "free",
            "included": false
          },
          {
            "time": "06:00",
            "label": "Sunrise walk on Rock Beach",
            "detail": "We roll onto Goubert Avenue as the sun lifts out of the Bay of Bengal. Walk the promenade past the Gandhi statue, the old lighthouse and the waves breaking on the boulders.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Check in, freshen up and breakfast",
            "detail": "Rooms are AC, triple or quad sharing, with a pool on site. Early check-in depends on the hotel, but a room to shower in is always kept ready.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Auroville Visitors Centre",
            "detail": "A short film and exhibits explain the township founded in 1968 around the idea of human unity. Collect the free pass here for the Matrimandir viewing point.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Walk to the Matrimandir viewing point",
            "detail": "A shaded path of roughly a kilometre through banyan and cashew trees leads to the golden globe seen across its gardens. Keep voices low; it is a place of silence.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:45",
            "label": "Lunch at an Auroville café",
            "detail": "Pay-as-you-go. The cafés near the Visitors Centre serve wood-fired pizza, salads and South Indian plates, often with produce grown in Auroville's farms.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Ferry to Paradise Beach from Chunnambar",
            "detail": "A boat winds down the Chunnambar backwater to a long sandbar between river and sea. The ferry ticket is on your own; boats usually stop running by early evening.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Afternoon on Paradise Beach",
            "detail": "Soft golden sand, casuarina shade and surprisingly clear water. Paddle near the flags only; the currents here are strong and swimming out is not allowed.",
            "kind": "free",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Back to the hotel, pool time",
            "detail": "Rinse off the sand and take a dip or simply nap before the evening.",
            "kind": "free",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner and an evening on the promenade",
            "detail": "Pay-as-you-go. The seafront closes to traffic in the evening and fills with walkers; try French bakes, Creole curries or seafood in White Town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "22:00",
            "label": "Overnight in Puducherry",
            "detail": "A proper bed after the overnight drive. Breakfast is early tomorrow so we catch the Ashram's morning hours.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "White Town, a French church and the mangroves",
        "summary": "A slow morning among the ochre and mustard houses of the French Quarter, with a quiet hour at the Aurobindo Ashram, then a boat ride through the mangroves before the drive home.",
        "stats": {
          "drive": "~1 hr local, then ~8 hrs · 310 km back",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:45",
            "label": "Breakfast and check-out",
            "detail": "Pack up and load bags into the Tempo Traveller before we head into town.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Notre Dame des Anges",
            "detail": "The pale pink and cream church facing the sea dates from 1858, with services in French, Tamil and English. On Sundays, step in quietly between masses.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:45",
            "label": "Walk through White Town",
            "detail": "Bougainvillea spilling over gateways, street names in French and Tamil, and colonial villas on Rue Romain Rolland and Rue Dumas. Good light for photographs before the heat builds.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:45",
            "label": "Sri Aurobindo Ashram",
            "detail": "The flower-covered samadhi of Sri Aurobindo and the Mother sits in a hushed courtyard. Open 08:00–11:30 and 14:00–18:00; no photography, and phones on silent.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Lunch in the French Quarter",
            "detail": "Pay-as-you-go. A café crêpe, a Chettinad thali or fish curry and rice; your trip captain will have a few suggestions.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Mangrove boat ride at Murungapakkam",
            "detail": "About an hour on the Ariyankuppam backwaters among mangrove roots, egrets and kingfishers, towards the Thengaithittu estuary. The boat ticket is on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "15:30",
            "label": "Depart Puducherry for Bengaluru",
            "detail": "We head inland through Villupuram and Tiruvannamalai as the afternoon light fades over the paddy fields.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner stop on the highway",
            "detail": "Pay-as-you-go dinner near Krishnagiri before the last stretch into the city.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "23:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City (M5 Mall), Silk Board and RMZ Ecospace, roughly in that order. Timing depends on Sunday-evening traffic at Hosur.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges",
      "1 night in an AC hotel with a pool, triple/quad sharing",
      "Breakfast on Saturday and Sunday",
      "Sightseeing as per the itinerary: Rock Beach, Auroville and the Matrimandir viewing point, Paradise Beach, Notre Dame des Anges, White Town and the Aurobindo Ashram",
      "Trip WhatsApp group with live location and updates"
    ],
    "exclusions": [
      "Lunch and dinner on both days, and snacks on the road",
      "Paradise Beach ferry and mangrove boat tickets, and any other optional activities or water sports",
      "Entry fees not listed above",
      "Personal expenses and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants the sea, good food and old streets without planning a thing",
      "Café-hoppers and photographers who like slow wandering more than packed schedules",
      "First-timers to group travel; it is an easy, relaxed trip with a real bed in the middle"
    ],
    "faqs": [
      {
        "question": "How far is Puducherry from Bengaluru?",
        "answer": "About 310 km, roughly 7–8 hours by road with a couple of stops. We drive overnight on Friday so you wake up at the coast, and return on Sunday evening."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Many people on our Tempo Traveller trips come solo, and rooms are shared with other travellers of the same gender unless you book as a group."
      },
      {
        "question": "What should I carry?",
        "answer": "Swimwear and a change of clothes for the beach and pool, sunscreen, a hat, comfortable sandals and one modest outfit (shoulders and knees covered) for the church and the Ashram."
      },
      {
        "question": "Can we go inside the Matrimandir?",
        "answer": "The inner chamber needs a separate booking made days in advance, so we visit the viewing point, which only needs a free pass from the Auroville Visitors Centre on the day."
      },
      {
        "question": "Can we swim at Paradise Beach?",
        "answer": "Only a paddle near the shore. The lifeguards keep people close in because the currents are strong, so treat it as a beach for sand, sun and shallow water."
      }
    ],
    "coverImage": "/photos/pondicherry-auroville-dome.jpg"
  },
  {
    "id": "t9",
    "slug": "rameshwaram-island-temple-getaway",
    "title": "Rameshwaram & Dhanushkodi Weekend",
    "destination": "Rameshwaram & Dhanushkodi, Tamil Nadu",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back around midnight Sunday)",
    "transport": "Tempo Traveller",
    "price": 5999,
    "originalPrice": 7399,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Hotel near the Ramanathaswamy temple, triple sharing (1 night, Saturday)",
    "food": "Breakfast on Saturday and Sunday; other meals are pay-as-you-go at local eateries",
    "categories": [
      "Weekend",
      "2 Days",
      "Temple Trails",
      "Coastal",
      "Heritage"
    ],
    "coverImageLabel": "The empty road to Arichal Munai with sea on both sides at sunrise",
    "gallery": [],
    "description": [
      "Rameshwaram is an island reached by a bridge over turquoise water, with one of India's great temples at its heart. A little further on, the road runs out at Dhanushkodi, a spit of sand where two seas meet and the ruins of a town lost to a cyclone still stand.",
      "We leave on Friday night and cross the Pamban bridge at breakfast. Saturday is the temple, its sacred wells and corridors, Dr Kalam's memorial and a sunset from the island's highest point. On Sunday we are at Arichal Munai for sunrise, walk the old town's ruins and set off home by lunchtime."
    ],
    "highlights": [
      "Crossing the Pamban road bridge, with the new vertical-lift rail bridge beside it",
      "The Ramanathaswamy temple's pillared corridors and the ritual of its 22 wells",
      "Sunrise at Arichal Munai and the cyclone-ruined church and station of old Dhanushkodi",
      "Extra room on board: 11 seats on our 13-seater Tempo Traveller for two long overnight drives"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Across the sea to Rameshwaram's temple",
        "summary": "An overnight run south ends with the drive over the Pamban road bridge at breakfast time. The day belongs to the Ramanathaswamy temple and its endless corridors, then Dr Kalam's memorial and a hilltop sunset.",
        "stats": {
          "drive": "~11 hrs overnight · 580 km, plus ~1.5 hrs local",
          "stay": "Hotel near the temple, Rameshwaram",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Have dinner before you board and pack a small separate bag with a change of clothes for the temple wells.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "01:00",
            "label": "Midnight tea halt near Salem",
            "detail": "A quick stop to stretch and grab chai before the long run south through Karur, Dindigul and Madurai.",
            "kind": "free",
            "included": false
          },
          {
            "time": "06:30",
            "label": "Morning tea stop near Ramanathapuram",
            "detail": "Freshen up at a highway stop as the landscape flattens into salt pans, palmyra palms and the first glimpses of sea.",
            "kind": "free",
            "included": false
          },
          {
            "time": "07:30",
            "label": "Over the Pamban road bridge",
            "detail": "The 1988 road bridge carries us across the strait onto the island. To one side, the new vertical-lift rail bridge opened in 2025 stands beside the retired 1914 span.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Check in and breakfast",
            "detail": "Rooms near the temple are triple sharing. Change into temple clothes: dhoti or trousers for men, saree or salwar for women, and no shorts.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Agni Theertham and the 22 wells",
            "detail": "A dip in the sea at Agni Theertham, then the ritual of being doused with water from the temple's 22 theerthams. Optional, but most people join; expect to get soaked.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Ramanathaswamy temple and its corridors",
            "detail": "Walk the pillared outer corridor, among the longest in India, before darshan of the lingam. The shrine closes around 13:00; phones are not allowed inside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch near the temple",
            "detail": "Pay-as-you-go. Simple vegetarian meals on banana leaf are the norm around the temple streets.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Rest at the hotel",
            "detail": "Dry off, change and rest through the hottest hours.",
            "kind": "free",
            "included": true
          },
          {
            "time": "15:30",
            "label": "Dr A.P.J. Abdul Kalam National Memorial",
            "detail": "At Peikarumbu, where the former President is buried, galleries trace his life from a Rameshwaram boyhood to India's missile programme. Cameras usually stay outside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:45",
            "label": "Panchamukhi Hanuman temple",
            "detail": "A small shrine known for its floating stones, said to be from the bridge to Lanka in the Ramayana.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Sunset from Gandhamadhana Parvatham",
            "detail": "The island's highest point, a low hillock holding the shrine of Rama's footprint, looks over palm groves and water on every side. The sun sets around 18:00.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner in town",
            "detail": "Pay-as-you-go. Try a crisp dosa or fresh fish fry from the eateries near the east tower.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:00",
            "label": "Overnight in Rameshwaram",
            "detail": "An early night: we leave for Dhanushkodi before dawn.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Dhanushkodi at dawn, then the road home",
        "summary": "A dark-hour drive to the tip of the island for sunrise at Arichal Munai, a walk among the ruins of a town lost to the 1964 cyclone, then breakfast and the long drive back.",
        "stats": {
          "drive": "~1.5 hrs local, then ~11–12 hrs · 580 km back",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "05:15",
            "label": "Leave for Dhanushkodi",
            "detail": "About 20 km down a paved road with sea on both sides. Carry water and a cap; there is almost no shade out on the spit.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Sunrise at Arichal Munai",
            "detail": "At the road's end, the calm Palk Bay and the rougher Gulf of Mannar meet in a thin strip of sand, with Sri Lanka roughly 30 km across the water.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "07:00",
            "label": "Ruins of old Dhanushkodi",
            "detail": "The roofless church, the skeleton of the railway station and broken walls half-buried in sand, left as they were after the cyclone of December 1964.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Kothandaramaswamy temple",
            "detail": "A small temple on the way back, marking where Vibhishana is said to have joined Rama. The lagoon around it is often dotted with flamingos in the cooler months.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Breakfast and check-out",
            "detail": "Back at the hotel for breakfast, a shower and packing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Free time in town",
            "detail": "Browse the stalls for conch and shell crafts, or revisit the temple corridors, which reopen around 15:00 after the afternoon closure.",
            "kind": "free",
            "included": true
          },
          {
            "time": "11:45",
            "label": "Lunch before we leave",
            "detail": "Pay-as-you-go lunch near the temple.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "12:30",
            "label": "Depart Rameshwaram for Bengaluru",
            "detail": "One last look at the sea from the Pamban bridge before we head north through Madurai and Dindigul.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner stop near Salem",
            "detail": "Pay-as-you-go dinner at a highway restaurant, then the final stretch.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "00:30",
            "label": "Arrive Bengaluru after midnight",
            "detail": "Drop-offs at Electronic City (M5 Mall), Silk Board and RMZ Ecospace in the early hours of Monday. Timing depends on traffic around Hosur.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges",
      "1 night in a hotel near the temple, triple sharing",
      "Breakfast on Saturday and Sunday",
      "All sightseeing as per the itinerary: Pamban bridge, Ramanathaswamy temple, Agni Theertham, Kalam National Memorial, Panchamukhi Hanuman temple, Gandhamadhana Parvatham, Dhanushkodi and Arichal Munai, Kothandaramaswamy temple",
      "Trip WhatsApp group with live location and updates"
    ],
    "exclusions": [
      "Lunch and dinner on both days, and snacks on the road",
      "Special darshan tickets, theertham bath charges and offerings at the temple",
      "Optional activities and any adventure or water sports",
      "Entry fees not listed above",
      "Personal expenses and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Pilgrims who want the Ramanathaswamy darshan without organising the logistics",
      "Travellers drawn to the end-of-the-land feel of Dhanushkodi and its history",
      "Anyone comfortable with two long overnight drives in exchange for a far-off weekend"
    ],
    "faqs": [
      {
        "question": "How far is Rameshwaram from Bengaluru?",
        "answer": "About 580 km, roughly 11 hours each way with stops. That is why we drive overnight on Friday and leave Rameshwaram by lunchtime on Sunday, reaching Bengaluru just after midnight."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Solo travellers are common on our trips, and rooms are shared with others of the same gender unless you book together."
      },
      {
        "question": "What should I carry?",
        "answer": "Traditional clothes for the temple (no shorts), a spare set and a towel for the well ritual, a plastic bag for wet clothes, sunscreen, a cap and a neck pillow for the drives."
      },
      {
        "question": "Is Dhanushkodi safe and open to visitors?",
        "answer": "Yes. A paved road now runs all the way to Arichal Munai, and police clear the area by about 17:00, so we go at dawn. Swimming is not allowed, and access can be closed in rough weather."
      },
      {
        "question": "Can I take my phone into the temple?",
        "answer": "No. Phones are not allowed inside the Ramanathaswamy temple, so leave yours in the van or at the hotel; your trip captain will keep time for the group."
      }
    ],
    "coverImage": "/photos/rameshwaram-pamban-bridge-aerial.jpg",
    "photos": [
      {
        "src": "/photos/rameshwaram-beach-walk.jpg",
        "alt": "A traveller walking the quiet Rameshwaram shoreline",
        "caption": "The quiet shoreline"
      },
      {
        "src": "/photos/rameshwaram-shoreline.jpg",
        "alt": "Curving beach and calm sea at Rameshwaram",
        "caption": "Rameshwaram coast"
      }
    ]
  },
  {
    id: "t10",
    slug: "manchanabele-lake-camping",
    title: "Manchanabele Lake Camping",
    destination: "Manchanabele, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    departures: [
      {"start": "2026-10-02", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25},
      {"start": "2026-10-03", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "Overnight (Saturday evening – Sunday morning)",
    transport: "Tempo Traveller",
    price: 2499,
    originalPrice: 3000, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Twin/quad-sharing tents with sleeping bags, right by the water",
    food: "Evening snacks, bonfire dinner and breakfast included",
    categories: ["Camping", "Weekend", "Nature"],
    coverImageLabel: "Group photo by the Manchanabele reservoir under a monsoon sky",
    coverImage: "/photos/community-lake-group.jpg",
    gallery: [
      "Tents pitched right at the water's edge",
      "Bonfire circle after dinner",
      "Kayaking on the reservoir at sunrise",
    ],
    description: [
      "Forty kilometres from the city and it already feels like a different state of mind — a reservoir ringed by hills, tents up before sunset, and a bonfire that runs long after dinner.",
      "This is the trip for people who want the campfire-and-stars evening without giving up their whole weekend to get there. No early alarm, no long drive — just leave Saturday afternoon and you're back well before lunch on Sunday.",
    ],
    highlights: [
      "Camp right on the edge of the Manchanabele reservoir",
      "Bonfire dinner and a night under genuinely dark skies",
      "Sunrise kayaking session included, no extra cost",
      "Closest overnight escape from Bengaluru — barely a 90-minute drive",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Mysore Road to the water's edge",
        "summary": "A short afternoon drive out past the old banyan country to the Manchanabele backwaters, with the tents already pitched and the evening given over to tea, the bonfire and a properly dark sky.",
        "stats": {
          "drive": "~1–1.5 hrs · ~45 km each way",
          "stay": "Lakeside tents",
          "meals": "Evening snacks, bonfire dinner"
        },
        "items": [
          {
            "time": "15:00",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots and live location go on the trip WhatsApp group. exact spot and live location shared on the trip WhatsApp group. Pack a warm layer, a torch and closed shoes.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "15:30",
            "label": "Depart Bengaluru",
            "detail": "Out past Kengeri and off Mysore Road towards Ramohalli, where the city thins quickly into ragi fields, coconut groves and granite hillocks.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "16:15",
            "label": "Dodda Alada Mara, if traffic allows",
            "detail": "A short leg-stretch at the Big Banyan Tree, a single tree whose aerial roots spread over a few acres. Right on the way; skipped if the roads are slow.",
            "kind": "free"
          },
          {
            "time": "17:00",
            "label": "Arrive at camp, settle into your tent",
            "detail": "Tents are pitched by the reservoir with sleeping bags ready. Take the first half-hour to wander to the shoreline, where Savandurga's bulk rises across the water.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "17:45",
            "label": "Sunset walk along the backwaters",
            "detail": "The Arkavathi backwaters turn copper as the light drops; herons and kingfishers work the shallows. Stay on the bank, as the reservoir bed is uneven and unsafe for wading.",
            "kind": "free"
          },
          {
            "time": "18:30",
            "label": "Evening snacks and tea by the water",
            "detail": "Hot tea and snacks as the hills go dark and the first stars come out over the reservoir.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Bonfire dinner and games",
            "detail": "Dinner served around the fire, followed by music, games and the kind of conversation that only happens with no signal to distract anyone.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "22:30",
            "label": "Lights out, or stay up for the stars",
            "detail": "Far enough from the city for a genuinely dark sky on clear nights. The camp quietens down so early risers can sleep before sunrise.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Sunrise paddle, breakfast and home",
        "summary": "An early start for first light over the reservoir, a calm-water kayaking session while the mist is still lifting, then breakfast and an unhurried drive back that has you home before lunch.",
        "stats": {
          "drive": "~1–1.5 hrs · ~45 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Wake-up and sunrise by the reservoir",
            "detail": "Sunrise falls between roughly 6:00 and 6:45 depending on the season. Mist often sits low on the water, with Savandurga silhouetted behind.",
            "kind": "activity"
          },
          {
            "time": "06:45",
            "label": "Sunrise kayaking session",
            "detail": "A guided paddle on the still morning water, the best hour for birdlife along the banks. Life jackets on throughout, and no swimming in the reservoir.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast at camp",
            "detail": "A warm breakfast after the paddle, with time to dry off and linger over a second cup.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:15",
            "label": "Free time by the water",
            "detail": "Walk the shoreline, read in the shade or simply sit with the view before the drive back.",
            "kind": "free"
          },
          {
            "time": "10:00",
            "label": "Pack up and depart",
            "detail": "Roll up your sleeping bag, do a last sweep of the tent for chargers and torches, and board the Tempo Traveller.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Drop-offs in Bengaluru, trip ends",
            "detail": "Dropped back along the same Mysore Road pickup points. Sunday traffic can shift this by half an hour either way.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "Tempo Traveller pickup and drop from Bengaluru",
      "Tent and sleeping bag, twin/quad sharing",
      "Evening snacks, bonfire dinner and breakfast",
      "Sunrise kayaking session",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch",
      "Any water sport beyond the included kayaking session",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "First-time campers who don't want to buy gear before trying it",
      "Small groups of friends wanting an easy overnight escape",
      "Anyone who wants Saturday night away without losing all of Sunday",
    ],
    faqs: [
      { question: "Do I need my own camping gear?", answer: "No — tents, sleeping bags and the campsite setup are all handled. Just bring a change of clothes and any personal essentials." },
      { question: "What if it rains?", answer: "We monitor the forecast closely; if conditions turn unsafe for tent camping, we move the group to a covered stay nearby and let everyone know in advance." },
      { question: "Can I drive myself instead of taking the Tempo Traveller?", answer: "Yes, self-drive is possible — message us on WhatsApp after booking for the exact campsite location and timing." },
    ],
    isSample: true,
  },
  {
    id: "t11",
    slug: "kabini-wildlife-safari-weekend",
    title: "Kabini Wildlife Safari Weekend",
    destination: "Kabini (Nagarhole), Karnataka",
    startingPoint: "Bengaluru (Tempo Traveller pickup points shared after booking)",
    endingPoint: "Bengaluru (same pickup points, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    departures: [
      {"start": "2026-10-02", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20},
      {"start": "2026-10-03", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night",
    transport: "Tempo Traveller",
    price: 7999,
    originalPrice: 9500, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 20,
    seatsLeft: 20,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Resort/homestay near the Kabini backwaters, twin sharing",
    food: "Breakfast and dinner included, lunch stops are pay-as-you-go",
    categories: ["Wildlife", "Weekend", "2 Days", "Nature"],
    coverImageLabel: "Safari jeeps lined up at the forest gate at first light",
    coverImage: "/photos/gallery-jeep-safari.jpg",
    gallery: [
      "Elephant herd at the Kabini backwaters",
      "Group before the evening safari",
      "Coracle ride at sunset",
    ],
    description: [
      "Kabini is routinely rated among the best wildlife destinations in India — elephant herds by the hundreds in season, real odds of a leopard sighting, and backwaters that turn gold at sunset.",
      "Two jungle safaris into the Kabini side of Nagarahole, a night by the water, and a genuinely wild weekend without needing to fly anywhere or plan a thing yourself.",
    ],
    highlights: [
      "Two jungle safaris (dusk and dawn) with a forest department guide",
      "Among the best leopard and elephant sighting odds in South India",
      "Morning coracle ride on the Kabini backwaters",
      "Small group, twin-sharing stay a short drive from the reserve",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Down the Mysuru road to the Kabini forests",
        "summary": "An early start down the Bengaluru–Mysuru Expressway and through HD Kote's farmland to the edge of Nagarhole. After lunch comes the first safari from Damanakatte, into teak and bamboo forest as the afternoon cools.",
        "stats": {
          "drive": "~5 hrs · 210 km, plus short safari-point transfers",
          "stay": "Resort/homestay near the Kabini backwaters",
          "meals": "Dinner"
        },
        "items": [
          {
            "time": "05:30",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots and live location go on the trip WhatsApp group. Wear earthy, muted colours for the safaris, and pack binoculars if you have them.",
            "kind": "travel"
          },
          {
            "time": "06:00",
            "label": "Depart Bengaluru",
            "detail": "Out along the Bengaluru–Mysuru Expressway before the traffic builds.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Breakfast stop on the Mysuru road",
            "detail": "Pay on your own. Thatte idli, Maddur vade and coffee are the classics on this stretch.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:00",
            "label": "Past Mysuru to HD Kote",
            "detail": "We skirt Mysuru and drive south through HD Kote's fields and villages, with the forest edge closing in near Kabini.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Arrive Kabini, check in",
            "detail": "Settle into your twin-sharing room near the backwaters, a short drive from the safari point.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch on your own",
            "detail": "At the stay or nearby. Keep it light before the bumpy ride.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Report at Damanakatte safari point",
            "detail": "All forest department safaris into the Kabini side of Nagarhole start from here. Carry the ID you booked with; counters open about 30 minutes before each slot.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "15:00",
            "label": "Evening jungle safari with naturalist",
            "detail": "About 90 minutes to 3 hours, depending on the slot the department allots. Watch for elephant herds, gaur, spotted deer and langurs; leopards and tigers are possible, never promised.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner at the stay",
            "detail": "Dinner together while comparing sightings, then an early night before the dawn safari.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Dawn in the forest, a coracle on the river",
        "summary": "Back into the forest at first light, when the animals are most active and the mist still hangs over the grassland. After breakfast, a slow coracle ride on the backwaters before the drive home.",
        "stats": {
          "drive": "~5.5 hrs · 210 km, plus short safari-point transfers",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "05:15",
            "label": "Leave for the safari point",
            "detail": "Coffee, a warm layer and your ID. Mornings in the forest are cooler than you'd expect.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Dawn jungle safari with naturalist",
            "detail": "The best light and the liveliest forest of the weekend: alarm calls, woodpeckers, crested serpent eagles and, with luck, a big cat on the track. Slot times vary by day.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Breakfast at the stay",
            "detail": "A hot breakfast after the early start.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Coracle ride on the backwaters",
            "detail": "Spin gently across the Kabini in a round bamboo coracle, watching for cormorants, kingfishers and the drowned trees along the banks. Life jackets are provided; boats take four or five.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Check out, depart for Bengaluru",
            "detail": "Back through HD Kote and around Mysuru.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch stop near Mysuru",
            "detail": "Pay on your own. A Mysuru-style meals plate or masala dosa is the classic choice.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "18:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at RR Nagar, Kengeri and Banashankari. Sunday-evening traffic on Mysore Road can add time.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "Tempo Traveller pickup and drop from Bengaluru",
      "2 jungle safaris with a forest department guide, and park entry fees",
      "1 night stay, twin sharing",
      "Breakfast and dinner",
      "Coracle ride on the backwaters",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch on both days",
      "Camera/video fees at the safari gate, if applicable",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Wildlife and nature lovers",
      "Photographers chasing genuinely good sighting odds",
      "Anyone who wants a wild weekend without a flight",
    ],
    faqs: [
      { question: "Are sightings guaranteed?", answer: "No wildlife sighting can ever be guaranteed, but Kabini is consistently ranked among the best in India for leopard and elephant sightings, especially in the dry months." },
      { question: "What should I carry?", answer: "Neutral-coloured clothing, a cap, and binoculars or a zoom lens if you have one. Safaris run rain or shine." },
      { question: "Are safari timings fixed?", answer: "Yes, safari slots are set by the forest department and can shift slightly by season — the final timing is confirmed on the trip WhatsApp group." },
    ],
    isSample: true,
  },
  {
    id: "t12",
    slug: "savandurga-sunrise-trek",
    title: "Savandurga Sunrise Trek",
    destination: "Savandurga, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    departures: [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "Half day (4:15 am pickup, back by about 1 pm)",
    transport: "Tempo Traveller",
    price: 1499,
    seatsTotal: 20,
    seatsLeft: 20,
    bookingStatus: "open",
    difficulty: "Moderate",
    stay: "Not applicable — same-day return",
    food: "Breakfast included, carry your own water",
    categories: ["One Day", "Trek", "Adventure", "Nature"],
    coverImageLabel: "Group at the base of the Savandurga monolith",
    coverImage: "/photos/hero-riders-savandurga.jpg",
    gallery: [
      "Climbing the exposed granite face",
      "View of the Manchanabele reservoir from the top",
      "Group breakfast at the base",
    ],
    description: [
      "Savandurga is one of the largest monolith hills in Asia, and the climb up its bare granite face is the closest thing to real exposure you'll find on a one-day trip out of Bengaluru.",
      "Fort ruins, temple stops, and views of three reservoirs from the top — all wrapped into a single day that still gets you home for dinner.",
    ],
    highlights: [
      "One of the largest monolith rock formations in Asia",
      "Views of the Manchanabele, Thippagondanahalli and Magadi reservoirs",
      "Historic Savandurga fort and temple ruins en route",
      "Beginner-friendly but with genuine elevation and exposed rock",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Up the great granite monolith",
        "summary": "An early run out along Mysore Road to be at the gate when trekking opens, first light on the lower granite slabs, fort walls and the summit Nandi shrine, then breakfast at the base and home by early afternoon.",
        "stats": {
          "drive": "~1.5 hrs · ~60 km each way",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "04:15",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots and live location go on the trip WhatsApp group. Wear trek shoes with good grip, carry 2 litres of water, a snack and a government photo ID for the forest permit check.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "04:30",
            "label": "Depart Bengaluru",
            "detail": "Through the empty pre-dawn roads past Dodda Alada Mara and Manchanabele to the Savandurga forest. Most people doze on this stretch.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:45",
            "label": "Arrive at the base temples",
            "detail": "The trail starts by the Lakshmi Narasimha Swamy temple; the Savandi Veerabhadra Swamy temple stands close by. Use the facilities and warm up while the trek lead handles the permit.",
            "kind": "activity"
          },
          {
            "time": "06:00",
            "label": "Permit check and start the climb",
            "detail": "Trekking opens at 6:00 and the group enters on its pre-booked forest department slot. The first stretch runs through scrub before the bare rock begins.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Sunrise from the lower slabs",
            "detail": "The sun comes up over the plains while you are on the open granite, so this is the moment to pause and turn around. Follow the lead's line on the steep sections.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Summit, Nandi shrine and the views",
            "detail": "Past two lines of old fort wall to the small Nandi shrine on top, with the Arkavathi valley, Manchanabele reservoir and rolling scrub forest laid out below. Time for photos and a snack.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Begin the descent",
            "detail": "The way down is the trickiest part on smooth rock, so take it slowly and keep your weight over your feet. The sweep guide stays at the back of the group.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Breakfast at the base",
            "detail": "A well-earned hot breakfast once everyone is down, with a few minutes to look in at the old temples before boarding.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:15",
            "label": "Depart for Bengaluru, trip ends ~12:45",
            "detail": "Dropped back along the same Mysore Road pickup points, usually by early afternoon depending on traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "Tempo Traveller pickup and drop from Bengaluru",
      "Breakfast",
      "Trek lead and sweep guide",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch",
      "Entry/parking fee, if applicable, paid on the spot",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "First-time trekkers wanting real elevation without an overnight commitment",
      "Weekend warriors looking for a half-day workout with a view",
      "Photographers — the granite face and reservoir views are worth the climb",
    ],
    faqs: [
      { question: "How difficult is this trek?", answer: "Moderate — around 4 hours of active trekking with some exposed granite sections. Reasonable fitness is needed, but no prior trekking experience." },
      { question: "What footwear should I wear?", answer: "Trekking or sports shoes with good grip — the granite gets slippery, especially if there's any dew or recent rain." },
      { question: "Is this suitable for kids?", answer: "Not recommended for children under 12 given the steep, exposed sections near the top." },
    ],
    isSample: true,
  },
  {
    id: "t13",
    slug: "skandagiri-night-trek",
    title: "Skandagiri Pre-dawn Trek & Sunrise",
    destination: "Skandagiri, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Hebbal (near the flyover)", "Yelahanka (NH-44)", "Devanahalli (near the airport)"],
    departures: [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "Pre-dawn (2:30 am pickup, back by about 11 am)",
    transport: "Tempo Traveller",
    price: 1299,
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Moderate",
    stay: "Not applicable — pre-dawn trek, no stay",
    food: "Hot tea/coffee at the summit; breakfast on the way back is on your own",
    categories: ["One Day", "Trek", "Adventure", "Nature"],
    coverImageLabel: "Trekkers climbing through cloud cover on the way to Skandagiri's summit",
    coverImage: "/photos/gallery-foggy-trek.jpg",
    gallery: [
      "Climbing above the cloud line before dawn",
      "Fort ruins at the summit",
      "Sea of clouds at sunrise",
    ],
    description: [
      "Skandagiri's claim to fame is the 'sea of clouds' — a blanket of fog sitting in the valley below while the summit stays clear, visible only if you're up there before the sun is.",
      "That means a late-night start, a climb under the stars, and a sunrise most people only see in photos. You're back in the city well before your Sunday would normally even start.",
    ],
    highlights: [
      "The famous sea-of-clouds view at sunrise (best in the winter months)",
      "A torchlit pre-dawn climb under dark, star-filled skies",
      "Fort ruins at the summit to explore while you wait for first light",
      "Back home by mid-morning, the rest of Sunday still free",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Torchlit climb to the clouds",
        "summary": "A pre-dawn ride up the airport highway to Chikkaballapur, a torchlit climb from Papagni Mutt on the first permitted slot, and sunrise among the fort ruins and old Shiva temple, with the valley below often lost under cloud.",
        "stats": {
          "drive": "~1.25 hrs · ~60 km each way",
          "meals": "Hot tea/coffee at the summit"
        },
        "items": [
          {
            "time": "02:30",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Hebbal, Yelahanka and Devanahalli; exact spots and live location go on the trip WhatsApp group. Wear trek shoes, layers and a windcheater, and carry a torch, 1.5 litres of water and a government photo ID.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "02:45",
            "label": "Depart Bengaluru via NH-44",
            "detail": "A quiet run up the Hyderabad highway past the airport towards Chikkaballapur. Catch what sleep you can.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "04:00",
            "label": "Arrive at Papagni Mutt, Kalavara",
            "detail": "The trail begins by the old mutt and temple at the foot of the hill. Final layers on, torches out, and a quick safety briefing from the trek lead.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "04:15",
            "label": "Forest checkpost and ID check",
            "detail": "The group enters on its pre-booked forest department slot, a few minutes' walk above the mutt. Plastic is checked and discouraged, so bring a reusable bottle.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "04:30",
            "label": "Climb by torchlight",
            "detail": "Around 2 hours up through scrub, boulders and a couple of steeper rocky patches, with the lights of Chikkaballapur below. The sweep guide keeps the group together.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "06:15",
            "label": "Summit, tea and sunrise",
            "detail": "Hot tea or coffee as the sky lightens; sunrise falls between roughly 6:00 and 6:40 by season. From October to February the valley often fills with cloud below you.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "06:45",
            "label": "Fort ruins and the Shiva temple",
            "detail": "Wander the crumbling 18th-century fort walls and the small, still-worshipped Shiva temple on top, with Nandi Hills and the neighbouring peaks emerging as the cloud burns off.",
            "kind": "free"
          },
          {
            "time": "07:30",
            "label": "Descend to the base",
            "detail": "About 1.5 hours down in daylight, when the loose gravel is much easier to read. Take the rocky sections slowly.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:15",
            "label": "Breakfast stop, then home by ~11:00",
            "detail": "A stop in Chikkaballapur or along the highway for idli, dosa and strong coffee at your own cost, then drop-offs at Devanahalli, Yelahanka and Hebbal.",
            "kind": "meal",
            "included": false
          }
        ]
      }
    ],
    inclusions: [
      "Tempo Traveller pickup and drop from Bengaluru",
      "Trek lead and sweep guide with torches and first-aid",
      "Hot tea/coffee at the summit",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Forest department trek permit (booked in advance with your ID — we'll share the details)",
      "Breakfast on the way back",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone chasing the sea-of-clouds view without an overnight stay",
      "First-time pre-dawn trekkers — the route is easy to follow with a lead and sweep guide",
      "People who want a big Saturday-night adventure and their whole Sunday back",
    ],
    faqs: [
      { question: "Is a pre-dawn trek safe?", answer: "Yes — the group always moves together with a lead and sweep guide, torches, and a first-aid kit, on a well-marked route." },
      { question: "What should I carry?", answer: "A torch or headlamp, a warm layer (it gets cold at the top), and at least 1 litre of water." },
      { question: "How fit do I need to be?", answer: "Moderate fitness is enough — roughly 2 hours of climbing at a steady pace, done in the cool of the night rather than daytime heat." },
    ],
    isSample: true,
  },
  {
    "id": "t14",
    "slug": "lepakshi-temple-day-trip",
    "title": "Lepakshi & Adiyogi Day Trip",
    "destination": "Lepakshi, Andhra Pradesh & Chikkaballapur, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Hebbal (near the flyover)",
      "Yelahanka (NH-44)",
      "Devanahalli (near the airport)"
    ],
    "departures": [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "One day (6:00 am – about 9:30 pm)",
    "transport": "Tempo Traveller",
    "price": 1499,
    "originalPrice": 1899,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "No overnight stay — same-day trip",
    "food": "Breakfast and lunch stops on the way, pay-as-you-go (not included)",
    "categories": [
      "One Day",
      "Heritage",
      "Temple Trails"
    ],
    "coverImageLabel": "The Adiyogi statue lit against the evening sky at Chikkaballapur",
    "gallery": [],
    "description": [
      "Lepakshi is a small village just across the Andhra border that holds one of the finest pieces of Vijayanagara art anywhere: a temple of carved pillars, painted ceilings and a pillar that does not quite touch the ground, watched over by a giant stone Nandi.",
      "We spend the morning there, when the stone is still cool, then drive back towards Bengaluru to the Adiyogi statue near Chikkaballapur. The afternoon is unhurried: sunset on the lawns, then the evening light show on the statue before the short drive home."
    ],
    "highlights": [
      "The hanging pillar, the Naga lingam and some of India's largest temple ceiling paintings at Lepakshi",
      "One of the country's largest monolithic Nandis, carved from a single granite boulder",
      "Sunset and the Adiyogi Divya Darshanam light show at the 112-ft Adiyogi near Chikkaballapur",
      "Extra room on board: 11 seats on our 13-seater Tempo Traveller, so nobody is cramped"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Vijayanagara carvings to Adiyogi after dark",
        "summary": "Up NH-44 to Lepakshi for its monolithic Nandi, painted ceilings and hanging pillar, then back south to Chikkaballapur to watch the sun set behind the 112-ft Adiyogi and stay for the evening light show.",
        "stats": {
          "drive": "~5.5 hrs in total · ~280 km round trip",
          "meals": "None included (breakfast and lunch stops, pay-as-you-go)"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Hebbal (near the flyover), Yelahanka on NH-44 and Devanahalli near the airport. Wear clothes suited to a working temple and footwear that slips off easily.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:15",
            "label": "Breakfast on the highway",
            "detail": "Pay-as-you-go idli, vada and filter coffee at a stop beyond Chikkaballapur. Eat well; options around Lepakshi are limited.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:45",
            "label": "The monolithic Nandi",
            "detail": "A reclining bull roughly 4.5 m high and 8 m long, carved from a single granite boulder, its collar of bells crisp after five centuries. It faces the temple's serpent lingam.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:15",
            "label": "Veerabhadra temple, Lepakshi",
            "detail": "Built in the 1530s under the Vijayanagara kings, on a tortoise-shaped rock. See the seven-hooded Naga lingam, the unfinished wedding hall and ceiling frescoes, among the largest in India.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:15",
            "label": "The hanging pillar",
            "detail": "One of the dance hall's carved pillars barely touches the floor; visitors slide a cloth beneath it. Your trip captain will point out Sita's footprint and the legend behind the red stains.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:15",
            "label": "Jataayu Theme Park",
            "detail": "A short stop at the rocky hillock near the temple where a giant Jataayu sculpture recalls the Ramayana story that gives Lepakshi its name. Any ticket charged is on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:15",
            "label": "Lunch in Lepakshi",
            "detail": "Pay-as-you-go. A spicy Andhra meals plate with gongura pickle and rice, at a simple local restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Drive to Adiyogi, Chikkaballapur",
            "detail": "Back across the border and south on NH-44, with the boulder hills of the Nandi range rising ahead. A tea stop on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Adiyogi and the Yogeshwara Linga",
            "detail": "Walk up to the 112-ft steel face of Adiyogi at Sadhguru Sannidhi, and sit a while at the Yogeshwara Linga and the Naga shrine. Footwear goes to the stand at the entrance.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:15",
            "label": "Sunset behind Adiyogi",
            "detail": "Find a spot on the lawns as the sky colours over the hills and the statue turns to silhouette.",
            "kind": "free",
            "included": true
          },
          {
            "time": "19:00",
            "label": "Adiyogi Divya Darshanam light show",
            "detail": "Images are projected onto the statue while Sadhguru narrates the story of the first yogi; it runs daily and lasts roughly 15 minutes. Arrive early on weekends for a central view.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Start the drive back",
            "detail": "Expect a slow first few kilometres while show traffic clears; the rest is a smooth run down NH-44.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Devanahalli, Yelahanka and Hebbal from about 20:15, then RMZ Ecospace around 21:30, depending on city traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges",
      "Sightseeing as per the itinerary: Lepakshi Nandi, Veerabhadra temple and Jataayu Theme Park",
      "Adiyogi visit with the evening Divya Darshanam light show",
      "Andhra Pradesh interstate permit",
      "Trip WhatsApp group with live location and updates"
    ],
    "exclusions": [
      "Breakfast, lunch and snacks (we stop at good local places; you pay as you go)",
      "Optional activities and any adventure sports",
      "Entry fees not listed above, and any guide or offering at the temples",
      "Personal expenses and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Art and history lovers who want to see Vijayanagara craft up close",
      "Anyone who wants to catch the Adiyogi light show without driving back at night themselves",
      "Families and first-timers: flat walking, short drives and plenty of breaks"
    ],
    "faqs": [
      {
        "question": "How far are Lepakshi and Adiyogi from Bengaluru?",
        "answer": "Lepakshi is about 120 km, roughly 2.5 hours up NH-44. Adiyogi near Chikkaballapur is about 60 km from the city, so the drive home after the show is under 2 hours."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Solo travellers are common on our day trips, and your trip captain keeps the group together at meals and stops."
      },
      {
        "question": "What should I carry?",
        "answer": "Clothes that cover shoulders and knees, socks for hot stone floors, a cap, sunscreen, a water bottle and a light layer for the evening at Adiyogi."
      },
      {
        "question": "Why do we stay at Adiyogi until after dark?",
        "answer": "The Divya Darshanam light show starts at 19:00 every day, so we arrive in the late afternoon, catch the sunset around 18:15 and leave straight after the show."
      }
    ],
    "coverImage": "/photos/lepakshi-nagalinga.jpg"
  },
  {
    id: "t15",
    slug: "melkote-temple-trail",
    title: "Melkote Temple Trail",
    destination: "Melkote, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    departures: [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "One day (6:00 am – about 6:00 pm)",
    transport: "Tempo Traveller",
    price: 1499,
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "N/A — same-day trip, no overnight stay",
    food: "Tea/breakfast stop and lunch on your own at local eateries",
    categories: ["Temple Trails", "One Day", "Heritage"],
    coverImageLabel: "The stepped Kalyani tank at Melkote, with the hilltop temple beyond",
    coverImage: "/photos/melkote-kalyani-tank.jpg",
    gallery: [
      "The Kalyani stepped tank at Cheluvanarayana Swamy Temple",
      "Steps leading up to the Yoganarasimha Temple",
      "Panoramic view over the Melkote hills",
    ],
    description: [
      "Melkote is a quieter kind of pilgrimage town — a hilltop settlement in Mandya district closely tied to the Sri Vaishnava saint Ramanujacharya, who lived here for years, and still one of the least touristy temple destinations within easy reach of Bengaluru.",
      "The plan is simple: the Cheluvanarayana Swamy Temple and its striking stepped Kalyani tank down in the town, then a climb up to the Yoganarasimha Temple on the hill above for one of the best 360-degree views in the region.",
    ],
    highlights: [
      "Cheluvanarayana Swamy Temple and the ornate stepped Kalyani tank",
      "The climb up to Yoganarasimha Temple for panoramic hill views",
      "A genuinely uncrowded pilgrimage town, even on weekends",
      "Strong Ramanujacharya history for anyone into temple history",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Ramanuja's hill town above the Cauvery",
        "summary": "Out along the Mysuru expressway and through Mandya's cane fields to Melkote. The stepped Kalyani and Cheluvanarayana Swamy Temple come first, then the climb to Yoga Narasimha and a lunch of the town's famous puliyogare.",
        "stats": {
          "drive": "~2.5–3 hrs · ~140 km each way"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots and live location go on the trip WhatsApp group. Wear modest clothing and easy slip-off footwear, and carry water and a cap for the hill climb.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Depart Bengaluru via the Mysuru expressway",
            "detail": "A smooth, quick run southwest past Ramanagara's granite outcrops and Channapatna as the sun comes up.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast stop near Maddur",
            "detail": "The town that gave its name to the crisp, onion-flecked Maddur vade. Try it with idli and filter coffee at your own cost.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "10:00",
            "label": "Arrive Melkote, Kalyani and Raya Gopura",
            "detail": "Walk down to the Pancha Kalyani, a broad stepped tank lined with pillared mandapas. Continue to the twin Akka-Tangi tanks and the unfinished Raya Gopura gateway, a short walk away.",
            "kind": "activity"
          },
          {
            "time": "10:45",
            "label": "Cheluvanarayana Swamy Temple",
            "detail": "The heart of Melkote, where Ramanujacharya spent about 12 years. Look for the finely carved pillars. Photography is not allowed inside, and weekend morning darshan runs until around 1:30.",
            "kind": "activity"
          },
          {
            "time": "12:00",
            "label": "Climb to Yoga Narasimha Temple",
            "detail": "Roughly 400 stone steps, 20–40 minutes, to the hilltop shrine on Yadugiri. From the top you get sweeping views over the Cauvery plains and the town's tanks below. Morning darshan usually closes by 1:00 on weekdays and 2:00 on weekends.",
            "kind": "activity"
          },
          {
            "time": "13:15",
            "label": "Lunch in town, puliyogare and pongal",
            "detail": "Melkote's Iyengar kitchens are known for tangy puliyogare and sakkare pongal. Local messes near the main temple serve simple vegetarian meals at your own cost.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:15",
            "label": "Free time in the old streets",
            "detail": "Wander past the agraharas and Sanskrit institutions, or browse the local handloom weaves before boarding.",
            "kind": "free"
          },
          {
            "time": "14:45",
            "label": "Depart for Bengaluru, trip ends ~18:00",
            "detail": "Back via Mandya and the expressway with drop-offs at Kengeri, RR Nagar and Banashankari. Sunday evening traffic entering the city decides the final time.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC Tempo Traveller pickup and drop from Bengaluru",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Breakfast and lunch",
      "Temple donations or special darshan fees, if any",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants a quieter, less commercial temple town",
      "Slow-travel and history-minded folks",
      "First-time group travellers looking for an easy day out",
    ],
    faqs: [
      { question: "Is this trip beginner-friendly?", answer: "Yes, though the climb up to Yoganarasimha Temple involves a flight of steps — moderate fitness is enough." },
      { question: "How far is Melkote from Bengaluru?", answer: "Around 145km via Mandya, roughly 3 hours each way." },
      { question: "Is there a dress code?", answer: "Standard modest temple dress — covered shoulders and knees." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    "id": "t16",
    "slug": "talakadu-shivanasamudra-temple-trail",
    "title": "Shivanasamudra, Talakadu & Taksham Monastery Day Trip",
    "destination": "Shivanasamudra, Talakadu & Kollegal, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Banashankari (BDA Complex)",
      "RR Nagar (Mysore Road)",
      "Kengeri (Mysore Road)"
    ],
    "departures": [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "One day (6:00 am – about 9:45 pm)",
    "transport": "Tempo Traveller",
    "price": 1699,
    "originalPrice": 2199,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "No overnight stay — same-day trip",
    "food": "Breakfast and lunch stops on the way, pay-as-you-go (not included)",
    "categories": [
      "One Day",
      "Nature",
      "Heritage",
      "Temple Trails"
    ],
    "coverImageLabel": "Bharachukki Falls spreading across the rocks in full monsoon flow",
    "gallery": [],
    "description": [
      "South of Bengaluru, the Kaveri splits around an island and throws itself off the Deccan edge in two very different waterfalls. A little downstream, whole temples lie half-buried in sand at Talakadu, and in the dry hills beyond Kollegal, a Tibetan monastery hums with prayer.",
      "This day trip strings all three together. We start at Taksham Monastery in the Dhondenling settlement, spend the middle of the day at Bharachukki and Gaganachukki, and finish on the dunes of Talakadu with sunset over the river, before driving home on the expressway."
    ],
    "highlights": [
      "Both faces of Shivanasamudra: the broad curtain of Bharachukki and the narrow plunge of Gaganachukki",
      "Talakadu's temples rising out of sand dunes, and a riverside sunset on the Kaveri",
      "A quiet hour at Taksham Monastery in the Dhondenling Tibetan settlement",
      "Extra room on board: 11 seats on our 13-seater Tempo Traveller, so the long day stays comfortable"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "A monastery, two waterfalls and sand temples",
        "summary": "Down the Mysuru expressway and into Kaveri country: a Tibetan monastery in the scrub beyond Kollegal, the twin falls of Shivanasamudra, then Talakadu's temples half-swallowed by sand as the sun goes down over the river.",
        "stats": {
          "drive": "~8 hrs in total · ~420 km round trip",
          "meals": "None included (breakfast and lunch stops, pay-as-you-go)"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari (BDA Complex), RR Nagar and Kengeri on Mysore Road. Wear shoes with good grip; the falls viewpoints have uneven, sometimes wet steps.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:15",
            "label": "Breakfast stop at Maddur",
            "detail": "Pay-as-you-go. The town's famous crisp, onion-flecked Maddur vade with filter coffee is the obvious order.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "08:45",
            "label": "Drive via Malavalli and Kollegal",
            "detail": "Sugarcane and paddy give way to dry hills and forest edges as we head south towards Hanur and the Tibetan settlement at Odeyarapalya.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "11:15",
            "label": "Taksham Monastery, Dhondenling",
            "detail": "One of five monasteries in the Dhondenling Tibetan settlement: prayer flags, painted murals, rows of prayer wheels and maroon-robed monks. Remove shoes in the prayer hall and ask before photographing.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:15",
            "label": "Back towards the Kaveri",
            "detail": "We retrace the road through Kollegal to the southern bank of the river at Shivanasamudra.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Bharachukki Falls",
            "detail": "The Kaveri spreads into a wide, horseshoe-shaped curtain of water here. Steps lead down to closer views; coracle rides, when water levels allow, are optional and on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "14:15",
            "label": "Lunch near Shivanasamudra",
            "detail": "Pay-as-you-go. A simple countryside restaurant serving Karnataka meals, ragi mudde and rice plates.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Gaganachukki Falls",
            "detail": "On the other arm of the river, the water drops in a narrow, roaring plunge into a deep gorge, best seen from the viewpoint near the dargah. Fullest from July to October.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Talakadu's sand-buried temples",
            "detail": "Walk across soft dunes to the Vaidyeshwara and Hoysala-era Kirthinarayana temples, emerging from the sand that legend links to the curse of Alamelamma. Footwear stays off inside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:45",
            "label": "Sunset on the Kaveri at Talakadu",
            "detail": "The river bends lazily past sandbanks and shallow water here. Dip your feet or watch the coracles as the light goes gold around 18:15.",
            "kind": "free",
            "included": true
          },
          {
            "time": "18:15",
            "label": "Start the drive back to Bengaluru",
            "detail": "Via Malavalli and Maddur onto the expressway, with a short tea stop on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:45",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Kengeri, RR Nagar, Banashankari and finally RMZ Ecospace, from about 21:00 onwards. Timing depends on traffic entering the city.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges",
      "Sightseeing as per the itinerary: Taksham Monastery, Bharachukki and Gaganachukki falls, and the Talakadu temples",
      "Trip WhatsApp group with live location and updates"
    ],
    "exclusions": [
      "Breakfast, lunch and snacks (we stop at good local places; you pay as you go)",
      "Coracle rides and any other optional activities or adventure sports",
      "Entry fees not listed above",
      "Personal expenses and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants a full, varied day out of the city without an overnight stay",
      "Monsoon chasers: the falls are at their most dramatic from July to October",
      "Temple and history lovers curious about Talakadu's legends and Hoysala carving"
    ],
    "faqs": [
      {
        "question": "How far is it, and how long is the drive?",
        "answer": "It is a loop of roughly 420 km in total, about 8 hours of driving across the day. The first leg to the monastery takes around 4 hours with breakfast, and the return from Talakadu about 3 hours."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Solo travellers are common on our day trips, and your trip captain makes sure nobody is left out at meals or viewpoints."
      },
      {
        "question": "What should I carry?",
        "answer": "A water bottle, sunscreen, a cap, a light rain jacket in the monsoon, shoes with grip for the falls, and socks for walking on hot sand and temple floors."
      },
      {
        "question": "When are the falls at their best?",
        "answer": "From July to October, when the Kaveri is full. In summer the flow drops to thin streams over the rocks, though the gorge is still worth seeing and Talakadu is pleasanter."
      },
      {
        "question": "Do we also visit Somanathapura?",
        "answer": "Not on this route. The day covers Taksham Monastery, both falls and Talakadu; Somanathapura's Hoysala temple would not fit without cutting time at the falls."
      }
    ],
    "coverImage": "/photos/talakadu-sand-temple.jpg"
  },
  {
    id: "t17",
    slug: "nanjangud-mysore-temple-trail",
    title: "Nanjangud & Chamundi Hill Temple Trail",
    destination: "Nanjangud & Mysuru, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    departures: [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 25}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "One day (5:30 am – about 8:00 pm)",
    transport: "Tempo Traveller",
    price: 1699,
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "N/A — same-day trip, no overnight stay",
    food: "Tea/breakfast stop and lunch on your own at local eateries",
    categories: ["Temple Trails", "One Day", "Heritage"],
    coverImageLabel: "Chamundeshwari Temple atop Chamundi Hill overlooking Mysuru",
    coverImage: "/photos/chamundi-hill-temple.jpg",
    gallery: [
      "Srikanteshwara Temple's tall gopura at Nanjangud",
      "The giant Nandi statue and steps up Chamundi Hill",
      "View over Mysuru city from Chamundi Hill",
    ],
    description: [
      "This one covers two of Karnataka's biggest active temples in a single long day — Srikanteshwara Temple in Nanjangud, one of the largest temple complexes in the state and known locally as 'Dakshina Kashi' (the Varanasi of the South), and Chamundeshwari Temple on Chamundi Hill above Mysuru, the presiding deity of the old Mysore royal family.",
      "It's a longer day than our other temple trails, but the payoff is real: two major pilgrimage sites and a proper hilltop view over Mysuru, all without an overnight stay.",
    ],
    highlights: [
      "Srikanteshwara Temple — one of Karnataka's largest temple complexes, on the banks of the Kapila river",
      "Chamundeshwari Temple atop Chamundi Hill, seat of the Mysore royal family's deity",
      "The giant Nandi statue partway up Chamundi Hill",
      "Panoramic views over Mysuru city from the hilltop",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Dakshina Kashi and the goddess of Mysuru",
        "summary": "Morning darshan at Nanjangud's Srikanteshwara Temple on the Kapila, lunch and a little free time in Mysuru, then Chamundi Hill when the temple reopens after its afternoon break, with the great Nandi on the way.",
        "stats": {
          "drive": "~6 hrs total · ~360 km round trip"
        },
        "items": [
          {
            "time": "05:30",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots and live location go on the trip WhatsApp group. exact point and order on the trip WhatsApp group. Traditional or modest clothing covering shoulders and knees suits both temples.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Depart Bengaluru",
            "detail": "Along the Bengaluru–Mysuru expressway, an easy early-morning run before the traffic builds.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:15",
            "label": "Breakfast stop en route",
            "detail": "A local eatery around Maddur or Mandya for idli, vada and filter coffee; Maddur vada is the one to try.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:15",
            "label": "Srikanteshwara Temple, Nanjangud",
            "detail": "Darshan of Lord Nanjundeshwara beneath the 120-foot, nine-tiered gopura crowned with gold kalashas. Footwear is left outside; weekend queues move steadily but allow an hour or more.",
            "kind": "activity"
          },
          {
            "time": "10:45",
            "label": "Kapila riverbank and temple streets",
            "detail": "A short walk to the bathing ghats on the Kapila, and time to look for Nanjangud rasabale, the town's GI-tagged banana, at stalls near the temple.",
            "kind": "free"
          },
          {
            "time": "11:45",
            "label": "Drive to Mysuru",
            "detail": "About 25 km, roughly 45 minutes, into the city.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Mysuru",
            "detail": "Mysuru is good for a traditional South Indian meal; pick up Mysore pak, the city's own ghee-rich sweet, to take home.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:45",
            "label": "Free time in Mysuru",
            "detail": "Rest, shop, or see the palace from outside while the Chamundeshwari Temple closes for its afternoon break. Palace entry is not part of this trip.",
            "kind": "free"
          },
          {
            "time": "14:45",
            "label": "Nandi statue on Chamundi Hill",
            "detail": "The 15-foot monolithic Nandi, carved from a single granite rock near the 800th of the hill's 1,000 steps, reached by road on the way up.",
            "kind": "activity"
          },
          {
            "time": "15:30",
            "label": "Chamundeshwari Temple darshan",
            "detail": "The hilltop temple of the Mysore royal family's deity reopens around 15:30. Plastic is not allowed on the hill; special darshan tickets, if chosen, are pay-on-your-own.",
            "kind": "activity"
          },
          {
            "time": "16:45",
            "label": "Hilltop viewpoint and Mahishasura statue",
            "detail": "Look out over Mysuru city and the palace from the edge of the hill, beside the colourful Mahishasura figure.",
            "kind": "free"
          },
          {
            "time": "17:15",
            "label": "Depart for Bengaluru",
            "detail": "Back down the hill and onto the expressway; Sunday evening traffic into the city can add time.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop at the same pickup points in reverse order.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC Tempo Traveller pickup and drop from Bengaluru",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Breakfast and lunch",
      "Temple donations or special darshan fees, if any",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants two major temples covered in one trip",
      "First-time group travellers comfortable with a longer day out",
      "Families — both stops are easy walking, no trekking involved",
    ],
    faqs: [
      { question: "Is this a long day?", answer: "Yes, it's our longest single-day temple trip at roughly 9-10 hours round trip including both stops — worth it for covering two major temples, but let us know if you'd prefer to split it into two separate trips instead." },
      { question: "How far is Nanjangud from Bengaluru?", answer: "Around 150km; Chamundi Hill near Mysuru is a further 25km or so from Nanjangud." },
      { question: "Is there a dress code?", answer: "Standard modest temple dress — covered shoulders and knees." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t18",
    slug: "sringeri-horanadu-kalasa-temple-circuit",
    title: "Sringeri – Horanadu – Kalasa Temple Circuit",
    destination: "Chikkamagaluru district, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Yeshwanthpur (Metro station)", "Goraguntepalya (Tumkur Road)", "Nelamangala (Tumkur Road toll)"],
    departures: [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Tempo Traveller",
    price: 5999,
    originalPrice: 7399, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 20,
    seatsLeft: 20,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Guesthouse/homestay near Horanadu or Kalasa, twin sharing",
    food: "Breakfast both days included; free temple prasadam lunch at Horanadu; dinner and Day 2 lunch on your own",
    categories: ["Temple Trails", "Weekend", "2 Days", "Heritage"],
    coverImageLabel: "The Sharada Peetham temple complex at Sringeri on the Tunga river",
    coverImage: "/photos/sringeri-sharada-temple.jpg",
    gallery: [
      "Vidyashankara Temple at Sringeri at sunrise",
      "Annapoorneshwari Temple at Horanadu",
      "The Bhadra river at Kalasa",
    ],
    description: [
      "This is our full temple weekend — three of Karnataka's most important pilgrimage sites, all within the same forested pocket of the Western Ghats in Chikkamagaluru district: Sringeri, seat of the Sharada Peetham founded by Adi Shankara; Horanadu, home to the Annapoorneshwari Temple and its famous free community lunch; and Kalasa, a quieter riverside temple town on the Bhadra.",
      "It's a genuine overnight haul to get out here, which is exactly why most people never do all three in one trip — we've built the whole weekend around it so you don't have to plan a thing.",
    ],
    highlights: [
      "Sharada Peetham and Vidyashankara Temple at Sringeri, on the banks of the Tunga",
      "Annapoorneshwari Temple at Horanadu, including its free community prasadam lunch",
      "Kalaseshwara Temple at Kalasa on the Bhadra river",
      "A genuinely offbeat Western Ghats temple circuit, well outside the usual weekend crowd",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Sringeri at dawn, Horanadu and Kalasa",
        "summary": "An overnight drive into the Western Ghats brings you to Sringeri for early darshan on the Tunga, then on through forest roads to Horanadu for the Annapoorneshwari prasadam lunch and Kalasa's riverside temple in the afternoon.",
        "stats": {
          "drive": "~7.5 hrs overnight · ~330 km, then ~2 hrs local",
          "stay": "Guesthouse or homestay near Horanadu or Kalasa, twin sharing",
          "meals": "Breakfast, prasadam lunch at Horanadu"
        },
        "items": [
          {
            "time": "22:00",
            "label": "Depart Bengaluru (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur, Goraguntepalya and Nelamangala; exact spots and live location go on the trip WhatsApp group. Pack a shawl or towel; men will need one at Horanadu.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:30",
            "label": "Arrive Sringeri, freshen up",
            "detail": "A quiet pre-dawn arrival in the temple town on the banks of the Tunga.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Sharadamba Temple darshan",
            "detail": "The shrine of Goddess Sharada at the peetham founded by Adi Shankaracharya opens at 06:00, so early darshan is usually unhurried. Modest traditional dress is appropriate.",
            "kind": "activity"
          },
          {
            "time": "07:30",
            "label": "Vidyashankara Temple and the Tunga ghat",
            "detail": "The 14th-century stone temple is known for its twelve zodiac pillars. Below it, large sacred fish gather at the river steps, where devotees feed them.",
            "kind": "activity"
          },
          {
            "time": "09:00",
            "label": "Breakfast",
            "detail": "A South Indian breakfast in Sringeri before the drive.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Optional: Guru Darshan or riverside time",
            "detail": "When the Jagadguru is in residence, Guru Darshan is usually held 10:30–11:30, subject to change; otherwise a slow walk across the bridge to the Narasimha Vana side.",
            "kind": "free"
          },
          {
            "time": "11:15",
            "label": "Drive to Horanadu",
            "detail": "About 50 km, roughly 90 minutes, on winding forest and plantation roads through Kalasa; take motion-sickness precautions if needed.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "12:45",
            "label": "Annapoorneshwari Temple darshan",
            "detail": "The golden form of Goddess Annapoorneshwari, open 11:00–14:00 for the midday session. Men remove shirts and vests and cover their shoulders with a towel or shawl.",
            "kind": "activity"
          },
          {
            "time": "13:30",
            "label": "Prasadam lunch at the temple",
            "detail": "The temple's free annadana, a simple vegetarian meal served to every visitor between about 12:00 and 15:00, eaten seated in the dining hall.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "15:00",
            "label": "Drive to Kalasa",
            "detail": "Around 8 km, about 20 minutes, down to the Bhadra.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "15:30",
            "label": "Kalaseshwara Temple and the Bhadra",
            "detail": "The temple reopens at 15:30 after its midday break; afterwards, time by the river at Amba Theertha, one of Kalasa's five sacred tirthas.",
            "kind": "activity"
          },
          {
            "time": "17:00",
            "label": "Check in, evening at leisure",
            "detail": "Rest after the overnight journey. Horanadu's evening darshan, roughly 19:00–21:30, is an option if you are staying close by.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner",
            "detail": "At the guesthouse or a local eatery; food in these temple towns is simple and vegetarian-leaning.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 2,
        "title": "Coffee-country roads and Belur on the way home",
        "summary": "An unhurried breakfast, then back through the coffee estates via Kottigehara and Mudigere with a stop at Belur's Chennakeshava Temple, a UNESCO World Heritage site, before the drive to Bengaluru.",
        "stats": {
          "drive": "~7.5 hrs · ~310 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:45",
            "label": "Optional: Horanadu morning darshan",
            "detail": "The morning session runs roughly 06:30–09:00 and is usually quieter than midday; best if your stay is near Horanadu.",
            "kind": "free"
          },
          {
            "time": "08:00",
            "label": "Breakfast",
            "detail": "At the guesthouse or homestay.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Check out and drive via Kottigehara",
            "detail": "Around 80 km, about 2.5 hours, up through coffee and pepper estates and down past Mudigere to Belur.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Chennakeshava Temple, Belur",
            "detail": "Built in 1117, this Hoysala temple is covered in soapstone carving, including the celebrated madanika bracket figures. Allow an hour; hiring a local guide is optional and pay-on-your-own.",
            "kind": "activity"
          },
          {
            "time": "13:00",
            "label": "Lunch in Belur",
            "detail": "A local vegetarian meal near the temple before the long leg home.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Depart for Bengaluru",
            "detail": "Via Hassan on NH-75, roughly 220 km with a tea break on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop at Nelamangala, Goraguntepalya and Yeshwanthpur; Sunday evening traffic into the city can add time.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC Tempo Traveller pickup and drop from Bengaluru",
      "1 night stay, twin sharing",
      "Breakfast both days",
      "Community prasadam lunch at Horanadu",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Dinner Day 1 and lunch Day 2",
      "Temple donations or special darshan fees, if any",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants a proper temple pilgrimage weekend, not just a day trip",
      "First-time group travellers okay with an overnight journey out and back",
      "Photographers and Western Ghats fans — this route is genuinely scenic, not just about the temples",
    ],
    faqs: [
      { question: "Is this trip beginner-friendly?", answer: "Yes — all three temple stops involve normal walking, no trekking. The main thing to plan around is the overnight travel both ways." },
      { question: "How far is Sringeri from Bengaluru?", answer: "Around 330km, roughly 7-8 hours by road, which is why we travel overnight on Friday to make the most of Saturday and Sunday." },
      { question: "Is the Horanadu lunch really free?", answer: "Yes — Annapoorneshwari Temple runs a free community lunch (annadanam) for all visitors, a genuine highlight of the trip." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t19",
    slug: "tirupati-balaji-weekend-darshan",
    title: "Tirupati Balaji Weekend Darshan",
    destination: "Tirumala, Andhra Pradesh",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "KR Puram (Old Madras Road)", "Whitefield (ITPL Main Road)", "Hoskote (NH-75 toll)"],
    departures: [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Tempo Traveller",
    price: 5999,
    originalPrice: 7399, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 20,
    seatsLeft: 20,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Guesthouse/lodge near Tirumala or Tirupati town, twin sharing",
    food: "Breakfast both days included, other meals on your own",
    categories: ["Temple Trails", "Weekend", "2 Days", "Heritage"],
    coverImageLabel: "The gopuram of the Sri Venkateswara Temple complex at Tirumala",
    coverImage: "/photos/tirupati-tirumala-gopuram.jpg",
    gallery: [
      "Pilgrims on the approach to the main temple",
      "Silathoranam, the natural rock arch near Tirumala",
      "The hills around Tirumala at sunrise",
    ],
    description: [
      "Tirupati's Sri Venkateswara Temple is one of the most visited pilgrimage sites on earth, and one of the most common weekend trips Bengaluru families make — we run it the way most people actually want it done: overnight travel so you don't burn a weekday, sorted logistics, and someone who knows the process handling the parts that trip up first-timers.",
      "Darshan queue times genuinely vary day to day and aren't something anyone can promise in advance — what we can promise is that you won't be figuring out tickets, queues or where to stay on your own.",
    ],
    highlights: [
      "Darshan at the Sri Venkateswara Temple, Tirumala",
      "Guidance through the ticket and queue process on the day",
      "Optional stop at Sri Padmavathi Temple, Tiruchanur",
      "Silathoranam natural rock arch and the Tirumala hills",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Overnight to Tirupati, darshan at Tirumala",
        "summary": "Travel overnight and rest before breakfast, then up the ghat road to Tirumala for darshan of Sri Venkateswara. We help you through each step, and the Silathoranam rock arch nearby is a stop if time allows.",
        "stats": {
          "drive": "~6 hrs overnight · ~250 km, then ~2 hrs ghat",
          "stay": "Guesthouse or lodge near Tirumala or Tirupati town, twin sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "21:00",
            "label": "Depart Bengaluru (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then KR Puram, Whitefield and Hoskote; exact spots and live location go on the trip WhatsApp group.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "03:30",
            "label": "Arrive Tirupati, check in and rest",
            "detail": "A few hours' sleep before the day. Lay out traditional clothes now, as the dress code is strictly checked for paid darshan.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast",
            "detail": "A South Indian breakfast before heading up the hill.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Alipiri checkpoint and ghat road to Tirumala",
            "detail": "Vehicles and bags are security-checked at Alipiri before the roughly hour-long climb through the Seshachalam hills. Leave prohibited items behind.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "10:15",
            "label": "Deposit phones and footwear, join the queue",
            "detail": "Phones, cameras and smartwatches are not allowed in the queue complex. Men wear dhoti or kurta-pyjama; women saree, half-saree or churidar with dupatta. No jeans or western wear.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Darshan of Sri Venkateswara",
            "detail": "With a pre-booked Special Entry (Seeghra) slot, allow around 3–6 hours; the free Slotted Sarva Darshan can take 10–24 hours on weekends. We will guide you through whichever option you hold.",
            "kind": "activity"
          },
          {
            "time": "15:00",
            "label": "Laddu prasadam and a late lunch",
            "detail": "Collect laddu prasadam at the counters after darshan. TTD's free annaprasadam hall serves simple meals, or eat at a Tirumala eatery.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "16:30",
            "label": "Silathoranam rock arch (time permitting)",
            "detail": "A natural stone arch around a kilometre from the temple, said to resemble the conch and discus of the Lord. We visit only if darshan finishes in good time.",
            "kind": "activity"
          },
          {
            "time": "18:00",
            "label": "Down to Tirupati, evening at leisure",
            "detail": "Back down the ghat. Dinner is on your own; darshan running late shifts this return.",
            "kind": "free"
          }
        ]
      },
      {
        "day": 2,
        "title": "Goddess Padmavathi and the road home",
        "summary": "A morning at Tiruchanur for darshan of Goddess Padmavathi, traditionally visited alongside Tirumala, and a stop at Kapila Theertham at the foot of the hills before the drive back to Bengaluru.",
        "stats": {
          "drive": "~7 hrs · ~260 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast",
            "detail": "At the guesthouse or a nearby eatery.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Sri Padmavathi Temple, Tiruchanur (optional)",
            "detail": "About 5 km from Tirupati, the temple of the Lord's consort, traditionally visited alongside Tirumala. Mornings are usually calmer; traditional dress is advised here too.",
            "kind": "activity"
          },
          {
            "time": "10:30",
            "label": "Kapila Theertham",
            "detail": "An old Shiva temple at the foot of the Tirumala hills, with a waterfall and temple tank that flow mainly during and after the monsoon.",
            "kind": "activity"
          },
          {
            "time": "11:45",
            "label": "Lunch in Tirupati",
            "detail": "A traditional Andhra vegetarian meal in town before check-out.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:00",
            "label": "Check out, depart for Bengaluru",
            "detail": "Back via Chittoor and Kolar with a tea break en route.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop at Hoskote, Whitefield and KR Puram; Sunday evening traffic on Old Madras Road can add time.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC Tempo Traveller pickup and drop from Bengaluru",
      "1 night stay, twin sharing",
      "Breakfast both days",
      "Guidance through the darshan ticket and queue process",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Temple darshan/seva ticket fees (paid directly, options explained before the trip)",
      "Lunch and dinner both days",
      "Personal expenses, prasadam and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who's been meaning to do a Tirupati trip and wants it planned end to end",
      "First-time group travellers who'd rather not navigate queues and tickets solo",
      "Families and larger groups going together",
    ],
    faqs: [
      { question: "How long is the darshan queue?", answer: "It genuinely varies by day and season — anywhere from a couple of hours to significantly longer on weekends and festival days. We'll walk you through ticket options (including special entry darshan) before the trip so you can decide what works for you." },
      { question: "Is there a dress code?", answer: "Yes — Tirumala enforces a dress code at the main temple: traditional wear is recommended, and shorts, t-shirts and casual western wear aren't allowed for men at some darshan lines. We'll share the exact rules before the trip." },
      { question: "How far is Tirupati from Bengaluru?", answer: "Around 250-270km via Chittoor, roughly 5-6 hours by road, which is why we travel overnight on Friday." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t20",
    slug: "adiyogi-isha-yoga-center-weekend",
    title: "Adiyogi & Isha Yoga Center Weekend",
    destination: "Coimbatore, Tamil Nadu",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Silk Board (Hosur Road)", "Electronic City (near M5 Mall)"],
    departures: [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 20}
    ],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Tempo Traveller",
    price: 6399,
    originalPrice: 7599, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 20,
    seatsLeft: 20,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Guesthouse/hotel near Isha Yoga Center or Coimbatore, twin sharing",
    food: "Breakfast both days included, other meals on your own",
    categories: ["Temple Trails", "Weekend", "2 Days", "Heritage"],
    coverImageLabel: "The 112-foot Adiyogi Shiva statue at Isha Yoga Center, Coimbatore",
    coverImage: "/photos/adiyogi-statue-dusk.jpg",
    gallery: [
      "Adiyogi statue lit up at dusk",
      "The Dhyanalinga meditation dome",
      "Isha Yoga Center against the Velliangiri hills",
    ],
    description: [
      "Isha Yoga Center, at the foothills of the Velliangiri Mountains near Coimbatore, is home to two very different things worth the trip on their own — the 112-foot Adiyogi Shiva statue, a Guinness World Record-holder for the largest bust sculpture, and the Dhyanalinga, a unique meditative energy space designed by Sadhguru that doesn't belong to any one religion.",
      "It's a longer haul than our other temple trips, but it's also the one most people already have on their list — this trip handles the travel and logistics so a Coimbatore weekend actually happens instead of staying a someday plan.",
    ],
    highlights: [
      "The 112-foot Adiyogi statue, especially striking lit up in the evening",
      "Quiet time in the Dhyanalinga meditation space, timed for the midday sound offering",
      "Isha's landscaped campus against the Velliangiri hills backdrop",
      "The evening Adiyogi Divya Darshanam light-and-sound show at the statue (weather permitting)",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Adiyogi, Dhyanalinga and the evening show",
        "summary": "After an overnight drive and a few hours' rest, a day at the Isha Yoga Center below the Velliangiri hills. Adiyogi in the morning light, silence in the Dhyanalinga at midday, and the statue lit up after dark.",
        "stats": {
          "drive": "~7.5 hrs overnight · ~370 km, then ~2 hrs local",
          "stay": "Guesthouse or hotel near Isha Yoga Center or Coimbatore, twin sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "21:30",
            "label": "Depart Bengaluru (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots and live location go on the trip WhatsApp group.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:00",
            "label": "Arrive, check in and rest",
            "detail": "A few hours' sleep. Pack clothes that cover shoulders and knees, as modest dress is expected across the Isha spaces.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast",
            "detail": "Before the drive out to Isha, about 30 km west of Coimbatore.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:45",
            "label": "Adiyogi and the Yogeshwara Linga",
            "detail": "The 112-foot Adiyogi, recognised as the world's largest bust sculpture, is best photographed in the softer morning light. Devotees offer water and neem leaves at the Yogeshwara Linga in front.",
            "kind": "activity"
          },
          {
            "time": "11:15",
            "label": "Dhyanalinga meditation",
            "detail": "The domed meditation space is open to people of all faiths. Aim to be seated for Nada Aradhana, the sound offering held 11:50–12:10. Silence is kept inside, so keep phones switched off.",
            "kind": "activity"
          },
          {
            "time": "12:45",
            "label": "Lunch on campus",
            "detail": "The centre's vegetarian eateries serve simple meals, juices and snacks through the day.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Afternoon at leisure",
            "detail": "Rest through the heat, or stay on campus for the Theerthakund water bodies (open until 20:00) or Linga Bhairavi (reopens at 16:20).",
            "kind": "free"
          },
          {
            "time": "18:15",
            "label": "Guru Pooja at Adiyogi",
            "detail": "The daily evening offering at the statue; arrive early for a good spot as weekend crowds gather for the show.",
            "kind": "activity"
          },
          {
            "time": "19:00",
            "label": "Adiyogi Divya Darshanam",
            "detail": "A video-imaging show projected onto the statue every evening at 7 pm, telling the story of Adiyogi. It is cancelled in the rain.",
            "kind": "activity"
          },
          {
            "time": "20:00",
            "label": "Return to stay, dinner",
            "detail": "Back to the guesthouse or hotel; dinner on your own.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 2,
        "title": "Perur's old Shiva temple and the drive home",
        "summary": "A relaxed breakfast and a morning at Perur Pateeswarar, a centuries-old Shiva temple on the Noyyal known for its golden Kanaka Sabha, before the long road back to Bengaluru.",
        "stats": {
          "drive": "~8 hrs · ~380 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "08:00",
            "label": "Breakfast",
            "detail": "At the guesthouse or hotel.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Check out",
            "detail": "Bags into the Tempo Traveller before the morning stop.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "09:45",
            "label": "Perur Pateeswarar Temple",
            "detail": "An ancient Shiva temple on Siruvani Road, expanded by the Cholas and later dynasties; its Kanaka Sabha holds a gilded Nataraja and finely carved pillars. It closes at noon.",
            "kind": "activity"
          },
          {
            "time": "11:30",
            "label": "Lunch in Coimbatore",
            "detail": "A Kongu-region vegetarian meal in the city before the highway.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "12:30",
            "label": "Depart for Bengaluru",
            "detail": "Back via Salem and Krishnagiri with a tea break on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop at Electronic City (M5 Mall), Silk Board and RMZ Ecospace; traffic on Hosur Road on a Sunday evening can add time.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC Tempo Traveller pickup and drop from Bengaluru",
      "1 night stay, twin sharing",
      "Breakfast both days",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch and dinner both days",
      "Any paid Isha program, therapy or session beyond general darshan/meditation visit",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone into meditation, mindfulness or Sadhguru's teachings",
      "Architecture and photography fans — the Adiyogi statue and Dhyanalinga are both striking spaces",
      "First-time visitors who've been meaning to make the trip but didn't want to plan it solo",
    ],
    faqs: [
      { question: "Is there a dress code?", answer: "Isha Yoga Center asks for modest, comfortable clothing — covered shoulders and knees is a safe default. We'll share the exact guidelines before the trip." },
      { question: "How far is Coimbatore from Bengaluru?", answer: "Around 370km, roughly 7 hours by road, which is why we travel overnight on Friday." },
      { question: "Do we need to book the Dhyanalinga session in advance?", answer: "Entry can get busy on weekends — we handle the group visit timing as part of the trip so you don't need to coordinate it yourself." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    "id": "agumbe-udupi-long-weekend",
    "slug": "agumbe-udupi-long-weekend",
    "title": "Agumbe, Sringeri & Udupi Long Weekend",
    "destination": "Sringeri, Agumbe, Udupi & Malpe, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back early Tuesday morning)",
    "transport": "Tempo Traveller",
    "price": 9499,
    "originalPrice": 11499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Rainforest homestay near Agumbe and a hotel in Udupi, triple/quad sharing",
    "food": "Breakfast on all three days, plus Saturday dinner at the Agumbe homestay",
    "categories": [
      "Long Weekend",
      "Nature",
      "Temple Trails",
      "Coastal"
    ],
    "coverImageLabel": "The Sharada Peetham temple at Sringeri",
    "coverImage": "/photos/sringeri-sharada-temple.jpg",
    "gallery": [],
    "description": [
      "This is the Malnad at its most generous: a temple town on the banks of the Tunga, a waterfall at the end of a forest path, a Jain shrine on a hilltop where the clouds pass at eye level, and Agumbe, the rainforest village that gets more rain than almost anywhere in south India.",
      "Then the road tips over the edge of the Western Ghats in fourteen hairpin bends and drops you at the sea. Udupi and Malpe finish the weekend with salt air, the Krishna temple, basalt columns off the coast and a Karavali lunch that you will be thinking about all week."
    ],
    "highlights": [
      "The 14th-century Vidyashankara temple and the Sharada temple on the Tunga riverbank at Sringeri",
      "Sunset from Kundadri hill, with the Western Ghats rolling away in every direction",
      "Driving down the Agumbe ghat's hairpin bends from rainforest to the Karavali coast",
      "Malpe beach at golden hour and the Sri Krishna temple in Udupi"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Sringeri, a forest waterfall and Kundadri",
        "summary": "Board on Friday night and wake to areca palms and river mist at Sringeri. The day moves from temples to a waterfall to a hilltop sunset, ending with dinner at a homestay deep in the Agumbe forest.",
        "stats": {
          "drive": "~8 hrs overnight · 335 km, plus ~2 hrs local",
          "stay": "Homestay near Agumbe, triple/quad sharing",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "21:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur Metro, Goraguntepalya and the Nelamangala toll on Tumkur Road. Pack a light rain jacket even outside the monsoon; Agumbe keeps its own weather.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "22:30",
            "label": "Introductions on board",
            "detail": "A quick round of names and stories with your trip captain before we head west past Kunigal and Hassan into coffee country.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:45",
            "label": "Arrive Sringeri, freshen up",
            "detail": "A halt to wash up and change. Cover shoulders and knees for the temples; you will leave footwear at the entrance.",
            "kind": "free",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Sharada temple and Vidyashankara temple",
            "detail": "The Sharada shrine opens at 06:00. Next door, the carved 14th-century Vidyashankara temple has twelve zodiac pillars, and by the river steps large mahseer gather to be fed.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast in Sringeri",
            "detail": "Hot idli, vada and Malnad coffee at a local eatery before we head into the forest.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Sirimane falls near Kigga",
            "detail": "A short flight of steps leads through the forest to a wide, thundering fall that is easy to get close to. Rocks are slippery; wear sandals with grip.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Check in at the homestay, lunch",
            "detail": "Settle in among the areca and pepper. Lunch is pay-as-you-go, often a simple Malnad meal at the homestay or nearby.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:30",
            "label": "Drive up Kundadri hill",
            "detail": "A narrow road climbs to a small Jain basadi at the summit, about 800 metres up. The last stretch is on foot; carry water.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Sunset from Kundadri",
            "detail": "Layer upon layer of forested ridges turning blue and gold. Sunset falls around 18:00 to 18:30 depending on the season.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner at the homestay",
            "detail": "A home-cooked Malnad dinner together, perhaps with akki rotti and a spicy kosambari. Listen for the frogs; the forest is loud at night.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "21:30",
            "label": "Overnight near Agumbe",
            "detail": "Keep a torch handy and your shoes indoors. Leeches appear after rain, so a pinch of salt in your pocket helps.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Down the Agumbe ghat to Malpe",
        "summary": "A misty morning in Agumbe village and a walk to Jogigundi falls, then the hairpin descent to the coast. The afternoon and evening belong to Malpe's sand and sunset.",
        "stats": {
          "drive": "~2.5 hrs · 75 km, plus ~1 hr local",
          "stay": "Hotel in Udupi, triple/quad sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast at the homestay",
            "detail": "Neer dosa or kotte kadubu with chutney, and coffee on the veranda while the mist lifts.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:45",
            "label": "Agumbe village and Doddamane",
            "detail": "A slow look at the tiled-roof village street and the old family home where the television series Malgudi Days was filmed.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Walk to Jogigundi falls",
            "detail": "An easy forest path of about fifteen minutes to a small fall that drops into a deep pool at the source of the Malapahari. Swimming is not allowed.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Agumbe viewpoint and the ghat descent",
            "detail": "A pause at the sunset point by daylight, then fourteen hairpin bends down to the coastal plain. Take motion-sickness tablets beforehand if you need them.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Check in at Udupi, lunch",
            "detail": "Pay-as-you-go. Udupi is the home of the thali; try a traditional vegetarian meal on a banana leaf, or fish curry and rice nearer Malpe.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:30",
            "label": "St Mary's Island by ferry (optional)",
            "detail": "A half-hour boat ride to hexagonal basalt columns rising from the sand. The ferry runs roughly October to May and is paid on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "17:00",
            "label": "Malpe beach and sunset",
            "detail": "Wide sand, fishing boats and the sun going down over the Arabian Sea. Water sports on the beach are optional and self-paid.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner on your own",
            "detail": "Pay-as-you-go. Ghee roast, kori rotti or a plate of goli baje; the captain will point you to a few favourites.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight in Udupi",
            "detail": "An early temple start tomorrow, so lay out clothes that cover shoulders and knees.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Udupi temples, Kaup and the drive home",
        "summary": "The Krishna temple in the cool of the morning, the lighthouse at Kaup, an optional look at a heritage village, then the long drive back over the ghats.",
        "stats": {
          "drive": "~1.5 hrs local, then ~9 hrs overnight · 400 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:30",
            "label": "Sri Krishna Matha",
            "detail": "See the deity through the carved Kanakana Kindi window and walk past the chariots on Car Street. Men remove shirts inside the inner sanctum.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast and check-out",
            "detail": "Breakfast at the hotel, then pack up. Pick up Udupi's famous banana chips and jackfruit papad before we leave.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Kaup beach and lighthouse",
            "detail": "A white lighthouse on black rocks above a clean, quiet beach. Climb it for the view down the coast if it is open.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Heritage village in Manipal (optional)",
            "detail": "A collection of old Karnataka houses, temples and crafts rebuilt piece by piece. Entry is on your own; skip it for more beach time if you prefer.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Lunch in Udupi",
            "detail": "Pay-as-you-go. A last coastal meal before the ghats.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Depart for Bengaluru",
            "detail": "We climb back into the Ghats and cross the Malnad in the evening light.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant near Hassan.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 4,
        "title": "Arrival in Bengaluru",
        "summary": "We reach Bengaluru around midnight and drop you at the same pickup points.",
        "stats": {
          "drive": "Final stretch of the drive"
        },
        "items": [
          {
            "time": "00:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Nelamangala, Goraguntepalya, Yeshwanthpur and RMZ Ecospace. Timing depends on ghat traffic and weather.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights' stay, triple/quad sharing (1 night homestay near Agumbe, 1 night hotel in Udupi)",
      "4 meals: breakfast on Saturday, Sunday and Monday, and dinner on Saturday",
      "Sightseeing as per itinerary: Sringeri temples, Sirimane falls, Kundadri hill, Agumbe and Jogigundi falls, Malpe beach, Udupi Krishna temple, Kaup beach",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Lunch on all days, Sunday dinner and any meals not listed",
      "Optional activities and adventure sports, including beach water sports",
      "Entry fees not listed, including the Manipal heritage village and the St Mary's Island ferry",
      "Personal expenses, shopping and temple offerings",
      "Travel, medical or accident insurance",
      "Extra costs caused by landslides, weather or road closures",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone craving rainforest, waterfalls and a beach in one long weekend",
      "Travellers who enjoy temple towns and old architecture as much as views",
      "People who would rather sit on a homestay veranda than in a resort lobby"
    ],
    "faqs": [
      {
        "question": "How far is it, and how long is the drive?",
        "answer": "Sringeri is about 335 km from Bengaluru, around 8 hours overnight. The return from Udupi is roughly 400 km, about 9 hours, via the ghats."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Most of our travellers book solo, and rooms are shared with travellers of the same gender."
      },
      {
        "question": "What should I carry?",
        "answer": "A rain jacket, quick-dry clothes, sandals with grip plus trekking shoes, one temple-appropriate outfit, swimwear or a change for the beach, sunscreen, a torch, a power bank and some cash for small towns."
      },
      {
        "question": "Are there leeches in Agumbe?",
        "answer": "During and just after the monsoon, yes, especially on the forest paths. They are harmless; long socks, a little salt or anti-leech spray keep them off. In the dry months you will rarely see one."
      },
      {
        "question": "Will St Mary's Island be open?",
        "answer": "The ferry usually runs from about October to May and stops during the monsoon. When it is running, the trip is optional and paid on your own; otherwise we spend the time on Malpe beach."
      }
    ]
  },
  {
    "id": "chikmagalur-sakleshpur-long-weekend",
    "slug": "chikmagalur-sakleshpur-long-weekend",
    "title": "Chikmagalur & Sakleshpur Long Weekend",
    "destination": "Chikmagalur and Sakleshpur, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back Monday night)",
    "transport": "Tempo Traveller",
    "price": 8499,
    "originalPrice": 10499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Moderate",
    "stay": "Tents in Chikmagalur and a dorm in Sakleshpur, one night each, multi-sharing",
    "food": "Breakfast on all three days, dinner on Saturday and Sunday",
    "categories": [
      "Long Weekend",
      "Trek",
      "Heritage",
      "Nature"
    ],
    "coverImageLabel": "Early light on the ridgeline below the Mullayanagiri summit temple",
    "gallery": [],
    "description": [
      "This long weekend climbs to the roof of Karnataka and then comes down gently through coffee country. You start at Mullayanagiri, the state's highest peak, as the first slot of the day opens, bump down a jeep track to Jhari Falls, and end the day watching the sun set behind the hills over Hirekolale Lake. Night one is in tents, with a bonfire and a sky full of stars when the clouds allow.",
      "Sunday takes you deeper into the Malnad to Devaramane, a hilltop temple with a grassy ridge behind it, and on to Sakleshpur for sunset near the stay. On the way home on Monday we walk the star-shaped ramparts of Manjarabad Fort and spend a long hour at Halebidu, where every inch of the Hoysaleswara temple is carved."
    ],
    "highlights": [
      "Mullayanagiri, Karnataka's highest peak, on a pre-booked morning slot",
      "The jeep track to Jhari Falls, then sunset over Hirekolale Lake and a bonfire at the tent camp",
      "Devaramane's hilltop temple and ridge, Manjarabad's star-shaped fort and the carvings of Halebidu",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Mullayanagiri, Jhari Falls and Hirekolale",
        "summary": "An overnight drive up Tumkur Road and past Hassan brings you to Mullayanagiri as the morning slot opens. The rest of the day is a waterfall, a coffee estate and a lakeside sunset.",
        "stats": {
          "drive": "~6 hrs overnight · 250 km, plus ~2.5 hrs local",
          "stay": "Tent camp near Chikmagalur",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "21:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur (Metro station), Goraguntepalya and the Nelamangala toll on Tumkur Road. Wear shoes with good grip; you will be climbing steps at dawn.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "02:30",
            "label": "Rest halt on the Hassan highway",
            "detail": "A quiet stop so we reach the hills at the right hour, not before the gates open. Tea and toilets available.",
            "kind": "free",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Mullayanagiri summit climb",
            "detail": "Our vehicle pass is booked online for the first slot, as entry is capped each day. Stone steps and a ridge path lead to the small summit temple at about 1,930 m; wind and mist are common.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:15",
            "label": "Jeep ride and walk to Jhari Falls",
            "detail": "Private vehicles are not allowed on the last rough stretch, so local 4x4 jeeps take us through coffee estates to the falls. The jeep fare is paid on the spot, split within the group.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "10:30",
            "label": "Check in at the tent camp, breakfast",
            "detail": "A hearty late breakfast, then time to shower and rest. Tents are multi-sharing, with separate washrooms for men and women.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch near the camp",
            "detail": "Pay-as-you-go. Try a Malnad meal with akki rotti and a spicy chutney.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:30",
            "label": "Coffee estate nature walk",
            "detail": "A slow walk under silver oak and jackfruit shade, with arabica and robusta bushes, pepper vines and plenty of birdsong. Leeches appear after rain; salt helps.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Sunset at Hirekolale Lake",
            "detail": "A still reservoir below the Mullayanagiri range, about 10 km from town. The sun slips behind the hills around 18:10 to 18:30 and the water turns copper.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner and bonfire at the camp",
            "detail": "Dinner together, then a bonfire with games. Layer up; the camp gets chilly after dark.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Devaramane's ridge and a Sakleshpur sunset",
        "summary": "A drive through Mudigere's coffee and paddy country to the hilltop temple at Devaramane, then on to Sakleshpur for an easy evening and sunset close to the stay.",
        "stats": {
          "drive": "~3 hrs · about 110 km with stops",
          "stay": "Dorm stay in Sakleshpur",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "08:00",
            "label": "Breakfast and check-out",
            "detail": "Eat well; the next proper meal stop is a couple of hours away.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Drive to Devaramane",
            "detail": "About 52 km via Mudigere, with coffee on the slopes and paddy in the valleys. The last stretch climbs into open grassland.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Devaramane temple and viewpoint",
            "detail": "The Kalabhairaveshwara temple sits by a pond below a grassy hill. A short climb behind it opens onto ridges and valleys in every direction; take water and a cap.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Mudigere",
            "detail": "Pay-as-you-go at a local restaurant in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Drive to Sakleshpur",
            "detail": "Down through the Hemavathi valley's coffee and cardamom estates, roughly an hour and a half.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "16:00",
            "label": "Check in at the Sakleshpur dorm",
            "detail": "Multi-sharing dorm beds with shared washrooms. Rest, shower and swap stories from the ridge.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Sunset at a viewpoint near the stay",
            "detail": "A short walk or drive to a hill facing west over the estates, where the light fades slowly behind the Western Ghats.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner at the stay",
            "detail": "Dinner together and an easy evening. Tomorrow is a heritage day and a long drive home.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Manjarabad Fort, Halebidu and home",
        "summary": "A walk on the walls of an eight-pointed hill fort, then the finest Hoysala carving in Karnataka at Halebidu, before the drive back down the Hassan highway.",
        "stats": {
          "drive": "~1.5 hrs local, then ~5 hrs · 210 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check-out",
            "detail": "Pack everything; we will not be coming back to the stay.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:45",
            "label": "Manjarabad Fort",
            "detail": "A star-shaped fort built under Tipu Sultan on a hilltop above the Bengaluru–Mangaluru highway. Walk the ramparts, peer into the old wells and look out over the ghats.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Drive to Halebidu",
            "detail": "About 75 km via Hassan through farmland and small towns.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "12:15",
            "label": "Hoysaleswara Temple, Halebidu",
            "detail": "A 12th-century twin temple, now part of UNESCO's Sacred Ensembles of the Hoysalas, with friezes of elephants, epics and dancers. A local guide helps; shoes stay outside, so the stone can be hot.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "14:00",
            "label": "Lunch in Halebidu",
            "detail": "Pay-as-you-go near the temple.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Depart for Bengaluru",
            "detail": "Back via Hassan and Kunigal on the highway, with a tea halt on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at the Nelamangala toll, Goraguntepalya, Yeshwanthpur and RMZ Ecospace. Timing depends on holiday traffic on Tumkur Road.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in tents near Chikmagalur and 1 night in a dorm in Sakleshpur, multi-sharing",
      "3 breakfasts and 2 dinners (breakfast every day, dinner on Saturday and Sunday)",
      "Mullayanagiri vehicle pass, booked online in advance",
      "Bonfire with games at the tent camp",
      "Guided coffee estate walk",
      "Sightseeing as per itinerary: Mullayanagiri, Jhari Falls, Hirekolale Lake, Devaramane, Manjarabad Fort and Halebidu",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches, Monday dinner and snacks on the road",
      "Jhari Falls jeep fare and any optional activities or adventure sports",
      "Entry fees not listed above, guide fees at Halebidu and camera fees where charged",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "People who want a little climbing with their coffee country",
      "Heritage lovers who would happily spend an hour with Hoysala carvings",
      "Solo travellers and friend groups comfortable with tents, dorms and shared washrooms"
    ],
    "faqs": [
      {
        "question": "How far is Chikmagalur from Bengaluru?",
        "answer": "About 245 km, roughly 5 to 6 hours via Hassan. We drive overnight on Friday and return on Monday from Halebidu, about 210 km, reaching Bengaluru around 20:30."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Solo travellers join most batches, and tents and dorms are allotted by gender unless you book with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "Trekking or sports shoes with grip, a fleece and a rain jacket, a torch, a small towel, a refillable bottle, a power bank, salt or leech socks in the wet months, and any personal medicines. A light sleeping sheet helps in the tents."
      },
      {
        "question": "Do we need a permit for Mullayanagiri?",
        "answer": "Yes. Vehicles can only go up with an online pass for a fixed time slot, and the number of vehicles allowed each day is capped. We book ours in advance for the morning slot; if the district shuts the road for weather or crowds, your trip captain will replace it with another viewpoint."
      },
      {
        "question": "How hard is the walking?",
        "answer": "Nothing technical. The Mullayanagiri steps and the Devaramane ridge are short but steep in places, and most people take them slowly with a few photo stops."
      }
    ],
    "coverImage": "/photos/fog-trek-summit.jpg"
  },
  {
    "id": "coorg-wayanad-long-weekend",
    "slug": "coorg-wayanad-long-weekend",
    "title": "Coorg & Wayanad Long Weekend",
    "destination": "Coorg (Kodagu), Karnataka and Wayanad, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Banashankari (BDA Complex)",
      "RR Nagar (Mysore Road)",
      "Kengeri (Mysore Road)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back Monday night)",
    "transport": "Tempo Traveller",
    "price": 9499,
    "originalPrice": 10499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Homestays in Coorg and Wayanad, one night each, triple/quad sharing",
    "food": "Breakfast on all three days, dinner on Saturday and Sunday",
    "categories": [
      "Long Weekend",
      "Nature",
      "Adventure"
    ],
    "coverImageLabel": "Sunrise cloud filling the valleys below the Mandalpatti ridge",
    "gallery": [],
    "description": [
      "Two hill districts, one long weekend. Coorg gives you the grassy Mandalpatti ridge at first light, the spray of Abbey Falls and Raja Seat glowing at dusk, with a bonfire at a coffee-country homestay to close the night. Then the road drops south through Kodagu's forests to Iruppu, a cold, loud waterfall at the edge of the Brahmagiri hills, and on across the border into Wayanad.",
      "Wayanad is wetter, wilder and a shade greener. On the last morning you wade into the pool below Soochipara's granite cliffs, then head up to 900 Kandi, where a glass bridge and a long zipline hang over the forest canopy. We leave by early afternoon so the forest roads home are behind us before they close for the night."
    ],
    "highlights": [
      "Sunrise from the Mandalpatti ridge after a jeep climb from the Abbey Falls road",
      "A coffee estate walk in Coorg and the forest walk to Iruppu Falls on the way into Wayanad",
      "A dip below Soochipara Falls and a visit to 900 Kandi's glass bridge and zipline on the final day",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Mandalpatti sunrise, Abbey Falls and Raja Seat",
        "summary": "An overnight run down Mysore Road puts you on the Mandalpatti ridge for sunrise. After a slow homestay breakfast, the day moves from waterfall spray to a Madikeri sunset and a bonfire.",
        "stats": {
          "drive": "~7 hrs overnight · 265 km, plus ~1.5 hrs local",
          "stay": "Homestay near Madikeri",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "21:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari (BDA Complex), RR Nagar and Kengeri on Mysore Road. Keep a fleece and walking shoes in your day bag; the ridge is cold at dawn.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:15",
            "label": "Jeep climb to Mandalpatti",
            "detail": "Tempo Travellers cannot manage the last rutted forest track, so we switch to local 4x4 jeeps near the Abbey Falls road. The jeep fare is paid on the spot; the entry ticket is on us.",
            "kind": "travel",
            "included": false
          },
          {
            "time": "06:00",
            "label": "Sunrise on the Mandalpatti ridge",
            "detail": "A short walk up the grassy spine to about 1,600 m, where cloud often pools in the valleys below. The site opens at 06:00; monsoon mornings can be misty and very windy.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast and check-in at the homestay",
            "detail": "A Kodava breakfast, often akki roti or puttu with curry, then a hot shower and a nap. Rooms are triple or quad sharing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Abbey Falls",
            "detail": "A paved path winds down through coffee and pepper vines to a hanging bridge facing the falls, strongest between July and October. The walk back up is steep; take it slowly.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch in Madikeri",
            "detail": "Pay-as-you-go. Pandi curry with kadambuttu, Coorg's steamed rice balls, is the dish to try.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Rest at the homestay",
            "detail": "Catch up on the sleep the overnight drive took from you, or sit out on the veranda with estate coffee.",
            "kind": "free",
            "included": true
          },
          {
            "time": "17:15",
            "label": "Sunset at Raja Seat",
            "detail": "The garden where Kodagu's kings once watched evenings fall looks west over layered ridges. Sunset is roughly 18:10 to 18:30 depending on the month.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:45",
            "label": "Madikeri market stroll",
            "detail": "Browse for Coorg coffee, cardamom, pepper, homemade wines and chocolate in the lanes around the market. Shopping is on you.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner, bonfire and music night",
            "detail": "Dinner together at the homestay, then songs and games around the fire. Pack tonight; we leave after breakfast.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Coffee estate walk, Iruppu Falls, into Wayanad",
        "summary": "A morning among the coffee bushes, then a drive through south Kodagu to Iruppu Falls. We cross into Kerala in the afternoon and watch the sun go down over Wayanad's hills.",
        "stats": {
          "drive": "~4.5 hrs · about 170 km with stops",
          "stay": "Homestay near Kalpetta, Wayanad",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Coffee estate nature walk",
            "detail": "Walk the estate paths under silver oak shade, past coffee, pepper and orange trees. Mornings are best for birds and for the smell of wet earth.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast and check-out",
            "detail": "A proper breakfast before the longest drive of the trip. Keep water and a snack in your day bag.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Drive through south Kodagu",
            "detail": "Via Virajpet and Gonikoppal, past paddy, coffee and quiet Kodava villages towards Kutta and the Brahmagiri foothills.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Iruppu Falls",
            "detail": "From the Rameshwara temple, a 15 to 20 minute forest walk leads to the falls, which drop in stages off the Brahmagiri range. Open 08:00 to 17:00; rocks are slippery.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch near Kutta",
            "detail": "Pay-as-you-go at a simple local eatery on the way to the Kerala border.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Drive into Wayanad",
            "detail": "We cross into Kerala past Tholpetty's forest and Mananthavady, with bamboo thickets and tea giving way to Wayanad's plantations.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Check in at the Wayanad homestay",
            "detail": "Settle in and freshen up. Rooms are triple or quad sharing.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "17:45",
            "label": "Sunset over the Wayanad hills",
            "detail": "A short drive to a ridge-top viewpoint near the stay, chosen by your trip captain on the day according to weather and visibility.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner at the homestay",
            "detail": "A Kerala dinner, often parotta or rice with a coconut-based curry. Early night; tomorrow starts at the waterfall.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Soochipara, 900 Kandi and the road home",
        "summary": "A morning dip beneath Soochipara Falls, then the forest canopy at 900 Kandi. We leave Wayanad by early afternoon to clear the forest check posts before the night closure.",
        "stats": {
          "drive": "~1 hr local, then ~7.5 hrs · 280 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check-out",
            "detail": "Eat well and change into clothes you can get wet in. Pack a towel and a dry set in your day bag.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Soochipara Falls and a mountain-water dip",
            "detail": "A 1.5 to 2 km walk down through forest to a pool at the foot of sheer granite. Bathing is allowed only in the marked area when the forest staff say it is safe.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Jeep up to 900 Kandi",
            "detail": "Private vehicles stop at the base; shared local 4x4 jeeps climb the last stretch through forest. The jeep fare is paid on the spot.",
            "kind": "travel",
            "included": false
          },
          {
            "time": "11:30",
            "label": "Glass bridge and zipline at 900 Kandi",
            "detail": "A privately run park with a glass walkway about 100 feet above the canopy and a long zipline, with Chembra's hills beyond. Both are optional and self-paid.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Lunch in Meppadi",
            "detail": "Pay-as-you-go. A Kerala meals plate on a banana leaf is the easy choice.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:15",
            "label": "Depart Wayanad for Bengaluru",
            "detail": "Via Sulthan Bathery, Muthanga and Bandipur, where elephants and deer often graze by the road. Forest stretches close to traffic at 21:00, so we keep to time.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "22:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Kengeri, RR Nagar, Banashankari and RMZ Ecospace. Timing depends on traffic around Mysore and on Mysore Road.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights in homestays, one near Madikeri and one near Kalpetta, triple/quad sharing",
      "3 breakfasts and 2 dinners (breakfast every day, dinner on Saturday and Sunday)",
      "Bonfire and music night at the Coorg homestay",
      "Guided coffee estate walk",
      "Entry to the places on the itinerary: Mandalpatti, Abbey Falls, Raja Seat, Iruppu Falls and Soochipara Falls",
      "Visit to 900 Kandi (the glass bridge and zipline themselves are self-paid)",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches, Monday dinner and snacks on the road",
      "Mandalpatti and 900 Kandi jeep fares, the glass bridge, the zipline and any other optional adventure activities",
      "Entry fees not listed above, and camera fees where charged",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants two very different hill districts in one long weekend without planning the route",
      "Waterfall people who do not mind getting their feet wet",
      "Solo travellers and friend groups happy with shared rooms and a bonfire evening"
    ],
    "faqs": [
      {
        "question": "How far are Coorg and Wayanad from Bengaluru?",
        "answer": "Madikeri is about 265 km away, around 6 to 7 hours by road, so we drive overnight on Friday. Wayanad to Bengaluru is about 280 km, roughly 7 to 8 hours; we leave by early afternoon on Monday and reach the city around 22:00."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Most of our long weekends have several solo travellers, and rooms are shared by gender unless you book with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "A fleece for the Mandalpatti sunrise, a light rain jacket, walking shoes with grip, sandals, a quick-dry towel and a change of clothes for Soochipara, a power bank, a refillable bottle and any personal medicines."
      },
      {
        "question": "Are the 900 Kandi glass bridge and zipline included?",
        "answer": "We take you to 900 Kandi, but the jeep up from the base, the glass bridge and the zipline are run privately and paid on the spot, so you can choose what you want to do. Mandalpatti's jeep works the same way."
      },
      {
        "question": "Is the Soochipara dip always possible?",
        "answer": "No. The forest staff close the pool, or the whole site, after heavy rain. If that happens your trip captain will swap in another waterfall or viewpoint nearby."
      }
    ],
    "coverImage": "/photos/coorg-group-selfie.jpg"
  },
  {
    "id": "gokarna-dandeli-long-weekend",
    "slug": "gokarna-dandeli-long-weekend",
    "title": "Gokarna & Dandeli Long Weekend",
    "destination": "Gokarna, Vibhuti Falls & Dandeli, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back Monday morning)",
    "transport": "Tempo Traveller",
    "price": 9499,
    "originalPrice": 10499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Moderate",
    "stay": "AC room in Gokarna (triple sharing) and a riverside tent in Dandeli (shared)",
    "food": "Breakfast on Saturday and Sunday, plus Saturday dinner at the Dandeli camp",
    "categories": [
      "Long Weekend",
      "Coastal",
      "Adventure",
      "Camping"
    ],
    "coverImageLabel": "The group out on the rocks",
    "coverImage": "/photos/gallery-group-rocks.jpg",
    "gallery": [],
    "description": [
      "Sea first, then river. Gokarna is a temple town that runs straight into a string of beaches, linked by a rocky headland trail where you can walk from Kudle to Om with the Arabian Sea on one side and cashew scrub on the other. On the way inland we stop at Vibhuti falls, tucked in the forest near the limestone spires of Yana.",
      "Dandeli sits on the Kali river inside some of Karnataka's densest forest. A night in a riverside tent, a bonfire, and a morning on the water with kayaks, a coracle-style boat ride and a swim in the calm pools, before one last sunset over the valley and the overnight drive home."
    ],
    "highlights": [
      "The beach trail from Kudle to Om beach, with swims and chai stops along the way",
      "Vibhuti falls, a forest waterfall on the drive from the coast to the Ghats",
      "A night in a tent by the Kali river with a bonfire and camp dinner",
      "Kayaking, boating and a river swim in Dandeli, with white-water rafting for those who want more"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Gokarna's beaches, Vibhuti falls, Dandeli",
        "summary": "Board on Friday night and wake near the coast. Shower at your Gokarna room, walk the beach trail, visit the old temple, then head inland past Vibhuti falls to a riverside camp in Dandeli for a bonfire night.",
        "stats": {
          "drive": "~10 hrs overnight · 480 km, plus ~4.5 hrs to Dandeli",
          "stay": "AC room in Gokarna (on arrival), then riverside tent in Dandeli",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur Metro, Goraguntepalya and the Nelamangala toll on Tumkur Road. Wear or pack quick-dry clothes; you will be wet more than once this weekend.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:30",
            "label": "Introductions on board",
            "detail": "Your trip captain gets everyone acquainted before lights down, as we drive through Tumakuru and Shivamogga towards the coast.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Arrive Gokarna, check in to the AC room",
            "detail": "The room is booked from the night before, so it is ready when we arrive. Shower, change and leave your big bag here.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Breakfast in Gokarna",
            "detail": "Masala dosa, buns and coffee at a local eatery near the temple streets.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Beach trail from Kudle to Om beach",
            "detail": "About 45 minutes over the headland on rocky paths, with the sea below you. Wear shoes with grip and carry water; there is little shade.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Om beach, water sports optional",
            "detail": "A beach shaped like the Om symbol, good for a swim where lifeguards allow it. Jet-ski and banana rides are optional and paid on your own.",
            "kind": "free",
            "included": false
          },
          {
            "time": "11:15",
            "label": "Mahabaleshwar temple and Gokarna town",
            "detail": "An ancient Shiva temple on the main beach road, with a strict dress code; men usually remove shirts inside. Then a wander along Car Street past rudraksha and brass stalls.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch and check-out",
            "detail": "Pay-as-you-go. Fish thali or a vegetarian Karavali meal, then collect bags and board.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Vibhuti falls",
            "detail": "A short walk through the forest to a waterfall pouring over limestone into a shallow pool. The steps are uneven and mossy; take it slowly.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:00",
            "label": "Drive to Dandeli",
            "detail": "Around three hours through Sirsi and Yellapur, with teak and bamboo forest closing in as we go.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:00",
            "label": "Arrive at the Dandeli camp",
            "detail": "Settle into your tent. If the camp pool is open, a night swim is a good way to shake off the drive.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Bonfire and camp dinner",
            "detail": "Dinner together around the fire, with music and games. Listen for night birds and the river in the dark.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "22:00",
            "label": "Night in a riverside tent",
            "detail": "Tents are shared and have basic bedding; common washrooms are close by. Keep a torch and mosquito repellent at hand.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "A day on the Kali river",
        "summary": "A morning of kayaking, boating and swimming on the Kali, optional white-water rafting when the season allows, and a sunset viewpoint before the drive home.",
        "stats": {
          "drive": "~1 hr local, then ~9 hrs overnight · 470 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Morning by the river",
            "detail": "An early walk along the bank for hornbills, kingfishers and river mist. Dandeli is one of the best places in Karnataka to see the great hornbill.",
            "kind": "free",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast and check-out",
            "detail": "Breakfast at the camp, then bags go into the vehicle for the day.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Kayaking, boating and a river swim",
            "detail": "Paddle a kayak on a calm stretch, take a boat ride along the forested banks and swim in the river with life jackets on. Instructors are on hand throughout.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "White-water rafting on the Kali (optional)",
            "detail": "Short and long runs through Grade II to III rapids, usually from mid-October to early June and paid on your own. It stops during the monsoon for safety.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Lunch in Dandeli",
            "detail": "Pay-as-you-go. A simple north Karnataka meal with jolada rotti if you can find it.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Rest and free time",
            "detail": "Dry off, change and rest before the evening. The camp's common area stays open for us.",
            "kind": "free",
            "included": true
          },
          {
            "time": "17:15",
            "label": "Sunset viewpoint over the Kali valley",
            "detail": "A viewpoint above the forest where the river winds away into the hills. Sunset falls around 18:00 to 18:40 depending on the season.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:45",
            "label": "Depart Dandeli for Bengaluru",
            "detail": "Out through the forest to Haliyal and on to the highway at Hubballi.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant near Hubballi, then settle in for the night.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 3,
        "title": "Early-morning arrival in Bengaluru",
        "summary": "We reach Bengaluru before the Monday rush and drop you at the same pickup points.",
        "stats": {
          "drive": "Final stretch of the overnight drive"
        },
        "items": [
          {
            "time": "04:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Nelamangala, Goraguntepalya, Yeshwanthpur and RMZ Ecospace. Timing depends on highway traffic overnight.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "AC room in Gokarna, triple sharing, ready from arrival on Saturday morning",
      "1 night in a riverside tent in Dandeli, shared, with camp pool access where available",
      "Breakfast on Saturday and Sunday, and a bonfire dinner at the Dandeli camp on Saturday",
      "Dandeli water activities: kayaking, boating and a river swim with life jackets",
      "Local sightseeing as per itinerary: Gokarna beaches and temple, Vibhuti falls, Dandeli sunset viewpoint",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Lunch on both days, Sunday dinner and any meals not listed",
      "Optional activities and adventure sports, including white-water rafting in Dandeli and beach water sports in Gokarna",
      "Entry fees not listed",
      "Personal expenses and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Friends who want beaches, a river and a bonfire in one weekend",
      "First-timers to water sports who want to try kayaking in calm water",
      "Anyone happy with simple tents and shared washrooms for a night under the trees"
    ],
    "faqs": [
      {
        "question": "How far is it, and how long is the drive?",
        "answer": "Gokarna is about 480 km from Bengaluru, around 10 hours overnight. Dandeli is about 3 hours inland from Vibhuti falls, and the return from Dandeli is roughly 470 km, about 9 hours."
      },
      {
        "question": "Do I need to know swimming for the water activities?",
        "answer": "No. Life jackets are compulsory and instructors stay with the group. If you are nervous in water, kayaking on the calm stretch is a gentle way to start."
      },
      {
        "question": "Is rafting included, and can we always do it?",
        "answer": "Rafting is optional and paid on your own. The Kali is usually open for commercial rafting from mid-October to early June and closes in the monsoon, when we stick to the calmer activities."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Most of our travellers book solo, and rooms and tents are shared with travellers of the same gender."
      },
      {
        "question": "What should I carry?",
        "answer": "Quick-dry clothes and a spare set, swimwear, a small towel, flip-flops plus shoes with grip for the beach trail, sunscreen, a cap, a torch, mosquito repellent, a dry bag or pouch for your phone, and your ID."
      }
    ]
  },
  {
    "id": "gokarna-murudeshwar-weekend",
    "slug": "gokarna-murudeshwar-weekend",
    "title": "Gokarna, Murudeshwar & Honnavar Weekend",
    "destination": "Gokarna, Murudeshwar and Honnavar, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back late Sunday night)",
    "transport": "Tempo Traveller",
    "price": 5399,
    "originalPrice": 6399,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Moderate",
    "stay": "AC rooms in Gokarna, quad sharing (1 night, Saturday)",
    "food": "Breakfast on Saturday and Sunday; other meals are pay-as-you-go",
    "categories": [
      "Weekend",
      "2 Days",
      "Coastal",
      "Trek",
      "Temple Trails"
    ],
    "coverImageLabel": "A quiet walk along a curving beach",
    "coverImage": "/photos/rameshwaram-beach-walk.jpg",
    "gallery": [],
    "description": [
      "Gokarna is a pilgrim town that happens to have some of the best coast in India. Behind the Mahabaleshwar temple, a cliff path links a string of coves, Kudle, Om, Half Moon and Paradise, each smaller and quieter than the last, with shacks and cafés where the day slows to the pace of the tide.",
      "We arrive on Saturday morning and give the day to the beach trek, the water and the cafés. Sunday runs south to Murudeshwar, where a giant Shiva sits on a headland above the sea, then back north to Honnavar, where the Sharavathi river spreads into mangrove-lined backwaters, before we climb the ghats for home."
    ],
    "highlights": [
      "The headland trek from Kudle past Om and Half Moon to Paradise beach",
      "Café hopping and sunset on Kudle beach",
      "Murudeshwar's seafront temple, its tall gopuram and giant seated Shiva",
      "The Sharavathi backwaters at Honnavar, with an optional boat through the mangroves"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Temple town, beach trek and cafés",
        "summary": "Arrive in Gokarna at dawn, walk the coastal trail from cove to cove with time in the water, and finish at a café on Kudle beach as the sun goes down.",
        "stats": {
          "drive": "~10 hrs overnight · 485 km",
          "stay": "AC rooms, Gokarna",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur, Goraguntepalya and Nelamangala; exact spots go on the trip WhatsApp group. Wear or pack proper shoes for the trek, not just flip-flops.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Arrive Gokarna, freshen up",
            "detail": "Down the ghat through Yellapur's forest to the coast. Check in to AC rooms on quad sharing, wash up and change for the beach.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Breakfast",
            "detail": "A coastal breakfast with dosa, buns and coffee before the walk.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Mahabaleshwar Temple (optional darshan)",
            "detail": "The ancient Shiva temple at the heart of the town, said to hold the Atmalinga. Traditional dress is expected; men remove shirts to enter the inner shrine.",
            "kind": "free",
            "included": false
          },
          {
            "time": "09:30",
            "label": "Beach trek: Kudle to Om",
            "detail": "Climb the headland from Kudle and follow the path over laterite rock to Om Beach, named for its two joined curves. Carry at least two litres of water.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Water activities at Om Beach",
            "detail": "Banana boat, jet ski or a boat ride along the coast, depending on the sea. All optional and paid on the spot.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "12:30",
            "label": "On to Half Moon and Paradise",
            "detail": "The trail narrows over rocks and through scrub to the quiet crescent of Half Moon, then on to little Paradise beach. A boat back to Om can be hired if legs are tired.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "14:00",
            "label": "Lunch at a beach shack",
            "detail": "Pay-as-you-go. Fish thali, pasta or a banana pancake in the shade.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "16:30",
            "label": "Café hopping and sunset at Kudle",
            "detail": "Back to Kudle for cold coffee, a swim if the sea allows and sunset from the rocks at the end of the beach.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner and overnight in Gokarna",
            "detail": "Pay-as-you-go dinner in town or by the beach, then an early night.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Murudeshwar, Honnavar backwaters and home",
        "summary": "Down the coast to Murudeshwar's seafront temple, back north to Honnavar's backwaters, then inland over the ghats via Sagar and Shivamogga to Bengaluru.",
        "stats": {
          "drive": "~3 hrs local, then ~9.5 hrs · 450 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Breakfast and check out",
            "detail": "Breakfast at the stay, then pack up and load the vehicle.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Drive south to Murudeshwar",
            "detail": "About two hours along the coastal highway, crossing river mouths and paddy fields.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Murudeshwar Temple and the Shiva statue",
            "detail": "A towering gopuram on Kanduka hill and a seated Shiva, among the tallest in the world, gazing over the Arabian Sea. The lift up the gopuram is ticketed; dress modestly.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Lunch in Murudeshwar",
            "detail": "Pay-as-you-go. A coastal meal by the beach.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:00",
            "label": "Honnavar backwaters",
            "detail": "Where the Sharavathi meets the sea, the river spreads into channels, islets and mangroves. An optional shared or private boat slides past fishing villages and green tunnels of mangrove.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Depart for Bengaluru",
            "detail": "Up the Gerusoppa ghat along the Sharavathi valley, then via Sagar and Shivamogga, with a tea break on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "00:00",
            "label": "Arrive Bengaluru (after midnight), trip ends",
            "detail": "Drops at Nelamangala, Goraguntepalya, Yeshwanthpur and RMZ Ecospace, around midnight depending on traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in Gokarna, AC rooms on quad sharing",
      "Breakfast on Saturday and Sunday",
      "Captain-led Gokarna beach trek from Kudle to Om, Half Moon and Paradise",
      "Sightseeing as per the itinerary: Murudeshwar Temple and Honnavar backwaters",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and dinners",
      "Optional activities and adventure sports, including water sports at Om Beach, beach boats and the Honnavar backwater boat",
      "Entry fees not listed, including the Murudeshwar gopuram lift",
      "Personal expenses such as café bills, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Beach lovers who don't mind earning their coves on foot",
      "Groups of friends after cafés, sea and sunsets on a budget",
      "Travellers who like a temple or two alongside the beach"
    ],
    "faqs": [
      {
        "question": "How far is Gokarna from Bengaluru?",
        "answer": "About 485 km, around 10 hours by road via Tumakuru, Chitradurga and Hubballi. We drive overnight on Friday and come back via Shivamogga on Sunday, reaching Bengaluru around midnight."
      },
      {
        "question": "How hard is the beach trek?",
        "answer": "Moderate. It is roughly 5 to 6 km over headlands with rocky, uneven stretches and little shade, but no technical climbing. Good shoes, water and sun protection make it comfortable."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Plenty of our travellers come solo; you share a room with fellow travellers, and the trek tends to turn strangers into a group quickly."
      },
      {
        "question": "What should I carry?",
        "answer": "Light, breathable clothes, trekking or sports shoes, swimwear, a quick-dry towel, sunscreen, a hat, a two-litre water bottle, a small first-aid kit and one modest outfit for the temples."
      },
      {
        "question": "Is swimming safe at Gokarna?",
        "answer": "Only in calm conditions and near lifeguards. Currents off Om and Kudle can be strong, especially soon after the monsoon; the trip captain will call it on the day."
      }
    ]
  },
  {
    "id": "kodaikanal-long-weekend",
    "slug": "kodaikanal-long-weekend",
    "title": "Kodaikanal, Vattakanal & Poombarai Long Weekend",
    "destination": "Kodaikanal, Tamil Nadu",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back late Monday night)",
    "transport": "Tempo Traveller",
    "price": 9499,
    "originalPrice": 10499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Moderate",
    "stay": "Hill stay in Kodaikanal, 2 nights, triple/quad sharing",
    "food": "Breakfast on all three days, dinner on Saturday and Sunday",
    "categories": [
      "Long Weekend",
      "Nature",
      "Trek"
    ],
    "coverImageLabel": "The group by a lake in the hills",
    "coverImage": "/photos/munnar-group-lakeside.jpg",
    "gallery": [],
    "description": [
      "Kodaikanal sits on the Palani Hills at about 2,100 m, wrapped in pine, eucalyptus and shola, and it is cold enough to want a jacket even in summer. This long weekend spends a day around Vattakanal, the little hamlet below town where a forest path leads past a waterfall to the Dolphin's Nose ledge, and follows a quieter trail your trip captain knows. The next day is Kodai's classic circuit: the Pillar Rocks, the rooty ravine of Guna Cave, the pine forest, and sunset by the lake.",
      "On the final morning we head up to the upper Palanis, where Poombarai's terraced garlic fields step down a valley and Mannavanur's lake lies among rolling grassland and grazing sheep. Then it is the long drive home down the ghat and across the plains, reaching Bengaluru late on Monday night."
    ],
    "highlights": [
      "The forest walk from Vattakanal Falls to the Dolphin's Nose ledge, plus an offbeat trail picked by your captain",
      "Pillar Rocks, Guna Cave and a sunset by Kodai Lake",
      "Poombarai's terraced fields and the grasslands around Mannavanur Lake on the final morning",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Pine forest, Vattakanal and Dolphin's Nose",
        "summary": "An overnight drive across Tamil Nadu brings you up the ghat by breakfast. After a rest, the afternoon is pine woods, a forest walk to the Dolphin's Nose and a quieter trail beyond.",
        "stats": {
          "drive": "~10.5 hrs overnight · 465 km, plus ~1 hr local",
          "stay": "Hill stay in Kodaikanal",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Your trip captain runs an icebreaker before lights out; carry a neck pillow for the long night.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:00",
            "label": "Tea halt before the ghat",
            "detail": "A stretch-and-chai stop near Batlagundu after the night run through Salem and Dindigul. The ghat road ahead has many bends; take motion-sickness tablets now if you need them.",
            "kind": "free",
            "included": false
          },
          {
            "time": "07:30",
            "label": "Arrive Kodaikanal, breakfast and check-in",
            "detail": "A hot breakfast at the stay, then showers and a rest in triple or quad sharing rooms. Our vehicle e-pass for the hills is arranged in advance.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Pine Forest",
            "detail": "Tall, straight pines planted on a slope in the early 1900s, their needles thick underfoot and the light falling in stripes. Quiet in the morning before the crowds.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Kodaikanal",
            "detail": "Pay-as-you-go. A South Indian meals plate or something from the cafés near the lake.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Vattakanal Falls and Dolphin's Nose",
            "detail": "From Vattakanal, a rocky forest path passes a small waterfall and descends to a flat rock ledge jutting over a deep valley. Echo Point is on the way; the walk back up is steep.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Offbeat forest trail",
            "detail": "A short guided walk on a quieter trail away from the main viewpoints, chosen by your trip captain on the day. Shoes with grip matter here.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner at the stay",
            "detail": "Dinner together and an early night. Nights here are cold, so keep your warm layers close.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Pillar Rocks, Guna Cave and a lakeside sunset",
        "summary": "Kodaikanal's classic circuit at an unhurried pace: giant granite pillars, a ravine of shola roots, a viewpoint or two and the evening by the lake.",
        "stats": {
          "drive": "~1.5 hrs local · about 30 km",
          "stay": "Hill stay in Kodaikanal",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "08:00",
            "label": "Breakfast at the stay",
            "detail": "Eat well; the viewpoints are best early, before the mist rises from the valleys.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Pillar Rocks",
            "detail": "Three sheer granite columns about 120 m high, often half hidden by drifting cloud. Wait a few minutes and they tend to reappear.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Guna Cave",
            "detail": "A deep cleft once called Devil's Kitchen, reached by a path laced with shola roots and open 09:00 to 16:30. The caves are grilled off, so you look in from the railings.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Moir Point and the forest road",
            "detail": "A quiet viewpoint on the forest road with a long look over the hills towards the plains, and a short stroll in the pines around it.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in town",
            "detail": "Pay-as-you-go. Try a bowl of hot soup and home-style bread at a local café.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Free time at the stay",
            "detail": "Rest, or browse for homemade chocolate, eucalyptus oil and local plums in the bazaar.",
            "kind": "free",
            "included": false
          },
          {
            "time": "16:30",
            "label": "Kodai Lake at sunset",
            "detail": "Walk the 5 km path around the star-shaped lake as the light goes gold. Cycling and boating are optional and self-paid; sunset is roughly 18:00 to 18:30.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner at the stay",
            "detail": "Dinner together. Pack tonight; tomorrow we leave early and do not return.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Poombarai, Mannavanur and the road home",
        "summary": "An early drive into the upper Palanis for terraced farmland at Poombarai and the grasslands of Mannavanur, then the long run home.",
        "stats": {
          "drive": "~3 hrs local · 80 km, then ~10.5 hrs · 465 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Breakfast and check-out",
            "detail": "An early breakfast, bags into the Tempo Traveller and we are away.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:15",
            "label": "Poombarai village viewpoint",
            "detail": "Terraced fields of garlic, carrots and beans stepping down a valley below an old Murugan temple, with the village's tin roofs in the middle. Early light is best.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Mannavanur Lake and grasslands",
            "detail": "A still lake among rolling grassland and shola, with the government sheep and rabbit farm nearby. Walk the shore, and wrap up; it is often windy and cold.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Kodaikanal",
            "detail": "Pay-as-you-go on the way back through town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Down the ghat and home",
            "detail": "Back down to Batlagundu and across the plains via Dindigul, Salem and Krishnagiri, with tea and dinner halts on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "23:45",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City (M5 Mall), Silk Board and RMZ Ecospace, usually around midnight. Timing depends on holiday traffic on Hosur Road.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights in a Kodaikanal hill stay, triple/quad sharing",
      "3 breakfasts and 2 dinners (breakfast every day, dinner on Saturday and Sunday)",
      "Entry fees for the places on the itinerary: Pine Forest, Vattakanal and Dolphin's Nose, Pillar Rocks, Guna Cave, Moir Point, Poombarai and Mannavanur",
      "Guided offbeat forest trail",
      "Vehicle e-pass for Kodaikanal, arranged by us",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches, Monday dinner and snacks on the road",
      "Boating and cycling at Kodai Lake, and any optional activities or adventure sports",
      "Entry fees not listed above, and camera fees where charged",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants proper cold-weather hills and pine forests on a long weekend",
      "Walkers who enjoy a steep forest path more than a viewpoint from the car park",
      "Solo travellers and friend groups happy with shared rooms and an early start"
    ],
    "faqs": [
      {
        "question": "How far is Kodaikanal from Bengaluru?",
        "answer": "About 465 km, roughly 10 to 11 hours via Krishnagiri, Salem and Dindigul. We drive overnight on Friday and leave Kodaikanal around 13:30 on Monday, reaching Bengaluru close to midnight."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Solo travellers join most batches, and rooms are shared by gender unless you book with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm jacket and a thinner layer, a rain jacket, walking shoes with good grip for the Dolphin's Nose path, a cap, a power bank, a refillable bottle and any personal medicines. Evenings can drop close to 10°C."
      },
      {
        "question": "Do we need an e-pass to enter Kodaikanal?",
        "answer": "Tamil Nadu has required online e-passes for vehicles entering Kodaikanal, and the rules have changed several times since 2024. We check the current rule before every batch and apply for the Tempo Traveller ourselves, so you do not need to do anything."
      },
      {
        "question": "How hard is the Dolphin's Nose walk?",
        "answer": "The path from Vattakanal is rocky and uneven, about 30 minutes down and a little longer back up. Anyone reasonably active manages it at their own pace."
      }
    ]
  },
  {
    "id": "kodaikanal-weekend-getaway",
    "slug": "kodaikanal-weekend-getaway",
    "title": "Kodaikanal Weekend Getaway",
    "destination": "Kodaikanal, Tamil Nadu",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 5999,
    "originalPrice": 6899,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Moderate",
    "stay": "Rooms in Kodaikanal, triple/quad sharing (1 night, Saturday)",
    "food": "Breakfast on Saturday and Sunday, plus Saturday dinner",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature",
      "Trek"
    ],
    "coverImageLabel": "Boats on a hill lake under misty peaks",
    "coverImage": "/photos/munnar-mattupetty-boats.jpg",
    "gallery": [],
    "description": [
      "Kodaikanal sits at over 2,000 metres in the Palani hills, a lake town wrapped in pine, eucalyptus and shola forest, where the cliffs on its southern edge drop almost straight to the plains. Mornings are crisp, mist comes and goes by the minute, and the views change with it.",
      "We drive through Friday night and climb the ghat from Batlagundu at dawn. Saturday covers the forest road to the pine forest, Guna Cave and Pillar Rocks, with an evening by the lake; Sunday walks out through Vattakanal to Dolphin's Nose and Echo Point before the drive home. Entry fees for the listed sights are part of the price."
    ],
    "highlights": [
      "The three granite columns of Pillar Rocks, often half-hidden in cloud",
      "Guna Cave's deep fissures and the pine forest on the way there",
      "A walk from Vattakanal down to Dolphin's Nose, a rock ledge over a sheer drop, with Echo Point beside it",
      "Evening by Kodai Lake, plus entry fees for the listed sights included"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Pine forest, Guna Cave, Pillar Rocks and the lake",
        "summary": "An overnight drive to the Palani hills and a dawn climb into Kodaikanal. After breakfast, the forest road's best stops, then a slow evening at the lake and dinner together.",
        "stats": {
          "drive": "~10 hrs overnight · 470 km, plus ~1 hr local",
          "stay": "Rooms, Kodaikanal",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots go on the trip WhatsApp group. Pack a warm jacket; Kodai mornings are cold.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:30",
            "label": "Tea stop near Batlagundu",
            "detail": "Coffee at the foot of the hills. Take motion-sickness tablets now if you need them; the ghat is long and winding.",
            "kind": "free",
            "included": false
          },
          {
            "time": "07:30",
            "label": "Arrive Kodaikanal, breakfast and check in",
            "detail": "Breakfast, then check in to rooms on triple or quad sharing and freshen up.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Pine forest",
            "detail": "Tall pines planted in straight ranks on a hillside, the light filtering through in shafts. Paths are soft underfoot and steep in places.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Guna Cave",
            "detail": "Deep, narrow fissures in the rock between the Pillar Rocks, now fenced for safety, so you view them from walkways. The walk in passes gnarled roots and shola.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Pillar Rocks",
            "detail": "Three sheer granite pillars standing about 120 metres tall, often swallowed by cloud and revealed again minutes later. Wait for the gaps.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch in town",
            "detail": "Pay-as-you-go. Try a Tamil meals plate or a plate of hot bajji.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "16:00",
            "label": "Kodai Lake",
            "detail": "A star-shaped lake ringed by a five-kilometre path. Walk it, cycle it or take a boat out; bikes and boats are optional and paid on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:30",
            "label": "Free time in town",
            "detail": "Browse homemade chocolate and eucalyptus oil stalls near the lake, or warm up with a hot drink.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner and overnight in Kodaikanal",
            "detail": "Dinner together, then an early night before tomorrow's walk.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Vattakanal, Dolphin's Nose and the road home",
        "summary": "Breakfast, then a walk from the hamlet of Vattakanal down to Dolphin's Nose and Echo Point, lunch and the long drive back to Bengaluru.",
        "stats": {
          "drive": "~1 hr local, then ~10 hrs · 470 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check out",
            "detail": "Breakfast at the stay, then pack up and load the vehicle.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Vattakanal",
            "detail": "A small village below the town, set among cypress and eucalyptus, with the Vattakanal falls on the way in. The walk to Dolphin's Nose starts here.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Walk to Dolphin's Nose",
            "detail": "About 2 km each way on a rough, rocky path to a flat ledge jutting over a drop of hundreds of metres. Going down is easy; the climb back is steep, so pace yourself.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Echo Point",
            "detail": "A short step from Dolphin's Nose, a lookout over the valley where calls bounce back off the cliffs. Clouds often pour over the edge here.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in town",
            "detail": "Pay-as-you-go lunch before the descent.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Depart for Bengaluru",
            "detail": "Down the ghat to Batlagundu, then via Dindigul, Karur and Salem, with a tea break on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "23:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drops at Electronic City (M5 Mall), Silk Board and RMZ Ecospace. Sunday-night traffic at Hosur can shift this a little.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in Kodaikanal, rooms on triple/quad sharing",
      "Breakfast on Saturday and Sunday, and dinner on Saturday",
      "Entry fees for the sights on the itinerary: pine forest, Guna Cave, Pillar Rocks, Dolphin's Nose and Echo Point",
      "Kodaikanal vehicle e-pass arranged before departure",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and Sunday dinner",
      "Optional activities and adventure sports, including boating and cycling at Kodai Lake",
      "Entry fees not listed, such as any extra sights you choose in free time",
      "Personal expenses such as chocolate, snacks and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants a cool, misty weekend with a bit of walking",
      "Photographers chasing clouds, cliffs and pines",
      "Solo travellers looking for an easy way to join a group trip"
    ],
    "faqs": [
      {
        "question": "How far is Kodaikanal from Bengaluru?",
        "answer": "About 470 km, roughly 10 hours by road via Hosur, Salem, Karur and Dindigul. We drive overnight on Friday and are back in Bengaluru late on Sunday night."
      },
      {
        "question": "How hard is the Dolphin's Nose walk?",
        "answer": "Moderate. It is roughly 4 km there and back on an uneven, rocky path. The descent is gentle but the climb back is steep; anyone reasonably active manages it at their own pace, and you can wait at Vattakanal instead."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Plenty of our travellers come solo; you share a room with fellow travellers and the Saturday dinner brings the group together."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm jacket, a rain layer, shoes with good grip, a cap, sunscreen, a steel water bottle and motion-sickness tablets. Kodaikanal restricts single-use plastic, so skip disposable bottles."
      },
      {
        "question": "Can we go inside Guna Cave?",
        "answer": "No. The cave was fenced off years ago after several deaths, so visitors view it from walkways. The walk in and the forest around it are still worth it."
      }
    ]
  },
  {
    "id": "madurai-rameshwaram-long-weekend",
    "slug": "madurai-rameshwaram-long-weekend",
    "title": "Madurai, Rameshwaram & Dhanushkodi Long Weekend",
    "destination": "Madurai, Rameshwaram & Dhanushkodi, Tamil Nadu",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back early Tuesday morning)",
    "transport": "Tempo Traveller",
    "price": 9999,
    "originalPrice": 13499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Hotels in Madurai and Rameshwaram, triple sharing (2 nights)",
    "food": "Breakfast on all three days; lunch and dinner are pay-as-you-go",
    "categories": [
      "Long Weekend",
      "Temple Trails",
      "Heritage",
      "Coastal"
    ],
    "coverImageLabel": "Painted gopurams of the Meenakshi Amman temple against a morning sky",
    "gallery": [],
    "description": [
      "Three days that move from the oldest living city in Tamil Nadu to the very tip of the country. Madurai is jasmine sellers, temple bells and the thousands of painted figures climbing the Meenakshi gopurams; Rameshwaram is long pillared corridors, sea breeze and pilgrims with wet hair walking back from the wells.",
      "The last morning belongs to Dhanushkodi, the ghost town the 1964 cyclone left behind, where the road simply runs out and the Bay of Bengal meets the Gulf of Mannar at Arichal Munai. We time every temple around its midday closing and every beach around the light, and we travel overnight so the days stay yours."
    ],
    "highlights": [
      "An early-morning visit to the Meenakshi Amman temple, before the crowds and the heat",
      "Crossing the Pamban road bridge, with the new vertical-lift rail bridge running alongside it over the sea",
      "The Ramanathaswamy temple's pillared corridors, among the longest in any Indian temple",
      "Sunrise-hour drive to Arichal Munai and the cyclone-ruined church and railway station of Dhanushkodi"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Overnight to Madurai and the Meenakshi temple",
        "summary": "Board on Friday night and wake in Madurai. The day is built around the temple's hours: the great temple early, the Nayak palace and Gandhi museum through the midday closure, and the old bazaars after dark.",
        "stats": {
          "drive": "~9 hrs overnight · 435 km, plus ~1 hr local",
          "stay": "Hotel in Madurai, triple sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Pack one set of temple-appropriate clothes at the top of your bag for the morning.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:30",
            "label": "Introductions on board",
            "detail": "Your trip captain runs a short round of introductions as we leave the city on the Hosur–Krishnagiri highway, then it is lights down for the night drive south.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:30",
            "label": "Arrive Madurai, freshen up at the hotel",
            "detail": "Early check-in to shower and change. Dress code for the temple: shoulders and knees covered, no shorts; dhotis or trousers for men, sarees, salwars or long skirts for women.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Meenakshi Amman temple",
            "detail": "Walk the tank of the golden lotus, the Hall of a Thousand Pillars and the shrines of Meenakshi and Sundareswarar. Phones are not allowed inside; leave them in the vehicle or at the deposit counter.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:00",
            "label": "South Indian breakfast",
            "detail": "Idli, pongal and filter coffee after the temple. The streets around the east tower are already busy with flower sellers by now.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Thirumalai Nayak Palace",
            "detail": "A 17th-century palace of giant white columns and stucco arches, built by the ruler who shaped much of Madurai. The courtyard is at its best while the light is still soft.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Madurai",
            "detail": "Pay-as-you-go. A banana-leaf meals plate, or kari dosai if you want to eat like the city does.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Gandhi Memorial Museum, then rest",
            "detail": "Housed in an old Nayak palace, it holds the blood-stained cloth Gandhi wore when he was shot. Afterwards, back to the hotel to sit out the hottest hours while the temple is closed.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Evening walk around the temple streets",
            "detail": "The gopurams glow as the lamps come on. Browse Pudhu Mandapam's tailors and brassware stalls, and try a glass of jigarthanda, Madurai's cold milk-and-almond-gum drink.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner on your own",
            "detail": "Pay-as-you-go. Madurai stays up late; parotta and salna stalls are open well into the night.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight in Madurai",
            "detail": "We leave for Rameshwaram at 06:30, so pack tonight and keep a change of clothes handy for the temple wells.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Across Pamban to Rameshwaram",
        "summary": "A morning drive to the island over the Pamban road bridge, the Ramanathaswamy temple before it closes at one, and an afternoon with Dr Kalam's memorial and the temple of floating stones.",
        "stats": {
          "drive": "~4 hrs · 175 km, plus ~1 hr local",
          "stay": "Hotel in Rameshwaram, triple sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Breakfast and check-out",
            "detail": "An early breakfast at the hotel before we head east across the flat Ramanathapuram plains.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Drive to Rameshwaram",
            "detail": "The land thins into palms, salt pans and fishing hamlets as we near the coast. Keep sunglasses and sunscreen close; the light off the water is fierce.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "10:15",
            "label": "Pamban bridge viewpoint",
            "detail": "A stop on the road bridge over the Palk Strait. Below runs the new vertical-lift rail bridge that replaced the century-old span in 2025, with fishing boats bobbing in turquoise water.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Ramanathaswamy temple",
            "detail": "Walk the vast pillared corridors and, if you wish, take the ritual bath at the 22 temple wells (carry a change of clothes). The temple closes around 13:00 and reopens at 15:00.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch and hotel check-in",
            "detail": "Pay-as-you-go lunch in town, then check in, dry off and rest through the afternoon heat.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:30",
            "label": "Dr APJ Abdul Kalam National Memorial",
            "detail": "A calm memorial at Pei Karumbu with his personal belongings, models of missiles he worked on and letters. Photography is restricted inside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:00",
            "label": "Panchamukhi Hanuman temple and floating stones",
            "detail": "A small shrine where pumice-like stones float in a water tank, linked to the legend of the bridge to Lanka.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:00",
            "label": "Sunset by the sea, evening free",
            "detail": "Watch the sky change from the shore, or return to the temple for the evening rituals. Dinner is pay-as-you-go.",
            "kind": "free",
            "included": false
          },
          {
            "time": "21:00",
            "label": "Overnight in Rameshwaram",
            "detail": "Alarm at 04:45 tomorrow. Keep a windcheater and a cap out; Dhanushkodi is breezy at dawn.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Dhanushkodi at dawn, then the road home",
        "summary": "A first-light drive to Arichal Munai, the ruins of Dhanushkodi and Kothandaramaswamy temple, then breakfast, check-out and the long drive back to Bengaluru.",
        "stats": {
          "drive": "~1.5 hrs local, then ~12 hrs overnight · 600 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "05:15",
            "label": "Leave for Dhanushkodi",
            "detail": "About 20 km on a narrow road with sea on both sides. Access depends on the police and the weather, so the exact plan is confirmed the evening before.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Arichal Munai, where the road ends",
            "detail": "Sunrise over the point where the Bay of Bengal meets the Gulf of Mannar. The sea is rough here; enjoy it from the sand, not in the water.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "07:00",
            "label": "Ruins of the old town",
            "detail": "The roofless church, the railway station platform and the coral-stone walls left by the 1964 cyclone. Walk slowly; it is a strangely quiet place.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:15",
            "label": "Kothandaramaswamy temple",
            "detail": "A small temple on the Dhanushkodi road, the only building to survive the cyclone, tied to Vibhishana's surrender to Rama.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Breakfast and check-out",
            "detail": "Breakfast at the hotel, a shower and time to pick up dried fish, shell crafts or palm-leaf baskets in town.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Depart Rameshwaram for Bengaluru",
            "detail": "Back over Pamban and west through Madurai. Lunch is a pay-as-you-go highway stop along the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant near Salem, then settle in for the last stretch.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 4,
        "title": "Early-morning arrival in Bengaluru",
        "summary": "We reach Bengaluru in the small hours and drop you at the same pickup points.",
        "stats": {
          "drive": "Final stretch of the overnight drive"
        },
        "items": [
          {
            "time": "02:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City (M5 Mall), Silk Board and RMZ Ecospace. Timing depends on traffic and the Dhanushkodi schedule.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights in hotels, triple sharing (1 night Madurai, 1 night Rameshwaram)",
      "Early check-in in Madurai on arrival",
      "3 breakfasts (Saturday, Sunday and Monday)",
      "Sightseeing as per itinerary: Meenakshi Amman temple, Thirumalai Nayak Palace, Gandhi Memorial Museum, Pamban bridge, Ramanathaswamy temple, Kalam memorial, Dhanushkodi and Arichal Munai",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Lunch and dinner on all days, and any meals not listed",
      "Optional activities, special darshan tickets and the temple well bath",
      "Entry, camera and special-entry fees not listed above",
      "Personal expenses, shopping and temple offerings",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who has always meant to see Meenakshi and Rameshwaram but never managed the planning",
      "Travellers who love old towns, temple architecture and stories more than resorts",
      "Early risers happy to trade a lie-in for dawn at the end of the country"
    ],
    "faqs": [
      {
        "question": "How far is it, and how long is the drive?",
        "answer": "Madurai is about 435 km from Bengaluru, roughly 9 hours overnight. Rameshwaram is another 175 km, and the return from Rameshwaram is about 600 km, 11 to 12 hours, which is why we drive back overnight."
      },
      {
        "question": "Is there a dress code for the temples?",
        "answer": "Yes. Cover shoulders and knees at both temples: dhotis or trousers for men, sarees, salwars or long skirts for women. No shorts or sleeveless tops. Phones are not allowed inside Meenakshi, so plan to leave yours in the vehicle."
      },
      {
        "question": "Can I come alone?",
        "answer": "Of course. Most of our travellers book solo, and you will be roomed with other travellers of the same gender on a triple-sharing basis."
      },
      {
        "question": "What should I carry?",
        "answer": "Light cotton clothes plus one temple-appropriate outfit, a spare set for the Rameshwaram wells, slip-on footwear (you will remove shoes often), sunscreen, a cap, a windcheater for Dhanushkodi and a small towel."
      },
      {
        "question": "Can we always reach Arichal Munai?",
        "answer": "Usually, but not always. Access is controlled by the police and can close in bad weather or on short notice, and vehicles must be out before evening. If it is shut, we visit the Dhanushkodi ruins as far as the road allows."
      }
    ],
    "coverImage": "/photos/rameshwaram-shoreline.jpg",
    "photos": [
      {
        "src": "/photos/rameshwaram-beach-walk.jpg",
        "alt": "A traveller walking the quiet Rameshwaram shoreline",
        "caption": "Rameshwaram shoreline"
      }
    ]
  },
  {
    "id": "mandaragiri-devarayanadurga-day-trek",
    "slug": "mandaragiri-devarayanadurga-day-trek",
    "title": "Mandaragiri & Devarayanadurga Day Trek",
    "destination": "Mandaragiri and Devarayanadurga, Tumakuru, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-02", "end": "2026-10-02", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-04", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "One day (5:45 am – about 9:15 pm)",
    "transport": "Tempo Traveller",
    "price": 1499,
    "originalPrice": 2199,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Moderate",
    "stay": "No stay; a same-day trip",
    "food": "No meals included; breakfast and lunch stops are pay-as-you-go",
    "categories": [
      "One Day",
      "Trek",
      "Heritage",
      "Nature"
    ],
    "coverImageLabel": "The group resting on a rocky hilltop",
    "coverImage": "/photos/about-team-rocks.jpg",
    "gallery": [],
    "description": [
      "Two granite hills off Tumkur Road, a couple of hours from the city, and a full day of climbing, temples and wide open views. Mandaragiri is a bare boulder hill crowned by four small Jain basadis from the 12th to 14th centuries, reached by a flight of steps cut into the rock. At its foot stands the Guru Mandir, an 81-foot hall shaped like a peacock-feather whisk, and behind the hill lies Mydala Lake, still and wide under a big sky.",
      "After lunch in Tumakuru we stop at Namada Chilume, a spring in the rock tied to a Ramayana legend, with a small deer park around it. The day ends on Devarayanadurga, a forested hill with temples to Narasimha, where we climb through boulders and scrub to the top for the late-afternoon light before driving home."
    ],
    "highlights": [
      "Climbing the rock-cut steps of Mandaragiri to four centuries-old Jain basadis",
      "The 81-foot Guru Mandir, built in the shape of a peacock-feather whisk",
      "Mydala Lake from above and up close, then the spring and deer at Namada Chilume",
      "A guided trek up Devarayanadurga for late-afternoon views, with 11 seats on our 13-seater Tempo Traveller so nobody is squeezed"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Mandaragiri, Namada Chilume and DD Hills",
        "summary": "An early start up Tumkur Road to Mandaragiri's rock steps and Jain temples, a lakeside pause, a spring and deer park after lunch, and a late-afternoon trek on Devarayanadurga.",
        "stats": {
          "drive": "~4.5 hrs total · about 200 km round trip",
          "meals": "None included"
        },
        "items": [
          {
            "time": "05:45",
            "label": "Board the Tempo Traveller",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur (Metro station), Goraguntepalya and the Nelamangala toll on Tumkur Road. Wear trekking or sports shoes and carry two litres of water.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast on Tumkur Road",
            "detail": "Pay-as-you-go. Thatte idli, vada and strong filter coffee at a highway tiffin room.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:15",
            "label": "Guru Mandir at Mandaragiri",
            "detail": "The 81-foot hall is shaped like a pinchi, the peacock-feather whisk carried by Digambara monks. Inside is a meditation space; silence is expected and shoes stay outside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Climb the steps to the Basadi Betta temples",
            "detail": "Roughly 450 steps carved into the rock, past a manastambha pillar, to four small Jain basadis from the 12th to 14th centuries. Go early; the granite heats up fast.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:45",
            "label": "Mydala Lake",
            "detail": "Seen whole from the summit, then up close: a wide lake behind the hill, calm and bird-filled. A good spot to sit, rehydrate and cool off.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Tumakuru",
            "detail": "Pay-as-you-go, at a vegetarian meals place in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Namada Chilume spring and deer park",
            "detail": "A small spring rising from a rock that legend says Rama struck with an arrow, inside a forest patch with spotted deer. Open 10:00 to 17:00.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "15:30",
            "label": "Trek up Devarayanadurga",
            "detail": "A guided climb of about an hour on stone steps and rocky paths, past the Narasimha temples, to the summit at roughly 1,200 m. Temple opening hours vary; darshan only if open.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Evening views from the top",
            "detail": "Watch the plains turn gold and the sun drop behind the hills, around 18:10 to 18:40 depending on the month. We start down before full dark; carry a torch.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:45",
            "label": "Drive back to Bengaluru",
            "detail": "Down the hill and onto Tumkur Road, with a short tea halt if the group wants one.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at the Nelamangala toll, Goraguntepalya, Yeshwanthpur and finally RMZ Ecospace around 21:15, depending on Tumkur Road traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "Guided trek on Devarayanadurga with a Tripshala trek leader",
      "Forest trek permission for Devarayanadurga, booked in advance through the Forest Department's Aranya Vihaara system where required",
      "Sightseeing as per itinerary: Guru Mandir, Mandaragiri's Basadi Betta temples, Mydala Lake, Namada Chilume and Devarayanadurga",
      "Entry fees for the places on the itinerary",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "All meals: breakfast, lunch and snacks are pay-as-you-go",
      "Any optional activities or adventure sports",
      "Entry fees not listed above, temple offerings and camera fees where charged",
      "Personal expenses and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Beginners who want a real climb without a night away",
      "Anyone curious about Karnataka's Jain heritage beyond Shravanabelagola",
      "Solo travellers and friends looking for an active Saturday or Sunday out of the city"
    ],
    "faqs": [
      {
        "question": "How far is Mandaragiri from Bengaluru?",
        "answer": "About 65 km from Yeshwanthpur, roughly 1.5 to 2 hours up Tumkur Road depending on traffic. Devarayanadurga is about 30 km further on, and the whole round trip is around 200 km."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Most of our day treks have a good number of solo travellers, and the group walks together with a trek leader."
      },
      {
        "question": "What should I carry?",
        "answer": "Trekking or sports shoes with grip, two litres of water, a cap, sunscreen, a light snack, a small torch for the walk down Devarayanadurga, and clothes suitable for temples."
      },
      {
        "question": "Do we need a permit for the Devarayanadurga trek?",
        "answer": "The Karnataka Forest Department lists Devarayanadurga among the treks booked through its Aranya Vihaara system. We book the group's slot in advance; if the forest trail is closed on the day, we drive up to the temples and walk the shorter paths instead."
      },
      {
        "question": "How fit do I need to be?",
        "answer": "Fit enough for about 450 steps in the morning and an hour's uphill in the afternoon, both at your own pace. Beginners do it comfortably with breaks."
      }
    ]
  },
  {
    "id": "ooty-coonoor-kotagiri-long-weekend",
    "slug": "ooty-coonoor-kotagiri-long-weekend",
    "title": "Ooty, Coonoor & Kotagiri Long Weekend",
    "destination": "The Nilgiris (Kotagiri, Coonoor and Ooty), Tamil Nadu",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Banashankari (BDA Complex)",
      "RR Nagar (Mysore Road)",
      "Kengeri (Mysore Road)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back Monday night)",
    "transport": "Tempo Traveller",
    "price": 10499,
    "originalPrice": 12499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Hill stays in Kotagiri and Ooty, one night each, triple/quad sharing",
    "food": "No meals included; we stop at good local places and you pay as you go",
    "categories": [
      "Long Weekend",
      "Nature",
      "Heritage"
    ],
    "coverImageLabel": "The group on a tea estate stop in the hills",
    "coverImage": "/photos/community-tea-estate-group.jpg",
    "gallery": [],
    "description": [
      "The Nilgiris, done the unhurried way. We start in Kotagiri, the quietest of the three hill towns, where tea runs to the edge of the plateau and Catherine Falls drops off a cliff you can watch from Kodanad's railings. Coonoor comes next, all fog and cliff-edge viewpoints, and then the best part: the little blue Nilgiri Mountain Railway train, puffing uphill through tunnels and tea from Coonoor to Ooty.",
      "The last morning is for Doddabetta, the highest point in the Nilgiris, a working tea factory and the pine woods on the Gudalur road before we drop down through Mudumalai and Bandipur at dusk. Meals are left open so you can eat where you like; your trip captain knows the good places."
    ],
    "highlights": [
      "The Nilgiri Mountain Railway toy train from Coonoor up to Ooty, a UNESCO World Heritage line",
      "Kodanad viewpoint and Catherine Falls on a quiet day in Kotagiri's tea country",
      "Dolphin's Nose and Lamb's Rock in Coonoor, then Doddabetta and the pine forest on the way home",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Through the forests at dawn, a day in Kotagiri",
        "summary": "A night drive to the Bandipur forest gate, a dawn crossing into the Nilgiris, then a slow day among Kotagiri's tea estates, waterfalls and cliff-edge viewpoints.",
        "stats": {
          "drive": "~11 hrs overnight with a gate halt · 300 km, plus ~1.5 hrs local",
          "stay": "Hill stay in Kotagiri",
          "meals": "None included"
        },
        "items": [
          {
            "time": "22:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari (BDA Complex), RR Nagar and Kengeri on Mysore Road. Carry a proper jacket; Nilgiri nights are cold in every season.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "02:30",
            "label": "Rest halt near Gundlupet",
            "detail": "The Bandipur and Mudumalai forest roads are closed to traffic from 21:00 to 06:00, so we pause here and sleep until the gates open.",
            "kind": "free",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Dawn drive through Bandipur and Mudumalai",
            "detail": "Keep watch for elephants, gaur and spotted deer by the road, then climb the Gudalur ghat into tea country. Take motion-sickness tablets now if you need them.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Breakfast on the way into Kotagiri",
            "detail": "Pay-as-you-go. Hot idli, pongal and filter coffee at a local tiffin place.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "11:00",
            "label": "Catherine Falls",
            "detail": "From Aravenu, a 15 to 20 minute walk through tea brings you to a view of this two-tiered fall on the Kallar. It runs strongest from July to November and thins out by April.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Kotagiri",
            "detail": "Pay-as-you-go. A South Indian meals plate or a Badaga-style dish if you can find one.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Kodanad viewpoint and tea estates",
            "detail": "The road to Kodanad runs through unbroken tea to a railing on the plateau's edge, with Rangaswamy Peak, the Moyar valley and the plains far below. Clouds can close the view in minutes.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Check in at the Kotagiri stay",
            "detail": "Rooms are triple or quad sharing. The evening is yours; the town's bakeries are worth a wander.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner in Kotagiri",
            "detail": "Pay-as-you-go, together as a group at a place your trip captain picks.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 2,
        "title": "Coonoor viewpoints and the toy train to Ooty",
        "summary": "A morning of cliff-edge views around Coonoor, then the Nilgiri Mountain Railway up to Ooty. The afternoon is for Ooty's lake and its Victorian botanical garden.",
        "stats": {
          "drive": "~2 hrs local, plus ~1 hr 15 min by toy train",
          "stay": "Hill stay in Ooty",
          "meals": "None included"
        },
        "items": [
          {
            "time": "08:00",
            "label": "Check out, breakfast in Coonoor",
            "detail": "A 20 km drive through tea to Coonoor. Breakfast is pay-as-you-go; try the bun butter jam at an old bakery.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:15",
            "label": "Dolphin's Nose and Lamb's Rock",
            "detail": "Dolphin's Nose juts over a deep gorge with Catherine Falls on the far side; Lamb's Rock looks down to the Coimbatore plains. Mornings are usually clearest.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Sim's Park",
            "detail": "A sloping, century-old garden in a ravine, full of old trees, ferns and flowering beds. A short, gentle wander before the train.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:35",
            "label": "Toy train from Coonoor to Ooty",
            "detail": "The Nilgiri Mountain Railway climbs past Wellington, Lovedale and Ketti through tunnels and tea, about 70 minutes. Seats depend on railway availability; sit on the left side for valley views.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "14:00",
            "label": "Lunch in Ooty",
            "detail": "Pay-as-you-go, near Charing Cross. The Tempo Traveller meets us at Ooty station.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:15",
            "label": "Government Botanical Garden",
            "detail": "Terraced lawns laid out in the 1840s, with glasshouses, a fossilised tree trunk and huge old conifers. Allow an hour to wander.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:45",
            "label": "Ooty Lake and town",
            "detail": "Stroll the lakeside as the evening mist comes in, or take a boat out on your own. Browse for homemade chocolate, eucalyptus oil and Nilgiri tea.",
            "kind": "free",
            "included": false
          },
          {
            "time": "18:30",
            "label": "Check in at the Ooty stay",
            "detail": "Rooms are triple or quad sharing. It gets properly cold after dark, so keep a warm layer handy.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner in Ooty",
            "detail": "Pay-as-you-go, together as a group.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 3,
        "title": "Doddabetta, tea and pines, then home",
        "summary": "An early climb to the highest point in the Nilgiris, a working tea factory and the pine woods on the Gudalur road, before we drop through the forests to Mysore and Bengaluru.",
        "stats": {
          "drive": "~2 hrs local, then ~7 hrs · 270 km"
        },
        "items": [
          {
            "time": "07:15",
            "label": "Doddabetta Peak",
            "detail": "At about 2,637 m, the summit looks over the whole plateau, with Ooty below and the Mysore plains on clear mornings. Go early, before the clouds and crowds arrive.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:45",
            "label": "Breakfast on the Doddabetta road",
            "detail": "Pay-as-you-go. Something hot, and a chai in a paper cup at the viewpoint stalls.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:30",
            "label": "Tea factory visit",
            "detail": "See green leaf withered, rolled, fermented and dried in a working factory, then taste a few grades. Buying tea is up to you.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:45",
            "label": "Check out and drive the Gudalur road",
            "detail": "Back to the stay to collect bags, then west out of Ooty through eucalyptus and grassland.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Pine Forest and Shooting Point",
            "detail": "Tall pines on a slope running down to the Kamaraj Sagar reservoir, then the rolling meadows where countless film songs were shot. Soft needles underfoot; watch the steep bits.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch en route",
            "detail": "Pay-as-you-go before the descent.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Down the ghat and through the forests",
            "detail": "Via Naduvattam, Gudalur, Mudumalai and Bandipur, crossing the forest stretch well before the 21:00 closure. A short tea halt near Mysore.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "22:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Kengeri, RR Nagar, Banashankari and RMZ Ecospace. Timing depends on holiday traffic on Mysore Road.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights in hill stays, one in Kotagiri and one in Ooty, triple/quad sharing",
      "Nilgiri Mountain Railway toy train ticket from Coonoor to Ooty (subject to railway seat availability)",
      "Entry fees for the places on the itinerary: Catherine Falls, Kodanad, Dolphin's Nose, Lamb's Rock, Sim's Park, the Botanical Garden, Doddabetta, the tea factory and the Pine Forest",
      "Nilgiris e-pass for the vehicle, arranged by us",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "All meals: breakfasts, lunches and dinners are pay-as-you-go",
      "Boating on Ooty Lake and any optional activities or adventure sports",
      "Entry fees not listed above, and camera fees where charged",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who has always wanted to ride the Nilgiri toy train",
      "People who like to choose their own meals and eat around town",
      "Solo travellers and friend groups who enjoy slow hill-station days and cool weather"
    ],
    "faqs": [
      {
        "question": "How far is Ooty from Bengaluru?",
        "answer": "About 270 km, usually 7 to 8 hours via Mysore. Because the Bandipur and Mudumalai forest roads close from 21:00 to 06:00, we leave on Friday night, rest near the gate and cross at dawn, and on Monday we come down in daylight to reach Bengaluru around 22:00."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Solo travellers join almost every batch, and rooms are shared by gender unless you book with friends."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm jacket, a light rain layer, comfortable walking shoes, a cap, sunscreen, a power bank, a refillable bottle and some cash for meals and small shops. Nights in Ooty can drop close to single digits."
      },
      {
        "question": "Is the toy train ride guaranteed?",
        "answer": "We book the Coonoor to Ooty section in advance, but seats and timings are set by the railway and services can be cancelled after landslides. If the train does not run, we drive up to Ooty instead."
      },
      {
        "question": "Why are no meals included?",
        "answer": "The Nilgiris have good small bakeries and tiffin rooms, and many travellers prefer to choose. Your trip captain plans meal stops at reliable places, and you pay for what you order."
      }
    ]
  },
  {
    "id": "ooty-coonoor-weekend-getaway",
    "slug": "ooty-coonoor-weekend-getaway",
    "title": "Ooty & Coonoor Weekend",
    "destination": "Ooty and Coonoor, Tamil Nadu",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Banashankari (BDA Complex)",
      "RR Nagar (Mysore Road)",
      "Kengeri (Mysore Road)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 6399,
    "originalPrice": 7399,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Rooms in Ooty, triple/quad sharing (1 night, Saturday)",
    "food": "Breakfast on Saturday and Sunday; other meals are pay-as-you-go",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature",
      "Heritage"
    ],
    "coverImageLabel": "Rolling tea slopes in the Nilgiri hills",
    "coverImage": "/photos/munnar-tea-slopes.jpg",
    "gallery": [],
    "description": [
      "The Nilgiris are old-school hill country: eucalyptus and tea on every slope, stone cottages with smoking chimneys, and a little blue steam-era railway that still threads its way between Coonoor and Ooty. It is cool when Bengaluru is not, and the air smells of pine resin and wet earth.",
      "We go via Mysuru and through Bandipur and Mudumalai at first light, climbing the Kalhatti ghat into Ooty. Saturday takes in Coonoor's Dolphin's Nose, the toy train for those with tickets and an evening by Ooty Lake; Sunday is pine forest, the grassy downs of Shooting Point and Pykara before we head home through the forests."
    ],
    "highlights": [
      "Dolphin's Nose near Coonoor, looking across to Catherine Falls and the Kotagiri slopes",
      "A ride on the UNESCO-listed Nilgiri Mountain Railway between Coonoor and Ooty (optional, advance tickets needed)",
      "Pine forest, the rolling downs of Shooting Point and Pykara lake and falls",
      "Dawn drive through Bandipur and Mudumalai, where deer and elephants often line the road"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Through the forests to Coonoor and Ooty",
        "summary": "An overnight run to the Bandipur gate, a dawn crossing of two tiger reserves and the hairpins up to Ooty. The day moves to Coonoor, back by toy train or road, and ends at Ooty Lake.",
        "stats": {
          "drive": "~9 hrs overnight · 275 km, plus ~2 hrs local",
          "stay": "Rooms, Ooty",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "21:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots go on the trip WhatsApp group. Nights in Ooty are cold, so pack a proper jacket.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "02:30",
            "label": "Wait at the Bandipur forest gate",
            "detail": "The road through Bandipur and Mudumalai is closed to traffic from 9 pm to 6 am to protect wildlife. We park near the gate and sleep until it opens.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Dawn drive through Bandipur and Mudumalai",
            "detail": "Spotted deer, langurs, peacocks and sometimes elephants by the road. Then the steep Kalhatti ghat, bend after bend up to the plateau.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Arrive Ooty, breakfast and freshen up",
            "detail": "Breakfast in Ooty, then check in, drop bags and change into warm layers.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Dolphin's Nose, Coonoor",
            "detail": "A rock spur jutting over a deep valley, with Catherine Falls on the far side and tea slopes below. Mist often rolls in by late morning; be patient.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Coonoor",
            "detail": "Pay-as-you-go. Coonoor's bakeries and small cafés are good for a light lunch.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "16:00",
            "label": "Toy train from Coonoor to Ooty",
            "detail": "The blue carriages crawl uphill through tunnels, tea and eucalyptus for about 70 minutes. Only for those holding advance tickets; everyone else rides back with the vehicle.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "17:30",
            "label": "Ooty Lake at dusk",
            "detail": "A walk along the eucalyptus-fringed lake as the town lights come on. Rowing and pedal boats are optional and paid on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner and overnight in Ooty",
            "detail": "Pay-as-you-go dinner in town, then back to the stay. Temperatures can drop below 10°C.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Pines, downs, Pykara and the road home",
        "summary": "Breakfast, then west along the Gudalur road to the pine forest, Shooting Point and Pykara, and down through Mudumalai and Bandipur before the forest gates close.",
        "stats": {
          "drive": "~2 hrs local, then ~7 hrs · 290 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check out",
            "detail": "Breakfast at the stay, then pack up and load the vehicle.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Pine forest",
            "detail": "Rows of tall pines on a slope running down to a reservoir, the ground soft with needles. Walk down to the water for the classic view.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:15",
            "label": "Shooting Point, Wenlock Downs",
            "detail": "Open, rolling grassland ringed with sholas and eucalyptus, used as a backdrop by countless film crews. Good for a wander and a group photo.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:15",
            "label": "Pykara lake and falls",
            "detail": "The Pykara river drops in a series of cascades through shola forest, then widens into a calm lake. Boating is optional; falls entry is paid on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch on the Gudalur road",
            "detail": "Pay-as-you-go lunch before the descent.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Depart via Mudumalai and Bandipur",
            "detail": "Down to Theppakadu and through the two reserves, well before the 9 pm gate closure, then on via Mysuru with a tea break.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:00",
            "label": "Dinner stop near Mysuru",
            "detail": "Pay-as-you-go dinner at a highway restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "22:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drops at Kengeri, RR Nagar, Banashankari and RMZ Ecospace. Sunday traffic on the Mysuru expressway can shift this a little.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in Ooty, rooms on triple/quad sharing",
      "Breakfast on Saturday and Sunday",
      "Sightseeing as per the itinerary: Dolphin's Nose, Ooty Lake, pine forest, Shooting Point and Pykara",
      "Nilgiris vehicle e-pass arranged before departure",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and dinners",
      "Optional activities and adventure sports, including boating at Ooty Lake and Pykara",
      "Nilgiri Mountain Railway tickets, which must be booked in advance",
      "Entry fees not listed, including Pykara falls and gardens",
      "Personal expenses such as tea, chocolate and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone craving cool air and a classic hill-station weekend",
      "Rail enthusiasts keen to ride the Nilgiri toy train",
      "First-time group travellers looking for an easy, relaxed trip"
    ],
    "faqs": [
      {
        "question": "How far is Ooty from Bengaluru?",
        "answer": "About 275 km via Mysuru and Bandipur. The drive itself is 6 to 7 hours, but the forest road is closed from 9 pm to 6 am, so we leave on Friday night, rest at the gate and cross at dawn."
      },
      {
        "question": "Is the toy train included?",
        "answer": "No. Nilgiri Mountain Railway seats sell out weeks ahead on IRCTC, so we cannot promise them. If you want to ride, book the afternoon Coonoor to Ooty train for the Saturday of your batch as soon as you confirm; the captain will fit the day around it."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Plenty of our travellers come solo; you share a room with fellow travellers and the group settles in quickly."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm jacket, a light rain layer, comfortable walking shoes, a cap, sunscreen, a steel water bottle and any motion-sickness tablets. The Nilgiris restrict single-use plastic, so skip disposable bottles."
      },
      {
        "question": "Do I need an e-pass for the Nilgiris?",
        "answer": "Tourist vehicles need a Tamil Nadu e-pass to enter the district. We apply for it on the vehicle's behalf before departure; you only need to carry a photo ID."
      }
    ]
  },
  {
    "id": "thekkady-vagamon-long-weekend",
    "slug": "thekkady-vagamon-long-weekend",
    "title": "Thekkady & Vagamon Long Weekend",
    "destination": "Thekkady (Periyar) & Vagamon, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back early Tuesday morning)",
    "transport": "Tempo Traveller",
    "price": 10499,
    "originalPrice": 12499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Resorts or homestays in Thekkady and Vagamon, triple/quad sharing",
    "food": "Breakfast on all three days; lunch and dinner are pay-as-you-go",
    "categories": [
      "Long Weekend",
      "Nature",
      "Wildlife",
      "Adventure"
    ],
    "coverImageLabel": "Jeeps lined up for an off-road ride",
    "coverImage": "/photos/gallery-jeep-safari.jpg",
    "gallery": [],
    "description": [
      "Two very different corners of Kerala's high ranges. Thekkady is the edge of the Periyar Tiger Reserve: a drowned-forest lake where elephants and gaur come down to drink, cardamom and pepper growing in the shade, and evenings of Kathakali and Kalaripayattu in Kumily town.",
      "Vagamon, a winding drive north, is open meadows, a British-planted pine forest and ridges that disappear into cloud by afternoon. In between we leave the Tempo Traveller for an off-road jeep ride to Parunthumpara, the eagle-shaped rock above a sea of valleys, so the transfer day becomes one of the best parts of the trip."
    ],
    "highlights": [
      "An afternoon boat cruise on Periyar lake, watching for elephants, gaur and sambar along the shore",
      "An off-road 4x4 jeep ride through the estates to the Parunthumpara viewpoint",
      "Sunset over the grassy knolls of the Vagamon meadows",
      "A quiet morning walk through Vagamon's tall, silent pine forest"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Overnight to Thekkady and Periyar lake",
        "summary": "Board on Friday night and climb into the Cardamom Hills by morning. After breakfast and a rest, the day is spice gardens, the Periyar boat cruise and an evening of Kerala's martial and dance traditions.",
        "stats": {
          "drive": "~11 hrs overnight · 510 km",
          "stay": "Resort/homestay in Thekkady, triple/quad sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Bring a warm layer; nights in the Kerala hills are cool even when Bengaluru is not.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:30",
            "label": "Introductions on board",
            "detail": "A short round of introductions with your trip captain, then lights down as we head south through Salem, Dindigul and Theni.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:00",
            "label": "Climb the Kumily ghat",
            "detail": "The road rises from Theni's vineyards and coconut groves up the ghat into Kerala. Keep your window seat for the views over the Cumbum valley.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast and check-in in Thekkady",
            "detail": "A Kerala breakfast at the stay, then time to shower and rest after the night drive.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Spice plantation walk",
            "detail": "A guided walk among cardamom, pepper vines, cinnamon and clove, with the grower explaining how each is picked and dried. A small fee is usually charged on the spot.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "13:00",
            "label": "Lunch in Kumily",
            "detail": "Pay-as-you-go. A Kerala meals plate with sambar, thoran and a crisp pappadam.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Periyar lake boat cruise",
            "detail": "The 15:30 boat drifts past dead trees standing in the water; watch the banks for elephants, gaur and otters. Tickets are sold on the spot and paid on your own; slots can fill quickly.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "18:00",
            "label": "Kalaripayattu or Kathakali show (optional)",
            "detail": "Kumily's small theatres stage an hour of Kerala's martial art or its painted-face dance drama in the evening. Tickets on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner on your own",
            "detail": "Pay-as-you-go. Try a Kerala parotta with beef or vegetable stew in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight in Thekkady",
            "detail": "Pack a small bag for tomorrow's jeep ride: water, a cap and a windcheater.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Jeep adventure from Thekkady to Vagamon",
        "summary": "An off-road jeep ride through the high ranges to Parunthumpara and Pattumala, then on to Vagamon for an evening on its meadows.",
        "stats": {
          "drive": "~3 hrs · 80 km, plus ~2 hrs by jeep",
          "stay": "Resort/homestay in Vagamon, triple/quad sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check-out",
            "detail": "Breakfast at the stay, then we load up and head north along the Kottayam–Kumily road.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Off-road jeep ride near Sathram",
            "detail": "Switch to 4x4 jeeps for rutted estate and grassland tracks on the edge of the reserve. Expect to be bounced around; keep cameras strapped and bags zipped.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "11:00",
            "label": "Parunthumpara viewpoint",
            "detail": "A rock shaped like an eagle's head above deep valleys and misty ridges near Peermade. The edge has no railing in places, so keep back.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Pattumala church and tea slopes",
            "detail": "A small hilltop church ringed by tea estates and flowering gardens. A peaceful place for a few minutes' quiet.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch en route",
            "detail": "Pay-as-you-go at a roadside restaurant on the way to Vagamon.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Check in at Vagamon",
            "detail": "Settle in and rest. The temperature drops noticeably up here, so keep a layer handy.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Vagamon meadows at sunset",
            "detail": "Walk up the rounded, grass-covered hills and watch the light fade over the ridges. Cloud often rolls in fast; it is part of the charm.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner on your own",
            "detail": "Pay-as-you-go, usually at the stay. Tonight is a good night for a bonfire and stories if the stay allows it.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight in Vagamon",
            "detail": "Nights can be cold; ask for an extra blanket if you need one.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Pine forest, viewpoints and the road home",
        "summary": "A morning among Vagamon's pines and viewpoints, with paragliding for those who want it, then the long drive back to Bengaluru.",
        "stats": {
          "drive": "~1 hr local, then ~12 hrs overnight · 560 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check-out",
            "detail": "Breakfast with a view of the mist lifting off the valley, then pack up.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:45",
            "label": "Vagamon pine forest",
            "detail": "A British-era plantation of tall pines on a steep slope, carpeted with needles and very quiet in the morning. Paths are slippery after rain.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Valley viewpoint and adventure park",
            "detail": "Views down to the plains on a clear day. Paragliding and other activities at the adventure park are optional, weather-dependent and paid on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch and depart for Bengaluru",
            "detail": "Pay-as-you-go lunch, then we head back via Kumily and Theni.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant near Salem.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 4,
        "title": "Early-morning arrival in Bengaluru",
        "summary": "We reach Bengaluru in the early hours and drop you at the same pickup points.",
        "stats": {
          "drive": "Final stretch of the overnight drive"
        },
        "items": [
          {
            "time": "02:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City (M5 Mall), Silk Board and RMZ Ecospace. Timing depends on ghat and highway traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights' stay, triple/quad sharing (1 night Thekkady, 1 night Vagamon)",
      "3 breakfasts (Saturday, Sunday and Monday)",
      "Sightseeing as per itinerary: Periyar lakeside, Parunthumpara, Pattumala, Vagamon meadows, pine forest and viewpoints",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Lunch and dinner on all days, and any meals not listed",
      "Optional activities and adventure sports, including paragliding and adventure park rides",
      "Off-road jeep charges (shared jeeps, paid on the spot)",
      "Entry fees not listed, including the Periyar boat cruise, spice plantation walk and cultural shows",
      "Personal expenses and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants hills, wildlife and cool air in one long weekend",
      "Travellers who like a little adventure without a strenuous trek",
      "Groups of friends looking for misty viewpoints and bonfire evenings"
    ],
    "faqs": [
      {
        "question": "How far is it, and how long is the drive?",
        "answer": "Thekkady is about 510 km from Bengaluru, around 11 hours overnight. The return from Vagamon is roughly 560 km, about 12 hours."
      },
      {
        "question": "Will we definitely see wild animals on the boat?",
        "answer": "Sightings are never guaranteed. Elephants, gaur, sambar and wild boar are commonly seen along the shore, especially in the drier months, but tigers are rarely spotted from the boat."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Most of our travellers book solo, and rooms are shared with travellers of the same gender."
      },
      {
        "question": "What should I carry?",
        "answer": "A fleece or light jacket, a rain jacket, comfortable walking shoes, sunscreen, a cap, a water bottle, motion-sickness tablets for the ghats and the jeep, and some cash for boat and show tickets."
      },
      {
        "question": "Is the jeep ride safe and suitable for everyone?",
        "answer": "The jeeps are run by experienced local drivers, but the tracks are very bumpy. If you have back or neck problems, or are pregnant, tell us and you can ride with the Tempo Traveller to the viewpoints instead."
      }
    ]
  },
  {
    "id": "udupi-malpe-weekend-getaway",
    "slug": "udupi-malpe-weekend-getaway",
    "title": "Udupi & Malpe Coastal Weekend",
    "destination": "Udupi and Malpe, Karnataka",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Yeshwanthpur (Metro station)",
      "Goraguntepalya (Tumkur Road)",
      "Nelamangala (Tumkur Road toll)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 5999,
    "originalPrice": 6999,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Rooms in Udupi/Malpe, triple/quad sharing (1 night, Saturday)",
    "food": "Breakfast on Saturday and Sunday; other meals are pay-as-you-go",
    "categories": [
      "Weekend",
      "2 Days",
      "Coastal",
      "Heritage"
    ],
    "coverImageLabel": "A coastal lighthouse among palms",
    "coverImage": "/photos/ig-lighthouse.jpg",
    "gallery": [],
    "description": [
      "Udupi is a temple town with a fishing harbour at its door. Mornings smell of camphor and filter coffee around the Sri Krishna Matha; a few kilometres west, Malpe's boats come in loaded with the night's catch and the beach runs long and golden towards the Arabian Sea.",
      "We drive through Friday night down the Western Ghats and arrive in time for the temple's early hours. Saturday is Malpe: time on the water, the crossing to St Mary's Island and its strange columns of basalt, and sunset from the sea walk. Sunday goes south to Kaup's lighthouse on its rocks and the clean sand of Padubidri before we turn for home."
    ],
    "highlights": [
      "Boat crossing to St Mary's Island and its hexagonal basalt columns, some 88 million years old",
      "Kayaking and water sports at Malpe, plus sunset from the Malpe sea walk",
      "Kaup's white lighthouse on its boulders, and the Blue Flag beach at Padubidri",
      "Room to stretch on board: 11 seats on our 13-seater Tempo Traveller"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Krishna Matha, Malpe and St Mary's Island",
        "summary": "Arrive in Udupi at dawn for the temple's quiet early hours, then spend the day by the sea at Malpe with an island crossing and sunset over the water.",
        "stats": {
          "drive": "~9 hrs overnight · 400 km, plus ~1 hr local",
          "stay": "Rooms, Udupi/Malpe",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "21:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur, Goraguntepalya and Nelamangala; exact spots go on the trip WhatsApp group. Pack swimwear and a change of clothes in a separate dry bag.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Arrive Udupi, freshen up at the stay",
            "detail": "The road drops through the ghats into coconut and paddy country. Drop bags, wash up and change into modest clothes for the temple.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Sri Krishna Matha, Udupi",
            "detail": "The small, busy temple where devotees view Krishna through the latticed Kanakana Kindi window. Men may be asked to remove shirts in inner areas; leave footwear outside.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:45",
            "label": "Breakfast in Udupi",
            "detail": "Udupi's own breakfast: crisp dosa, idli, goli baje and strong coffee.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Kayaking and water sports at Malpe",
            "detail": "Paddle the calm stretch near the harbour or try a banana boat or jet ski off the beach. All optional and paid on the spot; runs only when the sea is safe.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "12:30",
            "label": "Lunch by the harbour",
            "detail": "Pay-as-you-go. Try a fish thali, kane rava fry or ghee roast; vegetarian meals are easy to find.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Boat to St Mary's Island",
            "detail": "A short, bouncy crossing to an island of hexagonal basalt columns and shell-strewn coves. Boats run roughly mid-September to May; tickets are paid on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "17:00",
            "label": "Malpe beach and the sea walk at sunset",
            "detail": "Walk the long beach or out along the sea walk as the sun drops into the Arabian Sea. Swim only between the flags.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner and overnight",
            "detail": "Pay-as-you-go dinner in Udupi, then back to the stay for a proper night's sleep.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Kaup lighthouse, Padubidri and home",
        "summary": "Breakfast, then south down the coast to Kaup's lighthouse and the clean, quiet sands of Padubidri before the drive back over the ghats.",
        "stats": {
          "drive": "~1 hr local, then ~9 hrs · 400 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check out",
            "detail": "An unhurried breakfast, then pack up and load the vehicle.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Kaup beach and lighthouse",
            "detail": "A white lighthouse on a mound of black boulders, with the beach curving away either side. You can scramble the rocks anytime; the lighthouse itself opens to visitors only in the late afternoon.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Padubidri beach",
            "detail": "One of India's Blue Flag beaches: clean sand, lifeguards and a quiet estuary at one end. Time for a last swim or a nap under the casuarinas.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch on the coast",
            "detail": "Pay-as-you-go. A final plate of coastal food before the ghats.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Depart for Bengaluru",
            "detail": "Back up the Western Ghats towards Hassan, with a tea break on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "23:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drops at Nelamangala, Goraguntepalya, Yeshwanthpur and RMZ Ecospace. Ghat traffic on Sunday evening can shift this by an hour.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in Udupi/Malpe, rooms on triple/quad sharing",
      "Breakfast on Saturday and Sunday",
      "Sightseeing as per the itinerary: Sri Krishna Matha, Malpe beach and sea walk, Kaup beach and lighthouse, Padubidri beach",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and dinners",
      "Optional activities and adventure sports, including kayaking and water sports at Malpe",
      "Entry fees not listed, including the St Mary's Island boat ticket and Kaup lighthouse entry",
      "Personal expenses such as snacks, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Beach people who want the coast without the Goa crowds",
      "Food lovers keen on Udupi breakfasts and Malpe seafood",
      "First-time group travellers looking for an easy, relaxed weekend"
    ],
    "faqs": [
      {
        "question": "How far is Udupi from Bengaluru?",
        "answer": "About 400 km, roughly 9 hours by road over the Western Ghats. We leave on Friday night and reach Udupi around dawn."
      },
      {
        "question": "Will the St Mary's Island boats be running?",
        "answer": "Boats are suspended for about four months each monsoon, usually from late May to mid-September, and can be halted any day the sea turns rough. Outside those times they normally run; the ticket is paid on your own."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Plenty of our travellers come solo; you share a room with fellow travellers and the group gets to know each other over breakfast."
      },
      {
        "question": "What should I carry?",
        "answer": "Swimwear, a quick-dry towel, sunscreen, a hat, flip-flops, one modest outfit for the temple, a light rain jacket and a small dry bag for your phone on the boat."
      },
      {
        "question": "Is the sea safe for swimming?",
        "answer": "Only in the flagged zones and only when lifeguards allow it. Currents on this coast can be strong, especially after the monsoon; the trip captain has the final say."
      }
    ]
  },
  {
    "id": "vagamon-weekend-getaway",
    "slug": "vagamon-weekend-getaway",
    "title": "Vagamon Meadows Weekend",
    "destination": "Vagamon, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back late Sunday night)",
    "transport": "Tempo Traveller",
    "price": 6399,
    "originalPrice": 7399,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Rooms in Vagamon, triple/quad sharing (1 night, Saturday)",
    "food": "Saturday breakfast included; other meals are pay-as-you-go",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature",
      "Adventure"
    ],
    "coverImageLabel": "A misty trail across open hills",
    "coverImage": "/photos/gallery-foggy-trek.jpg",
    "gallery": [],
    "description": [
      "Vagamon is Kerala's quieter hill country: bare, rolling meadows at about 1,100 metres, pine plantations that go dim and still at midday, and ridges that fall away towards the Idukki reservoir. It has none of Munnar's traffic and most of its views.",
      "It is a long drive, so we leave on Friday night and ease into Saturday with breakfast and rest before an off-road jeep run along estate tracks to small falls and valley viewpoints. Sunday covers the classic Vagamon circuit: the meadows, the adventure park, the pine forest and the hilltop at Thangalpara, then the road home."
    ],
    "highlights": [
      "Off-road jeep run on rough estate tracks to small waterfalls and views towards the Idukki reservoir",
      "The open meadows of Vagamon, best walked while the morning mist is still lifting",
      "Pine forest and the boulder-topped hill of Thangalpara, with the adventure park in between",
      "Room to stretch on board: 11 seats on our 13-seater Tempo Traveller"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive, rest and ride the jeep trails",
        "summary": "An overnight drive through Tamil Nadu and over the ghats into Idukki district. A slow morning at the stay, then an afternoon of rough tracks, falls and valley views by jeep.",
        "stats": {
          "drive": "~12 hrs overnight · 550 km, plus ~3 hrs by jeep",
          "stay": "Rooms, Vagamon",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots go on the trip WhatsApp group. It is a long night drive; bring a neck pillow.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:30",
            "label": "Tea stop before the ghats",
            "detail": "A stretch-and-chai halt on the Theni side. The climb towards Kumily and Kuttikkanam is winding, so take motion-sickness tablets now if you need them.",
            "kind": "free",
            "included": false
          },
          {
            "time": "08:30",
            "label": "Arrive Vagamon, breakfast at the stay",
            "detail": "A Kerala breakfast of appam, puttu or idiyappam with curry. Check in, shower and sleep off the drive; rooms are triple or quad sharing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Vagamon",
            "detail": "Pay-as-you-go. A Kerala meals plate or porotta and beef fry at a local eatery.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Off-road jeep safari",
            "detail": "Four-wheel-drive jeeps bump along estate and forest tracks to small waterfalls and ridge points looking over the Idukki reservoir's catchment. Jeeps are hired locally and paid on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "18:00",
            "label": "Evening at the stay",
            "detail": "It cools quickly after sunset up here. Tea, card games and an early night.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner and overnight in Vagamon",
            "detail": "Pay-as-you-go dinner at the stay or nearby.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Meadows, pines, Thangalpara and home",
        "summary": "Vagamon's best-known sights in one easy loop, starting early for mist on the meadows, then lunch and the long drive back to Bengaluru.",
        "stats": {
          "drive": "~1.5 hrs local, then ~12 hrs · 550 km"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Breakfast and check out",
            "detail": "Pay-as-you-go breakfast, then pack up and load the vehicle.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "08:00",
            "label": "Vagamon Meadows",
            "detail": "Wide, treeless grass hills rolling away in every direction, often with cloud sitting in the hollows. Walk to the crest for the long view; the grass is slippery when wet.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Vagamon Adventure Park",
            "detail": "The hilltop park on the meadows where paragliding, zip lines and sky cycling are run when the weather allows. Entry and every activity are paid on your own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "10:30",
            "label": "Pine forest",
            "detail": "A planted forest of tall, straight pines on a steep slope, the ground soft with needles and the light filtered green. Paths are steep in places.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Thangalpara",
            "detail": "A hilltop with a Sufi shrine and a huge balanced boulder, looking out across the ridges. Dress modestly and remove footwear near the shrine.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch, then depart for Bengaluru",
            "detail": "Pay-as-you-go lunch, then we head down the ghats towards Theni, with breaks on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "00:30",
            "label": "Arrive Bengaluru (after midnight), trip ends",
            "detail": "Drops at Electronic City (M5 Mall), Silk Board and RMZ Ecospace, usually shortly after midnight. Plan a slow Monday morning.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in Vagamon, rooms on triple/quad sharing",
      "Breakfast on Saturday",
      "Sightseeing as per the itinerary: Vagamon Meadows, pine forest and Thangalpara",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and dinners, and Sunday breakfast",
      "Optional activities and adventure sports, including the off-road jeep safari, paragliding and adventure park rides",
      "Entry fees not listed, including the adventure park and pine forest",
      "Personal expenses such as snacks, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants Kerala's hills without the crowds of Munnar",
      "Groups of friends after open space and a little off-road fun",
      "Solo travellers happy with a long drive in exchange for a quiet place"
    ],
    "faqs": [
      {
        "question": "How far is Vagamon from Bengaluru?",
        "answer": "About 550 km, around 11 to 12 hours by road via Salem, Dindigul and Theni. That is why we leave on Friday night and get back shortly after midnight on Sunday."
      },
      {
        "question": "Is the jeep safari included?",
        "answer": "No. Jeeps are hired locally on the day and the cost is shared among those who go, paid on your own. The trip captain arranges it, and you can sit it out and rest at the stay instead."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Plenty of our travellers come solo; you share a room with fellow travellers and the long drive is a good place to get talking."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm layer, a rain jacket, shoes with grip for wet grass and pine needles, a cap, sunscreen, a refillable bottle and motion-sickness tablets for the ghat roads."
      },
      {
        "question": "Will paragliding be running?",
        "answer": "Only when wind and weather allow, and it is paid separately at the adventure park. It is usually more reliable after the monsoon, from October to February."
      }
    ]
  },
  {
    "id": "valparai-weekend-getaway",
    "slug": "valparai-weekend-getaway",
    "title": "Valparai Tea Hills Weekend",
    "destination": "Valparai, Tamil Nadu",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 6399,
    "originalPrice": 7399,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Rooms in Valparai, triple/quad sharing (1 night, Saturday)",
    "food": "Saturday breakfast included; other meals are pay-as-you-go",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature",
      "Wildlife"
    ],
    "coverImageLabel": "A waterfall running through tea estates",
    "coverImage": "/photos/munnar-tea-estate-falls.jpg",
    "gallery": [],
    "description": [
      "Valparai sits on a plateau in the Anamalai hills, reached by a ghat road that climbs out of the coconut groves of Pollachi in 40 numbered hairpin bends. At the top the world turns into tea: clipped green slopes, silver oak shade trees, estate lines and cloud drifting across the road at noon.",
      "We leave Bengaluru on Friday night and are at the foot of the ghat when the forest checkpost opens. Saturday is dams, falls and a river trail around Aliyar, Monkey Falls and Sholayar; Sunday is viewpoints and tea estates before an easy descent and the drive home. Keep an eye on the forest edges: lion-tailed macaques, Nilgiri tahr and elephants all live here."
    ],
    "highlights": [
      "The 40 hairpin bends of the Aliyar ghat, with a pause at Loam's viewpoint over the Aliyar reservoir",
      "Monkey Falls at the foot of the ghat and a river trail out towards Sholayar Dam",
      "Early-morning viewpoints and walks through the tea estates that cover the plateau",
      "Room to stretch on board: 11 seats on our 13-seater Tempo Traveller"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Up the 40 hairpins into tea country",
        "summary": "An overnight run to Pollachi, then the ghat climb past Aliyar and Monkey Falls. The afternoon follows rivers and forest out to Sholayar Dam before dinner in Valparai town.",
        "stats": {
          "drive": "~10 hrs overnight · 465 km, plus ~2 hrs local",
          "stay": "Rooms, Valparai",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots go on the trip WhatsApp group. Keep a warm layer in your day bag, not the boot.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:30",
            "label": "Tea stop in Pollachi",
            "detail": "Filter coffee and a stretch among the coconut groves. Take motion-sickness tablets now if bends bother you; the ghat starts soon.",
            "kind": "free",
            "included": false
          },
          {
            "time": "06:30",
            "label": "Aliyar checkpost and the reservoir at dawn",
            "detail": "The forest checkpost at the foot of the ghat opens early. Aliyar's reservoir lies flat and grey-blue under the Anamalai wall as the light comes up.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Breakfast near Aliyar",
            "detail": "A South Indian breakfast of idli, pongal or dosa before the climb.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Monkey Falls",
            "detail": "A short walk from the road to a wide sheet of water over rock, run by the forest department. Bathing is allowed only when the flow is safe; entry is pay-your-own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "10:00",
            "label": "The 40 hairpins and Loam's viewpoint",
            "detail": "Each bend is numbered as the road winds up. We stop around hairpin 9 at Loam's viewpoint for the reservoir far below; watch for Nilgiri tahr on the rock ledges.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Reach Valparai and check in",
            "detail": "Rooms are triple or quad sharing. Shower, rest and swap to shoes with grip.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Valparai town",
            "detail": "Pay-as-you-go. Simple Tamil meals or parotta and kurma at a local mess.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "River trail and Sholayar Dam",
            "detail": "We head through estates and forest patches towards Sholayar, walking a stretch beside the river before viewing the dam. Photography near the dam wall is sometimes restricted.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Tea on the estate roads",
            "detail": "Late light on the tea slopes and a hot cup at a roadside stall. Stay in the vehicle if elephants are about; the captain will call it.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Dinner and overnight in Valparai",
            "detail": "Pay-as-you-go dinner in town, then an early night. Tomorrow starts at first light.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Viewpoints, tea estates and the road home",
        "summary": "An early start for the plateau's viewpoints and a walk among the tea, then check-out and a slow descent through the hairpins before the drive back to Bengaluru.",
        "stats": {
          "drive": "~2 hrs local, then ~9.5 hrs · 465 km"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Sunrise viewpoint over the Anamalai ridges",
            "detail": "A short drive to a ridge-top viewpoint as mist lifts off the valleys. Some points need forest permission on the day; the captain picks the best open one.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast in town",
            "detail": "Pay-as-you-go breakfast before the estate walk.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:00",
            "label": "Tea estate walk",
            "detail": "An easy walk along estate paths between the tea rows, past pluckers at work and the shade trees that keep the bushes cool. Leeches appear after rain; carry salt.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Check out",
            "detail": "Pack up and load the vehicle.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Lunch before the descent",
            "detail": "Pay-as-you-go. Eat light; the hairpins come straight after.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:00",
            "label": "Down the ghat and on to Bengaluru",
            "detail": "The hairpins count down to Aliyar, then it is the plains via Pollachi and Salem, with a tea break on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "22:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drops at Electronic City (M5 Mall), Silk Board and RMZ Ecospace. Timing depends on Sunday-night traffic at Hosur.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night in Valparai, rooms on triple/quad sharing",
      "Breakfast on Saturday",
      "Sightseeing as per the itinerary: Aliyar, the ghat viewpoints, Sholayar river trail, tea estates",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and dinners, and Sunday breakfast",
      "Optional activities and adventure sports",
      "Entry fees not listed, including Monkey Falls and any forest or dam checkpost charges",
      "Personal expenses such as snacks, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who likes their hill stations quiet, green and uncommercial",
      "Wildlife watchers hoping for lion-tailed macaques, tahr or hornbills",
      "Solo travellers who want a weekend away without planning it"
    ],
    "faqs": [
      {
        "question": "How far is Valparai from Bengaluru?",
        "answer": "About 465 km, roughly 10 hours by road via Hosur, Salem and Pollachi. We drive overnight on Friday so you arrive at the ghat as the checkpost opens."
      },
      {
        "question": "How bad are the 40 hairpin bends?",
        "answer": "The road is well surfaced and our drivers take it slowly, but it is a steady climb with tight turns. If you get motion sick, take a tablet at the Pollachi stop and sit near the front."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Plenty of our travellers come solo; you share a room with fellow travellers, and by the first tea stop the group has usually found its rhythm."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm layer and a light rain jacket, shoes with grip, a small torch, salt or a leech sock for estate walks, a refillable bottle and any motion-sickness medication."
      },
      {
        "question": "Will we see wild animals?",
        "answer": "Quite possibly. Lion-tailed macaques, Nilgiri tahr, elephants and hornbills live around Valparai, but sightings are never guaranteed. Keep your distance and follow the captain's lead."
      }
    ]
  },
  {
    "id": "varkala-alleppey-kochi-long-weekend",
    "slug": "varkala-alleppey-kochi-long-weekend",
    "title": "Kochi, Alleppey & Varkala Long Weekend",
    "destination": "Fort Kochi, Alleppey, Jatayu Earth's Center & Varkala, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Silk Board (Hosur Road)",
      "Electronic City (near M5 Mall)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-05", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back early Tuesday morning)",
    "transport": "Tempo Traveller",
    "price": 11499,
    "originalPrice": 12499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Stays in Alleppey and on the Varkala cliff, triple/quad sharing",
    "food": "Breakfast on all three days; lunch and dinner are pay-as-you-go",
    "categories": [
      "Long Weekend",
      "Coastal",
      "Heritage",
      "Nature"
    ],
    "coverImageLabel": "Red laterite cliffs above the beach at Varkala at sunset",
    "gallery": [],
    "description": [
      "Kerala's coast in three chapters. Fort Kochi is Chinese fishing nets, Portuguese churches and spice warehouses in Jew Town; Alleppey is a slow shikara through narrow canals where ducks, children and coconut boats share the water; Varkala is red cliffs dropping to the Arabian Sea, with cafes along the edge and the sunset as the evening's main event.",
      "Between the backwaters and the cliff we stop at Jatayu Earth's Center, where a cable car lifts you to a vast stone bird lying on a granite hilltop. We travel overnight at both ends, so you step off the Tempo Traveller straight into Fort Kochi and are back in Bengaluru before the working week starts."
    ],
    "highlights": [
      "A morning on foot in Fort Kochi: fishing nets, St Francis Church and the antique shops of Jew Town",
      "A shikara ride through Alleppey's narrow village canals, the kind the big houseboats cannot reach",
      "Cable car up to the giant Jatayu sculpture and its granite-hill views",
      "Sunset from the Varkala cliff and a morning on its black sand beach"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Fort Kochi and the Alleppey backwaters",
        "summary": "Board on Friday night and wake to Kochi's harbour. A morning among colonial lanes and spice warehouses, then south to Alleppey for a shikara through the canals before the boats moor at dusk.",
        "stats": {
          "drive": "~11 hrs overnight · 560 km, plus ~1.5 hrs to Alleppey",
          "stay": "Stay in Alleppey, triple/quad sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "20:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall). Keep a toothbrush and a fresh T-shirt in your day bag; we step straight into Fort Kochi.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:00",
            "label": "Introductions on board",
            "detail": "Your trip captain gets everyone talking before lights down, as we head south through Hosur and Salem towards Coimbatore.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:00",
            "label": "Arrive Fort Kochi, freshen up and breakfast",
            "detail": "A wash-up halt and a Kerala breakfast of appam and egg curry or puttu and kadala before we start walking.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Chinese fishing nets and the seafront",
            "detail": "Watch fishermen lower the huge cantilevered nets at the harbour mouth, then walk to St Francis Church, where Vasco da Gama was first buried, and the Santa Cruz Basilica.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Mattancherry and Jew Town",
            "detail": "Spice warehouses, antique shops and old Dutch-era houses. The Paradesi Synagogue is shut on weekends; the Mattancherry Palace murals are open Saturdays (entry on your own).",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Fort Kochi",
            "detail": "Pay-as-you-go. Karimeen fry and a fish curry meal, or something lighter at one of the cafes on Princess Street.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Drive to Alleppey",
            "detail": "About 55 km down the coast road, past churches, toddy shops and paddy fields.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "15:00",
            "label": "Shikara ride through the backwaters",
            "detail": "About two hours in a canopied boat through narrow canals, past village homes, paddy fields below water level and fishermen at work. Shikaras must be moored by dusk, so we set off promptly.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:30",
            "label": "Alleppey beach and check-in",
            "detail": "Catch the last light by the old pier on Alleppey beach, then check in and freshen up.",
            "kind": "free",
            "included": true
          },
          {
            "time": "20:00",
            "label": "Dinner on your own",
            "detail": "Pay-as-you-go. Try duck roast with appam, a backwater speciality.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight in Alleppey",
            "detail": "We leave by 07:30 tomorrow, so pack tonight. Mosquito repellent helps near the canals.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Jatayu Earth's Center and the Varkala cliff",
        "summary": "A drive south to the granite hill of Jatayu and its cable car, then on to Varkala for an afternoon along the cliff and sunset over the sea.",
        "stats": {
          "drive": "~4 hrs · 160 km in two legs",
          "stay": "Cliffside stay in Varkala, triple/quad sharing",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:45",
            "label": "Breakfast and check-out",
            "detail": "Breakfast at the stay, then on the road before the traffic builds.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Drive to Jatayu Earth's Center",
            "detail": "About 115 km south past Kayamkulam and Kollam to Chadayamangalam, roughly three hours.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Cable car to the Jatayu sculpture",
            "detail": "Ride up to a granite summit where a stone bird about 60 metres long lies wing outstretched, tied to the Ramayana legend. Entry and cable car are on your own; allow two to three hours.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Lunch and drive to Varkala",
            "detail": "Pay-as-you-go lunch on the way, then about an hour to the coast.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Check in on the cliff",
            "detail": "Settle in, rest a little, and swap shoes for sandals.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Walk the North Cliff",
            "detail": "A path runs along the red laterite cliff edge lined with cafes, bookshops and spice stalls, with natural springs trickling out of the rock face below.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:00",
            "label": "Sunset from the cliff",
            "detail": "Find a spot on the edge as the sun drops into the Arabian Sea, roughly between 18:00 and 18:40 depending on the season.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner on your own",
            "detail": "Pay-as-you-go. The cliff cafes lay out the day's catch; pick your fish and have it grilled.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "21:30",
            "label": "Overnight in Varkala",
            "detail": "Fall asleep to the sound of the waves. Swimwear on top of your bag for the morning.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Black sand, an old temple and the road home",
        "summary": "An unhurried morning on Varkala's beaches and at its 2,000-year-old temple, then the long drive back to Bengaluru.",
        "stats": {
          "drive": "~14 hrs overnight · 720 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:00",
            "label": "Black sand beach",
            "detail": "At the north end of the cliff, a small cove of dark, mineral-rich sand, quieter than the main beach in the early hours. Swim only where lifeguards allow; currents are strong.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast and check-out",
            "detail": "A slow breakfast with a sea view, then pack up.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Papanasam beach and Janardhana Swamy temple",
            "detail": "Walk down to the main beach, where families perform rites for ancestors, then up the steps to the old Vishnu temple above it. Temple dress code applies.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Depart Varkala for Bengaluru",
            "detail": "A long drive north; lunch is a pay-as-you-go highway stop along the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant, then settle in for the night stretch.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 4,
        "title": "Early-morning arrival in Bengaluru",
        "summary": "We reach Bengaluru in the early hours and drop you at the same pickup points.",
        "stats": {
          "drive": "Final stretch of the overnight drive"
        },
        "items": [
          {
            "time": "02:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City (M5 Mall), Silk Board and RMZ Ecospace. Timing depends on traffic overnight.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights' stay, triple/quad sharing (1 night Alleppey, 1 night Varkala)",
      "3 breakfasts (Saturday, Sunday and Monday)",
      "Shikara ride through the Alleppey backwaters (about 2 hours)",
      "Local sightseeing as per itinerary: Fort Kochi, Mattancherry, Alleppey beach, Varkala cliff and beaches",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Lunch and dinner on all days, and any meals not listed",
      "Optional activities and adventure sports, including surfing and parasailing in Varkala",
      "Entry fees not listed, including Jatayu Earth's Center (entry and cable car) and Mattancherry Palace",
      "Personal expenses and shopping",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants the best of the Kerala coast without juggling trains and taxis",
      "Travellers who like a mix of history, water and sea views",
      "First-timers to Kerala who want to see more than one side of it"
    ],
    "faqs": [
      {
        "question": "How far is it, and how long is the drive?",
        "answer": "Fort Kochi is about 560 km from Bengaluru, around 11 hours overnight. The return from Varkala is the long leg, roughly 720 km and 13 to 14 hours, which is why we leave before noon on the last day."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Most travellers on our trips come solo, and rooms are shared with travellers of the same gender."
      },
      {
        "question": "What should I carry?",
        "answer": "Light cotton clothes, swimwear, flip-flops and comfortable walking shoes, one outfit that covers shoulders and knees for temples and churches, sunscreen, mosquito repellent, a cap and a light rain jacket between June and November."
      },
      {
        "question": "Is Jatayu Earth's Center open on our day?",
        "answer": "We visit it on the Sunday. Some sources list a weekly closure on Mondays and it can shut for maintenance, so we confirm opening before each departure and swap in extra time at Varkala or Kollam if it is closed."
      },
      {
        "question": "Is this a houseboat stay?",
        "answer": "No. We take a shikara, a smaller canopied boat that slips into the narrow canals, and stay on land. Houseboats can be arranged on request at extra cost."
      }
    ],
    "coverImage": "/photos/gallery-boat-backwaters.jpg",
    "photos": [
      {
        "src": "/photos/jatayu-earth-center.jpg",
        "alt": "The Jatayu sculpture against a clear sky",
        "caption": "Jatayu Earth's Center"
      },
      {
        "src": "/photos/alleppey-lighthouse.jpg",
        "alt": "The red-and-white Alleppey lighthouse",
        "caption": "Alleppey lighthouse"
      }
    ]
  },
  {
    "id": "wayanad-long-weekend",
    "slug": "wayanad-long-weekend",
    "title": "Wayanad Long Weekend",
    "destination": "Wayanad, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Banashankari (BDA Complex)",
      "RR Nagar (Mysore Road)",
      "Kengeri (Mysore Road)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "3 Days / 2 Nights (Friday night departure, back Monday night)",
    "transport": "Tempo Traveller",
    "price": 8999,
    "originalPrice": 10499,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Tent camp with proper washrooms near Kalpetta, 2 nights, double sharing",
    "food": "Breakfast on all three days, dinner on Saturday and Sunday",
    "categories": [
      "Long Weekend",
      "Nature",
      "Camping",
      "Adventure"
    ],
    "coverImageLabel": "Campsite with tents and a bonfire area",
    "coverImage": "/photos/gallery-hut-stay-hampi.jpg",
    "gallery": [],
    "description": [
      "Wayanad is Kerala's high green plateau: tea and coffee on every slope, bamboo along the roads, and forests where elephants still cross at dusk. This long weekend is built around water and views. You start with a dip in the pool below Soochipara Falls, head up to the glass bridge and zipline at 900 Kandi, and spend two nights in a tent camp with clean washrooms, a Bali swing and a bonfire.",
      "Sunday is gentler: a walk along the grassy crest of Banasura Sagar, one of the largest earth dams in India, a morning with tea at the museum in Achoor, and sunset from Lakkidi at the top of the Thamarassery ghat. On Monday morning we fit in one more viewpoint before the drive home through Muthanga and Bandipur."
    ],
    "highlights": [
      "A dip in the forest pool below Soochipara Falls, when the forest staff open it",
      "900 Kandi's glass bridge and long zipline above the canopy, for those who want them",
      "Banasura Sagar Dam, the Wayanad Tea Museum at Achoor and sunset over the ghat from Lakkidi",
      "Extra room on board: we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody is stuck in a cramped back row"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Soochipara Falls and the canopy at 900 Kandi",
        "summary": "A night drive to the Bandipur gate and a dawn crossing into Wayanad, then a waterfall dip, the glass bridge at 900 Kandi and a bonfire at the tent camp.",
        "stats": {
          "drive": "~11 hrs overnight with a gate halt · 290 km, plus ~1.5 hrs local",
          "stay": "Tent camp near Kalpetta",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "22:00",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari (BDA Complex), RR Nagar and Kengeri on Mysore Road. Pack a quick-dry towel and spare clothes in your day bag for the waterfall.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "02:30",
            "label": "Rest halt near Gundlupet",
            "detail": "The Bandipur–Muthanga forest road is shut to traffic from 21:00 to 06:00, so we stop and sleep until the gate opens.",
            "kind": "free",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Dawn drive through Bandipur and Muthanga",
            "detail": "Two tiger reserves back to back; watch for elephants, gaur and deer at the roadside. Then Sulthan Bathery and the plantations beyond.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Reach the tent camp, breakfast",
            "detail": "A Kerala breakfast, perhaps puttu and kadala or appam with stew, and a quick wash. Tents are double sharing, with separate washrooms for men and women.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Soochipara Falls and a mountain-water dip",
            "detail": "A 1.5 to 2 km forest path leads down to a pool below sheer granite. Bathing is allowed only in the marked area when staff say it is safe; the climb back up is steady.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch in Meppadi",
            "detail": "Pay-as-you-go. A Kerala meals plate, with fish fry if you eat it.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Jeep up to 900 Kandi",
            "detail": "Private vehicles stop at the base, and shared 4x4 jeeps climb the forest road to the top. The jeep fare is paid on the spot.",
            "kind": "travel",
            "included": false
          },
          {
            "time": "15:00",
            "label": "Glass bridge and zipline at 900 Kandi",
            "detail": "A privately run eco park with a glass walkway about 100 feet above the canopy and one of the longest ziplines in Wayanad. Both are optional and self-paid.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "17:30",
            "label": "Back to camp, swing and games",
            "detail": "Try the Bali swing over the valley, or join a round of indoor or outdoor games before dark.",
            "kind": "free",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Bonfire, music night and dinner",
            "detail": "Songs around the fire, then dinner together at the camp. Keep a light jacket handy; it cools quickly after dark.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Banasura Sagar, tea at Achoor, sunset at Lakkidi",
        "summary": "A morning on the crest of Banasura Sagar, an hour among the tea exhibits at Achoor and an easy afternoon, then sunset at the top of the Thamarassery ghat.",
        "stats": {
          "drive": "~3 hrs local · about 90 km",
          "stay": "Tent camp near Kalpetta",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "07:45",
            "label": "Breakfast at the camp",
            "detail": "An unhurried breakfast; we aim to reach the dam soon after it opens, before the weekend queues build.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Banasura Sagar Dam",
            "detail": "Walk the grassy crest of this vast earth dam, open 09:00 to 17:00, with islands dotting the reservoir and the Banasura hills behind. Speed boats and coracles are optional and self-paid.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Wayanad Tea Museum, Achoor",
            "detail": "A three-storey museum beside one of South India's largest tea factories, with old machines and estate records. It is closed on Mondays, and tastings and factory tours cost extra.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch near Kalpetta",
            "detail": "Pay-as-you-go. Try a Malabar biryani or a simple meals plate.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:30",
            "label": "Downtime at the camp",
            "detail": "Nap, read in a hammock or wander the plantation around the camp.",
            "kind": "free",
            "included": true
          },
          {
            "time": "16:45",
            "label": "Lakkidi viewpoint at sunset",
            "detail": "At the head of the Thamarassery ghat, the land falls away in hairpin bends towards the Kozhikode plains. Stop by the legendary Chain Tree nearby on the way.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner and a last evening at camp",
            "detail": "Dinner together, then pack most of your things tonight.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "One last viewpoint, then home through the forests",
        "summary": "A final morning viewpoint, then the drive back through Muthanga and Bandipur in daylight, reaching Bengaluru in the evening.",
        "stats": {
          "drive": "~1 hr local, then ~7 hrs · 280 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check-out",
            "detail": "A last camp breakfast. Check under the cot for chargers.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Attamala viewpoint, or Pookode Lake if closed",
            "detail": "Attamala has been shut since the 2024 landslides; if it has not reopened, we walk the forest-ringed shore of Pookode Lake near Vythiri instead. Boating is self-paid.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Depart Wayanad for Bengaluru",
            "detail": "Via Kalpetta, Sulthan Bathery, Muthanga and Bandipur, with another chance of roadside elephants.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch en route",
            "detail": "Pay-as-you-go near Gundlupet once we are out of the forest.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "19:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Kengeri, RR Nagar, Banashankari and RMZ Ecospace. Timing depends on holiday traffic on Mysore Road.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "2 nights in a tent camp near Kalpetta, double sharing, with separate washrooms, dining area, games and a Bali swing",
      "3 breakfasts and 2 dinners (breakfast every day, dinner on Saturday and Sunday)",
      "Bonfire and music night",
      "Entry to Soochipara Falls, Banasura Sagar Dam, the Wayanad Tea Museum and the Monday viewpoint",
      "Visit to 900 Kandi (the glass bridge and zipline themselves are self-paid)",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches, Monday dinner and snacks on the road",
      "900 Kandi jeep fare, the glass bridge, the zipline, boating and any other optional adventure activities",
      "Entry fees not listed above, tea tastings, factory tours and camera fees where charged",
      "Personal expenses, shopping and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "First-timers to Wayanad who want its waterfalls, dams and views in one easy weekend",
      "Anyone curious about sleeping in a tent without giving up a proper washroom",
      "Solo travellers and friend groups who like a bonfire and a sing-along"
    ],
    "faqs": [
      {
        "question": "How far is Wayanad from Bengaluru?",
        "answer": "Kalpetta is about 280 km away, roughly 7 hours via Mysore and Bandipur. The forest road is closed from 21:00 to 06:00, so on Friday we rest near the gate and cross at dawn, and on Monday we leave by 11:00 to reach Bengaluru around 19:30."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Solo travellers join most batches, and tents are shared by gender unless you book with a friend."
      },
      {
        "question": "What should I carry?",
        "answer": "Sandals or shoes that can get wet, a quick-dry towel and a change of clothes for Soochipara, a light rain jacket, a warm layer for the evenings, a torch, a power bank and any personal medicines."
      },
      {
        "question": "Are the 900 Kandi glass bridge and zipline included?",
        "answer": "We take you to 900 Kandi, but the jeep up from the base, the glass bridge and the zipline are privately run and paid on the spot, so you only pay for what you choose to do."
      },
      {
        "question": "What happens if a waterfall or viewpoint is closed?",
        "answer": "Soochipara can close after heavy rain, and Attamala has been shut since the 2024 landslides. Your trip captain checks the day before and swaps in an open waterfall or viewpoint nearby."
      }
    ]
  },
  {
    "id": "wayanad-weekend-getaway",
    "slug": "wayanad-weekend-getaway",
    "title": "Wayanad Weekend Getaway",
    "destination": "Wayanad, Kerala",
    "startingPoint": "Bengaluru (pickup points listed below)",
    "endingPoint": "Bengaluru (same pickup points, dropped back after the trip)",
    "pickupPoints": [
      "RMZ Ecospace (Bellandur, Outer Ring Road)",
      "Banashankari (BDA Complex)",
      "RR Nagar (Mysore Road)",
      "Kengeri (Mysore Road)"
    ],
    "departures": [
      {"start": "2026-10-01", "end": "2026-10-03", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11},
      {"start": "2026-10-02", "end": "2026-10-04", "note": "Gandhi Jayanti long weekend", "seatsLeft": 11}
    ],
    "date": "Next batch — ask on WhatsApp",
    "duration": "2 Days / 1 Night (Friday night departure, back Sunday night)",
    "transport": "Tempo Traveller",
    "price": 5999,
    "originalPrice": 6899,
    "seatsTotal": 11,
    "seatsLeft": 11,
    "bookingStatus": "open",
    "difficulty": "Easy",
    "stay": "Camp-style property with tents or rooms, sharing basis, bonfire area (1 night, Saturday)",
    "food": "Breakfast on Saturday and Sunday, plus Saturday dinner at the camp",
    "categories": [
      "Weekend",
      "2 Days",
      "Nature",
      "Camping"
    ],
    "coverImageLabel": "Tents and cottages at a campsite stay",
    "coverImage": "/photos/hampi-hut-stay-camp.jpg",
    "gallery": [],
    "description": [
      "Wayanad is Kerala's green upland just across the border from Karnataka: coffee and pepper under tall rosewood, tea on the higher slopes, and forest that still shelters elephants and the occasional tiger. It is close enough for a weekend and different enough to feel like a proper escape.",
      "We cross Bandipur and Muthanga at first light and head for the Meppadi side, where Soochipara's falls drop through the forest and the glass bridge and zip line at 900 Kandi hang over the canopy. Saturday ends with dinner by a bonfire at the camp; Sunday takes in Banasura Sagar Dam, a tea museum and a spice stop before the drive home."
    ],
    "highlights": [
      "Soochipara falls, a three-tiered drop into a forest pool near Meppadi",
      "The glass bridge and zip line at 900 Kandi, high above the canopy (optional)",
      "Banasura Sagar, India's largest earthen dam, with its island-dotted reservoir (entry included)",
      "Dinner around the bonfire at a camp among the plantations"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Forest roads, Soochipara and a bonfire night",
        "summary": "An overnight run to the Bandipur gate, a dawn crossing into Kerala, then waterfalls and forest canopy near Meppadi before a bonfire dinner at the camp.",
        "stats": {
          "drive": "~9 hrs overnight · 280 km, plus ~1.5 hrs local",
          "stay": "Camp with tents/rooms, Wayanad",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "21:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots go on the trip WhatsApp group. Pack a warm layer and a torch for the camp.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "02:00",
            "label": "Wait at the Bandipur forest gate",
            "detail": "The highway through Bandipur and Muthanga closes to traffic from 9 pm to 6 am to protect wildlife. We park near the gate and sleep until it opens.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Dawn drive through Bandipur and Muthanga",
            "detail": "Deer, langurs and sometimes elephants along the road, then Sulthan Bathery and the plantation country beyond.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Arrive at the camp, breakfast",
            "detail": "A Kerala breakfast of puttu, kadala curry or appam. Check in, freshen up and rest; tents and rooms are on sharing basis with western washrooms.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Soochipara falls",
            "detail": "A forest walk down steps and trail to a tall, three-tiered fall and its pool. Bathing is allowed only in marked areas when safe; the climb back is steep. Entry is pay-your-own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Lunch near Meppadi",
            "detail": "Pay-as-you-go. A Kerala meals plate on a banana leaf.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:00",
            "label": "900 Kandi glass bridge and zip line",
            "detail": "A glass-floored walkway and a zip line strung above the forest canopy, with the valley opening below. Entry and rides are optional and paid on your own; the approach road is rough.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "18:00",
            "label": "Back at the camp",
            "detail": "Tea as the light goes, and the first sounds of the forest night.",
            "kind": "free",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Bonfire dinner and overnight at the camp",
            "detail": "Dinner together around the fire, then tents or rooms for the night. It gets cool and damp; keep socks handy.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Banasura Sagar, tea and spices, then home",
        "summary": "Breakfast at the camp, a morning at Banasura Sagar Dam, the tea museum and a spice shop, then the road back through the forests before the gates close.",
        "stats": {
          "drive": "~2 hrs local, then ~7 hrs · 280 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast and check out",
            "detail": "Breakfast at the camp, then pack up and load the vehicle.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Banasura Sagar Dam",
            "detail": "An earthen dam holding back a wide reservoir scattered with green islands, with the Banasura hills behind. Entry is included; speedboat rides are optional.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:00",
            "label": "Tea museum",
            "detail": "Old machinery, photographs and the story of Wayanad's plantations, housed in a former estate factory. Entry is pay-your-own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "12:00",
            "label": "Spice and banana chip shopping",
            "detail": "Pick up pepper, cardamom, coffee and fresh banana chips from a local shop. Entirely optional.",
            "kind": "free",
            "included": false
          },
          {
            "time": "13:00",
            "label": "Lunch in Kalpetta",
            "detail": "Pay-as-you-go lunch before the drive.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Depart for Bengaluru",
            "detail": "Back through Muthanga and Bandipur well before the 9 pm closure, then via Mysuru with a tea break.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:00",
            "label": "Dinner stop near Mysuru",
            "detail": "Pay-as-you-go dinner at a highway restaurant.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "22:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drops at Kengeri, RR Nagar, Banashankari and RMZ Ecospace. Sunday traffic on the Mysuru expressway can shift this a little.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    "inclusions": [
      "AC Tempo Traveller for the whole trip (11 seats on a 13-seater)",
      "1 night at a camp-style property, tents or rooms on sharing basis, with western washrooms, dining and bonfire areas",
      "Breakfast on Saturday and Sunday, and dinner on Saturday",
      "Banasura Sagar Dam entry ticket",
      "Tripshala trip captain throughout",
      "Toll, parking and driver charges"
    ],
    "exclusions": [
      "Meals not listed above: all lunches and Sunday dinner",
      "Optional activities and adventure sports, including the 900 Kandi glass bridge and zip line, and boating at Banasura",
      "Entry fees not listed, including Soochipara falls and the tea museum",
      "Personal expenses such as spices, snacks and tips",
      "Anything not explicitly listed above"
    ],
    "whoFor": [
      "Anyone who wants forest, waterfalls and a campfire in one short weekend",
      "Friends after a little adventure without a hard trek",
      "Solo travellers keen to meet people around a bonfire"
    ],
    "faqs": [
      {
        "question": "How far is Wayanad from Bengaluru?",
        "answer": "About 280 km via Mysuru and Bandipur, around 6 to 7 hours of actual driving. The forest road closes from 9 pm to 6 am, so we leave on Friday night, rest at the gate and cross at dawn."
      },
      {
        "question": "Will I stay in a tent or a room?",
        "answer": "It depends on availability at the camp for your batch; both are on sharing basis and share clean western washrooms. Tell us when you book if you have a strong preference and we will try."
      },
      {
        "question": "Can I come alone?",
        "answer": "Yes. Plenty of our travellers come solo, and the bonfire dinner is where the group really comes together."
      },
      {
        "question": "What should I carry?",
        "answer": "A warm layer, a rain jacket, shoes with grip for wet steps, a change of clothes if you plan to get wet at Soochipara, a torch, insect repellent and a refillable bottle."
      },
      {
        "question": "Is Soochipara open all year?",
        "answer": "It is run by the forest department and closes on days of heavy rain or high water, most often in peak monsoon. If it is shut, the captain swaps in another nearby stop."
      }
    ]
  },
];

/** The slice of a Trip that TripCard needs — keeps client payloads small. */
export type CardTrip = Pick<
  Trip,
  | "id" | "slug" | "title" | "destination" | "duration" | "transport" | "price" | "originalPrice"
  | "bookingStatus" | "categories" | "coverImage" | "coverImageLabel" | "highlights" | "date" | "departures"
>;

export function toCardTrip(t: Trip): CardTrip {
  const { id, slug, title, destination, duration, transport, price, originalPrice, bookingStatus, categories, coverImage, coverImageLabel, highlights, date, departures } = t;
  return { id, slug, title, destination, duration, transport, price, originalPrice, bookingStatus, categories, coverImage, coverImageLabel, highlights: highlights.slice(0, 2), date, departures };
}

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export const ALL_CATEGORIES: TripCategory[] = [
  "Bike Rides",
  "One Day",
  "Weekend",
  "2 Days",
  "Weekday",
  "Adventure",
  "Heritage",
  "Nature",
  "Trek",
  "Camping",
  "Coastal",
  "Wildlife",
  "Long Weekend",
  "Temple Trails",
];
