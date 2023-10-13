import {
  Fragment,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { Icon } from "@/components/base/Icon";
import { TodoListResponse } from "@/services/db/modules/todo/types";
import { Tab, Tabs } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { TodoCard } from "./TodoCard";
import { TodoListItem } from "./TodoListItem";

export interface TodoListProps extends ComponentPropsWithoutRef<"div"> {
  list: TodoListResponse;
  onMoreButtonClick: (id: string) => void;
}

type ListViewType = "list" | "grid";

export const TodoList: FC<TodoListProps> = (props) => {
  const { list, onMoreButtonClick, children, className, ...rest } = props;
  const [viewType, setViewType] = useState<ListViewType>("grid");

  return (
    <div {...rest} className={twMerge("grid grid-cols-1 gap-5", className)}>
      <div className="flex flex-wrap gap-3 justify-between items-center">
        {children}
        <Tabs
          radius="full"
          size="md"
          selectedKey={viewType}
          aria-label="List View"
          onSelectionChange={(key) => setViewType(key as ListViewType)}
        >
          <Tab key="grid" title={<Icon name="HiViewGrid" />} />
          <Tab key="list" title={<Icon name="HiOutlineViewList" />} />
        </Tabs>
      </div>

      <ul
        className={twMerge(
          "grid",
          viewType === "grid" && "grid-cols-2 gap-5",
          viewType === "list" && "gap-1"
        )}
      >
        {list.data.map((todo) => (
          <Fragment key={todo.id}>
            {viewType === "grid" && (
              <TodoCard
                key={todo.id}
                completedChildren={todo.children.completed}
                totalChildren={todo.children.total}
                hasDescription={todo.hasDescription}
                isCompleted={todo.completed}
                title={todo.title}
                onShowMoreClick={() => onMoreButtonClick(todo.id)}
              />
            )}
            {viewType === "list" && (
              <TodoListItem
                title={todo.title}
                hasDescription={todo.hasDescription}
                isCompleted={todo.completed}
                onShowMoreClick={() => onMoreButtonClick(todo.id)}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
