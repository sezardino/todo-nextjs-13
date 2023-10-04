import { dbService } from "@/services/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const validationSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  const validation = validationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid request", errors: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const response = await dbService.auth.registration({
      login: validation.data.login,
      password: validation.data.password,
    });

    if ("code" in response) {
      return NextResponse.json(
        { message: response.message },
        { status: response.code }
      );
    }

    return NextResponse.json(
      { message: "User created", user: response },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Prisma" }, { status: 400 });
  }
};
