import { Breadcrumb, Breadcrumbs } from "@/components/base/Breadcrumbs";
import { Drawer, DrawerProps } from "@/components/base/Drawer";
import { ProjectPageUrls } from "@/const/url";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { useMemo, type FC } from "react";
import { TodoDetails } from "./TodoDetails";

export interface TodoDrawerProps extends Omit<DrawerProps, "children"> {
  todo: TodoOneResponse;
  onCreateChildClick: () => void;
  onCompleteClick: () => void;
  onVisibilityClick: () => void;
}

export const TodoDrawer: FC<TodoDrawerProps> = (props) => {
  const {
    todo,
    onCreateChildClick,
    onCompleteClick,
    onVisibilityClick,
    ...rest
  } = props;

  const breadcrumbs = useMemo<Breadcrumb[]>(() => {
    const dashboardBreadcrumb = {
      name: "Dashboard",
      href: ProjectPageUrls.dashboard,
    };

    const parentBreadcrumb = todo.parent && {
      name: todo.parent.title,
      href: ProjectPageUrls.todo(todo.parent.id),
    };

    const thisBreadcrumb = {
      name: todo.title,
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
          onCreateChildClick={onCreateChildClick}
          onCompleteClick={onCompleteClick}
          onVisibilityClick={onVisibilityClick}
        />
      </Drawer.Body>
    </Drawer>
  );
};
