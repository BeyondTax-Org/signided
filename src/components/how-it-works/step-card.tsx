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

export function StepCard({
  num,
  title,
  description,
  who,
  index,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: index * 0.1,
      }}
      className="group rounded-[var(--radius-card)] border bg-white p-5 transition-all duration-300"
      style={{
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start gap-4">
        {/* Step number */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold"
          style={{
            background: "rgba(180, 83, 9, 0.1)",
            color: "#B45309",
            border: "2px solid rgba(180, 83, 9, 0.25)",
          }}
        >
          {num}
        </div>

        <div>
          {/* Who label */}
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.06em]"
            style={{ color: "var(--am-dark)" }}
          >
            {who}
          </p>

          {/* Title */}
          <h4
            className="mb-1 text-[14px] font-semibold"
            style={{ letterSpacing: "-0.01em", color: "var(--foreground)" }}
          >
            {title}
          </h4>

          {/* Description */}
          <p
            className="text-[13px] leading-[1.6]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
