import { useState, type FormEvent } from "react";
import { isValidFormat } from "@/lib/uvc";
import { verifyUVC } from "@/api/verify";
import { useVerify } from "./verify-context";
import { Info, ArrowRight } from "lucide-react";

interface UvcInputProps {
  onOpenHelp: () => void;
  initialCode?: string;
}

export function UvcInput({ onOpenHelp, initialCode = "" }: UvcInputProps) {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState("");
  const { dispatch } = useVerify();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter a verification code.");
      return;
    }
    if (!isValidFormat(code)) {
      setError("Invalid format. UVC codes are 4-10 alphanumeric characters.");
      return;
    }

    dispatch({ type: "VERIFY_START" });
    const result = await verifyUVC(code);
    dispatch({ type: "VERIFY_RESULT", status: result.status, result });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <div
          className="flex items-center overflow-hidden rounded-[var(--r-md)] border transition-all duration-200 focus-within:border-[var(--am)] focus-within:shadow-[0_0_0_3px_rgba(180,83,9,0.1)]"
          style={{
            borderColor: error ? "var(--revoked)" : "var(--bd-strong)",
            borderWidth: "1.5px",
          }}
        >
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="Enter UVC (e.g. X1Z5-AB3)"
            className="w-full bg-transparent px-4 py-3.5 outline-none"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "15px",
              letterSpacing: "0.04em",
              color: "var(--foreground)",
            }}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        {error && (
          <p
            className="mt-1.5 text-[12px] font-medium"
            style={{ color: "var(--revoked)" }}
          >
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="cta-shine flex w-full items-center justify-center gap-2 rounded-[var(--r-md)] py-3.5 text-[14px] font-semibold transition-all duration-200 hover:-translate-y-[2px] cursor-pointer"
        style={{
          background: "var(--cta)",
          color: "var(--cta-fg)",
          boxShadow: "var(--shadow-sm)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--cta-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--cta)";
        }}
      >
        Verify signature
        <ArrowRight size={15} />
      </button>

      <button
        type="button"
        onClick={onOpenHelp}
        className="flex items-center gap-1.5 text-[12px] font-medium transition-colors cursor-pointer"
        style={{ color: "var(--tx3)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--am)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--tx3)")}
      >
        <Info size={12} />
        Where do I find this code?
      </button>
    </form>
  );
}
