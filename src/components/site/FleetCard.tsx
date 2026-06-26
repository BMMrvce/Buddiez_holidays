import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/lib/fleet";

interface FleetCardProps {
  vehicle: Vehicle;
}

export function FleetCard({ vehicle }: FleetCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-card backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elevated supports-[backdrop-filter]:bg-white/55">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,oklch(0.46_0.18_255_/_0.10)_0%,oklch(0.79_0.15_85_/_0.10)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="shine relative h-52 overflow-hidden sm:h-56">
          {vehicle.image ? (
            <img
              src={vehicle.image}
              alt={`${vehicle.name} on rent in Bangalore — Buddiez Holidays`}
              loading="lazy"
              width={1200}
              height={800}
              className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(245,230,190,0.9)_42%,rgba(17,58,97,0.9))] p-4 text-white">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/80">Photo coming soon</div>
                <div className="mt-2 font-display text-3xl leading-tight">{vehicle.name}</div>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/45 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

          <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/50 bg-white/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {vehicle.category}
          </div>

          {vehicle.badge ? (
            <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-gradient-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-deep shadow-glow">
              {vehicle.badge}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-2xl leading-tight text-primary-deep transition-colors duration-300 group-hover:text-primary sm:text-[1.7rem]">
            {vehicle.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/75">{vehicle.tagline}</p>

          {vehicle.options && vehicle.options.length > 0 ? (
            <div className="mt-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Available options
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {vehicle.options.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary-deep"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white/70 px-3 py-2 text-sm text-foreground/80">
                <Users className="h-4 w-4 text-primary" /> {vehicle.seating}
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white/70 px-3 py-2 text-sm text-foreground/80">
                <Briefcase className="h-4 w-4 text-primary" /> {vehicle.luggage}
              </div>
            </div>
          )}

          <div className="mt-5 flex items-end justify-between border-t border-border/50 pt-5">
            <div>
              <div className="text-xs text-muted-foreground">Starting at</div>
              <div className="font-display text-3xl font-bold text-primary">
                ₹{vehicle.pricePerKm}
                <span className="ml-1 font-sans text-sm font-normal text-muted-foreground">/ km</span>
              </div>
            </div>
            {vehicle.acPricePerKm ? (
              <div className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-deep">
                AC ₹{vehicle.acPricePerKm}/km
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5 pt-1">
            <Button asChild className="group/btn rounded-full bg-primary px-5 hover:bg-primary-deep">
              <Link to="/fleet/$slug" params={{ slug: vehicle.slug }}>
                View Details
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary/25 bg-white/70 px-5 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a href="/#booking">Book Now</a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
