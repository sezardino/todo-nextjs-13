import { ProjectApiUrls } from "@/const/url";
import { UpdateUserSettingsRequest } from "@/services/db/modules/user/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const handler = async (data: UpdateUserSettingsRequest) => {
  return axios({
    url: ProjectApiUrls.settings,
    method: "POST",
    data: JSON.stringify(data),
  });
};

export const useUpdateSettingsMutation = () => {
  return useMutation({
    mutationFn: handler,
  });
};
