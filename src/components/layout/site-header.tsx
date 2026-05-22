import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQs", href: "#faq" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function scrollToSection(
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    event.currentTarget.blur();
    setMobileOpen(false);

    window.setTimeout(() => {
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      const headerOffset = 64;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState(null, "", href);
    }, mobileOpen ? 240 : 0);
  }

  return (
    <header
      className={cn("sticky top-0 z-50 w-full", "backdrop-blur-[12px]")}
      style={{
        background:
          "linear-gradient(180deg, #F8F9FF 0%, #FFFFFF 47%, #F8F9FF 100%)",

        // background: "color-mix(in srgb, var(--background) 92%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between ">
        {/* Left: Logo */}
        <a href="/" className="flex items-center group" style={{marginLeft: "0.3rem"}}>
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
              onClick={(event) => scrollToSection(event, link.href)}
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Aiyug Tech
          </a>
          <a
            href="#verify"
            onClick={(event) => scrollToSection(event, "#verify")}
            className="cta-shine rounded-md text-[0.8rem] font-semibold transition-all duration-200 hover:-translate-y-px no-underline"
            style={{
              background: "#6568F6",
              color: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(62, 66, 168, 0.2)",
              padding: "0.25rem 0.7rem",
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
        <div
          className="flex items-center gap-3 sm:hidden"
          style={{ margin: "0.1rem 0.6rem" }}
        >
          <a
            href="#verify"
            onClick={(event) => scrollToSection(event, "#verify")}
            className="cta-shine rounded-md text-[0.8rem] font-semibold transition-all duration-200 hover:-translate-y-px no-underline"
            style={{
              background: "#6568F6",
              color: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(62, 66, 168, 0.2)",
              padding: "0.25rem 0.7rem",
            }}
          >
            Verify
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              style={{ background: "var(--foreground)" }}
            />
            <span
              className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              style={{ background: "var(--foreground)" }}
            />
            <span
              className={`block h-[2px] w-5 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              style={{ background: "var(--foreground)" }}
            />
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
              // background: "var(--background)",
              // borderBottom: "1px solid var(--border)",
              margin: "0.1rem 1rem"
            }}
          >
            <nav className="flex flex-col gap-1 px-6 py-3" style={{marginBottom: "0.4rem"}}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => scrollToSection(event, link.href)}
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
                className="mt-1"
                // style={{ borderTop: "1px solid var(--border)" }}
              >
                <a
                  href="https://aiyugtech.com"
                  className="flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium "
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
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

/* ShieldMark and AiyugMark SVGs removed — unused after nav refactor */
