import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import SettingsLayout from "@/components/settings/settings-layout";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SettingsLayout
      user={{
        name: session.user.name ?? "",
        email: session.user.email ?? "",
      }}
    />
  );
}