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
    <div className="overflow-hidden rounded-xl border shadow-sm">
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