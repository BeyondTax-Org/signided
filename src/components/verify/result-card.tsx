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
  ShieldAlert,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { useVerify } from "./verify-context";
import type { QuickResult } from "@/api/types";
import { useNavigate } from "react-router";

export function ResultCard({ result }: { result: QuickResult }) {
  const { dispatch } = useVerify();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [summaryCopied, setSummaryCopied] = useState(false);

  const fingerprint = result.fingerprint || "";
  const isVerified = result.status === "verified";
  const canPreview = result.previewAvailable !== false;

  function copyFingerprint() {
    if (!fingerprint) return;
    navigator.clipboard.writeText(fingerprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyVerificationSummary() {
    const summaryLines = [
      "Verification summary",
      `Status: ${result.status === "verified" ? "Verified" : result.status}`,
      `Document: ${result.docTitle || "Untitled document"}`,
      `Signed on: ${result.signedOn || "Unavailable"}`,
      `Purpose: ${result.purpose || "Unavailable"}`,
      `Fingerprint: ${fingerprint || "Unavailable"}`,
    ];

    if (result.uvcCode) {
      summaryLines.push(`Verification code: ${result.uvcCode}`);
    }

    navigator.clipboard.writeText(summaryLines.join("\n"));
    setSummaryCopied(true);
    setTimeout(() => setSummaryCopied(false), 2000);
  }

  if (!isVerified) {
    const failedByFile = result.verificationSource === "pdf";
    const failureTitle = failedByFile
      ? "No record found for this file"
      : "No record found for this code";
    const failureMessage = failedByFile
      ? "We couldn't find a signing record matching this uploaded file. Double-check the file and try again - or ask the document issuer for the correct signed PDF."
      : "We couldn't find a signing record matching this verification code. Double-check the code and try again - or ask the document issuer for the correct UVC.";

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="mx-auto flex w-full max-w-[80%] flex-col items-center rounded-md border bg-white text-center md:max-w-[50%]"
        style={{ borderColor: "#DCE1EA", padding: "2rem", marginTop: "4rem" }}
      >
        <div
          className="flex h-15 w-15 items-center justify-center rounded-md sm:h-12 sm:w-12"
          style={{ background: "#FCEAE6", color: "#F37A32" }}
        >
          <ShieldAlert size={20} strokeWidth={2.2} />
        </div>
        <h2
          className="mt-10 text-[clamp(1.2rem,4vw,0.8rem)] font-[600] leading-tight"
          style={{
            color: "#191B2A",
            marginTop: "0.8rem",
            marginBottom: "0.5rem",
          }}
        >
          {failureTitle}
        </h2>
        <p
          className=" max-w-[580px] text-[clamp(0.75rem,2vw,0.8rem)] font-semibold leading-[1.45]"
          style={{ color: "#6F7686", marginBottom: "0.5rem" }}
        >
          {failureMessage}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              navigate("/");
            }}
            className="inline-flex  items-center justify-center rounded-md  text-[0.9rem] font-[500] transition-colors hover:bg-[#92400E]"
            style={{
              background: "#B45309",
              color: "#FFFFFF",
              padding: "0.3rem 0.5rem",
            }}
          >
            Try again
          </button>
          <button
            className="inline-flex  items-center justify-center  text-[0.9rem] font-[500] transition-colors hover:text-[#191B2A]"
            style={{ color: "#6F7686", padding: "0.3rem 0.5rem" }}
          >
            Report an issue
          </button>
        </div>
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
      className="mx-auto max-w-[90%] md:max-w-[50%]"
      style={{ padding: "4rem 0" }}
    >
      <div
        className="overflow-hidden rounded-md border bg-white"
        style={{ borderColor: "#DCE1EA" }}
      >
        <div
          className="flex items-center gap-[1rem]"
          style={{ background: "#E8F8F2", padding: "1rem 2rem" }}
        >
          <ShieldCheck
            size={24}
            strokeWidth={2}
            style={{ color: "#10B981", flexShrink: 0 }}
          />
          <div>
            <span
              className="inline-flex rounded-full border text-[0.55rem] font-[500] leading-none"
              style={{
                borderColor: "#10B981",
                color: "#10B981",
                padding: "0.25rem 0.45rem",
                marginBottom: "0.6rem",
              }}
            >
              VERIFIED
            </span>
            <h1
              className="text-[1.1rem] font-[600] leading-[1.15]"
              style={{
                color: "#191B2A",
                letterSpacing: "-0.03em",
                marginBottom: "0.2rem",
              }}
            >
              This document is verified
            </h1>
            <p
              className="text-[0.75rem] font-[500] leading-[1.45]"
              style={{ color: "#6F7686" }}
            >
              The signature record is valid and the document has not been
              tampered with since signing.
            </p>
          </div>
        </div>

        <div className="" style={{ padding: "1.5rem 2rem" }}>
          <div className="space-y-2">
            <MetaRow
              icon={<Fingerprint size={20} />}
              label="Document fingerprint"
              value={fingerprint || "Unavailable"}
              action={
                fingerprint ? (
                  <button
                    onClick={copyFingerprint}
                    className="flex h-4 w-4 items-center justify-center rounded-md transition-colors"
                    style={{ color: "#6F7686" }}
                    title="Copy fingerprint"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                ) : null
              }
            />
            <MetaRow
              icon={<Calendar size={20} />}
              label="Signed on"
              value={result.signedOn || "Unavailable"}
            />
            <MetaRow
              icon={<Tag size={20} />}
              label="Purpose"
              value={result.purpose || "Unavailable"}
            />
            <MetaRow
              icon={<FileText size={20} />}
              label="Document"
              value={result.docTitle || "Untitled document"}
            />
            {/* {result.signerInitials && (
              <MetaRow
                icon={<UserRound size={20} />}
                label="Owner"
                value={result.signerInitials}
              />
            )} */}
          </div>

          {canPreview && (
            <>
              <div
                className="mt-[54px] flex items-center gap-[1rem] rounded-md border "
                style={{
                  background: "rgba(180, 83, 9, 0.08)",
                  borderColor: "#FEF3C7",
                  padding: "0.6rem 0.8rem",
                }}
              >
                <Eye size={20} strokeWidth={2} style={{ color: "#B45309" }} />
                <div>
                  <h3
                    className="text-[0.85rem] font-[600]"
                    style={{ color: "#191B2A" }}
                  >
                    Want to visually verify?
                  </h3>
                  <p
                    className="mt-[10px] text-[0.75rem] font-[500] leading-[1.5]"
                    style={{ color: "#6F7686" }}
                  >
                    Request a secure, read-only preview. The document owner must
                    approve via OTP before it opens.
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch({ type: "REQUEST_PREVIEW" })}
                className="cta-shine flex w-full items-center justify-center gap-3 rounded-md text-[0.9rem] font-[600] transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  background: "#B45309",
                  color: "#FFFFFF",
                  marginTop: "0.8rem",
                  padding: "0.4rem 0rem",
                }}
              >
                <Eye size={20} />
                Preview This Document
              </button>
            </>
          )}

          {/* {result.uvcCode && (
            <div
              className="mt-[24px] rounded-[12px] px-4 py-3 text-center text-[14px] font-bold"
              style={{ background: "#F6F7F9", color: "#6F7686" }}
            >
              Verification code:{" "}
              <span style={{ color: "#191B2A" }}>{result.uvcCode}</span>
            </div>
          )} */}

          <div
            className="flex flex-wrap items-center justify-center gap-x-[28px] gap-y-3 text-[0.75rem] font-[500]"
            style={{ marginTop: "0.6rem" }}
          >
            <button
              onClick={() => {
                dispatch({ type: "RESET" });
                navigate("/");
              }}
              style={{ color: "#B45309" }}
            >
              Verify another document
            </button>
            <span style={{ color: "#DCE1EA" }}>•</span>
            <button
              onClick={copyVerificationSummary}
              style={{ color: summaryCopied ? "#10B981" : "#6F7686" }}
            >
              {summaryCopied ? "Summary copied" : "Copy verification summary"}
            </button>
          </div>
        </div>

        <div
          className="flex items-center gap-2 border-t "
          style={{
            borderColor: "#DCE1EA",
            color: "#6F7686",
            padding: "0.8rem 2rem",
          }}
        >
          <Lock size={14} />
          <p className="text-[0.7rem] font-[500]">
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
    <div className="flex items-center md:justify-between gap-5">
      <div
        className="flex items-start gap-2.5"
        style={{ marginBottom: "0.8rem" }}
      >
        <div style={{ color: "#6F7686" }}>{icon}</div>
        <div>
          <p className="text-[0.75rem] font-[500] " style={{ color: "#6F7686" }}>
            {label}
          </p>
          <p
            className="text-[0.75rem] font-[600] leading-[1.3]"
            style={{ color: "#191B2A", marginTop: "0.1rem" }}
          >
            {value}
          </p>
        </div>
      </div>
      {action}
    </div>
  );
}
