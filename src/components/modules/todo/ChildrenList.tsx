import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { Icon } from "@/components/base/Icon";
import { Progress } from "@nextui-org/react";
import { Todo } from "@prisma/client";
import { TodoListItem } from "./TodoListItem";

export interface ChildrenListProps extends ComponentPropsWithoutRef<"div"> {
  items: Todo[];
  onChildClick?: (id: string) => void;
  onAddChildClick?: () => void;
}

export const ChildrenList: FC<ChildrenListProps> = (props) => {
  const { items, onChildClick, onAddChildClick, className, ...rest } = props;

  const progress = useMemo(() => {
    const total = items.length;
    const completed = items.filter((item) => item.completed).length;

    return { total, completed, value: Math.round((completed / total) * 100) };
  }, [items]);

  return (
    <div {...rest} className={className}>
      <header className="flex gap-3 items-end">
        <Progress
          label={`${progress.completed}/${progress.total} is completed`}
          aria-label="Loading..."
          color="success"
          value={progress.value}
        />
        {onAddChildClick && (
          <button
            type="button"
            aria-label="add child todo"
            className="p-2 pb-0"
            onClick={onAddChildClick}
          >
            <Icon name="HiPlus" size={16} />
          </button>
        )}
      </header>
      <ul className="mt-3 grid grid-cols-1 gap-1">
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
