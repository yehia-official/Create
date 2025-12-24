
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { CodeLanguage, TestResult } from '@/lib/types';


// Define the schema for the input of the flow
const EvaluateCodeInputSchema = z.object({
  code: z.string().describe("The student's code to be evaluated."),
  language: z.enum(['javascript', 'python', 'java']).describe("The programming language of the code."),
  testCases: z.string().describe("A JSON string representing an array of test cases, each with 'input' and 'output' properties."),
});
export type EvaluateCodeInput = z.infer<typeof EvaluateCodeInputSchema>;

// Define the output schema, which is an array of test results
const TestResultSchema = z.object({
    passed: z.boolean(),
    input: z.any(),
    output: z.any(),
    expected: z.any(),
});

const EvaluateCodeOutputSchema = z.array(TestResultSchema);
export type EvaluateCodeOutput = z.infer<typeof EvaluateCodeOutputSchema>;


// Define the exported wrapper function that clients will call
export async function evaluateCode(input: EvaluateCodeInput): Promise<EvaluateCodeOutput> {
  return evaluateCodeFlow(input);
}


const codeEvaluationPrompt = ai.definePrompt({
    name: 'codeEvaluationPrompt',
    input: { schema: EvaluateCodeInputSchema },
    output: { schema: EvaluateCodeOutputSchema },
    prompt: `You are an expert code judge. You will be given a code snippet in {{language}}, and a series of test cases in a JSON string.
    Your task is to act as a code interpreter and evaluate the provided code against each test case.

    Do not judge the quality of the code, only its correctness based on the test cases.
    For each test case, simulate the execution of the code with the given 'input' and compare the result with the 'expected' output.

    The 'input' for each test case is an array of arguments that should be passed to the function defined in the code.
    The 'output' is the expected return value from the function.

    Here is the code:
    \`\`\`{{language}}
    {{{code}}}
    \`\`\`

    Here are the test cases:
    \`\`\`json
    {{{testCases}}}
    \`\`\`

    Return a JSON array where each object represents the result for a single test case. Each object must have the following properties:
    - "passed": A boolean indicating if the actual output matched the expected output.
    - "input": The input value(s) for the test.
    - "output": The actual output from the code execution. If the code fails to run or produces an error, capture the error message as a string in this field.
    - "expected": The expected output for the test.
    `,
});


const evaluateCodeFlow = ai.defineFlow(
  {
    name: 'evaluateCodeFlow',
    inputSchema: EvaluateCodeInputSchema,
    outputSchema: EvaluateCodeOutputSchema,
  },
  async (input) => {
    try {
        const { output } = await codeEvaluationPrompt(input);
        
        if (!output) {
            throw new Error("The AI model did not return any output.");
        }
        
        // Ensure the output is an array, as a fallback.
        if (!Array.isArray(output)) {
             console.error("AI output was not an array:", output);
             // Try to parse it if it's a string
             if (typeof output === 'string') {
                 try {
                     return JSON.parse(output);
                 } catch (e) {
                    throw new Error("The AI model returned an invalid, non-array format.");
                 }
             }
            throw new Error("The AI model returned an invalid, non-array format.");
        }

        return output;

    } catch (error) {
        console.error("Error in evaluateCodeFlow:", error);
        throw new Error("Failed to evaluate the code using the AI model.");
    }
  }
);
