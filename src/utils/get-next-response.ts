import { NextResponse } from "next/server";

export const getNextResponse = <T extends object>(
  response: T,
  status: number
) => NextResponse.json({ ...response }, { status });
