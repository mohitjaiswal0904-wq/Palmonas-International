import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

const SIZES = {
  sm: { width: 148, height: 15 },
  md: { width: 188, height: 19 },
  lg: { width: 228, height: 23 },
} as const;

function LogoMark({
  size,
  className,
  priority,
}: {
  size: keyof typeof SIZES;
  className?: string;
  priority?: boolean;
}) {
  const dims = SIZES[size];
  return (
    <Image
      src="/brand/palmonas-logo.svg"
      alt="Palmonas"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
      style={{ width: dims.width, height: dims.height }}
    />
  );
}

export function Wordmark({
  className,
  size = "md",
  priority = false,
  href = "/",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  /** Pass `null` to render the mark without a link. */
  href?: string | null;
}) {
  if (href === null) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <LogoMark size={size} priority={priority} />
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label="Palmonas International — home"
      className={cn("inline-flex items-center", className)}
    >
      <LogoMark size={size} priority={priority} />
    </Link>
  );
}
