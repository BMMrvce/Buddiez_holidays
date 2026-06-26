import { motion } from "framer-motion";
import { Award, Heart, Plane, Users } from "lucide-react";
import logo from "@/assets/logo.png";

const stats = [
  { icon: Plane, value: "50+", label: "Destinations" },
  { icon: Users, value: "2,500+", label: "Happy travelers" },
  { icon: Award, value: "14+", label: "Years experience" },
  { icon: Heart, value: "98%", label: "Satisfaction" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-surface relative overflow-hidden">
      {/* Floating shapes */}
      <div aria-hidden className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
      <div aria-hidden className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center rounded-[2rem] bg-white p-10 shadow-card">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-mesh opacity-60" />
            <img src={logo} alt="Buddiez Holidays logo" className="relative w-full h-auto" />
            <div className="absolute -top-4 -right-4 h-20 w-20 rotate-12 rounded-2xl bg-gradient-gold shadow-glow animate-float-slow" />
            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-primary shadow-soft" />
          </div>
        </motion.div>

        <div>
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold mb-3">
            About us
          </span>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep shadow-soft">
            Est. 2012 <span className="h-1 w-1 rounded-full bg-gold" /> Trusted travel planning
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep text-balance leading-tight">
            Travel with friends who <span className="italic text-primary">know the way</span>
          </h2>
          <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Since 2012, Buddiez Holidays has been creating memorable travel experiences through carefully planned itineraries,
              personalised service and comfortable transportation solutions.
            </p>
            <p>
              Our mission is to make every journey enjoyable, affordable and stress-free — whether you're chasing snow
              in the Himalayas, sunsets in Goa or backwaters in Kerala. We handle the logistics, you collect the memories.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="hover-lift group rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
              >
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-3xl font-bold text-primary-deep">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}