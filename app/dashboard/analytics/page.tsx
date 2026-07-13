import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import StatsCards from "@/components/dashboard/stats-cards";

export default async function AnalyticsPage() {
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
  });

  const totalReviews = reviews.length;

  const averageScore =
    totalReviews === 0
      ? 0
      : Math.round(
          reviews.reduce((sum, review) => sum + review.score, 0) /
            totalReviews
        );

  const totalBugs = reviews.reduce(
    (sum, review) => sum + review.bugs.length,
    0
  );

  const totalSuggestions = reviews.reduce(
    (sum, review) => sum + review.suggestions.length,
    0
  );

  return (
    <DashboardLayout name={session.user.name ?? "User"}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics</h1>

        <StatsCards
          stats={{
            totalReviews,
            averageScore,
            totalBugs,
            totalSuggestions,
          }}
        />
      </div>
    </DashboardLayout>
  );
}