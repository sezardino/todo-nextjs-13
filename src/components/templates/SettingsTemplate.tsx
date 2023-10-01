"use client";

import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { SettingsForm } from "../forms/SettingsForm";

export type SettingsTemplateProps = ComponentPropsWithoutRef<"section"> & {};

export const SettingsTemplate = (props: SettingsTemplateProps) => {
  const { className, ...rest } = props;

  return (
    <section {...rest} className={twMerge(className)}>
      <h1 className="text-lg font-semibold leading-7 text-gray-900">
        Settings
      </h1>

      <SettingsForm onFormSubmit={console.log} />
    </section>
  );
};
