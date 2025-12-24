
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import type { Exam, ExamResult, User as StudentUser } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Award, Printer, Loader2 } from "lucide-react";
import { useApp } from "@/components/providers";

export default function CertificatePage() {
  const { direction } = useApp();
  const isRtl = false;
  const params = useParams();
  const firestore = useFirestore();
  const resultId = params.resultId as string;

  const [currentDate, setCurrentDate] = useState('');

  const resultDocRef = useMemoFirebase(() => 
    (firestore && resultId) 
    ? doc(firestore, 'studentExams', resultId) 
    : null, 
  [firestore, resultId]);
  const { data: result, isLoading: isLoadingResult } = useDoc<ExamResult>(resultDocRef);
  
  const studentDocRef = useMemoFirebase(() => 
    (firestore && result?.studentId)
    ? doc(firestore, 'users', result.studentId)
    : null,
  [firestore, result]);
  const { data: student, isLoading: isLoadingStudent } = useDoc<StudentUser>(studentDocRef);

  const examDocRef = useMemoFirebase(() => 
    (firestore && result) ? doc(firestore, 'exams', result.examId) : null, 
  [firestore, result]);
  const { data: examDetails, isLoading: isLoadingExam } = useDoc<Exam>(examDocRef);
  
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);
  
  const handlePrint = () => {
      window.print();
  }

  const isLoading = isLoadingExam || isLoadingResult || isLoadingStudent;

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
             <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }
  
  if (!result || !examDetails || !student || !result.passed) {
    return (
        <div className="flex items-center justify-center h-screen">
             <p>{isRtl ? "جارٍ تحميل الشهادة أو أنك لا تملك صلاحية الوصول..." : "Certificate not available or you are not authorized to view it."}</p>
        </div>
    );
  }
  
  const studentName = student.name || student.email?.split('@')[0];

  return (
    <>
      <div id="certificate-page-container" className="min-h-screen w-full flex flex-col items-center justify-center bg-muted/40 p-4 print:bg-white print:p-0">
        <motion.div
          id="certificate-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl aspect-[16/11] bg-background text-foreground print:shadow-none print:border-0"
        >
          <div className="w-full h-full border-8 border-primary dark:border-accent p-6 sm:p-10 rounded-lg shadow-2xl bg-background relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 dark:opacity-5"></div>
            
            <div className="relative text-center space-y-2 sm:space-y-4">
              <div className="flex justify-center items-center gap-2">
                   <div className="text-3xl font-bold font-headline text-primary">Qui<span className="text-accent">zzy</span></div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary dark:text-accent">
                {isRtl ? "شهادة إتمام" : "Certificate of Achievement"}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                {isRtl ? "تُمنح هذه الشهادة إلى" : "This certificate is proudly presented to"}
              </p>

              <h2 className="text-2xl sm:text-4xl font-semibold tracking-wider">
                {studentName}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {isRtl ? "لإكماله بنجاح اختبار" : "For successfully completing the exam"}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold font-headline">
                {isRtl ? examDetails.titleAr : examDetails.title}
              </h3>
            </div>

             <div className="relative flex justify-around items-end text-center pt-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="w-1/3">
                      <p className="font-semibold text-sm sm:text-base">{isRtl ? "تاريخ الإكمال" : "Date of Completion"}</p>
                      <div className="border-t-2 border-muted mt-2 pt-2">
                        <p>{currentDate}</p>
                      </div>
                  </div>
                   <div className="w-1/3">
                        <p className="font-['Allura'] text-2xl sm:text-4xl text-foreground -mb-2">Quizzy Platform</p>
                         <div className="border-t-2 border-muted mt-2 pt-2">
                             <p className="font-semibold text-sm sm:text-base">Quizzy</p>
                         </div>
                     </div>
                   <div className="w-1/3">
                      <p className="font-semibold text-sm sm:text-base">{isRtl ? "النتيجة المحققة" : "Achieved Score"}</p>
                       <div className="border-t-2 border-muted mt-2 pt-2">
                        <p>{result.percentage.toFixed(2)}%</p>
                      </div>
                  </div>
             </div>
               
               <div className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 text-primary/10 dark:text-accent/10">
                  <Award size={200} strokeWidth={0.5} />
               </div>
               <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 text-primary/10 dark:text-accent/10 rotate-45">
                  <Award size={200} strokeWidth={0.5} />
               </div>
          </div>
        </motion.div>
         <div id="print-button-container" className="mt-6 print:hidden">
              <Button onClick={handlePrint} size="lg">
                  <Printer className="h-5 w-5"/>
                  <span>{isRtl ? "طباعة الشهادة" : "Print Certificate"}</span>
              </Button>
          </div>
      </div>
       <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
            
            .bg-grid-pattern {
                background-image: radial-gradient(circle, hsl(var(--primary) / 0.1) 1px, transparent 1px);
                background-size: 1rem 1rem;
            }
            .dark .bg-grid-pattern {
                background-image: radial-gradient(circle, hsl(var(--accent) / 0.05) 1px, transparent 1px);
            }

            @media print {
              @page {
                size: landscape;
                margin: 0;
              }
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background-color: #ffffff !important;
              }
              
              body > * {
                visibility: hidden;
              }
              
              #certificate-page-container, #certificate-page-container * {
                visibility: visible;
              }

              #certificate-page-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              #certificate-content {
                width: 100% !important;
                height: 100% !important;
                max-width: none !important;
                aspect-ratio: auto !important;
              }
              
              #certificate-content > div {
                border-width: 12px !important;
                border-radius: 0 !important;
                height: 100%;
              }

              #print-button-container {
                display: none;
              }

              .bg-grid-pattern {
                  background-image: radial-gradient(circle, hsl(var(--primary) / 0.1) 1px, transparent 1px) !important;
              }
            }
        `}</style>
    </>
  );
}
