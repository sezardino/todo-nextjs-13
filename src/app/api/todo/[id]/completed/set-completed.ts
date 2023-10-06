import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { setCompletedValidationSchema } from "./schema";

export const setCompleted = async (
  req: NextRequest,
  context: { id: string }
) => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const body = await req.json();

  const validation = setCompletedValidationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid request", errors: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const response = await dbService.todo.setComplete({
      userId: session.user.id,
      completed: validation.data.completed,
      todoId: context.id,
    });

    if (!response) return NextResponse.json({ status: 404 });

    return NextResponse.json({ status: 200, body: response });
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
};
