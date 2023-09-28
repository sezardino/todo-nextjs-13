import { LoginDto } from "@/services/db/modules/auth/types";
import { signIn } from "next-auth/react";

export const signInHandler = async (dto: LoginDto) => {
  signIn("credentials", {
    ...dto,
    callbackUrl: "/",
    redirect: true,
  });
};
