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
import { useGetAllTaste, QueryKeys } from "../../../../api/taste/queries";
import {
  asyncAddTaste,
  asyncDeleteTaste,
  asyncEditTaste,
  TTasteResponse,
} from "../../../../api/taste/fetchers";
import { BASE_URL } from "../../../../constants/urls";

const AdminTastePage = memo(function AdminTastePage() {
  const { isLoading, data } = useGetAllTaste();

  const queryClient = useQueryClient();

  const deleteTasteMutation = useMutation({
    mutationFn: asyncDeleteTaste,
    onMutate: async (tasteId: number) => {
      queryClient.setQueryData([QueryKeys.TASTE], (old: TTasteResponse[]) => {
        return old.filter((taste) => taste.id !== tasteId);
      });
    },

    onSuccess: () => {
      toast.success("taste deleted successful");
    },
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [editTaste, setEditTaste] = useState<TTasteResponse | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TTasteResponse>[] = [
    {
      id: "image",
      header: () => <p>Image</p>,
      cell: ({ row }) => (
        <img src={`${BASE_URL}/${row?.original.image}`} className="h-20 w-20" />
      ),
      enableSorting: false,
      enableHiding: false,
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const taste = row.original;

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
                onClick={() => deleteTasteMutation.mutate(taste.id!)}
              >
                <Trash className="mr-2 " /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-primary"
                onClick={() => {
                  setEditTaste(taste);
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
      <TasteForm setEditTaste={setEditTaste} editTaste={editTaste!} />
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

const tasteSchema = z.object({
  name: z.string().min(3, "taste must be greater then 3 character"),
  image: z.any(),
});

type FormValues = z.infer<typeof tasteSchema>;

type TTasteFormProps = {
  editTaste: TTasteResponse;
  setEditTaste: Dispatch<SetStateAction<TTasteResponse | null>>;
};
const TasteForm = memo(function Form(props: TTasteFormProps) {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addTasteMutation = useMutation({
    mutationFn: asyncAddTaste,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.TASTE] });
    },
  });

  const editTasteMutation = useMutation({
    mutationFn: asyncEditTaste,
    onSuccess: () => {
      // always make it simillar to the exact fecthing data query key
      queryClient.refetchQueries({ queryKey: [QueryKeys.TASTE] });
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
    resolver: zodResolver(tasteSchema),
  });

  useEffect(
    function setEditTasteDataOnMount() {
      if (props?.editTaste) {
        reset({
          name: props?.editTaste.name,
        });
      }
    },
    [props?.editTaste, reset]
  );
  return (
    <>
      <h2>scents</h2>
      <form
        className="grid place-items-center"
        onSubmit={handleSubmit(
          useCallback(
            async function submitTasteForm(taste: FormValues) {
              console.log("taste data", taste);

              const formData = new FormData();
              formData.append("name", taste.name);
              formData.append("image", taste.image[0]);

              if (props?.editTaste) {
                editTasteMutation.mutate({
                  id: props.editTaste.id!,
                  formData: formData as any,
                });
                props.setEditTaste(null as any);
                reset({
                  name: "",
                  image: null,
                });
              } else {
                addTasteMutation.mutate(formData as any);
                reset();
              }
            },
            [addTasteMutation, editTasteMutation, props, reset]
          )
        )}
      >
        <div className="flex flex-col sm:w-1/2 w-full gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md">
          <Input {...register("name")} placeholder="Add taste" />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

          <Input {...register("image")} placeholder="Add image" type="file" />

          <Button type="submit">
            {addTasteMutation.isPending ? (
              <Loader color="bg-secondary" />
            ) : props?.editTaste ? (
              "Edit Taste"
            ) : (
              "Add Taste"
            )}
          </Button>
        </div>
      </form>
    </>
  );
});

export default AdminTastePage;
