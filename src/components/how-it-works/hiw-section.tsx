import { motion } from "motion/react";
import { StepCard } from "./step-card";
import {
  Hash,
  Search,
  ShieldCheck,
  Lock,
  Smartphone,
  Eye,
  ChevronRight,
} from "lucide-react";

const phase1Steps = [
  {
    num: 1,
    icon: <Hash size={20} />,
    title: "Enter the UVC",
    description:
      "Type the unique verification code from the signed PDF — or upload the file.",
    who: "YOU" as const,
  },
  {
    num: 2,
    icon: <Search size={20} />,
    title: "We check the record",
    description:
      "Sign IDed validates the code against our signature ledger in real time.",
    who: "AUTOMATIC" as const,
  },
  {
    num: 3,
    icon: <ShieldCheck size={20} />,
    title: "See the result",
    description:
      "Instant status: verified, expired, or revoked — plus the SHA-256 fingerprint.",
    who: "AUTOMATIC" as const,
  },
];

const phase2Steps = [
  {
    num: 4,
    icon: <Lock size={20} />,
    title: "Request a preview",
    description:
      "Want to see the document? We send a one-time passcode to the owner.",
    who: "YOU" as const,
  },
  {
    num: 5,
    icon: <Smartphone size={20} />,
    title: "Owner approves",
    description:
      "The document owner enters the OTP to authorize your 15-minute preview.",
    who: "OWNER" as const,
  },
  {
    num: 6,
    icon: <Eye size={20} />,
    title: "View securely",
    description:
      "Read-only, watermarked, non-downloadable. Auto-expires after 15 minutes.",
    who: "YOU" as const,
  },
];

function StepConnector() {
  return (
    <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 md:flex">
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ background: "var(--bg)", border: "1px solid var(--bd)" }}
      >
        <ChevronRight size={12} style={{ color: "var(--tx3)" }} />
      </div>
    </div>
  );
}

export function HiwSection() {
  return (
    <section
      id="how-it-works"
      className="relative px-6 py-20"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1120px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--tx)",
            }}
          >
            How it works
          </h2>
          <p className="mt-2 text-[15px]" style={{ color: "var(--tx2)" }}>
            Two phases. Six steps. Under a minute.
          </p>
        </motion.div>

        {/* Phase 1 */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center justify-center gap-2.5"
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em]"
              style={{
                background: "var(--verified-light)",
                color: "#166534",
              }}
            >
              <ShieldCheck size={12} />
              Phase 1
            </span>
            <span
              className="text-[18px] font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Verify the signature
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
            {phase1Steps.map((step, i) => (
              <div key={step.num} className="relative">
                <StepCard
                  {...step}
                  color="var(--verified)"
                  colorLight="var(--verified-light)"
                  index={i}
                />
                {i < phase1Steps.length - 1 && <StepConnector />}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <div
            className="flex-1 border-t"
            style={{ borderColor: "var(--bd)" }}
          />
          <span
            className="rounded-full border px-4 py-2 text-[11px] font-semibold"
            style={{
              background: "var(--am-bg)",
              borderColor: "rgba(245,158,11,0.2)",
              color: "var(--am-dark)",
            }}
          >
            Document verified — want to see it?
          </span>
          <div
            className="flex-1 border-t"
            style={{ borderColor: "var(--bd)" }}
          />
        </motion.div>

        {/* Phase 2 */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center justify-center gap-2.5"
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em]"
              style={{
                background: "var(--am-light)",
                color: "var(--am-dark)",
              }}
            >
              <Eye size={12} />
              Phase 2
            </span>
            <span
              className="text-[18px] font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Preview the document
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
            {phase2Steps.map((step, i) => (
              <div key={step.num} className="relative">
                <StepCard
                  {...step}
                  color="var(--am)"
                  colorLight="var(--am-light)"
                  index={i}
                />
                {i < phase2Steps.length - 1 && <StepConnector />}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <a
            href="#verify"
            className="cta-shine inline-flex items-center rounded-[var(--r-md)] px-7 py-3.5 text-[14px] font-semibold transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              background: "var(--am)",
              color: "var(--am-cta-fg)",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--am-hover)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "var(--shadow-am)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--am)";
              e.currentTarget.style.color = "var(--am-cta-fg)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            Verify a document
          </a>
        </motion.div>
      </div>
    </section>
  );
}
