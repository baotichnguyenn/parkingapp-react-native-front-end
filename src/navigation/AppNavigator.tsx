import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splash/SplashScreen";
import LoginScreen from "../screens/login/LoginScreen";
import SignupScreen from "../screens/signup/SignupScreen";
import Onboarding from "../screens/onboarding/Onboarding";
import ResetpasswordScreen from "@/screens/resetPassword/ResetpasswordScreen";
import OtpScreen from "@/screens/otp/OtpScreen";
import CheckMailScreen from "@/screens/checkmail/CheckMailScreen";
import CreateNewPassScreen from "@/screens/createNewPass/CreateNewPassScreen";
import ResetpassSuccessScreen from "@/screens/passResetSuccess/ResetpassSuccessScreen";
import TabNavigator from "./TabNavigator";

import { ToastProvider } from "@/services/ToastContext";

import TabNavigatorPilot from "./TabNavigatorPilot";

import NearbyYouScreen from "@/screens/nearbyYou/NearByYouScreen";
import NearbyYouWithoutSessionScreen from "@/screens/nearbyYouWithoutSession/NearByYouWithoutSessionScreen";

import QrCodeScreen from "@/screens/qrcode/QrCodeScreen";
import BooingDetailsScreen from "@/screens/bookingDetails/BookingDetailsScreen";
import OpenMapScreen from "@/screens/openMap/OpenMapScreen";
import OngoingBooking from "@/screens/ongoing/OngoingBooking";
import SuccessScreen from "@/screens/ongoing/SuccessScreen";
import PaymentDetails from "@/screens/payment/PaymentDetails";

import YourdetailsScreen from "@/screens/yourDetails/YourdetailsScreen";
import DescribeYourPlace from "@/screens/describeYourPlace/DescribeYourPlace";
import SetPriceScreen from "@/screens/setPrice/SetPriceScreen";
import YourDescriptionScreen from "@/screens/yourDescription/YourDescriptionScreen";
import BasicAboutSpotScreen from "@/screens/basicAboutSpot/BasicAboutSpotScreen";
import PhotoChooseScreen from "@/screens/photochoose/PhotoChooseScreen";
import PinSpotLocationScreen from "@/screens/pinSpotLocation/PinSpotLocationScreen";

import ParkingReceiptScreen from "@/screens/parkingReceipt/ParkingReceiptScreen";
import BookingScreen from "@/screens/booking/BookingScreen";

import AccountScreen from "@/screens/account/AccountScreen";
import ChangeMailScreen from "@/screens/changeMail/ChangeMailScreen";
import MyPayment from "@/screens/myPayment/MyPayment";
import AddNewCard from "@/screens/addCard/AddNewCard";
import SecurityScreen from "@/screens/security/SecurityScreen";
import NotificationScreen from "@/screens/notification/NotificationScreen";
import HelpAndSupportScreen from "@/screens/helpAndsupport/HelpAndSupportScreen";
import LegalAndPolicyScreen from "@/screens/legalAndpolicy/LegalAndPolicyScreen";
import ParkingDetailsScreen from "@/screens/parkingDetails/ParkingDetailsScreen";
import UserProfileSetting from "@/screens/userProfile/UserProfileSetting";
import ParkingBookingScreen from "@/screens/parkingBooking/ParkingBookingScreen";
import { Linking } from "react-native";

export type RootStackParamList = {
  Splash: undefined;
  MainScreen: undefined;
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  ResetPassword: undefined;
  Otp: { email: string; isOwner: boolean };
  PilotProfile: undefined;
  CheckMail: undefined;
  NearbyYou: undefined;
  NearbyYouWithoutSession: undefined;
  QrCode: undefined;
  BookingDetails: undefined;
  OpenMap: undefined;
  Tabs: undefined;
  CreatePass: undefined;
  ResetPassSuccess: undefined;
  ParkingDetails: undefined;
  YourDetails: undefined;
  DescribeYourPlace: undefined;
  SetPrice: undefined;
  YourDescription: undefined;
  BasicAboutSpot: undefined;
  PhotoChoose: undefined;
  MyPayment: undefined;
  PinSpotLocation: undefined;
  ParkingBooking: undefined;
  ParkingReceipt: undefined;
  Booking: undefined;
  OnGoingBooking: undefined;
  SuccessScreen: undefined;
  PaymentDetails: undefined;
  UserProfileSettings: undefined;
  Account: undefined;
  ChangeMail: undefined;
  AddNewCard: undefined;
  Security: undefined;
  Notification: undefined;
  HelpAndSupport: undefined;
  LegalAndPolicies: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleUrl(url);
    });

    return () => subscription.remove();
  }, []);

  function handleUrl(url: string) {
    const parsed = new URL(url);
    const token = parsed.searchParams.get("token");
    if (token) {
      console.log(token);
    }
  }

  return (
    <ToastProvider>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="YourDetails"
          component={YourdetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyPayment"
          component={MyPayment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Security"
          component={SecurityScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HelpAndSupport"
          component={HelpAndSupportScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LegalAndPolicies"
          component={LegalAndPolicyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddNewCard"
          component={AddNewCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DescribeYourPlace"
          component={DescribeYourPlace}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ParkingBooking"
          component={TabNavigatorParkingBooking}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="ParkingBooking"
          component={ParkingBookingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ParkingReceipt"
          component={ParkingReceiptScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PinSpotLocation"
          component={PinSpotLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhotoChoose"
          component={PhotoChooseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BasicAboutSpot"
          component={BasicAboutSpotScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetPrice"
          component={SetPriceScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="YourDescription"
          component={YourDescriptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="UserProfileSettings"
          component={TabNavigatorUserProfile}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="UserProfileSettings"
          component={UserProfileSetting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangeMail"
          component={ChangeMailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PilotProfile"
          component={TabNavigatorPilot}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ParkingDetails"
          component={TabNavigatorParkingDetails}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="ParkingDetails"
          component={ParkingDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePass"
          component={CreateNewPassScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ResetPassSuccess"
          component={ResetpassSuccessScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CheckMail"
          component={CheckMailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OpenMap"
          component={OpenMapScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetpasswordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="QrCode"
          component={QrCodeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NearbyYou"
          component={NearbyYouScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NearbyYouWithoutSession"
          component={NearbyYouWithoutSessionScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BookingDetails"
          component={BooingDetailsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnGoingBooking"
          component={OngoingBooking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentDetails"
          component={PaymentDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ToastProvider>
  );
};

export default AppNavigator;
