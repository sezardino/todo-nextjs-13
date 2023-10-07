import { CreateTodoBody } from "@/app/api/todo/schema";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: (data: CreateTodoBody) => api.todo.create(data),
  });
};
