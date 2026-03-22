import { motion } from "motion/react";
import { StepCard } from "./step-card";
import {
  Hash,
  Search,
  ShieldCheck,
  Lock,
  Smartphone,
  Eye,
} from "lucide-react";

const allSteps = [
  {
    num: 1,
    icon: <Hash size={20} />,
    title: "Enter the UVC",
    description:
      "Type the unique verification code from the signed PDF \u2014 or upload the file.",
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
      "Instant status: verified, expired, or revoked \u2014 plus the SHA-256 fingerprint.",
    who: "AUTOMATIC" as const,
  },
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

export function HiwSection() {
  return (
    <section
      id="how-it-works"
      className="relative px-6 py-20"
      style={{
        background: "linear-gradient(180deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%)",
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
              color: "var(--foreground)",
            }}
          >
            How it works
          </h2>
          <p className="mt-2 text-[15px]" style={{ color: "var(--muted-foreground)" }}>
            Two phases. Six steps. Under a minute.
          </p>
        </motion.div>

        {/* 2-column grid of all 6 steps */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {allSteps.map((step, i) => (
            <StepCard
              key={step.num}
              {...step}
              color="var(--am)"
              colorLight="var(--am-light)"
              index={i}
            />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-10"
        >
          <div
            className="rounded-[var(--r-md)] px-6 py-3"
            style={{
              background: "var(--am-bg)",
              border: "1px solid var(--am-light)",
            }}
          >
            <p
              className="text-[14px] font-medium"
              style={{ color: "var(--am-dark)" }}
            >
              Document verified — want to see it?
            </p>
          </div>
        </motion.div>

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
            className="cta-shine inline-flex items-center rounded-[var(--r-md)] px-8 py-4 text-[15px] font-semibold transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              background: "var(--cta)",
              color: "var(--cta-fg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--cta-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--cta)";
            }}
          >
            Verify a document
          </a>
        </motion.div>
      </div>
    </section>
  );
}
