import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { createChildTodoValidationSchema } from "./schema";

export const createChildTodo = getApiRouteHandler<{ params: { id: string } }>({
  schema: createChildTodoValidationSchema,
  callback: async ({ data, session, context }) => {
    return await dbService.todo.createChild({
      userId: session.user.id,
      parentId: context.params.id,
      title: data.title,
    });
  },
});
