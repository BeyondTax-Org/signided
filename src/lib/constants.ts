import type { QuickResult } from "@/api/types";

export const VALID_UVCS = [
  "X1Z5-AB3",
  "X1Z5AB3",
  "Y7K2-CD9",
  "Y7K2CD9",
  "DEMO-001",
  "DEMO001",
];
export const EXPIRED_UVCS = ["EXP1-999", "EXP1999"];
export const REVOKED_UVCS = ["REV0-ABC", "REV0ABC"];

export const MOCK_RESULT: QuickResult = {
  status: "verified",
  fingerprint: "SHA-256: 9A3F…21C8",
  signedOn: "25 Aug 2025, 10:00 IST",
  method: "Aadhaar OTP e-Sign",
  docTitle: "Board Resolution — Annual Compliance Filing FY 2025-26",
  signerInitials: "DRC",
  pages: 3,
};

export const FAQ_ITEMS = [
  {
    question: "Why does the OTP go to the document owner, not me?",
    answer:
      "Because the document contains private information. Sign IDed ensures only the owner or signer can authorize who sees it. The OTP is proof of consent — protecting their privacy and yours.",
  },
  {
    question: "What if the owner doesn't approve my preview request?",
    answer:
      "The request expires after 10 minutes. You can still see the verification status and document fingerprint without a preview. Contact the issuer directly if you need the full document.",
  },
  {
    question: "What if my code is expired or revoked?",
    answer:
      "Expired means the code has passed its validity period — ask the issuer for a fresh one. Revoked means the signer cancelled the signature — treat the document as invalid.",
  },
  {
    question: "How long does a preview last?",
    answer:
      "15 minutes after the owner approves. Previews are read-only, non-downloadable, and open inside the Aiyug Workspace viewer.",
  },
  {
    question: "Can I verify using only the PDF?",
    answer:
      "Yes. Upload the signed PDF and we extract the signature metadata automatically. You may still need owner approval to preview the contents.",
  },
];
