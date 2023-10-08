import { nextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getNextResponse } from "@/utils/get-next-response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const getOneTodo = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  try {
    const response = await dbService.todo.findOne({
      userId: session.user.id,
      todoId: context.params.id,
    });

    if (!response) return NextResponse.json({ status: 404 });

    return getNextResponse(response, 200);
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
};
