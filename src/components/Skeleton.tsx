export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-neutral-200 ${className}`} />
  );
}

export function CharacterCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-3">
      <Skeleton className="h-16 w-16 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export function CharacterDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-28 w-28 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-60" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-4">
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-6 space-y-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
