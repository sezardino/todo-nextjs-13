import z from "zod";

export const setVisibilityValidationSchema = z.object({
  visibility: z.boolean(),
});

export type SetVisibilityBody = z.infer<typeof setVisibilityValidationSchema>;
