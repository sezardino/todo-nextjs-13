import z from "zod";

export const createTodoValidationSchema = z.object({
  title: z.string(),
});

export type CreateTodoBody = z.infer<typeof createTodoValidationSchema>;

export const todoListValidationSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  search: z.string().optional(),
  completed: z.boolean().optional(),
  hidden: z.boolean().optional(),
});

export type TodoListBody = z.infer<typeof todoListValidationSchema>;
