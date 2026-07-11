"use client";

import { useMemo, useState } from "react";
import HistoryCard from "./history-card";

type Review = {
  id: string;
  language: string;
  score: number;
  summary: string;
  createdAt: Date;
};

export default function HistoryList({
  reviews,
}: {
  reviews: Review[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredReviews = useMemo(() => {
  return reviews.filter((review) => {
    const matchesSearch =
      review.summary.toLowerCase().includes(search.toLowerCase()) ||
      review.language.toLowerCase().includes(search.toLowerCase());

    let matchesFilter = true;

    if (filter === "excellent") {
      matchesFilter = review.score >= 80;
    } else if (filter === "good") {
      matchesFilter = review.score >= 60 && review.score < 80;
    } else if (filter === "poor") {
      matchesFilter = review.score < 60;
    }

    return matchesSearch && matchesFilter;
  });
}, [reviews, search, filter]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
 <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="rounded-lg border p-3"
  >
    <option value="all">All Scores</option>
    <option value="excellent">Excellent (80+)</option>
    <option value="good">Good (60–79)</option>
    <option value="poor">Needs Improvement (&lt;60)</option>
  </select>
</div>
      <input
        type="text"
        placeholder="Search reviews..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <div className="mt-5 space-y-5">
        {filteredReviews.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            No matching reviews found.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <HistoryCard
              key={review.id}
              review={review}
            />
          ))
        )}
      </div>
    </>
  );
}