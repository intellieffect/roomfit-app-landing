export default function Loading() {
  return (
    <main className="min-h-screen bg-void">
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button Skeleton */}
          <div className="w-24 h-6 bg-white/5 rounded animate-pulse mb-8" />

          {/* Article Skeleton */}
          <div className="bg-void/80 border border-white/5 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/5">
              <div className="w-16 h-6 bg-white/5 rounded-full animate-pulse mb-4" />
              <div className="w-full h-10 bg-white/5 rounded-lg animate-pulse mb-3" />
              <div className="w-2/3 h-10 bg-white/5 rounded-lg animate-pulse mb-6" />
              <div className="flex gap-4">
                <div className="w-24 h-5 bg-white/5 rounded animate-pulse" />
                <div className="w-32 h-5 bg-white/5 rounded animate-pulse" />
                <div className="w-16 h-5 bg-white/5 rounded animate-pulse" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`h-5 bg-white/5 rounded animate-pulse ${
                    i % 3 === 0 ? "w-3/4" : "w-full"
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="p-6 sm:p-8 border-t border-white/5">
              <div className="flex justify-between">
                <div className="w-24 h-10 bg-white/5 rounded-full animate-pulse" />
                <div className="w-24 h-10 bg-white/5 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
