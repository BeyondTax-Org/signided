export type VerifyStatus = "verified" | "expired" | "revoked" | "not-found";

export interface QuickResult {
  status: VerifyStatus;
  fingerprint?: string;
  signedOn?: string;
  method?: string;
  docTitle?: string;
  signerInitials?: string;
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
