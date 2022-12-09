import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Share,
  Linking,
  ToastAndroid,
} from "react-native";
import { Title, Caption, Text, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import LoaderScreen from "./LoaderScreen";
import httpDelegateService from "../services/http-delegate.service";
import { Feather } from "@expo/vector-icons";

const SettingScreen = (props) => {
  const [userDetials, setUserDetails] = useState(null);

  useEffect(() => {
    getAdminRole().then((credentials) =>
      setUserDetails(JSON.parse(credentials))
    );
  }, []);

  async function getAdminRole() {
    const credentials = await SecureStore.getItemAsync("mail");
    console.log(JSON.parse(credentials));
    return credentials;
  }

  const notificationToggle = () => {
    const body = { notificationDisabled: !userDetials.notificationDisabled };
    httpDelegateService(
      "https://traders-tunnel-info.onrender.com/api/push-notification/notification-disabled",
      body,
      true
    ).then(async (result) => {
      try {
        await SecureStore.setItemAsync("mail", JSON.stringify(result.data));
        setUserDetails(result.data);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const myCustomShare = async () => {
    const shareOptions = {
      title: "Traders Tunnel",
      message: "Join Trader Tunnel group to earn more.",
    };

    try {
      const ShareResponse = await Share.share(shareOptions, {
        dialogTitle: "Share App via",
      });
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userDetials ? (
        <SafeAreaView>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ paddingTop: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  <Ionicons name="settings-sharp" size={24} color="black" />
                  <Text
                    style={{
                      paddingLeft: 20,
                      fontWeight: "bold",
                      elevation: 5,
                    }}
                  >
                    {"  Settings"}
                  </Text>
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            {/* <View style={styles.row}>
     <Icon name="phone" color="#777777" size={20} />
     <Text style={{ color: "#777777", marginLeft: 20 }}>
       + 91 9872538634
     </Text>
   </View> */}
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {userDetials.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Title>{userDetials.isPremium ? "Yes" : "No"}</Title>
              <Caption>Premium</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>{userDetials.notificationDisabled ? "No" : "Yes"}</Title>
              <Caption>Push Notification</Caption>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() => notificationToggle()}>
              <View style={styles.menuItem}>
                <Ionicons
                  name={
                    userDetials.notificationDisabled
                      ? "notifications-sharp"
                      : "notifications-off-sharp"
                  }
                  size={24}
                  color="#FF6347"
                />
                <Text style={styles.menuItemText}>
                  {userDetials.notificationDisabled
                    ? "Enable Notfication"
                    : "Disable Notfication"}
                </Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                Linking.openURL(`https://rigipay.com/g/iHpaYuLFrK`).then(() => {
                  Alert.alert(
                    "Success",
                    "Your Premium Subscription will be attended very soon"
                  );
                });
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="credit-card" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Payment</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={myCustomShare}>
              <View style={styles.menuItem}>
                <Icon name="share-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Refer your Friends</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                props.navigation.navigate("Contact Us");
              }}
            >
              <View style={styles.menuItem}>
                <AntDesign name="contacts" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Contact Us</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                props.navigation.navigate("Privacy Policy");
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Privacy Policy</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                props.navigation.navigate("Terms And Conditions");
              }}
            >
              <View style={styles.menuItem}>
                <Feather name="check-square" size={25} color="#FF6347" />
                <Text style={styles.menuItemText}>Terms And Conditions</Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      ) : (
        <LoaderScreen />
      )}
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 42,
    marginHorizontal: 16,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
