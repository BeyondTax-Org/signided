import { useVerify } from "./verify-context";
import { verifyUVC } from "@/api/verify";
import { Sparkles } from "lucide-react";

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
    <div
      className="mx-auto flex w-full flex-wrap items-center justify-center gap-1.5 rounded-md sm:w-fit"
      style={{ background: "#F4F5F8", marginTop: "1.5rem", marginBottom: "5rem", padding: "0.3rem 0.8rem"}}
    >
      <Sparkles size={19} strokeWidth={2.15} style={{ color: "#B45309" }} />
      <span
        className="ml-1 text-[0.85rem] font-[500]"
        style={{ color: "#6F7686" }}
      >
        Try demo codes:
      </span>
      {demos.map((d, index) => (
        <button
          key={d.code}
          onClick={() => handleDemo(d.code)}
          className="group flex items-center gap-1 transition-colors cursor-pointer"
          style={{
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <code
            className="text-[0.85rem] font-[600]"
            style={{ fontFamily: "var(--mono)", color: d.color }}
          >
            {d.code}
          </code>
          <span
            className="text-[0.85rem] font-[500]"
            style={{ color: "#6F7686" }}
          >
            ({d.label.toLowerCase()})
          </span>
          {index < demos.length - 1 && (
            <span
              className="pl-0.5 text-[13px] font-bold"
              style={{ color: "#6F7686" }}
            >
              ·
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
