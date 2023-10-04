import { ProjectApiUrls } from "@/const/url";
import { UserSettingsResponse } from "@/services/db/modules/user/types";
import { BackendResponse } from "@/types/be";
import { useQuery } from "@tanstack/react-query";

const SETTINGS_QUERY_KEY = "settings";

const handler = async (): Promise<BackendResponse<UserSettingsResponse>> => {
  const res = await fetch(ProjectApiUrls.settings);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const useSettingsQUery = () =>
  useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: handler,
  });
