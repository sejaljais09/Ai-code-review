import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {session.user?.name}
      </h1>

      <p className="mt-4">
        AI Code Review Dashboard 🚀
      </p>
    </div>
  );
}