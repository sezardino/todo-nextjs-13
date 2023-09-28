"use client";

import { ProjectPageUrls } from "@/const/url";
import { Button, Link } from "@nextui-org/react";
import { Form, FormikProvider, useFormik } from "formik";
import LinkComponent from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormikInput } from "../fields/FormikInput";
import { FormikPasswordInput } from "../fields/FormikPasswordInput";

export interface AuthFormValues {
  login: string;
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
  const { type, onSubmit, className, ...rest } = props;

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        login: z.string(),
        password: z.string().min(8),
      })
    ),
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge("space-y-6", className)}>
        <FormikInput name="login" label="Login" placeholder="Login" />
        <FormikPasswordInput
          name="password"
          label="Password"
          placeholder="Password"
        />
        {type === "registration" && (
          <Link as={LinkComponent} size="sm" href={ProjectPageUrls.login}>
            Already have an account?
          </Link>
        )}
        {type === "login" && (
          <Link
            as={LinkComponent}
            size="sm"
            href={ProjectPageUrls.registration}
          >
            Don&rsquo;t have an account?{" "}
          </Link>
        )}

        <Button type="submit" className="w-full">
          {type === "login" ? "Login" : "Register"}
        </Button>
      </Form>
    </FormikProvider>
  );
};
