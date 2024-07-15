import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  asyncAddProduct,
  asyncEditProduct,
  TProductResponse,
} from "../../../../api/products/fetchers";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../../components/ui/select";
import { useGetAllCategory } from "../../../../api/categories/queries";
import { useNavigate } from "react-router-dom";
import Navigation from "../../../../components/Navigation";

const addProductSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 character(s)").max(20),
  description: z
    .string()
    .min(3, "Description must contain at least 3 character(s)")
    .max(250),
  price: z.coerce
    .number()
    .int()
    .min(1, "Price must be greater than or equal to 1"),
  stock: z.coerce
    .number()
    .int()
    .min(1, "Stock must be greater than or equal to 1"),
  categoryId: z.coerce.number(),
  ml: z.string().min(1, "Ml must be greater than or equal to 1"),
  image: z.any(),
});

type FormValues = z.infer<typeof addProductSchema>;
type TAddProductProps = { data?: TProductResponse };
const AddProduct = memo(function AddProduct(props: TAddProductProps) {
  const { data } = useGetAllCategory();

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      categoryId: 1,
      description: "",
      name: "",
      ml: "",
      price: 0,
      stock: 0,
    },
    resolver: zodResolver(addProductSchema),
  });

  useEffect(
    function fillProductFormWithEditDataOnMount() {
      if (props.data) {
        reset({
          name: props.data?.name,
          description: props.data?.description,
          stock: props.data?.stock,
          price: props.data?.price,
          ml: props.data?.ml,
          categoryId: props.data.category?.id,
          image: [],
        });
      }
    },
    [props.data, reset]
  );

  const addProductMutation = useMutation({
    mutationFn: asyncAddProduct,
    onSuccess: () => {
      reset();
      navigate("/dashboard/products");
    },
  });

  const editProductMutation = useMutation({
    mutationFn: asyncEditProduct,
    onSuccess: () => {
      reset();
      navigate("/dashboard/products");
    },
  });

  return (
    <form
      className="flex justify-center items-center relative"
      onSubmit={handleSubmit(
        useCallback(
          async function submitProduct(product: FormValues) {
            const formData = new FormData();

            formData.append("categoryId", product.categoryId as any);
            formData.append("description", product.description);
            formData.append("name", product.name);
            formData.append("ml", product.ml);
            formData.append("price", product.price as any);
            formData.append("stock", product.stock as any);
            Array.from(product.image).forEach((file: any) => {
              formData.append("image", file);
            });

            if (props.data) {
              editProductMutation.mutate({
                formData: formData,
                id: props.data?.id,
              } as any);
            } else {
              addProductMutation.mutate(formData as any);
            }
          },
          [addProductMutation, editProductMutation, props.data]
        )
      )}
    >
      <Navigation url="/dashboard/products" />
      <div className="flex flex-col gap-4 w-full lg:w-1/2 border mx-5 p-5 md:p-10 my-10 rounded-md shadow-md">
        <Input {...register("name")} placeholder="First name" />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}

        <Input {...register("description")} placeholder="Description" />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}

        <Input {...register("price")} placeholder="Price" />
        {errors.price && (
          <p className="text-red-500 text-xs">{errors.price.message}</p>
        )}
        <Input {...register("stock")} placeholder="Stock" />
        {errors.stock && (
          <p className="text-red-500 text-xs">{errors.stock.message}</p>
        )}

        <Select
          // defaultValue={props.data ? props.data?.categoryId : undefined}
          onValueChange={(value: string) => {
            setSelectedCategory(
              data?.find((it) => it.id === Number(value))?.name as string
            );
            setValue("categoryId", Number(value));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <p className="text-xs text-slate-500 font-semibold">
              {selectedCategory}
            </p>
            {/* <SelectValue placeholder={"selectedCategory"} /> */}
          </SelectTrigger>
          <SelectContent>
            {data?.map((it) => (
              <div key={it.id}>
                <SelectItem value={it.id! as any}>{it.name}</SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>

        {errors.categoryId && (
          <div className="text-red-500">{errors.categoryId.message}</div>
        )}

        <Input {...register("ml")} placeholder="Ml" />
        {errors.ml && (
          <p className="text-red-500 text-xs">{errors.ml.message}</p>
        )}

        <Input
          type="file"
          multiple
          {...register("image")}
          placeholder="Image"
        />
        {errors.image && (
          <p className="text-red-500 text-xs">
            {errors.image.message?.toString()}
          </p>
        )}
        <Button type="submit">
          {isSubmitting ? (
            <Loader color="bg-secondary" />
          ) : props.data ? (
            "Edit Product"
          ) : (
            "Add Product"
          )}
        </Button>
      </div>
    </form>
  );
});

export default AddProduct;
