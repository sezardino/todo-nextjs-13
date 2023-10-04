"use client";

import { SettingsTemplate } from "@/components/templates/SettingsTemplate";
import { useUpdateSettingsMutation } from "@/libs/react-query/hooks/mutation/settings";
import { useSettingsQUery } from "@/libs/react-query/hooks/query/settings";

const SettingsPage = () => {
  const { data: settingsData, isLoading: isSettingsLoading } =
    useSettingsQUery();

  const { mutateAsync: updateSettings, isLoading: isUpdateSettingsLoading } =
    useUpdateSettingsMutation();

  return (
    <>
      {settingsData && (
        <SettingsTemplate
          onUpdateSettings={(valuse) =>
            updateSettings({
              bio: valuse.bio,
              image: valuse.image,
              localization: valuse.location,
              name: valuse.name,
              email: valuse.email,
              socials: valuse.socials,
            })
          }
          settings={settingsData.body}
        />
      )}
    </>
  );
};

export default SettingsPage;
