import { nextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getNextResponse } from "@/utils/get-next-response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createChildTodoValidationSchema } from "./schema";

export const createChildTodo = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(nextAuthOptions);

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
      parentId: context.params.id,
      title: validation.data.title,
    });

    if (!response)
      return NextResponse.json({ error: "Prisma" }, { status: 500 });

    return getNextResponse({ ...response }, 201);
  } catch (error) {
    return NextResponse.json({ error: "Prisma" }, { status: 500 });
  }
};