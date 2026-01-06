export default function Loading() {
  return (
    <main className="min-h-screen bg-void">
      {/* Hero Skeleton */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-8 bg-white/5 rounded-full animate-pulse mb-8" />
            <div className="w-64 h-12 bg-white/5 rounded-lg animate-pulse mb-4" />
            <div className="w-48 h-12 bg-white/5 rounded-lg animate-pulse mb-6" />
            <div className="w-80 h-6 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* List Skeleton */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-16 h-10 bg-white/5 rounded-full animate-pulse"
                />
              ))}
            </div>
            <div className="flex gap-3">
              <div className="w-64 h-12 bg-white/5 rounded-xl animate-pulse" />
              <div className="w-28 h-12 bg-white/5 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 bg-void/80 border border-white/5 rounded-3xl"
              >
                <div className="flex justify-between mb-4">
                  <div className="w-16 h-6 bg-white/5 rounded-full animate-pulse" />
                  <div className="w-24 h-4 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="w-full h-6 bg-white/5 rounded animate-pulse mb-3" />
                <div className="w-3/4 h-6 bg-white/5 rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
                  <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="flex justify-between pt-4 border-t border-white/5">
                  <div className="w-20 h-4 bg-white/5 rounded animate-pulse" />
                  <div className="flex gap-4">
                    <div className="w-12 h-4 bg-white/5 rounded animate-pulse" />
                    <div className="w-12 h-4 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
