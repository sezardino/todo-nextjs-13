import { NextAuthOptions } from "next-auth";
import CredentialsProvider, {
  CredentialsConfig,
} from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const getNextAuthOptions = (
  authorize: CredentialsConfig["authorize"]
): NextAuthOptions => ({
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
        },
      };
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { type: "email", placeholder: "name@example.com" },
        password: {
          type: "password",
          placeholder: String.fromCharCode(9679).repeat(10),
        },
      },
      authorize,
    }),
  ],
});
