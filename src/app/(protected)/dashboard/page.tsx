"use client";

import { TodoFormValues } from "@/components/forms/TodoForm";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { useCreateChildTodoMutation } from "@/libs/react-query/hooks/mutation/create-child";
import { useCreateTodoMutation } from "@/libs/react-query/hooks/mutation/create-todo";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
import { useTodoListQuery } from "@/libs/react-query/hooks/query/todo-list";
import { useCallback, useState } from "react";

const DashboardPage = () => {
  const { data: todoData, isLoading: isTodoDataLoading } = useTodoListQuery({});

  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const { data: todo, isFetching: isTodoLoading } = useTodoQuery(
    selectedTodo || undefined
  );

  const { mutateAsync: createTodo, isLoading: isCreatingTodo } =
    useCreateTodoMutation();
  const { mutateAsync: createChildTodo, isLoading: isCreateChildLoading } =
    useCreateChildTodoMutation();

  const createTodoHandler = useCallback(
    async (values: TodoFormValues) => createTodo({ title: values.name }),
    [createTodo]
  );

  const createChildTodoHandler = useCallback(
    async (values: TodoFormValues, parentId: string) =>
      createChildTodo({ title: values.name, parentId }),
    [createChildTodo]
  );

  const isLoading =
    isTodoDataLoading ||
    isTodoLoading ||
    isCreatingTodo ||
    isCreateChildLoading;

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <DashboardTemplate
        list={todoData}
        todo={todo}
        onCreateTodo={createTodoHandler}
        onSelectedTodoChange={setSelectedTodo}
        onCreateChild={createChildTodoHandler}
      />
    </>
  );
};

export default DashboardPage;
