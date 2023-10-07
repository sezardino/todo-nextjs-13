import { Button } from "@nextui-org/react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { Drawer } from "../base/Drawer";
import { Icon } from "../base/Icon";
import { TodoFormValues } from "../forms/TodoForm";

export type DashboardProps = ComponentPropsWithoutRef<"section"> & {
  onCreateTodo: (values: TodoFormValues) => Promise<any>;
};

export const DashboardTemplate: FC<DashboardProps> = (props) => {
  const { onCreateTodo, className, ...rest } = props;
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

        <ul>
          <li></li>
        </ul>
      </section>

      {/* <TodoFormModal
        isOpen={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
        title="Create Todo"
        onFormSubmit={createTodoHandler}
      /> */}

      <Drawer
        isOpen={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
      >
        <Drawer.Header>Create Todo</Drawer.Header>
        <Drawer.Body>
          {/* <TodoForm onSubmit={createTodoHandler} /> */}
        </Drawer.Body>
      </Drawer>
    </>
  );
};
