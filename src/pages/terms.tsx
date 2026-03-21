import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Terms() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-6 py-16">
        <h1 className="mb-6 text-[26px] font-bold" style={{ letterSpacing: "-0.03em" }}>
          Terms of Service
        </h1>
        <div className="space-y-4 text-[14px] leading-[1.8]" style={{ color: "var(--tx2)" }}>
          <p>
            By using Sign IDed, you agree to the following terms. This portal
            is provided as-is by Aiyug Technologies Pvt Ltd.
          </p>
          <h2 className="text-[18px] font-semibold" style={{ color: "var(--tx)" }}>
            Use of service
          </h2>
          <p>
            Sign IDed is a free public tool for verifying the authenticity of
            digitally signed PDFs. You may use it for legitimate verification
            purposes only.
          </p>
          <h2 className="text-[18px] font-semibold" style={{ color: "var(--tx)" }}>
            Limitations
          </h2>
          <p>
            Verification results are based on the data available at the time of
            query. We are not liable for decisions made based on verification
            results.
          </p>
          <p>
            For the full Aiyug Technologies terms, visit{" "}
            <a
              href="https://aiyugtech.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
              style={{ color: "var(--am-hover)" }}
            >
              aiyugtech.com/terms
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
