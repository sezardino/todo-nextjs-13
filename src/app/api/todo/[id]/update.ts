import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { updateTodoValidationSchema } from "./schema";

export const updateTodo = async (req: NextRequest, context: { id: string }) => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const body = await req.json();

  const validation = updateTodoValidationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid request", errors: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const response = await dbService.todo.update({
      userId: session.user.id,
      todoId: context.id,
      title: validation.data.title,
      description: validation.data.description,
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
