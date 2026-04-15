// src/lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Account } from "@/models/Account";

type Role = "FREE" | "PRO" | "ADMIN";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDB();
        const user = await User.findOne({ email: credentials.email }).lean();
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;

        const role = (user.role ?? "FREE") as Role;

        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? user.email,
          role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.type !== "oauth") return true;
      if (!user.email) return false;

      await connectToDB();

      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          name: user.name,
          role: "FREE",
        });
      }

      await Account.findOneAndUpdate(
        { provider: account.provider, providerAccountId: account.providerAccountId },
        {
          userId: String(dbUser._id),
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
        { upsert: true, new: true }
      );

      user.id = String(dbUser._id);
      user.role = (dbUser.role ?? "FREE") as Role;

      return true;
    },

    async jwt({ token, user }) {
      // At sign-in time
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role ?? "FREE";
      }

      // Always refresh role/status from DB (so webhook changes show immediately)
      if (token?.id) {
        try {
          await connectToDB();
          const dbUser = await User.findById(token.id)
            .select({ role: 1, stripeStatus: 1, stripeSubscriptionId: 1, stripeCustomerId: 1 })
            .lean();

          if (dbUser) {
            token.role = (dbUser.role ?? "FREE") as Role;
            (token as any).stripeStatus = dbUser.stripeStatus ?? null;
            (token as any).stripeSubscriptionId = dbUser.stripeSubscriptionId ?? null;
            (token as any).stripeCustomerId = dbUser.stripeCustomerId ?? null;
          }
        } catch {
          // ignore DB errors, keep existing token values
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token?.id) {
        (session.user as any).id = token.id;
        (session.user as any).role = (token as any).role ?? "FREE";
        (session.user as any).stripeStatus = (token as any).stripeStatus ?? null;
        (session.user as any).stripeSubscriptionId = (token as any).stripeSubscriptionId ?? null;
        (session.user as any).stripeCustomerId = (token as any).stripeCustomerId ?? null;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Ensure redirects go to the correct base URL, not localhost:3000
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
};
