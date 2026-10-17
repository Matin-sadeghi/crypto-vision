import { z } from 'zod';

export const authLoginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(8, 'The password must be at least 8 characters long'),
});

export type AuthLoginFormData = z.infer<typeof authLoginSchema>;
