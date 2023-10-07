export const ProjectPageUrls = {
  login: "/login",
  registration: "/registration",

  home: "/",

  // protected

  dashboard: "/dashboard",
  todo: (id: string) => `/dashboard/${id}`,
  settings: "/settings",
};

export const ProjectApiUrls = {
  registration: "/api/registration",
  settings: "/api/users/settings",
  todoList: "/api/todo",
  createTodo: "/api/todo",
  todo: (id: string) => `/api/todo/${id}`,
  todoChild: (id: string) => `/api/todo/${id}/child`,
  deleteTodo: (id: string) => `/api/todo/${id}`,
};
