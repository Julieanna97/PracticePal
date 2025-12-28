import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Account } from "@/models/Account";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,   // 7 days
    updateAge: 24 * 60 * 60,    // refresh token every 24h (if user is active)
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,   // keep JWT aligned with session maxAge
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

        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? user.email,
          role: user.role ?? "FREE",
        } as any;
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
      // For credentials, user already exists
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

      // Link provider account → user
      await Account.findOneAndUpdate(
        { provider: account.provider, providerAccountId: account.providerAccountId },
        { userId: String(dbUser._id), provider: account.provider, providerAccountId: account.providerAccountId },
        { upsert: true, new: true }
      );

      // Make sure NextAuth knows our DB user id
      (user as any).id = String(dbUser._id);
      (user as any).role = dbUser.role;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
        token.role = (user as any).role ?? "FREE";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};
