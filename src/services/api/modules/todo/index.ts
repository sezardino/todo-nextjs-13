import { CreateChildTodoBody } from "@/app/api/todo/[id]/child/schema";
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
}
