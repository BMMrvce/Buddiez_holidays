import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep ${
          isCenter ? "" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance font-display text-4xl leading-[1.1] text-primary-deep md:text-5xl">
        {title}
      </h2>
      <div className={`mt-4 ${isCenter ? "mx-auto" : ""} divider-gold ${isCenter ? "mx-auto" : ""}`} />
      {description ? (
        <p className={`mt-5 text-pretty leading-relaxed text-muted-foreground ${isCenter ? "" : ""}`}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
