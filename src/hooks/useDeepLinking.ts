// useDeepLinking.ts
import { useEffect } from "react";
import { Linking } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";

export const useDeepLinking = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleUrl = (url: string) => {
    console.log("Handle Url");

    try {
      if (url.includes("verify-email")) {
        console.log("Email is Verified");

        navigation.navigate("CreatePass");
      }
    } catch (error) {
      console.error("Invalid URL:", url);
    }
  };

  useEffect(() => {
    // Cold start (app not running)
    Linking.getInitialURL().then((url) => {
      console.log(url);

      if (url) handleUrl(url);
    });

    // App is running or in background
    const subscription = Linking.addEventListener("url", ({ url }) => {
      if (url) handleUrl(url);
    });

    return () => subscription.remove();
  }, []);
};
