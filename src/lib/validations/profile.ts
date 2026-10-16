import { z } from 'zod';

export const profileBasicsSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less'),
  age: z
    .number()
    .int()
    .min(18, 'Must be at least 18')
    .max(120, 'Please enter a valid age'),
  city: z.string().min(1, 'Please enter your city').max(100),
  pronouns: z.string().max(30).optional(),
});

export const profileBioSchema = z.object({
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
});

export const locationPrefsSchema = z.object({
  locationMode: z.enum(['approximate', 'city_only', 'hidden']),
  preferredCity: z.string().optional(),
});

export type ProfileBasicsData = z.infer<typeof profileBasicsSchema>;
export type ProfileBioData = z.infer<typeof profileBioSchema>;
export type LocationPrefsData = z.infer<typeof locationPrefsSchema>;
