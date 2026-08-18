/**
 * Single source of truth for all event facts, contact details and CTA
 * destinations. Every component must import from here rather than
 * hardcoding dates, venue names or contact details.
 */

export const event = {
  name: "Tanzania Buildcon International Expo 2027",
  shortName: "Tanzania Buildcon",
  brandWord: "Buildcon",
  descriptor: "International B2B Trade Exhibition for Building & Construction",
  edition: "2027",

  dates: {
    start: "2027-08-25",
    end: "2027-08-27",
    display: "25–27 August 2027",
    displayShort: "25–27 AUG 2027",
    // Opening time not supplied by organiser yet — editable placeholder.
    // Countdown targets 09:00 local time on the opening day until confirmed.
    openingTimeConfirmed: false,
    countdownTargetIso: "2027-08-25T09:00:00+03:00", // Africa/Dar_es_Salaam (EAT, UTC+3)
    timezone: "Africa/Dar_es_Salaam",
  },

  venue: {
    name: "Diamond Jubilee Hall",
    city: "Dar es Salaam",
    country: "Tanzania",
    fullLocation: "Diamond Jubilee Hall, Dar es Salaam, Tanzania",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Diamond+Jubilee+Hall+Dar+es+Salaam+Tanzania&output=embed",
    mapLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Diamond+Jubilee+Hall+Dar+es+Salaam+Tanzania",
  },

  format: "B2B Trade Exhibition",
  industry: "Building & Construction",
  website: "https://tanzaniabuildcon.com",
  websiteDisplay: "www.tanzaniabuildcon.com",

  brandLines: {
    main: "CONNECT. SOURCE. BUILD BUSINESS.",
    supporting: "Where the Building & Construction Industry Meets.",
    exhibitor: "Take Your Business to the Tanzanian Construction Market.",
    visitor: "Source Products. Meet Suppliers. Develop Business.",
  },

  organisers: [
    {
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      logo: "/logos/futurex-logo.png",
      url: "",
    },
    {
      name: "Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL)",
      logo: "/logos/etsipl-logo.png",
      url: "",
    },
  ],

  contact: {
    exhibitorEnquiries: {
      label: "Exhibition Enquiries",
      email: process.env.NEXT_PUBLIC_CONTACT_EXHIBITOR_EMAIL || "[TO BE PROVIDED]",
      phone: process.env.NEXT_PUBLIC_CONTACT_EXHIBITOR_PHONE || "[TO BE PROVIDED]",
    },
    internationalParticipation: {
      label: "International Participation",
      email: process.env.NEXT_PUBLIC_CONTACT_INTERNATIONAL_EMAIL || "[TO BE PROVIDED]",
      phone: process.env.NEXT_PUBLIC_CONTACT_INTERNATIONAL_PHONE || "[TO BE PROVIDED]",
    },
    visitorEnquiries: {
      label: "Visitor Enquiries",
      email: process.env.NEXT_PUBLIC_CONTACT_VISITOR_EMAIL || "[TO BE PROVIDED]",
      phone: process.env.NEXT_PUBLIC_CONTACT_VISITOR_PHONE || "[TO BE PROVIDED]",
    },
    general: {
      label: "General Enquiries",
      email: process.env.NEXT_PUBLIC_CONTACT_GENERAL_EMAIL || "[TO BE PROVIDED]",
      phone: process.env.NEXT_PUBLIC_CONTACT_GENERAL_PHONE || "[TO BE PROVIDED]",
    },
  },

  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },

  cta: {
    bookStand: "/book-a-stand",
    registerVisit: "/register-to-visit",
  },

  exhibitorDirectoryMinimum: 6,
} as const;

export type EventConfig = typeof event;
