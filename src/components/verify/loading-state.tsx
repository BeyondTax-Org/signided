import { motion } from "motion/react";
import { CheckCircle2, LoaderCircle } from "lucide-react";

const steps = ["Locating record", "Verifying hash", "Checking status"];

export function LoadingState() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-[90%] md:max-w-[55%]"
      style={{ padding: "4rem 0" }}
    >
      <div
        className="flex flex-col items-center justify-center rounded-md border bg-white text-center"
        style={{ borderColor: "#DCE1EA", padding: "2rem" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          style={{ marginBottom: "1.2rem" }}
        >
          <LoaderCircle
            size={40}
            strokeWidth={2}
            style={{ color: "#6568F6" }}
          />
        </motion.div>

        <h3
          className="text-[1.4rem] font-[600] leading-[1.1]"
          style={{ letterSpacing: "-0.035em", color: "#191B2A", marginBottom: "0.4rem" }}
        >
          Checking the record...
        </h3>

        <p
          className="max-w-[520px] text-[1rem] font-[500] leading-[1.45]"
          style={{ color: "#6F7686", marginBottom: "1rem" }}
        >
          We're locating the signing record and verifying the cryptographic
          fingerprint.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-[32px] gap-y-4">
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
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  size={20}
                  strokeWidth={2.3}
                  style={{ color: "#10B981" }}
                />
                <span
                  className="text-[1rem] font-[600]"
                  style={{ color: "#6F7686" }}
                >
                  {s}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
