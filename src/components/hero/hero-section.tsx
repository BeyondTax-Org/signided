import { BookOpen, Search, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-5"
      style={{
        background:
          "linear-gradient(180deg, #F8F9FF 0%, #FFFFFF 47%, #F8F9FF 100%)",
        borderColor: "#E6E9F4",
      }}
    >
      <div className="relative mx-auto flex md:min-h-[460px] md:max-w-[1120px] max-w-[90%] flex-col items-center justify-center py-[56px] text-center min-h-[500px] py-[86px]">
        <div
          className="inline-flex animate-fade-in items-center gap-2 rounded-full border"
          style={{
            background: "#FEF2F2",
            borderColor: "rgba(180, 83, 9, 0.15)",
            color: "#B45309",
            padding: "0.35rem 0.65rem",
            marginBottom: "1.5rem",
          }}
        >
          <Shield size={12} strokeWidth={2} />
          <span className="text-[10px] font-bold leading-none">
            Public Verification Portal
          </span>
        </div>

        <h1
          className="animate-fade-in"
          style={{
            maxWidth: "840px",
            color: "#181B2A",
            fontSize: "clamp(2rem, 10vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.12,
            animationDelay: "0.08s",
          }}
        >
          Is that signed document
          <br />
          <span style={{ color: "#B45309" }}>real</span>?
          <br />
          <span style={{ fontSize: "clamp(2rem, 10vw, 52px)" }}>
            Verify it in seconds.
          </span>
        </h1>

        <p
          className="max-w-[900px] animate-fade-in md:text-[0.9rem] font-medium leading-[1.55] "
          style={{
            color: "#6E7484",
            animationDelay: "0.16s",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Check if any Doclate-signed document is genuine, untampered, and still
          valid. Optionally preview it
          <br className="hidden sm:block" /> with the owner's consent. No
          account needed.
        </p>

        <div
          className="mt-[32px] flex w-full animate-fade-in flex-col items-center justify-center gap-3 sm:mt-[43px] sm:w-auto sm:flex-row sm:gap-[15px]"
          style={{ animationDelay: "0.24s" }}
        >
          <a
            href="#verify"
            className="cta-shine inline-flex w-full max-w-[260px] items-center justify-center gap-2.5 rounded-md text-[0.8rem] font-[500] leading-none no-underline transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            style={{
              background: "#B45309",
              color: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(180, 83, 9, 0.2)",
              padding: "0.55rem 0.7rem",
            }}
          >
            <Search size={16} strokeWidth={2.35} />
            Verify a Document
          </a>
          <a
            href="#how-it-works"
            className="inline-flex w-full max-w-[260px] items-center justify-center gap-2.5 rounded-md border bg-white text-[0.8rem] font-[500] leading-none no-underline transition-colors hover:bg-[#F7F8FF] sm:w-auto"
            style={{
              borderColor: "#E0E3EC",
              color: "#181B2A",
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.02)",
              padding: "0.55rem 0.7rem",
            }}
          >
            <BookOpen size={16} strokeWidth={2.05} />
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
