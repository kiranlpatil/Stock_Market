import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export default async function httpDelegateService(url, body, token, method) {
  return new Promise(async (resolve) => {
    let requestOptions;
    token = await SecureStore.getItemAsync("token");
    if (token) {
      if (body !== null) {
        requestOptions = {
          method: method ? "PATCH" : "POST",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };
      } else {
        requestOptions = {
          method: method ? "DELETE" : "POST",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        };
      }
    } else {
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
    }
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => {
        Alert.alert(
          err,
          "Unable to connect to network!\nTry again after sometime"
        );
      });
  });
}

export async function getAPI(url) {
  return new Promise(async (resolve) => {
    const token = await SecureStore.getItemAsync("token");
    let requestOptions = {
      method: "GET",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Connection Lost",
          "Unable to connect to network!\nTry again after sometime"
        );
      });
  });
}
