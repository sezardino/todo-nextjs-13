"use client";

import { UserSettingsResponse } from "@/services/db/modules/user/types";
import { ComponentPropsWithoutRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ConfirmDialog } from "../base/ConfirmDialog";
import { Icon } from "../base/Icon";
import { SettingsForm, SettingsFormValues } from "../forms/SettingsForm";

export type SettingsTemplateProps = ComponentPropsWithoutRef<"section"> & {
  settings: UserSettingsResponse;
  onUpdateSettings: (values: SettingsFormValues) => Promise<void>;
};

const settingsResponseToFormValues = (
  response: UserSettingsResponse
): Partial<SettingsFormValues> => ({
  login: response.login || undefined,
  bio: response.bio || undefined,
  image: response.image || undefined,
  name: response.name || undefined,
  email: response.email || undefined,
  location: response.localization || undefined,
  socials: response.socials.length ? response.socials : [""],
});

const checkWhatSettingsWasChanged = (
  oldSettings: UserSettingsResponse,
  newSettings: SettingsFormValues
): SettingsFormValues => {
  const changed: Partial<SettingsFormValues> = {};
  const formattedSettings: SettingsFormValues =
    settingsResponseToFormValues(oldSettings);
  console.log({ newSettings, oldSettings, formattedSettings });

  if (formattedSettings.bio !== newSettings.bio) {
    changed.bio = newSettings.bio;
  }

  if (formattedSettings.image !== newSettings.image) {
    changed.image = newSettings.image;
  }

  if (formattedSettings.location !== newSettings.location) {
    changed.location = newSettings.location;
  }

  if (formattedSettings.name !== newSettings.name) {
    changed.name = newSettings.name;
  }

  if (formattedSettings.email !== newSettings.email) {
    changed.email = newSettings.email;
  }

  if (
    JSON.stringify(formattedSettings.socials) !==
    JSON.stringify(newSettings.socials)
  ) {
    changed.socials = newSettings.socials;
  }
  console.log(
    JSON.stringify(formattedSettings.socials) !==
      JSON.stringify(newSettings.socials)
  );

  return changed;
};

export const SettingsTemplate = (props: SettingsTemplateProps) => {
  const { settings, onUpdateSettings, className, ...rest } = props;
  const [settingsToUpdate, setSettingsToUpdate] =
    useState<SettingsFormValues | null>(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  const closeChangeModal = () => {
    setIsChangeModalOpen(false);
    setSettingsToUpdate(null);
  };

  const onFormSubmit = (values: SettingsFormValues) => {
    const newValues = checkWhatSettingsWasChanged(settings, values);

    if (!Object.keys(newValues).length) return;

    setSettingsToUpdate(newValues);
    setIsChangeModalOpen(true);
  };

  const onConfirmUpdate = async () => {
    if (!settingsToUpdate) return;

    try {
      await onUpdateSettings(settingsToUpdate);
      closeChangeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section {...rest} className={twMerge(className)}>
        <h1 className="text-lg font-semibold leading-7 text-gray-900">
          Settings
        </h1>
        <SettingsForm
          initialValues={settingsResponseToFormValues(settings)}
          onFormSubmit={onFormSubmit}
        />
      </section>

      {!!settingsToUpdate && (
        <ConfirmDialog
          title="Confirm action"
          description="Are you shure that you want this settings?"
          isOpen={isChangeModalOpen}
          onClose={closeChangeModal}
          cancelButton={{
            label: "Cancel",
            onClick: closeChangeModal,
          }}
          confirmButton={{
            label: "Confirm",
            onClick: onConfirmUpdate,
          }}
        >
          {Object.entries(settingsToUpdate).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Icon name="HiCheck" className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-900">
                {(typeof value === "string" || typeof value === "number") && (
                  <>
                    {key}:{value}
                  </>
                )}
                {Array.isArray(value) && (
                  <>
                    {key}:
                    <ol>
                      {value.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </>
                )}
              </span>
            </div>
          ))}
        </ConfirmDialog>
      )}
    </>
  );
};
