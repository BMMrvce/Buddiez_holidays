import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, Check, Gauge, MapPin, Phone, Route as RouteIcon, Users } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BookingSection } from "@/components/site/BookingSection";
import { FleetCard } from "@/components/site/FleetCard";
import { Button } from "@/components/ui/button";
import { fleet, findVehicle, type Vehicle } from "@/lib/fleet";
import { seoHead, absoluteUrl, breadcrumbSchema, jsonLdScript, SITE } from "@/lib/seo";

export const Route = createFileRoute("/fleet/$slug")({
  loader: ({ params }) => {
    const vehicle = findVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    const vehicle = loaderData?.vehicle;
    if (!vehicle) return { meta: [{ title: "Vehicle — Buddiez Holidays" }] };

    const title = `${vehicle.name} on Rent in Bangalore from ₹${vehicle.pricePerKm}/km | Buddiez Holidays`;
    const description = `${vehicle.shortDescription} Book the ${vehicle.name} in Bangalore for outstation, group and event travel with Buddiez Holidays. Call ${SITE.phoneDisplay}.`;

    const seo = seoHead({
      title,
      description,
      path: `/fleet/${vehicle.slug}`,
      type: "product",
      image: vehicle.image,
      keywords: [
        `${vehicle.name} on rent Bangalore`,
        `${vehicle.name} rental Bangalore`,
        `${vehicle.category} rental Bangalore`,
      ],
    });

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: vehicle.name,
      description: vehicle.longDescription,
      category: vehicle.category,
      ...(vehicle.image ? { image: absoluteUrl(vehicle.image) } : {}),
      brand: { "@type": "Brand", name: SITE.name },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: vehicle.pricePerKm,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: vehicle.pricePerKm,
          priceCurrency: "INR",
          unitText: "per km",
        },
        availability: "https://schema.org/InStock",
        url: absoluteUrl(`/fleet/${vehicle.slug}`),
        seller: { "@id": `${SITE.url}/#organization` },
      },
    };

    return {
      ...seo,
      scripts: [
        jsonLdScript(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Fleet", path: "/fleet" },
            { name: vehicle.name, path: `/fleet/${vehicle.slug}` },
          ]),
        ),
        jsonLdScript(productSchema),
      ],
    };
  },
  component: VehiclePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl text-primary-deep">Vehicle not found</h1>
        <Link to="/fleet" className="mt-4 inline-block text-primary underline">
          Back to fleet
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => <div className="flex min-h-screen items-center justify-center">Something went wrong.</div>,
});

function VehiclePage() {
  const { vehicle } = Route.useLoaderData() as { vehicle: Vehicle };
  const related = fleet.filter((v) => v.slug !== vehicle.slug).slice(0, 3);

  const stats = [
    { icon: Users, label: "Seating", value: vehicle.seating },
    { icon: Briefcase, label: "Luggage", value: vehicle.luggage },
    { icon: RouteIcon, label: "Min km / day", value: `${vehicle.minKmPerDay} km` },
    { icon: Gauge, label: "Driver bata", value: vehicle.driverBata },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28">
        {/* Top */}
        <section className="container mx-auto px-4 py-10">
          <Link
            to="/fleet"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to fleet
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
                {vehicle.image ? (
                  <img src={vehicle.image} alt={`${vehicle.name} on rent in Bangalore — Buddiez Holidays`} className="h-full w-full object-cover" width={1200} height={900} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(245,230,190,0.88)_42%,rgba(17,58,97,0.92))] p-8 text-center text-white">
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-white/75">Add a photo</div>
                      <div className="mt-3 font-display text-4xl leading-tight">{vehicle.name}</div>
                      <p className="mt-3 max-w-md text-sm text-white/80">
                        Drop an image named{" "}
                        <span className="font-semibold">src/assets/fleet/{vehicle.slug}.png</span> and it appears
                        automatically.
                      </p>
                    </div>
                  </div>
                )}
                {vehicle.badge ? (
                  <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-gradient-gold px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-deep shadow-glow">
                    {vehicle.badge}
                  </div>
                ) : null}
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="hover-lift rounded-2xl border border-primary/10 bg-white/75 p-4 text-center shadow-soft backdrop-blur-sm"
                  >
                    <stat.icon className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-primary-deep">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <MapPin className="h-3.5 w-3.5" /> {vehicle.category}
              </div>
              <h1 className="font-display text-4xl leading-tight text-primary-deep md:text-5xl">{vehicle.name}</h1>
              <p className="mt-3 text-lg text-foreground/80">{vehicle.tagline}</p>
              <p className="mt-5 leading-relaxed text-foreground/80">{vehicle.longDescription}</p>

              <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <div className="text-xs text-muted-foreground">Starting from</div>
                  <div className="font-display text-4xl font-bold text-primary-deep">
                    ₹{vehicle.pricePerKm}
                    <span className="font-sans text-sm font-normal text-muted-foreground">/km</span>
                  </div>
                </div>
                {vehicle.acPricePerKm ? (
                  <div className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-deep">
                    AC ₹{vehicle.acPricePerKm}/km
                  </div>
                ) : null}
              </div>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 text-gold-deep" /> {feature}
                  </li>
                ))}
              </ul>

              {vehicle.options && vehicle.options.length > 0 ? (
                <div className="mt-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
                    Available seating options
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {vehicle.options.map((option) => (
                      <span
                        key={option}
                        className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary-deep"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="shine rounded-full border-0 bg-gradient-gold px-8 font-semibold text-primary-deep shadow-gold transition-transform hover:-translate-y-0.5"
                >
                  <a href="#booking">Book this vehicle</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary/25 bg-white/70 px-8 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href="tel:+917204963703">
                    <Phone className="mr-1 h-4 w-4" /> Call to book
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Best for */}
        <section className="bg-surface py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">Ideal for</span>
              <h2 className="mt-2 font-display text-3xl text-primary-deep md:text-4xl">When to pick the {vehicle.name}</h2>
            </div>
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
              {vehicle.bestFor.map((use, i) => (
                <motion.div
                  key={use}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-2xl border border-primary/10 bg-white/80 p-6 text-center shadow-soft backdrop-blur-sm"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-gold text-primary-deep shadow-glow">
                    {i + 1}
                  </div>
                  <div className="mt-4 font-display text-xl text-primary-deep">{use}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related vehicles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">Also in our fleet</span>
                <h2 className="mt-2 font-display text-3xl text-primary-deep">Other vehicles you might like</h2>
              </div>
              <Button asChild variant="outline" className="hidden rounded-full border-primary/25 text-primary sm:inline-flex">
                <Link to="/fleet">View all</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((v) => (
                <FleetCard key={v.slug} vehicle={v} />
              ))}
            </div>
          </div>
        </section>

        <BookingSection />
      </main>

      {/* Sticky inquiry */}
      <a
        href="#booking"
        className="fixed inset-x-4 bottom-4 z-40 rounded-full bg-gradient-gold py-3 text-center font-semibold text-primary-deep shadow-glow md:hidden"
      >
        Book {vehicle.name} — from ₹{vehicle.pricePerKm}/km
      </a>

      <Footer />
    </div>
  );
}
