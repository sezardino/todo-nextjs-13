"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

const RegistrationPage = () => {
  const registrationHandler = async (data: AuthFormValues) => {
    const res = await fetch("/api/auth/registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const result = await res.json();
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
