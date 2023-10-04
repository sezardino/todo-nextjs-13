import { getNextAuthOptions } from "@/libs/next-auth";
import { dbService } from "@/services/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const getSettings = async () => {
  const session = await getServerSession(getNextAuthOptions());

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  const response = await dbService.user.getSettings(session.user.id);

  if (!response) return NextResponse.json({ status: 404 });

  return NextResponse.json({ status: 200, body: response });
};
