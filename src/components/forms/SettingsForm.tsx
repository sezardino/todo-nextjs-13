"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";

import { Button } from "@nextui-org/react";
import { Form, FormikProvider, useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Icon } from "../base/Icon";
import { BaseInput } from "../base/Input";
import { FormikInput } from "../fields/FormikInput";
import { FormikTextarea } from "../fields/FormikTextarea";

export interface SettingsFormValues {
  login?: string;
  bio?: string;
  image?: string;
  name?: string;
  email?: string;
  location?: string;
  socials?: string[];
}

export interface SettingsFormProps extends ComponentPropsWithoutRef<"form"> {
  initialValues?: Partial<SettingsFormValues>;
  onFormSubmit: (values: SettingsFormValues) => void;
}

export const SettingsForm: FC<SettingsFormProps> = (props) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;

  const formik = useFormik<SettingsFormValues>({
    initialValues: {
      login: initialValues?.login || undefined,
      bio: initialValues?.bio || undefined,
      image: initialValues?.image || undefined,
      name: initialValues?.name || undefined,
      email: initialValues?.email || undefined,
      location: initialValues?.location || undefined,
      socials: initialValues?.socials || [""],
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        bio: z.string().optional(),
        image: z.string().optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        location: z.string().optional(),
        socials: z.array(z.string().optional()).optional(),
      })
    ),
    onSubmit: onFormSubmit,
  });

  const addEmptySocial = () => {
    const socials = formik.values.socials || [];

    formik.setFieldValue("socials", [...socials, ""]);
  };

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge(className)}>
        <div className="space-y-12">
          <figcaption className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              <BaseInput
                label="Login"
                readOnly
                isReadOnly
                value={formik.values.login}
              />
              <FormikTextarea name="bio" label="Bio" />
              <FormikInput name="image" label="Avatar Url" />
            </div>
          </figcaption>

          <figcaption className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              <FormikInput name="name" label="Name" />
              <FormikInput name="email" label="Email" />
              <FormikInput name="location" label="Location" />
            </div>
          </figcaption>
          <figcaption className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Socials
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              {formik.values.socials?.map((_, index) => (
                <FormikInput
                  key={index}
                  name={`socials.${index}`}
                  label={`Social ${index + 1}`}
                />
              ))}
              <Button
                isIconOnly
                className="mx-auto"
                onClick={addEmptySocial}
                aria-label="add new social"
              >
                <Icon name="HiPlusCircle" />
              </Button>
            </div>
          </figcaption>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};
