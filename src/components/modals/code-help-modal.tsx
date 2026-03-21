import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function CodeHelpModal({
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
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[var(--r-lg)] bg-white p-6 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-[16px] font-bold">
              Where do I find the UVC?
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="cursor-pointer rounded p-1 transition-colors hover:bg-gray-100">
                <X size={18} style={{ color: "var(--tx3)" }} />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4 text-[13px] leading-[1.7]" style={{ color: "var(--tx2)" }}>
            <p>
              The <strong>Unique Verification Code (UVC)</strong> is printed on
              every document signed through Aiyug's signing platform.
            </p>
            <div
              className="rounded-[var(--r-sm)] p-4"
              style={{ background: "var(--bg2)" }}
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--tx3)" }}>
                Where to look:
              </p>
              <ul className="list-disc space-y-1.5 pl-4">
                <li>Bottom of the last page, near the signature block</li>
                <li>Inside the Sign IDed stamp (amber bordered box)</li>
                <li>In the signing certificate metadata</li>
              </ul>
            </div>
            <div
              className="rounded-[var(--r-sm)] border-2 p-3 text-center"
              style={{
                borderColor: "var(--am)",
                background: "var(--am-light)",
              }}
            >
              <p
                className="text-[7px] font-extrabold uppercase"
                style={{ color: "var(--am-dark)" }}
              >
                Signed via Sign IDed
              </p>
              <p
                className="text-[14px] font-bold tracking-wider"
                style={{ fontFamily: "var(--mono)", color: "var(--am)" }}
              >
                X1Z5-AB3
              </p>
              <p className="text-[9px]" style={{ color: "var(--tx3)" }}>
                ↑ This is the UVC
              </p>
            </div>
            <p>
              Can't find it? Contact the person who sent you the document and
              ask them for the verification code.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
