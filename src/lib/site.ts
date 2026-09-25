// Central site configuration.
// Update WHATSAPP_NUMBER and social links before launch — see DEPLOYMENT.md.

export const site = {
  name: "Tripshala",
  tagline: "The trip's planned. You just have to show up.",
  brandLine: "More than a trip. A tribe.", // the line under the logo
  description:
    "Bengaluru's curated weekend travel and adventure community — bike rides, weekend getaways and 1-2 day escapes, planned for you.",
  // Used for the homepage <meta description> and structured data — names the
  // brand, the city and the kinds of trips so the brand search is unambiguous.
  seoDescription:
    "Tripshala (tripshala.in) runs weekend group trips from Bengaluru — Coorg, Chikmagalur, Gokarna, Ooty, Kerala, sunrise treks and temple trails. Every weekend, with pickups from RMZ Ecospace, Silk Board and Electronic City.",
  alternateNames: ["Tripshala.in", "Trip Shala", "Tripshala Bengaluru"],
  url: "https://tripshala.in",
  city: "Bengaluru",
  instagramHandle: "tripshala.in",
  instagramUrl: "https://www.instagram.com/tripshala.in/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61593246027569",
  // The WhatsApp *group* invite link (join the community chat) — distinct
  // from whatsappNumber, which is used for 1:1 enquiry/booking messages via
  // wa.me links (see src/lib/whatsapp.ts).
  whatsappCommunityLink: "https://chat.whatsapp.com/LtydU1xQ2BOKQsFvvDf6gG?s=sh&p=i&mlu=4&amv=2",
  whatsappNumber: "916361348289",
  // TODO(Mayank): replace with a real support/contact email.
  contactEmail: "hello@tripshala.in",
};

export const NAV_LINKS = [
  { href: "/trips", label: "Trips" },
  { href: "/corporate-school-trips", label: "For Groups" },
  { href: "/guides", label: "Guides" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];
