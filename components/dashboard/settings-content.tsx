"use client";

import { useState } from "react";
import { User, Mail, Save } from "lucide-react";

type Props = {
  user: {
    name: string;
    email: string;
  };
};

export default function SettingsContent({ user }: Props) {
  const [name, setName] = useState(user.name);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account preferences.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Profile
        </h2>

        <div className="space-y-5">

          <div>
            <label className="mb-2 flex items-center gap-2 font-medium">
              <User size={18} />
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
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
              className="w-full rounded-lg border bg-gray-100 p-3"
            />
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            <Save size={18} />
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}