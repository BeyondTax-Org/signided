export function DocumentMockup() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ minHeight: 400, perspective: "800px" }}
    >
      {/* Multi-layer amber glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />

      {/* Floating document */}
      <div
        className="relative"
        style={{ animation: "docFloat 6s ease-in-out infinite" }}
      >
        {/* Shadow layer underneath */}
        <div
          className="pointer-events-none absolute inset-0 translate-y-4"
          style={{
            background: "transparent",
            borderRadius: 8,
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
            filter: "blur(2px)",
          }}
        />

        <div
          className="relative w-[300px] rounded-lg bg-white px-6 py-7"
          style={{
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
            transform: "rotate(-1.5deg) rotateY(-2deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Subtle top highlight */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-lg"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)",
            }}
          />

          {/* Company header */}
          <div className="mb-3 text-center">
            <p
              className="text-[13px] font-bold uppercase tracking-wide"
              style={{ color: "#1a1a1a" }}
            >
              BeyondTax Private Limited
            </p>
            <p
              className="mt-0.5 text-center"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "8px",
                color: "#999",
                letterSpacing: "0.02em",
              }}
            >
              CIN: U74999TG2024PTC123456 &middot; Hyderabad
            </p>
          </div>

          {/* Divider */}
          <div className="mb-3" style={{ borderTop: "1.5px solid #1a1a1a" }} />

          {/* Title */}
          <div className="mb-2 text-center">
            <p
              className="text-[11px] font-bold uppercase underline"
              style={{ color: "#1a1a1a" }}
            >
              Board Resolution
            </p>
            <p className="mt-0.5 text-[8px]" style={{ color: "#999" }}>
              Annual Compliance — FY 2025-26
            </p>
          </div>

          {/* Body text */}
          <div className="mb-3 space-y-1.5">
            <p
              className="text-[8.5px] leading-[1.7]"
              style={{ color: "#333" }}
            >
              RESOLVED THAT pursuant to Section 179 of the Companies Act, 2013,
              the Board of Directors hereby...
            </p>
            {/* Placeholder lines — more realistic */}
            {[92, 80, 88, 65, 72].map((w, i) => (
              <div
                key={i}
                className="rounded-[2px]"
                style={{
                  width: `${w}%`,
                  height: 5,
                  background: `rgba(0,0,0,${0.06 - i * 0.005})`,
                }}
              />
            ))}
          </div>

          {/* Signature area */}
          <div className="mt-5 flex items-end justify-between">
            <div>
              <div
                className="mb-0.5"
                style={{
                  fontFamily: "'Segoe Script', 'Dancing Script', Georgia, serif",
                  fontSize: "13px",
                  color: "#1a3a5c",
                  fontStyle: "italic",
                  letterSpacing: "0.01em",
                }}
              >
                Dheeraj Rao
              </div>
              <div
                className="mb-0.5"
                style={{
                  width: 64,
                  height: "0.5px",
                  background: "#1a1a1a",
                }}
              />
              <p className="text-[8px] font-medium" style={{ color: "#1a1a1a" }}>
                Chikyala
              </p>
              <p className="text-[7.5px]" style={{ color: "#888" }}>
                Director
              </p>
              <p
                className="mt-0.5 text-[6.5px]"
                style={{ fontFamily: "var(--mono)", color: "#bbb" }}
              >
                DIN: 09876543
              </p>
            </div>

            {/* Sign IDed stamp — refined */}
            <div
              className="rounded-lg px-3 py-2"
              style={{
                border: "2px solid var(--am)",
                background:
                  "linear-gradient(135deg, var(--am-light) 0%, rgba(254,243,199,0.6) 100%)",
                animation: "stampPulse 3s ease-in-out infinite",
              }}
            >
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 5L7 8.5V13.5C7 18.2 9.9 22.5 14 23.5C18.1 22.5 21 18.2 21 13.5V8.5L14 5Z"
                    fill="var(--am)"
                  />
                  <path
                    d="M12 14.5L13.5 16L17 12.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="text-[7px] font-extrabold uppercase"
                  style={{ color: "var(--am-dark)" }}
                >
                  Signed via
                </span>
              </div>
              <p
                className="text-center text-[9px] font-extrabold uppercase tracking-wider"
                style={{
                  fontFamily: "var(--mono)",
                  color: "var(--am)",
                  letterSpacing: "0.08em",
                }}
              >
                Sign IDed
              </p>
              <p
                className="text-center text-[6.5px]"
                style={{
                  fontFamily: "var(--mono)",
                  color: "#999",
                }}
              >
                UVC: X1Z5-AB3
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
