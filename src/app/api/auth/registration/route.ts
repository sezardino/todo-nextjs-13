import { prisma } from "@/libs/prisma";
import { passwordService } from "@/services/password";
import { NextResponse } from "next/server";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email(),
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

  const isUserExist = await prisma.user.findUnique({
    where: { email: validation.data.email },
  });

  if (isUserExist) {
    return NextResponse.json(
      { errors: { email: "Wrong credentials" } },
      { status: 400 }
    );
  }

  try {
    await prisma.user.create({
      data: {
        email: validation.data.email,
        password: await passwordService.hash(validation.data.password),
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};
