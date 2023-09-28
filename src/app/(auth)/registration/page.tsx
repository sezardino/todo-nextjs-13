"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { useRouter } from "next/navigation";
import { registrationHandler } from "./handlers";

const RegistrationPage = () => {
  const router = useRouter();

  const registration = async (data: AuthFormValues) => {
    try {
      await registrationHandler(data);
      router.push(ProjectPageUrls.login);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthTemplate
        title="Sign Up"
        onFormSubmit={registration}
        type="registration"
      />
    </>
  );
};

export default RegistrationPage;
