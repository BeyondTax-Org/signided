import { motion } from "motion/react";
import { DocumentMockup } from "./document-mockup";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-24 md:pb-20"
      style={{ background: "var(--dark)" }}
    >
      {/* Ambient amber glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(245,158,11,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1120px] items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: Copy */}
        <div className="max-w-[480px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
            style={{
              background: "rgba(245,158,11,0.08)",
              borderColor: "rgba(245,158,11,0.2)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "var(--am)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "var(--am)" }}
              />
            </span>
            <span
              className="text-[11px] font-semibold tracking-wide"
              style={{ color: "var(--am)" }}
            >
              Public verification portal
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#fff",
            }}
          >
            Is that signed
            <br />
            document{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              real
            </span>
            ?
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-5"
            style={{
              fontSize: "clamp(22px, 3.5vw, 30px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              color: "var(--dark-tx2)",
            }}
          >
            Verify it in seconds.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mb-8 max-w-[400px] leading-[1.7]"
            style={{ fontSize: "15px", color: "var(--dark-tx2)" }}
          >
            Enter the unique verification code printed on any Aiyug-signed PDF
            — or upload the file directly. Instant results. No account needed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex items-center gap-3"
          >
            <a
              href="#verify"
              className="cta-shine inline-flex items-center rounded-[var(--r-md)] px-7 py-3.5 text-[14px] font-semibold transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                background: "var(--am)",
                color: "var(--am-cta-fg)",
                boxShadow: "var(--shadow-am)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--am-hover)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(245,158,11,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--am)";
                e.currentTarget.style.color = "var(--am-cta-fg)";
                e.currentTarget.style.boxShadow = "var(--shadow-am)";
              }}
            >
              Verify a document
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-[var(--r-md)] border px-6 py-3.5 text-[14px] font-medium transition-all duration-200 hover:-translate-y-px"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "var(--dark-tx2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--am)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "var(--dark-tx2)";
              }}
            >
              How it works
            </a>
          </motion.div>
        </div>

        {/* Right: Document */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center"
        >
          <DocumentMockup />
        </motion.div>
      </div>
    </section>
  );
}
