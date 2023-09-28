"use client";

import { Button } from "@nextui-org/react";
import { Form, FormikProvider, useFormik } from "formik";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { FormikInput } from "../fields/FormikInput";
import { FormikPasswordInput } from "../fields/FormikPasswordInput";

export interface AuthFormValues {
  email: string;
  password: string;
}

export type AuthFormProps = Omit<
  ComponentPropsWithoutRef<"form">,
  "onSubmit"
> & {
  onSubmit: (values: AuthFormValues) => void;
  type: "login" | "registration";
};

export const AuthForm: FC<AuthFormProps> = (props) => {
  const { onSubmit, className, ...rest } = props;

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge("space-y-6", className)}>
        <pre>{JSON.stringify(formik.values)}</pre>
        <FormikInput name="email" label="Email" placeholder="Email" />
        <FormikPasswordInput
          name="password"
          label="Password"
          placeholder="Password"
        />
        <Button type="submit" className="justify-self-start">
          Submit
        </Button>
      </Form>
    </FormikProvider>
  );
};
