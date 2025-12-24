
import { googleAI } from '@genkit-ai/google-genai';
import { GenkitConfig } from 'genkit';
import {config as dotenvConfig} from 'dotenv';

dotenvConfig();

const config: GenkitConfig = {
  plugins: [
    googleAI({
      // Pass the API key from the environment variable.
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      // Explicitly set the API version to 'v1' to ensure compatibility
      // with the available models and avoid the v1beta 'Not Found' error.
      apiVersion: 'v1',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
  // Use a model that's likely to be available, specifying the provider.
  model: 'googleai/gemini-pro',
};

export default config;
