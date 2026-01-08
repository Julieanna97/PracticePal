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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-2">
              Practice Plans 🎯
            </h1>
            <p className="text-lg text-gray-600">Create and manage your practice goals</p>
          </div>

          <Link
            href="/plans/new"
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl px-6 py-3 font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
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
                  className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                >
                  {/* Icon header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/plans/${id}/edit`}
                        className="p-2 rounded-xl hover:bg-purple-50 transition-colors"
                        title="Edit plan"
                      >
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                      </Link>
                      <DeletePlanButton planId={id} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                          </svg>
                          {p.instrumentOrSkill}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          {p.weeklyTargetMinutes} min/week
                        </span>
                      </div>
                    </div>

                    {p.goalDescription && (
                      <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-100">
                        <p className="text-sm font-semibold text-purple-700 mb-1">Goal</p>
                        <p className="text-gray-700">{p.goalDescription}</p>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="pt-4 border-t-2 border-purple-100">
                      <Link
                        href="/sessions/new"
                        className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-4 py-3 font-bold hover:shadow-lg transition-all"
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
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No practice plans yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first practice plan to set goals and track your progress toward musical mastery!
            </p>
            <Link
              href="/plans/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
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
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-purple-50 rounded-3xl p-6 border-2 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-purple-900 mb-1">💡 Pro Tip</h4>
                <p className="text-purple-800">
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