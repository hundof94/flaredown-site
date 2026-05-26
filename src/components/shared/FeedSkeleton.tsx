export function FeedCardSkeleton() {
  return (
    <div className="flex flex-col bg-surface rounded-card p-5 border border-ink/8 border-l-4 border-l-ink/10 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-14 bg-ink/10 rounded-pill" />
        <div className="h-4 w-24 bg-ink/8 rounded" />
        <div className="h-3 w-12 bg-ink/6 rounded ml-auto" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-3.5 w-full bg-ink/8 rounded" />
        <div className="h-3.5 w-5/6 bg-ink/8 rounded" />
        <div className="h-3.5 w-4/6 bg-ink/6 rounded" />
      </div>
      <div className="mt-4 pt-3 border-t border-ink/6 flex items-center">
        <div className="h-3 w-10 bg-ink/8 rounded" />
      </div>
    </div>
  );
}

export function FeedGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <FeedCardSkeleton key={i} />
      ))}
    </div>
  );
}
