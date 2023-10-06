import { TodoListBody } from "@/app/api/todo/schema";
import { ProjectApiUrls } from "@/const/url";
import { UserSettingsResponse } from "@/services/db/modules/user/types";
import { BackendResponse } from "@/types/be";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TODO_LIST_QUERY_KEY = "todo-list";

const handler = async (
  data: TodoListBody
): Promise<BackendResponse<UserSettingsResponse>> => {
  const { page = 0, limit = 10, ...rest } = data;
  return await axios({
    url: ProjectApiUrls.todoList,
    params: { page, limit, ...rest },
  }).then((res) => res.data);
};

export const useTodoListQuery = (params: TodoListBody) =>
  useQuery({
    queryKey: [TODO_LIST_QUERY_KEY, params],
    queryFn: () => handler(params),
  });
