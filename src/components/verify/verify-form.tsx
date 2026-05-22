import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { UvcInput } from "./uvc-input";
import { PdfUpload } from "./pdf-upload";
import { DemoCodes } from "./demo-codes";
import { Eye, Fingerprint, FileUp, Hash, Lock } from "lucide-react";

interface VerifyFormProps {
  onOpenHelp: () => void;
  initialCode?: string;
}

type Tab = "uvc" | "pdf";

const supportCards = [
  {
    icon: Hash,
    title: "UVC Code",
    desc: "Found near the signature stamp or QR on the signed document.",
    bg: "#E9FBF2",
    color: "#10B981",
  },
  {
    icon: Fingerprint,
    title: "Fingerprint",
    desc: "SHA-256 hash that proves the document hasn't been modified.",
    bg: "#ECECFF",
    color: "#6568F6",
  },
  {
    icon: Eye,
    title: "Secure Preview",
    desc: "View the signed doc with owner's approval via OTP.",
    bg: "#FFE6F2",
    color: "#FF3C9A",
  },
];

export function VerifyForm({ onOpenHelp, initialCode }: VerifyFormProps) {
  const [tab, setTab] = useState<Tab>("uvc");

  return (
    <motion.section
      key="form"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      id="verify"
      className="scroll-mt-20 border-y px-4 py-12 sm:px-5 sm:py-[72px]"
      style={{
        // background: "#FAFBFD",
        borderColor: "#E5E9F1",
      }}
    >
      <div className="mx-auto max-w-[90%] md:max-w-[52%]">
        <div className="text-center">
          <h2
            style={{
              fontSize: "clamp(1.75rem, 8vw, 32px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "#181B2A",
              marginTop: "clamp(2rem, 10vw, 5rem)",
            }}
          >
            Verify a signed document
          </h2>
          <p
            className="text-[0.9rem] font-[500] leading-[1.45] sm:text-[1rem]"
            style={{ color: "#6F7686", marginTop: "0.7rem"}}
          >
            Enter the verification code (UVC) or upload the signed PDF to check
            its authenticity.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-lg border bg-white"
          style={{ borderColor: "#DCE1EA", marginTop: "2.3rem", paddingTop: "1rem"}}
        >
          <div className="grid  grid-cols-2 border-b" style={{ borderColor: "#DCE1EA",  }}>
            {([
              { key: "uvc" as Tab, icon: Hash, label: "Verification Code (UVC)" },
              { key: "pdf" as Tab, icon: FileUp, label: "Upload Signed PDF" },
            ]).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "relative flex min-h-[48px] items-center justify-center gap-1.5 px-2 text-center text-[0.72rem] font-[600] leading-[1.2] transition-colors cursor-pointer sm:gap-2 sm:text-[0.8rem]",
                  tab === t.key ? "" : "hover:bg-[#FAFBFD]"
                )}
                style={{
                  color: tab === t.key ? "#191B2A" : "#6F7686", paddingBottom: "0.9rem"
                }}
              >
                <t.icon size={14} strokeWidth={2} />
                {t.label}
                {tab === t.key && (
                  <span
                    className="absolute bottom-0 left-0 h-[3px] w-full"
                    style={{ background: "#6568F6" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="" style={{
            padding: "clamp(1rem, 5vw, 2rem)"
          }}>
            {tab === "uvc" ? (
              <UvcInput onOpenHelp={onOpenHelp} initialCode={initialCode} />
            ) : (
              <PdfUpload />
            )}

            <div
              className="flex items-center gap-3 rounded-md"
              style={{ background: "#F6F7F9", marginTop: "2rem", padding: "1rem" }}
            >
              <Lock size={18} style={{ color: "#6F7686", flexShrink: 0 }} />
              <p
                className="text-[0.8rem] font-[500] leading-[1.45]"
                style={{ color: "#6F7686" }}
              >
                We'll show the verification status instantly. To preview the
                actual document, the owner/signer must approve via OTP.
              </p>
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-1 gap-4 md:grid-cols-3" style={{marginTop: "2rem"}}>
          {supportCards.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-md border bg-white"
              style={{ borderColor: "#DCE1EA", padding: "1rem" }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md md:h-[50%] md:w-[20%]"
                style={{ background: item.bg }}
              >
                <item.icon size={18} strokeWidth={2} style={{ color: item.color }} />
              </div>
              <div>
                <p
                  className="text-[0.9rem] font-[600] leading-[1.2]"
                  style={{ color: "#191B2A", marginBottom: "0.4rem" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-[0.75rem] font-[500] leading-[1.55]"
                  style={{ color: "#6F7686" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <DemoCodes />
      </div>
    </motion.section>
  );
}
