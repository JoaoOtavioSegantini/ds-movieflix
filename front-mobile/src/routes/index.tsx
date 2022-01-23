import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Movies, Home, MovieDetails, Login } from "../pages";

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Movies" component={Movies} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

export default Routes;
