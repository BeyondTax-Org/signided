import { useState, useCallback, type DragEvent } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { verifyPDF } from "@/api/verify";
import { useVerify } from "./verify-context";

export function PdfUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const { dispatch } = useVerify();

  const handleFile = useCallback(
    async (f: File) => {
      if (f.type !== "application/pdf") {
        setError("Please upload a PDF file.");
        return;
      }
      if (f.size > 50 * 1024 * 1024) {
        setError("File too large. Maximum 50 MB.");
        return;
      }
      setFile(f);
      setError("");
      dispatch({ type: "VERIFY_START" });
      const result = await verifyPDF(f);
      dispatch({ type: "VERIFY_RESULT", status: result.status, result });
    },
    [dispatch]
  );

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".pdf";
          input.onchange = () => {
            const f = input.files?.[0];
            if (f) handleFile(f);
          };
          input.click();
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-[var(--r-md)] border-2 border-dashed p-8 transition-all duration-200"
        style={{
          borderColor: isDragging ? "var(--am)" : "var(--bd-strong)",
          background: isDragging
            ? "var(--am-bg)"
            : "linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)",
        }}
      >
        {file ? (
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "var(--am-bg)" }}
            >
              <FileText size={16} style={{ color: "var(--am)" }} />
            </div>
            <div>
              <span className="text-[13px] font-semibold" style={{ color: "var(--tx)" }}>
                {file.name}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={10} style={{ color: "var(--verified)" }} />
                <span className="text-[10px]" style={{ color: "var(--verified)" }}>
                  Uploaded
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "var(--am-bg)" }}
            >
              <Upload size={20} style={{ color: "var(--am)" }} />
            </div>
            <p className="text-[13px] font-medium" style={{ color: "var(--tx)" }}>
              Drop a signed PDF here, or{" "}
              <span style={{ color: "var(--am-hover)", textDecoration: "underline" }}>
                browse
              </span>
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "var(--tx3)" }}>
              PDF files up to 50 MB
            </p>
          </>
        )}
      </div>
      {error && (
        <p className="text-[12px] font-medium" style={{ color: "var(--revoked)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
