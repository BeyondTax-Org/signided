import { motion } from "motion/react";
import { Shield } from "lucide-react";

const steps = [
  "Checking verification code",
  "Validating signature",
  "Fetching metadata",
];

export function LoadingState() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-[400px] py-8"
    >
      <div
        className="rounded-[var(--r-lg)] border bg-white p-8"
        style={{ borderColor: "var(--bd)", boxShadow: "var(--shadow-md)" }}
      >
        {/* Animated shield */}
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "var(--am-bg)" }}
          >
            <Shield size={28} style={{ color: "var(--am)" }} />
          </motion.div>
        </div>

        <h3
          className="mb-6 text-center text-[16px] font-bold"
          style={{ letterSpacing: "-0.02em", color: "var(--tx)" }}
        >
          Verifying document
        </h3>

        {/* Step progress */}
        <div className="space-y-3">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.8, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: i * 0.8 + 0.3,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ background: "var(--am)", flexShrink: 0 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2.5 5L4.5 7L7.5 3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <span className="text-[13px]" style={{ color: "var(--tx2)" }}>
                {s}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="mt-6 h-1 overflow-hidden rounded-full"
          style={{ background: "var(--bg2)" }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--am), var(--am-hover))",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
