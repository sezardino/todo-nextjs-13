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
  registration: "/api/auth/registration",
  settings: "/api/users/settings",
  todoList: "/api/todo",
  createTodo: "/api/todo",
  todo: (id: string) => `/api/todo/${id}`,
  completeTodo: (id: string) => `/api/todo/${id}/complete`,
  visibilityTodo: (id: string) => `/api/todo/${id}/visibility`,
  todoChild: (id: string) => `/api/todo/${id}/child`,
  deleteTodo: (id: string) => `/api/todo/${id}`,
};
