import AxiosClient from "@/utils/Axios.util";

interface Location {
  latitude: number;
  longitude: number;
  page: number;
}
interface BookingPayload {
  reservationId: string;
  payment_id: string;
  payment_time: string;
  payment_amount: string;
  payment_status: string;
}

export const getParkingData = async (location: Location) => {
  return await AxiosClient.post("parkings", location);
};
export const getPaymentIntent = async (
  amount: number,
  userEmail: string,
  userId: string
) => {
  console.log(
    "Creating payment intent with amount:",
    amount,
    "userEmail:",
    userEmail,
    "userId:",
    userId
  );

  return await AxiosClient.post("payment/create-payment-intent", {
    amount,
    userEmail,
    userId,
  });
};
export const getPaymentDetails = async (paymentId: string) => {
  return await AxiosClient.get(
    `payment/get-payment-details?paymentIntentId=${paymentId}`
  );
};
export const cancelPayment = async (paymentId: string) => {
  return await AxiosClient.post("payment/cancel-payment-intent", {
    paymentIntentId: paymentId,
  });
};
export const confirmParking = async (body: BookingPayload) => {
  return await AxiosClient.post("reservation/confirm-reservation", body);
};

export const ReserveParkingSlot = async (
  parkingId: string,
  userId: string,
  checkin_date_time: string,
  checkout_date_time: string,

  vehicle_type: string,
  hourly_rate: number,
  total_price: number
) => {
  return await AxiosClient.post("reservation/reserve-slot", {
    parkingId,
    userId,
    checkout_date_time,
    checkin_date_time,
    hourly_rate,
    vehicle_type,
    total_price,
  });
};
