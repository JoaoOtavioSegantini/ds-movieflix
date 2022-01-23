import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import arrow from "../assets/arrow.svg";
import main from "../assets/main.png";
import { theme, text } from "../styles";

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={theme.container}>
      <View style={theme.card}>
        <Image source={main} style={theme.mainImage} />
        <View style={theme.textContainer}>
          <Text style={text.bold}>Avalie filmes</Text>
          <Text style={text.regular}>
            Diga o que você achou do seu filme favorito
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={theme.primaryButton}
          onPress={() => navigation.navigate("Login" as never)}
        >
          <Text style={text.primaryText}>Fazer login</Text>
          <View style={theme.arrowContainer}>
            <Image source={arrow} style={{ width: 8, height: 15 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
