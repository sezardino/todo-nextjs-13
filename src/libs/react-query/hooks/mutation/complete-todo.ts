import { SetCompletedBody } from "@/app/api/todo/[id]/complete/schema";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODO_LIST_QUERY_KEY } from "../query/todo-list";

export const useCompleteTodoMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: SetCompletedBody & { id: string }) =>
      api.todo.complete(data),
    onSuccess: () => {
      client.invalidateQueries([TODO_LIST_QUERY_KEY]);
    },
  });
};
