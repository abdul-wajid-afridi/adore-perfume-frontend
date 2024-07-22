import { memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  addToCart,
  calculateTotal,
  removeItemFromCart,
  TCartItem,
} from "../../redux/feature/cartSlice";
import { CheckCircleIcon, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { BASE_URL } from "../../constants/urls";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import useCurrency from "../../hooks/useCurrency";
import { useDispatch } from "react-redux";

const CartPage = memo(function CartPage() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(
    function calculateTotalCartAmountOnMount() {
      dispatch(calculateTotal());
    },
    [dispatch]
  );
  return (
    <>
      <div className="my-10 ">
        {cartItems?.length ? (
          <h2 className="flex items-center justify-center gap-5">
            your cart
            <ShoppingCart />
          </h2>
        ) : (
          <Link to="/">
            <h2 className="flex items-center justify-center gap-5 animate-pulse">
              your cart
              <ShoppingCart /> is empty
            </h2>
          </Link>
        )}
      </div>

      <div className="w-ful">
        {cartItems?.length ? <CartProducts quantity={true} /> : ""}
        <div className="flex justify-end gap-4 my-10 mr-5">
          <Button
            onClick={useCallback(() => {
              navigate("/");
            }, [navigate])}
          >
            continue to shopping <ShoppingCart />
          </Button>

          {cartItems?.length ? (
            <Button
              onClick={() => {
                navigate("/checkout");
              }}
            >
              proceed to checkout <CheckCircleIcon />
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
});

type TCartProductsProps = {
  quantity?: boolean;
};
export const CartProducts = memo(function CartProducts(
  props: TCartProductsProps
) {
  const { cartItems, total } = useAppSelector((state) => state.cart);

  const RANGE: number = 4000;

  // if i remove numbers then js consider this as boolean and will return 1 as the range is greater then 400 so 1 extra $,pkr AED will be charged which is a bug
  const SHIPPING_PRICE = total > RANGE ? Number(0) : Number(10);

  const [sign, convertedTotal] = useCurrency(total);
  // s and r i am not using due to its the sign only of currency and i have already taken in sign value so no need for extra values
  const [s, convertedShippingPrice] = useCurrency(SHIPPING_PRICE);
  const [r, convertedRange] = useCurrency(RANGE);
  console.log(s, r);

  const dispatch = useAppDispatch();

  useEffect(
    function calculateTotalCartAmountOnMount() {
      dispatch(calculateTotal());
    },
    [dispatch]
  );

  return (
    <div className="rounded-md border w-full">
      <Table>
        {total > RANGE && (
          <TableCaption>
            Your shipping is free as your order is more then {convertedRange}{" "}
            {sign}.
          </TableCaption>
        )}
        <TableCaption>A list of your cart items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            {props.quantity && <TableHead>Quantity</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems?.map((item) => (
            <CartTableCard
              item={item}
              quantity={cartItems?.length ? true : false}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="font-bold text-primary" colSpan={4}>
              Sub Total
            </TableCell>
            <TableCell className="text-right  text-primary">
              <span className="text-xs">{sign}</span>:{convertedTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold text-primary" colSpan={4}>
              Shipping
            </TableCell>
            <TableCell className="text-right  text-primary">
              <span className="text-xs">{sign}</span>:{convertedShippingPrice}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold text-primary" colSpan={4}>
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-primary">
              <span className="text-xs">{sign}</span>:
              {Number(convertedTotal) + Number(convertedShippingPrice)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
});

const CartTableCard = memo(function CartTableCard(props: {
  item: TCartItem;
  quantity: boolean;
}) {
  const dispatch = useDispatch();
  console.log(props);

  const { item, quantity } = props;
  const [sign, currencyValue] = useCurrency(Number(item.price));
  return (
    <TableRow key={item.id}>
      <TableCell>
        <img
          src={`${BASE_URL}/${
            item?.productImage && item?.productImage[0]?.image
          }`}
          className="h-20 w-20"
        />
      </TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>
        <span className="text-xs">{sign}</span>
        {currencyValue}
      </TableCell>
      <TableCell>
        <span className="text-xs">{sign}</span>
        {Number(currencyValue) * item.quantity}
      </TableCell>
      {quantity && (
        <TableCell className="flex items-center gap-1">
          <Button
            onClick={() => {
              dispatch(removeItemFromCart(item.id!));
              dispatch(calculateTotal());
            }}
          >
            -
          </Button>
          {item.quantity}
          <Button
            onClick={() => {
              dispatch(addToCart(item));
              dispatch(calculateTotal());
            }}
          >
            +
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
});

export default CartPage;
