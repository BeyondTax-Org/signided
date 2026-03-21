import { motion } from "motion/react";
import { Smartphone } from "lucide-react";

export function PreviewWaiting() {
  return (
    <motion.div
      key="preview-waiting"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-[480px]"
    >
      <div
        className="rounded-[var(--radius-card)] border bg-white p-8 text-center"
        style={{ borderColor: "var(--border)", boxShadow: "var(--shadow-md)" }}
      >
        <div className="mb-5 flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "var(--primary-bg)" }}
          >
            <Smartphone size={28} style={{ color: "var(--primary)" }} />
          </motion.div>
        </div>
        <h3
          className="mb-2 text-[18px] font-bold"
          style={{ letterSpacing: "-0.02em", color: "var(--foreground)" }}
        >
          Waiting for owner approval
        </h3>
        <p className="text-[13px] leading-[1.6]" style={{ color: "var(--muted-foreground)" }}>
          We've sent a one-time passcode to the document owner.
          This usually takes a few seconds.
        </p>

        <div className="mt-6 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--primary)" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
