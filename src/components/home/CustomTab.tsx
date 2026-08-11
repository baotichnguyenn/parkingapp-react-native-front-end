import { Colors } from "@/constants/Colors";
import { QrIcon } from "@/constants/SvgIcons";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import React from "react";

import type {
  NavigationState,
  ParamListBase,
  Route,
} from "@react-navigation/native";

function CustomTabBar({
  state,
  descriptors,
  navigation,
  isHome,
}: {
  state: NavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
  isHome: boolean;
}) {
  // const[isHome,setIsHome]=useState(false);
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: Route<string>, index: number) => {
        const { options } = descriptors[route.key];
        // const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (index === 2) {
          if (isHome) {
            return (
              <Pressable
                key={index}
                onPress={() => navigation.navigate("QrCode")}
                style={{
                  backgroundColor: Colors.black100,
                  borderRadius: 35,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.black,
                    marginBottom: 30,
                    borderRadius: 35,
                    paddingHorizontal: 10,
                  }}
                >
                  <View style={styles.centralTab}>
                    <QrIcon />
                  </View>
                </View>
              </Pressable>
            );
          } else {
            const color = isFocused ? Colors.lightYellow : Colors.whitePure;
            const IconComponent = options.tabBarIcon;
            return (
              <Pressable
                key={index}
                onPress={() => navigation.navigate("YourDetails")}
                style={{
                  backgroundColor: Colors.black100,
                  borderRadius: 35,
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.black,
                    marginBottom: 30,
                    borderRadius: 35,
                    paddingHorizontal: 10,
                  }}
                >
                  <View style={styles.centralTab}>
                    <IconComponent
                      focused={isFocused}
                      color={color}
                      size={24}
                    />
                  </View>
                </View>
              </Pressable>
            );
          }
        }

        const color = isFocused ? Colors.lightYellow : Colors.whitePure;
        const IconComponent = options.tabBarIcon;
        // Regular tabs
        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={[
              styles.tabButton,
              index == 1 && {
                borderTopRightRadius: 20,
              },
              index == 3 && {
                borderTopLeftRadius: 20,
              },
            ]}
          >
            <IconComponent focused={isFocused} color={color} size={24} />
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.black100,
  },
  centralTab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  centralTabText: {
    color: Colors.whitegrey,
    fontSize: 10,
    fontWeight: "bold",
  },

  centralTabContainer: {},
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: Colors.black,
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
  },
  centralTabButton: {
    transform: [{ translateY: -20 }],
  },
});

export default CustomTabBar;
