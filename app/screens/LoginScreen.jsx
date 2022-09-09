import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import httpDelegateService from "../services/http-delegate.service";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import Spinner from "react-native-loading-spinner-overlay";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function LoginScreen(props) {
  const [mobile, setMobile] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [mail, setMail] = useState("");
  const [isValidMail, setIsValidMail] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  const handleMailInput = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(val) === false) {
      setIsValidMail(false);
    } else {
      setIsValidMail(true);
    }
    setMail(val);
  };

  const getOtp = () => {
    setLoading(true);
    const body = { email: mail };
    httpDelegateService(
      "https://tradertunnel.herokuapp.com/api/auth/generateOTP",
      body,
      true
    ).then((result) => {
      setLoading(false);
      if (result.status === 200) {
        props.navigation.navigate("Verification Page", { email: mail });
      } else {
        Alert.alert(
          "Server Overload",
          "Please try after sometime. Our server is currently experiencing heavy load"
        );
      }
    });
  };

  const handleGoogleSignIn = () => {
    const config = {
      iosClientId: `471310874698-s9kr0r10vd8bbe0n4f62g1n553vsngb9.apps.googleusercontent.com`,
      androidClientId: `471310874698-0k3oa6lsir8eb2dqo4udrmgpekjv91p8.apps.googleusercontent.com`,
      androidStandaloneAppClientId:
        "471310874698-0k3oa6lsir8eb2dqo4udrmgpekjv91p8.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      behavior: "web",
    };
    setLoading(true);
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == "success") {
          const { email } = user;
          const body = {
            email: email,
            otp: "123456",
            loginType: "google",
          };
          httpDelegateService(
            "https://tradertunnel.herokuapp.com/api/auth/validateOTP",
            body
          ).then(async (result) => {
            if (result?.status === 200) {
              await SecureStore.setItemAsync("token", result.token);
              const bodyToken = {
                token: expoPushToken,
                isAvailable: true,
                notificationDisabled: false,
              };
              httpDelegateService(
                "https://tradertunnel.herokuapp.com/api/auth/save-token",
                bodyToken,
                result.token
              ).then(async (token) => {
                setLoading(false);
                if (token.status === "success") {
                  try {
                    await SecureStore.setItemAsync(
                      "mail",
                      JSON.stringify(token.data)
                    );
                    props.navigation.navigate(
                      "Home Screen",
                      token.data.isAdmin
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }
              });
            } else if (result.status === "fail") {
              Alert.alert("Wrong OTP", "Please try again!");
            } else {
              Alert.alert(
                "Server Overload",
                "Please try after sometime. Our server is currently experiencing heavy load"
              );
            }
          });
        }
      })
      .catch((error) => {
        Alert.alert("An error occured. Check your network and try again");
      });
  };

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

  const verifyOtp = () => {
    const body = {
      email: props.route.params.email,
      otp: "123456",
      loginType: "google",
    };
    httpDelegateService(
      "https://tradertunnel.herokuapp.com/api/auth/validateOTP",
      body
    ).then(async (result) => {
      if (result?.status === 200) {
        await SecureStore.setItemAsync("token", result.token);
        const bodyToken = {
          token: expoPushToken,
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
        Alert.alert(
          "Server Overload",
          "Please try after sometime. Our server is currently experiencing heavy load"
        );
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.bigCircle} />
        <View style={styles.smallCircle} />
        <View style={styles.centralizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              <Icon
                color="#fff"
                name="comments"
                type="font-awesome"
                size={50}
              />
            </View>
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr} />
            <View
              style={(styles.inputBox, { paddingTop: 15, paddingBottom: 20 })}
            >
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isValidMail ? "#dfe4ea" : "orange",
                }}
                autoCapitalize={"none"}
                keyboardType="email-address"
                value={mail}
                onChangeText={(val) => handleMailInput(val)}
                textContentType="emailAddress"
              />
            </View>
            {/* <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Mobile</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isValidNumber ? "#dfe4ea" : "orange",
                }}
                value={mobile}
                onChangeText={(val) => handleMobileInput(val)}
                keyboardType="numeric"
                maxLength={10}
              />
            </View> */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => isValidMail && getOtp()}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            {/* <Text style={styles.registerText}>OR</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => props.navigation.navigate("Home Screen")}
            >
              <Text style={styles.loginButtonText}>Skip</Text>
            </TouchableOpacity> */}
            <Text style={styles.registerText}>OR</Text>
            <Text style={styles.forgotPasswordText}>Login with</Text>
            <View style={styles.thirdPartyIntegrations}>
              {!googleSubmitting && (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleGoogleSignIn}
                >
                  <Icon
                    name="google"
                    type="font-awesome"
                    size={30}
                    color="#808e9b"
                  />
                </TouchableOpacity>
              )}
              {googleSubmitting && (
                <TouchableOpacity style={styles.iconButton} disabled={true}>
                  <Icon
                    name="google"
                    type="font-awesome"
                    size={30}
                    color="#808e9b"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  spinnerTextStyle: {
    color: "#FFF",
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
  thirdPartyIntegrations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: "#dfe4ea",
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 100,
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
  centralizedView: {
    width: "100%",
    top: Dimensions.get("window").height / 4,
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
  loginTitleText: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#444",
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: "#00AFFF",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
  },
});
