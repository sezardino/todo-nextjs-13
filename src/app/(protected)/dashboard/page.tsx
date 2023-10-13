"use client";

import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { TodoFormValues } from "@/components/forms/TodoForm";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { useCreateChildTodoMutation } from "@/libs/react-query/hooks/mutation/create-child";
import { useCreateTodoMutation } from "@/libs/react-query/hooks/mutation/create-todo";
import { useDeleteTodoMutation } from "@/libs/react-query/hooks/mutation/delete-todo";
import { useUpdateTodo } from "@/libs/react-query/hooks/mutation/update-todo";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
import { useTodoListQuery } from "@/libs/react-query/hooks/query/todo-list";
import { useCallback, useState } from "react";

const DashboardPage = () => {
  const { data: todoData, isLoading: isTodoDataLoading } = useTodoListQuery({});

  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [selectedChildTodo, setSelectedChildTodo] = useState<string | null>(
    null
  );
  const { data: todo, isFetching: isTodoLoading } = useTodoQuery(
    selectedChildTodo || selectedTodo || undefined
  );

  const { mutateAsync: createTodo, isLoading: isCreatingTodo } =
    useCreateTodoMutation();
  const { mutateAsync: createChildTodo, isLoading: isCreateChildLoading } =
    useCreateChildTodoMutation();

  const { mutateAsync: updateTodo, isLoading: isUpdateTodoLoading } =
    useUpdateTodo();

  const updateTodoHandler = useCallback(
    async (data: UpdateTodoBody) =>
      selectedTodo ? updateTodo({ ...data, id: selectedTodo }) : undefined,
    [selectedTodo, updateTodo]
  );

  const createTodoHandler = useCallback(
    async (values: TodoFormValues) => createTodo({ title: values.name }),
    [createTodo]
  );

  const createChildTodoHandler = useCallback(
    async (values: TodoFormValues, parentId: string) =>
      createChildTodo({ title: values.name, parentId }),
    [createChildTodo]
  );

  const { mutateAsync: deleteTodo, isLoading: isDeleteLoading } =
    useDeleteTodoMutation();

  const deleteHandler = useCallback(
    async (todoId: string) => deleteTodo(todoId),
    [deleteTodo]
  );

  const isLoading =
    isTodoDataLoading ||
    isTodoLoading ||
    isCreatingTodo ||
    isCreateChildLoading ||
    isUpdateTodoLoading;

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <DashboardTemplate
        list={todoData}
        todo={todo}
        onCompleteTodo={async () => undefined}
        onDeleteTodo={deleteHandler}
        onHideTodo={async () => undefined}
        onCreateTodo={createTodoHandler}
        onSelectedTodoChange={setSelectedTodo}
        onCreateChild={createChildTodoHandler}
        onSelectedChildTodoChange={setSelectedChildTodo}
        onUpdateTodo={updateTodoHandler}
      />
    </>
  );
};

export default DashboardPage;
