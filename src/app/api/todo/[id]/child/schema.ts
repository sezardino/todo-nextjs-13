import z from "zod";
import { updateTodoValidationSchema } from "../schema";

export const createChildTodoValidationSchema = z.object({
  parentId: z.string(),
  title: z.string(),
});

export type CreateChildTodoBody = z.infer<typeof updateTodoValidationSchema>;
