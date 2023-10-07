import { type ComponentPropsWithoutRef, type FC } from "react";

import { Todo } from "@prisma/client";
import { TodoListItem } from "./TodoListItem";

export interface ChildrenListProps extends ComponentPropsWithoutRef<"div"> {
  items: Todo[];
}

export const ChildrenList: FC<ChildrenListProps> = (props) => {
  const { items, className, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <ul className="mt-5 grid grid-cols-1 gap-1">
        {items.map((child) => (
          <li key={child.id}>
            <TodoListItem
              title={child.title}
              isCompleted={child.completed}
              hasDescription={!!child.description}
              onShowMoreClick={() => undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
