import { AuthApiService } from "./modules/auth";
import { UserApiService } from "./modules/user";

class Api {
  auth: AuthApiService;
  user: UserApiService;

  constructor() {
    this.auth = new AuthApiService();
    this.user = new UserApiService();
  }
}

export const api = new Api();
