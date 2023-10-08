import { dbService } from "@/services/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";

const loginValidationService = z.object({
  login: z.string(),
  password: z.string(),
});

export const nextAuthOptions: NextAuthOptions = {
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
          login: token.login,
        },
      };
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          login: user.login,
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
        login: { type: "login", placeholder: "login" },
        password: {
          type: "password",
          placeholder: String.fromCharCode(9679).repeat(10),
        },
      },
      async authorize(credentials) {
        const validation = loginValidationService.safeParse(credentials);

        if (!validation.success) return null;

        try {
          const response = await dbService.auth.login({
            login: validation.data.login,
            password: validation.data.password,
          });

          if ("code" in response || !response) return null;

          return {
            id: response.id,
            login: response.login,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};
