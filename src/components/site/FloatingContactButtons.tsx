import { Instagram, MessageCircle, Phone } from "lucide-react";

const phoneNumber = "+917204963703";

const actions = [
  {
    label: "Call us",
    href: `tel:${phoneNumber}`,
    icon: Phone,
    className: "bg-primary-deep text-white hover:bg-primary",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`,
    icon: MessageCircle,
    className: "bg-[#25d366] text-white hover:bg-[#1fb955]",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/buddiez_holidays",
    icon: Instagram,
    className: "bg-[#e4405f] text-white hover:bg-[#d03452]",
    external: true,
  },
];

export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noreferrer" : undefined}
          aria-label={action.label}
          className={`group inline-flex h-14 items-center justify-center gap-0 overflow-hidden rounded-full shadow-glow transition-all duration-300 hover:-translate-y-1 ${action.className}`}
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center">
            <action.icon className="h-6 w-6" />
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:pr-5 group-hover:opacity-100">
            {action.label}
          </span>
        </a>
      ))}
    </div>
  );
}
