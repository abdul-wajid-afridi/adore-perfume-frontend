import { memo, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [index, setIndex] = useState(0);
  console.log(data);

  const productWithImages = data?.products?.map((it) => it.product);
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
            <p>name:{data?.client?.email}</p>
            <p>name:{data?.client?.phoneNo}</p>
            <p>address:{data?.address}</p>
          </div>
        </div>

        <h2 className="my-4">product details</h2>
        <div className="flex flex-col gap-5 divide-y-2 divide-primary">
          {productWithImages?.map((prod, ind) => {
            return (
              <div className="flex flex-col shadow-md w-fit p-3 rounded-md text-slate-500 text-sm">
                <p>name:{prod.name}</p>
                <p>price:${prod.price}</p>
                <p>{prod.description}</p>
                <div className="flex gap-2">
                  {prod.productImage?.map((it) => (
                    <img
                      onClick={() => setIndex(ind)}
                      src={`${BASE_URL}/${it?.image}`}
                      className="h-20 w-20 rounded-md hover:shadow-md hover:scale-105"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="flex flex-col w-full sm:w-1/3 h-[300px] mt-5 sm:mt-0 text-slate-800 capitalize gap-3">
          <p className="font-bold">
            <span className="text-slate-500">Name: </span>
            {data?.name}
          </p>
          <p>${data?.price}</p>
          <p>
            <span className="text-slate-500">stock: </span>
            {data?.stock}
          </p>
          <p>
            <span className="text-slate-500">category: </span>
            {data?.category?.name}
          </p>
          <p>
            <span className="text-slate-500">Description: </span>
            {data?.description}
          </p>
        </div> */}
      </div>
    </section>
  );
});

export default AdminOrderDetails;
