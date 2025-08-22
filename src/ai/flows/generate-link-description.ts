'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a short, catchy description of a linked page using AI.
 *
 * - generateLinkDescription - A function that handles the generation of the link description.
 * - GenerateLinkDescriptionInput - The input type for the generateLinkDescription function.
 * - GenerateLinkDescriptionOutput - The return type for the generateLinkDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkDescriptionInputSchema = z.object({
  longUrl: z
    .string()
    .describe("The long URL to generate a description for."),
});
export type GenerateLinkDescriptionInput = z.infer<typeof GenerateLinkDescriptionInputSchema>;

const GenerateLinkDescriptionOutputSchema = z.object({
  description: z.string().describe("A short, catchy description of the linked page."),
});
export type GenerateLinkDescriptionOutput = z.infer<typeof GenerateLinkDescriptionOutputSchema>;

export async function generateLinkDescription(input: GenerateLinkDescriptionInput): Promise<GenerateLinkDescriptionOutput> {
  return generateLinkDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkDescriptionPrompt',
  input: {schema: GenerateLinkDescriptionInputSchema},
  output: {schema: GenerateLinkDescriptionOutputSchema},
  prompt: `You are a creative marketing assistant helping a user organize their shortened URLs.

  Generate a short, catchy description (around 5-10 words) for the following URL:
  {{longUrl}}
  `,
});

const generateLinkDescriptionFlow = ai.defineFlow(
  {
    name: 'generateLinkDescriptionFlow',
    inputSchema: GenerateLinkDescriptionInputSchema,
    outputSchema: GenerateLinkDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
