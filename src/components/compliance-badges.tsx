import { ShieldCheck, Lock, EyeOff, UserCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "§3A Compliant" },
  { icon: Lock,        label: "SHA-256 Integrity" },
  { icon: EyeOff,      label: "Zero Storage" },
  { icon: UserCheck,   label: "WCAG 2.1 AA" },
] as const;

export function ComplianceBadges() {
  return (
    <div
      className="w-full px-6 py-3.5"
      style={{
        background: "var(--am-bg)",          /* rgba(180,83,9,0.08) */
        borderTop: "0.5px solid rgba(180,83,9,0.15)",
        borderBottom: "0.5px solid rgba(180,83,9,0.15)",
      }}
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-3">
        {badges.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: "var(--am-light)",  /* #FEF3C7 */
            }}
          >
            <Icon
              size={13}
              strokeWidth={2.5}
              style={{ color: "var(--am)" }}   /* #B45309 */
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: "var(--am)" }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
