import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { setVisibilityValidationSchema } from "./schema";

export const setVisibility = async (
  req: NextRequest,
  context: { id: string }
) => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const body = await req.json();

  const validation = setVisibilityValidationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid request", errors: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const response = await dbService.todo.setVisibility({
      userId: session.user.id,
      hidden: validation.data.visibility,
      todoId: context.id,
    });

    if (!response) return NextResponse.json({ status: 404 });

    return NextResponse.json({ status: 200, body: response });
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
};
