"use client";

import { useRef, useState } from "react";


import {
  FileCode2,
  Star,
  Bug,
  Loader2,
  Lightbulb,
} from "lucide-react";
import CodeEditor from "./code-editor";
//import { sampleJava } from "@/lib/sample-java";
import ReviewPanel from "./review-panel";
import ReviewSkeleton from "./review-skeleton";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
//import { text } from "stream/consumers";

type DashboardContentProps = {
  stats: {
    totalReviews: number;
    averageScore: number;
    totalBugs: number;
    totalSuggestions: number;
  };
};
export default function DashboardContent({
  stats,
}: DashboardContentProps) {
  const [code, setCode] = useState("");
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [documentation, setDocumentation] =useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    toast.success("Code reviewed successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to review code.");
  } finally {
    setLoading(false);
  }
};
const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    setCode((e.target?.result as string) || "");
  };

  reader.readAsText(file);

  event.target.value = "";
};
 const generateDocumentation = async () => {
  const res = await fetch("/api/documentation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  const data = await res.json();

  setDocumentation(data.documentation);
};
  return (
    <>
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
    <div className="rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-gray-500">Total Reviews</p>
        <h2 className="mt-2 text-3xl font-bold">
          {stats.totalReviews}
        </h2>
      </div>

      <FileCode2 className="text-blue-600" size={34} />
    </div>
  </div>

  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-gray-500">Average Score</p>
        <h2 className="mt-2 text-3xl font-bold">
          {stats.averageScore}
        </h2>
      </div>

      <Star className="text-yellow-500" size={34} />
    </div>
  </div>

  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">Bugs Found</p>
        <h2 className="mt-2 text-3xl font-bold">
          {stats.totalBugs}
        </h2>
      </div>

      <Bug className="text-red-500" size={34} />
    </div>
  </div>

  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">Suggestions</p>
        <h2 className="mt-2 text-3xl font-bold">
          {stats.totalSuggestions}
        </h2>
      </div>

      <Lightbulb className="text-green-600" size={34} />
    </div>
  </div>

</div>
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
    <div className="flex items-center justify-between">

  <button
    onClick={() => fileInputRef.current?.click()}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-2xl font-medium transition hover:bg-gray-100"
  >
    +
  </button>

  <div className="flex gap-3">

    <button
      onClick={handleReview}
      disabled={loading}
      className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {loading ? "Reviewing..." : "Review Java Code"}
    </button>

    <button
      onClick={generateDocumentation}
      className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
    >
      Generate Documentation
    </button>

  </div>

</div>

<input
  ref={fileInputRef}
  type="file"
  accept=".java,.txt"
  className="hidden"
  onChange={handleFileUpload}

/>
     
<button
    onClick={generateDocumentation}
    className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
  >
    Generate Documentation
  </button>
    {loading && <ReviewSkeleton />}

{!loading && review && (
  <>
    <ReviewPanel review={review} />

    {documentation && (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold">
          Documentation
        </h2>

        <div className="prose max-w-none">
          <ReactMarkdown>
            {documentation}
          </ReactMarkdown>
        </div>
      </div>
    )}
  </>
)}
    </div>
    </>
  );
}