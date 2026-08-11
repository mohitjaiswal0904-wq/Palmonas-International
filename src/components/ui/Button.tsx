import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide-sm uppercase transition-all duration-[var(--dur-standard)] ease-[var(--ease-out-soft)] disabled:opacity-40 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-surface hover:bg-accent-deep rounded-[var(--radius-sm)]",
  outline:
    "border border-ink/70 text-ink hover:border-ink hover:bg-ink hover:text-surface rounded-[var(--radius-sm)]",
  ghost: "text-ink hover:text-accent-deep",
  link: "text-ink link-underline p-0 tracking-normal normal-case",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.68rem] px-5 py-2.5",
  md: "text-[0.72rem] px-7 py-3.5",
  lg: "text-[0.76rem] px-9 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], variant !== "link" && sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], variant !== "link" && sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
