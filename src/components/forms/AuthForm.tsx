"use client";

import { Form, FormikProvider, useFormik } from "formik";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { FormikInput } from "../fields/FormikInput";
import { FormikPasswordInput } from "../fields/FormikPasswordInput";

export interface AuthFormValues {
  email: string;
  password: string;
}

export interface AuthFormProps extends ComponentPropsWithoutRef<"form"> {}

export const AuthForm: FC<AuthFormProps> = (props) => {
  const { className, ...rest } = props;

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={className}>
        <pre>{JSON.stringify(formik.values)}</pre>
        <FormikInput name="email" label="Email" placeholder="Email" />
        <FormikPasswordInput
          name="password"
          label="Password"
          placeholder="Password"
        />
      </Form>
    </FormikProvider>
  );
};
