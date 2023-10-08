import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { updateTodoValidationSchema } from "./schema";

export const updateTodo = getApiRouteHandler<{ params: { id: string } }>({
  schema: updateTodoValidationSchema,
  async callback({ data, session, context }) {
    return await dbService.todo.update({
      userId: session.user.id,
      todoId: context.params.id,
      title: data.title,
      description: data.description,
    });
  },
});
