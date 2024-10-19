import { memo, useCallback, useState } from "react";
import Modal from "../../components/modal";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../components/ui/sheet";

import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";
import { useGetAllBrand } from "../../api/brand/queries";
import { useSearchProducts } from "../../api/products/queries";
import { useGetAllPacking } from "../../api/packing/queries";
import {
  asyncCustomizeProductPacking,
  asyncUpdatePacking,
} from "../../api/packing/fetchers";
import { BASE_URL } from "../../constants/urls";
import useCurrency from "../../hooks/useCurrency";
import { addToCart } from "../../redux/feature/cartSlice";
import { useAppDispatch } from "../../hooks/hook";
import { TProductResponse } from "../../api/products/fetchers";
import { useNavigate } from "react-router-dom";

const CustomizePage = memo(function CustomizePage() {
  return (
    <div>
      <div className="h-[70vh] w-screen mb-10 sm:mb-20 flex items-center flex-col justify-center bg-[url('/images/create-2.jpg')] bg-cover bg-center aspect-video bg-black/50 bg-blend-overlay">
        <div className="flex justify-center items-center gap-3 sm:gap-5 md:gap-10 h-[50vh] w-screen bg-white/80">
          <div className="flex flex-col justify-center items-center gap-4 h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]">
            <img
              className="h-full w-full"
              src="/customize/step-1.svg"
              alt="step-1"
            />
            <Button disabled>step-1</Button>
            <p className="text-sm">chose brand</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]">
            <img
              className="h-full w-full"
              src="/customize/step-2.svg"
              alt="step-2"
            />
            <Button disabled>step-1</Button>
            <p className="text-sm">chose fragrance</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]">
            <img
              className="h-full w-full"
              src="/customize/step-3.svg"
              alt="step-3"
            />
            <Button disabled>step-1</Button>
            <p className="text-sm">done!</p>
          </div>
        </div>

        <Sheet>
          <SheetTrigger className=" border-2 rounded-md py-2 px-2 mb-[60px] mt-5 sm:my-3 capitalize text-white hover:bg-white/40 hover:text-black transition-all ease-linear">
            customize perfume
          </SheetTrigger>
          <SheetContent className="h-[90vh]" side="bottom">
            <SheetHeader className="h-full">
              <CustomizePageForm />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      {/* <Modal /> */}
    </div>
  );
});

const brandSchema = z.object({
  // lets make it required
  packingId: z.number(),
  productId: z.number(),
  name: z.string().min(1, "name is required"),
});

type FormValues = z.infer<typeof brandSchema>;

const CustomizePageForm = memo(function Form() {
  const [packingId, setPackingId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");

  const queryClient = useQueryClient();
  // const [selectedBrand, setSelectedBrand] = useState<string>("Brand");
  const [selectedProduct, setSelectedProduct] = useState<TProductResponse>();
  const { data, isLoading } = useSearchProducts("", "Fragrances", "", "", "");
  const { data: packingData, isLoading: packingLoading } = useGetAllPacking();

  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { data: brandData } = useGetAllBrand();
  const customizeProductPackingMutation = useMutation({
    mutationFn: asyncCustomizeProductPacking,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["customize-product-packing"] });
    },
  });

  const updatePackingMutation = useMutation({
    mutationFn: asyncUpdatePacking,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["update-packing"] });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(brandSchema),
  });
  console.log(errors);

  return (
    <form
      className="grid place-items-center"
      onSubmit={handleSubmit(
        useCallback(
          async function submitCustomizePageForm(data: FormValues) {
            dispatch(
              addToCart({
                ...selectedProduct!,
                packing: packingData?.find((p) => p.id == packingId),
                // ?.price,
              })
            );
            customizeProductPackingMutation.mutate({
              productId: data.productId,
              packingId: packingId!,
              name: data.name,
            });
            navigate("/cart");
          },
          [
            customizeProductPackingMutation,
            dispatch,
            navigate,
            packingData,
            packingId,
            selectedProduct,
          ]
        )
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          {packingLoading ? (
            <Loader size="default" />
          ) : (
            packingData?.map((packing) => {
              return (
                <div
                  onClick={() => {
                    setPackingId(packing.id);
                    setValue("packingId", packing.id!);
                    setIsOpen(true);
                  }}
                  style={{ background: packing.id == packingId ? color : "" }}
                  className={`flex justify-center items-center flex-col gap-3 rounded-md shadow-sm p-2 border-b border-b-primary overflow-hidden cursor-pointer hover:shadow-md`}
                >
                  <img
                    src={`${BASE_URL}/${packing.image}`}
                    alt="packing image"
                    className="h-[120px] w-[150px] hover:scale-110"
                  />
                  <p>{packing.name}</p>
                  {/* <CustomizePackingPrice price={packing.price} /> */}
                  <Modal
                    mutation={updatePackingMutation as any}
                    id={packingId!}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setColor={setColor}
                  />
                </div>
              );
            })
          )}
        </div>
        {errors.packingId && (
          <div className="text-red-500">{errors.packingId.message}</div>
        )}
      </div>
      <div className="flex flex-col sm:w-1/2 w-full gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md">
        {/* <Select
          // defaultValue={props.data ? props.data?.categoryId : undefined}
          onValueChange={(value: string) => {
            setSelectedBrand(
              brandData?.find((brand) => brand.id === Number(value))
                ?.name as string
            );
            setValue("brandId", Number(value));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <p className="text-xs text-slate-500 font-semibold">
              {selectedBrand}
            </p>
          </SelectTrigger>
          <SelectContent>
            {brandData?.map((brand) => (
              <div key={brand.id}>
                <SelectItem value={brand.id! as any}>{brand.name}</SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>

        {errors.brandId && (
          <div className="text-red-500">{errors.brandId.message}</div>
        )} */}
        <div>
          <Input
            {...register("name")}
            placeholder="Personalize your desire"
            className="border"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        <Select
          // defaultValue={props.data ? props.data?.categoryId : undefined}
          onValueChange={(value: string) => {
            setSelectedProduct(
              data?.find((product) => product.id === Number(value)) as any
              // ?.name as string
            );
            setValue("productId", Number(value));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <p className="text-xs text-slate-500 font-semibold">
              {selectedProduct?.name || "Product"}
            </p>
          </SelectTrigger>
          <div className="flex flex-col">
            <SelectContent>
              <Input
                type="text"
                placeholder="search..."
                className=" border mb-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {isLoading ? (
                <div className="p-5 flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                data
                  ?.filter((it) => {
                    return it.name.toLowerCase().includes(search.toLowerCase());
                  })
                  ?.map((product) => (
                    <div key={product.id}>
                      <SelectItem value={product.id! as any}>
                        {product.name}
                      </SelectItem>
                    </div>
                  ))
              )}
            </SelectContent>
          </div>
        </Select>
        {errors.productId && (
          <div className="text-red-500">{errors.productId.message}</div>
        )}
        <Button type="submit">
          {customizeProductPackingMutation.isPending ? (
            <Loader color="bg-secondary" />
          ) : (
            "Add-To-Cart"
          )}
        </Button>
      </div>
    </form>
  );
});

type TCustomizePackingPriceProps = { price: number };
const CustomizePackingPrice = memo(function CustomizePackingPrice(
  props: TCustomizePackingPriceProps
) {
  const [currency, currencyRate] = useCurrency(props.price);
  return (
    <p>
      {currency}:{currencyRate}
    </p>
  );
});

export default CustomizePage;
