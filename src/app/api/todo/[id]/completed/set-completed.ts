import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { setCompletedValidationSchema } from "./schema";

export const setCompleted = getApiRouteHandler<{ params: { id: string } }>({
  schema: setCompletedValidationSchema,
  async callback({ session, data, context }) {
    return await dbService.todo.setComplete({
      userId: session.user.id,
      completed: data.completed,
      todoId: context.params.id,
    });
  },
});
