// Seasonal homepage feature — a highlighted band for the next long weekend.
// It shows automatically while any trip has a departure inside `departFrom`
// … `departTo`, and disappears on its own once those departures have passed.
// To run the next one (e.g. Diwali, Christmas), add an entry here and add the
// matching `departures` to the trips in trips.ts.

export interface SeasonalFeature {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  departFrom: string; // YYYY-MM-DD, earliest departure date included
  departTo: string; // YYYY-MM-DD, latest departure date included
}

export const seasonalFeatures: SeasonalFeature[] = [
  {
    id: "gandhi-jayanti-2026",
    eyebrow: "Gandhi Jayanti long weekend · Fri 2 – Sun 4 Oct",
    title: "Three days off. We've planned every one of them.",
    body: "Long-weekend trips leave Thursday night so you wake up somewhere new on the holiday. Weekend trips run Thursday or Friday night, and day trips go on the 2nd and the 4th.",
    departFrom: "2026-10-01",
    departTo: "2026-10-04",
  },
];
