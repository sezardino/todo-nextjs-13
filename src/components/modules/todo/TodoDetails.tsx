import { Dropdown } from "@/components/base/Dropdown";
import { Icon } from "@/components/base/Icon";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type TodoDetailsProps = ComponentPropsWithoutRef<"section"> & {
  todo: TodoOneResponse;
  onVisibilityClick: () => void;
  onCompleteClick: () => void;
};

export const TodoDetails: FC<TodoDetailsProps> = (props) => {
  const { todo, onCompleteClick, onVisibilityClick, className, ...rest } =
    props;

  return (
    <section {...rest} className={twMerge(className)}>
      <header className="flex items-center justify-between">
        <h2>{todo.title}</h2>

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
      <p>{todo.description}</p>

      {!!todo.children.length && (
        <ul className="mt-5">
          {todo.children.map((child) => (
            <li key={child.id}>{child.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
