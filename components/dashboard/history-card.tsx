"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Review = {
  id: string;
  language: string;
  score: number;
  summary: string;
  createdAt: Date;
};

export default function HistoryCard({
  review,
}: {
  review: Review;
}) {
  const router = useRouter();

  const deleteReview = async (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    const confirmDelete = confirm(
      "Delete this review?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `/api/review/${review.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Review deleted");

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Link
      href={`/dashboard/history/${review.id}`}
      className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {review.language}
          </h2>

          <p className="text-gray-500">
            {new Date(
              review.createdAt
            ).toLocaleString()}
          </p>

          <p className="mt-4 text-gray-700">
            {review.summary}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="rounded-full bg-blue-100 px-4 py-2 font-bold text-blue-700">
            {review.score}/100
          </div>

          <button
            onClick={deleteReview}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}