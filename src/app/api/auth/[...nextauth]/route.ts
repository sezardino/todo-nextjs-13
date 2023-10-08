import { nextAuthOptions } from "@/libs/next-auth";
import NextAuth from "next-auth";

// const loginValidationService = z.object({
//   login: z.string(),
//   password: z.string(),
// });

// const authorize: CredentialsConfig["authorize"] = async (credentials) => {
//   const validation = loginValidationService.safeParse(credentials);

//   if (!validation.success) return null;

//   try {
//     const response = await dbService.auth.login({
//       login: validation.data.login,
//       password: validation.data.password,
//     });

//     if ("code" in response || !response) return null;

//     return {
//       id: response.id,
//       login: response.login,
//     };
//   } catch (error) {
//     return null;
//   }
// };

// export const nextAuthOptions = getNextAuthOptions(authorize);
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
