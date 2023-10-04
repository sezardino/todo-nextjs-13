import { ProjectApiUrls } from "@/const/url";
import { UpdateUserSettingsRequest } from "@/services/db/modules/user/types";
import { useMutation } from "@tanstack/react-query";

const handler = async (data: UpdateUserSettingsRequest) => {
  const res = await fetch(ProjectApiUrls.settings, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const useUpdateSettingsMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateUserSettingsRequest) => handler(data),
  });
};
