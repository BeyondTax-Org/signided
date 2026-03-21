import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { UvcInput } from "./uvc-input";
import { PdfUpload } from "./pdf-upload";
import { DemoCodes } from "./demo-codes";
import { Hash, FileUp, Lock } from "lucide-react";

interface VerifyFormProps {
  onOpenHelp: () => void;
  initialCode?: string;
}

type Tab = "uvc" | "pdf";

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
      className="border-y px-6 py-16"
      style={{
        background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-[1120px]">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
            }}
          >
            Verify a signed document
          </h2>
          <p
            className="mt-2"
            style={{ fontSize: "15px", color: "var(--muted-foreground)" }}
          >
            Enter the unique verification code or upload the signed PDF.
          </p>
        </div>

        {/* Form card */}
        <div className="mx-auto max-w-[480px]">
          <div
            className="group relative rounded-[var(--radius-card)] border bg-white p-6 transition-all duration-300"
            style={{
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.06), 0 0 0 1px color-mix(in srgb, var(--primary) 15%, transparent)";
              e.currentTarget.style.borderColor = "color-mix(in srgb, var(--primary) 25%, var(--border))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {/* Tabs */}
            <div
              className="mb-5 flex border-b"
              style={{ borderColor: "var(--border)" }}
            >
              {([
                { key: "uvc" as Tab, icon: Hash, label: "UVC Code" },
                { key: "pdf" as Tab, icon: FileUp, label: "Upload PDF" },
              ]).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 pb-2.5 text-[13px] font-medium transition-all cursor-pointer",
                    tab === t.key
                      ? "border-b-2"
                      : "opacity-50 hover:opacity-80"
                  )}
                  style={{
                    borderColor:
                      tab === t.key ? "var(--primary)" : "transparent",
                    color: tab === t.key ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  <t.icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            {tab === "uvc" ? (
              <UvcInput onOpenHelp={onOpenHelp} initialCode={initialCode} />
            ) : (
              <PdfUpload />
            )}

            {/* Security note */}
            <div
              className="mt-4 flex items-start gap-2 rounded-[var(--r-sm)] p-3"
              style={{ background: "var(--muted)" }}
            >
              <Lock
                size={12}
                style={{ color: "var(--tx3)", marginTop: 2, flexShrink: 0 }}
              />
              <p
                className="text-[11px] leading-[1.6]"
                style={{ color: "var(--tx3)" }}
              >
                Document preview requires OTP verification from the document
                owner. We never store uploaded files.
              </p>
            </div>
          </div>

          {/* Demo codes */}
          <DemoCodes />

          {/* Info row */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              {
                title: "UVC Code",
                desc: "Unique verification code printed on every signed document",
              },
              {
                title: "Fingerprint",
                desc: "SHA-256 hash confirms the file hasn\u2019t been tampered with",
              },
              {
                title: "Secure Preview",
                desc: "View the original document with owner consent via OTP",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <p
                  className="text-[11px] font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-0.5 text-[10px] leading-[1.5]"
                  style={{ color: "var(--tx3)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
