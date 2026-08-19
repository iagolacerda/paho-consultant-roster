import { z } from 'zod';

export function buildLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email(t('login.errorEmail')),
    password: z.string().min(1, t('login.errorPassword')),
    remember: z.boolean(),
  });
}

export type LoginValues = z.infer<ReturnType<typeof buildLoginSchema>>;

export const EMPTY_LOGIN: LoginValues = { email: '', password: '', remember: false };
