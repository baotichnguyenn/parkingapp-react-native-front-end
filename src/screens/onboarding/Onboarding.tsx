import { moderateScale, scale, verticalScale } from "@/utils/Scale";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { ThemedText } from "../../components/ThemedText";
import { Colors } from "@/constants/Colors";
import { authConstants } from "../../constants/AppConstants";

const { width } = Dimensions.get("window");
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@/constants/Fonts";

const Onboarding = () => {
  const navigation = useNavigation<any>();
  const carouselRef = useRef<Carousel<any> | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }: any) => (
    <View style={{ backgroundColor: Colors.black, width: "100%" }}>
      {/* <View style={styles.imageContainer}>{React.createElement(item.image, { style: styles.image })}</View> */}
      <View style={{ height: "78%" }}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* Pagination Indicator Inside Image */}
      {activeSlide !== authConstants.onBoardingSlides.length - 1 && (
        <View style={styles.paginationContainer}>
          {authConstants.onBoardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeSlide === index ? styles.activeDot : {},
              ]}
            />
          ))}
        </View>
      )}

      <ThemedText
        type="defaultSemiBold"
        style={[
          styles.title,
          activeSlide === authConstants.onBoardingSlides.length - 1 && {
            textAlign: "center",
            paddingBottom: verticalScale(50),
          },
        ]}
      >
        {item.title}
      </ThemedText>
      {/* <ThemedText style={styles.description}>{item.description}</ThemedText> */}
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <Logo/> */}

        <Carousel
          ref={carouselRef}
          data={authConstants.onBoardingSlides}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width - 48}
          loop
          vertical={false}
          onSnapToItem={(index) => setActiveSlide(index)}
        />

        <View
          style={[
            styles.buttonContainer,
            activeSlide === authConstants.onBoardingSlides.length - 1 && {
              paddingHorizontal: scale(43),
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              if (activeSlide === authConstants.onBoardingSlides.length - 1) {
                // navigation.navigate('Dashboard');
                navigation.navigate("Login");
                // navigation.navigate('NearbyYou');
              } else {
                if (carouselRef.current && carouselRef.current.snapToNext) {
                  carouselRef.current.snapToNext();
                }
              }
            }}
            style={[
              {
                backgroundColor: Colors.primary,
                borderRadius: scale(22),
                paddingVertical: verticalScale(16),
                alignItems: "center",
                bottom: moderateScale(29),
              },
              activeSlide === authConstants.onBoardingSlides.length - 1 && {
                bottom: 24,
              },
            ]}
          >
            <Text
              style={[
                {
                  color: "black",
                  fontFamily: Fonts.plusjakartaSansSemiBold,
                  fontSize: 16,
                },
                activeSlide === authConstants.onBoardingSlides.length - 1 && {
                  fontSize: 18,
                },
              ]}
            >
              {activeSlide === authConstants.onBoardingSlides.length - 1
                ? "Get Started"
                : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
        {activeSlide === authConstants.onBoardingSlides.length - 1 && (
          <Text style={styles.doNotHaveAccount}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.plusjakartaSansSemiBold,
                fontSize: 16,
              }}
            >
              Don’t have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              style={styles.registerButton}
            >
              <Text
                style={{
                  color: Colors.primary,
                  top: 4,
                  fontFamily: Fonts.plusjakartaSansBold,
                  fontSize: 16,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </Text>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 1,
    paddingBottom: verticalScale(40),
    backgroundColor: "black",
  },

  imageContainer1: {
    marginHorizontal: 6,
  },

  logo: {
    height: verticalScale(50),
    width: scale(160),
    marginTop: verticalScale(26),
    marginBottom: verticalScale(26),
    alignSelf: "center",
    resizeMode: "cover",
  },
  imageContainer: {
    marginHorizontal: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: scale(20),
    // resizeMode: 'cover',
    alignSelf: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: scale(20),
    paddingHorizontal: scale(4),
    alignSelf: "flex-start",
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(8),
    backgroundColor: Colors.white200,
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: scale(24),
    height: scale(8),
    borderRadius: scale(12),
  },
  title: {
    fontSize: moderateScale(22),
    marginTop: verticalScale(24),
    paddingHorizontal: scale(8),
    lineHeight: verticalScale(35),
    color: "white",
    fontFamily: Fonts.plusjakartaSansBold,
  },

  buttonContainer: {
    justifyContent: "space-between",
    gap: scale(10),
    paddingHorizontal: scale(24),
  },

  doNotHaveAccount: {
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 35,
    // marginTop: 12,
    paddingTop: 8,
    justifyContent: "center",
    flexDirection: "row",
  },
  registerButton: {
    marginLeft: scale(4),
    // backgroundColor: 'red',
  },
});

export default Onboarding;
