import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../hooks/hook";
import convertToSubCurrency from "../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from ".";

const STRIPE_PROMISE = loadStripe(
  "pk_live_51PzfkjLKCATua0ARTpsl4fBxjkhyCzGmE6nq3GtPeZ6fJJ4Tj5lP7PHZaXjilctknips7KKAeH6oydYrcVpIG1tF00fBpR3NND"
);

const CheckoutPage = () => {
  const { total: amount } = useAppSelector((state) => state.cart);

  const OPTIONS = {
    mode: "payment",
    amount: convertToSubCurrency(amount),
    currency: "usd",
  } as const;

  return (
    // we Don;t need the wrapper we will remove it latter and cleanup code
    <Elements stripe={STRIPE_PROMISE} options={OPTIONS}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
