import z from "zod";

export const registrationValidationSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type RegistrationBody = z.infer<typeof registrationValidationSchema>;
