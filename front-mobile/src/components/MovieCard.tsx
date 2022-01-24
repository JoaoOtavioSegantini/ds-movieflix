import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { text, theme } from "../styles";

export type Authority = "VISITOR" | "MEMBER" | "ROLE_ADMIN";

export type User = {
  id: number;
  name: string;
  email: string;
  roles: Role[];
};

export type Role = {
  id: number;
  authority: Authority;
};

export interface Review {
  id: number;
  text: string;
  user: User;
}

export interface Movie {
  id: number;
  title: string;
  subTitle: string;
  year: number;
  imgUrl: string;
  synopsis: string;
  reviews: Review[];
  genreId: number;
}

const MovieCard: React.FC<Movie> = ({
  id,
  title,
  subTitle,
  year,
  imgUrl,
  synopsis,
  genreId,
  reviews,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <View style={theme.movieCard}>
        <Image
          source={imgUrl as ImageSourcePropType}
          style={{ width: "100%", height: 227 }}
        />
        <Text style={text.title}>{title}</Text>
        <Text style={text.year}>{year}</Text>
        <Text style={text.subTitle}>{subTitle}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={theme.buttonForDetails}
          onPress={() =>
            navigation.navigate("MovieDetails" as never, id as never)
          }
        >
          <Text style={text.forDetailsText}>Ver detalhes</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
