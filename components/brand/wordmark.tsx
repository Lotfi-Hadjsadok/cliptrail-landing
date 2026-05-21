import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  invert?: boolean;
};

const sizes = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl md:text-6xl",
};

export function Wordmark({ className, size = "md", invert }: Props) {
  return (
    <span
      className={cn(
        "font-display font-black leading-none tracking-tight",
        sizes[size],
        className,
      )}
    >
      <span style={{ color: invert ? "#fff" : "var(--ct-punch)" }}>Clip</span>
      <span style={{ color: invert ? "rgba(255,255,255,0.85)" : "var(--ct-grape)" }}>
        Trail
      </span>
    </span>
  );
}
