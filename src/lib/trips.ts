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
  | "Long Weekend";

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
  date: string; // display string — a real fixed date once you have one (e.g. "18-19 Oct 2026"), or "Next batch — ask on WhatsApp" until then
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
  coverImage?: string; // real photo path (public/), once available — falls back to the placeholder when unset
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
    date: "Next batch — ask on WhatsApp",
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
    date: "Next batch — ask on WhatsApp",
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
    coverImage: "/photos/coorg-misty-hills.jpg",
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
    date: "Next batch — ask on WhatsApp",
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
    coverImage: "/photos/hampi-vittala-temple.jpg",
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
  {
    id: "t6",
    slug: "munnar-tea-hills-long-weekend",
    title: "Munnar Tea Hills Long Weekend",
    destination: "Munnar, Kerala",
    startingPoint: "Bengaluru (Tempo Traveller pickup points shared after booking)",
    date: "Next batch — ask on WhatsApp",
    duration: "3 Days / 2 Nights",
    transport: "Tempo Traveller",
    price: 9499,
    seatsTotal: 14,
    seatsLeft: 14,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Hillside resort/homestay, twin/triple sharing",
    food: "Breakfast and dinner included (both nights), lunch stops are pay-as-you-go",
    categories: ["Long Weekend", "Nature", "Trek"],
    coverImageLabel: "A waterfall cascading through a Munnar tea estate",
    coverImage: "/photos/munnar-tea-estate-falls.jpg",
    gallery: ["Tea garden walk", "Top Station viewpoint", "Group dinner at the homestay"],
    description: [
      "Endless tea gardens, a road that climbs through the clouds, and the kind of quiet you only get 1,600 metres up. Munnar is the trip for people who want green in every direction and no itinerary to plan themselves.",
      "Three days is enough to actually slow down — a tea estate walk, a viewpoint sunrise, and evenings that don't need an agenda.",
    ],
    highlights: [
      "Tea estate walk with a working plantation guide",
      "Top Station — the highest viewpoint on the Munnar-Kodaikanal road",
      "Two full days in the hills, not just a drive-through",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Munnar",
        items: [
          { time: "06:00", label: "Depart Bengaluru" },
          { time: "09:30", label: "Breakfast stop" },
          { time: "17:00", label: "Arrive Munnar, check in" },
          { time: "20:00", label: "Group dinner at the homestay" },
        ],
      },
      {
        day: 2,
        title: "Tea gardens and Top Station",
        items: [
          { time: "07:00", label: "Breakfast" },
          { time: "08:30", label: "Tea estate walk and factory visit" },
          { time: "12:00", label: "Lunch (on your own)" },
          { time: "14:00", label: "Top Station viewpoint" },
          { time: "17:00", label: "Free evening in town" },
          { time: "20:00", label: "Dinner at the homestay" },
        ],
      },
      {
        day: 3,
        title: "Munnar to Bengaluru",
        items: [
          { time: "07:00", label: "Breakfast" },
          { time: "08:30", label: "Depart for Bengaluru" },
          { time: "13:00", label: "Lunch stop (on your own)" },
          { time: "20:00", label: "Arrive Bengaluru, trip ends" },
        ],
      },
    ],
    inclusions: [
      "Tempo Traveller transport both ways",
      "2 nights hillside stay, twin/triple sharing",
      "Breakfast and dinner (both nights)",
      "Tea estate walk and Top Station visit",
      "Trip WhatsApp group with live updates",
    ],
    exclusions: [
      "Lunch on all days",
      "Entry fees not part of the listed itinerary",
      "Personal expenses and shopping",
      "Anything not explicitly listed above",
    ],
    whoFor: [
      "Anyone who wants a proper long weekend out of the city without planning it",
      "Non-riders who still want the destination and the group",
      "Couples and friend groups after a slower-paced trip",
    ],
    faqs: [
      { question: "Do I need to ride a bike for this?", answer: "No — this trip uses a Tempo Traveller, no riding required." },
      { question: "How far is Munnar from Bengaluru?", answer: "Around 470 km — this is why it's a 3-day trip rather than a standard weekend." },
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
    date: "Next batch — ask on WhatsApp",
    duration: "3 Days / 2 Nights",
    transport: "Tempo Traveller",
    price: 10999,
    seatsTotal: 12,
    seatsLeft: 12,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Fort Kochi heritage stay (Night 1) + houseboat on the Alleppey backwaters (Night 2)",
    food: "All meals included on the houseboat, breakfast included in Kochi",
    categories: ["Long Weekend", "Coastal", "Heritage"],
    coverImageLabel: "Houseboats moored along a tree-shaded Alleppey backwater canal",
    coverImage: "/photos/kochi-alleppey-backwaters-canal.jpg",
    gallery: ["Fort Kochi street art walk", "Houseboat deck at sunset", "Chinese fishing nets at dusk"],
    description: [
      "Two very different sides of Kerala in one trip — the old-world streets and cafés of Fort Kochi, then a night on a houseboat drifting through the Alleppey backwaters with nothing to do but watch the coconut palms go by.",
      "This is the trip we send people on when they want a proper switch-off, not another checklist of monuments.",
    ],
    highlights: [
      "A full night on a private houseboat, meals included",
      "Fort Kochi heritage walk — Chinese fishing nets, street art, old churches",
      "Backwater village stops most day-trippers never see",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Kochi",
        items: [
          { time: "06:00", label: "Depart Bengaluru" },
          { time: "09:30", label: "Breakfast stop" },
          { time: "16:00", label: "Arrive Fort Kochi, check in" },
          { time: "17:30", label: "Fort Kochi heritage walk" },
          { time: "19:00", label: "Chinese fishing nets at sunset" },
        ],
      },
      {
        day: 2,
        title: "Kochi to Alleppey, board the houseboat",
        items: [
          { time: "08:00", label: "Breakfast, check out" },
          { time: "10:00", label: "Depart for Alleppey" },
          { time: "12:00", label: "Board the houseboat, welcome lunch" },
          { time: "14:00", label: "Backwater cruise through village stretches" },
          { time: "19:00", label: "Dinner on the houseboat, overnight on the water" },
        ],
      },
      {
        day: 3,
        title: "Alleppey to Bengaluru",
        items: [
          { time: "07:00", label: "Breakfast on the houseboat" },
          { time: "09:00", label: "Disembark, depart for Bengaluru" },
          { time: "13:00", label: "Lunch stop (on your own)" },
          { time: "21:00", label: "Arrive Bengaluru, trip ends" },
        ],
      },
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
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night",
    transport: "Bus",
    price: 5999,
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
        day: 1,
        title: "Bengaluru to Pondicherry (overnight bus)",
        items: [
          { time: "22:00", label: "Board overnight bus from Bengaluru" },
        ],
      },
      {
        day: 2,
        title: "Pondicherry exploration",
        items: [
          { time: "06:00", label: "Arrive Pondicherry, freshen up" },
          { time: "07:00", label: "Sunrise at Promenade Beach" },
          { time: "08:30", label: "Breakfast" },
          { time: "10:00", label: "French Quarter heritage walk" },
          { time: "13:00", label: "Lunch (on your own)" },
          { time: "15:00", label: "Auroville viewpoint" },
          { time: "21:00", label: "Board return overnight bus" },
        ],
      },
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
    date: "Next batch — ask on WhatsApp",
    duration: "2 Days / 1 Night",
    transport: "Bus",
    price: 6999,
    seatsTotal: 25,
    seatsLeft: 25,
    bookingStatus: "open",
    difficulty: "Easy",
    stay: "Budget-comfort guesthouse near the temple, twin sharing (day-use, to freshen up between the overnight buses)",
    food: "Breakfast included, other meals on your own at local eateries",
    categories: ["Weekend", "2 Days", "Heritage", "Coastal"],
    coverImageLabel: "Pamban Bridge stretching out to sea toward Rameshwaram island",
    gallery: [
      "Ramanathaswamy Temple's corridor at golden hour",
      "The ghost-town coastline at Dhanushkodi",
      "Sunrise over Agni Theertham beach",
    ],
    description: [
      "This is the farthest we send anyone, and the most unusual place on the Tripshala map — an island temple town where the Bay of Bengal and the Indian Ocean meet at the literal tip of India, and a coastline that still shows what a cyclone did to it in 1964.",
      "Two overnight buses bracket a single, full day on the ground: the 22-pillared corridor of the Ramanathaswamy Temple, the crossing over Pamban Bridge, and Dhanushkodi's abandoned shoreline — sand, ruins and sea in every direction, with almost nothing else built on it.",
    ],
    highlights: [
      "Ramanathaswamy Temple — the longest temple corridor in India, and the ritual bath across its 22 sacred wells",
      "Dhanushkodi's ghost-town coastline, abandoned after the 1964 cyclone and reachable only by van across the sand",
      "Crossing Pamban Bridge, India's first sea bridge linking the mainland to Rameshwaram island",
      "Arichal Munai, the sandy tip where the Bay of Bengal visibly meets the Indian Ocean",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Rameshwaram (overnight bus)",
        items: [
          { time: "19:30", label: "Board overnight bus from Bengaluru" },
        ],
      },
      {
        day: 2,
        title: "Rameshwaram & Dhanushkodi",
        items: [
          { time: "06:30", label: "Arrive Rameshwaram, freshen up at the guesthouse" },
          { time: "08:00", label: "Breakfast" },
          { time: "09:00", label: "Ramanathaswamy Temple darshan (22 wells ritual bath optional — carry a spare set of dry clothes)" },
          { time: "11:30", label: "Pamban Bridge photo stop" },
          { time: "12:30", label: "Depart for Dhanushkodi by local van (the final stretch is sand-only, no private vehicles)" },
          { time: "13:30", label: "Dhanushkodi ghost town and Arichal Munai" },
          { time: "16:30", label: "Agni Theertham beach, free time" },
          { time: "19:00", label: "Dinner on your own, then head to the bus point" },
          { time: "21:00", label: "Board return overnight bus" },
        ],
      },
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
];
