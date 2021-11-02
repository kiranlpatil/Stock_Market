import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import DashboardScreen from "./DashboardScreen";
import SettingScreen from "./SettingsScreen";
import ServiceScreen from "./ServiceScreen";
import UpdatesScreen from "./UpdatesScreen";
import * as SecureStore from "expo-secure-store";
import AdminScreen from "./AdminScreen";
import httpDelegateService, { getAPI } from "../services/http-delegate.service";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getAdminRole().then(
      (credentials) => setIsAdmin(credentials.isAdmin)
      // setIsAdmin(true)
    );
  }, []);

  async function getAdminRole() {
    const result = await getAPI(
      "https://tradertunnel.herokuapp.com/api/auth/user"
    );
    await SecureStore.setItemAsync("mail", JSON.stringify(result.data));
    return result.data;
  }

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#fff"
      labelStyle={{ fontSize: 12 }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#1f65ff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{
          tabBarLabel: "Services",
          tabBarColor: "#008000",
          tabBarIcon: ({ color }) => (
            <AntDesign name="customerservice" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarColor: "#FF4500",
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" color={color} size={24} />
          ),
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            tabBarLabel: "Admin",
            tabBarColor: "#0FADAF",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="admin-panel-settings"
                size={25}
                color="black"
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default function HomeScreen() {
  return <MyTabs />;
}
