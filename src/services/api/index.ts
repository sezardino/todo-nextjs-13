import { AuthApiService } from "./modules/auth";
import { TodoApiService } from "./modules/todo";
import { UserApiService } from "./modules/user";

class Api {
  auth: AuthApiService;
  user: UserApiService;
  todo: TodoApiService;

  constructor() {
    this.auth = new AuthApiService();
    this.user = new UserApiService();
    this.todo = new TodoApiService();
  }
}

export const api = new Api();
