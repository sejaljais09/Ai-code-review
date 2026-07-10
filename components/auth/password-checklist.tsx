"use client";

import { CheckCircle2, XCircle } from "lucide-react";

interface PasswordChecklistProps {
  password: string;
}

export default function PasswordChecklist({
  password,
}: PasswordChecklistProps) {
  if (!password) return null;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  const strength =
    score <= 2
      ? {
          text: "Weak",
          color: "bg-red-500",
          width: "w-1/3",
          textColor: "text-red-600",
        }
      : score <= 4
      ? {
          text: "Medium",
          color: "bg-yellow-500",
          width: "w-2/3",
          textColor: "text-yellow-600",
        }
      : {
          text: "Strong",
          color: "bg-green-500",
          width: "w-full",
          textColor: "text-green-600",
        };

  const Item = ({
    ok,
    text,
  }: {
    ok: boolean;
    text: string;
  }) => (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      )}
      <span className={ok ? "text-green-700" : "text-gray-600"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="mt-4 rounded-xl border bg-gray-50 p-4 animate-in fade-in duration-300">

      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">
          Password Strength
        </span>

        <span className={`text-sm font-semibold ${strength.textColor}`}>
          {strength.text}
        </span>
      </div>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full ${strength.width} ${strength.color} transition-all duration-500`}
        />
      </div>

      <div className="space-y-2">
        <Item
          ok={checks.length}
          text="At least 8 characters"
        />

        <Item
          ok={checks.uppercase}
          text="One uppercase letter"
        />

        <Item
          ok={checks.lowercase}
          text="One lowercase letter"
        />

        <Item
          ok={checks.number}
          text="One number"
        />

        <Item
          ok={checks.special}
          text="One special character"
        />
      </div>
    </div>
  );
}