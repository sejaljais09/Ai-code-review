"use client";

import { LogOut, Bell } from "lucide-react";
import { signOut } from "next-auth/react";
type HeaderProps = {
  name?: string;
};

export default function Header({
  name = "Sejal",
}: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome back, {name} 
        </p>
      </div>

      <div className="flex items-center gap-4">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
    {name?.charAt(0).toUpperCase()}
  </div>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell size={20} />
        </button>

       <button
         onClick={() => signOut({ callbackUrl: "/login" })}
         className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
>       <LogOut size={18} />
        <span className="hidden md:block">Logout</span>
       </button>
      </div>
    </header>
  );
}