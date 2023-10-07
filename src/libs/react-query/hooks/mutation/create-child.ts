import { CreateChildTodoBody } from "@/app/api/todo/[id]/child/schema";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateChildTodoMutation = () => {
  return useMutation({
    mutationFn: (data: CreateChildTodoBody) => api.todo.createChild(data),
  });
};
