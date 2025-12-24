
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/firebase";
import { useApp } from "@/components/providers";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { updateProfile } from "firebase/auth";
import { UserAvatarIcon } from "@/components/ui/UserAvatarIcon";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { direction } = useApp();
  const isRtl = direction === 'rtl';

  const [firestoreUser, setFirestoreUser] = useState<any>(null);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          setFirestoreUser(docSnap.data());
        }
      });
    }
  }, [user, firestore]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpdate = async () => {
    if (!user || !firestore || !newAvatar) return;
    setIsUploading(true);
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, { photoURL: newAvatar }, { merge: true });
      
      // Also update the auth user profile if possible, though this has length limits
      if(newAvatar.length < 1000) { // Simple check
         await updateProfile(user, { photoURL: newAvatar });
      }

      setFirestoreUser((prev: any) => ({ ...prev, photoURL: newAvatar }));
      setNewAvatar(null);
      toast({
        title: "Avatar Updated",
        description: "Your new avatar has been saved.",
      });
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not save your new avatar. The image might be too large.",
      });
      console.error("Avatar update error:", error);
    } finally {
        setIsUploading(false);
    }
  };
  
  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would update the user's profile in Firebase Auth and Firestore.
    toast({
      title: isRtl ? "تم تحديث الملف الشخصي" : "Profile Updated",
      description: isRtl ? "تم حفظ معلوماتك بنجاح." : "Your information has been successfully saved.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("new-password");
    const confirmPassword = formData.get("confirm-password");

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: isRtl ? "خطأ" : "Error",
        description: isRtl ? "كلمتا المرور غير متطابقتين." : "Passwords do not match.",
      });
      return;
    }
    // In a real app, you would use updatePassword from Firebase Auth.
    toast({
      title: isRtl ? "تم تحديث كلمة المرور" : "Password Updated",
      description: isRtl ? "تم تغيير كلمة المرور الخاصة بك بنجاح." : "Your password has been changed successfully.",
    });
  };
  
  const currentAvatarUrl = newAvatar || firestoreUser?.photoURL || user?.photoURL;
  const userDisplayName = user?.displayName || user?.email?.split('@')[0];

  if (isUserLoading || !user) {
    return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {isRtl ? "الملف الشخصي" : "My Profile"}
        </h1>
        <p className="text-muted-foreground">
          {isRtl ? "عرض وإدارة معلومات حسابك." : "View and manage your account information."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32">
                    <AvatarImage src={currentAvatarUrl} alt="User Avatar" />
                    <AvatarFallback>
                      {userDisplayName ? userDisplayName.charAt(0).toUpperCase() : <UserAvatarIcon className="h-16 w-16 text-muted-foreground" />}
                    </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full" asChild>
                   <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change photo</span>
                   </Label>
                </Button>
                <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
              
              {newAvatar && (
                <div className="flex flex-col items-center gap-2 w-full mb-4">
                  <p className="text-sm text-muted-foreground">New image preview</p>
                  <Button onClick={handleAvatarUpdate} disabled={isUploading} className="w-full">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save New Avatar"}
                  </Button>
                   <Button variant="outline" onClick={() => setNewAvatar(null)} className="w-full">Cancel</Button>
                </div>
              )}

              <h2 className="text-xl font-semibold">{user.displayName || user.email?.split('@')[0]}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "المعلومات الشخصية" : "Personal Information"}</CardTitle>
              <CardDescription>{isRtl ? "قم بتحديث اسمك وبريدك الإلكتروني." : "Update your name and email address."}</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{isRtl ? "الاسم الكامل" : "Full Name"}</Label>
                  <Input id="name" defaultValue={user.displayName || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{isRtl ? "البريد الإلكتروني" : "Email"}</Label>
                  <Input id="email" type="email" defaultValue={user.email || ""} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">{isRtl ? "حفظ التغييرات" : "Save Changes"}</Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isRtl ? "تغيير كلمة المرور" : "Change Password"}</CardTitle>
              <CardDescription>{isRtl ? "لأمان حسابك، اختر كلمة مرور قوية." : "For your account's security, choose a strong password."}</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordChange}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{isRtl ? "كلمة المرور الحالية" : "Current Password"}</Label>
                  <Input id="current-password" name="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">{isRtl ? "كلمة المرور الجديدة" : "New Password"}</Label>
                  <Input id="new-password" name="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{isRtl ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password"}</Label>
                  <Input id="confirm-password" name="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">{isRtl ? "تحديث كلمة المرور" : "Update Password"}</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
