import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <img
        src={logo}
        alt="Buddiez Holidays — Your Journey, Our Comfort"
        className="h-10 w-auto md:h-12 transition-transform group-hover:scale-105"
        width={120}
        height={60}
      />
      <span className="sr-only">Buddiez Holidays</span>
      {variant === "light" && <span className="hidden" />}
    </Link>
  );
}