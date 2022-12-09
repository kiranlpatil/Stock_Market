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
import * as TaskManager from "expo-task-manager";
import ServiceScreen from "./ServiceScreen";
import UpdatesScreen from "./UpdatesScreen";
import * as SecureStore from "expo-secure-store";
import AdminScreen from "./AdminScreen";
import * as Notifications from "expo-notifications";
import httpDelegateService, { getAPI } from "../services/http-delegate.service";
const Tab = createMaterialBottomTabNavigator();

const MyTabs = ({ props }) => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
  const [isAdmin, setIsAdmin] = useState(false);

  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    ({ data, error, executionInfo }) => {
      props.navigation.navigate("Notification");
    }
  );

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

  useEffect(() => {
    getAdminRole().then((credentials) => {
      setIsAdmin(credentials.isAdmin);
      console.log(credentials);
      if (!credentials.token) {
        registerForPushNotificationsAsync().then((token) => {
          const body = {
            email: credentials.email,
            token: token,
          };
          httpDelegateService(
            "https://traders-tunnel-info.onrender.com/api/auth/save-expo-token",
            body,
            true
          ).then(() => console.log("Hi this is triggered"));
        });
      }
      // setIsAdmin(true)
    });
    if (lastNotificationResponse) {
      props.navigation.navigate("Notification");
    }
  });

  async function getAdminRole() {
    const result = await getAPI(
      "https://traders-tunnel-info.onrender.com/api/auth/user"
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
};

export default function HomeScreen(props) {
  return <MyTabs props={props} />;
}
