import { Skeleton } from "@/components/ui/skeleton"

export function CategoriaListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card shadow-sm">
          <Skeleton className="h-48 w-full rounded-t-lg" />
          <div className="p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/4" />
          </div>
          <div className="border-t p-4 pt-2">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}