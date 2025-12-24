
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import type { Exam, ExamResult, User as StudentUser } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Award, Linkedin, Loader2, Twitter } from "lucide-react";
import { useApp } from "@/components/providers";

// Simplified icons for BlueSky and Threads
const ThreadsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 9v6m-4-3h8M5 9h.01M19 9h.01M5 15h.01M19 15h.01M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z" />
  </svg>
);

const BlueSkyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M12 12c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4zm0 2c3.5 0 8 1.5 8 3v1H4v-1c0-1.5 4.5-3 8-3z" />
    </svg>
);


export default function CertificatePage() {
  const { direction } = useApp();
  const isRtl = false;
  const params = useParams();
  const firestore = useFirestore();
  const resultId = params.resultId as string;

  const [currentDate, setCurrentDate] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

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
     if (typeof window !== 'undefined') {
      setCertificateUrl(window.location.href);
    }
  }, []);
  
  const handleShare = (platform: 'linkedin' | 'x' | 'bluesky' | 'threads') => {
    if (!examDetails || !result) return;

    const shareText = `I just earned a certificate for completing the "${examDetails.title}" exam on Quizzy with a score of ${result.percentage.toFixed(0)}%!`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(certificateUrl);

    let url = '';

    switch (platform) {
      case 'linkedin':
        // LinkedIn 'Add to Profile' feature
        const certName = encodeURIComponent(examDetails.title);
        const orgName = encodeURIComponent('Quizzy Platform');
        const issueDate = new Date();
        const issueYear = issueDate.getFullYear();
        const issueMonth = issueDate.getMonth() + 1;
        url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=${orgName}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodedUrl}`;
        break;
      case 'x':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'bluesky':
        url = `https://bsky.app/intent/compose?text=${encodedText}%0A%0A${encodedUrl}`;
        break;
      case 'threads':
        // Threads does not have a web intent for sharing with pre-filled text and URL yet.
        // This will open the main Threads page. The user has to manually paste the content.
        navigator.clipboard.writeText(`${shareText} ${certificateUrl}`);
        alert('Share text and link copied to clipboard! Paste it into your new Threads post.');
        url = `https://www.threads.net`;
        break;
    }

    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

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
          className="w-full max-w-4xl sm:aspect-[16/9] bg-background text-foreground print:shadow-none print:border-0"
        >
          <div className="w-full h-full border-8 border-primary dark:border-accent p-6 sm:p-10 rounded-lg shadow-2xl bg-background relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 dark:opacity-5"></div>
            
            <div className="relative text-center flex flex-col items-center justify-center flex-grow space-y-2 sm:space-y-4">
              <div className="flex justify-center items-center gap-2">
                   <div className="text-3xl font-bold font-headline text-primary">Qui<span className="text-accent">zzy</span></div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold font-headline text-primary dark:text-accent">
                {isRtl ? "شهادة إتمام" : "Certificate of Achievement"}
              </h1>

              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Congratulations on earning this certification. You stayed committed, put in the work, and it shows. This accomplishment wasn’t easy, but you earned it. Be proud of this step, and keep pushing forward.
              </p>
              <p className="text-sm sm:text-lg text-muted-foreground pt-2 sm:pt-4">
                {isRtl ? "تُمنح هذه الشهادة إلى" : "This certificate is proudly presented to"}
              </p>

              <h2 className="text-xl sm:text-4xl font-semibold tracking-wider">
                {studentName}
              </h2>

              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {isRtl ? "لإكماله بنجاح اختبار" : "For successfully completing the exam"}
              </p>
              <h3 className="text-lg sm:text-2xl font-bold font-headline">
                {isRtl ? examDetails.titleAr : examDetails.title}
              </h3>
            </div>

             <div className="relative flex justify-around items-end text-center pt-6 text-xs sm:text-sm text-muted-foreground w-full">
                  <div className="w-1/3">
                      <p className="font-semibold text-xs sm:text-base">{isRtl ? "تاريخ الإكمال" : "Date of Completion"}</p>
                      <div className="border-t-2 border-muted mt-2 pt-2">
                        <p>{currentDate}</p>
                      </div>
                  </div>
                   <div className="w-1/3">
                        <p className="font-['Allura'] text-2xl sm:text-4xl text-foreground -mb-2">Quizzy Platform</p>
                         <div className="border-t-2 border-muted mt-2 pt-2">
                             <p className="font-semibold text-xs sm:text-base">Quizzy</p>
                         </div>
                     </div>
                   <div className="w-1/3">
                      <p className="font-semibold text-xs sm:text-base">{isRtl ? "النتيجة المحققة" : "Achieved Score"}</p>
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
         <div id="print-button-container" className="mt-6 print:hidden flex flex-col gap-2 w-full max-w-md">
              <Button onClick={() => handleShare('linkedin')} size="lg" variant="outline">
                  <Linkedin className="h-5 w-5"/>
                  <span>Add this certification to my LinkedIn profile</span>
              </Button>
               <Button onClick={() => handleShare('x')} size="lg" variant="outline">
                  <Twitter className="h-5 w-5"/>
                  <span>Share this certification on X</span>
              </Button>
               <Button onClick={() => handleShare('bluesky')} size="lg" variant="outline">
                  <BlueSkyIcon className="h-5 w-5"/>
                  <span>Share this certification on BlueSky</span>
              </Button>
               <Button onClick={() => handleShare('threads')} size="lg" variant="outline">
                  <ThreadsIcon className="h-5 w-5"/>
                  <span>Share this certification on Threads</span>
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
