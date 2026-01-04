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
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // refresh token every 24h (if user is active)
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

        // This object becomes `user` inside callbacks.jwt (typed via augmentation)
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
      // Credentials users already exist in DB
      if (!account || account.type !== "oauth") return true;
      if (!user.email) return false;

      await connectToDB();

      // Find or create DB user
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          name: user.name,
          role: "FREE",
        });
      }

      // Link provider account -> user
      await Account.findOneAndUpdate(
        { provider: account.provider, providerAccountId: account.providerAccountId },
        {
          userId: String(dbUser._id),
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
        { upsert: true, new: true }
      );

      // Ensure `user` has our DB fields (typed via next-auth.d.ts)
      user.id = String(dbUser._id);
      user.role = (dbUser.role ?? "FREE") as Role;

      return true;
    },

    async jwt({ token, user }) {
      // When user is present, it’s sign-in time
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "FREE";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role ?? "FREE";
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};
