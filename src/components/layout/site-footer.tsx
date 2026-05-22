export function SiteFooter() {
  return (
    <footer
      className=""
      style={{
        background: "#FAFBFD",
        borderTop: "1px solid var(--dark-bd)",
        padding: "1.1rem 0.2rem"
      }}
    >
      <div className="mx-auto max-w-[1120px] px-3 sm:px-0">
        {/* Main footer row */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: Logo + tagline */}
          <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 text-center sm:justify-start sm:text-left">
            <img
              src="/brand/signided-mark-color-dark.svg"
              alt=""
              className="h-6 w-6"
            />
            <span className="text-[12px] sm:text-[13px]" style={{ color: "black" }}>
              <span className="font-[600]" style={{ color: "black" }}>
                Sign IDed
              </span>{" "}
              <span className="font-[500]">by</span>
              <a
                href="https://aiyugtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[500] transition-colors text-[11px] text-gray-700"
                style={{ color: "gray" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--am-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--am)")
                }
              >
                — A public verification portal by{" "}
                <span className="text-black font-[600]">Aiyug Workspace </span>(Aiyug Tech)
              </a>
            </span>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#verify"
              className="rounded-lg text-[12px] font-[500] no-underline transition-colors"
              style={{
                background: "rgba(238, 241, 250, 0.85)",
                color: "#6568F6",
                border: "1px solid #6568F6",
                padding: "0.1rem 0.5rem"
              }}
            >
              Verify a document
            </a>
            <nav
              className="flex flex-wrap items-center justify-center gap-4 text-[13px] sm:gap-5"
              style={{ color: "black" }}
            >
              <a
                href="https://doclate.aiyugtech.com"
                className="transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "gray")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "black")
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
                    (e.currentTarget.style.color = "gray")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "black")
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
          className="pt-6"
          style={{ borderTop: "1px solid white", marginTop: '1rem' }}
        >
          <p
            className="text-center text-[11px]"
            style={{ color: "black" }}
          >
            &copy; {new Date().getFullYear()} Aiyug Technologies Pvt. Ltd. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
