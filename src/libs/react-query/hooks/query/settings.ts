import { ProjectApiUrls } from "@/const/url";
import { UserSettingsResponse } from "@/services/db/modules/user/types";
import { BackendResponse } from "@/types/be";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SETTINGS_QUERY_KEY = "settings";

const handler = async (): Promise<BackendResponse<UserSettingsResponse>> => {
  return axios(ProjectApiUrls.settings).then((res) => res.data);
};

export const useSettingsQUery = () =>
  useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: handler,
  });
