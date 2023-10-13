import { TodoListBody } from "@/app/api/todo/schema";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const TODO_LIST_QUERY_KEY = "todo-list";

export const useTodoListQuery = (params: TodoListBody) =>
  useQuery({
    queryKey: [TODO_LIST_QUERY_KEY, params],
    queryFn: () => api.todo.list(params),
  });
