// Fleet images live in src/assets/fleet and are named "<slug>.png".
// Drop a file named exactly "<slug>.png" (or .jpg/.jpeg/.webp/.avif/.svg) and
// it is wired up automatically, no code change needed.
const fleetImageModules = import.meta.glob("../assets/fleet/*.{jpg,jpeg,png,webp,avif,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const fleetImageBySlug: Record<string, string> = {};
for (const [path, image] of Object.entries(fleetImageModules)) {
  const file = path.split("/").pop() ?? "";
  const slug = file.replace(/\.(jpg|jpeg|png|webp|avif|svg)$/i, "");
  fleetImageBySlug[slug] = image;
}

export type FleetCategory = "Sedan" | "SUV" | "Tempo Traveller" | "Luxury" | "Bus";

export interface Vehicle {
  slug: string;
  name: string;
  category: FleetCategory;
  tagline: string;
  seating: string;
  luggage: string;
  pricePerKm: number;
  acPricePerKm?: number;
  driverBata: string;
  minKmPerDay: number;
  badge?: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  bestFor: string[];
  /** Optional seating variants, e.g. a Bus offered in multiple sizes. */
  options?: string[];
  image?: string;
}

const vehicleData: Omit<Vehicle, "image">[] = [
  {
    slug: "swift-dzire",
    name: "Swift Dzire",
    category: "Sedan",
    tagline: "Compact comfort for city runs and short outstation hops",
    seating: "4 + 1 Seats",
    luggage: "3+ Bags",
    pricePerKm: 12,
    driverBata: "₹400 / day",
    minKmPerDay: 250,
    shortDescription:
      "A fuel-efficient sedan that's perfect for couples and small families heading out on a budget-friendly getaway.",
    longDescription:
      "The Swift Dzire is our go-to choice for airport transfers, city tours and short outstation trips. Smooth on highways, easy on narrow roads and light on the wallet, it keeps small-group travel simple and comfortable.",
    features: ["Chilled AC", "Clean interiors", "Music system", "Experienced driver"],
    bestFor: ["Airport pickups", "City sightseeing", "Couples & solo travel"],
  },
  {
    slug: "toyota-innova",
    name: "Toyota Innova",
    category: "SUV",
    tagline: "The dependable family workhorse for every road",
    seating: "7 + 1 Seats",
    luggage: "5+ Bags",
    pricePerKm: 16,
    driverBata: "₹500 / day",
    minKmPerDay: 250,
    badge: "Most Booked",
    shortDescription:
      "Spacious, reliable and built for long journeys, the Innova is the favourite for family outstation trips.",
    longDescription:
      "With ample legroom, a roomy boot and a ride that stays comfortable hour after hour, the Toyota Innova is the trusted choice for family holidays and group temple circuits across South India.",
    features: ["Dual AC", "Push-back seats", "Large boot space", "USB charging"],
    bestFor: ["Family holidays", "Temple circuits", "Hill-station drives"],
  },
  {
    slug: "innova-crysta",
    name: "Innova Crysta",
    category: "SUV",
    tagline: "Premium SUV comfort with a refined, quiet cabin",
    seating: "7 + 1 Seats",
    luggage: "5+ Bags",
    pricePerKm: 19,
    driverBata: "₹500 / day",
    minKmPerDay: 250,
    badge: "Premium",
    shortDescription:
      "A step up in luxury and silence, ideal for travellers who want extra comfort on long highway journeys.",
    longDescription:
      "The Innova Crysta brings a plush, quiet cabin, captain seats and a smooth automatic ride. It's the right pick when the journey matters as much as the destination, whether it's a corporate trip or a special family occasion.",
    features: ["Dual climate AC", "Captain seats", "Premium interiors", "Extra legroom"],
    bestFor: ["Corporate travel", "Long highway trips", "Comfort-first families"],
  },
  {
    slug: "tempo-traveller",
    name: "Tempo Traveller",
    category: "Tempo Traveller",
    tagline: "Comfortable group travel in 12, 13 and 17 seater options",
    seating: "12 – 17 Seats",
    luggage: "17+ Bags",
    pricePerKm: 18,
    acPricePerKm: 20,
    driverBata: "₹500 / day",
    minKmPerDay: 300,
    badge: "Popular",
    options: ["12 + 1 Seater", "13 + 1 Seater", "17 + 1 Seater"],
    shortDescription:
      "Available in 12+1, 13+1 and 17+1 seater options, the ideal pick for family trips, corporate outings and pilgrimage groups.",
    longDescription:
      "Our Tempo Travellers keep your whole group together in one comfortable cabin. Choose from 12+1, 13+1 and 17+1 seater options to match your group size. With 2x1 push-back seats, dual AC vents, generous boot space and an experienced driver, they stay relaxed across long outstation routes.",
    features: ["Dual AC with vents", "2x1 push-back recliner seats", "Large boot + overhead racks", "USB charging & reading lights"],
    bestFor: ["Family holidays", "Corporate outings", "Pilgrimage groups"],
  },
  {
    slug: "force-urbania",
    name: "Force Urbania",
    category: "Luxury",
    tagline: "Next-gen luxury van with panoramic comfort",
    seating: "16 + 1 Seats",
    luggage: "17+ Bags",
    pricePerKm: 35,
    driverBata: "₹700 / day",
    minKmPerDay: 300,
    badge: "Luxury",
    shortDescription:
      "A premium van with panoramic windows, advanced safety systems and a refined ride for top-tier group travel.",
    longDescription:
      "The Force Urbania is the flagship of our fleet. With recliner seating, panoramic windows, ABS/EBD safety systems and a smooth, modern drive, it delivers a genuinely premium experience for groups that want the best.",
    features: ["Recliner seats", "Panoramic windows", "Advanced safety (ABS/EBD)", "LED TV & USB charging"],
    bestFor: ["Premium group travel", "Destination weddings", "VIP corporate trips"],
  },
  {
    slug: "bus",
    name: "Bus",
    category: "Bus",
    tagline: "Big-group travel from 21 right up to 50 seats",
    seating: "21 – 50 Seats",
    luggage: "50+ Bags",
    pricePerKm: 28,
    acPricePerKm: 32,
    driverBata: "₹800 / day",
    minKmPerDay: 300,
    badge: "Groups & Events",
    options: [
      "21 Seater",
      "25 Seater",
      "29 Seater",
      "33 Seater",
      "35 Seater",
      "40 Seater",
      "50 Seater",
    ],
    shortDescription:
      "Available in 21, 25, 29, 33, 35, 40 and 50 seater options for weddings, corporate events and large tours.",
    longDescription:
      "Our buses come in a full range of sizes, from compact 21-seaters to full-size 50-seater coaches. Whatever the headcount, we have a clean, well-maintained bus with comfortable seating, ample luggage space and an experienced driver to keep your whole group moving together.",
    features: ["AC / Non-AC options", "Push-back seats", "High luggage capacity", "Music system & mic"],
    bestFor: ["Weddings & events", "Corporate offsites", "Large tour groups"],
  },
];

export const fleet: Vehicle[] = vehicleData.map((vehicle) => ({
  ...vehicle,
  image: fleetImageBySlug[vehicle.slug],
}));

export const getFleetImage = (slug: string) => fleetImageBySlug[slug];

export const findVehicle = (slug: string): Vehicle | undefined =>
  fleet.find((vehicle) => vehicle.slug === slug);

/**
 * Flat list of selectable vehicle names for the booking form.
 * Vehicles that offer multiple seating variants (e.g. Bus) are expanded so
 * each option appears individually in the dropdown.
 */
export const bookingVehicleOptions: string[] = fleet.flatMap((vehicle) =>
  vehicle.options && vehicle.options.length > 0
    ? vehicle.options.map((option) => `${vehicle.name} — ${option}`)
    : [vehicle.name],
);
