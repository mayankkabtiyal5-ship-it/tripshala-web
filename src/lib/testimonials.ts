// Real traveller testimonials. `featured` ones appear on the homepage; all of
// them appear on /community. Add new ones to the top of the list.
export interface Testimonial {
  quote: string;
  name: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our captain was really good with the group. Very approachable, kept checking if everyone was comfortable and somehow managed to keep the whole group together without making it feel too formal.",
    name: "Shrusti",
    featured: true,
  },
  {
    quote:
      "I was travelling solo, so I was a little hesitant about joining a group. Turned out to be one of the better decisions — met some really nice people and had a great time.",
    name: "Abhilasha",
    featured: true,
  },
  {
    quote:
      "I've done trips where the itinerary looks good on paper but everything feels rushed. This one was much more relaxed and we actually got time to enjoy the places.",
    name: "Chirag",
    featured: true,
  },
  {
    quote:
      "The best part was not having to worry about all the small things. Routes, timings, stay and everything else was already sorted, so we could just enjoy the trip.",
    name: "Alam",
    featured: true,
  },
  {
    quote:
      "Had a really fun time with Tripshala. The whole trip was well planned, from the ride and stay to the little things in between. The group vibe made it even better.",
    name: "Ayush Tomar",
  },
  {
    quote:
      "I honestly didn't expect the trip to be this much fun. Great roads, a really nice group and everything was taken care of without making it feel too organised.",
    name: "Rishabh Singh",
  },
  {
    quote:
      "Went in with a few friends and came back with some great memories. The planning was smooth and the overall vibe of the trip was exactly what a weekend getaway should be.",
    name: "Mohit Kukreti",
  },
  {
    quote:
      "Loved how effortless the whole trip felt. We just had to show up, ride, explore and enjoy - Tripshala took care of the rest.",
    name: "Muskan",
  },
];
