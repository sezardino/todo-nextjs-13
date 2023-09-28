import { ArgonTwo } from "@/libs/argon-two";

export const passwordService = new ArgonTwo(process.env.PASSWORD_SECRET!);
