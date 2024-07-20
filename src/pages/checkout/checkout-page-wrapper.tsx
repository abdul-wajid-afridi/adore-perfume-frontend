import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../hooks/hook";
import convertToSubCurrency from "../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from ".";

const STRIPE_PROMISE = loadStripe(
  "pk_test_51MH7rjLByWH0aUrU6BBN1LgamEmujwXmezM5avT85R1vL5RIUZ86LhQFjO9kv82bxsD14ffOnukEvb7b1g7BMTWZ009ErC9TTi"
);

const CheckoutPage = () => {
  const { total: amount } = useAppSelector((state) => state.cart);

  const OPTIONS = {
    mode: "payment",
    amount: convertToSubCurrency(amount),
    currency: "usd",
  } as const;

  return (
    <Elements stripe={STRIPE_PROMISE} options={OPTIONS}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
