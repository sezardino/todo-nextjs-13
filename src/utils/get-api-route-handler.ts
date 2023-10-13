import { getNextAuthSession } from "@/libs/next-auth";
import { Session } from "next-auth";
import { NextRequest } from "next/server";
import { Schema as ZodSchema, z } from "zod";
import { getNextResponse } from "./get-next-response";

type CommonCallbackContext<S, C> = {
  req: NextRequest;
  data: S;
  context: C;
  session: Session;
};

type Arguments<Context extends object, Schema extends ZodSchema> = {
  schema?: Schema;
  callback: (
    ctx: CommonCallbackContext<z.infer<Schema>, Context>
  ) => Promise<any>;
};

export const getApiRouteHandler = <
  Context extends object,
  Schema extends ZodSchema = ZodSchema
>(
  args: Arguments<Context, Schema>
) => {
  const { schema, callback } = args;

  return async (req: NextRequest, context: Context) => {
    const session = await getNextAuthSession();

    if (!session) {
      return getNextResponse({}, 401);
    }

    let body: Schema["_output"] | undefined;
    const params: Record<string, any> = {};

    if (schema) {
      if (req.method === "GET") {
        const paramsEntries = req.nextUrl.searchParams.entries();

        Array.from(paramsEntries).forEach(([k, v]) => {
          params[k] = v;
        });
      } else {
        body = await req.json();
      }

      const validation = schema.safeParse(req.method === "GET" ? params : body);

      if (!validation.success) {
        return getNextResponse(
          { message: "Invalid request", errors: validation.error.errors },
          400
        );
      }
    }

    try {
      const response = await callback({ req, data: body, context, session });

      if (!response) return getNextResponse({}, 404);

      return getNextResponse(response, 200);
    } catch (error) {
      console.log(error);
      return getNextResponse({ error }, 500);
    }
  };
};
