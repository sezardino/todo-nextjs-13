import { dbService } from "@/services/db";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getSession();
  console.log({ session });
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  console.log(true);
  console.log({ server: session.user.id });
  const response = await dbService.user.getSettings(session.user.id);

  if (!response) return NextResponse.json({ status: 404 });

  return NextResponse.json({ status: 200, body: { settings: response } });
};
