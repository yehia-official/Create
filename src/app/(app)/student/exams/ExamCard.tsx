
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Exam, ExamResult } from "@/lib/types";
import { BookText, CheckCircle, Clock, Loader2, PlayCircle, Repeat, XCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers";
import { useCollection, useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";

export function ExamCard({ exam, index }: { exam: Exam; index: number }) {
  const { direction } = useApp();
  const isRtl = false;
  const { user } = useUser();
  const firestore = useFirestore();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);
  
  const studentResultsQuery = useMemoFirebase(() => 
    (firestore && user) ? query(collection(firestore, "studentExams"), where("studentId", "==", user.uid), where("examId", "==", exam.id)) : null, 
    [firestore, user, exam.id]
  );
  const { data: myAttemptsForThisExam, isLoading: isLoadingResults } = useCollection<ExamResult>(studentResultsQuery);


  const getStatusProps = () => {
    const attemptsMade = myAttemptsForThisExam?.length || 0;
    const startTime = (exam.startTime as any)?.toDate();
    const endTime = (exam.endTime as any)?.toDate();
    const attemptsAllowed = exam.attemptsAllowed || 1;
    const hasMoreAttempts = attemptsMade < attemptsAllowed;

    if (startTime && now < startTime) {
      return { 
        icon: Clock, color: "text-gray-500", badgeVariant: "outline", label: isRtl ? "مجدول" : "Scheduled", action: "disabled"
      };
    }

    if (endTime && now > endTime) { // Exam has expired
        if (myAttemptsForThisExam && hasMoreAttempts) return { icon: Repeat, color: "text-blue-500", badgeVariant: "secondary", label: isRtl ? "إعادة المحاولة متاحة" : "Retake Available", action: "retake" };
        if (attemptsMade > 0) return { icon: CheckCircle, color: "text-green-500", badgeVariant: "secondary", label: isRtl ? "مكتمل" : "Completed", action: "results" };
        return { icon: XCircle, color: "text-destructive", badgeVariant: "destructive", label: isRtl ? "منتهي" : "Expired", action: "disabled" };
    }

    // Exam is currently active
    if (!hasMoreAttempts && attemptsMade > 0) {
         return { icon: CheckCircle, color: "text-green-500", badgeVariant: "secondary", label: isRtl ? "مكتمل" : "Completed", action: "results" };
    }
    
     if (typeof localStorage !== 'undefined' && localStorage.getItem(`exam-${exam.id}`)) {
        return { 
          icon: PlayCircle, color: "text-yellow-500", badgeVariant: "default", label: isRtl ? "قيد التنفيذ" : "In Progress", action: "continue"
        };
    }

    if (attemptsMade > 0) { // Has attempts left and exam is active
        return { icon: Repeat, color: "text-blue-500", badgeVariant: "default", label: isRtl ? "إعادة المحاولة" : "Retake", action: "retake" };
    }

    // First attempt
    return {
         icon: BookText, color: "text-blue-500", badgeVariant: "outline", label: isRtl ? "ابدأ الآن" : "Start Now", action: "start"
    };
  };

  if (isLoadingResults) {
    return (
        <Card className="h-full flex flex-col items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin"/>
        </Card>
    );
  }
  
  const attemptsMade = myAttemptsForThisExam?.length || 0;
  const statusProps = getStatusProps();
  const inProgress = statusProps.action === 'continue';
  const progressValue = inProgress ? Math.floor(Math.random() * 60) + 20 : 0;
  const attemptsAllowed = exam.attemptsAllowed || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <statusProps.icon className={`h-8 w-8 ${statusProps.color}`} />
            <Badge variant={statusProps.badgeVariant as any}>
              {statusProps.label}
            </Badge>
          </div>
          <CardTitle className="font-headline pt-2 text-lg">
            {isRtl ? exam.titleAr : exam.title}
          </CardTitle>
          <CardDescription>
            {isRtl ? (exam as any).subjectAr : exam.subject}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <BookText className="h-4 w-4" />
              <span>
                {(exam as any).questionsCount} {isRtl ? "أسئلة" : "Questions"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {exam.duration} {isRtl ? "دقيقة" : "Minutes"}
              </span>
            </div>
          </div>
          {inProgress && (
            <div>
              <Progress value={progressValue} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {progressValue}% {isRtl ? "مكتمل" : "complete"}
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {isRtl ? `المحاولات: ${attemptsMade}/${attemptsAllowed}` : `Attempts: ${attemptsMade}/${attemptsAllowed}`}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" disabled={statusProps.action === 'disabled'}>
            {statusProps.action === "results" ? (
              <Link href={`/student/results/${myAttemptsForThisExam?.sort((a, b) => (b.submittedAt as any) - (a.submittedAt as any))[0].id}?role=student`}>
                {isRtl ? "عرض النتائج" : "View Results"}
              </Link>
            ) : statusProps.action === "retake" || statusProps.action === "start" || statusProps.action === "continue" ? (
              <Link href={`/student/exam/${exam.id}?role=student`}>
                 {statusProps.action === 'retake' && <Repeat className="h-4 w-4" />}
                <span>{
                   statusProps.action === "retake" ? (isRtl ? "إعادة المحاولة" : "Retake Exam") :
                   statusProps.action === "continue" ? (isRtl ? "متابعة الامتحان" : "Continue Exam") :
                   (isRtl ? "بدء الامتحان" : "Start Exam")
                }</span>
              </Link>
            ) : (
              <span>{statusProps.label}</span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

    