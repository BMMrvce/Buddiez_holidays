import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionHeading";

const cards = [
  {
    icon: MapPin,
    title: "Visit us",
    value: "#41B, 1st Main Rd, Vinayaka nagara, Vijayanagar, Bengaluru – 560040",
    href: "https://maps.google.com/?q=%2341B%2C%201st%20Main%20Rd%2C%20Vinayaka%20nagara%2C%20Vijayanagar%2C%20Bengaluru%20%E2%80%93%20560040",
    external: true,
  },
  {
    icon: Phone,
    title: "Call us",
    value: "+91 72049 63703",
    href: "tel:+917204963703",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with our team",
    href: "https://wa.me/917204963703",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: "buddiezholidaysbengaluru@gmail.com",
    href: "mailto:buddiezholidaysbengaluru@gmail.com",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@buddiez_holidays",
    href: "https://instagram.com/buddiez_holidays",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Say hello — we'd <span className="italic text-primary">love to chat</span>
            </>
          }
          description="Reach out any way you like. Our team typically replies within a few hours."
          className="mb-14"
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group hover-lift glass rounded-2xl border border-border/40 p-6 shadow-soft transition-colors hover:border-primary/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-gold shadow-soft transition-transform group-hover:scale-105">
                <c.icon className="h-5 w-5 text-primary-deep" />
              </div>
              <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
              <div className="text-lg font-semibold text-primary-deep transition-colors group-hover:text-primary">
                {c.value}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}