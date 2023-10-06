import { ProjectApiUrls } from "@/const/url";
import { UserSettingsResponse } from "@/services/db/modules/user/types";
import { BackendResponse } from "@/types/be";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TODO_QUERY_KEY = "list";

const handler = async (
  id: string
): Promise<BackendResponse<UserSettingsResponse>> => {
  return axios(ProjectApiUrls.todo(id)).then((res) => res.data);
};

export const useSettingsQUery = (id: string) =>
  useQuery({
    queryKey: [TODO_QUERY_KEY, id],
    queryFn: () => handler(id),
    enabled: !!id,
  });
