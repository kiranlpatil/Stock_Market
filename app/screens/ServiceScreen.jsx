import * as React from "react";
import {
  Image,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from "react-native";
const statusBarHeight = Constants.statusBarHeight;
import { rgbaColor } from "react-native-reanimated/src/reanimated2/Colors";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import faker from "faker";
import { useEffect, useState } from "react";
import { Caption } from "react-native-paper";

faker.seed(10);
const DATA = [
  {
    id: "1",
    title: "FREE FREE ACCOUNT OPENING FREE",
    subTitle:
      '"Open Free_Demat Accountwith us by\n Our Referral Link in Zerodha"',
    caption: " (After successful Account Opening and Only for Active Trader) ",
    body: '"Benefits:- You will get premium service for 1 Year"',
    footer: "WhatsApp Only: 8806572877",
    button: "OPEN NOW",
    url: "https://zerodha.com/open-account?c=QE5071",
  },
  {
    id: "2",
    title: "FREE FREE ACCOUNT OPENING FREE",
    subTitle:
      '"Open Free_Demat Accountwith us by\n Our Referral Link in ANGEL BROKING"',
    caption: " (After successful Account Opening and Only for Active Trader) ",
    body: '"Benefits:- You will get premium service for 1 Year"',
    footer: "WhatsApp Only: 8806572877",
    button: "OPEN NOW",
    url: "https://tinyurl.com/yf4jvoqb",
  },
];

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 25;

export default function ServiceScreen() {
  const [images, imageData] = useState([]);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: statusBarHeight }}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg",
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                // flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: rgbaColor(255, 255, 255, 0.8),
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.4,
                shadowRadius: 20,
                opacity,
                transform: [{ scale }],
              }}
            >
              {/* <Image
                source={require("../../assets/icon-logo.jpeg")}
                style={{
                  width: "100%",
                  height: 130,
                  padding: 0,
                  borderRadius: 10,
                }}
              /> */}

              <View
                style={{ flex: 1, justifyContent: "center", paddingTop: 10 }}
              >
                <Text style={styles.textStyle}>{item.title}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.textStyle}>{item.subTitle}</Text>
                <Caption
                  style={
                    (styles.textStyle, { fontWeight: "bold", fontSize: 13 })
                  }
                >
                  {item.caption}
                </Caption>
                <Text style={styles.textStyle}>{item.body}</Text>
                <Text style={styles.textStyle}>{item.footer}</Text>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: "green",
                    height: 30,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    Linking.openURL(item.url);
                  }}
                >
                  <Text style={{ color: "white" }}>{item.button}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    borderColor: "#307ecc",
    height: 40,
    fontWeight: "700",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: 25,
    color: "darkslategrey",
    fontFamily: "Roboto",
    paddingTop: "30%",
    paddingBottom: "10%",
    textAlign: "center",
    zIndex: 0,
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  enabledButton: {
    height: "60%",
    alignItems: "center",
    backgroundColor: "#307ecc",
    padding: 10,
    borderRadius: 200,
    width: "70%",
    top: "10%",
    fontWeight: "bold",
    color: "darkslategrey",
    fontFamily: "Roboto",
    shadowColor: "#6e6969",
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,

    elevation: 2,
  },
  text: {
    color: "#0c0c0c",
    fontSize: 20,
    fontFamily: "Roboto",
    width: "100%",
    fontWeight: "bold",
  },
});
