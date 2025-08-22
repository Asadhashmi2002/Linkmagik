'use server';

import { ShortenUrlSchema } from '@/lib/schema';
import { createLink } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type ShortenState = {
  message?: string;
  error?: string;
  shortUrl?: string;
};

// A simple AI-like function to generate a description.
// In a real scenario, this would be a call to a GenAI model.
async function generateLinkDescription(longUrl: string): Promise<{ description: string }> {
  try {
    const url = new URL(longUrl);
    // Create a simple description from the hostname
    let description = `${url.hostname.replace(/^www\./, '')} link`;
    // Capitalize the first letter
    description = description.charAt(0).toUpperCase() + description.slice(1);
    return Promise.resolve({ description });
  } catch (e) {
    return Promise.resolve({ description: "Link to an external resource" });
  }
}

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
    const aiResponse = await generateLinkDescription(longUrl);
    const description = aiResponse.description;
    
    const newLink = await createLink(longUrl, description);
    
    revalidatePath('/');
    
    // Construct the full short URL to return to the client
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const shortUrl = `${baseUrl}/${newLink.shortCode}`;

    return {
      message: 'URL shortened successfully!',
      shortUrl: shortUrl,
    };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
        return { error: `An unexpected error occurred: ${e.message}` };
    }
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
