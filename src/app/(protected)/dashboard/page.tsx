"use client";

import { TodoFormValues } from "@/components/forms/TodoForm";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { useCreateTodoMutation } from "@/libs/react-query/hooks/mutation/create-todo";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
import { useTodoListQuery } from "@/libs/react-query/hooks/query/todo-list";
import { useCallback, useState } from "react";

const DashboardPage = () => {
  const { data: todoData } = useTodoListQuery({});

  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const { data: todo } = useTodoQuery(selectedTodo || undefined);

  const { mutateAsync: createTodo } = useCreateTodoMutation();

  const createTodoHandler = useCallback(
    async (values: TodoFormValues) => createTodo({ title: values.name }),
    [createTodo]
  );

  return (
    <DashboardTemplate
      list={todoData}
      todo={todo}
      onCreateTodo={createTodoHandler}
      onSelectedTodoChange={setSelectedTodo}
    />
  );
};

export default DashboardPage;
