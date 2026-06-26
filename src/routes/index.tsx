import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { FleetSection } from "@/components/site/FleetSection";
import { GallerySection } from "@/components/site/GallerySection";
import { BookingSection } from "@/components/site/BookingSection";
import { AboutSection } from "@/components/site/AboutSection";
import { ContactSection } from "@/components/site/ContactSection";
import { FaqSection } from "@/components/site/FaqSection";
import { seoHead, organizationSchema, websiteSchema, faqSchema, jsonLdScript } from "@/lib/seo";
import { homeFaqs } from "@/lib/faqs";

const homeSeo = seoHead({
  title: "Buddiez Holidays | Tempo Traveller, Bus & Cab Rental in Bangalore",
  description:
    "Buddiez Holidays offers tempo traveller, bus and cab rental in Bangalore for family trips, group tours, weddings and outstation travel. Book 12–17 seater tempo travellers, 21–50 seater buses, Innova, Crysta and Swift Dzire for tour packages across South India.",
  path: "/",
  type: "website",
  keywords: [
    "tempo traveller rental Bangalore",
    "bus rental Bangalore",
    "outstation cabs Bangalore",
    "tour packages from Bangalore",
  ],
});

export const Route = createFileRoute("/")({
  head: () => ({
    ...homeSeo,
    scripts: [
      jsonLdScript(organizationSchema()),
      jsonLdScript(websiteSchema()),
      jsonLdScript(faqSchema(homeFaqs)),
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <FleetSection />
        <GallerySection />
        <BookingSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
