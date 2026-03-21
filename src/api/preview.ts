import type { PreviewSession } from "./types";

export async function requestPreview(): Promise<PreviewSession> {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    sessionId: "preview-" + Math.random().toString(36).slice(2, 8),
    status: "pending",
  };
}

export async function waitForApproval(_sessionId: string): Promise<PreviewSession> {
  await new Promise((r) => setTimeout(r, 4000));
  return {
    sessionId: _sessionId,
    status: "approved",
    expiresAt: Date.now() + 15 * 60 * 1000,
  };
}
