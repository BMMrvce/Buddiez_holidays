import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { fleet } from "@/lib/fleet";
import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FleetCard } from "@/components/site/FleetCard";
import { SectionHeading } from "@/components/site/SectionHeading";

export function FleetSection() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section id="fleet" className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-70" />
      <div className="pointer-events-none absolute -left-28 top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <SectionHeading
          eyebrow="Our Fleet"
          title="Clean, comfortable rides for every group size"
          description="From budget sedans to luxury tempo travellers and mini buses, every vehicle is serviced, sanitized and driven by an experienced chauffeur."
          className="mb-14"
        />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-6xl">
            <CarouselContent className="-ml-4 py-2">
              {fleet.map((vehicle) => (
                <CarouselItem key={vehicle.slug} className="pl-4 md:basis-1/2 xl:basis-1/3">
                  <div className="h-full">
                    <FleetCard vehicle={vehicle} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 top-[45%] hidden h-11 w-11 border-primary/30 bg-white/80 text-primary shadow-soft backdrop-blur-sm transition-colors hover:bg-primary hover:text-white md:flex" />
            <CarouselNext className="-right-2 top-[45%] hidden h-11 w-11 border-primary/30 bg-white/80 text-primary shadow-soft backdrop-blur-sm transition-colors hover:bg-primary hover:text-white md:flex" />
          </Carousel>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="shine group rounded-full bg-gradient-gold px-8 font-semibold text-primary-deep shadow-gold transition-transform hover:-translate-y-0.5"
          >
            <Link to="/fleet">
              View Full Fleet
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
