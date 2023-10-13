import { ProjectPageUrls } from "@/const/url";
import { TodoOneResponse } from "@/services/db/modules/todo/types";
import { getStringShorted } from "@/utils/get-string-shorted";
import { useMemo, type FC } from "react";
import { Breadcrumb, Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

export type TodoBreadcrumbsProps = Omit<BreadcrumbsProps, "items"> & {
  todo: TodoOneResponse;
};

export const TodoBreadcrumbs: FC<TodoBreadcrumbsProps> = (props) => {
  const { todo, ...rest } = props;

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

  return <Breadcrumbs {...rest} items={breadcrumbs} />;
};
