import { useState, type FormEvent } from "react";
import { isValidFormat } from "@/lib/uvc";
import { CircleHelp, Search } from "lucide-react";

interface UvcInputProps {
  onOpenHelp: () => void;
  onVerify: (uvcCode: string) => void;
  initialCode?: string;
  isSubmitting?: boolean;
  submitError?: string;
}

export function UvcInput({
  onOpenHelp,
  onVerify,
  initialCode = "",
  isSubmitting = false,
  submitError = "",
}: UvcInputProps) {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setError("Please enter a verification code.");
      return;
    }
    if (!isValidFormat(trimmedCode)) {
      setError("Invalid format. UVC codes are 4-10 alphanumeric characters.");
      return;
    }

    onVerify(trimmedCode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="uvc-code"
          className="block text-[0.9rem] font-[600] leading-none"
          style={{ color: "#191B2A", marginBottom: "0.5rem" }}
        >
          Verification Code (UVC)
        </label>
        <p
          className="text-[0.8rem] font-[600] leading-[1.45]"
          style={{ color: "#6F7686", marginBottom: "0.7rem" }}
        >
          This is the short code printed near the signature stamp or QR on the
          signed document.
        </p>
        <div
          className="flex h-[54px] items-center overflow-hidden rounded-md border bg-white transition-all duration-200 focus-within:border-[#B45309] focus-within:shadow-[0_0_0_4px_rgba(180,83,9,0.12)] sm:h-[60px]"
          style={{
            borderColor: error ? "var(--revoked)" : "#DCE1EA",
            borderWidth: "1.5px",
            marginBottom: "0.4rem"
          }}
        >
          <input
            id="uvc-code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="e.g., X1Z5-AB3"
            className="w-full bg-transparent outline-none"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "clamp(13px, 4vw, 15px)",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "var(--foreground)",
              padding: "1rem"
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onOpenHelp}
          className="flex items-center gap-1.5 text-[0.7rem] font-[500] transition-colors cursor-pointer"
          style={{ color: "#B45309", marginBottom: "0.9rem" }}
        >
          <CircleHelp size={14} strokeWidth={2.2} />
          Where is this?
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-shine flex w-full items-center justify-center gap-2 rounded-md text-[1rem] font-[600] transition-all duration-200 hover:-translate-y-[1px] cursor-pointer"
        style={{
          background: "#B45309",
          color: "#FFFFFF",
          boxShadow: "0 1px 2px rgba(180, 83, 9, 0.2)",
          opacity: isSubmitting ? 0.72 : 1,
          padding: "0.7rem"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#92400E";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#B45309";
        }}
      >
        <Search size={18} strokeWidth={2} />
        {isSubmitting ? "Verifying..." : "Verify Document"}
      </button>
      {submitError && (
        <p
          className="mt-2 text-center text-[12px] font-semibold"
          style={{ color: "var(--revoked)" }}
        >
          {submitError}
        </p>
      )}
    </form>
  );
}
