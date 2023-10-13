import { CreateChildTodoBody } from "@/app/api/todo/[id]/child/schema";
import { projectToasts } from "@/libs/react-toastify";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TODO_QUERY_KEY } from "../query/todo";

export const useCreateChildTodoMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateChildTodoBody) => api.todo.createChild(data),
    onSuccess: (_, v) => {
      client.invalidateQueries([TODO_QUERY_KEY, v.parentId]);
      projectToasts({ type: "success", message: "Todo created!" });
    },
    onError: () => {
      projectToasts({ type: "error", message: "Error creating todo!" });
    },
  });
};
