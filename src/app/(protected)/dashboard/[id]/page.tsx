"use client";

import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { TodoFormValues } from "@/components/forms/TodoForm";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { ProjectPageUrls } from "@/const/url";
import { useCreateChildTodoMutation } from "@/libs/react-query/hooks/mutation/create-child";
import { useDeleteTodoMutation } from "@/libs/react-query/hooks/mutation/delete-todo";
import { useUpdateTodo } from "@/libs/react-query/hooks/mutation/update-todo";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
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

  const isLoading =
    isTodoLoading ||
    isChildLoading ||
    isCreateChildLoading ||
    isUpdateTodoLoading ||
    isDeleteLoading;

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <TodoTemplate
        todo={todo}
        childTodo={childTodo}
        onSelectChildTodo={setSelectedChild}
        onCompleteTodo={async () => undefined}
        onHideTodo={async () => undefined}
        onCreateChild={createChildTodoHandler}
        onUpdateTodo={updateTodoHandler}
        onDeleteTodo={deleteHandler}
      />
    </>
  );
};

export default TodoPage;
