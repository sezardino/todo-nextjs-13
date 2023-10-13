import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODO_QUERY_KEY } from "../query/todo";

export const useUpdateTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTodoBody & { id: string }) =>
      api.todo.update(data),
    onSuccess: (_, v) => {
      client.invalidateQueries([TODO_QUERY_KEY, v.id]);
    },
  });
};
