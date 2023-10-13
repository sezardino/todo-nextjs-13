import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: (id: string) => api.todo.delete(id),
  });
};
