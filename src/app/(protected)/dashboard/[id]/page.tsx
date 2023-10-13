"use client";

import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { TodoFormValues } from "@/components/forms/TodoForm";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { ProjectPageUrls } from "@/const/url";
import { useCompleteTodoMutation } from "@/libs/react-query/hooks/mutation/complete-todo";
import { useCreateChildTodoMutation } from "@/libs/react-query/hooks/mutation/create-child";
import { useDeleteTodoMutation } from "@/libs/react-query/hooks/mutation/delete-todo";
import { useHideTodoMutation } from "@/libs/react-query/hooks/mutation/hide-todo";
import { useUpdateTodo } from "@/libs/react-query/hooks/mutation/update-todo";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const TodoPage: NextPage<{ params: { id: string } }> = (props) => {
  const { id } = props.params;
  const router = useRouter();

  const { data: todo, isLoading: isTodoLoading } = useTodoQuery(id);

  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const { data: childTodo, isFetching: isChildLoading } = useTodoQuery(
    selectedChild || undefined
  );

  const { mutateAsync: createChildTodo, isLoading: isCreateChildLoading } =
    useCreateChildTodoMutation();

  const createChildTodoHandler = useCallback(
    async (values: TodoFormValues) =>
      createChildTodo({ title: values.name, parentId: id }),
    [createChildTodo, id]
  );

  const { mutateAsync: updateTodo, isLoading: isUpdateTodoLoading } =
    useUpdateTodo();

  const updateTodoHandler = useCallback(
    async (data: UpdateTodoBody) => updateTodo({ ...data, id }),
    [id, updateTodo]
  );

  const { mutateAsync: completeTodo, isLoading: isCompleteTodoLoading } =
    useCompleteTodoMutation();
  const { mutateAsync: hideTodo, isLoading: isHideTodoLoading } =
    useHideTodoMutation();
  const { mutateAsync: deleteTodo, isLoading: isDeleteLoading } =
    useDeleteTodoMutation();

  const deleteHandler = useCallback(
    async (todoId: string) =>
      deleteTodo(todoId, {
        onSuccess: () => {
          if (todoId === id) router.push(ProjectPageUrls.dashboard);
        },
      }),
    [deleteTodo, id, router]
  );

  const completeHandler = useCallback(
    async (todoId: string) => {
      let neededTodo: TodoOneResponse | undefined;

      if (childTodo?.id === todoId) neededTodo === childTodo;
      if (todo?.id === todoId) neededTodo === todo;

      if (!neededTodo) return;

      completeTodo({ id: todoId, completed: !neededTodo.completed });
    },
    [childTodo, completeTodo, todo]
  );

  const hideHandler = useCallback(
    async (todoId: string) => {
      let neededTodo: TodoOneResponse | undefined;

      if (childTodo?.id === todoId) neededTodo === childTodo;
      if (todo?.id === todoId) neededTodo === todo;

      if (!neededTodo) return;

      hideTodo({ id: todoId, visibility: !neededTodo.hidden });
    },
    [childTodo, hideTodo, todo]
  );

  const isLoading =
    isTodoLoading ||
    isChildLoading ||
    isCreateChildLoading ||
    isUpdateTodoLoading ||
    isDeleteLoading ||
    isCompleteTodoLoading ||
    isHideTodoLoading;

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <TodoTemplate
        todo={todo}
        childTodo={childTodo}
        onSelectChildTodo={setSelectedChild}
        onCompleteTodo={completeHandler}
        onHideTodo={hideHandler}
        onCreateChild={createChildTodoHandler}
        onUpdateTodo={updateTodoHandler}
        onDeleteTodo={deleteHandler}
      />
    </>
  );
};

export default TodoPage;
