import { passwordService } from "@/services/password";
import { User } from "@prisma/client";
import { DBModuleError, isDBModuleError } from "../../types";
import { AbstractDBModule } from "../abstract";
import {
  CreateUserDto,
  DeleteUserDto,
  FindOneUserBaseDto,
  FindOneUserDto,
  FindOneUserFoundDto,
  FindOneUserNotFoundDto,
  UpdatePasswordDto,
  UpdateUserDataDto,
} from "./types";

export class UserDBModule extends AbstractDBModule {
  async findOne(dto: FindOneUserBaseDto): Promise<User | null>;
  async findOne(dto: FindOneUserNotFoundDto): Promise<User | DBModuleError>;
  async findOne(dto: FindOneUserFoundDto): Promise<null | DBModuleError>;
  async findOne(dto: FindOneUserDto): Promise<User | null | DBModuleError> {
    const { login } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (user && "throwIfFound" in dto && dto.throwIfFound === true) {
      return { code: 403, message: "Forbidden" };
    }

    if (!user && "throwIfNotFound" in dto && dto.throwIfNotFound === true) {
      return { code: 404, message: "User not found" };
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

  async updateData(dto: UpdateUserDataDto): Promise<User | DBModuleError> {
    const { login, bio, email, image, localization, name, socials } = dto;

    const toUpdate: Record<string, any> = {
      bio,
      email,
      image,
      localization,
      name,
      socials,
    };

    Object.entries(toUpdate).forEach(([key, value]) => {
      if (typeof value === "undefined") delete toUpdate[key];
    });

    const findResponse = await this.findOne({ login, throwIfNotFound: true });

    if (isDBModuleError(findResponse)) return findResponse;

    return await this.prismaService.user.update({
      where: { login },
      data: toUpdate,
    });
  }

  async delete(dto: DeleteUserDto): Promise<User | DBModuleError> {
    const { login } = dto;

    const findResponse = await this.findOne({ login, throwIfNotFound: true });

    if (isDBModuleError(findResponse)) return findResponse;

    return await this.prismaService.user.update({
      where: { login },
      data: { status: "INACTIVE" },
    });
  }

  async updatePassword(dto: UpdatePasswordDto): Promise<User | DBModuleError> {
    const { login, newPassword, oldPassword } = dto;

    const findResponse = await this.findOne({ login, throwIfNotFound: true });

    if (isDBModuleError(findResponse) || !findResponse)
      return findResponse as DBModuleError;

    const isPasswordMatch = await passwordService.compare(
      oldPassword,
      findResponse.password
    );

    if (!isPasswordMatch) return { code: 400, message: "Wrong Password" };

    return await this.prismaService.user.update({
      where: { login },
      data: { password: await passwordService.hash(newPassword) },
    });
  }
}
