import { booleanStringToBoolean } from "@/utils/boolean-string-to-boolean";
import z from "zod";

export const createTodoValidationSchema = z.object({
  title: z.string(),
});

export type CreateTodoBody = z.infer<typeof createTodoValidationSchema>;

export const todoListValidationSchema = z.object({
  limit: z.preprocess((val) => Number(val), z.number().optional()),
  page: z.preprocess((val) => Number(val), z.number().optional()),
  search: z.string().optional(),
  completed: z.preprocess(
    (val) => booleanStringToBoolean(val),
    z.boolean().optional()
  ),
  hidden: z.preprocess(
    (val) => booleanStringToBoolean(val),
    z.boolean().optional()
  ),
});

export type TodoListBody = z.infer<typeof todoListValidationSchema>;
