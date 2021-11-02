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
import SplashScreen from "./app/screens/SplashScreen";
import MarketsScreen from "./app/screens/MarketsScreen";
import AdCampaign from "./app/screens/AdCampaign";
import StockChange from "./app/screens/StockChange";

enableScreens();

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login Page"
      component={SplashScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Verification Page"
      component={VerificationScreen}
    />
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
        headerShown: false,
      }}
      name="AdCampaign"
      component={AdCampaign}
    />
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
      name="Dashboard Page"
      component={DashboardScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#00BFFF",
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
          backgroundColor: "#00BFFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Delivery Page"
      component={IntradayScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#00BFFF",
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
          backgroundColor: "#00BFFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Market"
      component={MarketsScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#00BFFF",
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
          backgroundColor: "#00BFFF",
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
          backgroundColor: "#00BFFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="Notification"
      component={NotificationScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#00BFFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      name="StockChange"
      component={StockChange}
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
