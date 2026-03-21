import { motion } from "motion/react";
import { Zap, Eye, ShieldCheck, UserX } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Verification",
    description:
      "Enter a UVC code or upload the PDF — get a definitive answer in under 3 seconds.",
    color: "var(--primary)",
    bg: "color-mix(in srgb, var(--primary) 10%, transparent)",
  },
  {
    icon: Eye,
    title: "Owner-Approved Preview",
    description:
      "View the original document only after the signer approves via a one-time OTP.",
    color: "var(--verified)",
    bg: "color-mix(in srgb, var(--verified) 10%, transparent)",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Proof Integrity",
    description:
      "SHA-256 fingerprint confirms the file hasn't been modified since signing.",
    color: "var(--am)",
    bg: "color-mix(in srgb, var(--am) 10%, transparent)",
  },
  {
    icon: UserX,
    title: "No Account Needed",
    description:
      "Anyone with a verification code can check a document — no signup or login required.",
    color: "var(--info)",
    bg: "color-mix(in srgb, var(--info) 10%, transparent)",
  },
];

export function TrustBar() {
  return (
    <section className="px-6 py-16" style={{ background: "var(--background)" }}>
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: i * 0.08,
            }}
            className="group rounded-[var(--radius-card)] border p-5 transition-all duration-300"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.borderColor = "color-mix(in srgb, var(--primary) 25%, var(--border))";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Icon */}
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: feature.bg }}
            >
              <feature.icon size={20} strokeWidth={2} style={{ color: feature.color }} />
            </div>

            {/* Text */}
            <h3
              className="mb-1.5 text-[14px] font-semibold"
              style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
            >
              {feature.title}
            </h3>
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
