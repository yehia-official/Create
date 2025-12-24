
"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { collection, doc, query, where } from "firebase/firestore";
import { useAuth, useDoc, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import type { Exam, ExamResult, Question, User, WithId } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  HelpCircle,
  Home,
  Repeat,
  Award,
  Loader2,
  Share2,
  Copy,
} from "lucide-react";
import { cn, formatTime } from "@/lib/utils";
import { useApp } from "@/components/providers";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}><path d=" M19.11 17.205c-.372 0-1.088 1.39-1.088 3.47s3.546 3.702 3.546 3.702l.002-4.72c-2.46-.9-3.32-2.46-3.32-4.545C18.25 12.09 19.82 10 23 10h.005c3.18 0 4.75 2.09 4.75 4.636 0 2.47-1.48 4.04-3.5 4.545l.002 4.72s3.546-.227 3.546-3.702c0-2.08-1.088-3.47-1.088-3.47h-4.637z M12.87 17.205c-.372_0-1.088 1.39-1.088 3.47s3.546 3.702 3.546 3.702l.002-4.72c-2.46-.9-3.32-2.46-3.32-4.545C11.25 12.09 12.82 10 16 10h.005c3.18 0 4.75 2.09 4.75 4.636 0 2.47-1.48 4.04-3.5 4.545l.002 4.72s3.546-.227 3.546-3.702c0-2.08-1.088-3.47-1.088-3.47h-4.637z M23 14.735c-1.08 0-1.75.8-1.75 1.95 0 1.15.67 1.95 1.75 1.95s1.75-.8 1.75-1.95c0-1.15-.67-1.95-1.75-1.95z M16 14.735c-1.08 0-1.75.8-1.75 1.95 0 1.15.67 1.95 1.75 1.95s1.75-.8 1.75-1.95c0-1.15-.67-1.95-1.75-1.95z" fill="currentColor"></path><path d="M22.5 0c-4.33 0-8.33 1.68-11.38 4.73S6.39 12.83 6.39 17.16c0 4.2.98 8.28 2.89 11.88l-3.33 3.33-3.34-3.33c-.78-.78-.78-2.04 0-2.82l3.33-3.33-2.3-2.3c-.78-.78-.78-2.04 0-2.82l2.3-2.3-3.33-3.33c-.78-.78-.78-2.04 0-2.82l3.33-3.33L0 0h22.5z M4.73 11.38C1.68 8.33 0 4.33 0 0h22.5c4.33 0 8.33 1.68 11.38 4.73S40 12.83 40 17.16c0 4.2-.98 8.28-2.89 11.88l-3.33 3.33-3.34-3.33c-.78-.78-.78-2.04 0-2.82l3.33-3.33-2.3-2.3c-.78-.78-.78-2.04 0-2.82l2.3-2.3-3.33-3.33c-.78-.78-.78-2.04 0-2.82l3.33-3.33z" fill="currentColor"></path></svg>
);

const ShareResultDialog = ({ resultId, studentName, examTitle }: { resultId: string, studentName: string, examTitle: string }) => {
    const { toast } = useToast();
    const [reportUrl, setReportUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && resultId) {
            setReportUrl(`${window.location.origin}/report/${resultId}`);
        }
    }, [resultId]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(reportUrl);
        toast({
            title: "Copied to clipboard!",
            description: "The report link has been copied.",
        });
    };
    
    const whatsAppMessage = encodeURIComponent(`Hello, this is the performance report for ${studentName} in the exam "${examTitle}": ${reportUrl}`);

    if (!resultId) return null;

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Share Report with Guardian</DialogTitle>
                <DialogDescription>
                    Anyone with this public link can view the exam report.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4">
                 <div className="p-4 bg-white rounded-lg">
                    <QRCodeSVG value={reportUrl} size={128} />
                 </div>
                 <div className="flex items-center space-x-2 w-full">
                    <Input id="link" value={reportUrl} readOnly />
                    <Button type="button" size="icon" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                 <Button asChild className="w-full bg-[#25D366] hover:bg-[#1EBE57] text-white">
                    <a href={`https://wa.me/?text=${whatsAppMessage}`} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-5 w-5 mr-2" />
                        Share on WhatsApp
                    </a>
                </Button>
            </div>
        </DialogContent>
    );
};


const getResultIcon = (isCorrect: boolean | null, isManual: boolean) => {
  if (isManual) {
    return <HelpCircle className="h-5 w-5 text-blue-500" />;
  }
  if (isCorrect === true) {
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
  if (isCorrect === false) {
    return <XCircle className="h-5 w-5 text-destructive" />;
  }
  return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
};

function ResultPageContent({ params: routeParams, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { direction } = useApp();
  const isRtl = false;
  const { toast } = useToast();
  const role = searchParams['role'];
  const { user, isUserLoading } = useAuth();
  const firestore = useFirestore();
  const resultId = routeParams.id as string;

  const resultDocRef = useMemoFirebase(() => 
    (firestore && resultId) ? doc(firestore, 'studentExams', resultId) : null, 
  [firestore, resultId]);
  const { data: result, isLoading: isLoadingResult } = useDoc<ExamResult>(resultDocRef);

  const studentDocRef = useMemoFirebase(() =>
    (firestore && result?.studentId) ? doc(firestore, 'users', result.studentId) : null,
  [firestore, result?.studentId]);
  const { data: studentData, isLoading: isLoadingStudent } = useDoc<User>(studentDocRef);

  const examId = result?.examId;

  const examDocRef = useMemoFirebase(() => (firestore && examId) ? doc(firestore, 'exams', examId) : null, [firestore, examId]);
  const { data: examDetails, isLoading: isLoadingExam } = useDoc<Exam>(examDocRef);

  const questionsQuery = useMemoFirebase(() => (firestore && examId) ? collection(firestore, 'exams', examId, 'questions') : null, [firestore, examId]);
  const { data: questions, isLoading: isLoadingQuestions } = useCollection<Question>(questionsQuery);
  
  const allAttemptsQuery = useMemoFirebase(() => 
    (firestore && user && examId)
    ? query(collection(firestore, 'studentExams'), where('studentId', '==', user.uid), where('examId', '==', examId))
    : null,
  [firestore, user, examId]);
  const { data: allAttempts } = useCollection<ExamResult>(allAttemptsQuery);

  // Send report email effect
  useEffect(() => {
    if (result && studentData?.guardianEmail && examDetails) {
        const reportSentKey = `report-sent-${result.id}`;
        if (sessionStorage.getItem(reportSentKey)) {
            return; // Don't send again in the same session
        }

        const sendReport = async () => {
            try {
                const response = await fetch('/api/send-parent-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        studentName: studentData.name,
                        guardianEmail: studentData.guardianEmail,
                        examTitle: examDetails.title,
                        score: result.percentage,
                        reportUrl: `${window.location.origin}/report/${result.id}`
                    }),
                });

                if (!response.ok) {
                    throw new Error('Server responded with an error');
                }

                sessionStorage.setItem(reportSentKey, 'true');
                toast({
                    title: "Report Sent to Guardian",
                    description: `An exam report has been sent to ${studentData.guardianEmail}.`,
                });
            } catch (error) {
                console.error("Failed to send parent email:", error);
                toast({
                    variant: "destructive",
                    title: "Email Failed",
                    description: "Could not send the report to the guardian.",
                });
            }
        };

        sendReport();
    }
  }, [result, studentData, examDetails, toast, resultId]);


  const isLoading = isLoadingResult || isUserLoading || isLoadingExam || isLoadingQuestions || isLoadingStudent;

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!result || !examDetails || !questions) {
      return (
        <div className="flex h-screen items-center justify-center">
            <p>Result not found. It might still be processing or you do not have permission.</p>
        </div>
    );
  }

  const { score, maxScore, percentage, passed, answers, timeTaken, attemptNumber } = result;
  const attemptsAllowed = examDetails.attemptsAllowed || 1;
  const hasMoreAttempts = (allAttempts?.length || 0) < attemptsAllowed;

  const getQuestionById = (id: string): WithId<Question> | undefined => {
    return questions.find((q) => q.id === id);
  };
  
  const manuallyGradedQuestions = answers.filter(a => {
      const q = getQuestionById(a.questionId);
      return q && ['code', 'mathematical', 'diagram'].includes(q.type);
  });

  return (
    <Dialog>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8 p-4 sm:p-6"
      >
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold font-headline">
            {isRtl ? "نتيجة الامتحان" : "Exam Result"} (Attempt #{attemptNumber})
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRtl ? examDetails.titleAr : examDetails.title}
          </p>
        </header>

        <Card
          className={cn(
            "text-center",
            passed
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl">
              {passed ? (isRtl ? "تهانينا، لقد نجحت!" : "Congratulations, you passed!") : (isRtl ? "للأسف، لم تنجح." : "Unfortunately, you did not pass.")}
            </CardTitle>
            <CardDescription>
              {passed ? (isRtl ? "عمل رائع! استمر في المذاكرة." : "Great job! Keep up the hard work.") : (isRtl ? "لا تستسلم. راجع إجاباتك وحاول مرة أخرى." : "Don't give up. Review your answers and try again.")}
              {manuallyGradedQuestions.length > 0 && ` This is a preliminary score. Your final score will be updated after manual review.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground">{isRtl ? "النتيجة الأولية" : "Initial Score"}</p>
              <p className="text-2xl font-bold">
                {score.toFixed(0)} / {maxScore}
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground">{isRtl ? "النسبة المئوية" : "Percentage"}</p>
              <p className="text-2xl font-bold">{percentage.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground">{isRtl ? "الوقت المستغرق" : "Time Taken"}</p>
              <p className="text-2xl font-bold flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                {formatTime(timeTaken)}
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground">{isRtl ? "الإجابات الصحيحة" : "Correct"}</p>
              <p className="text-2xl font-bold text-green-500">{answers.filter(a => {
                  const q = getQuestionById(a.questionId);
                  return q && !['code', 'mathematical', 'diagram'].includes(q.type) && String(a.value).toLowerCase() === String(q.answer).toLowerCase()
              }).length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isRtl ? "مراجعة الإجابات" : "Answer Review"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((question, index) => {
                const userAnswer = answers.find(
                  (a) => a.questionId === question.id
                );
                const isManualGrading = ['code', 'mathematical', 'diagram'].includes(question.type);
                
                let isCorrect: boolean | null = null;
                if (userAnswer) {
                    if (question.type === 'code') {
                       isCorrect = (userAnswer.value as any)?.score > 50; // Consider >50% as "correct" for icon
                    } else if (!isManualGrading) {
                       isCorrect = String(userAnswer.value).toLowerCase() === String(question.answer).toLowerCase();
                    }
                }

                const displayUserAnswer = userAnswer?.value === true ? 'True' : userAnswer?.value === false ? 'False' : userAnswer?.value || (isRtl ? "لم تتم الإجابة" : "Not Answered");

                return (
                  <AccordionItem value={`item-${index}`} key={question.id}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-left">{isRtl ? `سؤال ${index + 1}` : `Question ${index + 1}`}</span>
                        {getResultIcon(isCorrect, isManualGrading && question.type !== 'code')}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="font-semibold">{isRtl && question.textAr ? question.textAr : question.text}</p>
                      {question.type === 'code' ? (
                          <div className="text-sm p-3 bg-muted/50 rounded-md">
                            <p className="font-semibold mb-2">Your Submitted Code:</p>
                             <pre className="p-2 bg-background rounded-sm text-xs whitespace-pre-wrap font-code">{JSON.stringify((userAnswer?.value as any)?.code || userAnswer?.value, null, 2)}</pre>
                             <p className="text-xs mt-2 text-muted-foreground">Score achieved from automated tests: <span className="font-bold text-foreground">{((userAnswer?.value as any)?.score || 0).toFixed(0)}%</span></p>
                          </div>
                      ) : isManualGrading ? (
                         <div className="text-blue-600 dark:text-blue-400 text-sm p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                           <p className="font-semibold">Your answer is pending manual review.</p>
                           <p className="text-xs mt-2">Your submitted answer:</p>
                           <pre className="mt-1 p-2 bg-background/50 rounded-sm text-xs whitespace-pre-wrap font-code">{JSON.stringify(userAnswer?.value, null, 2)}</pre>
                         </div>
                      ) : (
                        <>
                           <p>
                              <span className="font-medium">{isRtl ? "إجابتك: " : "Your Answer: "}</span>
                              <span className={cn(isCorrect === false && "text-destructive", isCorrect === true && "text-green-500")}>
                                {String(displayUserAnswer)}
                              </span>
                          </p>
                          {isCorrect === false && <p>
                              <span className="font-medium">{isRtl ? "الإجابة الصحيحة: " : "Correct Answer: "}</span>
                              <span className="text-green-500">{String(question.answer)}</span>
                          </p>}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                  <Link href={`/${role || 'student'}`}>
                      <Home className="h-4 w-4" />
                      <span>{isRtl ? "العودة للوحة التحكم" : "Back to Dashboard"}</span>
                  </Link>
              </Button>
              {hasMoreAttempts && (
                  <Button asChild>
                      <Link href={`/student/exam/${examDetails.id}?role=${role}`}>
                          <Repeat className="h-4 w-4"/>
                          <span>{isRtl ? "إعادة الامتحان" : "Retake Exam"}</span>
                      </Link>
                  </Button>
              )}
              {passed && (
                <Button asChild variant="secondary">
                      <Link href={`/certificate/${result.id}`}>
                          <Award className="h-4 w-4" />
                          <span>{isRtl ? "عرض الشهادة" : "View Certificate"}</span>
                      </Link>
                  </Button>
              )}
              {studentData?.guardianEmail && (
                 <DialogTrigger asChild>
                    <Button variant="default">
                      <Share2 className="h-4 w-4" />
                      <span>Share with Guardian</span>
                    </Button>
                  </DialogTrigger>
              )}
        </div>
      </motion.div>
      {studentData?.guardianEmail && <ShareResultDialog 
        resultId={resultId} 
        studentName={studentData?.name || "the student"}
        examTitle={examDetails.title}
      />}
    </Dialog>
  );
}


export default function ResultPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    
    const searchParamsObj: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        searchParamsObj[key] = value;
    });

    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <ResultPageContent params={params as { id: string }} searchParams={searchParamsObj} />
        </Suspense>
    );
}
