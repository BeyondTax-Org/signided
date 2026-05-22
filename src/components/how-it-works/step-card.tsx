import { type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface StepCardProps {
  num: number;
  icon: ReactNode;
  title: string;
  description: string;
  who: "You" | "Automatic" | "Doc Owner";
  color: string;
  colorLight: string;
  index: number;
  roleBg?: string;
  roleColor?: string;
  showArrow?: boolean;
}

export function StepCard({
  num,
  icon,
  title,
  description,
  who,
  color,
  colorLight,
  index,
  roleBg = "#F0F2F5",
  roleColor = "#6F7686",
  showArrow = false,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: index * 0.1,
      }}
      className="group relative overflow-visible rounded-md border bg-white transition-all duration-300"
      style={{
        borderColor: "#DCE1EA",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.02)",
        padding: "1.2rem"
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 28px rgba(31, 37, 89, 0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 2px rgba(15, 23, 42, 0.02)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <span
        className="absolute left-0 top-0 h-[5px] w-full rounded-t-[14px]"
        style={{ background: color }}
      />

      {showArrow && (
        <div
          className="pointer-events-none absolute right-[-17px] top-1/2 z-10 hidden -translate-y-1/2 lg:flex"
          style={{ color: "#DCE1EA" }}
        >
          <ArrowRight size={24} strokeWidth={1.7} />
        </div>
      )}

      <div className="flex items-center justify-between" style={{marginBottom: "1rem"}}>
        <div
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[15px] font-extrabold"
          style={{
            background: color,
            color: "#FFFFFF",
          }}
        >
          {num}
        </div>
        <span
          className="rounded-full  text-[11px] font-extrabold leading-none"
          style={{ background: roleBg, color: roleColor, padding: "0.3rem 0.5rem" }}
        >
          {who}
        </span>
      </div>

      <div
        className="flex h-10 w-10 items-center justify-center rounded-md sm:h-[20%] sm:w-[15%]"
        style={{ background: colorLight, color, marginBottom: "0.8rem" }}
      >
        {icon}
      </div>

      <h4
        className="text-[0.9rem] font-[600] leading-[1.2]"
        style={{ letterSpacing: "-0.015em", color: "#191B2A", marginBottom: "0.8rem" }}
      >
        {title}
      </h4>

      <p
        className="text-[0.75rem] font-[500] leading-[1.55]"
        style={{ color: "#6F7686", marginBottom: "1.4rem" }}
      >
        {description}
      </p>
    </motion.div>
  );
}
