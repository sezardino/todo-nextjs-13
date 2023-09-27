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
      <Form {...rest} className={twMerge("grid grid-cols-1 gap-3", className)}>
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
