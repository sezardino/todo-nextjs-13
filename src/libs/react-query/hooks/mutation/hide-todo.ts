import { SetVisibilityBody } from "@/app/api/todo/[id]/visibility/schema";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useHideTodoMutation = () => {
  return useMutation({
    mutationFn: (data: SetVisibilityBody & { id: string }) =>
      api.todo.hide(data),
  });
};
