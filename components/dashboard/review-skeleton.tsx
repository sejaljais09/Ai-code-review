export default function ReviewSkeleton() {
  return (
    <div className="mt-6 animate-pulse rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 h-8 w-1/3 rounded bg-gray-200"></div>

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-4/5 rounded bg-gray-200"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}