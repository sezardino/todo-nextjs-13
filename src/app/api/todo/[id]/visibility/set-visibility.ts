import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { setVisibilityValidationSchema } from "./schema";

export const setVisibility = getApiRouteHandler<{ params: { id: string } }>({
  schema: setVisibilityValidationSchema,
  async callback({ data, session, context }) {
    return await dbService.todo.setVisibility({
      userId: session.user.id,
      hidden: data.visibility,
      todoId: context.params.id,
    });
  },
});
