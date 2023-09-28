import { getNextAuthOptions } from "@/libs/next-auth";
import NextAuth from "next-auth";
import { CredentialsConfig } from "next-auth/providers/credentials";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const authorize: CredentialsConfig["authorize"] = async (credentials) => {
  return { email: credentials?.email, id: "1" };
};

const handler = NextAuth(getNextAuthOptions(authorize));

export { handler as GET, handler as POST };
