import { memo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "../../redux/feature/cartSlice";
import { useDispatch } from "react-redux";

const PaymentSuccess = memo(function PaymentSuccess() {
  const dispatch = useDispatch();
  const amount = useSearchParams();
  const navigate = useNavigate();

  useEffect(
    function redirectAfterInterval() {
      // we are clearing cart here because stripe success loads later after order api calls and strip does not let cart clear during that time before naviagtion to success screen
      if (Number(amount[0].get("amount")) <= 0) {
        navigate("/");
      }
      dispatch(clearCart());
    },
    [navigate]
  );
  return (
    <section className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl text-secondary">
          You successfully purchased your order
        </h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount[0].get("amount")}
        </div>
      </div>
    </section>
  );
});

export default PaymentSuccess;
