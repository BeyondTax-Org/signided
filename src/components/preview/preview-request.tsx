import { motion } from "motion/react";
import { Lock, Smartphone, Eye } from "lucide-react";
import { useVerify } from "@/components/verify/verify-context";
import { requestPreview, waitForApproval } from "@/api/preview";

export function PreviewRequest() {
  const { dispatch } = useVerify();

  async function handleRequest() {
    dispatch({ type: "PREVIEW_WAITING" });
    const session = await requestPreview();
    const result = await waitForApproval(session.sessionId);
    if (result.status === "approved") {
      dispatch({ type: "PREVIEW_APPROVED" });
      setTimeout(() => dispatch({ type: "OPEN_VIEWER" }), 2000);
    }
  }

  return (
    <motion.div
      key="preview-request"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[480px]"
    >
      <div
        className="rounded-[var(--r-lg)] border bg-white p-6"
        style={{ borderColor: "var(--bd)", boxShadow: "var(--shadow-md)" }}
      >
        <h3
          className="mb-4 text-center text-[18px] font-bold"
          style={{ letterSpacing: "-0.02em" }}
        >
          Request document preview
        </h3>
        <p
          className="mb-6 text-center text-[13px] leading-[1.6]"
          style={{ color: "var(--tx2)" }}
        >
          The document owner will receive a one-time passcode. Once they
          approve, you get 15 minutes of read-only access.
        </p>

        <div className="mb-6 space-y-2.5">
          {[
            { icon: <Lock size={16} />, text: "We send an OTP to the document owner" },
            { icon: <Smartphone size={16} />, text: "Owner enters the OTP to approve" },
            { icon: <Eye size={16} />, text: "You get 15 min read-only, watermarked preview" },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-[var(--r-sm)] p-3"
              style={{ background: "var(--bg2)" }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-md"
                style={{ background: "var(--am-bg)", color: "var(--am)", flexShrink: 0 }}
              >
                {step.icon}
              </div>
              <span className="text-[12px]" style={{ color: "var(--tx2)" }}>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleRequest}
          className="cta-shine w-full rounded-[var(--r-md)] py-3.5 text-[14px] font-semibold transition-all duration-200 hover:-translate-y-[2px] cursor-pointer"
          style={{
            background: "var(--am)",
            color: "var(--am-cta-fg)",
            boxShadow: "var(--shadow-sm)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--am-hover)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow = "var(--shadow-am)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--am)";
            e.currentTarget.style.color = "var(--am-cta-fg)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          }}
        >
          Send preview request
        </button>

        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-3 w-full py-2 text-[13px] font-medium transition-colors cursor-pointer"
          style={{ color: "var(--tx3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--tx2)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--tx3)")}
        >
          Cancel \u2014 verify another
        </button>
      </div>
    </motion.div>
  );
}
