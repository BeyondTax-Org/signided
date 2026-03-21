import { useVerify } from "./verify-context";
import { verifyUVC } from "@/api/verify";

const demos = [
  { code: "X1Z5-AB3", color: "var(--verified)", bg: "var(--verified-light)", label: "Verified" },
  { code: "EXP1-999", color: "var(--expired)", bg: "var(--expired-light)", label: "Expired" },
  { code: "REV0-ABC", color: "var(--revoked)", bg: "var(--revoked-light)", label: "Revoked" },
];

export function DemoCodes() {
  const { dispatch } = useVerify();

  async function handleDemo(code: string) {
    dispatch({ type: "VERIFY_START" });
    const result = await verifyUVC(code);
    dispatch({ type: "VERIFY_RESULT", status: result.status, result });
  }

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <span className="text-[11px] font-medium" style={{ color: "var(--tx3)" }}>
        Try demo:
      </span>
      {demos.map((d) => (
        <button
          key={d.code}
          onClick={() => handleDemo(d.code)}
          className="group flex items-center gap-1.5 rounded-full border px-3 py-1 transition-all duration-200 hover:-translate-y-px cursor-pointer"
          style={{
            borderColor: d.bg,
            background: "var(--bg)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = d.color;
            e.currentTarget.style.background = d.bg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = d.bg;
            e.currentTarget.style.background = "var(--bg)";
          }}
        >
          <code
            className="text-[11px] font-bold"
            style={{ fontFamily: "var(--mono)", color: d.color }}
          >
            {d.code}
          </code>
          <span className="text-[9px] font-medium" style={{ color: "var(--tx3)" }}>
            {d.label}
          </span>
        </button>
      ))}
    </div>
  );
}
