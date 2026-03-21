import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Security() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[720px] px-6 py-16">
        <h1 className="mb-6 text-[26px] font-bold" style={{ letterSpacing: "-0.03em" }}>
          Security
        </h1>
        <div className="space-y-4 text-[14px] leading-[1.8]" style={{ color: "var(--tx2)" }}>
          <p>
            Sign IDed takes security seriously. Here's how we protect your
            verification process.
          </p>
          <h2 className="text-[18px] font-semibold" style={{ color: "var(--tx)" }}>
            Data handling
          </h2>
          <p>
            Uploaded PDFs are processed in-memory only and never stored on our
            servers. Verification codes are checked against our signature ledger
            without retaining query history.
          </p>
          <h2 className="text-[18px] font-semibold" style={{ color: "var(--tx)" }}>
            Cryptographic verification
          </h2>
          <p>
            All signatures are verified using SHA-256 fingerprinting, aligned
            with the IT Act 2000 §3A requirements for electronic signatures in
            India.
          </p>
          <h2 className="text-[18px] font-semibold" style={{ color: "var(--tx)" }}>
            Report a vulnerability
          </h2>
          <p>
            Found a security issue? Email{" "}
            <a
              href="mailto:security@aiyugtech.com"
              className="font-semibold underline"
              style={{ color: "var(--am-hover)" }}
            >
              security@aiyugtech.com
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
