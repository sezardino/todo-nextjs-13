import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { todoListValidationSchema } from "./schema";

export const todoList = getApiRouteHandler({
  schema: todoListValidationSchema,
  async callback({ data, session }) {
    return await dbService.todo.list({
      userId: session.user.id,
      ...data,
    });
  },
});
