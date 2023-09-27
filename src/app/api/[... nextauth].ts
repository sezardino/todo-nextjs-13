import { prisma } from "@/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const CREDENTIAL_NAME = "Credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: CREDENTIAL_NAME,
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as Credentials;

        console.log(email, password);

        return null;
      },
    }),
  ],
  session: {},
  pages: {
    signIn: "/auth",
  },
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
