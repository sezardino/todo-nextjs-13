import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { useConfirmTodo } from "@/hooks/use-confirm-todo";
import {
  TodoListResponse,
  TodoOneResponse,
} from "@/services/db/modules/todo/types";
import { Button } from "@nextui-org/react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { ConfirmDialog } from "../base/ConfirmDialog";
import { Icon } from "../base/Icon";
import { TodoFormValues } from "../forms/TodoForm";
import { TodoDrawer } from "../modules/todo/TodoDrawer";
import { TodoFormModal } from "../modules/todo/TodoFormModal";
import { TodoList } from "../modules/todo/TodoList";
import { SearchForm } from "../ui/SearchForm";

export type DashboardProps = ComponentPropsWithoutRef<"section"> & {
  list?: TodoListResponse;
  todo?: TodoOneResponse;
  onCreateTodo: (values: TodoFormValues) => Promise<any>;
  onCreateChild: (values: TodoFormValues, parentId: string) => Promise<any>;
  onSelectedTodoChange: (id: string | null) => void;
  onSelectedChildTodoChange: (id: string | null) => void;
  onUpdateTodo: (data: UpdateTodoBody) => void;
  onCompleteTodo: (id: string) => Promise<any>;
  onHideTodo: (id: string) => Promise<any>;
  onDeleteTodo: (id: string) => Promise<any>;
  onSearch: (value: string) => void;
};

type TodoModalData = {
  variant: "parent" | "child";
  parentId?: string;
};

export const DashboardTemplate: FC<DashboardProps> = (props) => {
  const {
    onSearch,
    todo,
    onCompleteTodo,
    onHideTodo,
    onSelectedChildTodoChange,
    onSelectedTodoChange,
    onCreateChild,
    onDeleteTodo,
    onUpdateTodo,
    list,
    onCreateTodo,
    className,
    ...rest
  } = props;
  const [todoModalData, setTodoModalData] = useState<TodoModalData | null>(
    null
  );

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
    if (!todoModalData) return;

    try {
      if (todoModalData.variant === "child" && todoModalData.parentId) {
        await onCreateChild(values, todoModalData.parentId);
      }

      if (todoModalData.variant === "parent") {
        await onCreateTodo(values);
      }

      setTodoModalData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onDrawerCloseRequest = () => {
    if (!todo) return;

    if (todo.parent) {
      onSelectedChildTodoChange(null);
      return;
    }

    onSelectedTodoChange(null);
  };

  return (
    <>
      <section {...rest} className={className}>
        <header className="flex flex-wrap gap-3 justify-between items-center">
          <h1>Todos</h1>
          <SearchForm onSearch={onSearch} placeholder="Search..." />
          <Button onClick={() => setTodoModalData({ variant: "parent" })}>
            Create Todo
            <Icon name="HiPlus" />
          </Button>
        </header>

        {!!list?.data.length && (
          <TodoList
            list={list}
            className="mt-8"
            onMoreButtonClick={onSelectedTodoChange}
          />
        )}
      </section>

      <TodoFormModal
        isOpen={!!todoModalData}
        onClose={() => setTodoModalData(null)}
        title="Create Todo"
        onFormSubmit={createTodoHandler}
      />

      {todo && (
        <TodoDrawer
          isOpen
          todo={todo}
          onClose={onDrawerCloseRequest}
          onCompleteRequest={() =>
            onTodoRequest({ id: todo.id, type: "complete" })
          }
          onDeleteRequest={() => onTodoRequest({ id: todo.id, type: "delete" })}
          onCreateChildRequest={() =>
            setTodoModalData({ variant: "child", parentId: todo.id })
          }
          onHideRequest={() => onTodoRequest({ id: todo.id, type: "hide" })}
          onChildClick={onSelectedChildTodoChange}
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
