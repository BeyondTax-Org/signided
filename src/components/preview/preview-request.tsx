import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Clock,
  Eye,
  FileKey2,
  FileText,
  KeyRound,
  Send,
} from "lucide-react";
import type { QuickResult } from "@/api/types";
import usePostPreviewRequest, {
  type PreviewRequestResponse,
} from "@/components/verify/data/usePostPreviewRequest";
import usePostPreviewReqApprove, {
  type PreviewApproveResponse,
} from "@/components/verify/data/usePostPreviewReqAprrove";

interface PreviewRequestProps {
  result?: QuickResult;
  onBack?: () => void;
}

const DEFAULT_REASON = "Statutory audit cross-check";
type PreviewStep = "request" | "waiting" | "otp" | "approved";

function maskEmail(email?: string) {
  if (!email || !email.includes("@")) return "registered contact";
  const [name = "", domain = ""] = email.split("@");
  const domainParts = domain.split(".");
  const domainName = domainParts[0] || "";
  const tld = domainParts.slice(1).join(".");
  return `${name.slice(0, 1)}•••@${domainName.slice(0, 1)}•••${tld ? `.${tld}` : ""}`;
}

export function PreviewRequest({ result, onBack }: PreviewRequestProps) {
  const [step, setStep] = useState<PreviewStep>("request");
  const [otp, setOtp] = useState("");
  const otpInputRef = useRef<HTMLInputElement>(null);
  const [requestData, requestError, isRequesting, postPreviewRequest] =
    usePostPreviewRequest();
  const [approveData, approveError, isApproving, postPreviewReqApprove] =
    usePostPreviewReqApprove();

  useEffect(() => {
    if (!requestData?.data?.grant_id) return;

    setStep("waiting");
    const timer = window.setTimeout(() => setStep("otp"), 2200);
    return () => window.clearTimeout(timer);
  }, [requestData]);

  useEffect(() => {
    if (step !== "otp") return;
    otpInputRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (!approveData) return;
    setStep("approved");
  }, [approveData]);

  function handleRequest() {
    if (!result?.uvcCode || !result?.requesterEmail) return;

    postPreviewRequest({
      uvc_code: result.uvcCode,
      requester_email: result.requesterEmail,
      reason: DEFAULT_REASON,
    });
  }

  function handleOtpChange(value: string) {
    setOtp(value.replace(/\D/g, "").slice(0, 6));
  }

  function handleApprove() {
    if (!requestData?.data?.grant_id || otp.length !== 6) return;
    postPreviewReqApprove(requestData.data?.grant_id, {
      otp,
      otp_session_id: requestData.data?.otp_session_id,
    });
  }

  const requestDisabled =
    isRequesting || !result?.uvcCode || !result?.requesterEmail;

  if (step === "waiting") {
    return <OwnerWaiting request={requestData} />;
  }

  if (step === "otp") {
    return (
      <OwnerOtpEntry
        request={requestData}
        otp={otp}
        error={Boolean(approveError)}
        isSubmitting={isApproving}
        onOtpChange={handleOtpChange}
        onSubmit={handleApprove}
        onBack={() => setStep("request")}
        inputRef={otpInputRef}
      />
    );
  }

  if (step === "approved") {
    return <PreviewApproveSuccess approval={approveData} />;
  }

  return (
    <motion.div
      key="preview-request"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[1360px] px-4 py-[84px]"
    >
      <div
        className="overflow-hidden rounded-[24px] border bg-white"
        style={{ borderColor: "#DCE1EA" }}
      >
        <div className="flex items-center gap-[24px] px-[64px] py-[42px]">
          <div
            className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[20px]"
            style={{ background: "#ECECFF" }}
          >
            <Eye size={38} strokeWidth={2.4} style={{ color: "#6568F6" }} />
          </div>
          <div>
            <h1
              className="text-[31px] font-extrabold leading-[1.1]"
              style={{ color: "#191B2A", letterSpacing: "-0.03em" }}
            >
              Request Document Preview
            </h1>
            <p
              className="mt-[11px] text-[20px] font-semibold"
              style={{ color: "#6F7686" }}
            >
              The document owner must approve before you can view
            </p>
          </div>
        </div>

        <div className="border-t px-[64px] py-[48px]" style={{ borderColor: "#DCE1EA" }}>
          <h2
            className="text-[22px] font-extrabold"
            style={{ color: "#191B2A" }}
          >
            Here's what will happen:
          </h2>

          <div className="mt-[28px] space-y-[24px]">
            {[
              {
                icon: Send,
                text: "We'll send an OTP to the document owner's or signer's registered phone/email.",
              },
              {
                icon: KeyRound,
                text: "The owner enters the OTP to approve your preview request.",
              },
              {
                icon: FileKey2,
                text: "Once approved, a read-only preview opens in Doclate (valid for 15 minutes).",
              },
            ].map((step, index) => (
              <div key={step.text} className="flex items-center gap-[22px]">
                <span
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full text-[16px] font-extrabold"
                  style={{ background: "#ECECFF", color: "#6568F6" }}
                >
                  {index + 1}
                </span>
                <step.icon size={30} strokeWidth={2.1} style={{ color: "#6F7686" }} />
                <p
                  className="text-[22px] font-semibold leading-[1.35]"
                  style={{ color: "#6F7686" }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-[40px] flex items-center justify-between gap-5 rounded-[16px] px-[34px] py-[29px]"
            style={{ background: "#F6F7F9" }}
          >
            <div className="flex items-center gap-[24px]">
              <FileText size={42} strokeWidth={2.1} style={{ color: "#6F7686" }} />
              <div>
                <h3
                  className="text-[23px] font-extrabold leading-[1.25]"
                  style={{ color: "#191B2A" }}
                >
                  {result?.docTitle || "Verified document"}
                </h3>
                <p
                  className="mt-[7px] text-[19px] font-semibold"
                  style={{ color: "#6F7686" }}
                >
                  Signed on {result?.signedOn || "Unavailable"}
                  {result?.pages ? ` · ${result.pages} pages` : ""}
                </p>
              </div>
            </div>
            <span
              className="rounded-full px-[24px] py-[10px] text-[17px] font-extrabold leading-none"
              style={{ background: "#DDF7EC", color: "#10B981" }}
            >
              VERIFIED
            </span>
          </div>

          <div
            className="mt-[40px] rounded-[16px] border px-[33px] py-[30px]"
            style={{ background: "#FFF8F4", borderColor: "#FFD6BD" }}
          >
            <div className="flex items-start gap-[18px]">
              <Bell size={29} strokeWidth={2.1} style={{ color: "#F97316" }} />
              <div>
                <h3
                  className="text-[22px] font-extrabold"
                  style={{ color: "#191B2A" }}
                >
                  Owner notification
                </h3>
                <p
                  className="mt-[20px] text-[19px] font-semibold leading-[1.55]"
                  style={{ color: "#6F7686" }}
                >
                  An OTP will be sent to the document signer's registered
                  contact:{" "}
                  <span style={{ color: "#191B2A" }}>
                    {maskEmail(result?.requesterEmail)}
                  </span>
                  . They must approve within 10 minutes or the request expires.
                </p>
              </div>
            </div>
          </div>

          {Boolean(requestError) && (
            <p
              className="mt-4 text-center text-[14px] font-bold"
              style={{ color: "var(--revoked)" }}
            >
              Error in sending preview request
            </p>
          )}

          <div className="mt-[40px] flex gap-[24px]">
            <button
              onClick={handleRequest}
              disabled={requestDisabled}
              className="cta-shine flex flex-1 items-center justify-center gap-4 rounded-[14px] py-[18px] text-[23px] font-extrabold"
              style={{
                background: "#6568F6",
                color: "#FFFFFF",
                opacity: requestDisabled ? 0.72 : 1,
              }}
            >
              <Send size={31} strokeWidth={2.2} />
              {isRequesting ? "Sending..." : "Send Preview Request"}
            </button>
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-4 rounded-[14px] border px-[30px] text-[23px] font-extrabold"
              style={{ borderColor: "#DCE1EA", color: "#6F7686" }}
            >
              <ArrowLeft size={30} />
              Back
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewApproveSuccess({
  approval,
}: {
  approval?: PreviewApproveResponse;
}) {
  const previewUrl = approval?.data?.preview_url;

  return (
    <motion.div
      key="preview-approved-success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[1120px] px-4 py-[84px]"
    >
      <div
        className="rounded-[24px] border bg-white px-[24px] py-[44px] text-center sm:px-[48px]"
        style={{ borderColor: "#DCE1EA" }}
      >
        <motion.div
          initial={{ scale: 0.82 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 360, damping: 16 }}
          className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-[24px]"
          style={{ background: "#DDF7EC" }}
        >
          <CheckCircle2 size={54} strokeWidth={2.4} style={{ color: "#10B981" }} />
        </motion.div>

        <h1
          className="mt-[32px] text-[36px] font-extrabold leading-[1.12]"
          style={{ color: "#191B2A", letterSpacing: "-0.03em" }}
        >
          Successfully approved
        </h1>
        <p
          className="mx-auto mt-[15px] max-w-[620px] text-[20px] font-semibold leading-[1.5]"
          style={{ color: "#6F7686" }}
        >
          The OTP has been verified and the document preview request is approved.
        </p>

        <div
          className="mx-auto mt-[36px] flex max-w-[500px] items-center justify-center gap-3 rounded-[16px] border px-5 py-4 text-[17px] font-bold"
          style={{ background: "#F6FDF9", borderColor: "#BFEBD9", color: "#10B981" }}
        >
          <CheckCircle2 size={23} />
          Owner approval completed
        </div>

        <div
          className="mt-[36px] overflow-hidden rounded-[18px] border bg-white text-left"
          style={{ borderColor: "#DCE1EA" }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4"
            style={{ borderColor: "#DCE1EA", background: "#FAFBFD" }}
          >
            <div>
              <p className="text-[16px] font-extrabold" style={{ color: "#191B2A" }}>
                Document preview
              </p>
              <p className="mt-1 text-[13px] font-bold" style={{ color: "#6F7686" }}>
                Preview expires in {formatExpiryMinutes(approval?.data?.expires_at)}
              </p>
            </div>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[14px] font-extrabold"
                style={{ color: "#6568F6" }}
              >
                Open in new tab
              </a>
            )}
          </div>

          {previewUrl ? (
            <iframe
              title="Approved document preview"
              src={previewUrl}
              className="h-[680px] w-full bg-white"
              style={{ border: 0 }}
            />
          ) : (
            <div
              className="flex min-h-[280px] items-center justify-center px-6 text-center text-[16px] font-bold"
              style={{ color: "#6F7686" }}
            >
              Preview URL was not returned. Please try approving again.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function OwnerWaiting({ request }: { request?: PreviewRequestResponse }) {
  const payload = request?.data;

  return (
    <motion.div
      key="owner-waiting"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[1360px] px-4 py-[96px]"
    >
      <div
        className="rounded-[24px] border bg-white px-4 py-[82px] text-center sm:px-8"
        style={{ borderColor: "#DCE1EA" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="mx-auto flex h-[110px] w-[110px] items-center justify-center rounded-[28px]"
          style={{ background: "#ECECFF" }}
        >
          <div
            className="h-[48px] w-[48px] rounded-full border-[6px] border-t-transparent"
            style={{ borderColor: "#6568F6", borderTopColor: "transparent" }}
          />
        </motion.div>

        <h1
          className="mt-[48px] text-[38px] font-extrabold leading-[1.1]"
          style={{ color: "#191B2A", letterSpacing: "-0.03em" }}
        >
          Waiting for owner approval
        </h1>
        <p
          className="mx-auto mt-[25px] max-w-[760px] text-[23px] font-semibold leading-[1.5]"
          style={{ color: "#6F7686" }}
        >
          We've sent an OTP to the document owner. Once they enter the code,
          your preview will open automatically.
        </p>

        <div className="mx-auto mt-[48px] max-w-[620px]">
          <div className="mb-[18px] flex items-center justify-between text-[20px] font-extrabold">
            <span style={{ color: "#6F7686" }}>Owner verification</span>
            <span style={{ color: "#6568F6" }}>82%</span>
          </div>
          <div className="h-[16px] overflow-hidden rounded-full" style={{ background: "#F0F2FA" }}>
            <motion.div
              initial={{ width: "58%" }}
              animate={{ width: "82%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "#6568F6" }}
            />
          </div>
        </div>

        <div className="mt-[48px] space-y-[22px] text-[21px] font-bold">
          <StatusLine active label="OTP sent to owner" />
          <StatusLine active muted label="Owner received notification" />
          <StatusLine loading label="Verifying owner OTP..." />
        </div>

        <p
          className="mt-[55px] text-[18px] font-bold"
          style={{ color: "#6F7686" }}
        >
          This request expires in {formatExpiryMinutes(payload?.expires_at)}.
          Don't close this page.
        </p>
      </div>
    </motion.div>
  );
}

function OwnerOtpEntry({
  request,
  otp,
  error,
  isSubmitting,
  onOtpChange,
  onSubmit,
  onBack,
  inputRef,
}: {
  request?: PreviewRequestResponse;
  otp: string;
  error: boolean;
  isSubmitting: boolean;
  onOtpChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const payload = request?.data;

  return (
    <motion.div
      key="owner-otp"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[900px] px-4 py-[96px]"
    >
      <div
        className="rounded-[24px] border bg-white px-[28px] py-[54px] text-center sm:px-[64px]"
        style={{ borderColor: "#DCE1EA" }}
      >
        <div
          className="mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-[22px]"
          style={{ background: "#ECECFF" }}
        >
          <KeyRound size={40} strokeWidth={2.3} style={{ color: "#6568F6" }} />
        </div>

        <h1
          className="mt-[30px] text-[34px] font-extrabold leading-[1.15]"
          style={{ color: "#191B2A", letterSpacing: "-0.03em" }}
        >
          Enter owner OTP
        </h1>
        <p
          className="mx-auto mt-[14px] max-w-[640px] text-[19px] font-semibold leading-[1.5]"
          style={{ color: "#6F7686" }}
        >
          Enter the 6 digit code sent to the owner
          {payload?.owner_mobile_hint ? ` at ${payload.owner_mobile_hint}` : ""}.
        </p>

        <div className="mx-auto mt-[36px] max-w-[430px]">
          <input
            ref={inputRef}
            value={otp}
            onChange={(event) => onOtpChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit();
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            className="h-[72px] w-full rounded-[16px] border bg-white text-center text-[34px] font-extrabold outline-none transition-colors"
            style={{
              borderColor: "#DCE1EA",
              color: "#191B2A",
              letterSpacing: "0.35em",
            }}
          />

          <div
            className="mt-[18px] flex items-center justify-center gap-2 text-[15px] font-bold"
            style={{ color: "#6F7686" }}
          >
            <Clock size={17} />
            Expires in {formatExpiryMinutes(payload?.expires_at)}
          </div>
        </div>

        {error && (
          <p className="mt-4 text-[14px] font-bold" style={{ color: "var(--revoked)" }}>
            Error in verifying OTP
          </p>
        )}

        <div className="mt-[36px] flex flex-col gap-4 sm:flex-row">
          <button
            onClick={onSubmit}
            disabled={otp.length !== 6 || isSubmitting}
            className="cta-shine flex flex-1 items-center justify-center gap-3 rounded-[14px] py-[18px] text-[21px] font-extrabold"
            style={{
              background: "#6568F6",
              color: "#FFFFFF",
              opacity: otp.length !== 6 || isSubmitting ? 0.7 : 1,
            }}
          >
            <CheckCircle2 size={27} />
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-3 rounded-[14px] border px-[28px] py-[18px] text-[21px] font-extrabold"
            style={{ borderColor: "#DCE1EA", color: "#6F7686" }}
          >
            <ArrowLeft size={26} />
            Back
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatusLine({
  label,
  active,
  muted,
  loading,
}: {
  label: string;
  active?: boolean;
  muted?: boolean;
  loading?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-center gap-[16px]"
      style={{ color: loading ? "#C4C8D4" : active ? "#6F7686" : "#A8AEBC" }}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-[23px] w-[23px] rounded-full border-[3px] border-t-transparent"
          style={{ borderColor: "#C9CEFF", borderTopColor: "transparent" }}
        />
      ) : (
        <CheckCircle2
          size={28}
          strokeWidth={2.2}
          style={{ color: muted ? "#8DDFC2" : "#10B981" }}
        />
      )}
      <span>{label}</span>
    </div>
  );
}

function formatExpiryMinutes(value?: string) {
  if (!value) return "10 minutes";
  const expiresAt = new Date(value).getTime();
  if (Number.isNaN(expiresAt)) return "10 minutes";
  const minutes = Math.max(1, Math.ceil((expiresAt - Date.now()) / 60000));
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}
