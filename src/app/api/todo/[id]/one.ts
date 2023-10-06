import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const deleteTodo = async (req: NextRequest, context: { id: string }) => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  try {
    const response = await dbService.todo.findOne({
      userId: session.user.id,
      todoId: context.id,
    });

    if (!response) return NextResponse.json({ status: 404 });

    return NextResponse.json({ status: 200, body: response });
  } catch (error) {
    return NextResponse.json({ status: 204, body: error });
  }
};
