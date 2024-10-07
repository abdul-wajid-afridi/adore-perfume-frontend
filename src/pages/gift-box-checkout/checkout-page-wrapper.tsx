// import { loadStripe } from "@stripe/stripe-js";
// import { useAppSelector } from "../../hooks/hook";
// import convertToSubCurrency from "../../lib/convertToSubcurrency";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from ".";

// const STRIPE_PROMISE = loadStripe(
//   "pk_test_51PzfkjLKCATua0ARig8Kc0c7vM6EkRtIMstFWjLXmJ9raqIqMNYV8uO4vUjRhkKO28acI4ZpMftwRPn67FXnVZXG00IIclWOWJ"
// );

// const GiftBoxCheckoutPage = () => {
//   const { total: amount } = useAppSelector((state) => state.cart);

//   const OPTIONS = {
//     mode: "payment",
//     amount: convertToSubCurrency(amount),
//     currency: "usd",
//   } as const;

//   return (
//     <Elements stripe={STRIPE_PROMISE} options={OPTIONS}>
//       // we Don;t need the wrapper we will remove it latter and cleanup code
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default GiftBoxCheckoutPage;
