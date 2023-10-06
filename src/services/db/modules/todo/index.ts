import { Prisma, Todo } from "@prisma/client";
import { DBModuleError } from "../../types";
import { AbstractDBModule } from "../abstract";
import {
  CreateChildTodoDto,
  CreateTodoDto,
  DeleteTodoDto,
  FindOneTodoDto,
  SetTodoCompleteDto,
  SetTodoVisibilityDto,
  TodoListDto,
  UpdateTodoDto,
} from "./types";

export class TodoDBModule extends AbstractDBModule {
  async findOne(dto: FindOneTodoDto): Promise<Todo | DBModuleError> {
    try {
      return await this.prismaService.todo.findUniqueOrThrow({
        where: { id: dto.todoId, userId: dto.userId },
        include: { children: true, parent: true },
      });
    } catch (error) {
      return { code: 404, message: "Todo not found" };
    }
  }

  create(dto: CreateTodoDto) {
    return this.prismaService.todo.create({
      data: {
        title: dto.title,
        user: { connect: { id: dto.userId } },
      },
    });
  }

  delete(dto: DeleteTodoDto) {
    return this.prismaService.todo.delete({
      where: { id: dto.todoId, userId: dto.userId },
    });
  }

  createChild(dto: CreateChildTodoDto) {
    this.prismaService.todo.create({
      data: {
        title: dto.title,
        parent: { connect: { id: dto.parentId } },
        user: { connect: { id: dto.userId } },
      },
    });
  }

  async update(dto: UpdateTodoDto) {
    return await this.prismaService.todo.update({
      where: { id: dto.todoId, userId: dto.userId },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async setComplete(dto: SetTodoCompleteDto) {
    return await this.prismaService.todo.update({
      where: { id: dto.todoId, userId: dto.userId },
      data: { completed: dto.completed },
    });
  }

  async setVisibility(dto: SetTodoVisibilityDto) {
    return await this.prismaService.todo.update({
      where: { id: dto.todoId, userId: dto.userId },
      data: { hidden: dto.hidden },
    });
  }

  async list(dto: TodoListDto) {
    const { userId, limit, page, search, completed, hidden } = dto;

    const where: Prisma.TodoWhereInput = { userId, parent: null };

    if (completed !== undefined) {
      where.completed = completed;
    }

    if (hidden !== undefined) {
      where.hidden = hidden;
    }

    if (!!search) {
      where.title = { contains: search };
    }

    const todo = await this.prismaService.todo.findMany({
      where,
      take: limit,
      skip: page && limit ? (page - 1) * limit : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        title: true,
        description: true,
        hidden: true,
        completed: true,
        _count: {
          select: { children: true },
        },
      },
    });

    if (search) {
      return todo.filter((todo) => todo.title.includes(search));
    }

    return todo;
  }
}
