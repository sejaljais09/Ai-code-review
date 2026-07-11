import Link from "next/link";
import { FileSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <FileSearch
          className="text-blue-600"
          size={40}
        />
      </div>

      <h2 className="text-2xl font-bold">
        No Reviews Yet
      </h2>

      <p className="mt-3 text-gray-500">
        Review your first Java program to
        build your AI review history.
      </p>

      <Link
        href="/dashboard"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Start Reviewing
      </Link>
    </div>
  );
}