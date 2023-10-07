import { UpdateSettingsBody } from "@/app/api/users/settings/schema";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSettingsMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateSettingsBody) => api.user.updateSettings(data),
  });
};
