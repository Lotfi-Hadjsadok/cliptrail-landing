import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  priority?: boolean;
};

/** Tight-cropped mascot from public/logo.png (minimal padding). */
export function LogoMark({ className, size = 40, priority }: Props) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden leading-none",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="ClipTrail"
        width={size * 2}
        height={size * 2}
        priority={priority}
        className="block h-[118%] w-[118%] max-w-none object-contain"
      />
    </span>
  );
}
