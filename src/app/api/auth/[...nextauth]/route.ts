import { getNextAuthOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";
import { passwordService } from "@/services/password";
import NextAuth from "next-auth";
import { CredentialsConfig } from "next-auth/providers/credentials";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const authorize: CredentialsConfig["authorize"] = async (credentials) => {
  const validation = validationSchema.safeParse(credentials);

  if (!validation.success) return null;

  const user = await prisma.user.findUnique({
    where: { email: validation.data.email },
  });

  if (!user) return null;

  const isPasswordMatch = await passwordService.compare(
    validation.data.password,
    user.password
  );

  if (!isPasswordMatch) return null;

  return { email: user.email, id: user.id };
};

export const nextAuthOptions = getNextAuthOptions(authorize);
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
