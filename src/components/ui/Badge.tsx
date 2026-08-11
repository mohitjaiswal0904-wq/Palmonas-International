import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block font-sans text-[0.6rem] font-semibold uppercase tracking-luxe text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
