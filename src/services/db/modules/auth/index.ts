import { passwordService } from "@/services/password";
import { PrismaClient, User } from "@prisma/client";
import { DBModuleError, isDBModuleError } from "../../types";
import { AbstractDBModule } from "../abstract";
import { UserDBModule } from "../user";
import { LoginDto, RegistrationDto } from "./types";

export class AuthDBModule extends AbstractDBModule {
  constructor(prisma: PrismaClient, private readonly userModule: UserDBModule) {
    super(prisma);
  }

  async registration(dto: RegistrationDto): Promise<User | DBModuleError> {
    const { login, password } = dto;

    const searchResponse = this.userModule.findOne({
      login,
      throwIfFound: true,
    });

    if (typeof searchResponse === "string" && searchResponse === "403") {
      return { code: 400, message: "Wrong Credentials" };
    }

    const newUser = await this.userModule.create({ login, password });

    return newUser;
  }

  async login(dto: LoginDto): Promise<User | DBModuleError> {
    const { login, password } = dto;
    const findResponse = await this.userModule.findOne({
      login,
      throwIfNotFound: true,
    });

    if (isDBModuleError(findResponse) || !findResponse) {
      return { code: 400, message: "Wrong Credentials" };
    }

    const isPasswordMatch = await passwordService.compare(
      password,
      findResponse.password
    );

    if (!isPasswordMatch) return { code: 400, message: "Wrong Credentials" };

    return findResponse;
  }
}
