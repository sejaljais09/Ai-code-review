import {
  FileCode2,
  Star,
  Bug,
  Lightbulb,
} from "lucide-react";

type StatsCardsProps = {
  stats: {
    totalReviews: number;
    averageScore: number;
    totalBugs: number;
    totalSuggestions: number;
  };
};

export default function StatsCards({
  stats,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {/* Total Reviews */}
      <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Reviews
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stats.totalReviews}
            </h2>
          </div>

          <div className="rounded-full bg-blue-100 p-3">
            <FileCode2
              size={28}
              className="text-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Average Score */}
      <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Average Score
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stats.averageScore}
            </h2>
          </div>

          <div className="rounded-full bg-yellow-100 p-3">
            <Star
              size={28}
              className="text-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Bugs Found */}
      <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Bugs Found
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stats.totalBugs}
            </h2>
          </div>

          <div className="rounded-full bg-red-100 p-3">
            <Bug
              size={28}
              className="text-red-500"
            />
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Suggestions
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stats.totalSuggestions}
            </h2>
          </div>

          <div className="rounded-full bg-green-100 p-3">
            <Lightbulb
              size={28}
              className="text-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}