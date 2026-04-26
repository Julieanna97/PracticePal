import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import LoginClient from "./LoginClient";

type Props = {
  searchParams?: Promise<{ callbackUrl?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  const sp = (await searchParams) ?? {};
  const callbackUrl = sp.callbackUrl;

  if (session?.user) {
    if (callbackUrl && callbackUrl.startsWith("/")) {
      redirect(callbackUrl);
    }

    redirect("/dashboard");
  }

  return <LoginClient callbackUrl={callbackUrl ?? "/dashboard"} error={sp.error} />;
}