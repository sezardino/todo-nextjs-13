import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";

export const deleteTodo = getApiRouteHandler<{ params: { id: string } }>({
  async callback({ session, context }) {
    return await dbService.todo.delete({
      userId: session.user.id,
      todoId: context.params.id,
    });
  },
});
