"use client";

import Editor from "@monaco-editor/react";
import ScoreCircle from "./score-circle";
import {
  Bug,
  CheckCircle2,
  Clock3,
  Cpu,
  Sparkles,
  Star,
  Copy,
} from "lucide-react";

type Review = {
  score: number;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  bugs: string[];
  suggestions: string[];
  improvedCode: string;
};

type Props = {
  review: Review;
};

export default function ReviewPanel({ review }: Props) {
    const copyCode = async () => {
  await navigator.clipboard.writeText(review.improvedCode);

  alert("Improved code copied!");
};
  return (
    <div className="mt-8 space-y-6">

      {/* Header */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="text-blue-600" />
              AI Review
            </h2>

            <p className="mt-2 text-gray-500">
              AI analyzed your Java code.
            </p>
          </div>

          <ScoreCircle score={review.score} />

        </div>
      </div>

      {/* Summary */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Star className="text-yellow-500" />
          Summary
        </h3>

        <p className="text-gray-700">
          {review.summary}
        </p>
      </div>

      {/* Complexity */}

      <div className="grid gap-5 md:grid-cols-2">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Clock3 className="text-blue-600" />
            Time Complexity
          </div>

          <p className="mt-3 text-2xl font-bold text-blue-600">
            {review.timeComplexity}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Cpu className="text-purple-600" />
            Space Complexity
          </div>

          <p className="mt-3 text-2xl font-bold text-purple-600">
            {review.spaceComplexity}
          </p>
        </div>

      </div>

      {/* Bugs */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Bug className="text-red-500" />
          Bugs Found
        </h3>

        <div className="space-y-3">

          {review.bugs.length === 0 ? (
            <p className="text-green-600 font-medium">
              ✅ No bugs found
            </p>
          ) : (
            review.bugs.map((bug, index) => (
              <div
                key={index}
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700"
              >
                {bug}
              </div>
            ))
          )}

        </div>

      </div>

      {/* Suggestions */}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <CheckCircle2 className="text-green-600" />
          Suggestions
        </h3>

        <div className="space-y-3">

          {review.suggestions.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-700"
            >
              {item}
            </div>
          ))}

        </div>

      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">

  <div className="mb-4 flex items-center justify-between">

    <h3 className="text-lg font-semibold">
       Improved Java Code
    </h3>

    <button
      onClick={copyCode}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      <Copy size={18} />
      Copy
    </button>

  </div>

  <Editor
    height="350px"
    language="java"
    theme="vs-dark"
    value={review.improvedCode}
    options={{
      readOnly: true,
      minimap: { enabled: false },
      fontSize: 14,
      scrollBeyondLastLine: false,
    }}
  />

</div>

    </div>
  );
}