import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  as: Tag = "div",
  width = "default",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  width?: "default" | "wide" | "narrow";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full min-w-0 px-5 sm:px-8 lg:px-12",
        width === "default" && "max-w-[1440px]",
        width === "wide" && "max-w-[1680px]",
        width === "narrow" && "max-w-[880px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
