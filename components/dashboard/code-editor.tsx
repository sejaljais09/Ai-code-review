"use client";

import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({
  language,
  value,
  onChange,
}: CodeEditorProps) {
  return (
  <div className="relative overflow-hidden rounded-xl border shadow-sm">

    {value.trim() === "" && (
      <div className="pointer-events-none absolute left-6 top-6 z-10 text-gray-400">
        <p className="text-lg font-medium">
          Paste your Java code here...
        </p>

        <p className="mt-2 text-sm">
          or click the + button below to upload a .java file
        </p>
      </div>
    )}

    <Editor
      height="550px"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(value) => onChange(value || "")}
      options={{
        fontSize: 15,
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        padding: {
          top: 20,
        },
      }}
    />

  </div>
);
}