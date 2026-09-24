import { site } from "./site";

// All outbound WhatsApp links are built here so the number and message
// wording only ever need to change in one place.

function buildLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}

export const whatsappMessages = {
  general: () =>
    buildLink(
      `Hi Tripshala! I'd like to know more about your upcoming trips.`
    ),
  generalWithName: (name: string) =>
    buildLink(
      `Hi Tripshala! I'm ${name}, and I'd like to know more about your upcoming trips.`
    ),
  tripEnquiry: (tripName: string, date: string) =>
    buildLink(
      `Hi Tripshala! I'm interested in joining ${tripName} on ${date}. Can you share the details?`
    ),
  bookingWithDetails: (params: {
    tripName: string;
    date: string;
    name: string;
    phone: string;
    people: string;
    hasBike: string;
    referralCode?: string;
  }) => {
    const lines = [
      `Hi Tripshala! I'd like to book a spot.`,
      `Trip: ${params.tripName} (${params.date})`,
      `Name: ${params.name}`,
      `Phone: ${params.phone}`,
      `Number of people: ${params.people}`,
      `Bringing own bike: ${params.hasBike}`,
    ];
    if (params.referralCode) lines.push(`Referral code: ${params.referralCode}`);
    return buildLink(lines.join("\n"));
  },
  referral: () =>
    buildLink(
      `Hi Tripshala! I want to refer a friend — can you share how the referral programme works?`
    ),
  partnership: () =>
    buildLink(
      `Hi Tripshala! I'd like to talk about a partnership/collaboration.`
    ),
  groupEnquiry: (params: {
    orgName: string;
    contactName: string;
    phone: string;
    groupType: string;
    groupSize: string;
    activity?: string;
    dates?: string;
    message?: string;
  }) => {
    const lines = [
      `Hi Tripshala! I'd like to enquire about a ${params.groupType} trip.`,
      `Organization: ${params.orgName}`,
      `Contact person: ${params.contactName}`,
      `Phone: ${params.phone}`,
      `Group size: ${params.groupSize}`,
    ];
    if (params.activity) lines.push(`Preferred activity/destination: ${params.activity}`);
    if (params.dates) lines.push(`Preferred dates: ${params.dates}`);
    if (params.message) lines.push(`Message: ${params.message}`);
    return buildLink(lines.join("\n"));
  },
  hiddenGemSuggestion: (params: { name: string; phone: string; place: string }) =>
    buildLink(
      [
        `Hi Tripshala! I want to suggest a place for a future trip.`,
        `Place: ${params.place}`,
        `Name: ${params.name}`,
        `Phone: ${params.phone}`,
      ].join("\n")
    ),
};
