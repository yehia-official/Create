
"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useUser, useFirestore, setDocumentNonBlocking } from "@/firebase";
import { format } from "date-fns";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusCircle, Trash2, X, ImagePlus, Calendar as CalendarIcon, FileUp, Loader2, Upload, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import type { Question, QuestionType } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { parseQuestionsFlow } from "@/ai/flows/parse-questions-flow";


const questionSchema = z.object({
  text: z.string().min(10, "Question text must be at least 10 characters."),
  type: z.enum(["multiple-choice", "short-text", "true-false", "code", "mathematical", "diagram"]),
  points: z.coerce.number().min(1, "Points must be at least 1."),
  answer: z.union([z.string(), z.boolean()]).nullable(),
  options: z.array(z.string()).optional(),
  mediaUrl: z.string().url().optional().or(z.literal('')),
  mediaType: z.enum(['image', 'video']).optional(),
  language: z.enum(['javascript', 'python', 'java']).optional(),
  codeSnippet: z.string().optional(),
  testCases: z.string().optional(),
}).refine(data => {
    if (data.type === 'code') {
        // For code questions, testCases is required and must be valid JSON
        if (!data.testCases) return false;
        try {
            const tests = JSON.parse(data.testCases);
            return Array.isArray(tests) && tests.length > 0;
        } catch (e) {
            return false;
        }
    }
    // For other types, an answer is required
    return data.answer !== null && data.answer !== undefined && data.answer !== '';
}, {
    message: "A valid answer or a non-empty set of JSON test cases is required.",
    path: ["answer"], // Or path: ["testCases"] based on where you want the error to appear
});


const examSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  duration: z.coerce.number().min(5, "Duration must be at least 5 minutes."),
  questions: z.array(questionSchema).min(1, "You must add at least one question."),
  attemptsAllowed: z.coerce.number().min(1, "Must allow at least 1 attempt.").optional(),
  gradingPolicy: z.enum(['highest', 'average']).optional(),
  startTime: z.date({
    required_error: "A start date and time is required.",
  }),
  endTime: z.date({
    required_error: "An end date and time is required.",
  }),
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time.",
  path: ["endTime"],
});

type ExamFormData = z.infer<typeof examSchema>;

export default function CreateExamPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const { user } = useUser();
  const firestore = useFirestore();
  const [isImporting, setIsImporting] = useState(false);
  const [isFileImportOpen, setIsFileImportOpen] = useState(false);


  const form = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: "",
      subject: "",
      duration: 60,
      questions: [],
      attemptsAllowed: 1,
      gradingPolicy: 'highest',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (data: ExamFormData) => {
    if (!user || !firestore) {
        toast({
            title: "Error",
            description: "You must be logged in to create an exam.",
            variant: "destructive",
        });
        return;
    }

    const examRef = doc(collection(firestore, "exams"));
    const examData = {
        id: examRef.id,
        title: data.title,
        titleAr: data.title,
        subject: data.subject,
        subjectAr: data.subject,
        duration: data.duration,
        questionsCount: data.questions.length,
        teacherId: user.uid,
        createdAt: serverTimestamp(),
        startTime: data.startTime,
        endTime: data.endTime,
        status: "Scheduled",
        attemptsAllowed: data.attemptsAllowed,
        gradingPolicy: data.gradingPolicy,
    };
    
    setDocumentNonBlocking(examRef, examData, {});

    const questionsCollectionRef = collection(firestore, "exams", examRef.id, "questions");

    for (const question of data.questions) {
        const questionData = {
            ...question,
            examId: examRef.id,
            teacherId: user.uid,
        };
        await addDoc(questionsCollectionRef, questionData);
    }
    
    toast({
      title: "Exam Created!",
      description: `The exam "${data.title}" has been successfully scheduled.`,
    });

    router.push(`/teacher?role=${role}`);
  };


  const addQuestion = () => {
    append({
      text: "",
      type: "multiple-choice",
      points: 10,
      options: ["", "", "", ""],
      answer: "",
      mediaUrl: "",
      language: 'javascript',
      codeSnippet: "",
      testCases: "",
    });
  };

  const handleFileImport = async (file: File) => {
      setIsImporting(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
          const fileContent = e.target?.result as string;
          if (fileContent) {
              const base64Content = fileContent.split(',')[1];
              try {
                  const result = await parseQuestionsFlow({ fileContent: base64Content });
                  if (result && result.length > 0) {
                      append(result as any); // Assuming the flow returns questions in the correct format
                      toast({
                          title: "Import Successful",
                          description: `${result.length} questions have been added to the exam.`,
                      });
                      setIsFileImportOpen(false);
                  } else {
                      toast({
                          title: "Import Notice",
                          description: "The file was processed, but no questions were found or extracted.",
                          variant: "default",
                      });
                  }
              } catch (error: any) {
                  console.error("Error during file import flow:", error);
                  toast({
                      title: "Import Failed",
                      description: error.message || "An unexpected error occurred during file processing.",
                      variant: "destructive",
                  });
              } finally {
                  setIsImporting(false);
              }
          }
      };
      reader.onerror = (error) => {
          console.error("File reading error:", error);
          toast({
              title: "File Read Error",
              description: "Could not read the selected file.",
              variant: "destructive",
          });
          setIsImporting(false);
      };
      reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Create New Exam
        </h1>
        <p className="text-muted-foreground">
          Fill out the details below to create a new exam for your students.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>
                Provide the basic information for the exam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exam Title</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Midterm Exam" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Mathematics" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration (in minutes)</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Time</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP HH:mm")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                                <div className="p-3 border-t border-border">
                                  <Input type="time" onChange={e => {
                                      if (!field.value) return;
                                      const [hours, minutes] = e.target.value.split(':');
                                      const newDate = new Date(field.value);
                                      newDate.setHours(parseInt(hours), parseInt(minutes));
                                      field.onChange(newDate);
                                  }} />
                                </div>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              When the exam becomes available for students.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Time</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP HH:mm")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < (form.getValues("startTime") || new Date())
                                  }
                                  initialFocus
                                />
                                <div className="p-3 border-t border-border">
                                    <Input type="time" onChange={e => {
                                        if (!field.value) return;
                                        const [hours, minutes] = e.target.value.split(':');
                                        const newDate = new Date(field.value);
                                        newDate.setHours(parseInt(hours), parseInt(minutes));
                                        field.onChange(newDate);
                                    }} />
                                </div>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                                When the exam is no longer available.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="attemptsAllowed"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Allowed Attempts</FormLabel>
                            <FormControl>
                               <Input type="number" min={1} {...field} />
                            </FormControl>
                             <FormDescription>How many times can a student take this exam?</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                      <FormField
                        control={form.control}
                        name="gradingPolicy"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grading Policy</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a policy" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="highest">Highest Score</SelectItem>
                                    <SelectItem value="average">Average Score</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>How will the final grade be calculated?</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>
                Add questions to your exam manually or import them from a file.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <QuestionField key={field.id} form={form} index={index} remove={remove} />
              ))}
               <FormMessage>{form.formState.errors.questions?.message}</FormMessage>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={addQuestion}
                >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Question</span>
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsFileImportOpen(true)}
                >
                    <Upload className="h-4 w-4" />
                    <span>Import from File</span>
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create Exam"}
            </Button>
          </div>
        </form>
      </Form>

       <Dialog open={isFileImportOpen} onOpenChange={setIsFileImportOpen}>
          <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Import Questions from File</DialogTitle>
                <DialogDescription>
                  Upload an Excel (.xlsx, .csv) file to add questions in bulk.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                  <Input
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => {
                          if (e.target.files?.[0]) {
                              handleFileImport(e.target.files[0]);
                          }
                      }}
                      disabled={isImporting}
                  />
                  {isImporting && (
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing file... This may take a moment.</span>
                      </div>
                  )}
                  <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground space-y-2">
                      <h4 className="font-semibold text-foreground">File Instructions:</h4>
                      <p>Your file must have a header row. Headers can be in English or Arabic.</p>
                      <ul className="list-disc pl-5 space-y-1">
                          <li><b>Required:</b> `text` (or `نص السؤال`), `type` (or `نوع الأسئلة`), `points` (or `نقاط`).</li>
                          <li>For `multiple-choice`: include `answer`, `option1`, `option2`, etc.</li>
                          <li>For `true-false` or `short-text`: include `answer` (or `الإجابة الصحيحة`).</li>
                          <li>For `code`: include `language` (or `لغة`), `codeSnippet` (or `مقتطف التعليمات`), and `testCases` (or `حالات الاختبار (JSON)`).</li>
                      </ul>
                  </div>
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsFileImportOpen(false)} disabled={isImporting}>Cancel</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function QuestionField({ form, index, remove }: { form: any; index: number; remove: (index: number) => void; }) {
  const questionType = form.watch(`questions.${index}.type`) as QuestionType;
  const mediaUrl = form.watch(`questions.${index}.mediaUrl`);
  const mediaType = form.watch(`questions.${index}.mediaType`);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleMediaUpload = (file: File) => {
    const storage = getStorage();
    const examId = `temp-id-${Date.now()}`; // Temporary ID for storage path
    const fileName = `${Date.now()}-${file.name}`;
    const fileRef = storageRef(storage, `exam-media/${examId}/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setIsUploading(true);
    setUploadProgress(0);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        },
        (error) => {
            setIsUploading(false);
            setUploadProgress(0);
            toast({
                variant: "destructive",
                title: "Upload Failed",
                description: `Error: ${error.code}. Please check storage rules and network.`,
            });
            console.error("Upload error:", error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                form.setValue(`questions.${index}.mediaUrl`, downloadURL);
                form.setValue(`questions.${index}.mediaType`, file.type.startsWith('image/') ? 'image' : 'video');
                setIsUploading(false);
            });
        }
    );
  };

  return (
    <div className="p-4 md:p-6 border rounded-lg relative space-y-4 bg-muted/50">
        <div className="flex justify-between items-start mb-2 md:mb-4">
            <h4 className="font-semibold text-md md:text-lg">Question {index + 1}</h4>
             <div className="flex items-center gap-1 md:gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(index)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
                control={form.control}
                name={`questions.${index}.type`}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="short-text">Short Text</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                        <SelectItem value="mathematical">Mathematical</SelectItem>
                        <SelectItem value="diagram">Diagram</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`questions.${index}.points`}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                    <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            {questionType === 'code' && (
                 <FormField
                    control={form.control}
                    name={`questions.${index}.language`}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || 'javascript'}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            )}
        </div>

        <FormField
            control={form.control}
            name={`questions.${index}.text`}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Question Text</FormLabel>
                <FormControl>
                <Textarea placeholder="What is 2 + 2?" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        
        <div className="space-y-2">
            <FormLabel>Media (Optional)</FormLabel>
            {mediaUrl ? (
                <div className="relative group w-full max-w-[200px]">
                    {mediaType === 'image' && <Image src={mediaUrl} alt="Question media preview" width={200} height={150} className="rounded-md object-cover"/>}
                    {mediaType === 'video' && <video src={mediaUrl} controls width="200" className="rounded-md" />}
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={() => {
                            form.setValue(`questions.${index}.mediaUrl`, '');
                            form.setValue(`questions.${index}.mediaType`, undefined);
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : isUploading ? (
                 <div className="w-full max-w-xs">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">Uploading... {Math.round(uploadProgress)}%</p>
                </div>
            ) : (
                <div>
                    <FormControl>
                        <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/50 p-4 hover:bg-muted">
                            <Upload className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Upload Image or Video</span>
                            <Input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    handleMediaUpload(e.target.files[0]);
                                }
                            }} />
                        </label>
                    </FormControl>
                    <FormMessage />
                </div>
            )}
        </div>
        
        {questionType === "multiple-choice" && (
            <div className="space-y-2">
                <Label>Options &amp; Correct Answer</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((optionIndex) => (
                         <FormField
                            key={optionIndex}
                            control={form.control}
                            name={`questions.${index}.options.${optionIndex}`}
                            render={({ field }) => (
                            <FormItem>
                                 <FormControl>
                                    <div className="flex items-center gap-2">
                                        <Controller
                                            name={`questions.${index}.answer`}
                                            control={form.control}
                                            render={({ field: radioField }) => (
                                                <Input 
                                                    type="radio"
                                                    value={form.watch(`questions.${index}.options.${optionIndex}`)}
                                                    checked={radioField.value === form.watch(`questions.${index}.options.${optionIndex}`)}
                                                    onChange={() => radioField.onChange(form.watch(`questions.${index}.options.${optionIndex}`))}
                                                    className="h-4 w-4"
                                                />
                                            )}
                                        />
                                        <Input placeholder={`Option ${optionIndex + 1}`} {...field} />
                                    </div>
                                </FormControl>
                            </FormItem>
                            )}
                        />
                    ))}
                </div>
                 <FormMessage>{form.formState.errors.questions?.[index]?.answer?.message}</FormMessage>
            </div>
        )}

        {questionType === "true-false" && (
             <FormField
                control={form.control}
                name={`questions.${index}.answer`}
                render={({ field }) => (
                <FormItem className="space-y-3">
                     <FormLabel>Correct Answer</FormLabel>
                     <FormControl>
                        <Controller
                            name={`questions.${index}.answer`}
                            control={form.control}
                            render={({ field: radioField }) => (
                                <div className="flex gap-4">
                                     <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <Input type="radio" checked={radioField.value === true} onChange={() => radioField.onChange(true)} className="h-4 w-4"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">True</FormLabel>
                                     </FormItem>
                                     <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                           <Input type="radio" checked={radioField.value === false} onChange={() => radioField.onChange(false)} className="h-4 w-4"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">False</FormLabel>
                                     </FormItem>
                                </div>
                            )}
                        />
                     </FormControl>
                      <FormMessage>{form.formState.errors.questions?.[index]?.answer?.message}</FormMessage>
                </FormItem>
                )}
            />
        )}

        {(questionType === "short-text" || questionType === "mathematical" || questionType === 'diagram') && (
            <FormField
                control={form.control}
                name={`questions.${index}.answer`}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Correct Answer</FormLabel>
                     <FormDescription>
                        {questionType === 'short-text' && 'The exact text answer.'}
                        {questionType === 'mathematical' && 'The result of the equation.'}
                        {questionType === 'diagram' && 'Description of the correct diagram state.'}
                     </FormDescription>
                    <FormControl>
                    <Input placeholder="e.g., Paris" {...field} value={field.value as string || ''} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        )}
        {questionType === 'code' && (
             <div className="space-y-4">
                <FormField
                    control={form.control}
                    name={`questions.${index}.codeSnippet`}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Code Snippet</FormLabel>
                        <FormDescription>Initial code to show the student (e.g., function definition).</FormDescription>
                        <FormControl>
                            <Textarea placeholder="function solve() {\n  // Your code here\n}" {...field} className="font-code h-32" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`questions.${index}.testCases`}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Test Cases (JSON format)</FormLabel>
                        <FormDescription>
                          {`Array of tests, e.g., '[{"input": [1,2], "output": 3}]'`}
                        </FormDescription>
                        <FormControl>
                            <Textarea placeholder='[{"input": [1, 2], "output": 3}]' {...field} className="font-code h-32" />
                        </FormControl>
                        <FormMessage>{form.formState.errors.questions?.[index]?.testCases?.message || form.formState.errors.questions?.[index]?.answer?.message}</FormMessage>
                    </FormItem>
                    )}
                />
             </div>
        )}
    </div>
  )
}

    