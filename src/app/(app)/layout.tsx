
"use client";

import { useEffect, useState } from 'react';
import { useUser } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "@/components/providers";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  FileText,
  BookOpen,
  Users,
  LogOut,
  ChevronDown,
  Library,
  Loader2,
  GraduationCap,
  ListChecks
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserRole } from "@/lib/types";
import { signOut, User } from 'firebase/auth';
import { useAuth, useFirestore } from '@/firebase/provider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAvatarIcon } from "@/components/ui/UserAvatarIcon";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { direction } = useApp();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const [firestoreUser, setFirestoreUser] = useState<any>(null);
  const [isFirestoreLoading, setIsFirestoreLoading] = useState(true);

  // Effect for handling redirection if user is not logged in
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [isUserLoading, user, router]);

  // Effect for fetching Firestore user data and role-based redirection
  useEffect(() => {
    if (user && firestore) {
      setIsFirestoreLoading(true);
      const userDocRef = doc(firestore, "users", user.uid);
      
      const fetchUser = async () => {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirestoreUser(userData);
          const role = userData.role as UserRole;
          
          // CRITICAL: Role-based redirection logic
          const allowedPaths = [`/${role}`, '/profile', '/certificate'];
          const isAllowed = allowedPaths.some(p => pathname.startsWith(p));

          if (role && !isAllowed) {
            router.replace(`/${role}`);
          }

        } else {
          // If doc doesn't exist, it might be a new user. Firestore rule might take a moment.
          // Retry after a short delay.
          setTimeout(fetchUser, 1500);
        }
        setIsFirestoreLoading(false);
      };

      fetchUser().catch(error => {
        console.error("Error fetching Firestore user:", error);
        setFirestoreUser(null);
        setIsFirestoreLoading(false);
      });

    } else if (!user && !isUserLoading) {
      setFirestoreUser(null);
      setIsFirestoreLoading(false);
    }
  }, [user, firestore, pathname, router, isUserLoading]);
  

  const isLoading = isUserLoading || (user && isFirestoreLoading);

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  
  const role = firestoreUser?.role as UserRole;
   if (user && !role) {
     return (
        <div className="flex h-screen items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Finalizing account setup...</p>
        </div>
     );
   }

   if (!user || !role) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    const allowedPaths = [`/${role}`, '/profile', '/certificate'];
    const isAllowed = allowedPaths.some(p => pathname.startsWith(p));
    // Final check to prevent flashing incorrect layout
    if (!isAllowed) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Redirecting...</p>
            </div>
        );
    }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" dir={direction}>
      <Sidebar role={role} />
      <div className="flex flex-col">
        <Header role={role} user={user!} firestoreUser={firestoreUser} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ role }: { role: UserRole }) {
    const { direction } = useApp();
    const isRtl = direction === 'rtl';
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
      if (auth) {
        await signOut(auth);
      }
      router.push('/');
    };


    const navItems = {
        student: [
            { href: `/student`, icon: Home, label: "Dashboard", labelAr: "لوحة التحكم" },
            { href: `/student/exams`, icon: FileText, label: "My Exams", labelAr: "امتحاناتي" },
        ],
        teacher: [
            { href: `/teacher`, icon: Home, label: "Dashboard", labelAr: "لوحة التحكم" },
            { href: `/teacher/create`, icon: BookOpen, label: "Create Exam", labelAr: "إنشاء امتحان" },
            { href: `/teacher/question-bank`, icon: Library, label: "Question Bank", labelAr: "بنك الأسئلة" },
        ],
        admin: [
            { href: `/admin`, icon: Home, label: "Dashboard", labelAr: "لوحة التحكم" },
            { href: `/admin/users`, icon: Users, label: "Manage Users", labelAr: "إدارة المستخدمين" },
        ]
    };


  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="#" onClick={(e) => { e.preventDefault(); router.push(`/${role || 'student'}`); }} className="flex items-center gap-2 font-semibold font-headline">
             <span className="text-3xl font-bold font-headline text-primary">Qui<span className="text-accent">zzy</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {(navItems[role] || navItems.student).map((item) => (
              <SidebarLink key={item.href} href={item.href} icon={item.icon} label={isRtl ? item.labelAr : item.label} />
            ))}
             <Button variant="ghost" onClick={handleSignOut} className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary justify-start text-sm font-medium">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Header({ role, user, firestoreUser }: { role: UserRole, user: User, firestoreUser: any }) {
  const { direction } = useApp();
  const isRtl = direction === 'rtl';
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/');
  };

  const avatarUrl = firestoreUser?.photoURL || user.photoURL;
  const userDisplayName = user?.displayName || user?.email?.split('@')[0];

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar role={role} />
      <div className="w-full flex-1">
        {/* Can add search bar here if needed */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full flex items-center gap-2 p-1 pr-2">
             <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt="User Avatar" />
                <AvatarFallback>
                  {userDisplayName ? userDisplayName.charAt(0).toUpperCase() : <UserAvatarIcon className="h-4 w-4 text-muted-foreground" />}
                </AvatarFallback>
             </Avatar>
            <span className="capitalize">{role}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{isRtl ? 'حسابي' : 'My Account'}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">{isRtl ? 'الملف الشخصي' : 'Profile'}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="mailto:support@quizzy.app?subject=Support Request">{isRtl ? 'الدعم' : 'Support'}</a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isRtl ? 'تسجيل الخروج' : 'Logout'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function MobileSidebar({ role }: { role: UserRole }) {
    const { direction } = useApp();
    const isRtl = direction === 'rtl';
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
      if (auth) {
        await signOut(auth);
      }
      router.push('/');
    };


    const navItems = {
        student: [
            { href: `/student`, icon: Home, label: "Dashboard", labelAr: "لوحة التحكم" },
            { href: `/student/exams`, icon: FileText, label: "My Exams", labelAr: "امتحاناتي" },
        ],
        teacher: [
            { href: `/teacher`, icon: Home, label: "Dashboard", labelAr: "لوحة التحكم" },
            { href: `/teacher/create`, icon: BookOpen, label: "Create Exam", labelAr: "إنشاء امتحان" },
            { href: `/teacher/question-bank`, icon: Library, label: "Question Bank", labelAr: "بنك الأسئلة" },
        ],
        admin: [
            { href: `/admin`, icon: Home, label: "Dashboard", labelAr: "لوحة التحكم" },
            { href: `/admin/users`, icon: Users, label: "Manage Users", labelAr: "إدارة المستخدمين" },
        ]
    };


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={isRtl ? "right" : "left"} className="flex flex-col">
        <SheetHeader>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
             <Link
                href="#"
                onClick={(e) => { e.preventDefault(); router.push(`/${role || 'student'}`); }}
                className="flex items-center gap-2 text-lg font-semibold font-headline mb-4"
              >
                 <span className="text-3xl font-bold font-headline text-primary">Qui<span className="text-accent">zzy</span></span>
              </Link>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium">
          {(navItems[role] || navItems.student).map((item) => (
              <SidebarLink key={item.href} href={item.href} icon={item.icon} label={isRtl ? item.labelAr : item.label} isMobile />
            ))}
        </nav>
        <div className="mt-auto">
            <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start text-lg">
                <LogOut className="mr-2 h-5 w-5" />
                <span>Logout</span>
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isMobile?: boolean;
}

function SidebarLink({ href, icon: Icon, label, isMobile = false }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-muted text-primary",
        isMobile && "gap-4 text-base"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
