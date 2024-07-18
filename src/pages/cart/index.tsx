import { memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  addToCart,
  calculateTotal,
  removeItemFromCart,
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
      <h2 className="my-10 ">
        {cartItems?.length ? (
          <span className="flex items-center justify-center gap-5">
            your cart
            <ShoppingCart />
          </span>
        ) : (
          <Link to="/">
            <span className="flex items-center justify-center gap-5 animate-pulse">
              your cart
              <ShoppingCart /> is empty
            </span>
          </Link>
        )}
      </h2>

      <div className="w-ful">
        <CartProducts quantity={true} />
        <div className="flex justify-end gap-4 my-10 mr-5">
          <Button
            onClick={useCallback(() => {
              navigate("/");
            }, [navigate])}
          >
            continue to shopping <ShoppingCart />
          </Button>

          <Button
            onClick={useCallback(() => {
              navigate("/checkout");
            }, [navigate])}
          >
            proceed to checkout <CheckCircleIcon />
          </Button>
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
            Your shipping is free as your order is more then {RANGE}$.
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
              <TableCell>${item.price}</TableCell>
              <TableCell>${item.price! * item.quantity}</TableCell>
              {props.quantity && (
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
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="font-bold text-primary" colSpan={4}>
              Sub Total
            </TableCell>
            <TableCell className="text-right  text-primary">${total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold text-primary" colSpan={4}>
              Shipping
            </TableCell>
            <TableCell className="text-right  text-primary">
              ${SHIPPING_PRICE}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold text-primary" colSpan={4}>
              Total
            </TableCell>
            <TableCell className="text-right font-bold text-primary">
              ${total + Number(SHIPPING_PRICE)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
});

export default CartPage;
