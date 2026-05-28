import { motion } from "motion/react";
import { Eye, Fingerprint, KeyRound, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Instant Verification",
    description:
      "Enter a UVC code or upload a signed PDF. Get a verified, expired, or revoked result in seconds.",
  },
  {
    icon: Eye,
    title: "Owner-Approved Preview",
    description:
      "Need to see the document? The owner approves via OTP — you get a read-only, time-limited view.",
  },
  {
    icon: Fingerprint,
    title: "Tamper-Proof Integrity",
    description:
      "Every signed document has a SHA-256 fingerprint. If anything changed after signing, verification fails.",
  },
  {
    icon: KeyRound,
    title: "No Account Needed",
    description:
      "Anyone can verify. No signup, no login. Just a code or a PDF.",
  },
];

export function FeaturesGrid() {
  return (
    <section
      aria-labelledby="features-heading"
      className="px-5 "
      style={{ background: "#FAFBFD", paddingBottom: "4rem"}}
    >
      <div className="sr-only">
        <h2
          id="features-heading"
        >
          Why Sign IDed?
        </h2>
      </div>

      <div className="mx-auto grid md:max-w-[75%] grid-cols-1 gap-4 max-w-[90%] sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: i * 0.08,
            }}
            className="group rounded-md border bg-white  transition-all duration-300"
            style={{
              borderColor: "#E1E5EE",
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.02)",
              padding: "1.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 10px 28px rgba(31, 37, 89, 0.08)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 1px 2px rgba(15, 23, 42, 0.02)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md md:h-[32%] md:w-[20%]"
              style={{ background: "#FEF3C7", marginBottom: "1.1rem" }}
            >
              <feature.icon
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                style={{ color: "#B45309" }}
              />
            </div>
            <h3
              className="text-[0.95rem] font-[600] leading-[1.2]"
              style={{ color: "#191B2A", letterSpacing: "-0.015em", marginBottom: "0.8rem" }}
            >
              {feature.title}
            </h3>
            <p
              className="text-[0.75rem] font-[500] leading-[1.55]"
              style={{ color: "#6F7686", marginBottom: "1rem" }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
