
"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { collection, doc, query, where } from "firebase/firestore";
import { useDoc, useFirestore, useMemoFirebase, useCollection } from "@/firebase";
import type { Exam, ExamResult, User, WithId, Question } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Home,
  Award,
  Loader2,
  BarChart,
  User as UserIcon,
  BookOpen,
} from "lucide-react";
import { cn, formatTime } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: "Excellent", color: "text-green-500" };
    if (percentage >= 75) return { level: "Good", color: "text-blue-500" };
    if (percentage >= 50) return { level: "Satisfactory", color: "text-yellow-500" };
    return { level: "Needs Improvement", color: "text-destructive" };
};


export default function ReportPage() {
  const params = useParams();
  const firestore = useFirestore();
  const resultId = params.resultId as string;

  const resultDocRef = useMemoFirebase(() => 
    (firestore && resultId) ? doc(firestore, 'studentExams', resultId) : null, 
  [firestore, resultId]);
  const { data: result, isLoading: isLoadingResult } = useDoc<ExamResult>(resultDocRef);

  const examDocRef = useMemoFirebase(() => 
    (firestore && result) ? doc(firestore, 'exams', result.examId) : null, 
  [firestore, result]);
  const { data: examDetails, isLoading: isLoadingExam } = useDoc<Exam>(examDocRef);
  
  const studentDocRef = useMemoFirebase(() => 
    (firestore && result) ? doc(firestore, 'users', result.studentId) : null,
  [firestore, result]);
  const { data: student, isLoading: isLoadingStudent } = useDoc<User>(studentDocRef);

  const allResultsForExamQuery = useMemoFirebase(() => 
    (firestore && result) ? query(collection(firestore, 'studentExams'), where('examId', '==', result.examId)) : null,
  [firestore, result]);
  const { data: allResults, isLoading: isLoadingAllResults } = useCollection<ExamResult>(allResultsForExamQuery);

  const averageScore = useMemo(() => {
    if (!allResults || allResults.length === 0) return 0;
    const total = allResults.reduce((sum, res) => sum + res.percentage, 0);
    return total / allResults.length;
  }, [allResults]);

  const isLoading = isLoadingResult || isLoadingExam || isLoadingStudent || isLoadingAllResults;

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center bg-muted/40"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!result || !examDetails || !student) {
      return (
        <div className="flex h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="max-w-lg text-center p-8">
                <CardHeader>
                    <CardTitle className="text-destructive">Report Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This report may not exist or has been moved. Please check the link and try again.</p>
                </CardContent>
                 <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            <span>Return to Homepage</span>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
  }

  const { score, maxScore, percentage, passed, timeTaken, submittedAt } = result;
  const performance = getPerformanceLevel(percentage);

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-6"
        >
            <header className="text-center space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold font-headline">
                    Student Performance Report
                </h1>
                 <p className="text-sm text-muted-foreground">
                    Generated on: {new Date().toLocaleDateString()}
                 </p>
            </header>

            <Card className="overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-background">
                    <div className="flex items-center gap-4">
                        <UserIcon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                        <div>
                            <CardTitle className="text-xl sm:text-2xl">{student.name}</CardTitle>
                            <CardDescription>{student.email}</CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2 sm:pt-0">
                        <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                        <div>
                            <p className="text-md sm:text-lg font-semibold">{examDetails.title}</p>
                            <p className="text-sm text-muted-foreground">{examDetails.subject}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={cn(
                        "p-6 rounded-lg text-center flex flex-col justify-center",
                        passed ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                    )}>
                        <h3 className="text-lg font-semibold text-foreground">Final Grade</h3>
                        <p className={cn("text-5xl font-bold", passed ? "text-green-600" : "text-destructive")}>
                            {percentage.toFixed(1)}%
                        </p>
                        <p className="text-sm text-muted-foreground">{score.toFixed(0)} / {maxScore} Points</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                        <InfoCard title="Performance Level" value={performance.level} icon={Award} valueColor={performance.color} />
                        <InfoCard title="Class Average" value={`${averageScore.toFixed(1)}%`} icon={BarChart} />
                        <InfoCard title="Time Taken" value={formatTime(timeTaken)} icon={Clock} />
                        <InfoCard title="Date Submitted" value={submittedAt ? (submittedAt as any).toDate().toLocaleDateString() : 'N/A'} icon={CheckCircle} />
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground">
                <p>This is an auto-generated report from the Quizzy Platform.</p>
            </div>
        </motion.div>
    </div>
  );
}

const InfoCard = ({ title, value, icon: Icon, valueColor }: { title: string, value: string, icon: React.ElementType, valueColor?: string }) => (
    <div className="p-4 bg-background rounded-lg flex items-center gap-4">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
        <div>
            <p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
            <p className={cn("text-lg sm:text-xl font-bold", valueColor)}>{value}</p>
        </div>
    </div>
);

    