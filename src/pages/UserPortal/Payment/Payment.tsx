import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

const Payment = () => {
  const { bookingId } = useParams();
  console.log(bookingId);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm bookingId={bookingId as string} />
    </Elements>
  );
};

export default Payment;
