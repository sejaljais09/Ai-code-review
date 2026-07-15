"use client";

import { useState } from "react";

import SettingsSidebar from "./settings-sidebar";

import AccountSection from "./sections/account";
import NotificationSection from "./sections/notifications";
import PasswordSection from "./sections/password";
import AppearanceSection from "./sections/appearance";
import DeleteAccountSection from "./sections/delete-account";
import LogoutSection from "./sections/logout";

type Props = {
  user: {
    name: string;
    email: string;
  };
};

export default function SettingsLayout({ user }: Props) {
  const [tab, setTab] = useState("account");

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <p className="mt-2 text-gray-500">
        Manage your account preferences
      </p>

      <div className="mt-8">

  {/* Mobile Dropdown */}
  <div className="mb-6 lg:hidden">
    <select
      value={tab}
      onChange={(e) => setTab(e.target.value)}
      className="w-full rounded-xl border bg-white p-3 shadow-sm outline-none focus:border-blue-600"
    >
      <option value="account">Account</option>
      <option value="notifications">Notifications</option>
      <option value="password">Change Password</option>
      <option value="appearance">Appearance</option>
      <option value="delete">Delete Account</option>
      <option value="logout">Logout</option>
    </select>
  </div>

  <div className="grid grid-cols-12 gap-8">

    {/* Desktop Sidebar */}
    <div className="hidden lg:block lg:col-span-3">
      <SettingsSidebar
        tab={tab}
        setTab={setTab}
      />
    </div>

    {/* Content */}
    <div className="col-span-12 rounded-xl border bg-white p-8 shadow-sm lg:col-span-9">

      {/* Your sections */}
      {tab === "account" && <AccountSection user={user} />}
      {tab === "notifications" && <NotificationSection />}
      {tab === "password" && <PasswordSection />}
      {tab === "appearance" && <AppearanceSection />}
      {tab === "delete" && <DeleteAccountSection />}
      {tab === "logout" && <LogoutSection />}

    </div>

  </div>

</div>
    </div>
  );
}