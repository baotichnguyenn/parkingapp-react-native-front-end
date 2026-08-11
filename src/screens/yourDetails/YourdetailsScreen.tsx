import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";

import Carousel from "react-native-snap-carousel";
import { Colors } from "@/constants/Colors";

import { moderateScale } from "react-native-size-matters";

import DescribeYourPlace from "../describeYourPlace/DescribeYourPlace";
import BasicAboutSpotScreen from "../basicAboutSpot/BasicAboutSpotScreen";
import PhotoChooseScreen from "../photochoose/PhotoChooseScreen";
import YourDescriptionScreen from "../yourDescription/YourDescriptionScreen";
import SetPriceScreen from "../setPrice/SetPriceScreen";
import IntroScreen from "@/components/PilotProfile/IntroScreen";

const { width } = Dimensions.get("window");

const YourdetailsScreen = () => {
  const carouselRef = useRef<Carousel<any>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Tell us about your parking",
      description:
        "Share some basic info, like where it is and how many parkings are available",
    },
    {
      id: 2,
      title: "Make it stand out",
      description:
        "Add 5 or more photos plus a title and description - we'll help you out!",
    },
    {
      id: 3,
      title: "Additional details",
      description:
        "Choose a starting price, verify a few details, then publish your listing",
    },
    {
      id: 4,
      title: "Verification and publish",
      description:
        "Upload documents regarding land ownership / control over land, then let us take care of the rest :)",
    },
  ];

  const renderItem = ({ item }: { item: React.ReactNode }) => (
    <View style={{ flex: 1 }}>{item}</View>
  );

  const screens = [
    <IntroScreen
      key={"intro"}
      steps={steps}
      onStart={() => carouselRef.current && carouselRef.current.snapToNext()}
    />,
    <DescribeYourPlace key={"describe"} />,
    <BasicAboutSpotScreen key={"aboutSpot"} />,
    // <PinSpotLocationScreen key={"pinSpot"} />,
    <PhotoChooseScreen key={"photoChoose"} />,
    <YourDescriptionScreen key={"yourDescription"} />,
    <SetPriceScreen key={"setPrice"} />,
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.carouselIndicator}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorDot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <Carousel
        ref={carouselRef}
        data={screens}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveIndex(index)}
        useScrollView
        vertical={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  carouselIndicator: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: moderateScale(22),
    marginTop: moderateScale(62),
  },
  indicatorDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: Colors.white200,
  },
  getStartedButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    margin: moderateScale(20),
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
});

export default YourdetailsScreen;
