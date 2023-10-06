import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createChildTodoValidationSchema } from "./schema";

export const createChildTodo = async (
  req: NextRequest,
  context: { id: string }
) => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const body = await req.json();

  const validation = createChildTodoValidationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid request", errors: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const response = await dbService.todo.createChild({
      userId: session.user.id,
      parentId: context.id,
      title: validation.data.title,
    });

    // TODO: add error when 404
    // if ("code" in response) {
    //   return NextResponse.json(
    //     { message: response.message },
    //     { status: response.code }
    //   );
    // }

    return NextResponse.json(
      { message: "Data Updated", user: response },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Prisma" }, { status: 400 });
  }
};
