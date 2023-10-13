"use client";

import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { TodoFormValues } from "@/components/forms/TodoForm";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { useCompleteTodoMutation } from "@/libs/react-query/hooks/mutation/complete-todo";
import { useCreateChildTodoMutation } from "@/libs/react-query/hooks/mutation/create-child";
import { useCreateTodoMutation } from "@/libs/react-query/hooks/mutation/create-todo";
import { useDeleteTodoMutation } from "@/libs/react-query/hooks/mutation/delete-todo";
import { useHideTodoMutation } from "@/libs/react-query/hooks/mutation/hide-todo";
import { useUpdateTodo } from "@/libs/react-query/hooks/mutation/update-todo";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
import { useTodoListQuery } from "@/libs/react-query/hooks/query/todo-list";
import { useCallback, useState } from "react";

const DashboardPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: todoData, isLoading: isTodoDataLoading } = useTodoListQuery({
    search: searchValue,
  });

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

  const { mutateAsync: completeTodo, isLoading: isCompleteTodoLoading } =
    useCompleteTodoMutation();
  const { mutateAsync: hideTodo, isLoading: isHideTodoLoading } =
    useHideTodoMutation();
  const { mutateAsync: deleteTodo, isLoading: isDeleteLoading } =
    useDeleteTodoMutation();

  const deleteHandler = useCallback(
    async (todoId: string) => deleteTodo(todoId),
    [deleteTodo]
  );

  const completeHandler = useCallback(
    async (todoId: string) => {
      if (!todo) return;

      completeTodo({ id: todoId, completed: !todo.completed });
    },
    [completeTodo, todo]
  );

  const hideHandler = useCallback(
    async (todoId: string) => {
      if (!todo) return;

      hideTodo({ id: todoId, visibility: !todo.hidden });
    },
    [hideTodo, todo]
  );

  const isLoading =
    isTodoDataLoading ||
    isTodoLoading ||
    isCreatingTodo ||
    isCreateChildLoading ||
    isUpdateTodoLoading ||
    isDeleteLoading ||
    isCompleteTodoLoading ||
    isHideTodoLoading;

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <DashboardTemplate
        list={todoData}
        todo={todo}
        onCompleteTodo={completeHandler}
        onDeleteTodo={deleteHandler}
        onHideTodo={hideHandler}
        onCreateTodo={createTodoHandler}
        onSelectedTodoChange={setSelectedTodo}
        onCreateChild={createChildTodoHandler}
        onSelectedChildTodoChange={setSelectedChildTodo}
        onUpdateTodo={updateTodoHandler}
        onSearch={setSearchValue}
      />
    </>
  );
};

export default DashboardPage;
