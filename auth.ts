import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      barNumber?: string;
      district?: string;
      experience?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
    barNumber?: string;
    district?: string;
    experience?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            barNumber: user.barNumber,
            district: user.district,
            experience: user.experience,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.barNumber = token.barNumber as string;
        session.user.district = token.district as string;
        session.user.experience = token.experience as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.barNumber = user.barNumber;
        token.district = user.district;
        token.experience = user.experience;
      }

      // Handle OAuth sign-in
      if (account?.provider === "google" || account?.provider === "facebook") {
        // For OAuth users, set default role as CLIENT
        if (!token.role) {
          token.role = "CLIENT";

          // Update user in database with default role
          try {
            await prisma.user.update({
              where: { id: token.sub! },
              data: { role: "CLIENT" },
            });
          } catch (error) {
            console.error("Error updating OAuth user role:", error);
          }
        }
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      // Allow OAuth sign-ins
      if (account?.provider === "google" || account?.provider === "facebook") {
        return true;
      }

      // Allow credentials sign-in
      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },
  },
  events: {
    async createUser({ user }) {
      console.log("New user created:", user.email);
    },
    async signIn({ user, account, isNewUser }) {
      console.log(
        "User signed in:",
        user.email,
        "Provider:",
        account?.provider
      );
    },
  },
});
