import { Colors } from "@/constants/Colors";
import { Logo } from "@/constants/SvgIcons";
import { AsyncStorageService } from "@/services/AsyncStorageService";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { scale } from "react-native-size-matters";

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const storage = new AsyncStorageService();
  useEffect(() => {
    const timer = setTimeout(async () => {
      const user = await storage.getAuthData();
      // const owner = await storage.getOwnerAuthData();
      console.log(user);

      if (user) {
        // navigation.replace("Tabs");

        navigation.replace("PilotProfile");
      } else {
        navigation.replace("Onboarding");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.black} />
      <View style={{}}>
        <Logo />
        <Text style={styles.title}>NO MORE CIRCLING, JUST PARKING.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    paddingBottom: scale(100),
  },
  title: {
    fontSize: scale(12),
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: Colors.white,
    textAlign: "center",
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
  },
});

export default SplashScreen;
