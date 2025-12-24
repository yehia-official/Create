
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { collection, doc, query, where, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth, useFirestore, useDoc, useCollection, useMemoFirebase } from "@/firebase";
import type { Answer, Exam as ExamDetails, Question, TestResult, WithId, ExamResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { formatTime, cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Save,
  CheckCircle,
  Loader2,
  Eye,
  AlertTriangle,
  Play,
  Code2,
  Ban,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/components/providers";
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { evaluateCode } from "@/ai/flows/evaluate-code-flow";
import { XCircle } from "lucide-react";


const QuestionContent = ({
  question,
  userAnswer,
  onAnswerChange,
  isRtl,
  isTeacherPreview
}: {
  question: WithId<Question>;
  userAnswer: Answer | undefined;
  onAnswerChange: (questionId: string, value: any) => void;
  isRtl: boolean;
  isTeacherPreview: boolean;
}) => {
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);

  useEffect(() => {
    // Reset test results when question changes
    setTestResults(null);
  }, [question.id]);
  
  const handleRadioChange = (value: string) => {
    if (isTeacherPreview) return;
    onAnswerChange(question.id, value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isTeacherPreview) return;
    onAnswerChange(question.id, e.target.value);
  };

  const handleTrueFalseChange = (value: string) => {
    if (isTeacherPreview) return;
    onAnswerChange(question.id, value === "true");
  };

  const handleRunCode = async () => {
    if (isTeacherPreview || !question.testCases) return;
    setIsRunningCode(true);
    setTestResults(null);

    const codeToRun = (userAnswer?.value as any)?.code || userAnswer?.value || '';
    const language = question.language || 'javascript';
    let results: TestResult[] = [];

    try {
        if (language === 'javascript') {
            const testCases = JSON.parse(question.testCases);
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            const handleMessage = (e: MessageEvent) => {
                 if (e.source === iframe.contentWindow) {
                    const { testIndex, result, error } = e.data;
                    const test = testCases[testIndex];
                    if (error) {
                         results[testIndex] = { passed: false, input: test.input, output: error, expected: test.output };
                    } else {
                         results[testIndex] = { passed: JSON.stringify(result) === JSON.stringify(test.output), input: test.input, output: result, expected: test.output };
                    }
                    
                    // Check if all tests are done
                    if (Object.keys(results).length === testCases.length) {
                        window.removeEventListener('message', handleMessage);
                        document.body.removeChild(iframe);
                        setTestResults(Object.values(results));
                        const passedCount = Object.values(results).filter(r => r.passed).length;
                        const scorePercentage = results.length > 0 ? (passedCount / results.length) * 100 : 0;
                        onAnswerChange(question.id, { code: codeToRun, score: scorePercentage });
                        setIsRunningCode(false);
                    }
                 }
            };
            window.addEventListener('message', handleMessage);

            const scriptContent = `
                window.addEventListener('message', async (e) => {
                    const { code, testCases } = e.data;
                    for (let i = 0; i < testCases.length; i++) {
                        const test = testCases[i];
                        try {
                            const fn = new Function('return ' + code)();
                            const result = await fn(...test.input);
                            e.source.postMessage({ testIndex: i, result: result }, '*');
                        } catch (err) {
                            e.source.postMessage({ testIndex: i, error: err.message }, '*');
                        }
                    }
                });
            `;
            const script = iframe.contentDocument?.createElement('script');
            if (script) {
                script.innerHTML = scriptContent;
                iframe.contentDocument?.body.appendChild(script);
                iframe.contentWindow?.postMessage({ code: codeToRun, testCases }, '*');
            } else {
                throw new Error("Could not create script in iframe");
            }

        } else {
            results = await evaluateCode({
                code: codeToRun,
                language: language,
                testCases: question.testCases,
            });
            setTestResults(results);
            const passedCount = results.filter(r => r.passed).length;
            const scorePercentage = results.length > 0 ? (passedCount / results.length) * 100 : 0;
            onAnswerChange(question.id, { code: codeToRun, score: scorePercentage });
            setIsRunningCode(false);
        }
    } catch (error: any) {
        console.error(`Error running ${language} code:`, error);
        const testCases = JSON.parse(question.testCases);
        results = testCases.map((test: any) => ({
             passed: false,
             input: test.input,
             output: error.message || 'An unexpected error occurred during execution.',
             expected: test.output,
        }));
        setTestResults(results);
        setIsRunningCode(false);
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className="font-headline text-xl md:text-2xl">
                {isRtl ? `سؤال` : `Question`} {question.id.substring(0,4)}...
            </CardTitle>
            {question.type === 'code' && question.language && (
                <Badge variant="secondary" className="flex items-center gap-2">
                    <Code2 className="h-4 w-4"/>
                    <span className="capitalize">{question.language}</span>
                </Badge>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg">{isRtl && question.textAr ? question.textAr : question.text}</p>
        
        {question.mediaUrl && (
            <div className="relative w-full h-48 md:h-64 my-4 rounded-lg overflow-hidden">
                {question.mediaType === 'image' ? (
                     <Image
                        src={question.mediaUrl}
                        alt={`Image for question ${question.id}`}
                        fill
                        style={{ objectFit: 'contain' }}
                     />
                ) : question.mediaType === 'video' ? (
                    <video
                        src={question.mediaUrl}
                        controls
                        className="w-full h-full object-contain"
                    />
                ) : null}
            </div>
        )}

        {question.type === "multiple-choice" && question.options && (
          <RadioGroup
            value={userAnswer?.value as string}
            onValueChange={handleRadioChange}
            className="space-y-4"
            disabled={isTeacherPreview}
          >
            {(isRtl && question.optionsAr ? question.optionsAr : question.options).map((option) => (
              <div key={option} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`} className="flex-1">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        {question.type === "true-false" && (
          <RadioGroup
            value={String(userAnswer?.value)}
            onValueChange={handleTrueFalseChange}
            className="space-y-4"
            disabled={isTeacherPreview}
          >
            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
              <RadioGroupItem value="true" id={`${question.id}-true`} />
              <Label htmlFor={`${question.id}-true`}>{isRtl ? 'صحيح' : 'True'}</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
              <RadioGroupItem value="false" id={`${question.id}-false`} />
              <Label htmlFor={`${question.id}-false`}>{isRtl ? 'خطأ' : 'False'}</Label>
            </div>
          </RadioGroup>
        )}
        {question.type === "short-text" && (
          <Input
            type="text"
            value={(userAnswer?.value as string) || ""}
            onChange={handleTextChange}
            placeholder={isRtl ? "اكتب إجابتك هنا..." : "Type your answer here..."}
            disabled={isTeacherPreview}
          />
        )}
        {question.type === "code" && (
          <div className="space-y-4">
            <Textarea
                value={(userAnswer?.value as any)?.code || userAnswer?.value || question.codeSnippet || ""}
                onChange={handleTextChange}
                placeholder={isRtl ? "اكتب الكود الخاص بك هنا..." : "Type your code here..."}
                disabled={isTeacherPreview}
                className="font-code h-64 bg-muted/50"
            />
            {!isTeacherPreview && (
                <div className="flex items-start gap-4">
                    <Button onClick={handleRunCode} disabled={isRunningCode}>
                        {isRunningCode ? <Loader2 className="animate-spin" /> : <Play />}
                        <span>Run Code</span>
                    </Button>
                </div>
            )}
            {testResults && (
                <div className="space-y-2 pt-4">
                    <h4 className="font-semibold">Test Results: {testResults.filter(r=>r.passed).length}/{testResults.length} passed</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2 rounded-md bg-background p-2 border">
                        {testResults.map((result, i) => (
                             <div key={i} className={`p-2 rounded-md ${result.passed ? 'bg-green-500/10' : 'bg-destructive/10'}`}>
                                <p className="font-semibold text-sm flex items-center gap-2">
                                    {result.passed ? <CheckCircle className="text-green-500"/> : <XCircle className="text-destructive"/>}
                                    Test Case #{i+1}
                                </p>
                                <p className="text-xs text-muted-foreground pl-7">Input: {JSON.stringify(result.input)}</p>
                                {!result.passed && (
                                  <>
                                    <p className="text-xs text-muted-foreground pl-7">Expected: <span className="font-code text-foreground">{JSON.stringify(result.expected)}</span></p>
                                    <p className="text-xs text-muted-foreground pl-7">Got: <span className="font-code text-destructive">{JSON.stringify(result.output)}</span></p>
                                  </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        )}
        {(question.type === "mathematical" || question.type === "diagram") && (
             <Textarea
                value={(userAnswer?.value as string) || ""}
                onChange={handleTextChange}
                placeholder={isRtl ? "اكتب إجابتك هنا..." : "Type your answer here..."}
                disabled={isTeacherPreview}
                className="h-48"
            />
        )}
      </CardContent>
    </Card>
  );
};


export default function ExamPage() {
  const { direction } = useApp();
  const isRtl = false;
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const isTeacherPreview = role === 'teacher';
  const { toast } = useToast();
  const { user, isUserLoading } = useAuth();
  const firestore = useFirestore();
  const examId = params.id as string;

  const examDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'exams', examId) : null, [firestore, examId]);
  const { data: exam, isLoading: isLoadingExam } = useDoc<ExamDetails>(examDocRef);

  const questionsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'exams', examId, 'questions') : null, [firestore, examId]);
  const { data: questions, isLoading: isLoadingQuestions } = useCollection<Question>(questionsQuery);
  
  const previousAttemptsQuery = useMemoFirebase(() => 
    (firestore && user && examId) 
    ? query(collection(firestore, 'studentExams'), where('studentId', '==', user.uid), where('examId', '==', examId))
    : null,
  [firestore, user, examId]);
  const { data: previousAttempts, isLoading: isLoadingAttempts } = useCollection<ExamResult>(previousAttemptsQuery);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (questions) {
      const answeredQuestions = answers.filter(a => a.value !== '' && a.value !== null && a.value !== undefined);
      setAllQuestionsAnswered(answeredQuestions.length === questions.length);
    }
  }, [answers, questions]);

  useEffect(() => {
    if (isLoadingExam || isLoadingAttempts || isTeacherPreview || !exam || previousAttempts === undefined) return;
    
    const attemptsMade = previousAttempts?.length || 0;
    const attemptsAllowed = exam.attemptsAllowed || 1;

    if (attemptsMade >= attemptsAllowed) {
        setHasPermission(false);
        toast({
            variant: "destructive",
            title: "No Attempts Left",
            description: "You have used all your attempts for this exam.",
        });
        const lastAttemptId = previousAttempts?.[previousAttempts.length - 1]?.id;
        if(lastAttemptId) {
            router.replace(`/student/results/${lastAttemptId}`);
        } else {
            router.replace('/student/exams');
        }
    } else {
        setHasPermission(true);
        setAttemptNumber(attemptsMade + 1);
    }
  }, [exam, previousAttempts, isLoadingExam, isLoadingAttempts, isTeacherPreview, router, toast]);


  // Anti-cheating measures
  useEffect(() => {
    if (isTeacherPreview) return;

    const preventAction = (e: Event) => {
        e.preventDefault();
        toast({
            variant: "destructive",
            title: "Action Disabled",
            description: "Copying, pasting, and cutting are disabled during the exam.",
        });
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            toast({
                variant: "destructive",
                title: "Warning: Tab Switch Detected",
                description: "Switching tabs during the exam is prohibited.",
                duration: 5000,
            });
        }
    };
    
    const handleScreenshotAttempt = (e: KeyboardEvent) => {
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            toast({
                variant: "destructive",
                title: "Warning: Screenshot Attempt Detected",
                description: "Taking screenshots is not allowed.",
            });
        }
    };

    document.addEventListener('copy', preventAction);
    document.addEventListener('paste', preventAction);
    document.addEventListener('cut', preventAction);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keyup', handleScreenshotAttempt);


    return () => {
        document.removeEventListener('copy', preventAction);
        document.removeEventListener('paste', preventAction);
        document.removeEventListener('cut', preventAction);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('keyup', handleScreenshotAttempt);
    };
  }, [isTeacherPreview, toast]);

  
  const handleSubmit = useCallback(async () => {
    if (isTeacherPreview || !exam || !questions || !user || !firestore || isSubmitting) return;

    if (!allQuestionsAnswered) {
        toast({
            variant: "destructive",
            title: "Incomplete Exam",
            description: "Please answer all questions before submitting.",
        });
        return;
    }
    
    setIsSubmitting(true);
    let score = 0;
    let maxScore = 0;
    questions.forEach(q => {
        maxScore += q.points;
        const userAnswer = answers.find(a => a.questionId === q.id);

        if (q.type === 'code' && userAnswer && typeof userAnswer.value === 'object' && userAnswer.value && 'score' in userAnswer.value) {
            // Grade code questions based on test case pass percentage
            score += q.points * ((userAnswer.value as any).score / 100);
        } else if (q.type !== 'diagram' && q.type !== 'mathematical' && q.type !== 'code') {
            // Auto-grade other question types except manual ones
            if (userAnswer && String(userAnswer.value).toLowerCase() === String(q.answer).toLowerCase()) {
                score += q.points;
            }
        }
    });

    const resultId = doc(collection(firestore, 'studentExams')).id;
    const resultDocRef = doc(firestore, 'studentExams', resultId);

    const resultData = {
        id: resultId,
        studentId: user.uid,
        examId: exam.id,
        answers,
        score,
        maxScore,
        percentage: maxScore > 0 ? (score / maxScore) * 100 : 0,
        passed: maxScore > 0 ? (score / maxScore) * 100 >= 50 : false,
        timeTaken: (exam.duration * 60) - timeLeft,
        attemptNumber: attemptNumber,
        submittedAt: serverTimestamp(),
    };
    
    try {
        await setDoc(resultDocRef, resultData, { merge: true });
        localStorage.removeItem(`exam-${exam.id}`);
        
        router.push(`/student/results/${resultId}`);

    } catch (error) {
        console.error("Failed to save exam result to Firestore:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Could not save your results. Please check your connection and try again.",
        });
        setIsSubmitting(false);
    }
  }, [exam, questions, user, firestore, isSubmitting, answers, attemptNumber, timeLeft, router, isTeacherPreview, toast, allQuestionsAnswered]);
  
  useEffect(() => {
    if (isTeacherPreview || !exam) return;

    setTimeLeft(exam.duration * 60);
    try {
        const savedState = localStorage.getItem(`exam-${exam.id}`);
        if (savedState) {
            const { answers: savedAnswers, markedForReview: savedMarked, timeLeft: savedTime, attempt } = JSON.parse(savedState);
            setAnswers(savedAnswers);
            setMarkedForReview(savedMarked);
            setTimeLeft(savedTime);
            // We now set attemptNumber based on Firestore data, so we might ignore 'attempt' from localStorage.
        }
    } catch (error) {
        console.error("Could not load exam state from localStorage:", error);
    }
  }, [exam, isTeacherPreview]);

  const saveState = useCallback(() => {
    if (isTeacherPreview || !exam) return;
    setIsSaving(true);
    setIsSaved(false);
    try {
        const stateToSave = { answers, markedForReview, timeLeft, attempt: attemptNumber };
        localStorage.setItem(`exam-${exam.id}`, JSON.stringify(stateToSave));
        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }, 500);
    } catch (error) {
        console.error("Could not save exam state to localStorage:", error);
        setIsSaving(false);
        setIsSaved(false);
    }
  }, [answers, markedForReview, timeLeft, exam, attemptNumber, isTeacherPreview]);

  // Timer tick effect
  useEffect(() => {
    if (isTeacherPreview || !exam || timeLeft <= 0 || !hasPermission) {
        if (timerRef.current) clearInterval(timerRef.current);
        return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleSubmit();
            return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exam, isTeacherPreview, handleSubmit, timeLeft, hasPermission]);
  
  // Toast warning effect
  useEffect(() => {
    if (!isTeacherPreview && timeLeft > 0 && timeLeft <= 300 && timeLeft % 60 === 0) {
       toast({
           variant: "destructive",
           title: isRtl ? "الوقت ينفد" : "Time is running out!",
           description: `${isRtl ? 'يتبقى' : ''} ${formatTime(timeLeft)} ${isRtl ? 'فقط!' : ' remaining!'}`,
       });
    }
  }, [timeLeft, isTeacherPreview, isRtl, toast]);


   useEffect(() => {
    if (isTeacherPreview) return;
    const autoSaveTimer = setInterval(saveState, 30000);
    return () => clearInterval(autoSaveTimer);
  }, [saveState, isTeacherPreview]);


  const handleAnswerChange = (questionId: string, value: any) => {
    if (isTeacherPreview) return;
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((a) => a.questionId === questionId);
      if (existingAnswerIndex > -1) {
        const newAnswers = [...prevAnswers];
        newAnswers[existingAnswerIndex] = { questionId, value };
        return newAnswers;
      }
      return [...prevAnswers, { questionId, value }];
    });
  };

  const handleMarkForReview = () => {
    if (isTeacherPreview || !questions) return;
    const questionId = questions[currentQuestionIndex].id;
    setMarkedForReview((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };
  
  const goToQuestion = (index: number) => {
      if(questions && index >= 0 && index < questions.length) {
          setCurrentQuestionIndex(index);
      }
  }

  const handleNext = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLoading = isLoadingExam || isLoadingQuestions || isUserLoading || isLoadingAttempts;

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!hasPermission) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                        <Ban className="h-6 w-6"/>
                        Access Denied
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You have already used all available attempts for this exam.</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  if (!exam || !questions || questions.length === 0) {
    return <div>{isRtl ? 'لم يتم العثور على الامتحان أو الأسئلة.' : 'Exam or questions not found.'}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = answers.find((a) => a.questionId === currentQuestion.id);
  
  return (
    <div className="container mx-auto py-4 md:py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="no-select"
      >
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-headline">
                    {isRtl ? exam.titleAr : exam.title}
                </h1>
                <p className="text-muted-foreground">
                  {isTeacherPreview 
                    ? (isRtl ? 'وضع معاينة المدرس' : 'Teacher Preview Mode') 
                    : `${isRtl ? exam.subjectAr : exam.subject} - Attempt #${attemptNumber}`}
                </p>
            </div>
            {!isTeacherPreview && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {isSaving && <><Save className="h-4 w-4 animate-spin" /><span>Saving...</span></>}
                  {isSaved && <><CheckCircle className="h-4 w-4 text-green-500" /><span>Saved!</span></>}
              </div>
            )}
        </header>

        {isTeacherPreview && (
          <Alert className="mb-6 border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20">
            <Eye className="h-4 w-4 !text-blue-700" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">You are in Preview Mode</AlertTitle>
            <AlertDescription>
              You can navigate through questions to see how the exam looks for a student. Timer, answer selection, and submission are disabled.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            <QuestionContent
              question={currentQuestion}
              userAnswer={userAnswer}
              onAnswerChange={handleAnswerChange}
              isRtl={isRtl}
              isTeacherPreview={isTeacherPreview}
            />

            <CardFooter className="flex justify-between items-center">
              <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
                <span>{isRtl ? "السابق" : "Previous"}</span>
              </Button>
              <Button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                <span>{isRtl ? "التالي" : "Next"}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </main>

          <aside className="space-y-6">
            {!isTeacherPreview && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base md:text-lg">{isRtl ? 'الوقت المتبقي' : 'Time Remaining'}</CardTitle>
                  <span className={`text-xl md:text-2xl font-bold font-mono ${timeLeft < 60 ? 'text-destructive' : ''}`}>{formatTime(timeLeft)}</span>
                </CardHeader>
                <CardContent>
                  <Progress value={(timeLeft / (exam.duration * 60)) * 100} className="h-2" />
                </CardContent>
              </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="text-base md:text-lg">{isRtl ? 'مراجعة الأسئلة' : 'Question Navigation'}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-5 gap-2">
                    {questions.map((q, index) => (
                        <Button
                            key={q.id}
                            variant={
                                !isTeacherPreview && markedForReview.includes(q.id) ? 'destructive' :
                                !isTeacherPreview && answers.some(a => a.questionId === q.id && (a.value || a.value === false)) ? 'secondary' :
                                'outline'
                            }
                            size="icon"
                            className={cn('h-9 w-9 text-xs md:h-10 md:w-10 md:text-sm', currentQuestionIndex === index ? 'ring-2 ring-primary' : '')}
                            onClick={() => goToQuestion(index)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </CardContent>
            </Card>

             {!isTeacherPreview && (
               <CardFooter className="flex flex-col gap-4">
                   <Button onClick={handleMarkForReview} variant="outline" className="w-full">
                      <Flag className="h-4 w-4" />
                      <span>{markedForReview.includes(currentQuestion.id) ? (isRtl ? "إلغاء التحديد للمراجعة" : "Unmark for Review") : (isRtl ? "تحديد للمراجعة" : "Mark for Review")}</span>
                  </Button>
                  <Button onClick={() => {
                      saveState();
                      toast({ title: isRtl ? "تم الحفظ" : "Progress Saved", description: isRtl ? "تم حفظ إجاباتك بنجاح." : "Your answers have been saved.", duration: 2000 });
                  }} className="w-full" disabled={isSaving}>
                      <Save className="h-4 w-4" />
                      <span>{isRtl ? "حفظ التقدم" : "Save Progress"}</span>
                  </Button>
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full" disabled={isSubmitting || !allQuestionsAnswered}>
                          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (isRtl ? "إنهاء وتسليم الامتحان" : "Finish & Submit Exam")}
                      </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                      <AlertDialogHeader>
                          <AlertDialogTitle>{isRtl ? "هل أنت متأكد؟" : "Are you sure?"}</AlertDialogTitle>
                          <AlertDialogDescription>
                          {allQuestionsAnswered ? (isRtl ? "سيتم إرسال إجاباتك ولن تتمكن من تغييرها. هل ترغب في المتابعة؟" : "This will submit your answers and you won't be able to change them. Do you want to proceed?") : (isRtl ? "يجب عليك الإجابة على جميع الأسئلة قبل تسليم الامتحان." : "You must answer all questions before submitting.")}
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel>{isRtl ? "إلغاء" : "Cancel"}</AlertDialogCancel>
                          {allQuestionsAnswered && <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>{isRtl ? "نعم، أرسل" : "Yes, Submit"}</AlertDialogAction>}
                      </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
               </CardFooter>
             )}
          </aside>
        </div>
      </motion.div>
       <style jsx global>{`
            .no-select {
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }
        `}</style>
    </div>
  );
}
