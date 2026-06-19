export function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton-pulse ${className}`} />;
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="border border-amber-100 bg-white p-2">
          <SkeletonBlock className="aspect-[4/5] w-full" />
          <div className="pt-4">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="mt-3 h-5 w-4/5" />
            <SkeletonBlock className="mt-2 h-5 w-2/3" />
            <SkeletonBlock className="mt-4 h-4 w-full" />
            <SkeletonBlock className="mt-2 h-4 w-5/6" />
            <SkeletonBlock className="mt-5 h-10 w-full" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }) {
  return (
    <div className="divide-y divide-amber-100">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="grid gap-4 px-5 py-4 md:grid-cols-[84px_1fr_120px_120px_140px] md:items-center">
          <SkeletonBlock className="h-20 w-16" />
          <div>
            <SkeletonBlock className="h-5 w-56 max-w-full" />
            <SkeletonBlock className="mt-2 h-4 w-28" />
          </div>
          <SkeletonBlock className="h-5 w-20" />
          <SkeletonBlock className="h-7 w-24" />
          <SkeletonBlock className="h-9 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <section className="container-shell py-12">
      <SkeletonBlock className="mb-8 h-5 w-32" />
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1fr]">
        <div>
          <div className="soft-card overflow-hidden p-3">
            <SkeletonBlock className="aspect-[4/5] w-full" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonBlock key={index} className="aspect-square" />
            ))}
          </div>
        </div>
        <div className="lg:pt-4">
          <div className="flex gap-3">
            <SkeletonBlock className="h-7 w-24" />
            <SkeletonBlock className="h-7 w-32" />
          </div>
          <SkeletonBlock className="mt-5 h-12 w-full max-w-xl" />
          <SkeletonBlock className="mt-3 h-12 w-4/5" />
          <SkeletonBlock className="mt-6 h-7 w-56" />
          <SkeletonBlock className="mt-6 h-5 w-full" />
          <SkeletonBlock className="mt-2 h-5 w-11/12" />
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonBlock key={index} className="h-20" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
