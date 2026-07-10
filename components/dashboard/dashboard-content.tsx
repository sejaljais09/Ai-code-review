"use client";

import { useState } from "react";
import CodeEditor from "./code-editor";
import { sampleJava } from "@/lib/sample-java";
import ReviewPanel from "./review-panel";

export default function DashboardContent() {
  const [code, setCode] = useState(sampleJava);
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
  if (!code.trim()) return;

  setLoading(true);

  try {
    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    setReview(data.review);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            AI Code Review
          </h1>
          <p className="mt-1 text-gray-500">
            Language: <span className="font-semibold text-blue-600">Java</span>
          </p>
        </div>
      </div>

      <CodeEditor
        language="java"
        value={code}
        onChange={setCode}
      />

      <button
        onClick={handleReview}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        {loading ? "Reviewing..." : "Review Java Code"}
      </button>
      {review && <ReviewPanel review={review} />}
    </div>
  );
}