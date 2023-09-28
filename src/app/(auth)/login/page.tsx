"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

const AuthPage = () => {
  const signInHandler = async (values: AuthFormValues) => {
    signInHandler(values);
  };

  return (
    <>
      <AuthTemplate title="Sign In" type="login" onFormSubmit={signInHandler} />
    </>
  );
};

export default AuthPage;
