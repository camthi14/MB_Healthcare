import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen
        component={LoginScreen}
        name="Login"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={RegisterScreen}
        name="Register"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
