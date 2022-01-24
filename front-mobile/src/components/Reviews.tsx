import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { text, theme } from "../styles";
import { Review } from "./MovieCard";

import star from "../assets/star.png";

interface ReviewCard {
  review: Review;
}
const Reviews: React.FC<ReviewCard> = ({ review }) => {
  return (
    <View>
      <View style={theme.reviewContainer}>
        <Image source={star} style={{ width: 13, height: 12 }} />
        <Text style={text.username}>{review.user.name}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={theme.buttonForDetails}>
        <Text style={text.forDetailsMovie}>{review.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;
