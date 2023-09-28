import { prisma } from "@/libs/prisma";
import { PrismaClient } from "@prisma/client";
import { AuthDBModule } from "./modules/auth";
import { UserDBModule } from "./modules/user";

class DBService {
  auth: AuthDBModule;
  user: UserDBModule;

  constructor(private readonly prisma: PrismaClient) {
    this.user = new UserDBModule(this.prisma);
    this.auth = new AuthDBModule(this.prisma, this.user);
  }
}

export const dbService = new DBService(prisma);
