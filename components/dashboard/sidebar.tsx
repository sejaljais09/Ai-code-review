"use client";

import Link from "next/link";
import { LayoutDashboard, Code2, History, Settings } from "lucide-react";
import { usePathname } from "next/navigation";



const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "New Review",
    href: "/dashboard/new-review",
    icon: Code2,
  },
  {
    name: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
    const pathname = usePathname();
  return (
    <aside className="w-64 border-r border-gray-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">
          AI Review
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
              pathname === item.href
                   ? "bg-blue-600 text-white"
                 : "text-gray-700 hover:bg-gray-100"
          }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}