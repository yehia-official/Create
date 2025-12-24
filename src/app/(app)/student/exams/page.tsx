
"use client";

import { useApp } from "@/components/providers";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import type { Exam } from "@/lib/types";
import { ExamCard } from "./ExamCard";

export default function MyExamsPage() {
  const { direction } = useApp();
  const isRtl = false;
  const firestore = useFirestore();
  
  const examsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "exams")) : null, [firestore]);
  const { data: allExams, isLoading: isLoadingExams } = useCollection<Exam>(examsQuery);
  
  const isLoading = isLoadingExams;

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {isRtl ? "كل الامتحانات" : "All Exams"}
        </h1>
        <p className="text-muted-foreground">
          {isRtl
            ? "تصفح جميع الامتحانات المتاحة لك."
            : "Browse all the exams available to you."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allExams && allExams.map((exam, index) => (
            <ExamCard key={exam.id} exam={exam} index={index} />
        ))}
         {allExams && allExams.length === 0 && !isLoadingExams && (
            <div className="col-span-full text-center text-muted-foreground py-8">
                No exams are available at the moment.
            </div>
        )}
      </div>
    </div>
  );
}
