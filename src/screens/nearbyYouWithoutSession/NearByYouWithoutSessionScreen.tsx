import Search from "@/components/Search";
import { useState } from "react";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Car_Icon } from "@/constants/SvgIcons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { moderateScale, scale } from "react-native-size-matters";

import ParkingItems, { parkingData } from "@/components/NearByYou/ParkingItems";
import HeaderComp from "@/components/global/HeaderComp";

const data = [
  { id: "1", name: "Available Now", Icon: Car_Icon },
  { id: "2", name: "Available in 5 minutes", Icon: Car_Icon },
  { id: "3", name: "Available in 10 minutes", Icon: Car_Icon },
  { id: "4", name: "Available in 1 hour", Icon: Car_Icon },
  { id: "5", name: "Available in 3 hour", Icon: Car_Icon },
];

const NearbyYouWithoutSessionScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <SafeAreaView style={styles.container}>
        <HeaderComp
          title="Nearby You"
          showDots={false}
          isQrScreen={false}
          backgroundColor={Colors.black}
        />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <View style={{ paddingTop: moderateScale(9) }}>
          {" "}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              alignItems: "center",
            }}
            renderItem={({ item }) => {
              const isActive = item.id === activeId;
              const SvgIcon = item.Icon;
              return (
                <TouchableOpacity onPress={() => setActiveId(item.id)}>
                  <View style={[styles.card1, isActive && styles.activecard]}>
                    <SvgIcon />
                    <Text style={[styles.text1, isActive && styles.activeText]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.container1}>
          <View style={{ flex: 1, paddingTop: moderateScale(14) }}>
            <FlatList
              data={parkingData}
              renderItem={({ item }) => <ParkingItems item={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "black",
  },
  carouselWrapper: {
    width: "100%",
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 2,
  },
  parkingListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  parkingFoundText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  container1: {
    flex: 1,
    marginTop: moderateScale(24),
    backgroundColor: "black",

    paddingHorizontal: scale(24),
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 70,
    // Space for the Sort By button
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    height: 70,
  },

  separator: {
    width: 1,
    height: 14,
    backgroundColor: Colors.greySeperator,
    marginHorizontal: 8,
  },

  sortByContainer: {
    position: "absolute",
    bottom: 34,

    alignSelf: "center",
  },
  sortByButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingVertical: moderateScale(5),
    paddingHorizontal: 15,
    borderRadius: 16,
    width: scale(89),
  },
  sortByText: {
    color: "black",
    fontFamily: Fonts.semiBold,
    fontSize: 14,

    marginRight: 4,
  },
  caretDownContainer: {
    paddingTop: 2,
  },

  listContainer1: {
    paddingHorizontal: 40,
  },
  card1: {
    borderRadius: 100,
    borderColor: Colors.grey200,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 78,
    height: 38,
    flexDirection: "row",
    gap: 6,
    padding: moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: scale(10),
    // marginBottom: moderateScale(24),
  },
  text1: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "white",
  },
  activeText: {
    color: Colors.primary,
  },

  activecard: {
    borderRadius: 16,
    backgroundColor: Colors.black100,
    borderWidth: 0,
    borderColor: Colors.darkbluegrey,
    marginRight: 12,
    minWidth: 80,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NearbyYouWithoutSessionScreen;
