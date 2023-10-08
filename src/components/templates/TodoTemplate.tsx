import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { TodoFormValues } from "../forms/TodoForm";
import { TodoDetails } from "../modules/todo/TodoDetails";
import { TodoDrawer } from "../modules/todo/TodoDrawer";
import { TodoFormModal } from "../modules/todo/TodoFormModal";

export type TodoTemplateProps = ComponentPropsWithoutRef<"section"> & {
  todo?: TodoOneResponse;
  childTodo?: TodoOneResponse;
  onSelectChildTodo: (id: string | null) => void;
  onCreateChild: (values: TodoFormValues) => Promise<any>;
};

export const TodoTemplate: FC<TodoTemplateProps> = (props) => {
  const {
    todo,
    childTodo,
    onCreateChild,
    onSelectChildTodo,
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
          <TodoDetails
            todo={todo}
            onCompleteClick={() => undefined}
            onCreateChildClick={() => setIsCreateModalOpen(true)}
            onVisibilityClick={() => undefined}
            onChildClick={(id) => onSelectChildTodo(id)}
          />
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
          onClose={() => onSelectChildTodo(null)}
          onCompleteClick={() => undefined}
          onCreateChildClick={() => undefined}
          onVisibilityClick={() => undefined}
          onChildClick={() => undefined}
        />
      )}
    </>
  );
};
