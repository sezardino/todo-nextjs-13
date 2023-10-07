import { type ComponentPropsWithoutRef, type FC } from "react";

import { Todo } from "@prisma/client";
import { TodoListItem } from "./TodoListItem";

export interface ChildrenListProps extends ComponentPropsWithoutRef<"div"> {
  items: Todo[];
  onChildClick?: (id: string) => void;
}

export const ChildrenList: FC<ChildrenListProps> = (props) => {
  const { items, onChildClick, className, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <ul className="mt-5 grid grid-cols-1 gap-1">
        {items.map((child) => (
          <li key={child.id}>
            <TodoListItem
              title={child.title}
              isCompleted={child.completed}
              hasDescription={!!child.description}
              onShowMoreClick={() => onChildClick?.(child.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
