"use client";

import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function AppearanceSection() {
  const [theme, setTheme] = useState("system");

  const themes = [
    {
      id: "light",
      label: "Light",
      icon: Sun,
    },
    {
      id: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      id: "system",
      label: "System",
      icon: Monitor,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Appearance
      </h2>

      <p className="mt-1 text-gray-500">
        Choose how the application looks.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">

        {themes.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setTheme(item.id)}
              className={`rounded-xl border p-6 transition ${
                theme === item.id
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <Icon className="mx-auto mb-3" />

              <p className="font-medium">
                {item.label}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}