"use client";

import { Trash2 } from "lucide-react";

export default function DeleteAccountSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600">
        Delete Account
      </h2>

      <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-6">

        <p className="text-red-700">
          Deleting your account is permanent.
          All reviews, history, and settings will be removed.
        </p>

        <button className="mt-6 flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700">
          <Trash2 size={18} />
          Delete Account
        </button>

      </div>
    </div>
  );
}