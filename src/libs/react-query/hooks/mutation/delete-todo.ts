import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODO_QUERY_KEY } from "../query/todo";
import { TODO_LIST_QUERY_KEY } from "../query/todo-list";

export const useDeleteTodoMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.todo.delete(id),
    onSuccess: (_, id) => {
      client.invalidateQueries([TODO_LIST_QUERY_KEY]);
      client.invalidateQueries([TODO_QUERY_KEY, id]);
    },
  });
};
