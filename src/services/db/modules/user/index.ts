import { passwordService } from "@/services/password";
import { User } from "@prisma/client";
import { AbstractDBModule } from "../abstract";
import { CreateUserDto, FindOneUserDto } from "./types";

export class UserDBModule extends AbstractDBModule {
  async findOne(dto: FindOneUserDto): Promise<User | null | "403" | "404"> {
    const { login, throwIfFound, throwIfNotFound } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (user && throwIfFound) {
      return "403";
    }

    if (!user && throwIfNotFound) {
      return "404";
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const { login, password } = dto;

    const user = await this.prismaService.user.create({
      data: {
        login,
        password: await passwordService.hash(password),
      },
    });

    return user;
  }
}
