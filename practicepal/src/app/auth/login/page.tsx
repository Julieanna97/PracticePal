import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import LoginClient from "./LoginClient";

type Props = {
  searchParams?: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  const sp = (await searchParams) ?? {};
  const cb = sp.callbackUrl;

  if (session?.user) {
    if (cb && cb.startsWith("/")) redirect(cb);
    redirect("/dashboard");
  }

  return <LoginClient />;
}
