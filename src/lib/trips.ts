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

export interface Trip {
  id: string;
  slug: string;
  title: string;
  destination: string;
  startingPoint: string;
  endingPoint: string; // drop-off point — usually the same as startingPoint for a round trip, but state it explicitly rather than assuming
  pickupPoints?: string[]; // several named zones across the city to pick from (Tempo Traveller/Bus trips) — omit for trips with a single assembly point (e.g. bike rides, which convoy together)
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
  isSample: true;
}

export const trips: Trip[] = [
  {
    id: "t1",
    slug: "sakleshpur-weekend-ride",
    title: "Sakleshpur Weekend Ride",
    destination: "Sakleshpur, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
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
    id: "t3",
    slug: "coorg-coffee-country-escape",
    title: "Coorg Coffee Country Escape",
    destination: "Coorg (Kodagu), Karnataka",
    startingPoint: "Bengaluru (Tempo Traveller pickup points shared after booking)",
    endingPoint: "Bengaluru (same pickup points, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday evening)",
    transport: "Tempo Traveller",
    price: 6499,
    originalPrice: 7700, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 11,
    seatsLeft: 11,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Estate homestay, twin/triple sharing",
    food: "Breakfast, dinner and one estate lunch included",
    categories: ["Weekend", "2 Days", "Nature", "Heritage"],
    coverImageLabel: "Coffee estate rows in mist, Coorg",
    coverImage: "/photos/coorg-misty-hills.jpg",
    photos: [
      { src: "/photos/coorg-group-selfie.jpg", alt: "The group at the Coorg sign on a past trip", caption: "The Coorg crew" },
    ],
    gallery: ["Group at the estate lunch table", "Abbey Falls", "Sunset from the homestay verandah"],
    description: [
      "You don't need to ride to earn this one. A Tempo Traveller, a good playlist, and a coffee estate that's been in the same family for three generations.",
      "This trip is built for people who want the destination and the people without needing to plan a single stop themselves.",
    ],
    highlights: [
      "A working coffee estate tour with the family that runs it",
      "Abbey Falls and a Raja's Seat sunset stop",
      "Group dinner that turns into the best part of the trip, every time",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Overnight to Kodagu, a day on the estate",
        "summary": "Board on Friday night and wake up in coffee country. The day revolves around the estate: a walk and tasting with the family, lunch on the property, a slow afternoon, then sunset at Raja's Seat and a long group dinner.",
        "stats": {
          "drive": "~5.5 hrs overnight · 260 km, plus a short evening run",
          "stay": "Estate homestay, Coorg",
          "meals": "Breakfast, lunch, dinner"
        },
        "items": [
          {
            "time": "21:30",
            "label": "Board the Tempo Traveller (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots and live location go on the trip WhatsApp group. Carry a neck pillow and a light shawl; the ghat air gets cool.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "03:00",
            "label": "Arrive at the estate homestay, sleep",
            "detail": "Via Mysuru, Hunsur and Kushalnagar, arriving in the small hours. Straight to your room for a proper few hours of rest.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "08:00",
            "label": "Breakfast at the homestay",
            "detail": "A late, unhurried breakfast with estate coffee, looking out over the plantation in the morning mist.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Coffee estate walk and tasting",
            "detail": "Walk under silver oak and native shade trees, with pepper vines and cardamom among the coffee. Hear how the crop moves from blossom to harvest, then taste the estate's brew.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Estate lunch",
            "detail": "A home-cooked lunch on the property, served family-style. Kodava cooking varies by household, so ask your hosts about their specialities.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "15:00",
            "label": "Free afternoon at the homestay",
            "detail": "Nap, read on the verandah or wander the estate paths. Monsoon months bring leeches on the trails, so closed shoes help.",
            "kind": "free"
          },
          {
            "time": "17:45",
            "label": "Sunset at Raja's Seat, Madikeri",
            "detail": "The arched pavilion where Kodagu's kings watched the sun go down over layered hills and paddy valleys. Clear evenings are best; monsoon evenings are often misty. Entry is pay-your-own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "20:00",
            "label": "Group dinner at the homestay",
            "detail": "The long table where strangers from the Tempo turn into friends. Home-style dinner, conversation and the sounds of the estate at night.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Abbey Falls, Bylakuppe and home",
        "summary": "A morning walk down to Abbey Falls through spice plantations, then the drive home via Kushalnagar, with an optional stop at the Tibetan settlement of Bylakuppe and lunch on the way.",
        "stats": {
          "drive": "~6.5 hrs · 270 km",
          "stay": "Return to Bengaluru",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "08:00",
            "label": "Breakfast and check-out",
            "detail": "Last estate breakfast, then bags into the Tempo.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Abbey Falls",
            "detail": "About 8 km from Madikeri: around 200 steps down through coffee and spice plantations to a roughly 70-foot cascade, viewed from a bridge opposite. Bathing is not allowed; steps are slippery in the rains. Entry is pay-your-own.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "11:15",
            "label": "Optional stop in Madikeri town",
            "detail": "A few minutes to pick up Coorg coffee powder, honey or homemade wine from the shops in town.",
            "kind": "free"
          },
          {
            "time": "12:00",
            "label": "Depart for Bengaluru",
            "detail": "Down through the hills towards Kushalnagar.",
            "kind": "travel"
          },
          {
            "time": "13:00",
            "label": "Namdroling Monastery, Bylakuppe (optional)",
            "detail": "Just off the highway near Kushalnagar: the gilded prayer hall of one of India's largest Tibetan monasteries. Free to enter; dress modestly and keep voices low.",
            "kind": "free"
          },
          {
            "time": "14:00",
            "label": "Lunch stop (on your own)",
            "detail": "Lunch around Bylakuppe or Kushalnagar; Tibetan momos and thukpa in the settlement, or South Indian meals on the highway.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "17:00",
            "label": "Tea break on the expressway",
            "detail": "A short halt near Mysuru or Mandya to stretch before the final run into the city.",
            "kind": "free"
          },
          {
            "time": "19:00",
            "label": "Arrive Bengaluru",
            "detail": "Drop-offs at the same pickup points. Sunday evening traffic on Mysuru Road can push this later.",
            "kind": "travel"
          }
        ]
      }
    ],
    inclusions: ["Tempo Traveller transport both ways", "1 night stay, twin/triple sharing", "Breakfast (both days), Day 1 lunch and dinner", "Estate tour and tasting"],
    exclusions: ["Day 2 lunch", "Personal expenses", "Entry fees not part of the listed itinerary"],
    whoFor: ["Non-riders who still want the trip planned end to end", "Friend groups and couples", "First-time group travellers"],
    faqs: [
      { question: "Do I need to ride a bike for this?", answer: "No — this trip uses a Tempo Traveller, no riding required." },
      { question: "Can I come alone?", answer: "Yes, solo travellers are common on our Tempo trips." },
      { question: "What's the group size?", answer: "Capped at 11 for this trip — we deliberately leave a seat spare on our 13-seater Tempo Traveller for extra room." },
    ],
    isSample: true,
  },
  {
    id: "t4",
    slug: "hampi-heritage-weekend",
    title: "Hampi Heritage Weekend",
    destination: "Hampi, Karnataka",
    startingPoint: "Bengaluru",
    endingPoint: "Bengaluru",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Yeshwanthpur (Metro station)", "Goraguntepalya (Tumkur Road)", "Nelamangala (Tumkur Road toll)"],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Bus",
    price: 5499,
    originalPrice: 6500, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 30,
    seatsLeft: 22,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Budget-comfort guesthouse, twin sharing",
    food: "Breakfast included, other meals on your own at local eateries",
    categories: ["Weekend", "2 Days", "Heritage"],
    coverImageLabel: "Ruins of the Vittala Temple complex, Hampi, golden hour",
    coverImage: "/photos/hampi-vittala-temple.jpg",
    photos: [
      { src: "/photos/hampi-stone-chariot-hd.jpg", alt: "The stone chariot at Vittala Temple, Hampi", caption: "Stone chariot, Vittala Temple" },
      { src: "/photos/hampi-hut-stay-camp.jpg", alt: "Thatched huts and tents against Hampi’s boulder hills", caption: "Hut stay near Hampi" },
    ],
    gallery: ["Sunset at Matanga Hill", "Coracle ride on the Tungabhadra", "Group photo at the stone chariot"],
    description: [
      "A UNESCO World Heritage site that used to be one of the richest cities on earth, told by a local guide who treats it like a story instead of a syllabus.",
      "Boulders, temple ruins, a river crossing by coracle, and a sunset from Matanga Hill that photos genuinely undersell.",
    ],
    highlights: [
      "Guided walk through the Vittala Temple and the stone chariot",
      "Coracle ride across the Tungabhadra river",
      "Sunset from Matanga Hill",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Vittala, the river and Matanga at dusk",
        "summary": "Board on Friday night and wake up among Hampi's boulders. A guided morning at the Vittala Temple, a coracle on the Tungabhadra in the afternoon, and sunset from the top of Matanga Hill.",
        "stats": {
          "drive": "~7–8 hrs overnight · 345 km",
          "stay": "Guesthouse, Hampi"
        },
        "items": [
          {
            "time": "21:00",
            "label": "Board the AC bus (Friday night)",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Yeshwanthpur, Goraguntepalya and Nelamangala; exact spots and live location go on the trip WhatsApp group. Sleep through it.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Arrive Hampi, freshen up at the guesthouse",
            "detail": "Roll in past Hosapete as the boulder hills turn pink in the early light. Drop bags, wash up and change into light cotton and good walking shoes.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "07:45",
            "label": "Breakfast (on your own)",
            "detail": "Idli, vada, dosa or upma with coffee at a local eatery. Fill a water bottle; there is little shade among the ruins.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:00",
            "label": "Guided walk: Vittala Temple and stone chariot",
            "detail": "Hampi's showpiece: the carved stone chariot, the musical pillars of the main hall and the Kalyana Mantapa, with your guide telling the Vijayanagara story as you go. Monument entry is pay-your-own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:15",
            "label": "Riverside trail past the King's Balance",
            "detail": "Continue with the guide along the Tungabhadra, past the tall stone King's Balance and small shrines tucked between boulders.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Lunch (on your own)",
            "detail": "A North Karnataka meal with jolada rotti and spicy palya, or a simple South Indian thali. Rest out of the midday sun afterwards.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "15:30",
            "label": "Coracle ride on the Tungabhadra",
            "detail": "A round woven boat spinning gently between giant granite boulders, banana groves on the banks and rock-cut carvings at the water's edge. Runs only when water levels are safe.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:15",
            "label": "Climb Matanga Hill for sunset",
            "detail": "From Hampi Bazaar, past the Achyutaraya Temple, the last stretch is a steep scramble over rock. From the top the whole ruin field, the river and Virupaksha's tower glow at dusk. Carry a torch.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner (on your own) and guesthouse",
            "detail": "Dinner at a local eatery, then back to the guesthouse for a proper night's sleep.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 2,
        "title": "Virupaksha mornings and the road home",
        "summary": "Breakfast at the guesthouse, a free morning around the still-living Virupaksha Temple and Hemakuta Hill, then the drive back to Bengaluru, arriving on Sunday night.",
        "stats": {
          "drive": "~7–8 hrs · 345 km",
          "stay": "Return to Bengaluru",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast at the guesthouse",
            "detail": "An easy start after yesterday's walking and climbing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Virupaksha Temple and Hampi Bazaar (free time)",
            "detail": "One of India's oldest working temples, with a nine-tier gopuram of about 160 feet at the head of the old bazaar street. Morning rituals make it lively; dress modestly.",
            "kind": "free"
          },
          {
            "time": "10:00",
            "label": "Hemakuta Hill (free time)",
            "detail": "A short walk up the sloping rock beside Virupaksha to clusters of early temples and wide views over the bazaar and river.",
            "kind": "free"
          },
          {
            "time": "11:30",
            "label": "Check out of the guesthouse",
            "detail": "Pack up and regroup with the trip lead.",
            "kind": "stay"
          },
          {
            "time": "12:30",
            "label": "Lunch (on your own)",
            "detail": "Last North Karnataka meal before the road; stock up on water and snacks for the journey.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Board the bus to Bengaluru",
            "detail": "Back down the highway via Chitradurga, with comfort breaks on the way.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "21:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drops at Nelamangala, Goraguntepalya and Yeshwanthpur. Sunday evening traffic into the city can add time.",
            "kind": "travel"
          }
        ]
      }
    ],
    inclusions: ["AC overnight bus, both ways", "1 night guesthouse stay", "Breakfast Day 2", "Heritage guide", "Coracle ride"],
    exclusions: ["Lunch and dinner", "Monument entry tickets", "Personal expenses"],
    whoFor: ["History and heritage enthusiasts", "First-time group travellers", "Anyone new to Bengaluru wanting a low-effort weekend out"],
    faqs: [
      { question: "Is this trip beginner-friendly?", answer: "Yes — it involves walking on uneven, rocky terrain but no riding or trekking fitness required." },
      { question: "Do I need my own bike?", answer: "No, this trip travels by bus." },
      { question: "What should I carry?", answer: "Comfortable walking shoes, a hat, sunscreen and a water bottle — Hampi is hot and exposed for most of the day." },
    ],
    isSample: true,
  },
  {
    id: "t5",
    slug: "chikmagalur-weekday-escape",
    title: "Chikmagalur Weekday Escape",
    destination: "Chikmagalur, Karnataka",
    startingPoint: "Bengaluru",
    endingPoint: "Bengaluru",
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night",
    transport: "Bike or Tempo Traveller",
    price: 5999,
    seatsTotal: 16,
    seatsLeft: 16,
    bookingStatus: "open",
    difficulty: "Moderate",
    stay: "Hillside homestay, twin sharing",
    food: "Breakfast and dinner included",
    categories: ["Weekday", "Nature", "Adventure"],
    coverImageLabel: "Mist over Mullayanagiri peak, Chikmagalur",
    coverImage: "/photos/chikmagalur-peak.jpg",
    gallery: ["Sunrise trek group at the peak", "Coffee estate breakfast table", "Homestay bonfire evening"],
    description: [
      "The trip for people whose weekends are already spoken for. Same planning, same small group, just on a Tuesday — and Chikmagalur without weekend traffic is a genuinely different, quieter place.",
      "A short peak trek, a coffee estate that isn't overrun, and a bonfire evening that doesn't feel rushed.",
    ],
    highlights: [
      "Mullayanagiri sunrise trek, Karnataka's highest peak",
      "A quiet, uncrowded coffee estate visit",
      "Weekday pricing and zero weekend traffic",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Midweek run to the coffee hills",
        "summary": "An early start on empty weekday highways via Hassan and Belur, breakfast on the road, and an afternoon in a quiet coffee estate in the district where Indian coffee began. Dinner and a bonfire to close.",
        "stats": {
          "drive": "~5–6 hrs · 245 km",
          "stay": "Hillside homestay, Chikmagalur",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Depart Bengaluru via Nelamangala",
            "detail": "Out onto NH75 before the weekday rush. Riders get a briefing and bike check first; Tempo guests settle in with a coffee flask.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast stop near Yediyur",
            "detail": "About 95 km in: idli, vada, dosa and filter coffee at a highway eatery, and a fuel top-up for riders.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Through Hassan towards Belur",
            "detail": "The plains start to roll and the first coffee-green hills appear after Belur. A short regroup and stretch on the way.",
            "kind": "travel"
          },
          {
            "time": "12:30",
            "label": "Arrive and check into the homestay",
            "detail": "Settle into a hillside homestay with views over the estates. Unpack and rest.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch (on your own)",
            "detail": "In Chikmagalur town or at the homestay if the hosts can arrange it at extra cost; a Malnad-style meal is worth trying.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "16:00",
            "label": "Quiet coffee estate visit",
            "detail": "Walk the rows on a weekday, when estates are at their calmest. Coffee in India traces back to the nearby Baba Budan hills, and the story is told best among the bushes.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "18:00",
            "label": "Sunset and free time at the homestay",
            "detail": "Watch the light fade over the hills with a hot cup. Early night recommended; tomorrow starts before dawn.",
            "kind": "free"
          },
          {
            "time": "20:00",
            "label": "Dinner and bonfire",
            "detail": "A home-cooked dinner followed by a crackling bonfire under a clear midweek sky, with no rush to wrap up.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Dawn on Karnataka's highest peak",
        "summary": "A pre-dawn drive up the winding road to be at Mullayanagiri as the peak opens, a short climb with the trek guide for early-morning views, then breakfast and the run home.",
        "stats": {
          "drive": "~6–7 hrs · 290 km including the peak run",
          "stay": "Return to Bengaluru",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "05:00",
            "label": "Leave for Mullayanagiri",
            "detail": "About 20 km of narrow, winding hill road in the dark. The peak road opens at 6am and needs a pre-booked online vehicle pass for the morning slot.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Through the check-post as the road opens",
            "detail": "Among the first vehicles up to the upper parking. Bring a windproof layer; it is cold and blustery at the top.",
            "kind": "travel"
          },
          {
            "time": "06:15",
            "label": "Short guided climb to the summit",
            "detail": "With the trek guide, a 20–30 minute climb up stone steps and grassland to the top at about 1,930 m.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "06:45",
            "label": "Early light at the Mullappa Swamy shrine",
            "detail": "Morning light over the Baba Budangiri range and shola-covered folds, often with cloud drifting through. Visit the small summit shrine and the cave linked to the sage.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast back at the homestay",
            "detail": "A hot breakfast and a well-earned coffee after the cold summit.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Check out and pack",
            "detail": "Bags into the Tempo or onto the bikes, with a final route briefing for riders.",
            "kind": "stay"
          },
          {
            "time": "11:00",
            "label": "Depart for Bengaluru",
            "detail": "Back down via Belur and Hassan onto NH75.",
            "kind": "travel"
          },
          {
            "time": "13:30",
            "label": "Lunch stop en route (on your own)",
            "detail": "A highway meal around Hassan or Channarayapatna.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "17:30",
            "label": "Arrive Bengaluru",
            "detail": "Trip ends at the drop point. Weekday evening traffic at Nelamangala and in the city can add time.",
            "kind": "travel"
          }
        ]
      }
    ],
    inclusions: ["Transport both ways (bike or Tempo, chosen at booking)", "1 night homestay", "Breakfast (both days) and Day 1 dinner", "Trek guide"],
    exclusions: ["Fuel (bike option)", "Lunch on both days", "Personal expenses"],
    whoFor: ["Anyone with flexible weekday leave", "Small groups wanting a quieter version of a popular destination", "Riders and non-riders alike — both transport options available"],
    faqs: [
      { question: "Do I need my own bike?", answer: "No — choose bike or Tempo Traveller when you book." },
      { question: "Is the trek difficult?", answer: "Moderate — around 90 minutes uphill, doable at a steady pace for most fitness levels." },
      { question: "Can I bring a friend?", answer: "Yes, book together or share a referral code." },
    ],
    isSample: true,
  },
  {
    id: "t6",
    slug: "munnar-tea-hills-long-weekend",
    title: "Munnar Tea Hills Long Weekend",
    destination: "Munnar, Kerala",
    startingPoint: "Bengaluru (Tempo Traveller pickup points shared after booking)",
    endingPoint: "Bengaluru (same pickup points, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Silk Board (Hosur Road)", "Electronic City (near M5 Mall)"],
    date: "Next batch — ask on WhatsApp",
    duration: "3 Days / 1 Night (Friday night departure, back Monday morning)",
    transport: "Tempo Traveller",
    price: 9499,
    originalPrice: 11200, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 14,
    seatsLeft: 14,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Hillside resort/homestay, twin/triple sharing (1 night, Saturday)",
    food: "Breakfast and dinner included on Saturday in Munnar, plus Sunday breakfast; other meals are pay-as-you-go",
    categories: ["Long Weekend", "Nature", "Trek"],
    coverImageLabel: "A waterfall cascading through a Munnar tea estate",
    coverImage: "/photos/munnar-tea-estate-falls.jpg",
    photos: [
      { src: "/photos/munnar-group-lakeside.jpg", alt: "Tripshala group by the lake in Munnar", caption: "Lakeside, Munnar" },
      { src: "/photos/munnar-mattupetty-boats.jpg", alt: "Boats on the lake below the Munnar hills", caption: "Mattupetty lake" },
      { src: "/photos/munnar-tea-slopes.jpg", alt: "Rolling tea slopes under a cliff in Munnar", caption: "Tea country" },
    ],
    gallery: ["Sunrise at Kolukkumalai tea estate", "Mattupetty Dam", "Group dinner at the homestay"],
    description: [
      "Endless tea gardens, a road that climbs through the clouds, and the kind of quiet you only get 1,600 metres up. Munnar is the trip for people who want green in every direction and no itinerary to plan themselves.",
      "We travel overnight both ways to protect your weekend — board Friday night, wake up in Munnar Saturday morning, and the whole thing is built around one unmissable moment: sunrise from Kolukkumalai, among the highest tea estates in the world, before we start the drive back.",
    ],
    highlights: [
      "Sunrise from Kolukkumalai — among the highest tea estates in the world, and the single best view on this trip",
      "A waterfall stop on the way down from Kolukkumalai before we head back",
      "Mattupetty Dam, Echo Point and a proper tea garden walk on Day 1",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Overnight climb into Munnar's tea country",
        "summary": "Board on Friday night and wake to the ghat road climbing into the hills. After breakfast and a rest at the stay, the afternoon is lakes, echoes and a slow walk between the tea rows.",
        "stats": {
          "drive": "~11 hrs overnight · 480 km, plus ~1 hr local",
          "stay": "Hillside resort/homestay, Munnar",
          "meals": "Breakfast, dinner"
        },
        "items": [
          {
            "time": "21:00",
            "label": "Board the Tempo Traveller in Bengaluru",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots and live location go on the trip WhatsApp group. We head south on the Hosur–Salem highway and drive through the night; bring a neck pillow and a light shawl.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Tea stop as the plains give way to the hills",
            "detail": "A stretch-and-chai halt near Udumalpet before the ghat section. Freshen up here; the climb ahead is winding, so take motion-sickness tablets now if you need them.",
            "kind": "free",
            "included": false
          },
          {
            "time": "07:00",
            "label": "Ghat climb via Chinnar and Marayoor",
            "detail": "The road rises from dry scrub through Chinnar and Marayoor's sandalwood country before the first tea slopes appear. Keep a window seat for the morning mist.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "09:30",
            "label": "Arrive Munnar, breakfast and check in",
            "detail": "Kerala breakfast at the stay, then time to shower and nap. Rooms are twin or triple sharing.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Munnar",
            "detail": "Pay-as-you-go. Try a Kerala meals plate or appam with stew at a local eatery in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Mattupetty Dam and Echo Point",
            "detail": "Mattupetty's reservoir sits about 13 km out among eucalyptus and grassland; Echo Point, a few kilometres on towards Kundala, throws your shout back off the hills. Boating here is optional and on your own.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Tea garden walk",
            "detail": "An unhurried walk along estate paths between waist-high tea bushes, with the story of how Munnar's plantations are worked. Wear shoes with grip; paths can be damp.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Group dinner at the stay",
            "detail": "Dinner together, then an early night. Tomorrow's alarm is set for 03:00.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "21:30",
            "label": "Overnight in Munnar",
            "detail": "Lay out warm layers, a torch and your phone charger tonight. Kolukkumalai is cold before dawn in any season.",
            "kind": "stay",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Sunrise at Kolukkumalai, then the road home",
        "summary": "A pre-dawn run to Suryanelli and a jeep climb to one of the highest tea estates in the world for sunrise, a waterfall on the way down, then a late breakfast and a slow afternoon before the overnight drive back.",
        "stats": {
          "drive": "~2 hrs local + ~4 hrs jeep, then ~12 hrs overnight · 480 km",
          "stay": "Overnight on the road",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "03:00",
            "label": "Wake at 03:00, leave for Suryanelli by 03:30",
            "detail": "Wear layers and closed shoes; it is often near-freezing at the top. It is about 32 km, roughly an hour in the dark, to Suryanelli, where the Kolukkumalai jeeps start.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "04:30",
            "label": "Jeep climb to Kolukkumalai",
            "detail": "Switch to 4x4 jeeps for a bumpy, rutted estate track, roughly 90 minutes up. Hold on, keep valuables zipped away and expect to be jolted.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:00",
            "label": "Sunrise over Kolukkumalai",
            "detail": "From about 2,100 m, watch the sky colour over layered Western Ghats ridges, often with a sea of cloud below. Sunrise falls between roughly 06:00 and 06:40 depending on the season.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Estate views and the old tea factory",
            "detail": "Walk among tea planted on steep slopes, and peek into the estate's decades-old factory where orthodox tea is still processed. Factory entry is usually charged separately.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "08:30",
            "label": "Waterfall stop on the way down",
            "detail": "The jeep route pauses at a stream-fed waterfall on the descent. Rocks are slippery; enjoy it from the edge.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:30",
            "label": "Back at the stay for breakfast and check-out",
            "detail": "A hearty late breakfast, a shower and time to pack before check-out.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch and free time in Munnar town",
            "detail": "Pay-as-you-go lunch, then browse tea and spice shops, or visit the KDHP Tea Museum at Nallathanni (open Sundays, closed Mondays, entry on your own). Or simply nap.",
            "kind": "free",
            "included": false
          },
          {
            "time": "16:00",
            "label": "Depart Munnar for Bengaluru",
            "detail": "We roll down the ghats in the last light and join the highway on the Tamil Nadu plains.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "20:30",
            "label": "Dinner stop en route",
            "detail": "Pay-as-you-go dinner at a highway restaurant, then settle in for the night drive.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 3,
        "title": "Early-morning arrival in Bengaluru",
        "summary": "We roll into Bengaluru before the Monday rush and drop you at the same pickup points.",
        "stats": {
          "drive": "Final stretch of the overnight drive"
        },
        "items": [
          {
            "time": "05:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at Electronic City (M5 Mall), Silk Board and RMZ Ecospace. Exact time depends on traffic and road conditions overnight.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "Tempo Traveller transport both ways",
      "1 night hillside stay in Munnar, twin/triple sharing",
      "Breakfast and dinner Saturday, breakfast Sunday",
      "Kolukkumalai sunrise jeep transfer",
      "Mattupetty Dam, Echo Point and tea garden walk",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch on all days, and Sunday dinner",
      "Entry fees not part of the listed itinerary",
      "Kolukkumalai jeep safari charges if run as a separate shared jeep — SAMPLE, confirm the actual arrangement before launch",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants a proper long weekend out of the city without planning it",
      "Non-riders who still want the destination and the group",
      "Early risers who'll happily trade a 3:30 AM wake-up for the Kolukkumalai sunrise",
    ],
    faqs: [
      { question: "Do I need to ride a bike for this?", answer: "No — this trip uses a Tempo Traveller, no riding required." },
      { question: "How far is Munnar from Bengaluru?", answer: "Around 470 km one-way, roughly 12-13 hours — which is why we travel overnight both ways, Friday night out and Sunday night back, so you only use one full weekday-free weekend for it." },
      { question: "Do I have to wake up early for Kolukkumalai?", answer: "Yes — the jeep leaves around 3:30 AM to catch sunrise at roughly 5:45-6:00 AM. It's an early start, but it's the most-loved part of this trip." },
      { question: "Can I come alone?", answer: "Yes, solo travellers are common on our Tempo trips." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t7",
    slug: "kochi-alleppey-backwaters-getaway",
    title: "Kochi–Alleppey Backwaters Getaway",
    destination: "Kochi & Alleppey, Kerala",
    startingPoint: "Bengaluru (Tempo Traveller pickup points shared after booking)",
    endingPoint: "Bengaluru (same pickup points, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Silk Board (Hosur Road)", "Electronic City (near M5 Mall)"],
    date: "Next batch — ask on WhatsApp",
    duration: "3 Days / 2 Nights",
    transport: "Tempo Traveller",
    price: 10999,
    originalPrice: 13000, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 12,
    seatsLeft: 12,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Fort Kochi heritage stay (Night 1) + houseboat on the Alleppey backwaters (Night 2)",
    food: "All meals included on the houseboat, breakfast included in Kochi",
    categories: ["Long Weekend", "Coastal", "Heritage"],
    coverImageLabel: "Houseboats moored along a tree-shaded Alleppey backwater canal",
    coverImage: "/photos/kochi-alleppey-backwaters-canal.jpg",
    photos: [
      { src: "/photos/kochi-mattancherry-group.jpg", alt: "Group on the stairs at Mattancherry Palace, Kochi", caption: "Mattancherry Palace, Kochi" },
      { src: "/photos/alleppey-lighthouse.jpg", alt: "The red-and-white Alleppey lighthouse", caption: "Alleppey lighthouse" },
    ],
    gallery: ["Fort Kochi street art walk", "Houseboat deck at sunset", "Chinese fishing nets at dusk"],
    description: [
      "Two very different sides of Kerala in one trip — the old-world streets and cafés of Fort Kochi, then a night on a houseboat drifting through the Alleppey backwaters with nothing to do but watch the coconut palms go by.",
      "This is the trip we send people on when they want a proper switch-off, not another checklist of monuments.",
    ],
    highlights: [
      "A full night on a private houseboat, meals included",
      "Fort Kochi heritage walk — Chinese fishing nets, street art, old churches",
      "Backwater village stops most day-trippers never see",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Across the Palakkad Gap to Fort Kochi",
        "summary": "A long, easy highway day south through Salem and Coimbatore and over the Palakkad Gap into Kerala. You arrive in Fort Kochi in time to watch the sun drop behind the Chinese fishing nets.",
        "stats": {
          "drive": "~11 hrs · 560 km",
          "stay": "Heritage stay, Fort Kochi"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Depart Bengaluru",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots and live location go on the trip WhatsApp group. Settle in; it is a full highway day.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast stop near Krishnagiri",
            "detail": "A South Indian breakfast of idli, vada or dosa with filter coffee at a highway restaurant. Pay on your own.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Lunch stop near Coimbatore",
            "detail": "Pay-as-you-go lunch before the road crosses the Palakkad Gap, where the Western Ghats briefly part and paddy fields and palms announce Kerala.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "17:15",
            "label": "Arrive Fort Kochi, check in",
            "detail": "Check in to the heritage stay in the old quarter and drop your bags. Everything tonight is within walking distance.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "18:00",
            "label": "Chinese fishing nets at sunset",
            "detail": "Walk to the waterfront where the giant cantilevered nets rise and dip at the harbour mouth. Sunset falls between about 18:05 and 18:45 through the year, so don't linger over tea.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "19:30",
            "label": "Dinner in Fort Kochi",
            "detail": "On your own. Seafood stalls near the nets will cook the day's catch to order, and the cafés along Princess Street stay open late.",
            "kind": "meal",
            "included": false
          }
        ]
      },
      {
        "day": 2,
        "title": "Old Kochi on foot, then a night on the water",
        "summary": "A cool-morning heritage walk through Fort Kochi's churches and lanes, a short drive south, and an afternoon drifting through the Alleppey backwaters on your own houseboat until it moors for the night.",
        "stats": {
          "drive": "~1.5 hrs · 55 km",
          "stay": "Private houseboat, Alleppey",
          "meals": "Breakfast, lunch, tea, dinner"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast at the heritage stay",
            "detail": "Breakfast before the day warms up.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:15",
            "label": "Fort Kochi heritage walk",
            "detail": "St Francis Church, where Vasco da Gama was first buried, the Dutch Cemetery, Santa Cruz Basilica and the street art and old warehouses of Princess Street. About two hours at an easy pace.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:15",
            "label": "Check out and drive to Alleppey",
            "detail": "About 55 km down the coast. We pass through Mattancherry's spice-scented lanes on the way out. The Paradesi Synagogue there is closed on Fridays and Saturdays.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "12:00",
            "label": "Board your houseboat",
            "detail": "Board at the Alleppey jetty; standard houseboat check-in is noon. Welcome drink, then the boat casts off into the backwaters.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "13:00",
            "label": "Kerala lunch on board",
            "detail": "Cooked fresh by the onboard crew: rice, sambar, thoran, pickle and usually a fish dish such as karimeen (pearl spot) fry. Tell us in advance if you're vegetarian.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "14:00",
            "label": "Cruise through Kuttanad's canals",
            "detail": "Glide past paddy fields farmed below sea level, village churches, toddy shops and ducks herded along the water. Where the crew can, they moor for a short walk along a village bund.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "16:30",
            "label": "Tea and snacks on deck",
            "detail": "Tea with banana fritters or a similar snack as the light turns gold over the water.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "17:45",
            "label": "Moor for the evening",
            "detail": "Kerala rules require houseboats to stop cruising by dusk, so the boat anchors by a quiet bank for the night. Sit out and watch the fireflies and village lights.",
            "kind": "free"
          },
          {
            "time": "20:00",
            "label": "Dinner on the houseboat",
            "detail": "A home-style Kerala dinner served on board, then a night on the water.",
            "kind": "meal",
            "included": true
          }
        ]
      },
      {
        "day": 3,
        "title": "Backwater morning, then home",
        "summary": "Wake on the water for a quiet dawn and breakfast on deck, disembark by nine and make the long drive back to Bengaluru.",
        "stats": {
          "drive": "~12 hrs · 610 km",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:30",
            "label": "Dawn on the backwaters",
            "detail": "Tea on deck while the canals wake up: fishermen in country boats, children heading to school by ferry, kingfishers on the wires.",
            "kind": "free"
          },
          {
            "time": "08:00",
            "label": "Breakfast on the houseboat",
            "detail": "Usually appam or puttu with curry, eggs, fruit and tea or coffee.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Disembark, depart for Bengaluru",
            "detail": "Standard houseboat check-out is 09:00. We head north past Kochi and back over the Palakkad Gap.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "13:30",
            "label": "Lunch stop en route",
            "detail": "Pay-as-you-go lunch around Palakkad or Coimbatore.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "19:00",
            "label": "Tea or dinner stop",
            "detail": "A final highway halt near Salem or Krishnagiri. Pay on your own.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "22:00",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-offs at the same pickup points. Arrival time depends on Sunday-evening traffic into Hosur Road.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "Tempo Traveller transport both ways",
      "1 night Fort Kochi stay + 1 night private houseboat",
      "All meals on the houseboat, breakfast in Kochi",
      "Fort Kochi heritage walk",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch on Day 1 and Day 3",
      "Monument/attraction entry fees",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants a genuine switch-off weekend, not a sightseeing sprint",
      "Couples and friend groups celebrating something",
      "Non-riders who still want the trip planned end to end",
    ],
    faqs: [
      { question: "Do I need to ride a bike for this?", answer: "No — this trip uses a Tempo Traveller, no riding required." },
      { question: "Is the houseboat private to our group?", answer: "SAMPLE — confirm your actual houseboat-sharing arrangement (private vs shared) before launch." },
      { question: "Can I come alone?", answer: "Yes, solo travellers are welcome — you'll share the houseboat with the rest of the group." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t8",
    slug: "pondicherry-weekend-getaway",
    title: "Pondicherry Weekend Getaway",
    destination: "Puducherry",
    startingPoint: "Bengaluru",
    endingPoint: "Bengaluru",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Silk Board (Hosur Road)", "Electronic City (near M5 Mall)"],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Bus",
    price: 5999,
    originalPrice: 7100, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "French Quarter guesthouse, twin sharing",
    food: "Breakfast included, other meals on your own at local cafés",
    categories: ["Weekend", "Coastal", "Heritage"],
    coverImageLabel: "The golden Matrimandir dome at Auroville, near Pondicherry",
    coverImage: "/photos/pondicherry-auroville-dome.jpg",
    gallery: ["Promenade beach at sunrise", "French Quarter street walk", "Auroville viewpoint"],
    description: [
      "Cobbled streets, mustard-yellow colonial buildings, beachfront cafés and a completely different pace from anywhere else on the Tripshala map. Pondicherry is the weekend for people who want charm over adrenaline.",
      "An overnight bus down, a full day to wander the French Quarter and the promenade, and you're back in Bengaluru before Monday.",
    ],
    highlights: [
      "Guided walk through the French Quarter's colonial streets",
      "Sunrise at Promenade Beach",
      "A stop at Auroville's viewpoint",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Sunrise on the Promenade, a day in White Town",
        "summary": "Step off the overnight bus in time for sunrise over the Bay of Bengal, then spend the day on foot through the French Quarter's ochre streets, the Ashram and the Tamil Quarter, ending with the car-free evening promenade.",
        "stats": {
          "drive": "~7 hrs overnight bus · 320 km",
          "stay": "French Quarter guesthouse, Pondicherry"
        },
        "items": [
          {
            "time": "22:00",
            "label": "Board the overnight AC bus in Bengaluru",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots and live location go on the trip WhatsApp group. It is about seven hours to Pondicherry, so sleep as much as you can.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "05:30",
            "label": "Arrive, then sunrise at Promenade (Rock) Beach",
            "detail": "The sun rises straight out of the sea here, usually between 05:45 and 06:20. Walkers, joggers and fishing boats share the seawall, the Gandhi statue and the old lighthouse. The water is rough, so no swimming.",
            "kind": "activity"
          },
          {
            "time": "07:30",
            "label": "Freshen up at the guesthouse",
            "detail": "Drop your bags at the French Quarter guesthouse and freshen up.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Breakfast at a French Quarter café",
            "detail": "On your own. Fresh croissants and filter coffee, or idli and pongal nearby.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:30",
            "label": "French Quarter heritage walk",
            "detail": "Bharathi Park and Aayi Mandapam, Raj Nivas, the pink Our Lady of Angels church, the French War Memorial, the bougainvillea-draped villas of Rue Dumas, and a pause at the Aurobindo Ashram (open 08:00–11:30).",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch on your own",
            "detail": "Try Franco-Tamil Creole dishes, or a South Indian meals plate on the Tamil Quarter side.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Check in and rest through the heat",
            "detail": "Afternoons are hot and humid, so take a siesta.",
            "kind": "free"
          },
          {
            "time": "16:30",
            "label": "Tamil Quarter and Manakula Vinayagar temple",
            "detail": "Wander across the canal to the Tamil Quarter's verandah houses and the busy Ganesha temple near the Ashram. Dress modestly and leave footwear outside.",
            "kind": "free"
          },
          {
            "time": "18:00",
            "label": "Evening on the car-free promenade",
            "detail": "Beach Road is kept free of traffic in the evening and fills with families, sea breeze and snack carts. Dinner is on your own afterwards.",
            "kind": "free",
            "included": false
          }
        ]
      },
      {
        "day": 2,
        "title": "Auroville's golden globe and the ride home",
        "summary": "Breakfast at the guesthouse, a morning at Auroville to see the Matrimandir from its viewing point, and an afternoon bus that gets you back to Bengaluru on Sunday night.",
        "stats": {
          "drive": "~1 hr local + ~7 hrs bus · 320 km",
          "stay": "Back home Sunday night",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "07:30",
            "label": "Breakfast at the guesthouse",
            "detail": "Included. Then pack up and check out.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "09:00",
            "label": "Head out to Auroville",
            "detail": "About 30–40 minutes north of town through cashew groves and red earth.",
            "kind": "travel"
          },
          {
            "time": "09:45",
            "label": "Auroville Visitors Centre",
            "detail": "Watch the short introductory film, then collect the free Matrimandir viewing-point pass. You collect it in person here. Browse the Auroville-made crafts nearby.",
            "kind": "activity"
          },
          {
            "time": "10:30",
            "label": "Matrimandir viewing point",
            "detail": "A partly shaded walk of about 10 minutes brings you to the golden-disc-covered globe set among gardens and banyan trees. The viewing point is open 09:00–17:30 daily; the inner chamber is not part of this visit.",
            "kind": "activity"
          },
          {
            "time": "12:30",
            "label": "Lunch on your own",
            "detail": "Cafés around the Visitors Centre serve wholesome, often organic, plates, or eat back in town.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Free time in Pondicherry",
            "detail": "Last coffee, a boutique or bookshop in White Town, or a final look at the sea.",
            "kind": "free"
          },
          {
            "time": "15:30",
            "label": "Board the return AC bus",
            "detail": "We leave mid-afternoon so you're home on Sunday night.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "22:30",
            "label": "Arrive Bengaluru, trip ends",
            "detail": "Drop-off at the listed points. The exact time depends on Sunday-evening traffic into the city.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC overnight bus, both ways",
      "1 night French Quarter guesthouse stay",
      "Breakfast Day 2",
      "French Quarter heritage walk",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch and dinner",
      "Auroville inner-circle entry (optional, on your own)",
      "Personal expenses",
    ],
    whoFor: [
      "First-time group travellers wanting a low-effort weekend out",
      "Anyone who prefers cafés and architecture over trekking",
      "Friend groups and couples",
    ],
    faqs: [
      { question: "Is this trip beginner-friendly?", answer: "Yes — it's mostly walking on flat, paved streets, no fitness requirements." },
      { question: "Do I need my own bike?", answer: "No, this trip travels by bus." },
      { question: "How far is Pondicherry from Bengaluru?", answer: "Around 320 km, roughly a 7-hour overnight drive." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t9",
    slug: "rameshwaram-island-temple-getaway",
    title: "Rameshwaram Island & Temple Getaway",
    destination: "Rameshwaram, Tamil Nadu",
    startingPoint: "Bengaluru",
    endingPoint: "Bengaluru",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Silk Board (Hosur Road)", "Electronic City (near M5 Mall)"],
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back early Sunday)",
    transport: "Bus",
    price: 6999,
    originalPrice: 8300, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Budget-comfort guesthouse near the temple, twin sharing (day-use, to freshen up between the overnight buses)",
    food: "Breakfast included, other meals on your own at local eateries",
    categories: ["Weekend", "2 Days", "Heritage", "Coastal", "Temple Trails"],
    coverImageLabel: "Pamban Bridge stretching out to sea toward Rameshwaram island",
    coverImage: "/photos/rameshwaram-pamban-bridge-aerial.jpg",
    photos: [
      { src: "/photos/rameshwaram-beach-walk.jpg", alt: "A traveller walking the quiet Rameshwaram shoreline", caption: "The quiet shoreline" },
      { src: "/photos/rameshwaram-shoreline.jpg", alt: "Curving beach and calm sea at Rameshwaram", caption: "Rameshwaram coast" },
    ],
    gallery: [
      "Ramanathaswamy Temple's corridor at golden hour",
      "The ghost-town coastline at Dhanushkodi",
      "Sunrise over Agni Theertham beach",
    ],
    description: [
      "This is the farthest we send anyone, and the most unusual place on the Tripshala map — an island temple town where the Bay of Bengal and the Indian Ocean meet at the literal tip of India, and a coastline that still shows what a cyclone did to it in 1964.",
      "Two overnight buses bracket a single, full day on the ground: the 22 sacred wells and thousand-pillared corridors of the Ramanathaswamy Temple, the crossing over Pamban Bridge, and Dhanushkodi's abandoned shoreline — sand, ruins and sea in every direction, with almost nothing else built on it.",
    ],
    highlights: [
      "Ramanathaswamy Temple — the longest temple corridor in India, and the ritual bath across its 22 sacred wells",
      "Dhanushkodi's ghost-town coastline, abandoned after the 1964 cyclone and reachable only by van across the sand",
      "Crossing the Pamban road bridge over the sea, with the new vertical-lift rail bridge alongside",
      "Arichal Munai, the sandy tip where the Bay of Bengal visibly meets the Indian Ocean",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Overnight south to the island",
        "summary": "An evening departure and a long night on the highway via Salem, Karur and Madurai, crossing onto Pamban island at first light.",
        "stats": {
          "drive": "~11–12 hrs overnight bus · 590 km",
          "stay": "Overnight on the bus"
        },
        "items": [
          {
            "time": "19:30",
            "label": "Board the overnight AC bus in Bengaluru",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Silk Board and Electronic City (near M5 Mall); exact spots and live location go on the trip WhatsApp group. Pack a separate bag with a change of clothes, a towel and traditional temple wear for tomorrow.",
            "kind": "travel",
            "included": true
          }
        ]
      },
      {
        "day": 2,
        "title": "Temple wells, a sea bridge and land's end",
        "summary": "Cross the Pamban road bridge at dawn, bathe in the 22 sacred wells of Ramanathaswamy Temple and walk its pillared corridors, then head down the new coastal road to Dhanushkodi's ruins and Arichal Munai.",
        "stats": {
          "drive": "~1.5 hrs local · 50 km",
          "stay": "Guesthouse near the temple (day-use)",
          "meals": "Breakfast"
        },
        "items": [
          {
            "time": "06:30",
            "label": "Across the Pamban road bridge",
            "detail": "The bus crosses the 2.3 km road bridge over the Palk Strait. Below lie the decommissioned 1914 rail bridge and the new vertical-lift rail bridge, opened in 2025. We make a brief photo stop at the island end, traffic permitting.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:15",
            "label": "Freshen up at the guesthouse",
            "detail": "Day-use rooms near the temple for a wash and a change. Leave phones and valuables here, since they are not allowed inside the temple.",
            "kind": "stay",
            "included": true
          },
          {
            "time": "07:45",
            "label": "Breakfast",
            "detail": "Idli, pongal, vada and strong coffee before the temple.",
            "kind": "meal",
            "included": true
          },
          {
            "time": "08:30",
            "label": "Agni Theertham dip and the 22 sacred wells",
            "detail": "Pilgrims begin with a sea dip at Agni Theertham, then attendants pour a bucket from each temple well over you. You will be drenched. The bath fee is paid on the spot, and the wells close at about 12:30.",
            "kind": "activity",
            "included": false
          },
          {
            "time": "10:15",
            "label": "Ramanathaswamy Temple darshan and corridors",
            "detail": "Change into dry traditional clothes for darshan at one of the twelve Jyotirlingas. Then walk the vast pillared corridors, often called the longest in India. Jeans, shorts and sleeveless tops are not permitted.",
            "kind": "activity"
          },
          {
            "time": "12:30",
            "label": "Lunch on your own",
            "detail": "A South Indian meals plate on a banana leaf at a local eatery near the temple streets. The temple itself closes 13:00–15:00.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Drive towards Dhanushkodi",
            "detail": "By local van, down the narrow spit of sand between two seas. We stop at Kothandaramaswamy Temple, the only historic structure to survive the 1964 cyclone.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "14:45",
            "label": "Dhanushkodi ghost town",
            "detail": "The roofless shell of the church, the remains of the old railway station and scattered coral-stone walls, abandoned since the December 1964 cyclone. Carry water and a cap; there is almost no shade.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "15:30",
            "label": "Arichal Munai, the island's tip",
            "detail": "The road ends at a windswept point where the rough Bay of Bengal meets the calmer Gulf of Mannar. Police usually ask visitors to leave by about 17:00, and access closes in rough weather.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "17:00",
            "label": "Free evening in the temple town",
            "detail": "Rest at the guesthouse, browse the conch-shell bazaar or return to the temple (open until 21:00). Dinner is on your own; simple vegetarian meals and dosa are close by.",
            "kind": "free",
            "included": false
          },
          {
            "time": "21:00",
            "label": "Board the return overnight bus",
            "detail": "Overnight back to Bengaluru, arriving on Sunday morning, around 09:00 depending on traffic.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC overnight bus, both ways",
      "1 night guesthouse (day-use, for freshening up)",
      "Breakfast Day 2",
      "Local van transfer to Dhanushkodi",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch and dinner",
      "22 wells ritual bath fee (~₹25/person, paid on the spot) and cloakroom charges for phones/valuables",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants a genuinely different landscape, not another hill station",
      "First-time group travellers up for a longer haul for a one-of-a-kind destination",
      "Photographers — Dhanushkodi's shipwreck coastline doesn't look like anywhere else on the map",
    ],
    faqs: [
      { question: "Is this trip beginner-friendly?", answer: "Yes — it's flat ground throughout (temple corridors, sand at Dhanushkodi), no trekking fitness needed. Expect strong sun and heat, so carry water and sun protection." },
      { question: "Do I need my own bike?", answer: "No, this trip travels by bus." },
      { question: "What's the dress code for the temple?", answer: "Ramanathaswamy Temple checks at every gate: men need a dhoti/veshti or formal trousers (no shorts or jeans), women need a saree, half-saree or salwar kameez with dupatta (no sleeveless tops, jeans or leggings)." },
      { question: "How far is Rameshwaram from Bengaluru?", answer: "Around 580-600 km by road — this is why it's built around two overnight buses rather than a same-day drive." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t10",
    slug: "manchanabele-lake-camping",
    title: "Manchanabele Lake Camping",
    destination: "Manchanabele, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
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
    date: "Next batch — ask on WhatsApp",
    duration: "Half day (4:15 am pickup, back by about 1 pm)",
    transport: "Tempo Traveller",
    price: 1299,
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
    date: "Next batch — ask on WhatsApp",
    duration: "Pre-dawn (2:30 am pickup, back by about 11 am)",
    transport: "Tempo Traveller",
    price: 999,
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
      "Dinner before the trek",
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
    id: "t14",
    slug: "lepakshi-temple-day-trip",
    title: "Lepakshi Temple Day Trip",
    destination: "Lepakshi, Andhra Pradesh (just across the Karnataka border)",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Hebbal (near the flyover)", "Yelahanka (NH-44)", "Devanahalli (near the airport)"],
    date: "Next batch — ask on WhatsApp",
    duration: "One day (6:00 am – about 4:30 pm)",
    transport: "Tempo Traveller",
    price: 1199,
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "N/A — same-day trip, no overnight stay",
    food: "Tea/breakfast stop and lunch on your own at local eateries",
    categories: ["Temple Trails", "One Day", "Heritage"],
    coverImageLabel: "The Nagalinga — a multi-hooded stone serpent shrine — at Lepakshi temple",
    coverImage: "/photos/lepakshi-nagalinga.jpg",
    gallery: [
      "The famous hanging pillar inside the main mandapa",
      "Vijayanagara-era ceiling frescoes",
      "The unfinished Kalyana Mandapa",
    ],
    description: [
      "Lepakshi is the easiest genuinely spectacular day trip out of Bengaluru — a 16th-century Vijayanagara-era temple town barely two hours away, built by two brothers who served under Achutaraya, and packed with the kind of craftsmanship you usually have to travel much further to see.",
      "The Veerabhadra Temple's ceiling frescoes are some of the best-preserved in South India, the giant monolithic Nandi outside is one of the largest in the country, and the temple's 'hanging pillar' — one of 70 pillars that doesn't actually touch the ground — is the thing everyone comes to see for themselves.",
    ],
    highlights: [
      "The hanging pillar — slide something under it and watch it pass clean through",
      "One of India's largest monolithic Nandi statues, carved from a single granite boulder",
      "Vijayanagara-era ceiling frescoes in vivid, original colour",
      "The unfinished Kalyana Mandapa and its giant carved granite pillars",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Frescoes, a floating pillar and a stone Nandi",
        "summary": "Up the Hyderabad highway and across the Andhra border to Lepakshi, arriving while the stone is still cool. The giant Nandi first, then a guided walk through Veerabhadra Temple's frescoes, carvings and famous hanging pillar.",
        "stats": {
          "drive": "~2–2.5 hrs · ~120 km each way"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Hebbal, Yelahanka and Devanahalli; exact spots and live location go on the trip WhatsApp group. Wear clothing suitable for a working temple, and shoes that slip off easily.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Depart Bengaluru via NH-44",
            "detail": "North past the airport and Chikkaballapur on the AC Tempo Traveller, as the countryside gives way to dry, boulder-strewn Deccan plains.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:30",
            "label": "Breakfast stop on the highway",
            "detail": "A stop past Devanahalli for idli, vada, dosa and filter coffee at your own cost. Food options near the temple are limited, so eat well here.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "09:30",
            "label": "The monolithic Nandi",
            "detail": "About 200 metres before the temple, a reclining bull roughly 6 m high and 9 m long, carved from a single granite block with belled collar and chains in fine detail.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Veerabhadra Temple guided walk",
            "detail": "Built around 1530 by the brothers Virupanna and Viranna on the tortoise-shaped Kurma Saila hillock. Your guide leads through the mandapas and their dancer and musician carvings. Footwear is left at the entrance.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "10:45",
            "label": "Ceiling frescoes and the hanging pillar",
            "detail": "Look up at Vijayanagara murals in natural pigments, including a Veerabhadra figure about 24 by 14 feet. Then find the one pillar of 70 whose base clears the floor enough to pass a cloth beneath.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "11:30",
            "label": "Nagalinga and the unfinished Kalyana Mandapa",
            "detail": "A huge seven-hooded serpent coiled over a Shiva linga, then the roofless wedding hall with its carved granite pillars and a large footprint in the rock that local legend links to the Ramayana.",
            "kind": "activity",
            "included": true
          },
          {
            "time": "12:30",
            "label": "Lunch in Lepakshi",
            "detail": "Simple Andhra-style meals at local eateries in town at your own cost. Expect rice, sambar, spicy pickles and buttermilk. Tender coconut vendors are usually near the temple.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "13:30",
            "label": "Depart for Bengaluru, trip ends ~16:30",
            "detail": "Back down NH-44 with drop-offs at Devanahalli, Yelahanka and Hebbal. Evening city traffic can add some time.",
            "kind": "travel",
            "included": true
          }
        ]
      }
    ],
    inclusions: [
      "AC Tempo Traveller pickup and drop from Bengaluru",
      "Guided walk through the temple complex",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Breakfast and lunch",
      "Temple donations or special darshan fees, if any",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "First-timers who want a big, genuinely impressive day trip without committing a whole weekend",
      "Anyone into temple architecture, frescoes or history",
      "Families and slow-paced groups — there's no trekking or physical strain involved",
    ],
    faqs: [
      { question: "Is this trip beginner-friendly?", answer: "Yes — it's flat ground throughout with some walking around the temple complex, no fitness requirement at all." },
      { question: "How far is Lepakshi from Bengaluru?", answer: "Around 120km, roughly 2-2.5 hours each way." },
      { question: "Is there a dress code?", answer: "Standard modest temple dress — covered shoulders and knees. No strict dhoti/saree requirement like some larger pilgrimage temples." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t15",
    slug: "melkote-temple-trail",
    title: "Melkote Temple Trail",
    destination: "Melkote, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    date: "Next batch — ask on WhatsApp",
    duration: "One day (6:00 am – about 6:00 pm)",
    transport: "Tempo Traveller",
    price: 1299,
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
    id: "t16",
    slug: "talakadu-shivanasamudra-temple-trail",
    title: "Talakadu Sand Temples & Shivanasamudra Falls",
    destination: "Talakadu & Shivanasamudra, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    date: "Next batch — ask on WhatsApp",
    duration: "One day (6:00 am – about 7:15 pm)",
    transport: "Tempo Traveller",
    price: 1399,
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "N/A — same-day trip, no overnight stay",
    food: "Tea/breakfast stop and lunch on your own at local eateries",
    categories: ["Temple Trails", "One Day", "Heritage", "Nature"],
    coverImageLabel: "Vaidyeshwara Temple half-buried in river sand at Talakadu",
    coverImage: "/photos/talakadu-sand-temple.jpg",
    gallery: [
      "The Kaveri riverbank at Talakadu",
      "Gaganachukki falls at Shivanasamudra",
      "Sand dunes surrounding the Panchalinga temples",
    ],
    description: [
      "Talakadu is one of the stranger, more atmospheric temple sites near Bengaluru — a former temple town on the banks of the Kaveri that got buried under sand dunes centuries ago, according to legend after a curse, and comes alive during the Panchalinga Darshana, a rare festival held when a particular star alignment falls (most recently in December 2020).",
      "We pair it with Shivanasamudra, twenty-odd kilometres away — twin waterfalls (Gaganachukki and Barachukki) on the same river, and one of the better nature stops within day-trip range of the city.",
    ],
    highlights: [
      "Vaidyeshwara Temple and the sand-buried Panchalinga temple sites",
      "A walk along the Kaveri riverbank at Talakadu",
      "Gaganachukki and Barachukki waterfalls at Shivanasamudra",
      "A genuinely different landscape — sand dunes on a riverbank, unlike anywhere else nearby",
      "Extra room on board — we run 11 seats on our 13-seater Tempo Traveller, not the usual 12, so nobody's stuck in a cramped back row",
    ],
    itinerary: [
      {
        "day": 1,
        "title": "Sand temples of Talakadu and the Kaveri falls",
        "summary": "An early start down Mysore Road for a breakfast stop at Maddur, a cool-morning walk among Talakadu's sand-drifted temples on a bend of the Kaveri, then the twin cascades of Shivanasamudra before the drive home.",
        "stats": {
          "drive": "~6.5 hrs total · ~300 km round trip"
        },
        "items": [
          {
            "time": "06:00",
            "label": "Pickups begin at RMZ Ecospace",
            "detail": "First pickup at RMZ Ecospace, Bellandur, then Banashankari, RR Nagar and Kengeri; exact spots and live location go on the trip WhatsApp group. exact point and order shared on the trip WhatsApp group. Wear comfortable footwear that slips off easily for temple visits.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "06:30",
            "label": "Depart Bengaluru",
            "detail": "Out along Mysore Road towards Maddur in the AC Tempo Traveller, with 11 seats on a 13-seater so everyone has room to stretch.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "07:45",
            "label": "Breakfast stop near Maddur",
            "detail": "Maddur is the home of the crisp Maddur vada; a good place for idli, vada and filter coffee at a local eatery before the country roads.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "08:30",
            "label": "Drive via Malavalli to Talakadu",
            "detail": "Around 90 minutes through sugarcane and paddy country to Talakadu, on a sharp bend of the Kaveri.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "10:00",
            "label": "Talakadu temple walk among the sand dunes",
            "detail": "See the Vaidyeshwara Temple, the most intact of the group, the Hoysala-era Keerthinarayana Temple and the Pataleshwara shrine excavated from the dunes. Sand gets hot by late morning, so go barefoot carefully.",
            "kind": "activity"
          },
          {
            "time": "11:45",
            "label": "Kaveri riverbank at Talakadu",
            "detail": "Quiet time on the sandy bank where the river curves. Paddling in the shallows is common, but currents can be deceptive; please do not swim.",
            "kind": "free"
          },
          {
            "time": "12:30",
            "label": "Drive to Shivanasamudra",
            "detail": "About 30 km, roughly 45 minutes, to the point where the Kaveri splits around an island and drops into two falls.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "13:15",
            "label": "Lunch at a local eatery",
            "detail": "Simple South Indian meals at an eatery near Shivanasamudra; options are basic, so carry water and a snack if you have dietary needs.",
            "kind": "meal",
            "included": false
          },
          {
            "time": "14:00",
            "label": "Gaganachukki viewpoint",
            "detail": "The taller western fall, about 90 m, plunging into a deep gorge; viewed from railed platforms above. Flow is strongest July to October and can thin to a trickle in summer.",
            "kind": "activity"
          },
          {
            "time": "14:45",
            "label": "Bharachukki falls",
            "detail": "15–20 minutes away, a wide, stepped cascade reached by a flight of around 200 steps. Coracle rides run only outside the monsoon and are pay-on-your-own.",
            "kind": "activity"
          },
          {
            "time": "15:45",
            "label": "Depart for Bengaluru",
            "detail": "Roughly three and a half hours back, depending on evening traffic on the approach to the city.",
            "kind": "travel",
            "included": true
          },
          {
            "time": "19:15",
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
      "Temple donations, if any",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants temple history and nature in the same day",
      "Photographers — the sand-buried temples and the falls are both very visual",
      "First-time group travellers looking for an easy, well-rounded day out",
    ],
    faqs: [
      { question: "Is this trip beginner-friendly?", answer: "Yes, it's mostly flat walking at both stops — no fitness requirement." },
      { question: "How far is Talakadu from Bengaluru?", answer: "Around 135km, roughly 3 hours each way; Shivanasamudra is a further 20-odd km from Talakadu." },
      { question: "Can we get close to the waterfalls?", answer: "You'll view them from marked viewpoints — getting into the water is restricted and unsafe at both falls, and we stick to the safe viewing areas." },
      { question: "What's the cancellation policy?", answer: "Full details are on our Cancellation & Refund Policy page — in short, the earlier you cancel, the more you get back, and if Tripshala cancels a trip you get a full refund or a free move to another date." },
    ],
    isSample: true,
  },
  {
    id: "t17",
    slug: "nanjangud-mysore-temple-trail",
    title: "Nanjangud & Chamundi Hill Temple Trail",
    destination: "Nanjangud & Mysuru, Karnataka",
    startingPoint: "Bengaluru (assembly point shared after booking)",
    endingPoint: "Bengaluru (same assembly point, dropped back after the trip)",
    pickupPoints: ["RMZ Ecospace (Bellandur, Outer Ring Road)", "Banashankari (BDA Complex)", "RR Nagar (Mysore Road)", "Kengeri (Mysore Road)"],
    date: "Next batch — ask on WhatsApp",
    duration: "One day (5:30 am – about 8:00 pm)",
    transport: "Tempo Traveller",
    price: 1499,
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
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Tempo Traveller",
    price: 6999,
    originalPrice: 8300, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
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
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Tempo Traveller",
    price: 6499,
    originalPrice: 7700, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
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
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night (Friday night departure, back Sunday night)",
    transport: "Tempo Traveller",
    price: 6799,
    originalPrice: 8000, // Gandhi Jayanti long-weekend sale (Fri 2 Oct 2026) — remove/clear once the sale ends
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
];

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
