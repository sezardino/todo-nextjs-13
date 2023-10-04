import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const validationSchema = z.object({
  image: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().optional(),
  localization: z.string().optional(),
  name: z.string().optional(),
  socials: z.array(z.string()).optional(),
});

export const updateSettings = async (req: NextRequest) => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const body = await req.json();

  const validation = validationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid request", errors: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const response = await dbService.user.updateData({
      login: session.user.login,
      ...validation.data,
    });

    if ("code" in response) {
      return NextResponse.json(
        { message: response.message },
        { status: response.code }
      );
    }

    return NextResponse.json(
      { message: "User Data Updated", user: response },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Prisma" }, { status: 400 });
  }
};
