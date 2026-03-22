import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQs", href: "#faq" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn("sticky top-0 z-50 w-full", "backdrop-blur-[12px]")}
      style={{
        background: "color-mix(in srgb, var(--background) 92%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-4">
        {/* Left: Logo */}
        <a href="/" className="flex items-center group">
          <img
            src="/brand/signided-by-aiyug-color-light.svg"
            alt="Sign IDed by Aiyug"
            className="h-7 transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </a>

        {/* Right: Desktop nav */}
        <nav className="hidden items-center gap-5 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium transition-colors"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://aiyugtech.com"
            className="text-[13px] font-medium transition-colors flex items-center gap-1"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted-foreground)")
            }
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Aiyug Tech
          </a>
          <a
            href="#verify"
            className="cta-shine rounded-lg px-5 py-2 text-[13px] font-semibold transition-all duration-200 hover:-translate-y-px no-underline"
            style={{
              background: "#1C1917",
              color: "#FFFFFF",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0C0A09";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#1C1917";
            }}
          >
            Verify now
          </a>
        </nav>

        {/* Mobile: CTA + hamburger */}
        <div className="flex items-center gap-3 sm:hidden">
          <a
            href="#verify"
            className="cta-shine rounded-lg px-4 py-1.5 text-[12px] font-semibold no-underline"
            style={{
              background: "#1C1917",
              color: "#FFFFFF",
            }}
          >
            Verify
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} style={{ background: "var(--foreground)" }} />
            <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} style={{ background: "var(--foreground)" }} />
            <span className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} style={{ background: "var(--foreground)" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden sm:hidden"
            style={{
              background: "var(--background)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <nav className="flex flex-col gap-1 px-6 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[var(--r-sm)] px-3 py-2.5 text-[14px] font-medium transition-colors"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--muted)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {link.label}
                </a>
              ))}
              <div
                className="mt-1 pt-2"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <a
                  href="https://aiyugtech.com"
                  className="flex items-center gap-1.5 rounded-[var(--r-sm)] px-3 py-2.5 text-[13px] font-medium transition-colors"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back to Aiyug Tech
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
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
