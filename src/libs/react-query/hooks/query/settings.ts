import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const SETTINGS_QUERY_KEY = "settings";

export const useSettingsQuery = () =>
  useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: () => api.user.getSettings(),
  });
