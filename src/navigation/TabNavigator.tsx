// navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/home/HomeScreen";
import {
  Booking,
  BookingActive,
  ChatIcon,
  Home,
  HomeActive,
  Profile,
  ProfileActive,
} from "@/constants/SvgIcons";
import { Colors } from "@/constants/Colors";
import { scale } from "react-native-size-matters";
import CustomTabBar from "@/components/home/CustomTab";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCodeScreen from "@/screens/qrcode/QrCodeScreen";
import ParkingBookingScreen from "@/screens/parkingBooking/ParkingBookingScreen";
import UserProfileSetting from "@/screens/userProfile/UserProfileSetting";
import Notification from "@/components/ParkingBooking/Notification";
export type TabNavigationProps = {
  Home: undefined;
  Documents: undefined;
  Scan: undefined;
  Messages: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<TabNavigationProps>();

const TabNavigator = () => {
  // const height=useBottomTabBarHeight()
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} isHome={true} />}
        screenOptions={{
          tabBarStyle: {},
          // tabBarShowLabel: false,
          // tabBarVariant: 'uikit',
          headerShown: false,
          sceneStyle: {
            backgroundColor: Colors.black,
            flex: 1,
            paddingBottom: 0,
          },
          tabBarHideOnKeyboard: Platform.OS !== "ios",
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeActive height={scale(28)} width={scale(28)} />
              ) : (
                <Home height={scale(28)} width={scale(28)} />
              ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <BookingActive /> : <Booking />,
          }}
          name="Documents"
          component={ParkingBookingScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (focused ? <Booking /> : <Booking />),
          }}
          name="Scan"
          component={QRCodeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <ChatIcon /> : <ChatIcon />,
          }}
          name="Messages"
          component={Notification}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <ProfileActive /> : <Profile />,
          }}
          name="Profile"
          component={UserProfileSetting}
        />
      </Tab.Navigator>
      <SafeAreaView
        edges={["bottom"]}
        style={{ backgroundColor: Colors.black100 }}
      />
    </>
  );
};

export default TabNavigator;
