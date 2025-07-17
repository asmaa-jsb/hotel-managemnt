import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import { usePayBooking } from "@/utils/Hooks/Hooks";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { mutateAsync } = usePayBooking();
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((prev) => prev + 1);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement("address");

    if (!cardElement) return;

    const addressDetails = await addressElement?.getValue();
    const { token, error } = await stripe.createToken(cardElement);

    if (error || !token) return;

    await mutateAsync({
      bookingId: "68797c3fccc448ef85a039b3",
      token: token.id,
    });
    handleNext();
  };

  return (
    <Container maxWidth="sm" sx={{ my: 20 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Room Booking Payment
        </Typography>

        <Stepper activeStep={step} alternativeLabel sx={{ my: 3 }}>
          {["Address", "Payment Info", "Confirmation"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 0 && (
          <>
            <AddressElement options={{ mode: "billing" }} />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleNext}
            >
              Next
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handlePayment}
            >
              Pay Now
            </Button>
          </>
        )}

        {step === 2 && (
          <Typography color="success.main" variant="h6">
            ✅ Payment Successful! Your booking is confirmed.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CheckoutForm;
