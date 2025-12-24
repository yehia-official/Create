
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { collection, doc, query, where, getDocs } from "firebase/firestore";
import { useApp } from "@/components/providers";
import { useDoc, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import type { Exam, Question, User, WithId, ExamResult } from "@/lib/types";
import { Loader2, Printer, ExternalLink, Mail } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";


type StudentResult = {
    id: string;
    name: string;
    status: 'Completed' | 'In Progress' | 'Not Started';
    score: number;
    progress: number;
    guardianEmail?: string;
    resultId: string;
}

type QuestionAnalysis = {
    questionId: string;
    questionText: string;
    correctAnswers: number;
    incorrectAnswers: number;
    correctRate: number;
}


const chartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function ExamResultsPage() {
  const { direction } = useApp();
  const isRtl = direction === 'rtl';
  const params = useParams();
  const examId = params.id as string;
  const firestore = useFirestore();
  const { toast } = useToast();

  const [studentResultsTableData, setStudentResultsTableData] = React.useState<StudentResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSendingEmails, setIsSendingEmails] = React.useState(false);
  
  const examDocRef = useMemoFirebase(() => (firestore && examId) ? doc(firestore, 'exams', examId) : null, [firestore, examId]);
  const { data: exam, isLoading: isLoadingExam } = useDoc<Exam>(examDocRef);
  
  const questionsQuery = useMemoFirebase(() => (firestore && examId) ? collection(firestore, 'exams', examId, 'questions') : null, [firestore, examId]);
  const { data: questions, isLoading: isLoadingQuestions } = useCollection<Question>(questionsQuery);
  
  const examResultsQuery = useMemoFirebase(() => (firestore && examId) ? query(collection(firestore, "studentExams"), where("examId", "==", examId)) : null, [firestore, examId]);
  const { data: examResults, isLoading: isLoadingExamResults } = useCollection<ExamResult>(examResultsQuery);

  React.useEffect(() => {
    const fetchStudentData = async () => {
        if (!firestore || isLoadingExamResults || !examResults) {
            if(!isLoadingExamResults){
                setIsLoading(false);
            }
            return;
        }

        setIsLoading(true);

        if (examResults.length === 0) {
            setStudentResultsTableData([]);
            setIsLoading(false);
            return;
        }

        const studentIds = [...new Set(examResults.map(r => r.studentId))];
        const studentDocsQuery = query(collection(firestore, 'users'), where('id', 'in', studentIds));
        
        try {
            const studentDocsSnapshot = await getDocs(studentDocsQuery);
            const studentsData = studentDocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
            
            const tableData = examResults.map(result => {
                const student = studentsData.find(s => s.id === result.studentId);
                return {
                    id: result.studentId,
                    name: student?.name || 'Unknown Student',
                    guardianEmail: student?.guardianEmail,
                    status: 'Completed',
                    score: result.percentage,
                    progress: 100,
                    resultId: result.id,
                };
            });
            
            setStudentResultsTableData(tableData);
        } catch (error) {
            console.error("Error fetching student data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchStudentData();

  }, [examResults, isLoadingExamResults, firestore]);
  

  const columns: ColumnDef<StudentResult>[] = [
    {
        accessorKey: "name",
        header: "Student Name",
        cell: ({ row }) => <div className="capitalize font-medium">{row.original.name}</div>,
    },
    {
        accessorKey: "guardianEmail",
        header: "Guardian Email",
        cell: ({ row }) => <div className="lowercase text-muted-foreground">{row.original.guardianEmail || '-'}</div>,
    },
    {
        accessorKey: "score",
        header: "Score",
        cell: ({ row }) => {
            const { score, status } = row.original;
            if (status !== 'Completed') {
                return <Badge variant="outline">{status}</Badge>;
            }
            return <div className={`font-bold ${score >= 50 ? 'text-green-600' : 'text-destructive'}`}>{score.toFixed(2)}%</div>
        },
    },
    {
        id: "actions",
        header: "Report",
        cell: ({ row }) => {
            const student = row.original;
            const isCompleted = student.status === 'Completed';

            return (
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    disabled={!isCompleted}
                >
                    {isCompleted ? (
                        <Link href={`/report/${student.resultId}`} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Report
                        </Link>
                    ) : (
                        <span>-</span>
                    )}
                </Button>
            );
        },
    }
  ];
  
  const questionAnalysis = React.useMemo((): QuestionAnalysis[] => {
    if (!questions || !examResults || examResults.length === 0) return [];

    return questions.map(q => {
        let correctAnswers = 0;
        examResults.forEach(result => {
            const studentAnswer = result.answers.find(a => a.questionId === q.id);
            if (studentAnswer) {
                if (q.type === 'code') {
                   if(studentAnswer.value && typeof studentAnswer.value === 'object' && 'score' in studentAnswer.value && (studentAnswer.value as any).score >= 50) {
                       correctAnswers++;
                   }
                } else if (String(studentAnswer.value).toLowerCase() === String(q.answer).toLowerCase()) {
                    correctAnswers++;
                }
            }
        });
        const incorrectAnswers = examResults.length - correctAnswers;
        const correctRate = (correctAnswers / examResults.length) * 100;
        return {
            questionId: q.id,
            questionText: q.text,
            correctAnswers,
            incorrectAnswers,
            correctRate,
        }
    }).sort((a,b) => a.correctRate - b.correctRate);
  }, [questions, examResults]);
  
  
  const table = useReactTable({
    data: studentResultsTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePrint = () => {
    window.print();
  };
  
  const handleSendAllReports = async () => {
    if (!exam) return;
    setIsSendingEmails(true);

    const recipients = studentResultsTableData.filter(student => student.guardianEmail);
    if (recipients.length === 0) {
        toast({
            title: "No Guardians to Notify",
            description: "None of the students who took this exam have a guardian email registered.",
        });
        setIsSendingEmails(false);
        return;
    }

    const reportPromises = recipients.map(student => 
        fetch('/api/send-parent-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentName: student.name,
                guardianEmail: student.guardianEmail,
                examTitle: exam.title,
                score: student.score,
                reportUrl: `${window.location.origin}/report/${student.resultId}`
            }),
        })
    );

    const results = await Promise.allSettled(reportPromises);
    
    let successfulSends = 0;
    results.forEach((res, index) => {
        if (res.status === 'fulfilled' && res.value.ok) {
            successfulSends++;
        } else {
            console.error(`Failed to send email to ${recipients[index].guardianEmail}:`, res.status === 'rejected' ? res.reason : 'Server error');
        }
    });

    setIsSendingEmails(false);
    
    if (successfulSends > 0) {
        toast({
            title: "Reports Sent!",
            description: `${successfulSends} performance reports have been successfully emailed to guardians.`,
        });
    }

    if (successfulSends < recipients.length) {
         toast({
            variant: "destructive",
            title: "Some Emails Failed",
            description: `${recipients.length - successfulSends} emails could not be sent. Please check the console for errors.`,
        });
    }
  };


  const isDataLoading = isLoading || isLoadingExam || isLoadingQuestions;

  if (isDataLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!exam) {
      return <div>Exam not found.</div>
  }

  const completedCount = studentResultsTableData.length;
  const totalStudents = studentResultsTableData.length; 
  const averageScore = studentResultsTableData.reduce((acc, curr) => acc + curr.score, 0) / (completedCount || 1);
  
  const scoreDistribution = [
      { range: '0-49%', count: studentResultsTableData.filter(d => d.score < 50).length },
      { range: '50-69%', count: studentResultsTableData.filter(d => d.score >= 50 && d.score < 70).length },
      { range: '70-89%', count: studentResultsTableData.filter(d => d.score >= 70 && d.score < 90).length },
      { range: '90-100%', count: studentResultsTableData.filter(d => d.score >= 90).length },
  ];

  return (
    <>
    <div className="w-full space-y-6" id="page-content">
        <header className="space-y-1.5">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {isRtl ? `نتائج امتحان: ${exam.titleAr}` : `Results for: ${exam.title}`}
            </h1>
            <p className="text-muted-foreground">
                {isRtl ? "عرض أداء الطلاب في هذا الامتحان." : "View student performance for this exam."}
            </p>
      </header>

       <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Students Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
               <p className="text-xs text-muted-foreground">
                Total submissions for this exam.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Pass Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents > 0 ? Math.round(studentResultsTableData.filter(s => s.score >= 50).length / totalStudents * 100) : 0}%</div>
               <p className="text-xs text-muted-foreground">
                Percentage of students who passed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore.toFixed(2)}%</div>
               <p className="text-xs text-muted-foreground">
                For completed exams
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                    <CardDescription>Number of students in each score range.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                         <BarChart data={scoreDistribution} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="range" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="var(--color-students)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Question Analysis</CardTitle>
                    <CardDescription>Most difficult questions based on correct answers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {questionAnalysis.slice(0, 5).map(q => (
                        <div key={q.questionId}>
                            <p className="text-sm font-medium truncate">{q.questionText}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Correct Rate:</span>
                                <span className={`font-bold ${q.correctRate < 50 ? 'text-destructive' : 'text-green-600'}`}>{q.correctRate.toFixed(0)}%</span>
                            </div>
                            <Progress value={q.correctRate} className="h-2 mt-1" />
                        </div>
                    ))}
                    {questionAnalysis.length === 0 && (
                        <p className="text-sm text-muted-foreground">No question data to analyze yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>

      <div id="print-section">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>A list of all students who completed this exam.</CardDescription>
              </div>
              <div className="flex gap-2 self-start sm:self-center">
                <Button onClick={handleSendAllReports} variant="default" size="sm" className="print-hidden" disabled={isSendingEmails}>
                    {isSendingEmails ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                    Send Reports
                </Button>
                <Button onClick={handlePrint} variant="outline" size="sm" className="print-hidden">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Results
                </Button>
              </div>
          </CardHeader>
          <CardContent>
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            );
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                                )}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No students have taken this exam yet.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
              </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
    <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-section, #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print-hidden {
              display: none;
          }
        }
      `}</style>
    </>
  );
}
