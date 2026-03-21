export function SiteFooter() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{ borderColor: "var(--bd)" }}
    >
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="var(--am-bg)" />
            <path
              d="M14 5L7 8.5V13.5C7 18.2 9.9 22.5 14 23.5C18.1 22.5 21 18.2 21 13.5V8.5L14 5Z"
              fill="var(--am)"
              opacity="0.9"
            />
            <path
              d="M12 14.5L13.5 16L17 12.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[13px]" style={{ color: "var(--tx2)" }}>
            <span className="font-semibold" style={{ color: "var(--tx)" }}>
              Sign IDed
            </span>{" "}
            — Public verification by{" "}
            <a
              href="https://aiyugtech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors"
              style={{ color: "var(--tx)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--am-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--tx)")
              }
            >
              Aiyug Tech
            </a>
          </span>
        </div>

        <nav
          className="flex items-center gap-6 text-[13px]"
          style={{ color: "var(--tx3)" }}
        >
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Security", href: "/security" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--am-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--tx3)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
