import z from "zod";

export const updateSettingsValidationSchema = z.object({
  image: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().optional(),
  localization: z.string().optional(),
  name: z.string().optional(),
  socials: z.array(z.string()).optional(),
});

export type UpdateSettingsBody = z.infer<typeof updateSettingsValidationSchema>;
