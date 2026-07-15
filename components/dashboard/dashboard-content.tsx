"use client";

import { useRef, useState } from "react";


import {
  FileCode2,
  Star,
  Bug,
  Loader2,
  Lightbulb,
  Paperclip,
  Search,
} from "lucide-react";
import CodeEditor from "./code-editor";
//import { sampleJava } from "@/lib/sample-java";
import ReviewPanel from "./review-panel";
import ReviewSkeleton from "./review-skeleton";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
//import { text } from "stream/consumers";

// type DashboardContentProps = {
//   stats: {
//     totalReviews: number;
//     averageScore: number;
//     totalBugs: number;
//     totalSuggestions: number;
//   };
// };
export default function DashboardContent({
  
}: DashboardContentProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [code, setCode] = useState("");

  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [documentation, setDocumentation] =useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
 const handleReview = async (codeToReview: string) => {
  if (!codeToReview.trim()) return;

  setLoading(true);

  try {
    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: codeToReview,
      }),
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
  const content = (e.target?.result as string) || "";
  setInputCode(content);
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
  
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div className="rounded-full border bg-white px-5 py-3 shadow-sm">

  <div className="flex items-center">

    <Paperclip
      size={22}
      className="cursor-pointer text-gray-500 hover:text-blue-600"
      onClick={() => fileInputRef.current?.click()}
    />

    <textarea
  value={inputCode}
  onChange={(e) => setInputCode(e.target.value)}
  placeholder="Paste your Java code here..."
  rows={4}
  className="flex-1 resize-none border-none bg-transparent outline-none"
/>

   <Search
  size={22}
  className="cursor-pointer text-blue-600 hover:text-blue-700"
  onClick={() => {
    if (!inputCode.trim()) return;

    const codeToReview = inputCode;

    // Move code to Monaco
    setCode(codeToReview);

    // Clear the search bar
    setInputCode("");

    // Show the editor
    setShowEditor(true);

    // Review the code
    handleReview(codeToReview);
  }}
/>

  </div>

</div>
      {showEditor && (
  <CodeEditor
    language="java"
    value={code}
    onChange={setCode}
  />
)}
    <div className="flex items-center justify-between">


  <div className="flex gap-3">

    <button
      onClick={() => handleReview(inputCode)}
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