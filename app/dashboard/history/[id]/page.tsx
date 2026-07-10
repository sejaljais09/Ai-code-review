import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import ReviewPanel from "@/components/dashboard/review-panel";

export default async function ReviewDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { id } = await params;

  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    redirect("/dashboard/history");
  }

  return (
    <DashboardLayout name={session.user?.name ?? "User"}>
      <ReviewPanel review={review} />
    </DashboardLayout>
  );
}