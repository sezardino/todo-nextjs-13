import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTodo = () =>
  useMutation({
    mutationFn: (data: UpdateTodoBody & { id: string }) =>
      api.todo.update(data),
  });
