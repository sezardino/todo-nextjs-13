import { ProjectPageUrls } from "@/const/url";
import {
  TodoListResponse,
  TodoOneResponse,
} from "@/services/db/modules/todo/types";
import { Button } from "@nextui-org/react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { Breadcrumbs } from "../base/Breadcrumbs";
import { Drawer } from "../base/Drawer";
import { Icon } from "../base/Icon";
import { TodoFormValues } from "../forms/TodoForm";
import { TodoDetails } from "../modules/todo/TodoDetails";
import { TodoFormModal } from "../modules/todo/TodoFormModal";
import { TodoList } from "../modules/todo/TodoList";

export type DashboardProps = ComponentPropsWithoutRef<"section"> & {
  list?: TodoListResponse;
  todo?: TodoOneResponse;
  onCreateTodo: (values: TodoFormValues) => Promise<any>;
  onCreateChild: (values: TodoFormValues, parentId: string) => Promise<any>;
  onSelectedTodoChange: (id: string | null) => void;
};

type TodoModalData = {
  variant: "parent" | "child";
  parentId?: string;
};

export const DashboardTemplate: FC<DashboardProps> = (props) => {
  const {
    todo,
    onSelectedTodoChange,
    onCreateChild,
    list,
    onCreateTodo,
    className,
    ...rest
  } = props;
  const [todoModalData, setTodoModalData] = useState<TodoModalData | null>(
    null
  );

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

  return (
    <>
      <section {...rest} className={className}>
        <header className="flex flex-wrap gap-3 justify-between items-center">
          <h1>Todos</h1>
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
        <Drawer isOpen onClose={() => onSelectedTodoChange(null)}>
          <Drawer.Header>
            <Breadcrumbs
              items={[
                { name: "Dashboard", href: ProjectPageUrls.dashboard },
                { name: todo.title, href: ProjectPageUrls.todo(todo.id) },
              ]}
            />
          </Drawer.Header>
          <Drawer.Body>
            <TodoDetails
              todo={todo}
              onCreateChildClick={() =>
                setTodoModalData({ variant: "child", parentId: todo.id })
              }
              onCompleteClick={() => undefined}
              onVisibilityClick={() => undefined}
            />
          </Drawer.Body>
        </Drawer>
      )}
    </>
  );
};
