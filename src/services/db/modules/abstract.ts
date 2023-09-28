import { PrismaClient } from "@prisma/client";

export abstract class AbstractDBModule {
  constructor(protected readonly prismaService: PrismaClient) {}
}
