import { motion } from "motion/react";
import { StepCard } from "./step-card";
import {
  Bell,
  ChevronDown,
  Eye,
  FileSearch,
  Hash,
  ScanLine,
  ShieldCheck,
  Zap,
} from "lucide-react";

const verifySteps = [
  {
    num: 1,
    icon: <Hash size={20} strokeWidth={2} />,
    title: "Enter code or upload PDF",
    description:
      "Find the short code (UVC) near the signature on your document — or upload the signed PDF directly.",
    who: "You" as const,
  },
  {
    num: 2,
    icon: <ScanLine size={20} strokeWidth={2} />,
    title: "We check the record",
    description:
      "We match the code to a signing record, verify the cryptographic fingerprint, and confirm it's valid.",
    who: "Automatic" as const,
    roleBg: "#ECECFF",
    roleColor: "#6568F6",
  },
  {
    num: 3,
    icon: <ShieldCheck size={20} strokeWidth={2} />,
    title: "See the result",
    description:
      "Instantly see Verified, Expired, or Revoked — plus the document fingerprint and signing date.",
    who: "You" as const,
  },
];

const previewSteps = [
  {
    num: 4,
    icon: <Eye size={25} strokeWidth={2.1} />,
    title: "Request a preview",
    description:
      "Want to see the actual document? Tap 'Preview' — we'll ask the owner for permission.",
    who: "You" as const,
  },
  {
    num: 5,
    icon: <Bell size={25} strokeWidth={2.1} />,
    title: "Owner approves via OTP",
    description:
      "The document owner gets an OTP on their phone or email. They enter it to approve your request.",
    who: "Doc Owner" as const,
    roleBg: "#FFF0E7",
    roleColor: "#F97316",
  },
  {
    num: 6,
    icon: <FileSearch size={25} strokeWidth={2.1} />,
    title: "View in Doclate",
    description:
      "A read-only, time-limited preview opens in the Doclate viewer. No downloads — just visual verification.",
    who: "You" as const,
  },
];

const verifyColor = "#10B981";
const verifyLight = "#E8FAF4";
const previewColor = "#6568F6";
const previewLight = "#ECECFF";

export function HiwSection() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 px-5 py-[74px]"
      style={{
        background: "#FAFBFD",
        padding: "4rem 1rem",
      }}
    >
      <div className="mx-auto max-w-full lg:max-w-[65%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
          style={{ marginBottom: "2rem" }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 2.2vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#191B2A",
            }}
          >
            How it works
          </h2>
          <p
            className="mt-[17px] text-[13px] font-semibold leading-[1.5]"
            style={{ color: "#6F7686" }}
          >
            Two phases, six simple steps. The whole thing takes under a minute.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-3 sm:gap-[15px]"
          style={{ marginBottom: "1rem" }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border  text-[0.85rem] font-[600] leading-none"
            style={{
              background: verifyLight,
              borderColor: "#BDEEDB",
              color: verifyColor,
              padding: "0.2rem 0.5rem",
            }}
          >
            <ShieldCheck size={15} strokeWidth={2.1} />
            Phase 1
          </span>
          <h3
            className="text-[1rem] font-[600]"
            style={{ color: "#191B2A", letterSpacing: "-0.01em" }}
          >
            Verify the signature
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-3">
          {verifySteps.map((step, i) => (
            <StepCard
              key={step.num}
              {...step}
              color={verifyColor}
              colorLight={verifyLight}
              index={i}
              showArrow={i < verifySteps.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          // className="my-[54px]"
          style={{ margin: "2.5rem 0.2rem" }}
        >
          <div className="flex items-center gap-3 sm:gap-[18px]">
            <div className="h-px flex-1" style={{ background: "#DCE1EA" }} />
            <div className="flex flex-col items-center gap-[13px]">
              <ChevronDown
                size={18}
                strokeWidth={2}
                style={{ color: "#6F7686" }}
              />
              <span
                className="rounded-full text-center text-[0.72rem] font-[600] leading-[1.25] sm:text-[0.8rem] sm:leading-none"
                style={{
                  background: "#ECECFF",
                  color: previewColor,
                  padding: "0.35rem 0.7rem",
                }}
              >
                Document is verified — want to see it?
              </span>
            </div>
            <div className="h-px flex-1" style={{ background: "#DCE1EA" }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "1rem" }}
          className="flex flex-wrap items-center gap-[15px]"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border  text-[0.85rem] font-[600] leading-none"
            style={{
              background: previewLight,
              borderColor: "#CBCEFF",
              color: previewColor,
              padding: "0.2rem 0.5rem",
            }}
          >
            <Eye size={15} strokeWidth={2.1} />
            Phase 2
          </span>
          <h3
            className="text-[1rem] font-[600]"
            style={{ color: "#191B2A", letterSpacing: "-0.01em" }}
          >
            Preview the document
          </h3>
          <span
            className="rounded-full text-[0.7rem] font-[500] leading-none"
            style={{
              background: "#E9EBF0",
              color: "#8A91A0",
              padding: "0.2rem 0.5rem",
            }}
          >
            optional
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-3">
          {previewSteps.map((step, i) => (
            <StepCard
              key={step.num}
              {...step}
              color={previewColor}
              colorLight={previewLight}
              index={i}
              showArrow={i < previewSteps.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
          style={{ marginTop: "1.5rem" }}
        >
          <a
            href="#verify"
            className="cta-shine inline-flex items-center gap-2 rounded-md text-[0.9rem] font-[600] transition-all duration-200 hover:-translate-y-[1px] no-underline"
            style={{
              background: previewColor,
              color: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(62, 66, 168, 0.2)",
              padding: "0.4rem 0.7rem"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#575AEF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = previewColor;
            }}
          >
            <Zap size={18} strokeWidth={2.3} />
            Verify a Document
          </a>
        </motion.div>
      </div>
    </section>
  );
}
