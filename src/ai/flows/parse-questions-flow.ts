
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as XLSX from 'xlsx';

// Define the schema for a single question that should be parsed
const QuestionSchema = z.object({
  text: z.string().describe("The full text of the question."),
  type: z.enum(["multiple-choice", "short-text", "true-false", "code", "mathematical", "diagram"]).describe("The type of the question."),
  points: z.coerce.number().describe("The number of points the question is worth. Default to 10 if not specified."),
  answer: z.union([z.string(), z.boolean()]).nullable(),
  options: z.array(z.string()).optional().describe("An array of choices for multiple-choice questions."),
  language: z.enum(['javascript', 'python', 'java']).optional(),
  codeSnippet: z.string().optional(),
  testCases: z.string().optional(),
}).refine(data => {
    if (data.type === 'code') {
        if (!data.testCases) return false;
        try {
            const tests = JSON.parse(data.testCases);
            return Array.isArray(tests) && tests.length > 0;
        } catch (e) {
            return false;
        }
    }
    return data.answer !== null && data.answer !== undefined && data.answer !== '';
}, {
    message: "A valid answer or a non-empty set of JSON test cases is required for the given question type.",
    path: ["answer"],
});

// Define the schema for the input of the flow
const ParseQuestionsInputSchema = z.object({
  fileContent: z.string().describe("The Base64 encoded content of the Excel/CSV file."),
});

// Define the output schema, which is an array of questions
const ParseQuestionsOutputSchema = z.array(QuestionSchema);
export type ParseQuestionsOutput = z.infer<typeof ParseQuestionsOutputSchema>;

// Define the exported wrapper function that clients will call
export async function parseQuestionsFlow(input: z.infer<typeof ParseQuestionsInputSchema>): Promise<ParseQuestionsOutput> {
  return flow(input);
}

// Define the Genkit flow
const flow = ai.defineFlow(
  {
    name: 'parseQuestionsFlow',
    inputSchema: ParseQuestionsInputSchema,
    outputSchema: ParseQuestionsOutputSchema,
  },
  async ({ fileContent }) => {
    try {
      const buffer = Buffer.from(fileContent, 'base64');
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const parsedQuestions = json.map(row => {
        // Support both Arabic and English headers
        const text = row['نص السؤال'] || row.text;
        const type = row['نوع الأسئلة'] || row.type;
        const points = row['نقاط'] || row.points;
        const answer = row['الإجابة الصحيحة'] || row.answer;
        const option1 = row.option1;
        const option2 = row.option2;
        const option3 = row.option3;
        const option4 = row.option4;
        const language = row['لغة'] || row.language;
        const codeSnippet = row['مقتطف التعليمات'] || row.codeSnippet;
        const testCases = row['حالات الاختبار (JSON)'] || row.testCases;

        if (!text || !type || points === undefined) {
          return null;
        }

        const questionType = String(type).trim().toLowerCase().replace(' ', '-') as z.infer<typeof QuestionSchema>['type'];
        
        let questionObject: Partial<z.infer<typeof QuestionSchema>> = {
          text: String(text).trim(),
          type: questionType,
          points: Number(points) || 10,
        };

        if (questionType === 'multiple-choice') {
          const options = [option1, option2, option3, option4]
            .map(opt => String(opt || '').trim())
            .filter(opt => opt !== "");
          
          if (options.length < 2) return null;
          
          questionObject.options = options;
          questionObject.answer = String(answer).trim();

          if (!options.includes(questionObject.answer)) {
            console.error(`Invalid answer for MC-question: '${questionObject.answer}' is not in options [${options.join(', ')}]`);
            return null;
          }

        } else if (questionType === 'true-false') {
          const answerStr = String(answer).trim().toLowerCase();
          if (answerStr === 'true') {
            questionObject.answer = true;
          } else if (answerStr === 'false') {
            questionObject.answer = false;
          } else {
            return null;
          }
        } else if (questionType === 'short-text' || questionType === 'mathematical' || questionType === 'diagram') {
          const trimmedAnswer = String(answer).trim();
          if (trimmedAnswer === '') return null;
          questionObject.answer = trimmedAnswer;
        } else if (questionType === 'code') {
            questionObject.language = (language as z.infer<typeof QuestionSchema>['language']) || 'javascript';
            questionObject.codeSnippet = codeSnippet || '';
            questionObject.testCases = testCases || '';
            questionObject.answer = null; // Code questions are graded via testCases, not a single answer
        } else {
          return null;
        }

        const validation = QuestionSchema.safeParse(questionObject);
        if (validation.success) {
          return validation.data;
        } else {
            console.error("Zod validation failed for row:", row, validation.error.flatten());
            return null;
        }

      }).filter((q): q is z.infer<typeof QuestionSchema> => q !== null);
      
      return parsedQuestions;

    } catch (error: any) {
      console.error("Error processing in flow:", error);
      const errorMessage = 'Failed to parse the file. Please check the file format and content.';
      throw new Error(errorMessage);
    }
  }
);
