import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashboardContent from "@/components/dashboard/dashboard-content";
export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  const user = await prisma.user.findUnique({
  where: {
    email: session.user?.email!,
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
  (sum, review) => sum + (review.bugs as any[]).length,
  0
);

const totalSuggestions = reviews.reduce(
  (sum, review) => sum + (review.suggestions as any[]).length,
  0
);

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
    <DashboardContent
  stats={{
    totalReviews,
    averageScore,
    totalBugs,
    totalSuggestions,
  }}
/>
    </DashboardLayout>
  );
}