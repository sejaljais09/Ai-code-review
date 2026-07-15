"use client";

import { useState } from "react";
import { User, Mail } from "lucide-react";

type Props = {
  user: {
    name: string;
    email: string;
  };
};

export default function AccountSection({
  user,
}: Props) {
  const [name, setName] = useState(user.name);

  return (
    <div>

      <h2 className="text-2xl font-bold">
        Account
      </h2>

      <p className="mt-1 text-gray-500">
        Update your personal information.
      </p>

      <div className="mt-8 space-y-6">

        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <User size={18} />
            Full Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border p-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <Mail size={18} />
            Email
          </label>

          <input
            value={user.email}
            disabled
            className="w-full rounded-xl border bg-gray-100 p-3"
          />
        </div>

        <button
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}