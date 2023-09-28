"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { signIn } from "next-auth/react";

const AuthPage = () => {
  const signInHandler = async (values: AuthFormValues) => {
    signIn("credentials", {
      ...values,
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <>
      <AuthTemplate title="Sign In" type="login" onFormSubmit={signInHandler} />
    </>
  );
};

export default AuthPage;
