import {genkit} from 'genkit';
import config from '../../genkit.config';

// Initialize Genkit with the configuration. This creates the 'ai' object.
const ai = genkit(config);

export {ai};
