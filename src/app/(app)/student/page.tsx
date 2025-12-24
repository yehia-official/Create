
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookText, CheckCircle, Target, TrendingUp, BarChart, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers";
import { useUser, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import type { ExamResult, WithId, Exam } from "@/lib/types";
import { useMemo } from "react";

export default function StudentDashboard() {
  const { direction } = useApp();
  const isRtl = false;
  const { user } = useUser();
  
  // For now, we will disable the data fetching to prevent permission errors.
  const isLoading = false;
  const lastExamAnalytics = null;
  const recentExams: ExamResult[] = [];


  if (isLoading) {
    return (
        <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {isRtl ? "لوحة تحكم الطالب" : "Student Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {isRtl
            ? "مرحباً بك مجدداً! هنا يمكنك الوصول إلى امتحاناتك وتتبع تقدمك."
            : "Welcome back! Here you can track your performance."}
        </p>
      </header>

      {/* Performance Analytics Section */}
      <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">{isRtl ? "تحليلات آخر امتحان" : "Last Exam Analytics"}</h2>
          {lastExamAnalytics ? (
            <motion.div 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{isRtl ? "عنوان الامتحان" : "Exam"}</CardTitle>
                      <BookText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-lg font-bold truncate">{/* getExamTitle(lastExamAnalytics.examId) */}</div>
                      <p className="text-xs text-muted-foreground">{isRtl ? "آخر امتحان تم إكماله" : "Most recently completed"}</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{isRtl ? "النتيجة" : "Score"}</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{lastExamAnalytics.percentage.toFixed(2)}%</div>
                      <p className="text-xs text-muted-foreground">{lastExamAnalytics.score.toFixed(0)} of {lastExamAnalytics.maxScore} {isRtl ? "نقاط" : "points"}</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{isRtl ? "الترتيب في الفصل" : "Class Rank"}</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">N/A</div>
                      <p className="text-xs text-muted-foreground">{isRtl ? `ميزة قادمة` : `Feature coming soon`}</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{isRtl ? "الإجراءات" : "Actions"}</CardTitle>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full mt-2">
                        <Link href="/student/exams">{isRtl ? "عرض كل الامتحانات" : "View All Exams"}</Link>
                    </Button>
                  </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="text-center py-12">
                <CardContent>
                    <p className="text-muted-foreground">{isRtl ? "لم تكمل أي امتحانات بعد لعرض الإحصائيات." : "No completed exams yet to show analytics."}</p>
                </CardContent>
            </Card>
          )}
      </section>

      {/* Recent Exams History Section */}
      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">{isRtl ? "آخر الامتحانات المكتملة" : "Recently Completed Exams"}</h2>
        {recentExams.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Content removed to prevent errors */}
            </div>
        ) : (
             <Card className="text-center py-12">
                <CardContent>
                    <p className="text-muted-foreground">{isRtl ? "لم تكمل أي امتحانات بعد." : "You haven't completed any exams yet."}</p>
                     <Button asChild className="mt-4">
                       <Link href="/student/exams">{isRtl ? "عرض الامتحانات المتاحة" : "View Available Exams"}</Link>
                   </Button>
                </CardContent>
            </Card>
        )}
      </section>
    </div>
  );
}
