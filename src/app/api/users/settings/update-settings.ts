import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { updateSettingsValidationSchema } from "./schema";

export const updateSettings = getApiRouteHandler({
  schema: updateSettingsValidationSchema,
  async callback({ data, session }) {
    return await dbService.user.updateData({
      login: session.user.login,
      ...data,
    });
  },
});
