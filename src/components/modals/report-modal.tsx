import * as Dialog from "@radix-ui/react-dialog";
import { X, AlertTriangle } from "lucide-react";

export function ReportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[var(--r-lg)] bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="flex items-center gap-2 text-[16px] font-bold">
              <AlertTriangle size={18} style={{ color: "var(--revoked)" }} />
              Report an issue
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="cursor-pointer rounded p-1 transition-colors hover:bg-gray-100">
                <X size={18} style={{ color: "var(--tx3)" }} />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4 text-[13px] leading-[1.7]" style={{ color: "var(--tx2)" }}>
            <p>
              If you believe a document has been tampered with, forged, or if a
              revoked signature is being presented as valid, please report it.
            </p>

            <div
              className="rounded-[var(--r-sm)] p-4"
              style={{ background: "var(--revoked-light)" }}
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--revoked)" }}>
                What to report:
              </p>
              <ul className="list-disc space-y-1.5 pl-4">
                <li>Suspected forged or altered documents</li>
                <li>Revoked signatures being used as valid</li>
                <li>Incorrect signer information</li>
                <li>Any other verification concern</li>
              </ul>
            </div>

            <p>
              Email{" "}
              <a
                href="mailto:security@aiyugtech.com"
                className="font-semibold underline"
                style={{ color: "var(--am-hover)" }}
              >
                security@aiyugtech.com
              </a>{" "}
              with the UVC code, a description of the issue, and any supporting
              evidence.
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full rounded-[var(--r-md)] py-2.5 text-[13px] font-semibold transition-all cursor-pointer"
            style={{ background: "var(--bg2)", color: "var(--tx)" }}
          >
            Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
