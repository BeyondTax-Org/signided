import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/hero/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { VerifyForm } from "@/components/verify/verify-form";
import { LoadingState } from "@/components/verify/loading-state";
import { ResultCard } from "@/components/verify/result-card";
import { VerifyProvider, useVerify } from "@/components/verify/verify-context";
import { HiwSection } from "@/components/how-it-works/hiw-section";
import { FaqSection } from "@/components/faq/faq-section";
import { PreviewRequest } from "@/components/preview/preview-request";
import { PreviewWaiting } from "@/components/preview/preview-waiting";
import { PreviewApproved } from "@/components/preview/preview-approved";
import { PreviewViewer } from "@/components/preview/preview-viewer";
import { CodeHelpModal } from "@/components/modals/code-help-modal";

function VerifySection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-y px-6 py-16"
      style={{
        background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </div>
  );
}

function HomeContent() {
  const { state } = useVerify();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        {/* <ComplianceBadges /> */}
        <FeaturesGrid />

        <AnimatePresence mode="wait">
          {state.step === "landing" && (
            <VerifyForm
              key="form"
              onOpenHelp={() => setHelpOpen(true)}
            />
          )}
          {state.step === "loading" && (
            <VerifySection key="loading">
              <LoadingState />
            </VerifySection>
          )}
          {(state.step === "quick-result" ||
            state.step === "not-found" ||
            state.step === "expired" ||
            state.step === "revoked") &&
            state.result && (
              <VerifySection key="result">
                <ResultCard result={state.result} />
              </VerifySection>
            )}
          {state.step === "preview-request" && (
            <VerifySection key="preview-req">
              <PreviewRequest />
            </VerifySection>
          )}
          {state.step === "preview-waiting" && (
            <VerifySection key="preview-wait">
              <PreviewWaiting />
            </VerifySection>
          )}
          {state.step === "preview-approved" && (
            <VerifySection key="preview-ok">
              <PreviewApproved />
            </VerifySection>
          )}
          {state.step === "preview-viewer" && (
            <VerifySection key="preview-view">
              <PreviewViewer />
            </VerifySection>
          )}
        </AnimatePresence>

        <HiwSection />
        <FaqSection />
      </main>
      <SiteFooter />

      <CodeHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}

export default function Home() {
  return (
    <VerifyProvider initialStep="landing">
      <HomeContent />
    </VerifyProvider>
  );
}
