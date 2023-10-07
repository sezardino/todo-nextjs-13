"use client";

import { TodoFormValues } from "@/components/forms/TodoForm";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { useCreateChildTodoMutation } from "@/libs/react-query/hooks/mutation/create-child";
import { useCreateTodoMutation } from "@/libs/react-query/hooks/mutation/create-todo";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
import { useTodoListQuery } from "@/libs/react-query/hooks/query/todo-list";
import { useCallback, useState } from "react";

const DashboardPage = () => {
  const { data: todoData } = useTodoListQuery({});

  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const { data: todo } = useTodoQuery(selectedTodo || undefined);

  const { mutateAsync: createTodo } = useCreateTodoMutation();
  const { mutateAsync: createChildTodo } = useCreateChildTodoMutation();

  const createTodoHandler = useCallback(
    async (values: TodoFormValues) => createTodo({ title: values.name }),
    [createTodo]
  );

  const createChildTodoHandler = useCallback(
    async (values: TodoFormValues, parentId: string) =>
      createChildTodo({ title: values.name, parentId }),
    [createChildTodo]
  );

  return (
    <DashboardTemplate
      list={todoData}
      todo={todo}
      onCreateTodo={createTodoHandler}
      onSelectedTodoChange={setSelectedTodo}
      onCreateChild={createChildTodoHandler}
    />
  );
};

export default DashboardPage;
