"use client";

import { useTodoListQuery } from "@/libs/react-query/hooks/query/todo-list";

const DashboardPage = () => {
  const { data } = useTodoListQuery({});

  return <>Dashboard page</>;
};

export default DashboardPage;
