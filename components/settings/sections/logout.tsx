"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Logout
      </h2>

      <p className="mt-2 text-gray-500">
        Sign out from your account.
      </p>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-8 flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white hover:bg-black"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}