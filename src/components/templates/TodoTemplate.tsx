import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { TodoBreadcrumbs } from "../base/TodoBreadcrumbs";
import { TodoFormValues } from "../forms/TodoForm";
import { TodoDetails } from "../modules/todo/TodoDetails";
import { TodoDrawer } from "../modules/todo/TodoDrawer";
import { TodoFormModal } from "../modules/todo/TodoFormModal";

export type TodoTemplateProps = ComponentPropsWithoutRef<"section"> & {
  todo?: TodoOneResponse;
  childTodo?: TodoOneResponse;
  onSelectChildTodo: (id: string | null) => void;
  onCreateChild: (values: TodoFormValues) => Promise<any>;
  onUpdateTodo: (data: UpdateTodoBody) => void;
  onDeleteTodo: (id?: string) => Promise<any>;
  onCompleteTodo: (id?: string) => void;
  onHideTodo: (id?: string) => void;
};

export const TodoTemplate: FC<TodoTemplateProps> = (props) => {
  const {
    todo,
    childTodo,
    onCreateChild,
    onSelectChildTodo,
    onHideTodo,
    onCompleteTodo,
    onDeleteTodo,
    onUpdateTodo,
    className,
    ...rest
  } = props;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const createTodoHandler = async (values: TodoFormValues) => {
    try {
      await onCreateChild(values);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section {...rest} className={className}>
        {todo && (
          <>
            <TodoBreadcrumbs todo={todo} />
            <TodoDetails
              todo={todo}
              onCompleteRequest={onCompleteTodo}
              onCreateChildClick={() => setIsCreateModalOpen(true)}
              onHideRequest={onHideTodo}
              onChildClick={(id) => onSelectChildTodo(id)}
              onUpdateTodo={onUpdateTodo}
              onDeleteRequest={onDeleteTodo}
            />
          </>
        )}
      </section>

      <TodoFormModal
        title="Create Child  Todo"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onFormSubmit={createTodoHandler}
      />

      {childTodo && (
        <TodoDrawer
          isOpen
          todo={childTodo}
          onDeleteRequest={() => onDeleteTodo(childTodo.id)}
          onClose={() => onSelectChildTodo(null)}
          onCompleteRequest={() => onCompleteTodo(childTodo.id)}
          onHideRequest={() => onHideTodo(childTodo.id)}
          onUpdateTodo={onUpdateTodo}
        />
      )}
    </>
  );
};
