"use client";

import { Lock } from "lucide-react";

export default function PasswordSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Change Password
      </h2>

      <p className="mt-1 text-gray-500">
        Update your account password.
      </p>

      <div className="mt-8 space-y-5">

        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <Lock size={18} />
            Current Password
          </label>

          <input
            type="password"
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 font-medium block">
            New Password
          </label>

          <input
            type="password"
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 font-medium block">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
          />
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          Update Password
        </button>

      </div>
    </div>
  );
}