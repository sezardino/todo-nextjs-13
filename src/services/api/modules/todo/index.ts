import { CreateChildTodoBody } from "@/app/api/todo/[id]/child/schema";
import { SetCompletedBody } from "@/app/api/todo/[id]/complete/schema";
import { UpdateTodoBody } from "@/app/api/todo/[id]/schema";
import { SetVisibilityBody } from "@/app/api/todo/[id]/visibility/schema";
import { CreateTodoBody, TodoListBody } from "@/app/api/todo/schema";
import { ProjectApiUrls } from "@/const/url";
import {
  TodoListResponse,
  TodoOneResponse,
} from "@/services/db/modules/todo/types";
import { AbstractApiModule } from "../../helper";

export class TodoApiService extends AbstractApiModule {
  async list(data: TodoListBody): Promise<TodoListResponse> {
    const { page = 0, limit = 10, ...rest } = data;
    return this.fetcher(ProjectApiUrls.todoList, {
      params: { page, limit, ...rest },
    });
  }

  async one(id: string): Promise<TodoOneResponse> {
    return this.fetcher<TodoOneResponse>(ProjectApiUrls.todo(id));
  }

  async create(data: CreateTodoBody) {
    return this.fetcher(ProjectApiUrls.createTodo, { method: "POST", data });
  }

  async createChild(data: CreateChildTodoBody) {
    return this.fetcher(ProjectApiUrls.todoChild(data.parentId), {
      method: "POST",
      data,
    });
  }

  async update(data: UpdateTodoBody & { id: string }) {
    const { id, ...rest } = data;

    return this.fetcher(ProjectApiUrls.todo(id), {
      method: "PATCH",
      data: rest,
    });
  }

  async delete(id: string) {
    return this.fetcher(ProjectApiUrls.todo(id), { method: "DELETE" });
  }

  async complete(data: SetCompletedBody & { id: string }) {
    return this.fetcher(ProjectApiUrls.completeTodo(data.id), {
      method: "POST",
      data: { completed: data.completed },
    });
  }
  async hide(data: SetVisibilityBody & { id: string }) {
    return this.fetcher(ProjectApiUrls.visibilityTodo(data.id), {
      method: "POST",
      data: { visibility: data.visibility },
    });
  }
}
