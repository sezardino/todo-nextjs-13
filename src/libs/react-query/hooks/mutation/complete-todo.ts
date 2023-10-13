import { SetCompletedBody } from "@/app/api/todo/[id]/complete/schema";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useCompleteTodoMutation = () => {
  return useMutation({
    mutationFn: (data: SetCompletedBody & { id: string }) =>
      api.todo.complete(data),
  });
};
