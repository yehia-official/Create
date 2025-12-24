
"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useApp } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { questionBank as initialQuestions } from "@/lib/data";
import type { Question, QuestionType } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const questionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(10, "Question text must be at least 10 characters."),
  type: z.enum(["multiple-choice", "short-text", "true-false"]),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  points: z.coerce.number().min(1, "Points must be at least 1."),
  answer: z.union([z.string(), z.boolean()]).refine(val => val !== '', "Answer is required."),
  options: z.array(z.string()).optional(),
});


const columns: ColumnDef<Question>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "text",
    header: "Question Text",
    cell: ({ row }) => <div className="line-clamp-2">{row.getValue("text")}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <div className="capitalize">{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return <Badge variant="outline" className="capitalize">{type.replace('-', ' ')}</Badge>
    },
  },
    {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => {
        const points = row.getValue("points") as number;
        return <div className="text-center">{points}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const question = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit question</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete question</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function QuestionBankPage() {
  const isRtl = false;
  const [data, setData] = React.useState(() => [...initialQuestions]);
  const [isAddQuestionOpen, setIsAddQuestionOpen] = React.useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  
  const { toast } = useToast();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
     initialState: {
        pagination: {
            pageSize: 5,
        },
    },
  });

  const handleAddQuestion = (newQuestion: Question) => {
    setData(prev => [newQuestion, ...prev]);
    setIsAddQuestionOpen(false);
    toast({
      title: "Question Added",
      description: `The question has been successfully added to the bank.`,
    });
  };

  return (
    <div className="w-full space-y-6">
        <header className="space-y-1.5">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {isRtl ? "بنك الأسئلة" : "Question Bank"}
            </h1>
            <p className="text-muted-foreground">
                {isRtl ? "إدارة جميع أسئلة الامتحان الخاصة بك في مكان واحد." : "Manage all your exam questions in one place."}
            </p>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>All Questions</CardTitle>
            <CardDescription>A centralized repository of questions for all subjects.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
                <Input
                placeholder="Filter questions by text..."
                value={(table.getColumn("text")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("text")?.setFilterValue(event.target.value)
                }
                className="max-w-sm w-full"
                />
                 <Button onClick={() => setIsAddQuestionOpen(true)} className="w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4" />
                    <span>Add New Question</span>
                </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <Table>
                  <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                          return (
                          <TableHead key={header.id}>
                              {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                  )}
                          </TableHead>
                          );
                      })}
                      </TableRow>
                  ))}
                  </TableHeader>
                  <TableBody>
                  {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                      <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                      >
                          {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                              {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                              )}
                          </TableCell>
                          ))}
                      </TableRow>
                      ))
                  ) : (
                      <TableRow>
                      <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                      >
                          No results.
                      </TableCell>
                      </TableRow>
                  )}
                  </TableBody>
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4 px-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                    Previous
                    </Button>
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    >
                    Next
                    </Button>
                </div>
              </div>
            </ScrollArea>
        </CardContent>
      </Card>

      <AddQuestionDialog 
        isOpen={isAddQuestionOpen} 
        onOpenChange={setIsAddQuestionOpen}
        onQuestionAdd={handleAddQuestion}
    />
    </div>
  );
}


function AddQuestionDialog({ isOpen, onOpenChange, onQuestionAdd }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onQuestionAdd: (data: Question) => void }) {
    const form = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            text: "",
            type: "multiple-choice",
            subject: "",
            points: 10,
            options: ["", "", "", ""],
            answer: "",
        },
    });

    const questionType = form.watch("type");

    function onSubmit(data: z.infer<typeof questionSchema>) {
        const newQuestion: Question = {
            ...data,
            id: `q-${Date.now()}`,
        };
        onQuestionAdd(newQuestion);
        form.reset();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Add New Question</DialogTitle>
                            <DialogDescription>
                                Fill in the details for the new question.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                name="type"
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
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="points"
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
                        </div>

                         <FormField
                            control={form.control}
                            name="text"
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

                        {questionType === "multiple-choice" && (
                            <div className="space-y-2">
                                <Label>Options &amp; Correct Answer</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {[0, 1, 2, 3].map((optionIndex) => (
                                        <FormField
                                            key={optionIndex}
                                            control={form.control}
                                            name={`options.${optionIndex}`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <Controller
                                                            name="answer"
                                                            control={form.control}
                                                            render={({ field: radioField }) => (
                                                                <Input 
                                                                    type="radio"
                                                                    value={form.watch(`options.${optionIndex}`)}
                                                                    checked={radioField.value === form.watch(`options.${optionIndex}`)}
                                                                    onChange={() => radioField.onChange(form.watch(`options.${optionIndex}`))}
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
                                <FormMessage>{form.formState.errors.answer?.message}</FormMessage>
                            </div>
                        )}

                        {questionType === "true-false" && (
                            <FormField
                                control={form.control}
                                name="answer"
                                render={() => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Correct Answer</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="answer"
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
                                    <FormMessage>{form.formState.errors.answer?.message}</FormMessage>
                                </FormItem>
                                )}
                            />
                        )}

                         {questionType === "short-text" && (
                            <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correct Answer</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Paris" {...field} value={field.value as string || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        )}
                        
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button type="submit">Add Question</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

    