import { CreateTodoBody } from "@/app/api/todo/schema";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODO_LIST_QUERY_KEY } from "../query/todo-list";

export const useCreateTodoMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoBody) => api.todo.create(data),
    onSuccess: () => {
      client.invalidateQueries([TODO_LIST_QUERY_KEY]);
    },
  });
};
