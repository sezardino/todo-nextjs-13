import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const TODO_QUERY_KEY = "one";

export const useTodoQuery = (id?: string) =>
  useQuery({
    queryKey: [TODO_QUERY_KEY, id],
    queryFn: () => api.todo.one(id!),
    enabled: !!id,
  });
