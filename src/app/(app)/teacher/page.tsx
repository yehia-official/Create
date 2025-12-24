
"use client";

import React, { useState } from "react";
import { useApp } from "@/components/providers";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListChecks, History, BarChart, Eye, Share2, Copy, Trash2, Loader2 } from "lucide-react";
import { collection, query, where, deleteDoc, doc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useUser, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { Exam } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

function ShareExamDialog({ exam }: { exam: Exam }) {
    const { toast } = useToast();
    const [examUrl, setExamUrl] = useState('');

    React.useEffect(() => {
        if (typeof window !== 'undefined' && exam) {
            setExamUrl(`${window.location.origin}/student/exam/${exam.id}?role=student`);
        }
    }, [exam]);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(examUrl);
        toast({
            title: "Copied to clipboard!",
            description: "The exam link has been copied.",
        });
    };

    if (!exam) return null;

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Share Exam</DialogTitle>
                <DialogDescription>
                    Anyone with this link can take the exam.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4">
                 <div className="p-4 bg-white rounded-lg">
                    <QRCodeSVG value={examUrl} size={128} />
                 </div>
                 <p className="text-sm text-muted-foreground">Or copy the link below</p>
                 <div className="flex items-center space-x-2 w-full">
                    <Input
                        id="link"
                        value={examUrl}
                        readOnly
                    />
                    <Button type="button" size="icon" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </DialogContent>
    );
}


export default function TeacherDashboard() {
  const { direction } = useApp();
  const isRtl = false;
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const examsQuery = useMemoFirebase(
    () => (firestore && user)
        ? query(collection(firestore, "exams"), where("teacherId", "==", user.uid))
        : null,
    [firestore, user]
  );
  const { data: exams, isLoading: isLoadingExams } = useCollection<Exam>(examsQuery);
  
  const createdExams = exams?.length || 0;
  const pendingGradings = exams?.filter(e => e.status === "In Progress").length || 0;

  const handleDeleteExam = async (examId: string) => {
      if (!firestore) return;
      setIsDeleting(examId);

      try {
        // Delete all questions in the subcollection
        const questionsQuery = query(collection(firestore, 'exams', examId, 'questions'));
        const questionsSnapshot = await getDocs(questionsQuery);
        const questionDeletePromises = questionsSnapshot.docs.map(questionDoc => 
            deleteDoc(doc(firestore, 'exams', examId, 'questions', questionDoc.id))
        );
        
        // Delete all student results for this exam
        const resultsQuery = query(collection(firestore, 'studentExams'), where('examId', '==', examId));
        const resultsSnapshot = await getDocs(resultsQuery);
        const resultDeletePromises = resultsSnapshot.docs.map(resultDoc => 
            deleteDoc(doc(firestore, 'studentExams', resultDoc.id))
        );

        await Promise.all([...questionDeletePromises, ...resultDeletePromises]);

        // Delete the main exam document
        await deleteDoc(doc(firestore, 'exams', examId));

        toast({
            title: "Exam Deleted",
            description: "The exam and all related data have been successfully deleted.",
            variant: "destructive"
        });
      } catch (error) {
        console.error("Error deleting exam:", error);
        toast({
            title: "Error",
            description: "Failed to delete the exam. Please try again.",
            variant: "destructive"
        });
      } finally {
        setIsDeleting(null);
      }
  };
  
    const getStatus = (exam: Exam) => {
        const now = new Date();
        const startTime = (exam.startTime as any)?.toDate();
        const endTime = (exam.endTime as any)?.toDate();

        if (endTime && now > endTime) return { label: 'Completed', variant: 'secondary' };
        if (startTime && now > startTime && (!endTime || now < endTime)) return { label: 'In Progress', variant: 'default' };
        if (startTime && now < startTime) return { label: 'Scheduled', variant: 'outline' };
        return { label: exam.status || 'Not Started', variant: 'outline' };
    };

  return (
    <div className="space-y-6">
      <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedExam(null)}>
        <header className="space-y-1.5">
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            {isRtl ? "لوحة تحكم المدرس" : "Teacher Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {isRtl ? "إنشاء وإدارة الامتحانات، ومراقبة أداء الطلاب." : "Create and manage exams, and monitor student performance."}
          </p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{isRtl ? "إنشاء امتحان جديد" : "Create New Exam"}</CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button asChild className="mt-2">
                  <Link href="/teacher/create?role=teacher">Create Exam</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{isRtl ? "التصحيحات المعلقة" : "Pending Submissions"}</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingGradings}</div>
              <p className="text-xs text-muted-foreground">{isRtl ? "إجابات تحتاج إلى مراجعة" : "Submissions to review"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{isRtl ? "إجمالي الامتحانات" : "Total Exams"}</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{createdExams}</div>
              <p className="text-xs text-muted-foreground">{isRtl ? "تم إنشاؤه هذا الفصل الدراسي" : "Created this semester"}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
              <CardTitle>My Exams</CardTitle>
              <CardDescription>A list of all exams you have created.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingExams && <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin"/></div>}
            {exams && exams.map(exam => {
              const status = getStatus(exam);
              return (
              <Card key={exam.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-4">
                <div className="mb-4 md:mb-0 flex-1">
                  <h3 className="font-bold">{exam.title}</h3>
                  <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4">
                    <span>{exam.subject} - {exam.questionsCount || 0} Questions</span>
                    {exam.startTime && <span>| Starts: {format((exam.startTime as any).toDate(), "MMM d, h:mm a")}</span>}
                  </div>
                  <Badge variant={status.variant as any} className="mt-2">{status.label}</Badge>
                </div>
                <div className="flex gap-2 self-start md:self-center flex-shrink-0">
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedExam(exam)}>
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </DialogTrigger>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/teacher/results/${exam.id}?role=teacher`}>
                      <BarChart className="h-4 w-4" />
                      <span>Results</span>
                    </Link>
                  </Button>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/student/exam/${exam.id}?role=teacher`}>
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="destructive" size="icon" disabled={isDeleting === exam.id}>
                            {isDeleting === exam.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the exam
                                and all related data, including questions and student submissions.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteExam(exam.id)}>
                                Yes, delete exam
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            )})}
             {exams && exams.length === 0 && !isLoadingExams && (
                <p className="text-center text-muted-foreground py-8">You haven't created any exams yet.</p>
            )}
          </CardContent>
        </Card>
        {selectedExam && <ShareExamDialog exam={selectedExam} />}
      </Dialog>
    </div>
  );
}

    