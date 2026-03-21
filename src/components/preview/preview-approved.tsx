import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export function PreviewApproved() {
  return (
    <motion.div
      key="preview-approved"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="mx-auto max-w-[480px]"
    >
      <div
        className="rounded-[var(--r-lg)] border bg-white p-8 text-center"
        style={{
          borderColor: "rgba(34,197,94,0.25)",
          boxShadow: "0 4px 16px rgba(34,197,94,0.08), var(--shadow-md)",
        }}
      >
        <div className="mb-4 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.1 }}
          >
            <CheckCircle2 size={44} style={{ color: "var(--verified)" }} />
          </motion.div>
        </div>
        <h3
          className="mb-2 text-[18px] font-bold"
          style={{ letterSpacing: "-0.02em", color: "var(--verified)" }}
        >
          Preview approved!
        </h3>
        <p className="text-[13px]" style={{ color: "var(--tx2)" }}>
          Opening the secure document viewer\u2026
        </p>
      </div>
    </motion.div>
  );
}
