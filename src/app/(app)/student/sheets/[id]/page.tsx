
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import type { Sheet, Submission } from "@/lib/types-sheets";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Send } from "lucide-react";
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


const submissionSchema = z.object({
  fileUrl: z.string().url("Please upload a file and wait for the URL.").optional(),
  textSubmission: z.string().optional(),
}).refine(data => data.fileUrl || data.textSubmission, {
  message: "You must either upload a file or provide a text submission.",
  path: ["textSubmission"],
});


export default function SubmitSheetPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const sheetId = params.id as string;
  const sheetDocRef = useMemoFirebase(() => (firestore && sheetId) ? doc(firestore, 'sheets', sheetId) : null, [firestore, sheetId]);
  const { data: sheet, isLoading: isLoadingSheet } = useDoc<Sheet>(sheetDocRef);

  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      fileUrl: "",
      textSubmission: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof submissionSchema>) => {
    if (!user || !sheet) return;
    
    const submissionId = `${user.uid}_${sheet.id}`;
    const submissionRef = doc(firestore, "submissions", submissionId);
    
    const submissionData: Submission = {
        id: submissionId,
        sheetId: sheet.id,
        studentId: user.uid,
        submittedAt: serverTimestamp(),
        ...values,
        grade: null,
        feedback: null,
    };

    try {
        await setDoc(submissionRef, submissionData);
        toast({
            title: "Submission Successful!",
            description: `Your work for "${sheet.title}" has been submitted.`,
        });
        
        // This forces a hard reload to ensure the parent page gets fresh data
        // and reflects the "View Submission" state correctly.
        window.location.href = "/student/sheets";

    } catch (error: any) {
        console.error("Submission error:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: error.message || "There was a problem submitting your work.",
        });
    }
  };

  if (isLoadingSheet) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!sheet) {
    return <div className="text-center py-10">Assignment not found.</div>;
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Assignments</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{sheet.title}</CardTitle>
          <CardDescription>Submit your work for: {sheet.subject}</CardDescription>
           <div className="text-sm text-destructive pt-2">
                Deadline: {(sheet.deadline as any)?.toDate().toLocaleString()}
           </div>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="textSubmission"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Text Submission</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Type your answer or paste a link to your work here."
                                    className="min-h-[150px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                If your work is a document or link, paste it here.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button type="button" variant="default" className="w-full" disabled={form.formState.isSubmitting}>
                           {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                           <span>Confirm & Submit</span>
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Once submitted, you cannot edit your work. Please double-check everything before confirming.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Submitting..." : "Yes, Submit My Work"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                </form>
            </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

    