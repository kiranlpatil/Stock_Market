import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import LoginScreen from "./app/screens/LoginScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import IntradayScreen from "./app/screens/IntradayScreen";
import VerificationScreen from "./app/screens/VerificationScreen";
import HomeScreen from "./app/screens/HomeScreen";
// import ServiceScreen from "./app/screens/ServiceScreen";
import IndicesScreen from "./app/screens/IndicesScreen";
import AdminScreen from "./app/screens/AdminScreen";
import NotificationScreen from "./app/screens/NotificationScreen";

enableScreens();

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
    {/*<Stack.Screen*/}
    {/*  options={{ headerShown: false }}*/}
    {/*  name="Login Page"*/}
    {/*  component={LoginScreen}*/}
    {/*/>*/}
    {/* <Stack.Screen
      options={{ headerShown: false }}
      name="Verification Page"
      component={VerificationScreen}
    /> */}
    <Stack.Screen
      options={{
        headerShown: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Home Screen"
      component={HomeScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Dashboard Page"
      component={DashboardScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Intraday Page"
      component={IntradayScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Indices"
      component={IndicesScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "lightblue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Service Page"
      component={IntradayScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "lightblue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Admin Panel"
      component={AdminScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Notification"
      component={NotificationScreen}
    />
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
