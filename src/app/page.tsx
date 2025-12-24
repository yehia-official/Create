
'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState, useRef, Suspense } from 'react';
import { ArrowRight, BookOpen, GraduationCap, Loader2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useApp } from '@/components/providers';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import type { UserRole } from '@/lib/types';
import { useUser } from '@/firebase';
import { useFirestore } from '@/firebase/provider';
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';


const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.658-3.301-11.289-7.96l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.556,44,29.863,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

function LoginPageContent() {
  const { direction } = useApp();
  const router = useRouter();
  const auth = getAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const isRtl = direction === 'rtl';
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { user, isUserLoading } = useUser();

  // If a user is already logged in, the AppLayout will handle redirection.
  useEffect(() => {
    if (!isUserLoading && user && firestore) {
        const userDocRef = doc(firestore!, 'users', user.uid);
        getDoc(userDocRef).then(docSnap => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                router.push(`/${userData.role}`);
            }
        });
    }
  }, [user, isUserLoading, firestore, router]);

  const handleAuthSuccess = async (user: User) => {
      const userDocRef = doc(firestore!, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      let role: UserRole = 'student'; // Default role
      if (!docSnap.exists()) {
          const newUserPayload: any = {
              id: user.uid,
              email: user.email,
              name: user.displayName || user.email?.split('@')[0],
              photoURL: user.photoURL,
              role: 'student', // New users are students by default
              status: 'Active',
          };
          
          await setDoc(userDocRef, newUserPayload);
          toast({
              title: "Welcome!",
              description: "Your account has been created as a student.",
          });
      } else {
          role = docSnap.data().role as UserRole;
      }
      
      router.push(`/${role}`);
  };

  const handleEmailLoginOrSignup = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (!auth || !firestore) {
          toast({ variant: "destructive", title: "Firebase not configured" });
          setIsLoading(false);
          return;
      };

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await handleAuthSuccess(userCredential.user);
      } catch (signInError: any) {
        // If user is not found, try to create an account
        if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-email') {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await handleAuthSuccess(userCredential.user);
          } catch (signUpError: any) {
            toast({ variant: "destructive", title: "Sign-up Failed", description: signUpError.message });
          }
        } else if (signInError.code === 'auth/wrong-password' || signInError.code === 'auth/invalid-credential') {
          toast({ variant: "destructive", title: "Login Failed", description: "The password you entered is incorrect. Please try again." });
        } else {
          // Handle other sign-in errors
          toast({ variant: "destructive", title: "Login Failed", description: signInError.message });
        }
      } finally {
        setIsLoading(false);
      }
  }

  const handleGoogleSignIn = async () => {
    if (!auth || !firestore) {
        toast({ variant: "destructive", title: "Firebase not configured" });
        return;
    }
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        await handleAuthSuccess(result.user);
    } catch (error: any) {
        toast({ variant: "destructive", title: "Google Sign-In Failed", description: error.message });
    } finally {
        setIsGoogleLoading(false);
    }
  };


  if (isUserLoading || user) {
      return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={direction}>
      <main className="flex-1 grid md:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-8 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md"
            >
                <div className="flex justify-center mb-6 md:hidden">
                     <span className="text-4xl font-bold font-headline text-primary">Qui<span className="text-accent">zzy</span></span>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl">Welcome</CardTitle>
                        <CardDescription>Sign in or create an account to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleEmailLoginOrSignup} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Continue with Email
                            </Button>
                        </form>
                        <div className="relative w-full my-6">
                            <Separator />
                            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-xs text-muted-foreground">OR</span>
                        </div>
                        <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
                            {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-5 w-5"/>}
                            Sign in with Google
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>

        <div className="hidden md:flex items-center justify-center p-12 bg-background">
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
             >
                <span className="text-8xl font-black text-primary">
                    Qui<span className="text-accent">zzy</span>
                </span>
             </motion.div>
        </div>
      </main>
    </div>
  );
}


export default function LoginPage() {
    return (
        <Suspense>
            <LoginPageContent />
        </Suspense>
    );
}

    