export default async function PlansPage() {
  const res = await fetch("http://localhost:3000/api/plans", {
    cache: "no-store",
  });

  const plans = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Practice Plans</h1>

      <ul className="mt-4 space-y-3">
        {plans.map((p: any) => (
          <li key={p._id} className="rounded-lg border p-4">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-600">
              {p.instrumentOrSkill} • {p.weeklyTargetMinutes} min/week
            </div>
            <p className="mt-2 text-sm">{p.goalDescription}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
