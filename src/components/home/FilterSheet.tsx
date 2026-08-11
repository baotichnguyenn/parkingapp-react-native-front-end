import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { CloseIcon, TickIcon } from "@/constants/SvgIcons";
import { Fonts } from "@/constants/Fonts";
import { scale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { WINDOW } from "@/utils/Scale";
import ChipItem from "./ChipItem";

import CustomButton from "../global/CustomButton";

type ParkingDataType = {
  vehicle_types: string[];
  location_type: string[];
  hourly_rate: number;
  // Add other fields as needed
};

type FilterSheetProps = {
  visible: boolean;
  onClose: () => void;
  parkingData: ParkingDataType[];
  onApplyFilter: (filteredData: ParkingDataType[]) => void;
};

const FilterSheet: React.FC<FilterSheetProps> = ({
  visible,
  onClose,
  parkingData,
  onApplyFilter,
}) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(
    null
  );

  const [selectedLocationType, setSelectedLocationType] = useState<
    string | null
  >(null);

  const [selectedLocation, setselectedLocation] = useState(-1);

  const [selectedChip, setselectedChip] = useState(-1);

  const vehicleTypeCountMap: { [key: string]: number } = {};

  parkingData.forEach((parking) => {
    parking.vehicle_types.forEach((type) => {
      vehicleTypeCountMap[type] = (vehicleTypeCountMap[type] || 0) + 1;
    });
  });

  const uniqueVehicleTypesWithTotal = Object.entries(vehicleTypeCountMap).map(
    ([type, total]) => ({
      type,
      total,
    })
  );

  const basePrices = parkingData.flatMap((parking) => parking.hourly_rate);
  const minBasePrice = Math.min(...basePrices);
  const maxBasePrice = Math.max(...basePrices);
  // const [range, setRange] = useState([minBasePrice, maxBasePrice]);

  const locationTypes = [
    ...new Set(parkingData.flatMap((parking) => parking.location_type)),
  ];
  const [range, setRange] = useState([0, 100]);

  const handleApplyFilter = () => {
    // const minPrice = range[0] * 100;
    // const maxPrice = range[1] * 100;
    const [minPrice, maxPrice] = range;
    const filteredData = parkingData.filter((item) => {
      const matchesVehicle =
        !selectedVehicleType ||
        item.vehicle_types.includes(selectedVehicleType);

      const matchesLocation =
        !selectedLocationType ||
        item.location_type.includes(selectedLocationType);

      const matchesPrice =
        item.hourly_rate >= minPrice && item.hourly_rate <= maxPrice;

      return matchesVehicle && matchesLocation && matchesPrice;
    });

    onApplyFilter(filteredData); // Return filtered data to parent
    console.log("min and max price", minPrice, maxPrice);
    console.log("filtered dtata", filteredData);
    onClose(); // Close modal
  };

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        style={{ flex: 1 }}
        onRequestClose={onClose}
      >
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            backgroundColor: Colors.coffieNormal,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 20,
              backgroundColor: Colors.black100,
            }}
          >
            {/* Header Container */}
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <CloseIcon />
              </TouchableOpacity>
              <Text style={styles.filterText}>Filter</Text>
            </View>

            {/* Price Range Section*/}
            <View style={{ paddingTop: 24 }}>
              <Text style={styles.titleText}>Price Range</Text>
              <MultiSlider
                values={range}
                sliderLength={WINDOW.width - 54}
                onValuesChange={setRange}
                min={0}
                max={100}
                //  onValuesChange={setRange}
                //             min={minBasePrice}
                // max={maxBasePrice}
                step={1}
                containerStyle={{ alignSelf: "center" }}
                selectedStyle={{ backgroundColor: Colors.primary }}
                unselectedStyle={{ backgroundColor: Colors.grey100 }}
                trackStyle={{ height: 2, backgroundColor: Colors.grey100 }}
                markerStyle={{
                  backgroundColor: Colors.primary,
                  height: 16,
                  width: 16,
                  borderRadius: 10,
                }}
                pressedMarkerStyle={{ backgroundColor: Colors.primary }}
                allowOverlap={false}
                snapped
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>$ {range[0]}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>$ {range[1]}</Text>
                </View>
              </View>
            </View>

            {/* Parking Section */}
            <View style={{ paddingTop: 24 }}>
              <Text style={styles.titleText}>Parking</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  columnGap: 14,
                  rowGap: 16,
                  paddingTop: 16,
                }}
              >
                {uniqueVehicleTypesWithTotal.map(({ type, total }, index) => (
                  <ChipItem
                    key={index}
                    item={`${type} (${total})`}
                    index={index}
                    isSelected={selectedChip === index}
                    onPress={() => {
                      setselectedChip(index);
                      setSelectedVehicleType(type);
                    }}
                  />
                ))}
              </View>
            </View>

            {/* Location Type Section */}
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.titleText, { fontFamily: Fonts.bold }]}>
                Location Type
              </Text>
              <View style={{ gap: 1, marginTop: 20, marginBottom: 10 }}>
                <FlatList
                  numColumns={2}
                  data={locationTypes}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      // onPress={() => setselectedLocation(index)}

                      onPress={() => {
                        setselectedLocation(index);
                        setSelectedLocationType(item);
                      }}
                      style={[
                        styles.typeContainer,
                        index == selectedLocation && {
                          backgroundColor: Colors.darkgreen,
                          borderWidth: 1,
                          borderColor: Colors.darkgreenBorder,
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {/* <item.icon /> */}
                        <Text style={styles.typeText}>{item}</Text>
                      </View>
                      {index == selectedLocation && <TickIcon />}
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            <CustomButton
              title="Apply Filter"
              containerStyle={{ paddingVertical: 14 }}
              onPress={handleApplyFilter}
            />

            <CustomButton
              title="Clear All"
              labelStyle={{ color: Colors.errorColor }}
              containerStyle={{
                backgroundColor: Colors.black100,
                paddingBottom: 0,
                marginTop: 10,
              }}
              onPress={() => {
                setselectedChip(-1);
                setSelectedVehicleType(null);
                setselectedLocation(-1);
                setSelectedLocationType(null);
                setRange([minBasePrice, maxBasePrice]);
                onApplyFilter(parkingData); // Show all items again
                onClose(); // Optional: Close modal
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: scale(15),
    color: Colors.white,
  },
  closeButton: {
    backgroundColor: Colors.black600,
    padding: 12,
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  filterText: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: scale(20),
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
  },
  valueContainer: {
    paddingVertical: 8,
    backgroundColor: Colors.black600,
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 16,
    paddingHorizontal: 40,
  },
  valueText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.white,
  },
  chipText: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(11),
    color: Colors.white,
  },
  typeContainer: {
    backgroundColor: Colors.black300,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 10,
    gap: 5,
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.black300,
  },
  typeText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.white,
  },
});
export default FilterSheet;
