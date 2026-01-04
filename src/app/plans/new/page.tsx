import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import NewPlanForm from "@/components/NewPlanForm";

export default async function NewPlanPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-2xl border border-purple-100 bg-white shadow-xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Create a new plan</h1>
        <p className="mt-2 text-gray-600">
          Set a clear weekly goal and track your progress consistently.
        </p>

        <div className="mt-8">
          <NewPlanForm />
        </div>
      </div>
    </main>
  );
}
