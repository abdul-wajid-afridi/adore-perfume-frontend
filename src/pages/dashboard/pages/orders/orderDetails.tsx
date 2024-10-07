import { memo } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constants/urls";
import Navigation from "../../../../components/Navigation";
import { QueryKeys, useGetOrdersById } from "../../../../api/orders/queries";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../../components/ui/navigation-menu";
import { List } from "lucide-react";
import { asyncUpdateOrdersStatus } from "../../../../api/orders/fetchers";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AdminOrderDetails = memo(function AdminOrderDetails() {
  const { orderId } = useParams();
  const { data } = useGetOrdersById(Number(orderId)) as any;
  console.log(data);

  // const productWithImages = data?.products?.map((it) => it.product);
  const queryClient = useQueryClient();

  const updateOrderReviewsMutation = useMutation({
    mutationFn: asyncUpdateOrdersStatus,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.ORDERS] });
      toast.success("order status updated successful");
    },
  });

  return (
    <section className="flex flex-col px-5 py-10 relative">
      <Navigation url="/dashboard/orders" />
      <div className="flex justify-between">
        <Button className="w-fit">{data?.status}</Button>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <List className="mr-3" />
                Change Order status
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <div className="w-[230px] flex flex-col border rounded-md text-center">
                    <button
                      className="p-3 bg-slate-50 hover:bg-slate-200"
                      onClick={() =>
                        updateOrderReviewsMutation.mutate({
                          status: "PENDING",
                          id: data?.id,
                        })
                      }
                    >
                      PENDING
                    </button>
                    <button
                      className="p-3 bg-slate-50 hover:bg-slate-200"
                      onClick={() =>
                        updateOrderReviewsMutation.mutate({
                          status: "OUT_FOR_DELIVERY",
                          id: data?.id,
                        })
                      }
                    >
                      OUT FOR DELIVERY
                    </button>
                    <button
                      className="p-3 bg-slate-50 hover:bg-slate-200"
                      onClick={() =>
                        updateOrderReviewsMutation.mutate({
                          status: "DELIVERED",
                          id: data?.id,
                        })
                      }
                    >
                      DELIVERED
                    </button>
                    <button
                      className="p-3 bg-slate-50 hover:bg-slate-200"
                      onClick={() =>
                        updateOrderReviewsMutation.mutate({
                          status: "CANCELLED",
                          id: data?.id,
                        })
                      }
                    >
                      CANCELLED
                    </button>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-col">
        <h2 className="my-4">client details</h2>

        <div className="flex">
          <div className="flex flex-col shadow-md w-fit p-3 rounded-md text-slate-500 text-sm gap-2">
            <p>name:{data?.client?.name}</p>
            <p>email:{data?.client?.email}</p>
            <p>phoneNo:{data?.client?.phoneNo}</p>
            <p>address:{data?.address}</p>
            <p className="text-primary">Total Amount:{data?.netAmount}</p>
          </div>
        </div>

        <h2 className="my-4">product details</h2>
        <div className="flex flex-col gap-5 divide-y-2 divide-primary">
          {data?.products?.map((prod, ind) => {
            console.log("prod", prod);

            return (
              <div className="flex flex-col shadow-md w-fit p-3 rounded-md text-slate-500 text-sm">
                <p>name:{prod?.product?.name}</p>
                <p>price:${prod?.product?.price}</p>
                <p>Quantity:{prod?.quantity}</p>
                <p>{prod?.product?.description}</p>
                <div className="flex gap-2">
                  {prod?.product?.productImage?.map((it) => (
                    <img
                      src={`${BASE_URL}/${it?.image}`}
                      className="h-20 w-20 rounded-md hover:shadow-md hover:scale-105"
                    />
                  ))}
                </div>
                <div className="border-t-2 my-2">
                  {prod?.packing && (
                    <>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-center text-primary">
                            customization
                          </p>
                          <p>{prod?.packing?.name}</p>
                          <p>price : {prod?.packing?.price}</p>
                          <p
                            style={{ background: prod?.packing?.color }}
                            className="h-10 w-20 rounded-md"
                          />
                        </div>
                        <img
                          src={`${BASE_URL}/${prod?.packing?.image}`}
                          className="h-20 w-20 rounded-md"
                          alt=""
                        />
                      </div>
                      <div className="my-5 flex flex-col">
                        <p className="text-gray-400">
                          customization Names for products
                        </p>
                        {prod?.packing?.productPacking?.map((pack) => (
                          <p className="p-2 bg-slate-50 rounded-lg m-2">
                            {pack?.name}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <h2 className="my-4">Gift Box details</h2>
        <div className="flex flex-col w-full sm:w-1/3 h-[300px] mt-5 sm:mt-0 text-slate-800 capitalize gap-3">
          {data?.products?.map((item, ind) => {
            return (
              <div className="flex flex-col shadow-md w-fit p-3 rounded-md text-slate-500 text-sm">
                <p>name:{item?.giftBox?.name}</p>
                <p>price:${item?.giftBox?.price}</p>
                <p>stock:{item?.giftBox?.stock}</p>
                <p>{item?.giftBox?.description}</p>
                <div className="flex gap-2">
                  <img
                    src={`${BASE_URL}/${item?.giftBox?.image}`}
                    className="h-20 w-20 rounded-md hover:shadow-md hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default AdminOrderDetails;
