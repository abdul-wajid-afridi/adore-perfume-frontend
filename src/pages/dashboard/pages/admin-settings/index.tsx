import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";

import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import Loader from "../../../../components/loader";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { QueryKeys, useGetAllUsers } from "../../../../api/user/queries";
import {
  asyncCreateUsers,
  asyncDeleteUser,
  asyncUpdateUser,
  TUser,
} from "../../../../api/user/fetchers";

const AdminSettingsPage = memo(function AdminSettingsPage() {
  const { isLoading, data } = useGetAllUsers();
  const queryClient = useQueryClient();

  const deleteUsersMutation = useMutation({
    mutationFn: asyncDeleteUser,
    onMutate: async (userId: number) => {
      queryClient.setQueryData([QueryKeys.USERS], (old: TUser[]) => {
        return old.filter((user: TUser) => user.id !== userId);
      });
    },
    onSuccess: () => {
      toast.success("user deleted successful");
    },
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [editUser, setEditUser] = useState<TUser | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },

    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phoneNo",
      header: "PhoneNo",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("phoneNo")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => deleteUsersMutation.mutate(user.id!)}
              >
                <Trash className="mr-2 " /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-primary"
                onClick={() => {
                  setEditUser(user);
                  window.scroll({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                <Pencil className="mr-2 " />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
  });

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <Loader size="big" />
      </div>
    );
  }

  return (
    <div>
      <UserForm setEditUser={setEditUser} editUser={editUser!} />
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter Name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
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
              {data?.length ? (
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
                    colSpan={data?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </div>
  );
});

const userSchema = z.object({
  name: z.string().min(3, "Name must be greater then 3 character"),
  email: z.string().email(),
  password: z.string().min(6, "password must be greater then 6 character"),
  phoneNo: z.string().min(7, "phoneNo must be greater then 7 character"),
});

type FormValues = z.infer<typeof userSchema>;

type TUserFormProps = {
  editUser: TUser;
  setEditUser: Dispatch<SetStateAction<TUser | null>>;
};
const UserForm = memo(function Form(props: TUserFormProps) {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: asyncCreateUsers,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.USERS] });
    },
  });

  const editUserMutation = useMutation({
    mutationFn: asyncUpdateUser,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.USERS] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(userSchema),
  });

  useEffect(
    function setEditUserDataOnMount() {
      if (props?.editUser) {
        reset({
          name: props?.editUser.name,
          email: props?.editUser.email,
          phoneNo: props?.editUser.phoneNo,
        });
      }
    },
    [props?.editUser, reset]
  );
  return (
    <form
      className="grid place-items-center"
      onSubmit={handleSubmit(
        useCallback(
          async function submitUserForm(user: FormValues) {
            if (props?.editUser) {
              editUserMutation.mutate({
                userID: Number(props?.editUser.id),
                data: user,
              });
              props.setEditUser(null as any);
              reset({
                name: "",
                email: "",
                password: "",
                phoneNo: "",
              });
            } else {
              addUserMutation.mutate(user);
              reset();
            }
          },
          [addUserMutation.mutate, editUserMutation.mutate, props?.editUser]
        )
      )}
    >
      <div className="flex flex-col sm:w-1/2 w-full gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md">
        <Input {...register("name")} placeholder="user name" />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
        <Input {...register("email")} placeholder="user email" />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
        <Input {...register("password")} placeholder="user password" />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <Input {...register("phoneNo")} placeholder="user phoneNo" />
        {errors.phoneNo && (
          <p className="text-red-500 text-xs">{errors.phoneNo.message}</p>
        )}

        <Button type="submit">
          {addUserMutation.isPending ? (
            <Loader color="bg-secondary" />
          ) : props?.editUser ? (
            "Edit User"
          ) : (
            "Add User"
          )}
        </Button>
      </div>
    </form>
  );
});

export default AdminSettingsPage;
