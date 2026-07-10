import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashboardContent from "@/components/dashboard/dashboard-content";
export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardLayout name={session.user?.name || "User"}>
      <div className="rounded-xl bg-white p-8 shadow-sm margin-bottom-6">
        <h1 className="text-3xl font-bold">
          Welcome, {session.user?.name} 
        </h1>

        <p className="mt-3 text-gray-600">
          Start reviewing your code with AI.
        </p>
      </div>
    <DashboardContent/>
    </DashboardLayout>
  );
}