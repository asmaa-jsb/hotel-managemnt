import type { PayBookingPayload } from "@/interfaces/PaymentInterface";
import { axiosInstance, BOOKINGPAYMENT_URLS } from "../EndPoints/EndPoints";

export const payBookingAPI = async ({
  bookingId,
  token,
}: PayBookingPayload) => {
  const response = await axiosInstance.post(
    BOOKINGPAYMENT_URLS.PAY_BOOKING(bookingId),
    { token }
  );
  return response.data;
};
