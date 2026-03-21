import { VALID_UVCS, EXPIRED_UVCS, REVOKED_UVCS } from "./constants";
import type { VerifyStatus } from "@/api/types";

export function normalizeUVC(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isValidFormat(raw: string): boolean {
  return /^[A-Z0-9]{4,10}$/.test(normalizeUVC(raw));
}

export function resolveUVC(raw: string): VerifyStatus {
  const norm = normalizeUVC(raw);
  if (VALID_UVCS.map(normalizeUVC).includes(norm)) return "verified";
  if (EXPIRED_UVCS.map(normalizeUVC).includes(norm)) return "expired";
  if (REVOKED_UVCS.map(normalizeUVC).includes(norm)) return "revoked";
  return "not-found";
}
