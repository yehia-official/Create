
import type { Timestamp } from "firebase/firestore";
import type { User } from "./types";

/**
 * Represents an assignment or worksheet given to students.
 */
export interface Sheet {
  id: string;
  title: string;
  subject: string;
  createdAt: Timestamp | Date;
  deadline: Timestamp | Date;
  teacherId: string;
}

/**
 * Represents a student's submission for a specific sheet.
 * This is where the grade (degree) and feedback are stored.
 */
export interface Submission {
  id: string; // Composite key: `${studentId}_${sheetId}`
  sheetId: string;
  studentId: string;
  submittedAt: Timestamp | Date;
  
  // The content of the submission
  fileUrl?: string; // Optional URL to an uploaded file
  textSubmission?: string; // Optional text or link submission

  // The fields below are populated by the teacher during grading
  grade: number | null; // The numerical grade/degree (e.g., 85)
  feedback: string | null; // The teacher's comments
  gradedAt?: Timestamp | Date; // When the submission was graded
  
  // Denormalized data for easier querying and display
  sheetTitle?: string;
  sheetSubject?: string;
}

/**
 * A helper type that combines a student's User profile
 * with their specific submission for display purposes.
 */
export interface StudentWithSubmission {
    student: User;
    submission: Submission | null;
}
