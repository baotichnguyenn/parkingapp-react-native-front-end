import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { useDeepLinking } from "@/hooks/useDeepLinking";
import { DEEP_LINKING_URL } from "@/constants/Config";

const RootNavigator = () => {
  const linking = {
    prefixes: ["spotly://", DEEP_LINKING_URL],
    config: {
      screens: {
        VerifyEmail: "verify-email/:token",
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <AppNavigator />
      <DeepLinkHandler />
    </NavigationContainer>
  );
};
function DeepLinkHandler() {
  useDeepLinking();
  return null;
}
export default RootNavigator;
