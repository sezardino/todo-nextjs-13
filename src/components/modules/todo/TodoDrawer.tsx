import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { Drawer, DrawerProps } from "@/components/base/Drawer";
import { TodoBreadcrumbs } from "@/components/base/TodoBreadcrumbs";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { type FC } from "react";
import { TodoDetails } from "./TodoDetails";

export interface TodoDrawerProps extends Omit<DrawerProps, "children"> {
  todo: TodoOneResponse;
  onCreateChildRequest?: () => void;
  onCompleteRequest: () => void;
  onHideRequest: () => void;
  onDeleteRequest: () => void;
  onChildClick?: (id: string) => void;
  onUpdateTodo: (data: UpdateTodoBody) => void;
}

export const TodoDrawer: FC<TodoDrawerProps> = (props) => {
  const {
    todo,
    onChildClick,
    onCreateChildRequest,
    onCompleteRequest,
    onDeleteRequest,
    onHideRequest,
    onUpdateTodo,
    ...rest
  } = props;

  return (
    <Drawer {...rest}>
      <Drawer.Header>
        <TodoBreadcrumbs todo={todo} />
      </Drawer.Header>
      <Drawer.Body>
        <TodoDetails
          todo={todo}
          onCreateChildClick={onCreateChildRequest}
          onCompleteRequest={onCompleteRequest}
          onHideRequest={onHideRequest}
          onDeleteRequest={onDeleteRequest}
          onChildClick={onChildClick}
          onUpdateTodo={onUpdateTodo}
        />
      </Drawer.Body>
    </Drawer>
  );
};
