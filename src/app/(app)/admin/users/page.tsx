
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
import { users as initialUsers } from "@/lib/data";
import type { User } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";


const columns: ColumnDef<User>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
   {
    accessorKey: "guardianEmail",
    header: "Guardian Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("guardianEmail") || '-'}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
        const role = row.getValue("role") as string;
        const variant = role === 'admin' ? 'destructive' : role === 'teacher' ? 'secondary' : 'default';
        return <Badge variant={variant} className="capitalize">{role}</Badge>
    },
  },
    {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === 'Active' ? 'default' : 'outline'} className={`capitalize ${status === 'Active' ? 'bg-green-500/20 text-green-700 border-green-300' : ''}`}>{status}</Badge>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ManageUsersPage() {
  const { direction } = useApp();
  const isRtl = false;
  const [data, setData] = React.useState(() => [...initialUsers]);
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);

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

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: User = {
        id: `user-${Date.now()}`,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        guardianEmail: formData.get('guardianEmail') as string,
        role: formData.get('role') as User['role'],
        status: 'Active',
    };
    setData(prev => [newUser, ...prev]);
    setIsAddUserOpen(false);
    toast({
      title: "User Created",
      description: `User ${newUser.name} has been successfully added.`,
    });
  };

  return (
    <div className="w-full space-y-6">
        <header className="space-y-1.5">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {isRtl ? "إدارة المستخدمين" : "User Management"}
            </h1>
            <p className="text-muted-foreground">
                {isRtl ? "عرض وإدارة جميع المستخدمين في النظام." : "View and manage all users in the system."}
            </p>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
                <Input
                placeholder="Filter users by email..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="max-w-sm w-full"
                />
                 <Button onClick={() => setIsAddUserOpen(true)} className="w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4" />
                    <span>Add New User</span>
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

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddUser}>
              <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                      Fill in the details below to add a new user to the system.
                  </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" name="name" required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" name="email" type="email" required className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="guardianEmail" className="text-right">Guardian Email</Label>
                      <Input id="guardianEmail" name="guardianEmail" type="email" className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Role</Label>
                         <Select required name="role" defaultValue="student">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                   </div>
              </div>
              <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
                  <Button type="submit">Create User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
      </Dialog>
    </div>
  );
}
