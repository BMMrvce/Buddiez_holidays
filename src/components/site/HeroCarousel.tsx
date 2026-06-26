import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ShieldCheck, Star } from "lucide-react";
import { heroSlides } from "@/lib/media";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: Star, label: "4.9 ★ rated service" },
  { icon: ShieldCheck, label: "Verified drivers" },
  { icon: MapPin, label: "Pan-India routes" },
];

function HeroContent({ caption }: { caption?: { title: string; subtitle: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
      className="max-w-3xl"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        Buddiez Holidays
      </span>
      <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[1.04] text-white md:text-7xl lg:text-[5.5rem]">
        Discover Your<br />
        Next <span className="italic text-gradient-gold">Adventure</span>
      </h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={caption?.title ?? "default"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="mt-6 max-w-xl text-lg text-white/85 md:text-xl"
        >
          {caption ? (
            <>
              <span className="font-semibold text-white">{caption.title}.</span> {caption.subtitle}.
            </>
          ) : (
            "Customized journeys, memorable holidays and seamless travel experiences across India and beyond."
          )}
        </motion.p>
      </AnimatePresence>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button
          asChild
          size="lg"
          className="shine group h-12 rounded-full border-0 bg-gradient-gold px-8 font-semibold text-primary-deep shadow-gold transition-transform hover:-translate-y-0.5"
        >
          <Link to="/fleet">Explore Our Fleet</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 rounded-full border-white/40 bg-white/10 px-8 text-white backdrop-blur transition-colors hover:bg-white hover:text-primary-deep"
        >
          <a href="/#booking">Book Now</a>
        </Button>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 text-sm text-white/80">
            <badge.icon className="h-4 w-4 text-gold" />
            {badge.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const hasSlides = heroSlides.length > 0;
  const slide = hasSlides ? heroSlides[index] : null;

  const go = useCallback(
    (dir: number) => {
      if (!hasSlides) return;
      setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);
    },
    [hasSlides],
  );

  useEffect(() => {
    if (!hasSlides) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go, hasSlides]);

  if (!hasSlides) {
    return (
      <section
        id="home"
        className="relative flex min-h-[640px] w-full items-end overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,230,190,0.95),rgba(17,58,97,0.95)_45%,rgba(5,22,40,1))]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_35%,rgba(245,230,190,0.08)_100%)]" />
        <div className="container relative z-10 mx-auto flex w-full flex-col justify-end px-4 pb-24 md:justify-center md:pb-0">
          <HeroContent />
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {slide ? (
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" width={1920} height={1080} />
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* Layered overlays for depth and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/40 via-primary-deep/30 to-primary-deep/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/70 via-primary-deep/20 to-transparent" />

      <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-28 md:justify-center md:pb-0">
        <HeroContent caption={slide ?? undefined} />
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="glass-dark absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:bg-gold hover:text-primary-deep md:flex"
      >
        <ChevronLeft />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className="glass-dark absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:bg-gold hover:text-primary-deep md:flex"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-10 bg-gold" : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="/#fleet"
        aria-label="Scroll to fleet"
        className="absolute bottom-7 right-6 z-20 hidden flex-col items-center gap-2 text-white/70 transition-colors hover:text-white lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 p-1">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </span>
      </a>
    </section>
  );
}
