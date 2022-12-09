import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
  ToastAndroid,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import StockChange from "./StockChange";
import httpDelegateService, { getAPI } from "../services/http-delegate.service";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AdminScreen = (props) => {
  const [value, setValue] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

  const StockList = (props) => {
    const [dataList, setDataList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [userData, setUserData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
      loadStockItems();
    }, []);

    async function loadStockItems() {
      const result = await getAPI(
        "https://traders-tunnel-info.onrender.com/api/stock-items/top-five"
      );
      if (result.status === "success") {
        setDataList(result.data);
        setRefreshing(false);
      }
      return result;
    }

    return (
      <View style={{ flex: 1 }}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={dataList}
          keyExtractor={(item) => {
            return item._id;
          }}
          renderItem={stockListItems}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadStockItems()}
            />
          }
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Caption style={{ justifyContent: "center", alignItems: "center" }}>
            Pull to Refresh
          </Caption>
        </View>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              borderRadius: 20,
              elevation: 5,
              alignItems: "center",
              padding: 20,
            }}
            onPress={() => {
              ToastAndroid.show(
                "Adding new item will replace last existing item",
                ToastAndroid.SHORT
              );
              props.navigation.navigate("StockChange", { stockItem: null });
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Add New Stock Item
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const stockListItems = ({ item }) => {
    const deleteItem = () => {
      httpDelegateService(
        "https://traders-tunnel-info.onrender.com/api/stock-items/" + item._id,
        null,
        true,
        true
      ).then((result) => {
        if (result.status === "success") {
          Alert.alert("Success", "Refresh Page manually");
        }
      });
    };

    return (
      <View style={styles.row}>
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item.stockName}</Text>
          </View>
          <View style={styles.end}>
            <Text style={styles.time}>{item.dateInString}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() =>
            props.navigation.navigate("StockChange", { stockItem: item })
          }
        >
          <AntDesign name="edit" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => deleteItem()}
        >
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const StockTab = () => {
    return (
      <View style={styles.container2}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.header2}>
            <Text style={styles.headerLabel2}>Stock Name</Text>
          </View>
          <View style={styles.inputBox2}>
            <TextInput style={styles.inputHeader2} />
          </View>
          <View style={styles.header2}>
            <Text style={styles.headerLabel2}>Stock Button Name</Text>
          </View>
          <View style={styles.inputBox2}>
            <RNPickerSelect
              placeholder={{}}
              items={[
                {
                  label: "Intraday Buy",
                  value: "Intraday Buy",
                },
                {
                  label: "Delivery Buy",
                  value: "Delivery Buy",
                },
              ]}
              onValueChange={(value) => {
                setValue(value);
              }}
              InputAccessoryView={() => null}
              style={pickerSelectStyles}
              value={value}
            />
          </View>
          <View style={styles.header2}>
            <Text style={styles.headerLabel2}>Items</Text>
          </View>
          <View style={styles.inputBox2}>
            <TextInput style={styles.inputHeader2} />
          </View>

          <View style={styles.submitButtonView}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => Alert.alert("Not connected to Backend server")}
            >
              <Text style={styles.submitButtonLabel}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const NotificationTab = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    async function sendPushNotification(expoPushToken) {
      const message = {
        title: title,
        message: body,
        dateCreated: new Date().toLocaleString(),
      };
      httpDelegateService(
        "https://traders-tunnel-info.onrender.com/api/push-notification",
        message,
        true
      ).then((result) => {
        if (result.status === "success") {
          Alert.alert(
            "Success sending message",
            "It may take some time to send all the users"
          );
        }
      });
    }

    return (
      <View style={styles.container2}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Notification Header</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputHeader}
              maxLength={60}
              placeholder={"Max 60 Characters"}
              value={title}
              onChangeText={(val) => setTitle(val)}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerLabel}>
              Notification Body <Caption>(optional)</Caption>
            </Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputBody}
              keyboardType="twitter"
              multiline={true}
              maxLength={200}
              value={body}
              placeholder={"Max 200 Characters"}
              onChangeText={(val) => setBody(val)}
            />
            {/* <Caption>{expoPushToken}</Caption> */}
          </View>
          <View style={styles.submitButtonView}>
            <TouchableOpacity
              style={styles.submitButton}
              disabled={title === ""}
              onPress={async () => {
                await sendPushNotification(expoPushToken);
              }}
            >
              <Text style={styles.submitButtonLabel}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={styles.container1}>
      <Text
        style={{
          justifyContent: "flex-start",
          fontSize: 20,
          fontWeight: "bold",
          margin: 20,
        }}
      >
        Admin Panel
      </Text>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 12, color: "white" },
          tabBarStyle: { backgroundColor: "#0FADAF" },
        }}
      >
        <Tab.Screen name="Stock Items" component={StockList} />
        <Tab.Screen name="Notifications" component={NotificationTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  headerLabel: {
    fontSize: 20,
    fontWeight: "700",
  },
  inputBox: {
    marginTop: 10,
    width: "100%",
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  inputHeader: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  inputBody: {
    width: "100%",
    height: 100,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingTop: 5,
    textAlignVertical: "top",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  header2: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  headerLabel2: {
    fontSize: 15,
    fontWeight: "700",
  },
  inputBox2: {
    marginTop: 5,
    width: "100%",
  },
  inputLabel2: {
    fontSize: 18,
    marginBottom: 6,
  },
  inputHeader2: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  inputBody2: {
    width: "100%",
    height: 100,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingTop: 5,
    textAlignVertical: "top",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  submitButtonView: {
    justifyContent: "flex-end",
    alignSelf: "center",
    flex: 1,
    padding: 20,
    width: 200,
  },
  submitButton: {
    backgroundColor: "green",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 15,
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontWeight: "400",
    color: "#666",
    fontSize: 12,
    marginLeft: 15,
  },
  icon: {
    height: 28,
    width: 28,
    alignItems: "flex-end",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    color: "#0c0c0c",
    fontSize: 20,
    fontFamily: "Roboto",
    width: "100%",
    fontWeight: "bold",
  },
  textInputBox: {
    backgroundColor: "azure",
    borderRadius: 14,
    flexDirection: "row",
    width: "80%",
    padding: 15,
    marginVertical: 15,
    textAlign: "center",
    shadowColor: "#6e6969",
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AdminScreen;
