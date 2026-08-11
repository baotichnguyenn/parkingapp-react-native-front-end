import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { usePhotoStore } from "../../store/ownerPhotoStore";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const PhotoChooseScreen = () => {
  const [coverPhoto] = useState(require("@/assets/pngs/imagePicker.png"));

  const [additionalPhotos] = useState([
    require("@/assets/pngs/imagePicker.png"),
    require("@/assets/pngs/imagePicker.png"),
    require("@/assets/pngs/imagePicker.png"),
    require("@/assets/pngs/imagePicker.png"),
  ]);

  const {
    setCoverPhoto: setCoverPhotoFromStore,
    coverPhoto: cp,
    additionalPhotos: ap,
    updateAdditionalPhoto,
  } = usePhotoStore();

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // For Android 13+
        ]);

        return (
          granted["android.permission.READ_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED ||
          granted["android.permission.READ_MEDIA_IMAGES"] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async (isCover, index = null) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        "Permission denied",
        "We need permission to access your photos"
      );
      return;
    }

    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];

        const fileData = {
          uri: asset.uri,
          name: asset.fileName ?? "photo.jpg",
          type: asset.type ?? "image/jpeg",
        };

        console.log("Picked image:", fileData);

        if (isCover) {
          setCoverPhotoFromStore(fileData); // You might need to update your store to handle full object
        } else if (index !== null) {
          updateAdditionalPhoto(index, fileData); // Same here
        }
      }
    });
  };

  const renderPlaceholder = (uri) => {
    if (uri) {
      return (
        <Image
          source={typeof uri === "string" ? { uri } : uri}
          style={styles.image}
        />
      );
    }
    return (
      <View style={styles.placeholderContent}>
        <View style={styles.mountainIcon}></View>
        <View style={styles.mountainIcon}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <HeaderComp
          title=""
          showDots={false}
  
          isQrScreen={false}
          backgroundColor=Colors.black
        /> */}

      <View style={styles.header1}>
        <Text style={styles.headerTitle}>
          Make you spot unique!{"\n"}
          Choose at least 5 photos
        </Text>
      </View>

      {/* Cover Photo */}
      <TouchableOpacity
        style={styles.coverPhotoContainer}
        onPress={() => pickImage(true)}
      >
        {renderPlaceholder(cp || coverPhoto)}
        <View style={styles.coverLabel}>
          <Text style={styles.coverLabelText}>Cover</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.photoGrid}>
        {additionalPhotos.map((photo, index) => {
          const storePhoto = ap?.[index];
          const displayPhoto = storePhoto || photo;

          return (
            <TouchableOpacity
              key={`photo-${index}`}
              style={styles.additionalPhotoContainer}
              onPress={() => pickImage(false, index)}
            >
              {renderPlaceholder(displayPhoto)}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={() => {}}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  header1: {
    // paddingHorizontal: 16,
    // paddingVertical: 12,
    paddingBottom: moderateScale(43),
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    color: Colors.tintColorDark,
    fontSize: 20,
    fontFamily: Fonts.medium,
    paddingLeft: moderateScale(10),
    marginBottom: moderateScale(10),
    // paddingTop: moderateScale(47),
    lineHeight: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 24,
  },
  coverPhotoContainer: {
    // backgroundColor: Colors.photoContainer,

    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
    marginHorizontal: moderateScale(20),
  },
  coverLabel: {
    position: "absolute",
    top: 10,

    left: 20,
    backgroundColor: Colors.black600,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  coverLabelText: {
    color: "white",
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    bottom: 2,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,

    paddingHorizontal: moderateScale(20),
  },
  additionalPhotoContainer: {
    backgroundColor: Colors.photoContainer,

    width: "48%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  placeholderContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mountainIcon: {
    width: 30,
    height: 30,
    backgroundColor: Colors.grey20,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
    margin: -8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomContainer: {
    padding: 16,
    marginTop: "auto",
    top: 20,
    paddingHorizontal: moderateScale(10),
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PhotoChooseScreen;
