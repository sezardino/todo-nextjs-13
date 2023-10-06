import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createTodoValidationSchema } from "./schema";

export const createTodo = async (req: NextRequest) => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const body = await req.json();

  const validation = createTodoValidationSchema.safeParse(body);

  if (!validation.success) return NextResponse.json({ status: 400 });

  const response = await dbService.todo.create({
    userId: session.user.id,
    title: validation.data.title,
  });

  if (!response) return NextResponse.json({ status: 405 });

  return NextResponse.json({ status: 200, body: response });
};
