import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import LoginScreen from "./app/screens/LoginScreen";
import Welcome from "./app/screens/Welcome";

enableScreens();

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login Page"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Welcome"
      component={Welcome}
    />
    {/*<Stack.Screen*/}
    {/*  options={{ headerShown: false }}*/}
    {/*  name="Verify OTP"*/}
    {/*  component={OtpScreen}*/}
    {/*/>*/}
  </Stack.Navigator>
);
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}
export default App;
