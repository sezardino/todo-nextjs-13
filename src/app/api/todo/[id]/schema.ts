import z from "zod";

export const updateTodoValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateTodoBody = z.infer<typeof updateTodoValidationSchema>;
