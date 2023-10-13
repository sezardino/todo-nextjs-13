import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { useConfirmTodo } from "@/hooks/use-confirm-todo";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { ConfirmDialog } from "../base/ConfirmDialog";
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
  onDeleteTodo: (id: string) => Promise<any>;
  onCompleteTodo: (id: string) => Promise<any>;
  onHideTodo: (id: string) => Promise<any>;
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
  const {
    copy: confirmModalCopy,
    modalData: confirmModalData,
    onCancelTodoRequest,
    onTodoRequest,
  } = useConfirmTodo({
    onComplete: onCompleteTodo,
    onDelete: onDeleteTodo,
    onHide: onHideTodo,
  });

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
              onCompleteRequest={() =>
                onTodoRequest({ id: todo.id, type: "complete" })
              }
              onCreateChildClick={() => setIsCreateModalOpen(true)}
              onHideRequest={() => onTodoRequest({ id: todo.id, type: "hide" })}
              onChildClick={(id) => onSelectChildTodo(id)}
              onUpdateTodo={onUpdateTodo}
              onDeleteRequest={() =>
                onTodoRequest({ type: "delete", id: todo.id })
              }
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

      <ConfirmDialog
        isOpen={!!confirmModalData}
        onClose={onCancelTodoRequest}
        title={confirmModalCopy.title}
        description={confirmModalCopy.description}
        confirmButton={{
          label: confirmModalCopy.trigger,
          onClick: confirmModalCopy.handler,
        }}
        cancelButton={{
          label: confirmModalCopy.cancel,
          onClick: onCancelTodoRequest,
        }}
      />
    </>
  );
};
