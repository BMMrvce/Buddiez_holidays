/**
 * Central SEO configuration and helpers for Buddiez Holidays.
 *
 * Update SITE.url to the live production domain. It can also be overridden
 * with the VITE_SITE_URL environment variable without touching code.
 */

const ENV_SITE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SITE_URL) || "";

export const SITE = {
  // TODO: set this to your real production domain (with https, no trailing slash).
  url: (ENV_SITE_URL || "https://www.buddiezholidays.com").replace(/\/$/, ""),
  name: "Buddiez Holidays",
  legalName: "Buddiez Holidays",
  slogan: "Your Journey, Our Comfort",
  // A short, brandable description used as a fallback.
  description:
    "Buddiez Holidays offers tempo traveller, bus and cab rentals plus customized tour packages in Bangalore for family trips, group tours, weddings and outstation travel across South India.",
  phone: "+917204963703",
  phoneDisplay: "+91 72049 63703",
  email: "buddiezholidaysbengaluru@gmail.com",
  address: {
    street: "#41B, 1st Main Rd, Vinayaka Nagara, Vijayanagar",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560040",
    country: "IN",
  },
  geo: { lat: 12.9719, lng: 77.5371 },
  // Default social/OG image. For best link previews, add a real 1200x630 image
  // at public/og-image.jpg and change this to "/og-image.jpg".
  ogImage: "/favicon.png",
  logo: "/favicon.png",
  social: {
    instagram: "https://instagram.com/buddiez_holidays",
  },
  locale: "en_IN",
} as const;

/** High-intent target keywords for the brand and Bangalore travel market. */
export const SITE_KEYWORDS: string[] = [
  "Buddiez Holidays",
  "tempo traveller rental Bangalore",
  "tempo traveller hire Bangalore",
  "12 seater tempo traveller Bangalore",
  "17 seater tempo traveller Bangalore",
  "bus rental Bangalore",
  "mini bus on rent Bangalore",
  "21 seater bus rental Bangalore",
  "outstation cabs Bangalore",
  "Innova rental Bangalore",
  "Innova Crysta on rent Bangalore",
  "Swift Dzire cab Bangalore",
  "Force Urbania hire Bangalore",
  "tour packages from Bangalore",
  "holiday packages Bangalore",
  "group travel Bangalore",
  "wedding transport Bangalore",
  "corporate travel Bangalore",
  "pilgrimage tours from Bangalore",
  "South India tour packages",
];

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;
};

export interface SeoInput {
  title: string;
  description: string;
  path?: string;
  /** Page-specific keywords appended to the global list. */
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "product" | "profile";
  /** Set true to discourage indexing (e.g. thin/utility pages). */
  noindex?: boolean;
}

type MetaTag = Record<string, string>;

/**
 * Build a complete TanStack Router `head()` `meta` + `links` payload with
 * canonical URL, Open Graph and Twitter card tags.
 */
export function seoHead(input: SeoInput): { meta: MetaTag[]; links: { rel: string; href: string }[] } {
  const url = absoluteUrl(input.path ?? "/");
  const image = absoluteUrl(input.image ?? SITE.ogImage);
  const keywords = Array.from(new Set([...(input.keywords ?? []), ...SITE_KEYWORDS])).join(", ");

  const meta: MetaTag[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { name: "keywords", content: keywords },
    {
      name: "robots",
      content: input.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1",
    },
    // Open Graph
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: SITE.locale },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

/** Organization / LocalBusiness (TravelAgency) structured data. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    slogan: SITE.slogan,
    description: SITE.description,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹",
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "State", name: "Karnataka" },
      { "@type": "Country", name: "India" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [SITE.social.instagram],
  };
}

/** WebSite schema enabling sitelinks search box eligibility. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-IN",
  };
}

/** BreadcrumbList structured data. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage structured data. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Serialize a JSON-LD object for a TanStack `scripts` head entry. */
export function jsonLdScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
