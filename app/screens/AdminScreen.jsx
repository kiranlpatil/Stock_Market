import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

const AdminScreen = () => {
  const [value, setValue] = useState("");

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
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonLabel}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const NotificationTab = () => {
    return (
      <View style={styles.container2}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Notification Header</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput style={styles.inputHeader} maxLength={25} />
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
            />
          </View>
          <View style={styles.submitButtonView}>
            <TouchableOpacity style={styles.submitButton}>
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
        <Tab.Screen name="Stock Items" component={StockTab} />
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
