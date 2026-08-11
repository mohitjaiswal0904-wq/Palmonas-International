import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse bg-stone/80", className)}
      aria-hidden
    />
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="mt-4 h-3 w-2/3" />
          <Skeleton className="mt-2 h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}
