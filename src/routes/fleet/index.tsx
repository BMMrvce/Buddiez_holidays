import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Phone, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FleetCard } from "@/components/site/FleetCard";
import { Button } from "@/components/ui/button";
import { fleet } from "@/lib/fleet";
import { seoHead, breadcrumbSchema, absoluteUrl, jsonLdScript } from "@/lib/seo";

const fleetSeo = seoHead({
  title: "Our Fleet — Tempo Traveller, Bus, Innova & Cab Rental in Bangalore",
  description:
    "Browse the Buddiez Holidays fleet: Swift Dzire, Toyota Innova and Innova Crysta cabs, 12–17 seater tempo travellers, Force Urbania and 21–50 seater buses on rent in Bangalore for outstation, group and event travel.",
  path: "/fleet",
  keywords: [
    "tempo traveller hire Bangalore",
    "bus rental Bangalore",
    "Innova Crysta on rent Bangalore",
    "Force Urbania hire Bangalore",
  ],
});

const fleetItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Buddiez Holidays Fleet",
  itemListElement: fleet.map((vehicle, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: vehicle.name,
    url: absoluteUrl(`/fleet/${vehicle.slug}`),
  })),
};

export const Route = createFileRoute("/fleet/")({
  head: () => ({
    ...fleetSeo,
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Fleet", path: "/fleet" },
        ]),
      ),
      jsonLdScript(fleetItemListSchema),
    ],
  }),
  component: FleetIndexPage,
});

const trustPoints = [
  { icon: ShieldCheck, title: "Safety first", text: "GPS tracking, seat belts and verified, experienced drivers on every trip." },
  { icon: Sparkles, title: "Clean & serviced", text: "Each vehicle is sanitized, inspected and detailed before it reaches you." },
  { icon: Wallet, title: "Transparent pricing", text: "Clear per-km rates with tolls and driver bata shared upfront, no surprises." },
];

function FleetIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative overflow-hidden pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-70" />
        <div className="pointer-events-none absolute -left-36 top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-36 bottom-20 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />

        {/* Hero */}
        <section className="container relative mx-auto px-4 py-10 md:py-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-7 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
              Our Fleet
            </span>
            <h1 className="mt-4 text-balance font-display text-4xl leading-[1.08] text-primary-deep md:text-6xl">
              Tempo traveller, bus &amp; cab rental in <span className="italic text-primary">Bangalore</span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Whether it's a quick airport run or a multi-day group tour across South India, our well-maintained fleet of tempo travellers, buses, Innova and Crysta cabs keeps everyone together in comfort. Pick a vehicle to see full specs, seating options and per-km pricing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="shine rounded-full bg-gradient-gold px-8 font-semibold text-primary-deep shadow-gold transition-transform hover:-translate-y-0.5"
              >
                <a href="/#booking">Book a Vehicle</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary/25 bg-white/70 px-8 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href="tel:+917204963703">
                  <Phone className="mr-1 h-4 w-4" /> Call to Enquire
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Trust strip */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="hover-lift group flex items-start gap-3 rounded-2xl border border-primary/10 bg-white/75 p-5 shadow-soft backdrop-blur-sm"
              >
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <point.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-primary-deep">{point.title}</div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{point.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Fleet grid */}
        <section className="container relative mx-auto px-4 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {fleet.map((vehicle) => (
              <FleetCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </motion.div>
        </section>

        {/* CTA band */}
        <section className="container relative mx-auto px-4 pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary-deep via-primary to-primary-deep p-8 text-white shadow-elevated md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-display text-3xl md:text-4xl">Not sure which vehicle fits your group?</h2>
                <p className="mt-3 max-w-xl text-white/85">
                  Tell us your headcount, luggage and route and we'll recommend the best fit at the best price. Multi-day trips and multiple pickups are welcome.
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> 24/7 availability</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Experienced drivers</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Instant confirmation</li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="shine rounded-full border-0 bg-gradient-gold font-semibold text-primary-deep hover:shadow-glow">
                  <a href="/#booking">Get a Quote</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white hover:text-primary-deep">
                  <a href="tel:+917204963703">
                    <Phone className="mr-1 h-4 w-4" /> +91 72049 63703
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
