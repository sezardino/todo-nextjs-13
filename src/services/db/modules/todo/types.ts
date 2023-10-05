export type CreateTodoDto = {
  userId: string;
  title: string;
};

export type CreateChildTodoDto = {
  userId: string;
  parentId: string;
  title: string;
};

export type UpdateTodoDto = {
  userId: string;
  todoId: string;
  title: string;
  description: string;
};

export type SetTodoCompleteDto = {
  userId: string;
  completed: boolean;
  todoId: string;
};

export type SetTodoVisibilityDto = {
  userTodoId: string;
  hidden: boolean;
  todoId: string;
};

export type FindOneTodoDto = {
  todoId: string;
  userId: string;
};

export type TodoListDto = {
  userId: string;
  limit?: number;
  page?: number;
  search?: string;
  completed?: boolean;
  hidden?: boolean;
};
