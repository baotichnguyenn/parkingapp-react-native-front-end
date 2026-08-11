import React from "react";

import ParkingReceipt from "@/components/ParkingBooking/ParkingReceipt";
import { useRoute, RouteProp } from "@react-navigation/native";

type ParkingReceiptRouteParams = {
  params: {
    item: any; // Replace 'any' with the actual type if known
  };
};

const ParkingReceiptScreen = () => {
  const routes = useRoute<RouteProp<ParkingReceiptRouteParams>>();
  return <ParkingReceipt receipt={routes.params?.item} />;
};

export default ParkingReceiptScreen;
