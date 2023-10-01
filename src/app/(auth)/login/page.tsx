"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { signInHandler } from "./handlers";

const AuthPage = () => {
  const signIn = async (values: AuthFormValues) => {
    console.log(values);
    signInHandler(values);
  };

  return (
    <>
      <AuthTemplate title="Sign In" type="login" onFormSubmit={signIn} />
    </>
  );
};

export default AuthPage;
