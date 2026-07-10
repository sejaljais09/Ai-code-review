"use client";

import { Copy, Trash2, FileCode } from "lucide-react";

type Props = {
  onCopy: () => void;
  onClear: () => void;
  onLoadSample: () => void;
};

export default function EditorToolbar({
  onCopy,
  onClear,
  onLoadSample,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <button
        onClick={onCopy}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        <Copy size={18} />
        Copy
      </button>

      <button
        onClick={onClear}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        <Trash2 size={18} />
        Clear
      </button>

      <button
        onClick={onLoadSample}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        <FileCode size={18} />
        Load Sample
      </button>
    </div>
  );
}