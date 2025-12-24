
"use client";

import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sheets as initialSheets } from "@/lib/data-sheets";
import { Check, CheckCircle, Clock, ExternalLink, FileText, Loader2, Send, XCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers";
import { useUser, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, Timestamp, getDocs, doc } from "firebase/firestore";
import type { Sheet, Submission } from "@/lib/types-sheets";

type SubmissionStatus = "Completed" | "Pending Review" | "Not Submitted" | "Late" | "Graded";

interface SubmissionWithSheet extends Submission {
    sheetTitle: string;
    sheetSubject: string;
}


const SubmissionResultDialog = ({ submission, onClose }: { submission: SubmissionWithSheet | null; onClose: () => void; }) => {
    if (!submission) return null;

    return (
        <Dialog open={!!submission} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submission Result for: {submission.sheetTitle}</DialogTitle>
                    <DialogDescription>
                        Here are the details of your graded submission.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                   <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-semibold">Your Grade</h4>
                        <p className={`text-3xl font-bold ${submission.grade && submission.grade >= 50 ? 'text-green-500' : 'text-destructive'}`}>{submission.grade?.toFixed(1) || 0}%</p>
                   </div>
                    <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-semibold">Teacher's Feedback</h4>
                        <p className="text-sm text-muted-foreground mt-1">{submission.feedback || "No feedback provided."}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export default function StudentSheetsPage() {
  const { direction } = useApp();
  const isRtl = false;
  const { user } = useUser();
  const firestore = useFirestore();
  const [now, setNow] = useState(new Date());

  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithSheet | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const sheetsQuery = useMemoFirebase(() => firestore ? collection(firestore, "sheets") : null, [firestore]);
  const { data: allSheets, isLoading: isLoadingSheets } = useCollection<Sheet>(sheetsQuery);

  const mySubmissionsQuery = useMemoFirebase(() =>
      user ? query(collection(firestore, "submissions"), where("studentId", "==", user.uid)) : null,
      [user]
  );
  const { data: mySubmissions, isLoading: isLoadingSubmissions } = useCollection<Submission>(mySubmissionsQuery);


  const getStatus = (sheet: Sheet): { label: SubmissionStatus; color: string; icon: React.ElementType; action: 'submit' | 'view' | 'late' | 'pending' | 'graded' } => {
    const submission = mySubmissions?.find(s => s.sheetId === sheet.id);
    const deadline = (sheet.deadline as any)?.toDate();

    if (submission) {
        if (submission.grade !== null && submission.grade !== undefined) {
             return { label: "Graded", color: "text-green-500", icon: CheckCircle, action: 'graded' };
        }
        return { label: "Pending Review", color: "text-yellow-500", icon: Clock, action: 'pending' };
    }

    if (deadline && now > deadline) {
        return { label: "Late", color: "text-destructive", icon: XCircle, action: 'late' };
    }

    return { label: "Not Submitted", color: "text-blue-500", icon: FileText, action: 'submit' };
  };

  const handleViewSubmission = (sheetId: string) => {
      const submission = mySubmissions?.find(s => s.sheetId === sheetId);
      const sheet = allSheets?.find(s => s.id === sheetId);
      if(submission && sheet) {
          setSelectedSubmission({
              ...submission,
              sheetTitle: sheet.title,
              sheetSubject: sheet.subject,
          });
      }
  };


  const isLoading = isLoadingSheets || isLoadingSubmissions;

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {isRtl ? "واجباتي" : "My Sheets"}
        </h1>
        <p className="text-muted-foreground">
          {isRtl
            ? "تصفح واجباتك، قم بتسليمها، واطلع على درجاتك."
            : "Browse your assignments, submit your work, and view your grades."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(allSheets || []).map((sheet, index) => {
          const status = getStatus(sheet);

          return (
            <motion.div
              key={sheet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <status.icon className={`h-8 w-8 ${status.color}`} />
                    <Badge variant={status.action === 'graded' ? 'default' : 'outline'} className={`${status.action === 'graded' ? 'bg-green-600' : ''}`}>
                      {status.label}
                    </Badge>
                  </div>
                  <CardTitle className="font-headline pt-2 text-lg">
                    {sheet.title}
                  </CardTitle>
                  <CardDescription>
                    {sheet.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Deadline: {(sheet.deadline as any)?.toDate().toLocaleDateString()}</span>
                   </div>
                </CardContent>
                <CardFooter>
                  {status.action === 'submit' && (
                     <Button asChild className="w-full">
                        <Link href={`/student/sheets/${sheet.id}`}>
                            <Send className="h-4 w-4"/>
                            <span>Submit Work</span>
                        </Link>
                     </Button>
                  )}
                  {status.action === 'pending' && (
                     <Button variant="secondary" className="w-full" disabled>
                        <Clock className="h-4 w-4"/>
                        <span>Pending Review</span>
                     </Button>
                  )}
                  {(status.action === 'graded') && (
                     <Button variant="default" className="w-full" onClick={() => handleViewSubmission(sheet.id)}>
                        <Check className="h-4 w-4"/>
                        <span>View Grade</span>
                     </Button>
                  )}
                   {status.action === 'late' && (
                     <Button variant="destructive" className="w-full" disabled>
                        <XCircle className="h-4 w-4"/>
                        <span>Past Deadline</span>
                     </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
         {(allSheets || []).length === 0 && !isLoadingSheets && (
            <div className="col-span-full text-center text-muted-foreground py-8">
                No assignments are available at the moment.
            </div>
        )}
      </div>
      <SubmissionResultDialog submission={selectedSubmission} onClose={() => setSelectedSubmission(null)} />
    </div>
  );
}

    