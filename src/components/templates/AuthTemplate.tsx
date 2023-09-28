"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";
import { AuthForm, AuthFormProps } from "../forms/AuthForm";

export type AuthTemplateProps = ComponentPropsWithoutRef<"div"> & {
  onSignIn: AuthFormProps["onSubmit"];
};

export const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const { onSignIn, className, ...rest } = props;

  return (
    <section {...rest} className={className}>
      <AuthForm onSubmit={onSignIn} />
    </section>
  );
};
