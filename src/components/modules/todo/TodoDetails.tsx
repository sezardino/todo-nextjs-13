import { Dropdown, DropdownItem } from "@/components/base/Dropdown";

const Editor = dynamic(() => import("@/components/base/Editor"), {
  ssr: false,
});

import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { Icon } from "@/components/base/Icon";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { ChildrenList } from "./ChildrenList";

export type TodoDetailsProps = ComponentPropsWithoutRef<"section"> & {
  todo: TodoOneResponse;
  onCompleteRequest: () => void;
  onHideRequest: () => void;
  onDeleteRequest: () => void;
  onCreateChildClick?: () => void;
  onChildClick?: (id: string) => void;
  onUpdateTodo: (data: UpdateTodoBody) => void;
};

export const TodoDetails: FC<TodoDetailsProps> = (props) => {
  const {
    todo,
    onChildClick,
    onCompleteRequest,
    onHideRequest,
    onDeleteRequest,
    onCreateChildClick,
    onUpdateTodo,
    className,
    ...rest
  } = props;

  const hasParent = !!todo.parent;

  const dropdownItems = useMemo<DropdownItem[]>(
    () => [
      {
        label: `${todo.hidden ? "Show" : "Hide"} Todo`,
        onClick: onHideRequest,
        hidden: !!todo.parentId,
      },
      {
        label: `Mark as ${todo.completed ? "Uncompleted" : "Completed"}`,
        onClick: onCompleteRequest,
        hidden: !!todo.parent?.completed,
      },
      {
        label: "Delete",
        onClick: onDeleteRequest,
      },
    ],
    [
      onCompleteRequest,
      onDeleteRequest,
      onHideRequest,
      todo.completed,
      todo.hidden,
      todo.parent?.completed,
      todo.parentId,
    ]
  );

  return (
    <section {...rest} className={twMerge(className)}>
      <header className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-2">
          <h2>{todo.title}</h2>
          {onCreateChildClick && !hasParent && (
            <Button size="sm" onClick={onCreateChildClick}>
              <Icon name="HiOutlinePlusCircle" size={18} />
              Create child task
            </Button>
          )}
        </div>

        <Dropdown items={dropdownItems}>
          <Icon name="HiOutlineDotsVertical" />
        </Dropdown>
      </header>
      <div className="mt-4">
        <Editor
          placeholder="Description"
          content={todo.description}
          onSave={(description) => onUpdateTodo({ description })}
        />
      </div>

      {!!todo.children.length && (
        <ChildrenList
          items={todo.children}
          onChildClick={onChildClick}
          className="mt-5"
        />
      )}
    </section>
  );
};
