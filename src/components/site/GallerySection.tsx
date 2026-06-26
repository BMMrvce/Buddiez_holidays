import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGalleryImages } from "@/hooks/use-gallery-images";
import { SectionHeading } from "@/components/site/SectionHeading";

export function GallerySection() {
  const { images: galleryImages } = useGalleryImages();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const startX = useRef<number | null>(null);
  const hasImages = galleryImages.length > 0;

  // Keep the active index valid if the image set changes (live updates)
  useEffect(() => {
    setActive((i) => (galleryImages.length ? Math.min(i, galleryImages.length - 1) : 0));
  }, [galleryImages.length]);

  useEffect(() => {
    if (paused || lightbox !== null || !hasImages) return;
    const t = setInterval(() => setActive((i) => (i + 1) % galleryImages.length), 4500);
    return () => clearInterval(t);
  }, [paused, lightbox, hasImages, galleryImages.length]);

  const go = (dir: number) => {
    if (!hasImages) return;
    setActive((i) => (i + dir + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          eyebrow="Moments"
          title={
            <>
              A glimpse of the <span className="italic text-primary">journeys</span>
            </>
          }
          description="Real trips, real smiles. A peek at the destinations and rides our travellers love."
          className="mb-12"
        />

        {!hasImages ? (
          <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white/70 p-10 text-center shadow-card backdrop-blur-sm">
            <div className="mx-auto max-w-2xl">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold mb-3">
                Moments
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-primary-deep text-balance">
                Add photos to <span className="italic text-primary">show this gallery</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Drop image files into <span className="font-semibold">src/assets/gallery/</span> and this gallery will populate automatically.
              </p>
            </div>
          </div>
        ) : (
        <div
          className="relative h-[340px] md:h-[480px] flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (startX.current == null) return;
            const dx = e.changedTouches[0].clientX - startX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            startX.current = null;
          }}
        >
          {galleryImages.map((img, i) => {
            const offset = i - active;
            const total = galleryImages.length;
            const wrapped = ((offset + total / 2) % total + total) % total - total / 2;
            const abs = Math.abs(wrapped);
            if (abs > 2) return null;
            const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.6;
            const translate = wrapped * 220;
            const z = 10 - abs;
            const opacity = abs === 0 ? 1 : abs === 1 ? 0.75 : 0.4;
            return (
              <button
                key={i}
                onClick={() => (abs === 0 ? setLightbox(i) : setActive(i))}
                className="absolute transition-all duration-700 ease-out rounded-2xl overflow-hidden shadow-card focus:outline-none focus:ring-4 focus:ring-gold/40"
                style={{
                  transform: `translateX(${translate}px) scale(${scale})`,
                  zIndex: z,
                  opacity,
                  width: "min(80vw, 560px)",
                  height: "min(50vw, 380px)",
                }}
                aria-label={abs === 0 ? "Open image" : "Bring to front"}
              >
                <img src={img} alt={`Buddiez Holidays travel and tour moments in Bangalore — photo ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </button>
            );
          })}

          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full glass text-primary-deep hover:bg-gold hover:text-primary-deep flex items-center justify-center transition opacity-70 hover:opacity-100"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full glass text-primary-deep hover:bg-gold hover:text-primary-deep flex items-center justify-center transition opacity-70 hover:opacity-100"
          >
            <ChevronRight />
          </button>
        </div>
        )}

        <div className="mt-8 flex justify-center gap-1.5">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-1.5 bg-muted"}`}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {lightbox !== null && hasImages && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-primary-deep/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 h-11 w-11 rounded-full glass-dark text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X />
          </button>
          <img
            src={galleryImages[lightbox]}
            alt={`Buddiez Holidays travel gallery — photo ${lightbox + 1}`}
            className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}