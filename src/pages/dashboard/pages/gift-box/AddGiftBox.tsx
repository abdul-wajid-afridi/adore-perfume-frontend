import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import Navigation from "../../../../components/Navigation";
import {
  asyncAddGiftBox,
  asyncEditGiftBox,
  TAddGiftBox,
} from "../../../../api/gift-box/fetchers";

const addGiftBoxSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 character(s)").max(20),
  description: z
    .string()
    .min(3, "Description must contain at least 3 character(s)")
    .max(600),
  price: z.coerce.number().min(1, "Price must be greater than or equal to 1"),
  stock: z.coerce
    .number()
    .int()
    .min(1, "Stock must be greater than or equal to 1"),

  ml: z.string().min(1, "Ml must be greater than or equal to 1"),
  image: z.any(),
});

type FormValues = z.infer<typeof addGiftBoxSchema>;
type TAddGiftBoxProps = { data?: TAddGiftBox };
const AddGiftBox = memo(function AddGiftBox(props: TAddGiftBoxProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
      name: "",
      ml: "",
      price: 0,
      stock: 0,
      image: "",
    },
    resolver: zodResolver(addGiftBoxSchema),
  });

  useEffect(
    function fillGiftBoxFormWithEditDataOnMount() {
      if (props.data) {
        reset({
          name: props.data?.name,
          description: props.data?.description,
          stock: props.data?.stock,
          price: props.data?.price,
          ml: props.data?.ml,
        });
      }
    },
    [props.data, reset]
  );

  const addGiftBoxMutation = useMutation({
    mutationFn: asyncAddGiftBox,
    onSuccess: () => {
      reset();
      navigate("/dashboard/gift-box");
    },
  });

  const editGiftBoxMutation = useMutation({
    mutationFn: asyncEditGiftBox,
    onSuccess: () => {
      reset();
      navigate("/dashboard/gift-box");
    },
  });

  return (
    <form
      className="flex justify-center items-center relative"
      onSubmit={handleSubmit(
        useCallback(
          async function submitGiftBox(giftBox: FormValues) {
            const formData = new FormData();

            formData.append("description", giftBox.description);
            formData.append("name", giftBox.name);
            formData.append("ml", giftBox.ml);
            formData.append("price", giftBox.price.toString());
            formData.append("stock", giftBox.stock.toString());
            formData.append("image", giftBox.image[0]);

            if (props.data) {
              editGiftBoxMutation.mutate({
                formData: formData,
                id: props.data?.id,
              } as any);
            } else {
              addGiftBoxMutation.mutate(formData as any);
            }
          },
          [addGiftBoxMutation, editGiftBoxMutation, props.data]
        )
      )}
    >
      <Navigation url="/dashboard/gift-box" />
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

        <Input {...register("ml")} placeholder="Ml" />
        {errors.ml && (
          <p className="text-red-500 text-xs">{errors.ml.message}</p>
        )}

        <Input type="file" {...register("image")} placeholder="Image" />
        {errors.image && (
          <p className="text-red-500 text-xs">
            {errors.image.message?.toString()}
          </p>
        )}
        <Button type="submit">
          {isSubmitting ? (
            <Loader color="bg-secondary" />
          ) : props.data ? (
            "Edit Gift Box"
          ) : (
            "Add Gift Box"
          )}
        </Button>
      </div>
    </form>
  );
});

export default AddGiftBox;
