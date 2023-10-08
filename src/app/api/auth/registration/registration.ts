import { dbService } from "@/services/db";
import { getApiRouteHandler } from "@/utils/get-api-route-handler";
import { registrationValidationSchema } from "./schema";

export const registration = getApiRouteHandler({
  schema: registrationValidationSchema,
  async callback({ data }) {
    return await dbService.auth.registration(data);
  },
});
