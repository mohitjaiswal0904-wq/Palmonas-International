import { Container } from "@/components/ui/Container";
import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="pt-10 pb-24">
      <Skeleton className="h-3 w-40" />
      <div className="mt-8 mb-12">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-4 h-12 w-64" />
        <Skeleton className="mt-4 h-3 w-full max-w-[40ch]" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        <div className="hidden lg:block">
          <Skeleton className="h-[70vh] w-full" />
        </div>
        <ProductGridSkeleton />
      </div>
    </Container>
  );
}
