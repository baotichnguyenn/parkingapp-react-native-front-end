// navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import PilotProfile from "@/screens/pilotProfile/PilotProfile";

import YourdetailsScreen from "@/screens/yourDetails/YourdetailsScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserProfileSetting from "@/screens/userProfile/UserProfileSetting";
export type TabNavigationProps = {
  Home: undefined;
  Documents: undefined;
  Plus: undefined;
  Messages: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<TabNavigationProps>();

const TabNavigatorPilot = () => {
  // const height=useBottomTabBarHeight()
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} isHome={false} />}
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
          component={PilotProfile}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <BookingActive /> : <Booking />,
          }}
          name="Documents"
          component={PilotProfile}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Icon name="add" size={30} color={Colors.primary} />
              ) : (
                <Icon name="add" size={30} color={Colors.black} />
              ),
          }}
          name="Plus"
          component={YourdetailsScreen}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <ChatIcon /> : <ChatIcon />,
          }}
          name="Messages"
          component={PilotProfile}
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

export default TabNavigatorPilot;
