import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";
import DeletePlanButton from "@/components/DeletePlanButton";

export default async function PlansPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) redirect("/auth/login");

  await connectToDB();
  const plans = await PracticePlan.find({ userId }).sort({ createdAt: -1 }).lean();

  return (
    <div className="app-canvas min-h-screen">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="mb-2 text-4xl font-black tracking-tight text-[#0d3b3a] md:text-5xl">
              Practice Plans 🎯
            </h1>
            <p className="text-lg text-[#1a2e2c]/70">Create and manage your practice goals</p>
          </div>

          <Link
            href="/plans/new"
            className="flex items-center space-x-2 rounded-2xl bg-[#0d3b3a] px-6 py-3 font-bold text-[#faf6f0] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0d3b3a]/20"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            <span>New Plan</span>
          </Link>
        </div>

        {/* Plans Grid */}
        {plans.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((p: any) => {
              const id = String(p._id);

              return (
                <div
                  key={id}
                  className="soft-card interactive-lift rounded-3xl p-8"
                >
                  {/* Icon header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d3b3a] shadow-lg shadow-[#0d3b3a]/15">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/plans/${id}/edit`}
                        className="rounded-xl p-2 transition-colors hover:bg-[#0d3b3a]/5"
                        title="Edit plan"
                      >
                        <svg className="h-5 w-5 text-[#0d3b3a]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                      </Link>
                      <DeletePlanButton planId={id} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-[#0d3b3a]">{p.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center rounded-full bg-[#0d3b3a]/8 px-3 py-1 font-semibold text-[#0d3b3a]">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                          </svg>
                          {p.instrumentOrSkill}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-[#f4a261]/15 px-3 py-1 font-semibold text-[#8b4c16]">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          {p.weeklyTargetMinutes} min/week
                        </span>
                      </div>
                    </div>

                    {p.goalDescription && (
                      <div className="rounded-xl border border-[#c9d8c5] bg-white/70 p-4">
                        <p className="mb-1 text-sm font-semibold text-[#0d3b3a]">Goal</p>
                        <p className="text-[#1a2e2c]/75">{p.goalDescription}</p>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="pt-4 border-t-2 border-purple-100">
                      <Link
                        href="/sessions/new"
                        className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#0d3b3a] px-4 py-3 font-bold text-[#faf6f0] transition-all hover:shadow-lg hover:shadow-[#0d3b3a]/20"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
                        </svg>
                        <span>Log Session</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="soft-card rounded-3xl p-12 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0d3b3a] shadow-lg shadow-[#0d3b3a]/15">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-[#0d3b3a]">No practice plans yet</h3>
            <p className="mx-auto mb-8 max-w-md text-[#1a2e2c]/70">
              Create your first practice plan to set goals and track your progress toward musical mastery!
            </p>
            <Link
              href="/plans/new"
              className="inline-flex items-center space-x-2 rounded-full bg-[#0d3b3a] px-8 py-4 font-bold text-[#faf6f0] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0d3b3a]/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              <span>Create Your First Plan</span>
            </Link>
          </div>
        )}

        {/* Quick tip */}
        {plans.length > 0 && (
          <div className="glass-surface mt-8 rounded-3xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#f4a261]">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-[#0d3b3a]">💡 Pro Tip</h4>
                <p className="text-[#1a2e2c]/75">
                  Set realistic weekly targets! It's better to practice 15 minutes daily than cram 2 hours once a week. Consistency is key to improvement.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

