import { motion } from "motion/react";
import { DocumentMockup } from "./document-mockup";

const vp = { once: true, amount: 0.1 as const };

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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
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
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-5 flex justify-center"
        >
          <img
            src="/brand/signided-mark-color-light.svg"
            alt="Sign IDed"
            className="h-14 w-14"
          />
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <motion.a
            href="#verify"
            className="cta-shine inline-flex items-center rounded-xl px-8 py-3.5 text-[15px] font-semibold no-underline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "#1C1917",
              color: "#FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Verify a document
          </motion.a>
        </motion.div>
      </div>

      {/* Document mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="mx-auto mt-10 max-w-[320px] sm:max-w-[360px]"
      >
        <DocumentMockup />
      </motion.div>
    </section>
  );
}
