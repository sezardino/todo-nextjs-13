"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { useRegistrationMutation } from "@/libs/react-query/hooks/mutation/registration";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();
  const { mutateAsync: registrationHandler } = useRegistrationMutation();

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
