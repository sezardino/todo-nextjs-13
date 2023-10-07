import { ProjectPageUrls } from "@/const/url";
import {
  TodoListResponse,
  TodoOneResponse,
} from "@/services/db/modules/todo/types";
import { Button } from "@nextui-org/react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { Breadcrumbs } from "../base/Breadcrumbs";
import { Drawer } from "../base/Drawer";
import { Icon } from "../base/Icon";
import { TodoFormValues } from "../forms/TodoForm";
import { TodoCard } from "../modules/todo/TodoCard";
import { TodoDetails } from "../modules/todo/TodoDetails";
import { TodoFormModal } from "../modules/todo/TodoFormModal";

export type DashboardProps = ComponentPropsWithoutRef<"section"> & {
  list?: TodoListResponse;
  todo?: TodoOneResponse;
  onCreateTodo: (values: TodoFormValues) => Promise<any>;
  onSelectedTodoChange: (id: string | null) => void;
};

export const DashboardTemplate: FC<DashboardProps> = (props) => {
  const { todo, onSelectedTodoChange, list, onCreateTodo, className, ...rest } =
    props;
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const createTodoHandler = async (values: TodoFormValues) => {
    try {
      await onCreateTodo(values);
      setIsTodoModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section {...rest} className={className}>
        <header className="flex flex-wrap gap-3 justify-between items-center">
          <h1>Todos</h1>
          <Button onClick={() => setIsTodoModalOpen(true)}>
            Create Todo
            <Icon name="HiPlus" />
          </Button>
        </header>

        <ul className={twMerge("grid grid-cols-2 gap-5")}>
          {list?.data.map((todo) => (
            <TodoCard
              key={todo.id}
              completedChildren={todo.children.completed}
              totalChildren={todo.children.total}
              hasDescription={todo.hasDescription}
              isCompleted={todo.completed}
              title={todo.title}
              onShowMoreClick={() => onSelectedTodoChange(todo.id)}
            />
          ))}
        </ul>
      </section>

      <TodoFormModal
        isOpen={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
        title="Create Todo"
        onFormSubmit={createTodoHandler}
      />

      {todo && (
        <Drawer isOpen onClose={() => onSelectedTodoChange(null)}>
          <Drawer.Header>
            <Breadcrumbs
              items={[
                { name: "Dashboard", href: ProjectPageUrls.dashboard },
                { name: todo.title, href: ProjectPageUrls.todo("123") },
              ]}
            />
          </Drawer.Header>
          <Drawer.Body>
            <TodoDetails
              todo={todo}
              onCompleteClick={() => undefined}
              onVisibilityClick={() => undefined}
            />
          </Drawer.Body>
        </Drawer>
      )}
    </>
  );
};
