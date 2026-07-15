import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import SettingsContent from "@/components/dashboard/settings-content";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayout name={session.user.name ?? "User"}>
      <SettingsContent
        user={{
          name: session.user.name ?? "",
          email: session.user.email ?? "",
        }}
      />
    </DashboardLayout>
  );
}