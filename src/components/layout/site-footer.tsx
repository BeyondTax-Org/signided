export function SiteFooter() {
  return (
    <footer
      className="px-6 py-12"
      style={{
        background: "var(--dark)",
        borderTop: "1px solid var(--dark-bd)",
      }}
    >
      <div className="mx-auto max-w-[1120px]">
        {/* Main footer row */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: Logo + tagline */}
          <div className="flex items-center gap-2.5">
            <img
              src="/brand/signided-mark-color-dark.svg"
              alt=""
              className="h-6 w-6"
            />
            <span className="text-[13px]" style={{ color: "var(--dark-tx2)" }}>
              <span
                className="font-semibold"
                style={{ color: "var(--dark-tx)" }}
              >
                Sign IDed
              </span>{" "}
              by{" "}
              <a
                href="https://aiyugtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors"
                style={{ color: "var(--am)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--am-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--am)")
                }
              >
                Aiyug
              </a>
            </span>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#verify"
              className="rounded-lg px-5 py-2 text-[13px] font-semibold no-underline transition-colors"
              style={{
                background: "rgba(180, 83, 9, 0.15)",
                color: "#F59E0B",
                border: "1px solid rgba(180, 83, 9, 0.25)",
              }}
            >
              Verify a document
            </a>
            <nav
              className="flex items-center gap-5 text-[13px]"
              style={{ color: "var(--dark-tx2)" }}
            >
              <a
                href="https://doclate.aiyugtech.com"
                className="transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--dark-tx)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--dark-tx2)")
                }
              >
                Doclate
              </a>
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--dark-tx)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--dark-tx2)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div
          className="mt-8 pt-6"
          style={{ borderTop: "1px solid var(--dark-bd)" }}
        >
          <p
            className="text-center text-[11px]"
            style={{ color: "var(--dark-tx2)" }}
          >
            &copy; {new Date().getFullYear()} Aiyug Technologies Pvt. Ltd. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
