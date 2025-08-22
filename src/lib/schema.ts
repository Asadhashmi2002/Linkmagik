import { z } from 'zod';

export const ShortenUrlSchema = z.object({
  longUrl: z.string({ required_error: "Please enter a URL."}).min(1, { message: "Please enter a URL." }).url({ message: "Please enter a valid URL." }),
});
