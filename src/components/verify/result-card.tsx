import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Check,
  Copy,
  Eye,
  FileText,
  Fingerprint,
  Lock,
  RotateCcw,
  ShieldCheck,
  Tag,
  UserRound,
} from "lucide-react";
import { useVerify } from "./verify-context";
import type { QuickResult } from "@/api/types";
import { useNavigate } from "react-router";

export function ResultCard({ result }: { result: QuickResult }) {
  const { dispatch } = useVerify();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const fingerprint = result.fingerprint || "";
  const isVerified = result.status === "verified";
  const canPreview = result.previewAvailable !== false;

  function copyFingerprint() {
    if (!fingerprint) return;
    navigator.clipboard.writeText(fingerprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="mx-auto max-w-[720px] rounded-[20px] border bg-white p-8 text-center"
        style={{ borderColor: "#DCE1EA" }}
      >
        <h2 className="text-[28px] font-extrabold" style={{ color: "#191B2A" }}>
          Verification failed
        </h2>
        <p className="mt-3 text-[16px] font-semibold" style={{ color: "#6F7686" }}>
          We could not verify this document. Please check the code or PDF and try
          again.
        </p>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-8 inline-flex items-center gap-2 rounded-[12px] border px-5 py-3 text-[15px] font-bold"
          style={{ borderColor: "#DCE1EA", color: "#191B2A" }}
        >
          <RotateCcw size={17} />
          Try again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto max-w-[1360px] px-4 py-[92px]"
    >
      <div
        className="overflow-hidden rounded-[24px] border bg-white"
        style={{ borderColor: "#DCE1EA" }}
      >
        <div
          className="flex items-center gap-[34px] px-[64px] py-[50px]"
          style={{ background: "#E8F8F2" }}
        >
          <ShieldCheck
            size={58}
            strokeWidth={2.4}
            style={{ color: "#10B981", flexShrink: 0 }}
          />
          <div>
            <span
              className="inline-flex rounded-full border px-[26px] py-[9px] text-[16px] font-extrabold leading-none"
              style={{
                borderColor: "#10B981",
                color: "#10B981",
              }}
            >
              VERIFIED
            </span>
            <h1
              className="mt-[18px] text-[31px] font-extrabold leading-[1.15]"
              style={{ color: "#191B2A", letterSpacing: "-0.03em" }}
            >
              This document is verified
            </h1>
            <p
              className="mt-[13px] text-[20px] font-semibold leading-[1.45]"
              style={{ color: "#6F7686" }}
            >
              The signature record is valid and the document has not been
              tampered with since signing.
            </p>
          </div>
        </div>

        <div className="px-[64px] py-[52px]">
          <div className="space-y-[33px]">
            <MetaRow
              icon={<Fingerprint size={31} />}
              label="Document fingerprint"
              value={fingerprint || "Unavailable"}
              action={
                fingerprint ? (
                  <button
                    onClick={copyFingerprint}
                    className="flex h-10 w-10 items-center justify-center rounded-md transition-colors"
                    style={{ color: "#6F7686" }}
                    title="Copy fingerprint"
                  >
                    {copied ? <Check size={25} /> : <Copy size={25} />}
                  </button>
                ) : null
              }
            />
            <MetaRow
              icon={<Calendar size={31} />}
              label="Signed on"
              value={result.signedOn || "Unavailable"}
            />
            <MetaRow
              icon={<Tag size={31} />}
              label="Purpose"
              value={result.purpose || "Unavailable"}
            />
            <MetaRow
              icon={<FileText size={31} />}
              label="Document"
              value={result.docTitle || "Untitled document"}
            />
            {result.signerInitials && (
              <MetaRow
                icon={<UserRound size={31} />}
                label="Owner"
                value={result.signerInitials}
              />
            )}
          </div>

          {canPreview && (
            <>
              <div
                className="mt-[54px] flex items-center gap-[26px] rounded-[16px] border px-[34px] py-[28px]"
                style={{ background: "#F2F1FF", borderColor: "#D3D2FF" }}
              >
                <Eye size={37} strokeWidth={2.4} style={{ color: "#6568F6" }} />
                <div>
                  <h3
                    className="text-[22px] font-extrabold"
                    style={{ color: "#191B2A" }}
                  >
                    Want to visually verify?
                  </h3>
                  <p
                    className="mt-[12px] text-[18px] font-semibold leading-[1.5]"
                    style={{ color: "#6F7686" }}
                  >
                    Request a secure, read-only preview. The document owner must
                    approve via OTP before it opens.
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch({ type: "REQUEST_PREVIEW" })}
                className="cta-shine mt-[24px] flex w-full items-center justify-center gap-3 rounded-[14px] py-[18px] text-[22px] font-extrabold transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  background: "#6568F6",
                  color: "#FFFFFF",
                }}
              >
                <Eye size={29} />
                Preview This Document
              </button>
            </>
          )}

          {result.uvcCode && (
            <div
              className="mt-[24px] rounded-[12px] px-4 py-3 text-center text-[14px] font-bold"
              style={{ background: "#F6F7F9", color: "#6F7686" }}
            >
              Verification code:{" "}
              <span style={{ color: "#191B2A" }}>{result.uvcCode}</span>
            </div>
          )}

          <div className="mt-[34px] flex flex-wrap items-center justify-center gap-x-[34px] gap-y-3 text-[18px] font-bold">
            <button
              onClick={() => {
                dispatch({ type: "RESET" });
                navigate("/");
              }}
              style={{ color: "#6568F6" }}
            >
              Verify another document
            </button>
            <span style={{ color: "#DCE1EA" }}>•</span>
            <button style={{ color: "#6F7686" }}>
              Copy verification summary
            </button>
          </div>
        </div>

        <div
          className="flex items-center gap-4 border-t px-[64px] py-[26px]"
          style={{ borderColor: "#DCE1EA", color: "#6F7686" }}
        >
          <Lock size={22} />
          <p className="text-[17px] font-semibold">
            Document previews require explicit approval from the document owner
            via OTP. No data is shared without consent.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MetaRow({
  icon,
  label,
  value,
  action,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-start gap-[24px]">
        <div style={{ color: "#6F7686" }}>{icon}</div>
        <div>
          <p className="text-[19px] font-semibold" style={{ color: "#6F7686" }}>
            {label}
          </p>
          <p
            className="mt-[6px] text-[21px] font-extrabold leading-[1.3]"
            style={{ color: "#191B2A" }}
          >
            {value}
          </p>
        </div>
      </div>
      {action}
    </div>
  );
}
