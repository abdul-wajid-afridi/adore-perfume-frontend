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
import {
  useGetAllCategory,
  QueryKeys,
} from "../../../../api/categories/queries";
import {
  asyncAddCategory,
  asyncDeleteCategory,
  asyncEditCategory,
  TCategoryResponse,
} from "../../../../api/categories/fetchers";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CategoryPage = memo(function CategoryPage() {
  const { isLoading, data } = useGetAllCategory();
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: asyncDeleteCategory,
    onMutate: async (categoryId: number) => {
      queryClient.setQueryData([QueryKeys.CATEGORY], (old: any) =>
        old.filter((category: any) => category.id !== categoryId)
      );
    },

    onSuccess: () => {
      toast.success("category deleted successful");
    },
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [editCategory, setEditCategory] = useState<TCategoryResponse | null>(
    null
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TCategoryResponse>[] = [
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;

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
                onClick={() => deleteCategoryMutation.mutate(category.id!)}
              >
                <Trash className="mr-2 " /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-primary"
                onClick={() => {
                  setEditCategory(category);
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
      <CategoryForm
        setEditCategory={setEditCategory}
        editCategory={editCategory!}
      />
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

const CategorySchema = z.object({
  name: z.string().min(3, "category must be greater then 3 character"),
});

type FormValues = z.infer<typeof CategorySchema>;

type TCategoryFormProps = {
  editCategory: TCategoryResponse;
  setEditCategory: Dispatch<SetStateAction<TCategoryResponse>>;
};
const CategoryForm = memo(function Form(props: TCategoryFormProps) {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: asyncAddCategory,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.CATEGORY] });
    },
  });

  const editCategoryMutation = useMutation({
    mutationFn: asyncEditCategory,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.CATEGORY] });
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
    resolver: zodResolver(CategorySchema),
  });
  console.log(props.editCategory);

  useEffect(
    function setEditCategoryDataOnMount() {
      if (props.editCategory) {
        reset({
          name: props.editCategory.name,
        });
      }
    },
    [props.editCategory, reset]
  );
  return (
    <form
      className="grid place-items-center"
      onSubmit={handleSubmit(
        useCallback(
          async function submitCategoryForm(category: FormValues) {
            if (props.editCategory) {
              editCategoryMutation.mutate({
                id: props.editCategory.id,
                name: category.name,
              });
              props.setEditCategory(null as any);
              reset({
                name: "",
              });
            } else {
              categoryMutation.mutate(category);
              reset();
            }
          },
          [
            categoryMutation.mutate,
            editCategoryMutation.mutate,
            props.editCategory,
          ]
        )
      )}
    >
      <div className="flex flex-col sm:w-1/2 w-full gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md">
        <Input {...register("name")} placeholder="Add Category" />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}

        <Button type="submit">
          {categoryMutation.isPending ? (
            <Loader color="bg-secondary" />
          ) : props.editCategory ? (
            "Edit Category"
          ) : (
            "Add Category"
          )}
        </Button>
      </div>
    </form>
  );
});

export default CategoryPage;
