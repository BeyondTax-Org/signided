export type VerifyStatus = "verified" | "expired" | "revoked" | "not-found";

export interface QuickResult {
  status: VerifyStatus;
  verificationSource?: "uvc" | "pdf";
  uvcCode?: string;
  fingerprint?: string;
  signedOn?: string;
  completedAt?: string;
  expiresAt?: string | null;
  method?: string;
  purpose?: string;
  docTitle?: string;
  signerInitials?: string;
  requesterEmail?: string;
  previewAvailable?: boolean;
  pages?: number;
}

export interface PreviewSession {
  sessionId: string;
  status: "pending" | "approved" | "expired";
  expiresAt?: number;
}

export type AppStep =
  | "landing"
  | "input"
  | "loading"
  | "quick-result"
  | "not-found"
  | "expired"
  | "revoked"
  | "preview-request"
  | "preview-waiting"
  | "preview-approved"
  | "preview-viewer";

export type AppAction =
  | { type: "VERIFY_START" }
  | { type: "VERIFY_RESULT"; status: VerifyStatus; result?: QuickResult }
  | { type: "REQUEST_PREVIEW" }
  | { type: "PREVIEW_WAITING" }
  | { type: "PREVIEW_APPROVED" }
  | { type: "OPEN_VIEWER" }
  | { type: "SET_INPUT_CODE"; code: string }
  | { type: "RESET" };
