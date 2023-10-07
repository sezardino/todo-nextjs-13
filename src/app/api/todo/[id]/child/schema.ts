import z from "zod";

export const createChildTodoValidationSchema = z.object({
  parentId: z.string(),
  title: z.string(),
});

export type CreateChildTodoBody = z.infer<
  typeof createChildTodoValidationSchema
>;
