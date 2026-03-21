import { type ReactNode } from "react";
import { motion } from "motion/react";

interface StepCardProps {
  num: number;
  icon: ReactNode;
  title: string;
  description: string;
  who: "YOU" | "AUTOMATIC" | "OWNER";
  color: string;
  colorLight: string;
  index: number;
}

const whoColors: Record<StepCardProps["who"], { bg: string; text: string }> = {
  YOU: { bg: "var(--primary-light)", text: "var(--primary-dark)" },
  AUTOMATIC: { bg: "var(--info-light)", text: "var(--info)" },
  OWNER: { bg: "var(--verified-light)", text: "#166534" },
};

export function StepCard({
  num,
  icon,
  title,
  description,
  who,
  color,
  colorLight,
  index,
}: StepCardProps) {
  const whoBadge = whoColors[who];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: index * 0.12,
      }}
      className="group flex flex-col items-center rounded-[var(--radius-card)] border bg-white p-6 text-center transition-all duration-300"
      style={{
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
        (e.currentTarget as HTMLElement).style.borderColor = colorLight;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Who badge */}
      <span
        className="mb-3 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.04em]"
        style={{ background: whoBadge.bg, color: whoBadge.text }}
      >
        {who}
      </span>

      {/* Number + Icon combined */}
      <div className="relative mb-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: colorLight }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <div
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ background: color, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        >
          {num}
        </div>
      </div>

      {/* Text */}
      <h4
        className="mb-1.5 text-[13px] font-semibold"
        style={{ letterSpacing: "-0.01em", color: "var(--foreground)" }}
      >
        {title}
      </h4>
      <p
        className="text-[12px] leading-[1.6]"
        style={{ color: "var(--muted-foreground)", maxWidth: 200 }}
      >
        {description}
      </p>
    </motion.div>
  );
}
