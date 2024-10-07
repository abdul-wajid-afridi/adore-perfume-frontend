import { memo, useCallback, useEffect, useState } from "react";
import Loader from "../../components/loader";
import { BASE_URL } from "../../constants/urls";
import PageBanner from "../../components/banner";
import { useGetGiftBoxById } from "../../api/gift-box/queries";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCurrency from "../../hooks/useCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  addToGiftBoxCart,
  calculateGiftBoxTotal,
  removeGiftBoxItemFromCart,
} from "../../redux/feature/giftBoxCartSlice";
import { Input } from "../../components/ui/input";

const GiftBoxDetailPage = memo(function GiftBoxDetailPage() {
  const { giftBoxId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetGiftBoxById(Number(giftBoxId));
  const [currency, currencyRate] = useCurrency(Number(data?.price));

  const [description, setDescription] = useState("");

  const { total: amount, giftBoxCartItems } = useAppSelector(
    (state) => state.giftBoxCart
  );
  const [quantity, setQuantity] = useState<number | undefined>();

  useEffect(() => {
    if (giftBoxCartItems?.length) {
      setQuantity(
        giftBoxCartItems.find((cart) => cart.id === data?.id)?.quantity
      );
    }
  }, [setQuantity, giftBoxCartItems, data?.id]);

  const dispatch = useAppDispatch();

  const storeDescriptionAndRedirectToCheckout = useCallback(() => {
    localStorage.setItem("description", description);
    navigate("/gift-box-checkout");
  }, [navigate, description]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="big" />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <PageBanner bannerImages="/banner/car.jpg" title="Gift Boxes" />
      {!data && <h2 className="my-10">No products found</h2>}
      <div className="grid justify-center gap-5 grid-cols-1 md:grid-cols-2 px-5 sm:px-10 my-10">
        <div className="h-[50vh] w-full">
          <img
            src={`${BASE_URL}/${data?.image}`}
            className="h-[50vh] w-full"
            alt=""
          />
        </div>
        <div>
          <div className="flex flex-col justify-center w-full mt-5 sm:mt-0 text-slate-800 capitalize gap-3">
            <h2 className="text-start border-b-2">{data?.name}</h2>
            <Button className="w-fit" disabled>
              {data?.ml}
            </Button>

            <p>
              {currency}:{currencyRate}
            </p>
            <p>
              <span className="text-slate-500">stock: </span>
              {data?.stock}
            </p>

            <p>
              <span className="text-slate-500">Description: </span>
              {data?.description}
            </p>
            <div className="flex items-center gap-3">
              <Button
                className="w-fit"
                onClick={() => {
                  dispatch(removeGiftBoxItemFromCart(Number(data?.id)));
                  dispatch(calculateGiftBoxTotal());
                }}
              >
                - <ShoppingCart />
              </Button>

              <p>{quantity}</p>

              <Button
                className="w-fit"
                onClick={() => {
                  dispatch(addToGiftBoxCart(data!));
                  dispatch(calculateGiftBoxTotal());
                }}
              >
                + <ShoppingCart />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <Input
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button onClick={storeDescriptionAndRedirectToCheckout}>
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GiftBoxDetailPage;
