import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { Breadcrumb, Breadcrumbs } from "@/components/base/Breadcrumbs";
import { Drawer, DrawerProps } from "@/components/base/Drawer";
import { ProjectPageUrls } from "@/const/url";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { getStringShorted } from "@/utils/get-string-shorted";
import { useMemo, type FC } from "react";
import { TodoDetails } from "./TodoDetails";

export interface TodoDrawerProps extends Omit<DrawerProps, "children"> {
  todo: TodoOneResponse;
  onCreateChildRequest: () => void;
  onCompleteRequest: () => void;
  onHideRequest: () => void;
  onDeleteRequest: () => void;
  onChildClick: (id: string) => void;
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

  const breadcrumbs = useMemo<Breadcrumb[]>(() => {
    const dashboardBreadcrumb = {
      name: "Dashboard",
      href: ProjectPageUrls.dashboard,
    };

    const parentBreadcrumb = todo.parent && {
      name: getStringShorted(todo.parent.title),
      href: ProjectPageUrls.todo(todo.parent.id),
    };

    const thisBreadcrumb = {
      name: getStringShorted(todo.title),
      href: ProjectPageUrls.todo(todo.id),
    };

    return [dashboardBreadcrumb, parentBreadcrumb, thisBreadcrumb].filter(
      Boolean
    ) as Breadcrumb[];
  }, [todo.id, todo.parent, todo.title]);

  return (
    <Drawer {...rest}>
      <Drawer.Header>
        <Breadcrumbs items={breadcrumbs} />
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
