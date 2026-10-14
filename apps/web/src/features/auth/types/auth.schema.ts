import { z } from 'zod';

export const authLoginSchema = z.object({
  email: z.email().trim(),
  password: z.string(),
});

export type AuthLoginFormData = z.infer<typeof authLoginSchema>;
