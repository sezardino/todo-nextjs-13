import { SetCompletedBody } from "@/app/api/todo/[id]/complete/schema";
import { projectToasts } from "@/libs/react-toastify";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODO_QUERY_KEY } from "../query/todo";
import { TODO_LIST_QUERY_KEY } from "../query/todo-list";

export const useCompleteTodoMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: SetCompletedBody & { id: string }) =>
      api.todo.complete(data),
    onSuccess: (_, v) => {
      client.invalidateQueries([TODO_LIST_QUERY_KEY]);
      client.invalidateQueries([TODO_QUERY_KEY, v.id]);
      projectToasts({ type: "success", message: "Todo completed!" });
    },
    onError: () => {
      projectToasts({ type: "error", message: "Error completing todo!" });
    },
  });
};
