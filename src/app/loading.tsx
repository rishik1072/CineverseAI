import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="cinema-container py-20">
      <Skeleton className="h-96 w-full rounded-[2rem]" />
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[2/3] rounded-3xl" />
        ))}
      </div>
    </main>
  );
}
