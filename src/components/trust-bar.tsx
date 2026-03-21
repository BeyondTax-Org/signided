import { Shield, Lock, HardDrive, Accessibility } from "lucide-react";

const items = [
  { icon: Shield, label: "IT Act §3A", sub: "Compliant" },
  { icon: Lock, label: "SHA-256", sub: "Fingerprinted" },
  { icon: HardDrive, label: "Zero Storage", sub: "No docs kept" },
  { icon: Accessibility, label: "WCAG 2.1", sub: "Accessible" },
];

export function TrustBar() {
  return (
    <div
      className="px-6 py-4"
      style={{
        background: "var(--dark2)",
        borderTop: "1px solid var(--dark-bd)",
        borderBottom: "1px solid var(--dark-bd)",
      }}
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ background: "rgba(245,158,11,0.1)" }}
            >
              <item.icon
                size={14}
                strokeWidth={2}
                style={{ color: "var(--am)" }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-[11px] font-bold leading-tight"
                style={{ color: "var(--dark-tx)", letterSpacing: "-0.01em" }}
              >
                {item.label}
              </span>
              <span
                className="text-[10px] leading-tight"
                style={{ color: "var(--dark-tx3)" }}
              >
                {item.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
