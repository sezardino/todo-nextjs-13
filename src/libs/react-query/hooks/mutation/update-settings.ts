import { UpdateSettingsBody } from "@/app/api/users/settings/schema";
import { projectToasts } from "@/libs/react-toastify";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SETTINGS_QUERY_KEY } from "../query/settings";

export const useUpdateSettingsMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettingsBody) => api.user.updateSettings(data),
    onSuccess: () => {
      client.invalidateQueries([SETTINGS_QUERY_KEY]);
      projectToasts({ type: "success", message: "Settings updated!" });
    },
    onError: () => {
      projectToasts({ type: "error", message: "Error updating settings!" });
    },
  });
};
