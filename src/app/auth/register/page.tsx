"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not create account");
      return;
    }

    // auto-login after signup
    const login = await signIn("credentials", { email, password, redirect: false });
    if (login?.ok) router.push("/dashboard");
    else router.push("/auth/signin");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
      <p className="mt-2 text-gray-600">Create your PracticePal account.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3"
          placeholder="Password (min 8)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button className="w-full rounded-lg bg-purple-600 px-4 py-3 text-white hover:bg-purple-700">
          Create account
        </button>
      </form>
    </main>
  );
}
