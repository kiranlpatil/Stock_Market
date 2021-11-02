import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Separator from "../utils/Seperator";
import { Icon } from "react-native-elements";
import httpDelegateService from "../services/http-delegate.service";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
const { height } = Dimensions.get("window");
const setHeight = (h) => (height / 100) * h;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const VerificationScreen = (props) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const [counter, setCounter] = React.useState(59);
  const [expoPushToken, setExpoPushToken] = useState("");

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    return () => clearInterval(timer);
  }, [counter]);

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

  const getOtp = () => {
    setCounter(59);
    const body = { email: props.route.params.email };
    httpDelegateService(
      "https://tradertunnel.herokuapp.com/api/auth/generateOTP",
      body
    ).then((result) => {
      console.log(result);
      if (result.status === 200) {
        // props.navigation.navigate("Verification Page", { email: mail });
      } else {
        Alert.alert(
          "Server Overload",
          "Please try after sometime. Our server is currently experiencing heavy load"
        );
      }
    });
  };

  const verifyOtp = () => {
    const otpInput = otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6];
    const body = {
      email: props.route.params.email,
      otp: otpInput,
      loginType: "otp",
    };
    httpDelegateService(
      "https://tradertunnel.herokuapp.com/api/auth/validateOTP",
      body
    ).then(async (result) => {
      if (result?.status === 200) {
        await SecureStore.setItemAsync("token", result.token);
        const bodyToken = {
          token: "ExponentPushToken[raN5v2DtryvWj661swJpG6]",
          isAvailable: true,
          notificationDisabled: false,
        };
        httpDelegateService(
          "https://tradertunnel.herokuapp.com/api/auth/save-token",
          bodyToken,
          result.token
        ).then(async (token) => {
          console.log(token);
          if (token.status === "success") {
            try {
              await SecureStore.setItemAsync(
                "mail",
                JSON.stringify(token.data)
              );
              props.navigation.navigate("Home Screen", token.data.isAdmin);
            } catch (e) {
              console.log(e);
            }
          }
        });
      } else if (result.status === "fail") {
        Alert.alert("Wrong OTP", "Please try again!");
      } else {
        console.log(result);
        Alert.alert(
          "Server Overload",
          "Please try after sometime. Our server is currently experiencing heavy load"
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bigCircle} />
      <View style={styles.smallCircle} />
      <View style={styles.centralizedView}>
        <View style={styles.authBox}>
          <View style={styles.logoBox}>
            <Icon
              color="#fff"
              name="check-circle"
              type="font-awesome"
              size={50}
            />
          </View>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={"white"}
            translucent
          />
          <Separator height={StatusBar.currentHeight} />
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>OTP Verification</Text>
          </View>
          <Text style={styles.title}></Text>
          <Text style={styles.content}>
            Enter the OTP number just sent you at:{"\n "}
            <Text style={styles.phoneNumberText}>
              {props.route.params.email}
            </Text>
          </Text>
          <View style={styles.otpContainer}>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 1: text });
                  text && secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 2: text });
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 3: text });
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 4: text });
                  text
                    ? fifthInput.current.focus()
                    : thirdInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fifthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 5: text });
                  text
                    ? sixthInput.current.focus()
                    : fourthInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={sixthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 6: text });
                  !text && fifthInput.current.focus();
                }}
              />
            </View>
          </View>
          <Text
            onPress={() => {
              if (counter === 0) {
                getOtp();
              }
            }}
            style={[
              styles.resendText,
              counter !== 0 ? { color: "grey" } : { color: "green" },
            ]}
          >
            Resend OTP {counter !== 0 ? `in ${counter}` : ""}
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => verifyOtp()}
          >
            <Text style={styles.loginButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bigCircle: {
    width: Dimensions.get("window").height * 0.7,
    height: Dimensions.get("window").height * 0.7,
    backgroundColor: "#00BFFF",
    borderRadius: 1000,
    position: "absolute",
    right: Dimensions.get("window").width * 0.25,
    top: -50,
  },
  loginButton: {
    backgroundColor: "#00AFFF",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  smallCircle: {
    width: Dimensions.get("window").height * 0.4,
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "#00CFFF",
    borderRadius: 1000,
    position: "absolute",
    bottom: Dimensions.get("window").width * -0.2,
    right: Dimensions.get("window").width * -0.3,
  },
  authBox: {
    width: "80%",
    backgroundColor: "#fafafa",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: "#00AFFF",
    borderRadius: 1000,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: -50,
    marginBottom: -50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  centralizedView: {
    width: "100%",
    top: "15%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    alignSelf: "center",
  },
  resendText: {
    fontSize: 15,
    lineHeight: 20 * 1.4,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: "red",
    fontWeight: "bold",
    alignItems: "center",
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 20,
    color: "black",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  signinButton: {
    backgroundColor: "green",
    borderRadius: 8,
    marginHorizontal: 20,
    height: setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default VerificationScreen;
