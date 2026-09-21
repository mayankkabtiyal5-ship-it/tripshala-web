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
  | "Nature";

export type BookingStatus = "open" | "few-left" | "sold-out" | "closed";

export interface ItineraryItem {
  time: string;
  label: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  items: ItineraryItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  destination: string;
  startingPoint: string;
  date: string; // display string, e.g. "18-19 Oct 2026"
  duration: string; // e.g. "2 Days / 1 Night"
  transport: "Bike" | "Tempo Traveller" | "Bus" | "Bike or Tempo Traveller";
  price: number; // per person, INR
  seatsTotal: number;
  seatsLeft: number;
  bookingStatus: BookingStatus;
  difficulty: "Easy" | "Moderate" | "Challenging";
  stay: string;
  food: string;
  categories: TripCategory[];
  coverImageLabel: string; // placeholder label until real photography exists
  gallery: string[]; // placeholder labels
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
    date: "SAMPLE DATE — 17-18 Oct 2026",
    duration: "2 Days / 1 Night",
    transport: "Bike",
    price: 4999,
    seatsTotal: 20,
    seatsLeft: 6,
    bookingStatus: "few-left",
    difficulty: "Moderate",
    stay: "Homestay, twin sharing",
    food: "Breakfast and dinner included, lunch stops are pay-as-you-go",
    categories: ["Bike Rides", "Weekend", "2 Days", "Nature", "Adventure"],
    coverImageLabel: "Riders on the Sakleshpur ghat road, misty coffee estates",
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
        day: 1,
        title: "Bengaluru to Sakleshpur",
        items: [
          { time: "05:30", label: "Meet at the assembly point, briefing and bike check" },
          { time: "06:00", label: "Depart Bengaluru" },
          { time: "08:30", label: "Breakfast stop — filter coffee and dosa" },
          { time: "12:30", label: "Arrive Sakleshpur, check into homestay" },
          { time: "15:00", label: "Local waterfall visit" },
          { time: "20:00", label: "Dinner at the homestay" },
        ],
      },
      {
        day: 2,
        title: "Sakleshpur exploration and ride back",
        items: [
          { time: "07:00", label: "Breakfast" },
          { time: "08:30", label: "Coffee estate walk" },
          { time: "11:00", label: "Depart for Bengaluru" },
          { time: "13:00", label: "Lunch stop (on your own)" },
          { time: "17:00", label: "Arrive Bengaluru, trip ends" },
        ],
      },
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
      { question: "What's the cancellation policy?", answer: "SAMPLE — replace with your actual policy before launch." },
    ],
    isSample: true,
  },
  {
    id: "t2",
    slug: "nandi-hills-sunrise-ride",
    title: "Nandi Hills Sunrise Ride",
    destination: "Nandi Hills, Karnataka",
    startingPoint: "Hebbal, Bengaluru",
    date: "SAMPLE DATE — every Sunday",
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
    gallery: ["Pre-dawn assembly point", "Valley view from the top", "Group breakfast stop"],
    description: [
      "The ride that started it all — out of the city while it's still dark, up the hill in time to watch the valley catch the first light, back home before most people are out of bed.",
      "No planning, no figuring out where to stop for coffee. Just show up at 4:45am with a full tank.",
    ],
    highlights: [
      "Sunrise from the top, timed precisely",
      "A genuinely good filter coffee stop on the way up",
      "Back home by mid-morning — the whole day is still yours",
    ],
    itinerary: [
      {
        day: 1,
        title: "Sunrise ride",
        items: [
          { time: "04:45", label: "Assemble at Hebbal" },
          { time: "05:00", label: "Depart" },
          { time: "05:45", label: "Coffee stop" },
          { time: "06:15", label: "Reach the top, sunrise" },
          { time: "08:00", label: "Ride back" },
          { time: "09:00", label: "Trip ends" },
        ],
      },
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
    date: "SAMPLE DATE — 7-8 Nov 2026",
    duration: "2 Days / 1 Night",
    transport: "Tempo Traveller",
    price: 6499,
    seatsTotal: 12,
    seatsLeft: 12,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Estate homestay, twin/triple sharing",
    food: "Breakfast, dinner and one estate lunch included",
    categories: ["Weekend", "2 Days", "Nature", "Heritage"],
    coverImageLabel: "Coffee estate rows in mist, Coorg",
    gallery: ["Group at the estate lunch table", "Abbey Falls", "Sunset from the homestay verandah"],
    description: [
      "You don't need to ride to earn this one. A Tempo Traveller, a good playlist, and a coffee estate that's been in the same family for three generations.",
      "This trip is built for people who want the destination and the people without needing to plan a single stop themselves.",
    ],
    highlights: [
      "A working coffee estate tour with the family that runs it",
      "Abbey Falls and a Raja's Seat sunset stop",
      "Group dinner that turns into the best part of the trip, every time",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Coorg",
        items: [
          { time: "06:00", label: "Depart Bengaluru" },
          { time: "09:00", label: "Breakfast stop" },
          { time: "13:00", label: "Arrive, estate lunch" },
          { time: "15:30", label: "Coffee estate walk and tasting" },
          { time: "18:00", label: "Raja's Seat sunset" },
          { time: "20:00", label: "Group dinner at the homestay" },
        ],
      },
      {
        day: 2,
        title: "Abbey Falls and return",
        items: [
          { time: "08:00", label: "Breakfast" },
          { time: "09:30", label: "Abbey Falls" },
          { time: "12:00", label: "Depart for Bengaluru" },
          { time: "14:00", label: "Lunch stop (on your own)" },
          { time: "19:00", label: "Arrive Bengaluru" },
        ],
      },
    ],
    inclusions: ["Tempo Traveller transport both ways", "1 night stay, twin/triple sharing", "Breakfast (both days), Day 1 lunch and dinner", "Estate tour and tasting"],
    exclusions: ["Day 2 lunch", "Personal expenses", "Entry fees not part of the listed itinerary"],
    whoFor: ["Non-riders who still want the trip planned end to end", "Friend groups and couples", "First-time group travellers"],
    faqs: [
      { question: "Do I need to ride a bike for this?", answer: "No — this trip uses a Tempo Traveller, no riding required." },
      { question: "Can I come alone?", answer: "Yes, solo travellers are common on our Tempo trips." },
      { question: "What's the group size?", answer: "Capped at 12 for this trip." },
    ],
    isSample: true,
  },
  {
    id: "t4",
    slug: "hampi-heritage-weekend",
    title: "Hampi Heritage Weekend",
    destination: "Hampi, Karnataka",
    startingPoint: "Bengaluru",
    date: "SAMPLE DATE — 21-22 Nov 2026",
    duration: "2 Days / 1 Night",
    transport: "Bus",
    price: 5499,
    seatsTotal: 30,
    seatsLeft: 22,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Budget-comfort guesthouse, twin sharing",
    food: "Breakfast included, other meals on your own at local eateries",
    categories: ["Weekend", "2 Days", "Heritage"],
    coverImageLabel: "Ruins of the Vittala Temple complex, Hampi, golden hour",
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
        day: 1,
        title: "Bengaluru to Hampi (overnight bus)",
        items: [
          { time: "21:00", label: "Board overnight bus from Bengaluru" },
        ],
      },
      {
        day: 2,
        title: "Hampi exploration",
        items: [
          { time: "06:00", label: "Arrive Hampi, freshen up" },
          { time: "08:00", label: "Breakfast" },
          { time: "09:00", label: "Guided heritage walk: Vittala Temple, stone chariot" },
          { time: "13:00", label: "Lunch (on your own)" },
          { time: "15:00", label: "Coracle ride" },
          { time: "18:00", label: "Sunset at Matanga Hill" },
          { time: "21:30", label: "Board return overnight bus" },
        ],
      },
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
    date: "SAMPLE DATE — 12-13 Jan 2027 (Tue-Wed)",
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
    gallery: ["Sunrise trek group at the peak", "Coffee estate breakfast table", "Homestay bonfire evening"],
    description: [
      "The trip for people whose weekends are already spoken for. Same planning, same small group, just on a Tuesday — and Chikmagalur without weekend traffic is a genuinely different, quieter place.",
      "A short peak trek, a coffee estate that isn't overrun, and a bonfire evening that doesn't feel rushed.",
    ],
    highlights: [
      "Mullayanagiri sunrise trek, Karnataka's highest peak",
      "A quiet, uncrowded coffee estate visit",
      "Weekday pricing and zero weekend traffic",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Chikmagalur",
        items: [
          { time: "06:00", label: "Depart Bengaluru" },
          { time: "09:30", label: "Breakfast stop" },
          { time: "13:00", label: "Arrive, check in" },
          { time: "16:00", label: "Coffee estate visit" },
          { time: "20:00", label: "Dinner and bonfire" },
        ],
      },
      {
        day: 2,
        title: "Sunrise trek and return",
        items: [
          { time: "04:30", label: "Depart for Mullayanagiri" },
          { time: "06:00", label: "Sunrise at the peak" },
          { time: "09:00", label: "Breakfast" },
          { time: "11:00", label: "Depart for Bengaluru" },
          { time: "17:00", label: "Arrive Bengaluru" },
        ],
      },
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
];
