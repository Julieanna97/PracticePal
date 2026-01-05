import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";
import EditPlanForm from "@/components/EditPlanForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPlanPage({ params }: Props) {
  const { id } = await params; // ✅ REQUIRED in Next 16

  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) redirect("/auth/login");

  await connectToDB();

  const plan = await PracticePlan.findOne({ _id: id, userId }).lean();
  if (!plan) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-8 bg-gray-50 min-h-screen">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Edit plan</h1>
        <p className="mt-1 text-gray-600">Update your practice plan details.</p>

        <div className="mt-6">
          <EditPlanForm
            planId={String(plan._id)}
            initial={{
              title: String(plan.title ?? ""),
              instrumentOrSkill: String(plan.instrumentOrSkill ?? ""),
              weeklyTargetMinutes: Number(plan.weeklyTargetMinutes ?? 150),
              goalDescription: String(plan.goalDescription ?? ""),
            }}
          />
        </div>
      </div>
    </main>
  );
}
