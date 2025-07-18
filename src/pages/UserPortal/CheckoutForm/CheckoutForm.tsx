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
import styles from "./CheckoutForm.module.css";

interface CheckoutFormProps {
  bookingId: string;
}

const CheckoutForm = ({ bookingId }: CheckoutFormProps) => {
  const stripeInputStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#333",
        letterSpacing: "0.025em",
        fontFamily: "inherit",
        "::placeholder": {
          color: "#999",
        },
      },
      invalid: {
        color: "#e53935",
      },
    },
  };

  const stripe = useStripe();
  const elements = useElements();
  const { mutateAsync } = usePayBooking();
  const [step, setStep] = useState(0);
  const [apiMessage, setApiMessage] = useState(""); // ✅ الرسالة من الـ API

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement("address");

    if (!cardElement) return;

    const addressDetails = await addressElement?.getValue();
    const { token, error } = await stripe.createToken(cardElement);

    if (error || !token) {
      setApiMessage(error?.message || "Something went wrong during payment.");
      setStep(2);
      return;
    }

    try {
      const response = await mutateAsync({
        bookingId: bookingId,
        token: token.id,
      });

      setApiMessage(response?.message || "Payment processed."); // ✅ حفظ رسالة الـ API
    } catch (err: any) {
      setApiMessage(err?.message || "Payment failed unexpectedly.");
    }

    handleNext(); // الانتقال إلى خطوة الكونفرميشن
  };

  return (
    <Container maxWidth="md" className={styles.checkoutContainer}>
      <Paper className={styles.checkoutCard}>
        <Typography variant="h5" className={styles.checkoutTitle}>
          Room Booking Payment
        </Typography>

        <Stepper
          activeStep={step}
          alternativeLabel
          className={styles.checkoutStepper}
        >
          {["Address", "Payment Info", "Confirmation"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 0 && (
          <>
            <AddressElement options={{ mode: "billing" }} />
            <Box className={styles.checkoutBtnGroup}>
              <span />
              <Button className={styles.checkoutBtn} onClick={handleNext}>
                Next →
              </Button>
            </Box>
          </>
        )}

        {step === 1 && (
          <>
            <Box className={styles.cardWrapper}>
              <CardElement options={stripeInputStyle} />
            </Box>

            <Box className={styles.checkoutBtnGroup}>
              <Button className={styles.checkoutBtn} onClick={handleBack}>
                ← Back
              </Button>
              <Button className={styles.checkoutBtn} onClick={handlePayment}>
                Pay Now →
              </Button>
            </Box>
          </>
        )}

        {step === 2 && (
          <Typography className={styles.checkoutSuccess}>
            ✅ {apiMessage}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CheckoutForm;
