import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Home", href: "/" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? "border-border/60 shadow-soft py-2" : "border-border/40 py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-0.5 rounded-full border border-transparent px-1 py-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-gold transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <Button
            asChild
            className="ml-3 rounded-full border-0 bg-gradient-gold font-semibold text-primary-deep shadow-soft transition-shadow hover:shadow-glow"
          >
            <a href="/#booking">Book Now</a>
          </Button>
        </nav>
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="animate-fade-in border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-full border-0 bg-gradient-gold font-semibold text-primary-deep">
              <a href="/#booking" onClick={() => setOpen(false)}>
                Book Now
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
