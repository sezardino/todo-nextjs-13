import { nextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getNextResponse } from "@/utils/get-next-response";
import { getServerSession } from "next-auth";

export const getSettings = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return getNextResponse({}, 401);
  }

  const response = await dbService.user.getSettings(session.user.id);

  if (!response) return getNextResponse({}, 404);

  return getNextResponse(response, 200);
};
