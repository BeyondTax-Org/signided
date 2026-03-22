import { motion } from "motion/react";
import { DocumentMockup } from "./document-mockup";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-20 pb-12"
      style={{ background: "var(--background)" }}
    >
      <div className="relative mx-auto max-w-[680px] text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
          style={{
            background: "var(--muted)",
            borderColor: "var(--border)",
          }}
        >
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Public verification portal
          </span>
        </motion.div>

        {/* Shield mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-5 flex justify-center"
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "var(--am-bg)" }}
          >
            <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3L5 7.5V14C5 20 8.5 25 14 27C19.5 25 23 20 23 14V7.5L14 3Z"
                fill="var(--am)"
                opacity="0.85"
              />
              <path
                d="M11 14.5L13 16.5L17.5 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "var(--foreground)",
          }}
        >
          Is that signed document real?
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-5"
          style={{
            fontSize: "clamp(20px, 3vw, 26px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            color: "var(--am)",
          }}
        >
          Verify it in seconds.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mb-6 max-w-[480px] leading-[1.7]"
          style={{ fontSize: "15px", color: "var(--muted-foreground)" }}
        >
          Enter the unique verification code printed on any Aiyug-signed PDF
          — or upload the file directly. Instant results. No account needed.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <motion.a
            href="#verify"
            className="cta-shine inline-flex items-center rounded-[var(--radius)] px-7 py-3 text-[15px] font-medium"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            Verify a document
          </motion.a>
        </motion.div>
      </div>

      {/* Document mockup — desktop only */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="mx-auto mt-10 max-w-[320px] sm:max-w-[360px]"
      >
        <DocumentMockup />
      </motion.div>
    </section>
  );
}
