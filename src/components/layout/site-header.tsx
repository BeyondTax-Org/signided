import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "backdrop-blur-[12px]"
      )}
      style={{
        background: "color-mix(in srgb, var(--background) 92%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <ShieldMark />
          <span className="text-[15px] tracking-[-0.01em]">
            <span className="font-bold" style={{ color: "var(--foreground)" }}>
              Sign
            </span>
            <span className="font-bold" style={{ color: "var(--am)" }}>
              IDed
            </span>
          </span>
          <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>
            by
          </span>
          <AiyugMark />
        </a>

        {/* Right: Nav */}
        <nav className="flex items-center gap-5">
          <a
            href="#how-it-works"
            className="hidden text-[13px] font-medium transition-colors sm:block"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted-foreground)")
            }
          >
            How it works
          </a>
          <a
            href="#faq"
            className="hidden text-[13px] font-medium transition-colors sm:block"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted-foreground)")
            }
          >
            FAQs
          </a>
          <a
            href="#verify"
            className="cta-shine rounded-[var(--r-sm)] px-[18px] py-[7px] text-[12px] font-semibold transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "var(--cta)",
              color: "var(--cta-fg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--cta-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--cta)";
            }}
          >
            Verify now
          </a>
        </nav>
      </div>
    </header>
  );
}

function ShieldMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-200 group-hover:scale-[1.08]"
    >
      <rect width="28" height="28" rx="6" fill="var(--am-bg)" />
      <path
        d="M14 5L7 8.5V13.5C7 18.2 9.9 22.5 14 23.5C18.1 22.5 21 18.2 21 13.5V8.5L14 5Z"
        fill="var(--am)"
        opacity="0.9"
      />
      <path
        d="M12 14.5L13.5 16L17 12.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AiyugMark() {
  return (
    <svg
      width="50"
      height="16"
      viewBox="0 0 50 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="12"
        fill="var(--muted-foreground)"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font)"
      >
        Aiyug
      </text>
    </svg>
  );
}
