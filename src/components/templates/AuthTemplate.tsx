"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";
import { AuthForm, AuthFormProps } from "../forms/AuthForm";

export type AuthTemplateProps = ComponentPropsWithoutRef<"div"> & {
  onFormSubmit: AuthFormProps["onSubmit"];
  type: AuthFormProps["type"];
  title: string;
};

export const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const { onFormSubmit, type, title, className, ...rest } = props;

  return (
    <section
      {...rest}
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm onSubmit={onFormSubmit} type={type} />
      </div>
    </section>
  );
};
