import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { AxiosNetworkProvider } from "@/services/ApiContext";

import { StripeProvider } from "@stripe/stripe-react-native";

import { STRIPE_API_KEY } from "@/constants/Config";

const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_API_KEY}>
      <AxiosNetworkProvider>
        <RootNavigator />
      </AxiosNetworkProvider>
    </StripeProvider>
  );
};

export default App;
