"use client";

import { TodoFormValues } from "@/components/forms/TodoForm";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { useCreateTodoMutation } from "@/libs/react-query/hooks/mutation/create-todo";
import { useTodoListQuery } from "@/libs/react-query/hooks/query/todo-list";
import { useCallback } from "react";

const DashboardPage = () => {
  const { data } = useTodoListQuery({});
  const { mutateAsync: createTodo } = useCreateTodoMutation();

  const createTodoHandler = useCallback(
    async (values: TodoFormValues) => createTodo({ title: values.name }),
    [createTodo]
  );

  return <DashboardTemplate onCreateTodo={createTodoHandler} />;
};

export default DashboardPage;
