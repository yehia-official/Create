
"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/providers";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, Shield, Server, BookOpen, Activity, AlertTriangle, Loader2 } from "lucide-react";

interface ServerInfo {
  serverTimestamp: string;
  serverRegion: string;
}

export default function AdminDashboard() {
  const { direction } = useApp();
  const isRtl = false;
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);

  useEffect(() => {
    // Fetch data from our backend API route
    fetch('/api/server-info')
      .then(response => response.json())
      .then(data => {
        setServerInfo(data);
        setIsLoadingInfo(false);
      })
      .catch(error => {
        console.error("Failed to fetch server info:", error);
        setIsLoadingInfo(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {isRtl ? "لوحة تحكم المسؤول" : "Admin Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {isRtl ? "إدارة المستخدمين والإعدادات والإشراف على المنصة." : "Manage users, settings, and oversee the platform."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isRtl ? "إجمالي المستخدمين" : "Total Users"}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              {isRtl ? "+20.1% من الشهر الماضي" : "+20.1% from last month"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isRtl ? "إجمالي الامتحانات" : "Total Exams"}</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">{isRtl ? "+5 هذا الأسبوع" : "+5 this week"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isRtl ? "نشاط النظام" : "System Activity"}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
             <p className="text-xs text-muted-foreground">{isRtl ? "عملية تسجيل دخول اليوم" : "Logins today"}</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>{isRtl ? "إدارة المستخدمين والأدوار" : "User & Role Management"}</CardTitle>
                <CardDescription>{isRtl ? "إضافة أو تعديل أو إزالة المستخدمين وتعيين الأدوار." : "Add, edit, or remove users and assign roles."}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold">150 {isRtl ? "مستخدم" : "Users"}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-semibold">3 {isRtl ? "أدوار" : "Roles"}</span>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{isRtl ? "إعدادات النظام" : "System Settings"}</CardTitle>
                <CardDescription>{isRtl ? "تكوين الإعدادات العامة للمنصة." : "Configure platform-wide settings."}</CardDescription>
            </CardHeader>
             <CardContent className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="font-semibold">{isRtl ? "قيد الإنشاء" : "Under Construction"}</span>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <span>Server Information</span>
                </CardTitle>
                <CardDescription>Live data fetched from the backend API.</CardDescription>
            </CardHeader>
             <CardContent>
                {isLoadingInfo ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading server data...</span>
                  </div>
                ) : serverInfo ? (
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">Server Time: </span>
                      <span className="font-mono text-muted-foreground">{new Date(serverInfo.serverTimestamp).toLocaleTimeString()}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Server Region: </span>
                      <span className="font-mono text-muted-foreground">{serverInfo.serverRegion}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-destructive text-sm">Failed to load server data.</p>
                )}
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
