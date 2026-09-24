import type { Trip } from "./trips";

// Builds a sensible packing checklist from what a trip actually involves:
// its categories, transport, and the words in its itinerary. Grouped so the
// list reads like a checklist, not a wall.

export interface PackingGroup {
  title: string;
  items: string[];
}

export function packingListFor(trip: Trip): PackingGroup[] {
  const text = [
    trip.title,
    trip.destination,
    trip.stay,
    ...trip.highlights,
    ...trip.itinerary.flatMap((d) => d.items.map((i) => `${i.label} ${i.detail ?? ""}`)),
  ]
    .join(" ")
    .toLowerCase();
  const has = (re: RegExp) => re.test(text);
  const cats = new Set(trip.categories);
  const isDay = cats.has("One Day");
  const overnightTravel = trip.itinerary[0]?.items[0] && Number(trip.itinerary[0].items[0].time.slice(0, 2)) >= 18;

  const essentials = [
    "Government photo ID (original)",
    "Phone, charger and a power bank",
    "Refillable water bottle",
    "Cash and UPI for pay-on-your-own meals",
    "Personal medicines",
  ];

  const clothing: string[] = [];
  if (!isDay) clothing.push("Clothes for each day, plus one spare set");
  if (has(/trek|hike|climb|summit|peak|trail|steps/)) clothing.push("Trek shoes with good grip");
  else clothing.push("Comfortable walking shoes");
  if (has(/temple|darshan|shrine|mutt|peetham|church|mosque|monastery/))
    clothing.push("Modest clothes that cover shoulders and knees", "Footwear that slips off easily");
  if (has(/sunrise|dawn|night|hills|peak|munnar|ooty|kodai|valparai|vagamon|coorg|wayanad|chikmagalur|mist|fog/))
    clothing.push("A warm layer for early mornings and nights");
  if (has(/rain|monsoon|waterfall|falls|mist/)) clothing.push("A light rain jacket or poncho");
  if (cats.has("Coastal") || has(/beach|swim|coracle|kayak|boat|rafting|dip|pool/))
    clothing.push("Quick-dry clothes and a change for water activities");

  const gear: string[] = [];
  if (overnightTravel) gear.push("Neck pillow and a light shawl for the overnight drive");
  if (has(/sunrise|night|torch|dawn|pre-dawn|bonfire/)) gear.push("A small torch or headlamp");
  if (cats.has("Coastal") || has(/beach|sun|exposed|heritage|ruins|hampi/)) gear.push("Sunscreen, cap and sunglasses");
  if (has(/forest|safari|wildlife|jungle|estate|plantation/)) gear.push("Insect repellent", "Earthy, muted colours for forest areas");
  if (trip.transport === "Bike" || cats.has("Bike Rides"))
    gear.push("Riding jacket, gloves and a full-face helmet", "Your licence, RC and insurance papers");
  if (has(/motion|ghat|hairpin|winding/)) gear.push("Motion-sickness tablets if you need them");
  gear.push("A small day bag for sightseeing");

  const groups: PackingGroup[] = [
    { title: "Essentials", items: essentials },
    { title: "Clothing & footwear", items: dedupe(clothing) },
    { title: "Good to have", items: dedupe(gear) },
  ];
  return groups.filter((g) => g.items.length > 0);
}

function dedupe(list: string[]) {
  return [...new Set(list)];
}
