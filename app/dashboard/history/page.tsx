import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import Link from "next/link";
import HistoryCard from "@/components/dashboard/history-card";

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const reviews = await prisma.review.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <DashboardLayout name={session.user?.name ?? "User"}>
      <div className="space-y-5">

        <h1 className="text-3xl font-bold">
          Review History
        </h1>

        {reviews.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            No reviews yet.
          </div>
        ) : (
         reviews.map((review) => (
         <HistoryCard
          key={review.id}
          review={review}
         />
        ))
        )}

      </div>
    </DashboardLayout>
  );
}