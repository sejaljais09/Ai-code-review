"use client";

import {
  User,
  Bell,
  Lock,
  Moon,
  Trash2,
  LogOut,
  ChevronDown,
} from "lucide-react";

type Props = {
  tab: string;
  setTab: (tab: string) => void;
};

const items = [
  {
    id: "account",
    label: "Account",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "password",
    label: "Change Password",
    icon: Lock,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Moon,
  },
  {
    id: "delete",
    label: "Delete Account",
    icon: Trash2,
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
  },
];

export default function SettingsSidebar({
  tab,
  setTab,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm">

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
              tab === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}

    </div>
  );
}