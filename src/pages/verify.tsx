import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "motion/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { VerifyForm } from "@/components/verify/verify-form";
import { LoadingState } from "@/components/verify/loading-state";
import { ResultCard } from "@/components/verify/result-card";
import { VerifyProvider, useVerify } from "@/components/verify/verify-context";
import { PreviewRequest } from "@/components/preview/preview-request";
import { PreviewWaiting } from "@/components/preview/preview-waiting";
import { PreviewApproved } from "@/components/preview/preview-approved";
import { PreviewViewer } from "@/components/preview/preview-viewer";
import { CodeHelpModal } from "@/components/modals/code-help-modal";
import { verifyUVC } from "@/api/verify";

function VerifyContent() {
  const { state, dispatch } = useVerify();
  const { uvc } = useParams<{ uvc?: string }>();
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    if (uvc && state.step === "input") {
      dispatch({ type: "VERIFY_START" });
      verifyUVC(uvc).then((result) => {
        dispatch({ type: "VERIFY_RESULT", status: result.status, result });
      });
    }
  }, [uvc, state.step, dispatch]);

  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh]">
        <AnimatePresence mode="wait">
          {state.step === "input" && (
            <VerifyForm
              key="form"
              onOpenHelp={() => setHelpOpen(true)}
              initialCode={uvc}
            />
          )}
          {state.step === "loading" && (
            <div key="loading" className="px-6 py-16">
              <LoadingState />
            </div>
          )}
          {(state.step === "quick-result" ||
            state.step === "not-found" ||
            state.step === "expired" ||
            state.step === "revoked") &&
            state.result && (
              <div key="result" className="px-6 py-16" style={{ background: "var(--muted)" }}>
                <ResultCard result={state.result} />
              </div>
            )}
          {state.step === "preview-request" && (
            <div key="prev-req" className="px-6 py-16" style={{ background: "var(--muted)" }}>
              <PreviewRequest />
            </div>
          )}
          {state.step === "preview-waiting" && (
            <div key="prev-wait" className="px-6 py-16" style={{ background: "var(--muted)" }}>
              <PreviewWaiting />
            </div>
          )}
          {state.step === "preview-approved" && (
            <div key="prev-ok" className="px-6 py-16" style={{ background: "var(--muted)" }}>
              <PreviewApproved />
            </div>
          )}
          {state.step === "preview-viewer" && (
            <div key="prev-view" className="px-6 py-16" style={{ background: "var(--muted)" }}>
              <PreviewViewer />
            </div>
          )}
        </AnimatePresence>
      </main>
      <SiteFooter />
      <CodeHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}

export default function Verify() {
  return (
    <VerifyProvider initialStep="input">
      <VerifyContent />
    </VerifyProvider>
  );
}
