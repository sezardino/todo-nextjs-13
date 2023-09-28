"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectApiUrls, ProjectPageUrls } from "@/const/url";
import { RegistrationDto } from "@/services/db/modules/auth/types";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();

  const registrationHandler = async (data: AuthFormValues) => {
    const body: RegistrationDto = {
      login: data.login,
      password: data.password,
    };

    const res = await fetch(ProjectApiUrls.registration, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    router.push(ProjectPageUrls.login);
  };

  return (
    <>
      <AuthTemplate
        title="Sign Up"
        onFormSubmit={registrationHandler}
        type="registration"
      />
    </>
  );
};

export default RegistrationPage;
