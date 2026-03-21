import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-6 py-16">
        <h1 className="mb-6 text-[26px] font-bold" style={{ letterSpacing: "-0.03em" }}>
          Privacy Policy
        </h1>
        <div className="space-y-4 text-[14px] leading-[1.8]" style={{ color: "var(--tx2)" }}>
          <p>
            Sign IDed is a public verification portal operated by Aiyug
            Technologies Pvt Ltd. This page outlines how we handle your data.
          </p>
          <h2 className="text-[18px] font-semibold" style={{ color: "var(--tx)" }}>
            What we collect
          </h2>
          <p>
            When you verify a document, we process the UVC code or uploaded
            PDF's signature metadata. We do <strong>not</strong> store uploaded
            files — they are processed in memory and discarded immediately.
          </p>
          <h2 className="text-[18px] font-semibold" style={{ color: "var(--tx)" }}>
            Cookies
          </h2>
          <p>
            Sign IDed uses no tracking cookies. We may use essential cookies
            for session management in future updates.
          </p>
          <p>
            For the full Aiyug Technologies privacy policy, visit{" "}
            <a
              href="https://aiyugtech.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
              style={{ color: "var(--am-hover)" }}
            >
              aiyugtech.com/privacy
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
