import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import LoginScreen from "./app/screens/LoginScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import IntradayScreen from "./app/screens/IntradayScreen";
import VerificationScreen from "./app/screens/VerificationScreen";

enableScreens();

const Stack = createStackNavigator();
const StackNavigator = () => (
    <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
      {/*<Stack.Screen*/}
      {/*  options={{ headerShown: false }}*/}
      {/*  name="Login Page"*/}
      {/*  component={LoginScreen}*/}
      {/*/>*/}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Verification Page"
        component={VerificationScreen}
      />
      <Stack.Screen
          options={{
              headerShown: true,
              headerTitleAlign: "center",headerStyle: {
                  backgroundColor: 'blue',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }}
        name="Dashboard Page"
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{
            headerShown: true,
            headerTitleAlign: "center",headerStyle: {
                backgroundColor: 'blue',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
        name="Intraday Page"
        component={IntradayScreen}
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
