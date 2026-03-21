/**
 * Design-system typography helpers.
 * Usage: style={dsFont("lg", "bold")}
 */

type FontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
type FontWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";

const sizeMap: Record<FontSize, string> = {
  xs: "var(--text-xs)",
  sm: "var(--text-sm)",
  base: "var(--text-base)",
  lg: "var(--text-lg)",
  xl: "var(--text-xl)",
  "2xl": "var(--text-2xl)",
  "3xl": "var(--text-3xl)",
  "4xl": "var(--text-4xl)",
  "5xl": "var(--text-5xl)",
};

const weightMap: Record<FontWeight, string> = {
  normal: "var(--font-weight-normal)",
  medium: "var(--font-weight-medium)",
  semibold: "var(--font-weight-semibold)",
  bold: "var(--font-weight-bold)",
  extrabold: "var(--font-weight-extrabold)",
  black: "var(--font-weight-black)",
};

export function dsFont(size: FontSize, weight: FontWeight = "normal"): React.CSSProperties {
  return {
    fontFamily: "var(--font)",
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight] as unknown as number,
  };
}

export function dsMonoFont(size: FontSize, weight: FontWeight = "normal"): React.CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight] as unknown as number,
  };
}
