import { useState, useCallback, type DragEvent } from "react";
import { FileCheck, FileText, Upload } from "lucide-react";

interface PdfUploadProps {
  onVerify: (file: File) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

export function PdfUpload({
  onVerify,
  isSubmitting = false,
  submitError = "",
}: PdfUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setError("File too large. Maximum 25 MB.");
      return;
    }
    setFile(f);
    setError("");
  }, []);

  function handleVerify() {
    if (!file) {
      setError("Please choose a signed PDF first.");
      return;
    }

    onVerify(file);
  }

  function formatFileSize(bytes: number) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => {
          if (file) return;
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".pdf";
          input.onchange = () => {
            const f = input.files?.[0];
            if (f) handleFile(f);
          };
          input.click();
        }}
        className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-6 text-center transition-all duration-200 sm:min-h-[200px] sm:px-6 sm:py-8"
        style={{
          borderColor: file ? "#10B981" : isDragging ? "#B45309" : "#E1E5EE",
          background: file ? "#F4FCF8" : isDragging ? "rgba(180, 83, 9, 0.08)" : "#FBFBFC",
          marginBottom: "1.2rem"
        }}
      >
        {file ? (
          <div className="flex flex-col items-center">
            <FileCheck
              size={28}
              strokeWidth={1.9}
              style={{ color: "#10B981" }}
            />
            <p
              className="max-w-full break-words text-[0.85rem] font-[600] leading-[1.25] sm:text-[0.9rem]"
              style={{
                color: "#191B2A",
                marginTop: "0.8rem",
              }}
            >
              {file.name}
            </p>
            <p
              className=" text-[0.8rem] font-[500]"
              style={{ color: "#6F7686", marginTop: "0.6rem" }}
            >
              {formatFileSize(file.size)}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setError("");
              }}
              className="text-[0.8rem] font-[600] transition-colors cursor-pointer hover:text-[#4B5563]"
              style={{ color: "#6F7686", marginTop: "0.6rem" }}
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <Upload size={24} strokeWidth={1.9} style={{ color: "#6F7686" }} />
            <p
              className="text-[0.9rem] font-[600] leading-none"
              style={{
                color: "#191B2A",
                marginTop: "0.8rem",
                marginBottom: "0.8rem",
              }}
            >
              Upload a signed PDF
            </p>
            <p
              className=" text-[0.8rem] font-[500]"
              style={{ color: "#6F7686" }}
            >
              Drag &amp; drop a file here, or choose a file
            </p>
            <p
              className=" text-[0.8rem] font-[500]"
              style={{ color: "#6F7686" }}
            >
              PDF only · Max 25 MB
            </p>
          </>
        )}
      </div>
      {error && (
        <p
          className="mt-2 text-[12px] font-medium"
          style={{ color: "var(--revoked)" }}
        >
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleVerify}
        disabled={isSubmitting}
        className="cta-shine flex w-full items-center justify-center gap-2 rounded-md text-[1rem] font-[600] transition-all duration-200 hover:-translate-y-[1px] cursor-pointer"
        style={{
          background: "#B45309",
          color: "#FFFFFF",
          boxShadow: "0 1px 2px rgba(180, 83, 9, 0.2)",
          opacity: isSubmitting ? 0.72 : 1,
          padding: "0.7rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#92400E";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#B45309";
        }}
      >
        <FileText size={18} strokeWidth={2} />
        {isSubmitting ? "Verifying..." : "Verify PDF"}
      </button>
      {submitError && (
        <p
          className="mt-2 text-center text-[12px] font-semibold"
          style={{ color: "var(--revoked)" }}
        >
          {submitError}
        </p>
      )}
    </div>
  );
}
