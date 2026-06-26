import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { bookingVehicleOptions } from "@/lib/fleet";
import { bookingSchema } from "@/lib/bookings/schema";
import { submitBooking } from "@/lib/api/booking.functions";

export function BookingSection() {
  const [loading, setLoading] = useState(false);
  const [travelFrom, setTravelFrom] = useState("");
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  function extractSubmitErrorMessage(error: unknown) {
    if (error && typeof error === "object") {
      const maybe = error as {
        message?: string;
        data?: { message?: string };
        cause?: { message?: string };
      };
      return maybe.data?.message || maybe.cause?.message || maybe.message;
    }
    return undefined;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setLoading(true);
    try {
      const result = await submitBooking({ data: parsed.data });
      if (!result.ok) {
        toast.error(result.message || "Couldn't send your enquiry. Please try again.");
        return;
      }

      toast.success(result.message || "Thank you! We'll reach out within 24 hours.");
      (e.target as HTMLFormElement).reset();
      setTravelFrom("");
    } catch (error) {
      console.error("[Booking] submit failed", error);
      toast.error(extractSubmitErrorMessage(error) || "Couldn't send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, white 0px, transparent 2px), radial-gradient(circle at 80% 60%, white 0px, transparent 2px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-md mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Plan your trip
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-balance leading-[1.1]">
              Contact us for your <span className="text-gradient-gold italic">next getaway</span>
            </h2>
            <p className="mt-5 text-white/85 max-w-md leading-relaxed text-sm md:text-base">
              Share a few details and our team will send the best options within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">Fast callback</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">WhatsApp support</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">Custom itineraries</span>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 relative overflow-hidden rounded-[2rem] border border-white/55 bg-white/35 p-5 md:p-7 text-foreground shadow-[0_30px_80px_rgba(8,24,54,0.25)] backdrop-blur-3xl grid md:grid-cols-2 gap-4"
          >
            <div className="pointer-events-none absolute -top-16 right-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
            <div className="md:col-span-2 relative z-10 pb-1 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/80 font-semibold">Quick enquiry form</p>
                <p className="text-sm text-muted-foreground mt-1">Tell us the basics first. Add dates and notes only if needed.</p>
              </div>
              <div className="rounded-full border border-primary/10 bg-white/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-deep shadow-soft">
                Takes about 30 seconds
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input
                id="full_name"
                name="full_name"
                required
                placeholder="Jane Doe"
                autoComplete="name"
                className="h-11 rounded-2xl border-white/60 bg-white/60 shadow-sm backdrop-blur-md focus-visible:ring-primary/60"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                className="h-11 rounded-2xl border-white/60 bg-white/60 shadow-sm backdrop-blur-md focus-visible:ring-primary/60"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                required
                placeholder="+91 99999 99999"
                autoComplete="tel"
                className="h-11 rounded-2xl border-white/60 bg-white/60 shadow-sm backdrop-blur-md focus-visible:ring-primary/60"
              />
            </div>
            <div>
              <Label htmlFor="destination">Vehicle interested in</Label>
              <select
                id="destination"
                name="destination"
                className="flex h-11 w-full rounded-2xl border border-white/60 bg-white/60 px-3 py-2 text-sm shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/60"
                defaultValue=""
              >
                <option value="">Choose a vehicle…</option>
                {bookingVehicleOptions.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
                <option value="Other / Not sure">Other / Not sure</option>
              </select>
            </div>
            <div>
              <Label htmlFor="travelers">No. of travelers</Label>
              <Input
                id="travelers"
                name="travelers"
                type="number"
                min={1}
                max={50}
                defaultValue={2}
                className="h-11 rounded-2xl border-white/60 bg-white/60 shadow-sm backdrop-blur-md focus-visible:ring-primary/60"
              />
            </div>
            <details className="md:col-span-2 group rounded-[1.5rem] border border-white/55 bg-white/35 p-4 shadow-sm backdrop-blur-md">
              <summary className="cursor-pointer list-none text-sm font-semibold text-primary-deep flex items-center justify-between gap-4">
                <span>Add travel dates & notes</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-open:hidden">Optional</span>
              </summary>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="travel_from">Travel from</Label>
                  <Input
                    id="travel_from"
                    name="travel_from"
                    type="date"
                    value={travelFrom}
                    onChange={(e) => setTravelFrom(e.target.value)}
                    min={todayStr}
                    className="h-11 rounded-2xl border-white/60 bg-white/60 shadow-sm backdrop-blur-md focus-visible:ring-primary/60"
                  />
                </div>
                <div>
                  <Label htmlFor="travel_to">Travel to</Label>
                  <Input
                    id="travel_to"
                    name="travel_to"
                    type="date"
                    min={travelFrom || todayStr}
                    className="h-11 rounded-2xl border-white/60 bg-white/60 shadow-sm backdrop-blur-md focus-visible:ring-primary/60"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Additional notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Trip dates, budget, preferences (optional)"
                    className="rounded-2xl border-white/60 bg-white/60 shadow-sm backdrop-blur-md focus-visible:ring-primary/60"
                  />
                </div>
              </div>
            </details>
            <div className="md:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/70 sm:text-muted-foreground">By submitting you agree to be contacted about your enquiry.</p>
              <Button type="submit" disabled={loading} className="h-12 rounded-full bg-primary px-7 shadow-[0_16px_30px_rgba(23,63,116,0.35)] hover:bg-primary-deep">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send enquiry <Send className="ml-2 h-4 w-4" /></>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}