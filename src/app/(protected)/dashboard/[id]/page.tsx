"use client";

import { TodoFormValues } from "@/components/forms/TodoForm";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { useCreateChildTodoMutation } from "@/libs/react-query/hooks/mutation/create-child";
import { useTodoQuery } from "@/libs/react-query/hooks/query/todo";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const TodoPage: NextPage<{ params: { id: string } }> = (props) => {
  const { id } = props.params;

  const { data: todo } = useTodoQuery(id);

  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const { data: childTodo } = useTodoQuery(selectedChild || undefined);

  const { mutateAsync: createChildTodo } = useCreateChildTodoMutation();

  const createChildTodoHandler = useCallback(
    async (values: TodoFormValues) =>
      createChildTodo({ title: values.name, parentId: id }),
    [createChildTodo, id]
  );

  return (
    <TodoTemplate
      todo={todo}
      childTodo={childTodo}
      onSelectChildTodo={setSelectedChild}
      onCreateChild={createChildTodoHandler}
    />
  );
};

export default TodoPage;
