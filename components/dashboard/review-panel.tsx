"use client";

import Editor from "@monaco-editor/react";
import ScoreCircle from "./score-circle";
import toast from "react-hot-toast";
import { ScanSearch } from "lucide-react";
import {
  Bug,
  CheckCircle2,
  Clock3,
  Cpu,
  Sparkles,
  Star,
  Copy,
  Download,
  FileText,
} from "lucide-react";
import jsPDF from "jspdf"

type Review = {
  score: number;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  bugs: string[];
  codeSmells:string[];
  suggestions: string[];
  improvedCode: string;
};

type Props = {
  review: Review;
};

export default function ReviewPanel({ review }: Props) {
    const copyCode = async () => {
  await navigator.clipboard.writeText(review.improvedCode);

  toast.success("Improved code copied!");
};
const downloadMarkdown = () => {
  const markdown = `
# AI Code Review

## Score
${review.score}

## Summary
${review.summary}

## Time Complexity
${review.timeComplexity}

## Space Complexity
${review.spaceComplexity}

## Bugs
${review.bugs.map((b) => "- " + b).join("\n")}

## Suggestions
${review.suggestions.map((s) => "- " + s).join("\n")}

## Improved Code

\`\`\`java
${review.improvedCode}
\`\`\`
`;

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "review.md";
  a.click();

  URL.revokeObjectURL(url);
};

const downloadPDF = () => {
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("AI Code Review", 10, 20);

  pdf.setFontSize(12);

  let y = 35;

  pdf.text(`Score: ${review.score}`, 10, y);

  y += 10;

  pdf.text(`Summary: ${review.summary}`, 10, y, {
    maxWidth: 180,
  });

  pdf.save("review.pdf");
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
               No bugs found
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
      {/* code smells */}
       <div className="rounded-xl border bg-white p-6 shadow-sm">

     <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
     <ScanSearch className="text-orange-500" />
     Code Smells
    </h3>

  <div className="space-y-3">

    {review.codeSmells.length === 0 ? (
      <p className="font-medium text-green-600">
         No code smells detected
      </p>
    ) : (
      review.codeSmells.map((smell: string, index: number) => (
        <div
          key={index}
          className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-orange-700"
        >
          {smell}
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
    <button
  onClick={downloadMarkdown}
  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
>
  <Download size={18} />
  Markdown
</button>

<button
  onClick={downloadPDF}
  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
>
  <FileText size={18} />
  PDF
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