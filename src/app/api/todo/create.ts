import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { createTodoValidationSchema } from "./schema";

export const createTodo = getApiRouteHandler({
  schema: createTodoValidationSchema,
  async callback({ data, session }) {
    return await dbService.todo.create({
      userId: session.user.id,
      title: data.title,
    });
  },
});
