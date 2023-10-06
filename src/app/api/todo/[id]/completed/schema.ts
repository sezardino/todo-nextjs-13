import z from "zod";

export const setCompletedValidationSchema = z.object({
  completed: z.boolean(),
});

export type SetCompletedBody = z.infer<typeof setCompletedValidationSchema>;
