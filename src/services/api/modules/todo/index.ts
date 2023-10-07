import { TodoListBody } from "@/app/api/todo/schema";
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
    return this.fetcher(ProjectApiUrls.todo(id));
  }
}
