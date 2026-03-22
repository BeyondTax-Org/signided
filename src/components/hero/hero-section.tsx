import { DocumentMockup } from "./document-mockup";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-20 pb-12"
      style={{ background: "var(--background)" }}
    >
      <div className="relative mx-auto max-w-[680px] text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 animate-fade-in"
          style={{
            background: "var(--muted)",
            borderColor: "var(--border)",
          }}
        >
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Public verification portal
          </span>
        </div>

        {/* Shield mark */}
        <div className="mb-5 flex justify-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <img
            src="/brand/signided-mark-color-light.svg"
            alt="Sign IDed"
            className="h-14 w-14"
          />
        </div>

        {/* H1 */}
        <h1
          className="mb-4 animate-fade-in"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "var(--foreground)",
            animationDelay: "0.15s",
          }}
        >
          Is that signed document real?
        </h1>

        {/* Sub */}
        <p
          className="mb-5 animate-fade-in"
          style={{
            fontSize: "clamp(20px, 3vw, 26px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            color: "var(--am)",
            animationDelay: "0.25s",
          }}
        >
          Verify it in seconds.
        </p>

        {/* Description */}
        <p
          className="mx-auto mb-6 max-w-[480px] leading-[1.7] animate-fade-in"
          style={{ fontSize: "15px", color: "var(--muted-foreground)", animationDelay: "0.35s" }}
        >
          Enter the unique verification code printed on any Aiyug-signed PDF
          — or upload the file directly. Instant results. No account needed.
        </p>

        {/* CTA */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <a
            href="#verify"
            className="cta-shine inline-flex items-center rounded-xl px-8 py-3.5 text-[15px] font-semibold no-underline hover:scale-[1.03] active:scale-[0.97] transition-transform"
            style={{
              background: "#1C1917",
              color: "#FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Verify a document
          </a>
        </div>
      </div>

      {/* Document mockup */}
      <div className="mx-auto mt-10 max-w-[320px] sm:max-w-[360px] animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <DocumentMockup />
      </div>
    </section>
  );
}
