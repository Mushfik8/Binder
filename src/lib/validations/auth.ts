import { z } from 'zod';

// Age gate validation
export const ageGateSchema = z.object({
  day: z.number().int().min(1).max(31),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(1900).max(new Date().getFullYear() - 18),
  isAdult: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm you are 18 or older' }),
  }),
  acceptsHealthDisclaimer: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge the health disclaimer' }),
  }),
  understandsNoSales: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge that Binder does not sell tobacco' }),
  }),
});

export type AgeGateData = z.infer<typeof ageGateSchema>;

// Auth validation
export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
});

export const signupSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  displayName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less')
    .regex(/^[a-zA-Z0-9\u0980-\u09FF\s._-]+$/, 'Name contains invalid characters'),
});

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;

// Utility: Check if DOB makes user 18+
export function isAtLeast18(day: number, month: number, year: number): boolean {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  // Validate the date is real
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return false;
  }

  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }

  return age >= 18;
}
