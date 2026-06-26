import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { fleet } from "@/lib/fleet";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-deep text-white">
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-gold" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

      <div className="container relative mx-auto grid gap-12 px-4 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="mb-4 inline-block rounded-xl bg-white p-3">
            <Logo />
          </div>
          <p className="max-w-md leading-relaxed text-white/80">
            Buddiez Holidays curates memorable journeys across India and beyond — with personal service, comfortable
            transport and handpicked stays.
          </p>
          <p className="mt-4 font-display text-lg italic text-gold">Your Journey, Our Comfort.</p>

          <div className="mt-6 flex gap-3">
            <a
              href="https://wa.me/917204963703"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-gold/50 hover:bg-gold hover:text-primary-deep"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/buddiez_holidays"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-gold/50 hover:bg-gold hover:text-primary-deep"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="tel:+917204963703"
              aria-label="Call"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-gold/50 hover:bg-gold hover:text-primary-deep"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-gold">Explore</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-gold"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-gold">Our Fleet</h4>
          <ul className="space-y-2.5">
            {fleet.slice(0, 5).map((v) => (
              <li key={v.slug}>
                <Link
                  to="/fleet/$slug"
                  params={{ slug: v.slug }}
                  className="group inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-gold"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-gold">Get in touch</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> #41B, 1st Main Rd, Vinayaka nagara, Vijayanagar,
              Bengaluru – 560040
            </li>
            <li>
              <a href="tel:+917204963703" className="flex items-center gap-2 hover:text-gold">
                <Phone className="h-4 w-4 text-gold" /> +91 72049 63703
              </a>
            </li>
            <li>
              <a href="mailto:buddiezholidaysbengaluru@gmail.com" className="flex items-center gap-2 break-all hover:text-gold">
                <Mail className="h-4 w-4 shrink-0 text-gold" /> buddiezholidaysbengaluru@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Buddiez Holidays. All Rights Reserved.</p>
          {/* <p>
            Built by{" "}
            <a href="https://tantravruksha.in" target="_blank" rel="noreferrer" className="text-gold hover:underline">
              Tantravruksha Technologies
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
