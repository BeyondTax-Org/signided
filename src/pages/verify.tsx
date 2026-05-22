import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
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
import type { QuickResult, VerifyStatus } from "@/api/types";
import type { VerifyApiResult } from "@/components/verify/verify-form";

interface VerifyLocationState {
  result?: VerifyApiResult;
  showLoading?: boolean;
}

function formatDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function formatPurpose(value?: string) {
  if (!value) return undefined;
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapApiResult(result: VerifyApiResult): QuickResult {
  const signerEmail = result.signers?.find((signer) => signer.signer_email)
    ?.signer_email;

  return {
    status: result.status as VerifyStatus,
    uvcCode: result.uvc_code,
    fingerprint: result.fingerprint_sha256
      ? `SHA-256: ${result.fingerprint_sha256}`
      : undefined,
    signedOn: formatDate(result.signed_at),
    completedAt: formatDate(result.completed_at),
    expiresAt: result.verification_expires_at,
    purpose: formatPurpose(result.purpose),
    docTitle: result.document_title,
    signerInitials: result.owner_initials,
    requesterEmail: signerEmail || result.requester_email || result.owner_email,
    previewAvailable: result.preview_available,
  };
}

function VerifyContent() {
  const { state, dispatch } = useVerify();
  const { uvc } = useParams<{ uvc?: string }>();
  const location = useLocation();
  const routeState = location.state as VerifyLocationState | null;
  const apiResult = routeState?.result;
  const [showRouteLoading, setShowRouteLoading] = useState(
    Boolean(routeState?.showLoading && apiResult)
  );
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    if (!apiResult) return;
    setShowRouteLoading(Boolean(routeState?.showLoading));
    const timeout = window.setTimeout(() => setShowRouteLoading(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [apiResult, routeState?.showLoading]);

  useEffect(() => {
    if (apiResult) return;
    if (uvc && state.step === "input") {
      dispatch({ type: "VERIFY_START" });
      verifyUVC(uvc).then((result) => {
        dispatch({ type: "VERIFY_RESULT", status: result.status, result });
      });
    }
  }, [apiResult, uvc, state.step, dispatch]);

  if (apiResult) {
    const mappedResult = mapApiResult(apiResult);

    return (
      <>
        <SiteHeader />
        <main className="min-h-[60vh]" style={{ background: "#FAFBFD" }}>
          <AnimatePresence mode="wait">
            {showRouteLoading ? (
              <LoadingState key="route-loading" />
            ) : state.step === "preview-request" ? (
              <PreviewRequest
                key="route-preview-request"
                result={mappedResult}
                onBack={() =>
                  dispatch({
                    type: "VERIFY_RESULT",
                    status: mappedResult.status,
                    result: mappedResult,
                  })
                }
              />
            ) : (
              <ResultCard key="route-result" result={mappedResult} />
            )}
          </AnimatePresence>
        </main>
        <SiteFooter />
      </>
    );
  }

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
