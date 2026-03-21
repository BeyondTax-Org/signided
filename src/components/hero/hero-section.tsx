import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-24 pb-20"
      style={{
        background: "linear-gradient(180deg, var(--primary-bg) 0%, var(--background) 100%)",
      }}
    >
      {/* Ambient indigo glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[680px] text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
          style={{
            background: "color-mix(in srgb, var(--primary) 8%, transparent)",
            borderColor: "color-mix(in srgb, var(--primary) 18%, transparent)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: "var(--primary)" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--primary)" }}
            />
          </span>
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "var(--primary)" }}
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
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "var(--foreground)",
          }}
        >
          Is that signed document{" "}
          <span className="text-primary-gradient">real</span>?
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
            color: "var(--muted-foreground)",
          }}
        >
          Verify it in seconds.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mb-8 max-w-[480px] leading-[1.7]"
          style={{ fontSize: "15px", color: "var(--muted-foreground)" }}
        >
          Enter the unique verification code printed on any Aiyug-signed PDF
          — or upload the file directly. Instant results. No account needed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex items-center justify-center gap-3"
        >
          <a
            href="#verify"
            className="cta-shine inline-flex items-center rounded-[var(--r-md)] px-7 py-3.5 text-[14px] font-semibold transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              background: "var(--primary)",
              color: "var(--primary-cta-fg)",
              boxShadow: "var(--shadow-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary-hover)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(99,102,241,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--primary)";
              e.currentTarget.style.boxShadow = "var(--shadow-primary)";
            }}
          >
            Verify a document
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-[var(--r-md)] border px-6 py-3.5 text-[14px] font-medium transition-all duration-200 hover:-translate-y-px"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
              background: "var(--background)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted-foreground)";
            }}
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}
