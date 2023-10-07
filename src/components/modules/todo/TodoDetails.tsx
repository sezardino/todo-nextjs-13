import { Dropdown } from "@/components/base/Dropdown";
import { Icon } from "@/components/base/Icon";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { Button } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { ChildrenList } from "./ChildrenList";

export type TodoDetailsProps = ComponentPropsWithoutRef<"section"> & {
  todo: TodoOneResponse;
  onVisibilityClick: () => void;
  onCompleteClick: () => void;
  onCreateChildClick: () => void;
};

export const TodoDetails: FC<TodoDetailsProps> = (props) => {
  const {
    todo,
    onCompleteClick,
    onCreateChildClick,
    onVisibilityClick,
    className,
    ...rest
  } = props;

  return (
    <section {...rest} className={twMerge(className)}>
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2>{todo.title}</h2>
          <Button size="sm" onClick={onCreateChildClick}>
            <Icon name="HiOutlinePlusCircle" size={18} />
            Create child task
          </Button>
        </div>

        <Dropdown
          items={[
            {
              label: `${todo.hidden ? "Show" : "Hide"} Todo`,
              onClick: () => {},
            },
            {
              label: `Mark as ${todo.completed ? "Uncompleted" : "Completed"}`,
              onClick: () => {},
            },
          ]}
        >
          <Icon name="HiOutlineDotsVertical" />
        </Dropdown>
      </header>
      <div className="mt-4">
        <p className="text-sm text-default-500">
          {todo.description ? todo.description : "description"}
        </p>
      </div>

      {!!todo.children.length && <ChildrenList items={todo.children} />}
    </section>
  );
};
