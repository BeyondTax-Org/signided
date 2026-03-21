import { resolveUVC } from "@/lib/uvc";
import { MOCK_RESULT } from "@/lib/constants";
import type { QuickResult } from "./types";

export async function verifyUVC(code: string): Promise<QuickResult> {
  await new Promise((r) => setTimeout(r, 2500));
  const status = resolveUVC(code);
  if (status === "not-found") return { status: "not-found" };
  return { ...MOCK_RESULT, status };
}

export async function verifyPDF(_file: File): Promise<QuickResult> {
  await new Promise((r) => setTimeout(r, 3000));
  return { ...MOCK_RESULT, status: "verified" };
}
