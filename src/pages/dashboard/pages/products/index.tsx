import { memo, useState } from "react";
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
  ArrowBigRight,
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
import { QueryKeys, useGetAllProducts } from "../../../../api/products/queries";
import {
  asyncDeleteProduct,
  TProductResponse,
} from "../../../../api/products/fetchers";
import { BASE_URL } from "../../../../constants/urls";
import Loader from "../../../../components/loader";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const Products = memo(function Products() {
  const { isLoading, data } = useGetAllProducts();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteProductMutation = useMutation({
    mutationFn: asyncDeleteProduct,
    onMutate: async (productId: number) => {
      queryClient.setQueryData(
        // this key must be equal to which query you want to get data of such as getAllProducts()
        [QueryKeys.PRODUCTS, "useGetAllProducts"],
        (old: any) => old.filter((product: any) => product.id !== productId)
      );
    },

    onError: (error) => {
      console.log("something went wrong", error);
    },
    onSuccess: () => {
      toast.success("product deleted successful");
    },
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TProductResponse>[] = [
    {
      id: "select",
      header: () => <p>Image</p>,
      cell: ({ row }: any) => (
        <img
          src={`${BASE_URL}/${row.original.productImage[0]?.image}`}
          className="h-20 w-20"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("stock")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));

        // Format the price as a dollar price
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

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
                onClick={() => {
                  deleteProductMutation.mutate(product.id!);
                }}
                // onClick={() => navigator.clipboard.writeText(product.id!)}
              >
                <Trash className="mr-2 " /> Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-primary"
                onClick={() =>
                  navigate("/dashboard/edit-product/" + product.id)
                }
              >
                <Pencil className="mr-2 " />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate("/dashboard/product-details/" + product.id)
                }
                className="text-primary"
              >
                <ArrowBigRight /> View Product details
              </DropdownMenuItem>
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
        <Link to="/dashboard/add-product" className="ml-5">
          <Button>Add Product</Button>
        </Link>
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
                <TableCell colSpan={data?.length} className="h-24 text-center">
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
  );
});

export default Products;
