import { useVerify } from "@/components/verify/verify-context";
import { useCountdown } from "@/hooks/use-countdown";
import { Clock, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

export function PreviewViewer() {
  const { state, dispatch } = useVerify();
  const { minutes, seconds, isUrgent, isExpired } = useCountdown(
    state.previewExpiresAt
  );

  return (
    <motion.div
      key="preview-viewer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[720px]"
    >
      {/* Timer bar */}
      <div
        className="mb-4 flex items-center justify-between rounded-[var(--r-md)] px-4 py-2.5"
        style={{
          background: isUrgent ? "var(--revoked-light)" : "var(--bg2)",
          border: "1px solid",
          borderColor: isUrgent ? "rgba(239,68,68,0.2)" : "var(--bd)",
        }}
      >
        <div className="flex items-center gap-2">
          <Clock
            size={14}
            style={{ color: isUrgent ? "var(--revoked)" : "var(--tx3)" }}
          />
          <span
            className="text-[12px] font-medium"
            style={{
              fontFamily: "var(--mono)",
              color: isUrgent ? "var(--revoked)" : "var(--tx2)",
            }}
          >
            {isExpired
              ? "Preview expired"
              : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} remaining`}
          </span>
        </div>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--tx3)" }}
        >
          Read-only &middot; Watermarked
        </span>
      </div>

      {/* Document viewer shell */}
      <div
        className="relative overflow-hidden rounded-[var(--r-lg)] border bg-white"
        style={{
          borderColor: "var(--bd)",
          minHeight: 400,
        }}
      >
        {/* Watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
          style={{ transform: "rotate(-30deg)" }}
        >
          <span className="text-[60px] font-bold tracking-wider">
            SIGN IDED PREVIEW
          </span>
        </div>

        {/* Mock document content */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <p className="text-[16px] font-bold uppercase" style={{ color: "#1a1a1a" }}>
              BeyondTax Private Limited
            </p>
            <p
              className="mt-1 text-[10px]"
              style={{ fontFamily: "var(--mono)", color: "#888" }}
            >
              CIN: U74999TG2024PTC123456 &middot; Hyderabad, Telangana
            </p>
          </div>
          <div className="mb-4 border-t-2 border-black" />
          <p className="mb-4 text-center text-[14px] font-bold underline">
            BOARD RESOLUTION
          </p>
          <p className="mb-2 text-center text-[11px]" style={{ color: "#888" }}>
            Annual Compliance — FY 2025-26
          </p>
          <p className="mb-4 text-[12px] leading-[1.8]" style={{ color: "#333" }}>
            RESOLVED THAT pursuant to Section 179 of the Companies Act, 2013,
            read with Article 15 of the Articles of Association, the Board of
            Directors hereby approves and authorizes the filing of annual
            compliance documents for the financial year 2025-26 with the
            Registrar of Companies, Hyderabad...
          </p>
          {/* More placeholder */}
          <div className="space-y-2">
            {[92, 85, 78, 90, 65, 88, 72].map((w, i) => (
              <div
                key={i}
                className="rounded"
                style={{ width: `${w}%`, height: 8, background: "#eee" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Done button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="inline-flex items-center gap-2 rounded-[var(--r-md)] border px-6 py-3 text-[14px] font-medium transition-all duration-200 hover:-translate-y-px cursor-pointer"
          style={{ borderColor: "var(--bd)", color: "var(--tx)" }}
        >
          <RotateCcw size={14} />
          Done — Verify another
        </button>
      </div>
    </motion.div>
  );
}
