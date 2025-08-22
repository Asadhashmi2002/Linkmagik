"use server";

import { ShortenUrlSchema } from '@/lib/schema';
import { createLink } from '@/lib/db';
import { generateLinkDescription } from '@/ai/flows/generate-link-description';
import { revalidatePath } from 'next/cache';

export type ShortenState = {
  message?: string;
  error?: string;
};

export async function shortenUrl(prevState: ShortenState, formData: FormData): Promise<ShortenState> {
  const validatedFields = ShortenUrlSchema.safeParse({
    longUrl: formData.get('longUrl'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.longUrl?.[0]
    };
  }

  const { longUrl } = validatedFields.data;

  try {
    const aiResponse = await generateLinkDescription({ longUrl });
    const description = aiResponse.description;

    await createLink(longUrl, description);
    
    revalidatePath('/');
    
    return {
      message: 'URL shortened successfully!',
    };
  } catch (e) {
    console.error(e);
    // This could be a more specific error, e.g. if the AI service is down
    if (e instanceof Error) {
        return { error: `An unexpected error occurred: ${e.message}` };
    }
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
