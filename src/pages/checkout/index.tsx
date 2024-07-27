import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { CartProducts } from "../cart";

import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "../../lib/convertToSubcurrency";
import { API_URL } from "../../redux/urlConfig";
import { useAppSelector } from "../../hooks/hook";
import { calculateTotal } from "../../redux/feature/cartSlice";
import { useDispatch } from "react-redux";
import Loader from "../../components/loader";
import { HOSTING_URL } from "../../constants/urls";
import { loadStripe } from "@stripe/stripe-js";
import { asyncCreateOrders } from "../../api/orders/fetchers";
import { useNavigate } from "react-router-dom";
import useCurrency from "../../hooks/useCurrency";

const cartItemSchema = z.object({
  quantity: z.number(),
  id: z.number(),
});

const clientOrderSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, "name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "city is required"),
  phoneNo: z.string().optional(),
  amount: z.number(),
  cartItems: z.array(cartItemSchema),
});

type FormValues = z.infer<typeof clientOrderSchema>;
const CheckoutForm = memo(function CheckoutPage() {
  const { total: amount, cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const RANGE: number = 4000;

  // if i remove numbers then js consider this as boolean and will return 1 as the range is greater then 400 so 1 extra $,pkr AED will be charged which is a bug
  const SHIPPING_PRICE = amount > RANGE ? Number(0) : Number(10);
  const TOTAL_AMOUNT = SHIPPING_PRICE + amount;

  const [sign, totalAmount] = useCurrency(TOTAL_AMOUNT);
  const {
    register,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(clientOrderSchema),
  });

  const handleStripePayment = async () => {
    setLoading(true);

    if (!elements) {
      return;
    }
    if (!stripe) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const response = await API_URL.post("/api/v1/create-payment-intent", {
      amount: convertToSubCurrency(TOTAL_AMOUNT),
    });

    const clientSecret = response.data.clientSecret;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: `${HOSTING_URL}/payment-success?amount=${TOTAL_AMOUNT}`,
      },
    });

    setLoading(false);
    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }
  };

  useEffect(
    function calculateTotalCartAmountOnMount() {
      dispatch(calculateTotal());
    },
    [dispatch]
  );

  const navigate = useNavigate();

  useEffect(
    function redirectAfterInterval() {
      if (Number(amount) <= 0) {
        navigate("/");
      }
    },
    [amount, navigate]
  );

  const createOrderMutation = useMutation({
    mutationFn: asyncCreateOrders,
    onSuccess: () => {
      reset();
    },
  });

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="big" />
      </div>
    );
  }

  return (
    <section className="grid lg:grid-cols-3">
      <form
        className="flex flex-col lg:col-span-2 gap-4 border p-5 md:p-10 my-10 rounded-md shadow-md"
        onSubmit={(eve) => {
          eve.preventDefault();

          const name = getValues("name");
          const email = getValues("email");
          const phoneNo = getValues("phoneNo");
          const city = getValues("city");
          const country = getValues("country");
          const address = getValues("address");

          createOrderMutation.mutate({
            name,
            email,
            phoneNo: phoneNo!,
            city,
            country,
            address,
            amount: TOTAL_AMOUNT,
            cartItems: cartItems as any,
          });

          handleStripePayment();
        }}
      >
        <Input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input {...register("name")} placeholder="Full name" />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input {...register("address")} placeholder="Address" />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input {...register("city")} placeholder="City" />
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Input {...register("country")} placeholder="Country" />
            {errors.country && (
              <p className="text-red-500 text-xs">{errors.country.message}</p>
            )}
          </div>
        </div>
        <Input {...register("phoneNo")} placeholder="Phone No" />
        {errors.phoneNo && (
          <p className="text-red-500 text-xs">{errors.phoneNo.message}</p>
        )}
        <PaymentElement />
        <Button type="submit" disabled={!stripe || !elements}>
          {loading ? (
            <Loader color="bg-secondary" />
          ) : (
            `Pay  ${sign}   ${totalAmount}`
          )}
        </Button>
      </form>
      <CartProducts />
      {errorMessage && <div>{errorMessage}</div>}
    </section>
  );
});

const STRIPE_PROMISE = loadStripe(
  "pk_test_51MH7rjLByWH0aUrU6BBN1LgamEmujwXmezM5avT85R1vL5RIUZ86LhQFjO9kv82bxsD14ffOnukEvb7b1g7BMTWZ009ErC9TTi"
);

const CheckoutPage = () => {
  const { total: amount } = useAppSelector((state) => state.cart);

  const RANGE: number = 4000;

  // if i remove numbers then js consider this as boolean and will return 1 as the range is greater then 400 so 1 extra $,pkr AED will be charged which is a bug
  const SHIPPING_PRICE = amount > RANGE ? Number(0) : Number(10);
  const TOTAL_AMOUNT = SHIPPING_PRICE + amount;

  const OPTIONS = {
    mode: "payment",
    amount: convertToSubCurrency(TOTAL_AMOUNT),
    currency: "usd",
  } as const;

  return (
    <Elements stripe={STRIPE_PROMISE} options={OPTIONS}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
