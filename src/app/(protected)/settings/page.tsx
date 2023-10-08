"use client";

import { SettingsFormValues } from "@/components/forms/SettingsForm";
import { SettingsTemplate } from "@/components/templates/SettingsTemplate";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { useUpdateSettingsMutation } from "@/libs/react-query/hooks/mutation/update-settings";
import { useSettingsQuery } from "@/libs/react-query/hooks/query/settings";
import { useCallback } from "react";

const SettingsPage = () => {
  const { data: settingsData, isLoading: isSettingsLoading } =
    useSettingsQuery();

  const { mutateAsync: updateSettings, isLoading: isUpdateSettingsLoading } =
    useUpdateSettingsMutation();

  const updateSettingsHandler = useCallback(
    (values: SettingsFormValues) =>
      updateSettings({
        bio: values.bio,
        image: values.image,
        localization: values.location,
        name: values.name,
        email: values.email,
        socials: values.socials,
      }),
    [updateSettings]
  );

  const isLoading = isSettingsLoading || isUpdateSettingsLoading;

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {settingsData && (
        <SettingsTemplate
          onUpdateSettings={updateSettingsHandler}
          settings={settingsData}
        />
      )}
    </>
  );
};

export default SettingsPage;
