"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (!res?.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
      <p className="mt-2 text-gray-600">Welcome back to PracticePal.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-gray-200 px-4 py-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button className="w-full rounded-lg bg-purple-600 px-4 py-3 text-white hover:bg-purple-700">
          Login
        </button>
      </form>

      <div className="mt-6 space-y-2">
        <button
          className="w-full rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50"
          onClick={() => signIn("google", { callbackUrl })}
        >
          Continue with Google
        </button>

        <button
          className="w-full rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50"
          onClick={() => signIn("facebook", { callbackUrl })}
        >
          Continue with Facebook
        </button>
      </div>
    </main>
  );
}
