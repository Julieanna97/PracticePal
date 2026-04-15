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
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,#ede9fe_0%,transparent_36%),radial-gradient(circle_at_88%_6%,#dbeafe_0%,transparent_34%),#f8fafc]">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.55)] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-700">Practice Plans</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Create a new plan</h1>
          <p className="mt-2 text-slate-600">
            Set a focused weekly target and build consistency with sessions.
          </p>

          <div className="mt-8">
            <NewPlanForm />
          </div>
        </div>
      </main>
    </div>
  );
}

