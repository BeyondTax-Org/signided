import { motion } from "motion/react";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  ShieldX,
  Copy,
  Check,
  Eye,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useVerify } from "./verify-context";
import type { QuickResult, VerifyStatus } from "@/api/types";
import { useState } from "react";

const statusConfig: Record<
  VerifyStatus,
  {
    icon: typeof ShieldCheck;
    label: string;
    bg: string;
    color: string;
    borderColor: string;
    description: string;
  }
> = {
  verified: {
    icon: ShieldCheck,
    label: "VERIFIED",
    bg: "var(--verified-light)",
    color: "var(--verified)",
    borderColor: "rgba(34,197,94,0.25)",
    description: "This document\u2019s digital signature is valid and untampered.",
  },
  "not-found": {
    icon: ShieldAlert,
    label: "NOT FOUND",
    bg: "var(--expired-light)",
    color: "var(--expired)",
    borderColor: "rgba(249,115,22,0.25)",
    description:
      "No record found for this code. Double-check the code or contact the issuer.",
  },
  expired: {
    icon: ShieldOff,
    label: "EXPIRED",
    bg: "var(--expired-light)",
    color: "var(--expired)",
    borderColor: "rgba(249,115,22,0.25)",
    description:
      "This verification code has expired. Ask the issuer for a fresh code.",
  },
  revoked: {
    icon: ShieldX,
    label: "REVOKED",
    bg: "var(--revoked-light)",
    color: "var(--revoked)",
    borderColor: "rgba(239,68,68,0.25)",
    description:
      "This signature has been revoked by the signer. Treat this document as invalid.",
  },
};

export function ResultCard({ result }: { result: QuickResult }) {
  const { dispatch } = useVerify();
  const config = statusConfig[result.status];
  const Icon = config.icon;
  const [copied, setCopied] = useState(false);

  function copyFingerprint() {
    if (result.fingerprint) {
      navigator.clipboard.writeText(result.fingerprint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-[480px]"
    >
      <div
        className="overflow-hidden rounded-[var(--radius-card)]"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Status banner */}
        <div
          className="border px-5 py-5"
          style={{
            background: config.bg,
            borderColor: config.borderColor,
            borderBottom: "none",
            borderTopLeftRadius: "var(--radius-card)",
            borderTopRightRadius: "var(--radius-card)",
          }}
        >
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
            >
              <Icon size={30} style={{ color: config.color }} />
            </motion.div>
            <div>
              <span
                className="text-[12px] font-bold uppercase tracking-[0.06em]"
                style={{ color: config.color }}
              >
                {config.label}
              </span>
              <p className="mt-1 text-[13px] leading-[1.6]" style={{ color: "var(--muted-foreground)" }}>
                {config.description}
              </p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        {result.status === "verified" && result.fingerprint && (
          <div
            className="border border-t-0 bg-white p-5"
            style={{
              borderColor: config.borderColor,
              borderBottomLeftRadius: "var(--radius-card)",
              borderBottomRightRadius: "var(--radius-card)",
            }}
          >
            <div className="space-y-4">
              {/* Fingerprint */}
              <div
                className="flex items-center justify-between rounded-[var(--r-sm)] p-3"
                style={{ background: "var(--muted)" }}
              >
                <div>
                  <p
                    className="text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--tx3)" }}
                  >
                    SHA-256 Fingerprint
                  </p>
                  <p
                    className="mt-1 text-[13px]"
                    style={{ fontFamily: "var(--mono)", color: "var(--foreground)" }}
                  >
                    {result.fingerprint}
                  </p>
                </div>
                <button
                  onClick={copyFingerprint}
                  className="flex h-8 w-8 items-center justify-center rounded-md transition-all cursor-pointer"
                  style={{
                    background: copied ? "var(--verified-light)" : "transparent",
                    color: copied ? "var(--verified)" : "var(--tx3)",
                  }}
                  title="Copy fingerprint"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3">
                <MetaField label="Signed on" value={result.signedOn} />
                <MetaField label="Method" value={result.method} />
                <MetaField label="Document" value={result.docTitle} />
                <MetaField label="Pages" value={result.pages?.toString()} />
              </div>

              {/* Preview CTA */}
              <button
                onClick={() => dispatch({ type: "REQUEST_PREVIEW" })}
                className="cta-shine mt-1 flex w-full items-center justify-center gap-2 rounded-[var(--r-md)] py-3.5 text-[13px] font-semibold transition-all duration-200 hover:-translate-y-px cursor-pointer"
                style={{
                  background: "var(--cta)",
                  color: "var(--cta-fg)",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--cta-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--cta)";
                }}
              >
                <Eye size={14} />
                Preview this document
              </button>
            </div>
          </div>
        )}

        {/* Action buttons for non-verified */}
        {result.status !== "verified" && (
          <div
            className="border border-t-0 bg-white p-5"
            style={{
              borderColor: config.borderColor,
              borderBottomLeftRadius: "var(--radius-card)",
              borderBottomRightRadius: "var(--radius-card)",
            }}
          >
            <div className="flex gap-3">
              <button
                onClick={() => dispatch({ type: "RESET" })}
                className="flex flex-1 items-center justify-center gap-2 rounded-[var(--r-md)] border py-3 text-[13px] font-medium transition-all hover:-translate-y-px cursor-pointer"
                style={{ borderColor: "var(--bd-strong)", color: "var(--foreground)" }}
              >
                <RotateCcw size={14} />
                Try again
              </button>
              {result.status === "revoked" && (
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-[var(--r-md)] py-3 text-[13px] font-semibold text-white transition-all hover:-translate-y-px cursor-pointer"
                  style={{ background: "var(--revoked)" }}
                >
                  <AlertTriangle size={14} />
                  Report fraud
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MetaField({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div
      className="rounded-[var(--r-sm)] p-3"
      style={{ background: "var(--muted)" }}
    >
      <p
        className="text-[9px] font-bold uppercase tracking-widest"
        style={{ color: "var(--tx3)" }}
      >
        {label}
      </p>
      <p className="mt-1 text-[13px] font-medium" style={{ color: "var(--foreground)" }}>
        {value}
      </p>
    </div>
  );
}
