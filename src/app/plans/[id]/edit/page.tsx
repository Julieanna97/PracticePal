import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { PracticePlan } from "@/models/PracticePlan";
import EditPlanForm from "@/components/EditPlanForm";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPlanPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) redirect("/auth/login");

  await connectToDB();

  const plan = await PracticePlan.findOne({ _id: id, userId }).lean();
  if (!plan) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Back Navigation */}
        <Link 
          href="/plans"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-8 transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back to Plans
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-indigo-600 to-indigo-800 rounded-3xl shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="20" cy="20" r="15" fill="white" opacity="0.3"/>
                  <circle cx="80" cy="80" r="20" fill="white" opacity="0.2"/>
                </svg>
              </div>
              <svg className="w-12 h-12 text-white relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-900 mb-3">
            Edit Practice Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Update your goals and targets to keep your practice on track
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-100 p-8 md:p-10">
          {/* Current Plan Info Banner */}
          <div className="mb-8 bg-gradient-to-r from-purple-100 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900 mb-2">Current Plan</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800 font-medium">Title:</span>
                    <span className="text-sm text-purple-900 font-bold">{String(plan.title)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800 font-medium">Instrument:</span>
                    <span className="text-sm text-purple-900 font-bold">{String(plan.instrumentOrSkill)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-800 font-medium">Weekly Target:</span>
                    <span className="text-sm text-purple-900 font-bold">{Number(plan.weeklyTargetMinutes)} min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-6 border-b-2 border-purple-100">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Update Details</h2>
            </div>

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

        {/* Help Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-100 rounded-3xl p-6 border-2 border-purple-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-purple-900 mb-2">💡 Tips for Setting Goals</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Start with realistic weekly targets you can consistently hit</li>
                <li>• You can always increase your target as you build the habit</li>
                <li>• Be specific in your goal description (e.g., "Master major scales" vs "Get better")</li>
                <li>• Review and adjust your plans monthly based on progress</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Stats Preview */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <Link
            href="/dashboard"
            className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 text-center hover:shadow-xl hover:border-purple-300 transition-all group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">Go to</p>
            <p className="font-bold text-gray-900">Dashboard</p>
          </Link>

          <Link
            href="/sessions/new"
            className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 text-center hover:shadow-xl hover:border-purple-300 transition-all group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">Quick</p>
            <p className="font-bold text-gray-900">Log Session</p>
          </Link>

          <Link
            href="/stats"
            className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 text-center hover:shadow-xl hover:border-purple-300 transition-all group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">View</p>
            <p className="font-bold text-gray-900">Your Stats</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

