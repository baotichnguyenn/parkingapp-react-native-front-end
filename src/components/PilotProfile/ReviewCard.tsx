import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { Star_Icon } from "@/constants/SvgIcons";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

const reviews = [
  {
    id: 1,
    name: "Cameron Ziemann",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5.0,
    time: "1 Day ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard du...",
  },
  {
    id: 2,
    name: "Janie Den",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.0,
    time: "1 Day ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard...",
  },
  {
    id: 3,
    name: "Janie Den",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.0,
    time: "1 Day ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard...",
  },
];

const ReviewCard = () => {
  return (
    <View>
      {/* Reviews section */}
      <View style={styles.reviewsHeader}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
          <View style={styles.ratingContainer}>
            <Star_Icon height={moderateScale(20)} width={moderateScale(20)} />
            <Text style={styles.ratingText}>
              4.2{" "}
              <Text
                style={{
                  fontFamily: Fonts.medium,
                  fontSize: 12,
                  color: "#BFC6CC",
                }}
              >
                (84 Reviews)
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewCardsContainer}
        renderItem={({ item: review }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewCardHeader}>
              <View style={styles.reviewerInfo}>
                <Image
                  source={{ uri: review.avatar }}
                  style={styles.reviewerImage}
                />
                <View style={{ flexDirection: "column", gap: 6 }}>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <Text style={styles.reviewTime}>{review.time}</Text>
                </View>
              </View>
              <View style={styles.ratingView}>
                <Star_Icon
                  height={moderateScale(20)}
                  width={moderateScale(20)}
                />
                <Text style={styles.ratingValue}>
                  {review.rating.toFixed(1)}
                </Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewsHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: moderateScale(16),
  },
  reviewsTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: Colors.yellow20,
    marginLeft: 8,
    fontSize: 12,
    fontFamily: Fonts.bold,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  //   reviewCardsContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     flexWrap: 'wrap',
  //   },

  reviewCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: moderateScale(12),
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,

    right: moderateScale(12),
  },
  reviewerName: {
    color: "white",
    fontFamily: Fonts.medium,
    fontSize: 12,
  },
  reviewTime: {
    color: "gray",
    fontSize: 8,
    fontFamily: Fonts.medium,
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingValue: {
    color: "white",
    marginLeft: 5,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  reviewText: {
    color: "white",
    fontFamily: Fonts.regular,
    fontSize: moderateScale(10),
    lineHeight: 20,
  },
  reviewCardsContainer: {
    paddingRight: 16,
  },
  reviewCard: {
    backgroundColor: Colors.mutedGreen,
    borderRadius: 12,
    padding: 16,

    width: moderateScale(250),
    marginRight: moderateScale(16),
  },
});
export default ReviewCard;
