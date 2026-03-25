export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col bg-bg-surface border border-bg-border rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-video bg-bg-elevated" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-bg-elevated rounded w-3/4" />
        <div className="h-3 bg-bg-elevated rounded w-1/2" />
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-bg-elevated rounded w-1/3" />
          <div className="h-3 bg-bg-elevated rounded w-1/4" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-bg-border">
          <div className="h-4 bg-bg-elevated rounded w-1/4" />
          <div className="h-8 bg-bg-elevated rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
