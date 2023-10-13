import { SetVisibilityBody } from "@/app/api/todo/[id]/visibility/schema";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODO_QUERY_KEY } from "../query/todo";
import { TODO_LIST_QUERY_KEY } from "../query/todo-list";

export const useHideTodoMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: SetVisibilityBody & { id: string }) =>
      api.todo.hide(data),
    onSuccess: (_, v) => {
      client.invalidateQueries([TODO_LIST_QUERY_KEY]);
      client.invalidateQueries([TODO_QUERY_KEY, v.id]);
    },
  });
};
