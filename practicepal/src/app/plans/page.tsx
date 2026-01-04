import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";

export default async function PlansPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  await connectToDB();
  const plans = await PracticePlan.find({ userId }).sort({ createdAt: -1 }).lean();

  return (
    <main className="mx-auto max-w-5xl px-6 py-8 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Practice Plans</h1>
            <p className="mt-2 text-gray-600">Create and manage your practice plans</p>
          </div>

          <Link
            href="/plans/new"
            className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            New Plan
          </Link>
        </div>

        {/* Plans List */}
        {plans.length > 0 ? (
          <div className="space-y-4">
            {plans.map((p: any) => (
              <div
                key={p._id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {p.instrumentOrSkill} • {p.weeklyTargetMinutes} min/week
                    </p>
                    {p.goalDescription && (
                      <p className="mt-2 text-sm text-gray-500">{p.goalDescription}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button className="rounded px-3 py-1 text-xs text-gray-600 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="rounded px-3 py-1 text-xs text-red-600 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">No plans yet</h3>
            <p className="mt-2 text-gray-600">Create your first practice plan to get started</p>

            <Link
              href="/plans/new"
              className="mt-4 inline-block rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              Create Plan
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
