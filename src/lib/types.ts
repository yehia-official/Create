

import { Timestamp } from "firebase/firestore";

export type QuestionType = "multiple-choice" | "short-text" | "true-false" | "code" | "mathematical" | "diagram";
export type CodeLanguage = 'javascript' | 'python' | 'java';

export interface Question {
  id: string;
  text: string;
  textAr?: string;
  type: QuestionType;
  options?: string[];
  optionsAr?: string[];
  answer: string | boolean;
  points: number;
  subject: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  language?: CodeLanguage;
  codeSnippet?: string;
  testCases?: string; // JSON string of test cases
}

export interface Exam {
  id: string;
  title: string;
  titleAr: string;
  subject: string;
  duration: number; // in minutes
  questionsCount: number;
  // questions: Question[]; // This is now a subcollection
  attemptsAllowed?: number;
  gradingPolicy?: 'highest' | 'average';
  startTime?: Timestamp | Date;
  endTime?: Timestamp | Date;
  status?: 'Scheduled' | 'In Progress' | 'Completed' | 'Not Started';
  teacherId: string;
}

export type Answer = {
  questionId: string;
  value: string | boolean | null | { code: string; score: number }; // Allow complex value for code answers
};

export type TestResult = {
  passed: boolean;
  input: any;
  output: any;
  expected: any;
};

export type ExamResult = {
  id: string;
  studentId: string;
  examId: string;
  answers: Answer[];
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  timeTaken: number; // in seconds
  attemptNumber: number;
  submittedAt: Timestamp | Date;
};

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  guardianEmail?: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
};

export type WithId<T> = T & { id: string };
    
