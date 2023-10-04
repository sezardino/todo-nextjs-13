"use client";

import { UserSettingsResponse } from "@/services/db/modules/user/types";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { SettingsForm, SettingsFormValues } from "../forms/SettingsForm";

export type SettingsTemplateProps = ComponentPropsWithoutRef<"section"> & {
  settings: UserSettingsResponse;
  onUpdateSettings: (values: SettingsFormValues) => Promise<void>;
};

export const SettingsTemplate = (props: SettingsTemplateProps) => {
  const { settings, onUpdateSettings, className, ...rest } = props;

  return (
    <section {...rest} className={twMerge(className)}>
      <h1 className="text-lg font-semibold leading-7 text-gray-900">
        Settings
      </h1>
      {JSON.stringify(settings)}
      <SettingsForm
        initialValues={{
          login: settings.login || undefined,
          bio: settings.bio || undefined,
          image: settings.image || undefined,
          name: settings.name || undefined,
          email: settings.email || undefined,
          location: settings.localization || undefined,
        }}
        onFormSubmit={onUpdateSettings}
      />
    </section>
  );
};
