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
  RotateCcw,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router";
import type { QuickResult } from "@/api/types";
import { useVerify } from "@/components/verify/verify-context";
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
  const { dispatch } = useVerify();
  const navigate = useNavigate();
  // const [step, setStep] = useState<PreviewStep>("approved");
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

  function handleVerifyAnother() {
    dispatch({ type: "RESET" });
    navigate("/");
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
        errorMessage={
          !approveError
            ? ""
            : typeof approveError === "string"
            ? approveError
            : "Error in verifying OTP"
        }
        isSubmitting={isApproving}
        onOtpChange={handleOtpChange}
        onSubmit={handleApprove}
        onBack={() => setStep("request")}
        inputRef={otpInputRef}
      />
    );
  }

  if (step === "approved") {
    return (
      <PreviewApproveSuccess
        approval={approveData}
        onVerifyAnother={handleVerifyAnother}
      />
    );
  }

  return (
    <motion.div
      key="preview-request"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[90%] md:max-w-[50%]"
      style={{ padding: "4rem 0" }}
    >
      <div
        className="overflow-hidden rounded-md border bg-white"
        style={{ borderColor: "#DCE1EA" }}
      >
        <div
          className="flex items-center gap-[1rem] "
          style={{ padding: "1rem 2rem" }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
            style={{ background: "#ECECFF" }}
          >
            <Eye size={20} strokeWidth={2} style={{ color: "#6568F6" }} />
          </div>
          <div>
            <h1
              className="text-[1.1rem] font-[600] leading-[1.1]"
              style={{
                color: "#191B2A",
                letterSpacing: "-0.03em",
                marginBottom: "0.3rem",
              }}
            >
              Request Document Preview
            </h1>
            <p
              className="text-[0.75rem] font-[500] leading-[1.45]"
              style={{ color: "#6F7686" }}
            >
              The document owner must approve before you can view
            </p>
          </div>
        </div>

        <div
          className="border-t "
          style={{ borderColor: "#DCE1EA", padding: "1.2rem 2rem" }}
        >
          <h2 className="text-[0.9rem] font-[600]" style={{ color: "#191B2A" }}>
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
              <div
                key={step.text}
                className="flex items-center gap-3"
                style={{ marginBottom: "0.6rem" }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-[600]"
                  style={{ background: "#ECECFF", color: "#6568F6" }}
                >
                  {index + 1}
                </span>
                <step.icon
                  size={18}
                  strokeWidth={2.1}
                  style={{ color: "#6F7686" }}
                />
                <p
                  className="text-[0.8rem] font-semibold leading-[1.35]"
                  style={{ color: "#6F7686" }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between gap-5 rounded-md "
            style={{
              background: "#F6F7F9",
              margin: "1rem 0",
              padding: "0.8rem ",
            }}
          >
            <div className="flex items-center gap-3">
              <FileText
                size={20}
                strokeWidth={2.1}
                style={{ color: "#6F7686" }}
              />
              <div>
                <h3
                  className="text-[0.9rem] font-[600] leading-[1.25]"
                  style={{ color: "#191B2A" }}
                >
                  {result?.docTitle || "Verified document"}
                </h3>
                <p
                  className="mt-[7px] text-[0.8rem] font-[500]"
                  style={{ color: "#6F7686" }}
                >
                  Signed on {result?.signedOn || "Unavailable"}
                  {result?.pages ? ` · ${result.pages} pages` : ""}
                </p>
              </div>
            </div>
            <span
              className="rounded-full text-[0.7rem] font-[500] leading-none"
              style={{
                background: "#DDF7EC",
                color: "#10B981",
                padding: "0.3rem 0.8rem",
              }}
            >
              VERIFIED
            </span>
          </div>

          <div
            className="rounded-md border "
            style={{
              background: "#FFF8F4",
              borderColor: "#FFD6BD",
              padding: "0.8rem ",
              marginBottom: "1rem",
            }}
          >
            <div className="flex items-start gap-3">
              <Bell size={20} strokeWidth={2} style={{ color: "#F97316" }} />
              <div>
                <h3
                  className="text-[0.9rem] font-[600] leading-[1.25]"
                  style={{ color: "#191B2A" }}
                >
                  Owner notification
                </h3>
                <p
                  className="mt-[7px] text-[0.8rem] font-[500]"
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

          <div className="flex gap-3">
            <button
              onClick={handleRequest}
              disabled={requestDisabled}
              className="cta-shine flex flex-1 items-center justify-center gap-2 rounded-md text-[0.8rem] font-[600]"
              style={{
                background: "#6568F6",
                color: "#FFFFFF",
                opacity: requestDisabled ? 0.72 : 1,
                padding: "0.3rem 0rem",
              }}
            >
              <Send size={18} strokeWidth={2.2} />
              {isRequesting ? "Sending..." : "Send Preview Request"}
            </button>
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-2 rounded-md border  text-[0.8rem] font-[600]"
              style={{
                borderColor: "#DCE1EA",
                color: "#6F7686",
                padding: "0.3rem 0.6rem",
              }}
            >
              <ArrowLeft size={18} />
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
  onVerifyAnother,
}: {
  approval?: PreviewApproveResponse;
  onVerifyAnother: () => void;
}) {
  const previewUrl = approval?.data?.preview_url;

  return (
    <motion.div
      key="preview-approved-success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[90%] md:max-w-[55%] "
      style={{ padding: "4rem 0" }}
    >
      <div
        className="rounded-md border bg-white  text-center"
        style={{ borderColor: "#DCE1EA", padding: "2rem" }}
      >
        <motion.div
          initial={{ scale: 0.82 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 360, damping: 16 }}
          className="mx-auto flex h-13 w-13 items-center justify-center rounded-md"
          style={{ background: "#DDF7EC", marginBottom: "1rem" }}
        >
          <CheckCircle2
            size={24}
            strokeWidth={2}
            style={{ color: "#10B981" }}
          />
        </motion.div>

        <h1
          className="text-[1.8rem] font-[600] leading-[1.12]"
          style={{ color: "#191B2A", letterSpacing: "-0.03em" }}
        >
          Successfully approved
        </h1>
        <p
          className="mx-auto max-w-[520px] text-[1rem] font-[500] leading-[1.5]"
          style={{ color: "#6F7686", marginBottom: "0.8rem" }}
        >
          The OTP has been verified and the document preview request is
          approved.
        </p>

        <div
          className="mx-auto flex max-w-[220px] items-center justify-center gap-3 rounded-md border text-[0.8rem] font-[500]"
          style={{
            background: "#F6FDF9",
            borderColor: "#BFEBD9",
            color: "#10B981",
            padding: "0.3rem 0.3rem",
            marginBottom: "0.8rem",
          }}
        >
          <CheckCircle2 size={20} />
          Owner approval completed
        </div>

        <div
          className="overflow-hidden rounded-md border bg-white text-left"
          style={{ borderColor: "#DCE1EA" }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b "
            style={{ borderColor: "#DCE1EA", background: "#FAFBFD", padding: "0.8rem" }}
          >
            <div>
              <p
                className="text-[1rem] font-[500]"
                style={{ color: "#191B2A" }}
              >
                Document preview
              </p>
              <p
                className="mt-1 text-[12px] font-[500]"
                style={{ color: "#6F7686" }}
              >
                Preview expires in{" "}
                {formatExpiryMinutes(approval?.data?.expires_at)}
              </p>
            </div>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[14px] font-[500]"
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

        <button
          type="button"
          onClick={onVerifyAnother}
          className="mx-auto mt-4 flex items-center justify-center gap-2 rounded-md text-[0.85rem] font-[600] transition-colors hover:bg-[#575AEF]"
          style={{
            background: "#6568F6",
            color: "#FFFFFF",
            padding: "0.45rem 0.8rem",
            marginTop: "1rem"
          }}
        >
          <RotateCcw size={16} />
          Verify another document
        </button>
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
      className="mx-auto max-w-[90%] md:max-w-[55%]"
      style={{ padding: "4rem 0" }}
    >
      <div
        className="rounded-md border bg-white  text-center"
        style={{ borderColor: "#DCE1EA", padding: "2rem 0" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="mx-auto flex h-15 w-15 items-center justify-center rounded-md"
          style={{ background: "#ECECFF" }}
        >
          <div
            className="h-8 w-8 rounded-full border-[3px] border-t-transparent"
            style={{ borderColor: "#6568F6", borderTopColor: "transparent" }}
          />
        </motion.div>

        <h1
          className="text-[1.6rem] font-[600] leading-[1.1]"
          style={{
            color: "#191B2A",
            letterSpacing: "-0.03em",
            marginTop: "1rem",
          }}
        >
          Waiting for owner approval
        </h1>
        <p
          className="mx-auto max-w-[560px] text-[1rem] font-[500] leading-[1.5]"
          style={{ color: "#6F7686", marginTop: "0.2rem" }}
        >
          We've sent an OTP to the document owner. Once they enter the code,
          your preview will open automatically.
        </p>

        <div className="mx-auto max-w-[520px]" style={{ marginTop: "0.6rem" }}>
          <div
            className="flex items-center justify-between text-[1.1rem] font-[500]"
            style={{ marginBottom: "0.1rem" }}
          >
            <span style={{ color: "#6F7686" }}>Owner verification</span>
            <span style={{ color: "#6568F6" }}>82%</span>
          </div>
          <div
            className="h-[12px] overflow-hidden rounded-full"
            style={{ background: "#F0F2FA" }}
          >
            <motion.div
              initial={{ width: "58%" }}
              animate={{ width: "82%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "#6568F6" }}
            />
          </div>
        </div>

        <div
          className="space-y-[22px] text-[1rem] font-[500]"
          style={{ marginTop: "0.8rem" }}
        >
          <StatusLine active label="OTP sent to owner" />
          <StatusLine active muted label="Owner received notification" />
          <StatusLine loading label="Verifying owner OTP..." />
        </div>

        <p
          className="mt-[55px] text-[1rem] font-[500]"
          style={{ color: "#6F7686", marginTop: "0.8rem" }}
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
  errorMessage,
  isSubmitting,
  onOtpChange,
  onSubmit,
  onBack,
  inputRef,
}: {
  request?: PreviewRequestResponse;
  otp: string;
  errorMessage: string;
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
      className="mx-auto max-w-[90%] md:max-w-[55%]"
      style={{ padding: "4rem 0" }}
    >
      <div
        className="rounded-md border bg-white  text-center"
        style={{ borderColor: "#DCE1EA", padding: "2rem" }}
      >
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-md"
          style={{ background: "#ECECFF", marginBottom: "1rem" }}
        >
          <KeyRound size={20} strokeWidth={2.3} style={{ color: "#6568F6" }} />
        </div>

        <h1
          className="text-[1.5rem] font-[600] leading-[1.15]"
          style={{
            color: "#191B2A",
            letterSpacing: "-0.03em",
            marginBottom: "0.2rem",
          }}
        >
          Enter owner OTP
        </h1>
        <p
          className="mx-auto  max-w-[740px] md:max-w-[540px] text-[0.9rem] font-[500] leading-[1.5]"
          style={{ color: "#6F7686", marginBottom: "0.7rem" }}
        >
          Enter the 6 digit code sent to the owner
          {payload?.owner_mobile_hint ? ` at ${payload.owner_mobile_hint}` : ""}
          .
        </p>

        <div className="mx-auto max-w-[95%] md:max-w-[40%]" style={{ marginBottom: "1rem" }}>
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
            className="h-[72px] w-full rounded-md border bg-white text-center text-[2rem] font-[600] outline-none transition-colors"
            style={{
              borderColor: "#DCE1EA",
              color: "#191B2A",
              letterSpacing: "0.35em",
              marginBottom: "0.8rem",
            }}
          />

          <div
            className="flex items-center justify-center gap-2 text-[15px] font-bold"
            style={{ color: "#6F7686" }}
          >
            <Clock size={17} />
            Expires in {formatExpiryMinutes(payload?.expires_at)}
          </div>
        </div>

        {errorMessage && (
          <p
            className="text-[14px] font-bold"
            style={{ color: "var(--revoked)", marginBottom: "0.4rem" }}
          >
            {errorMessage}
          </p>
        )}

        <div className="mt-[36px] flex flex-col gap-4 sm:flex-row">
          <button
            onClick={onSubmit}
            disabled={otp.length !== 6 || isSubmitting}
            className="cta-shine flex flex-1 items-center justify-center gap-2 rounded-md text-[0.8rem] font-[600]"
            style={{
              background: "#6568F6",
              color: "#FFFFFF",
              opacity: otp.length !== 6 || isSubmitting ? 0.7 : 1,
              padding: "0.3rem 0rem",
            }}
          >
            <CheckCircle2 size={18} />
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 rounded-md border  text-[0.8rem] font-[600]"
            style={{
              borderColor: "#DCE1EA",
              color: "#6F7686",
              padding: "0.3rem 0.6rem",
            }}
          >
            <ArrowLeft size={18} />
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
      className="flex items-center justify-center gap-3"
      style={{ color: loading ? "#C4C8D4" : active ? "#6F7686" : "#A8AEBC" }}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-5 w-5 rounded-full border-[3px] border-t-transparent"
          style={{ borderColor: "#C9CEFF", borderTopColor: "transparent" }}
        />
      ) : (
        <CheckCircle2
          size={20}
          strokeWidth={2}
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
