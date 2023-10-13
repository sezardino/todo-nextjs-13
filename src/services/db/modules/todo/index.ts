import { getPagination } from "@/utils/get-pagination";
import { Prisma, Todo } from "@prisma/client";
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
  async findOne(dto: FindOneTodoDto): Promise<Todo> {
    return await this.prismaService.todo.findUniqueOrThrow({
      where: { id: dto.todoId, userId: dto.userId, hidden: false },
      include: { children: true, parent: true },
    });
  }

  async list(dto: TodoListDto) {
    const { userId, limit, page, search, completed, hidden } = dto;

    const where: Prisma.TodoWhereInput = {
      userId,
      parent: null,
      hidden: false,
    };

    if (completed !== undefined) {
      where.completed = completed;
    }

    if (hidden !== undefined) {
      where.hidden = hidden;
    }

    if (typeof search === "string" && !!search) {
      where.title = { contains: search };
    }

    const count = await this.prismaService.todo.count({ where });

    const { skip, take, meta } = getPagination(page, limit, count);

    const todo = await this.prismaService.todo.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        hidden: true,
        completed: true,
        description: true,
        children: true,
      },
    });

    const mappedTodo = todo.map(({ description, children, ...todo }) => ({
      ...todo,
      hasDescription: !!description,
      children: {
        total: children.length,
        completed: children.filter((c) => c.completed).length,
      },
    }));

    return { data: mappedTodo, meta };
  }

  create(dto: CreateTodoDto) {
    return this.prismaService.todo.create({
      data: {
        title: dto.title,
        user: { connect: { id: dto.userId } },
      },
    });
  }

  async delete(dto: DeleteTodoDto) {
    const todo = await this.prismaService.todo.findUnique({
      where: { id: dto.todoId, userId: dto.userId },
      select: { children: { select: { id: true } } },
    });

    // delete children if it have
    if (todo?.children.length) {
      await this.prismaService.todo.deleteMany({
        where: {
          userId: dto.userId,
          parentId: dto.todoId,
        },
      });
    }

    // delete todo
    return this.prismaService.todo.delete({
      where: {
        id: dto.todoId,
        userId: dto.userId,
      },
    });
  }

  async createChild(dto: CreateChildTodoDto) {
    try {
      return await this.prismaService.todo.create({
        data: {
          title: dto.title,
          parent: { connect: { id: dto.parentId } },
          user: { connect: { id: dto.userId } },
        },
      });
    } catch (error) {
      console.log(error);
    }
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
    return await this.prismaService.todo.updateMany({
      where: {
        OR: [
          { parentId: dto.todoId, userId: dto.userId },
          { id: dto.todoId, userId: dto.userId },
        ],
      },
      data: { completed: dto.completed },
    });
  }

  async setVisibility(dto: SetTodoVisibilityDto) {
    return await this.prismaService.todo.update({
      where: { id: dto.todoId, userId: dto.userId },
      data: { hidden: dto.hidden },
    });
  }
}
