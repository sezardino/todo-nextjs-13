import { nextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { todoListValidationSchema } from "./schema";

export const todoList = async (req: NextRequest) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const params: Record<string, any> = {};
  const paramsEntries = req.nextUrl.searchParams.entries();

  Array.from(paramsEntries).forEach(([k, v]) => {
    params[k] = v;
  });

  const validation = todoListValidationSchema.safeParse(params);

  if (!validation.success)
    return NextResponse.json(
      { errors: validation.error.errors },
      { status: 400 }
    );

  try {
    const response = await dbService.todo.list({
      userId: session.user.id,
      ...validation.data,
    });

    if (!response) return NextResponse.json({}, { status: 404 });

    return NextResponse.json({ ...response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
