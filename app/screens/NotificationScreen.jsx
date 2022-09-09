import * as React from "react";
import { useEffect, useState } from "react";
import {
  Image,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  FlatList,
} from "react-native";
const statusBarHeight = Constants.statusBarHeight;
import { rgbaColor } from "react-native-reanimated/src/reanimated2/Colors";
import Constants from "expo-constants";
import { Caption } from "react-native-paper";
import LoaderScreen from "./LoaderScreen";
import { getAPI } from "../services/http-delegate.service";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SIZE = Dimensions.get("window").width / 3;

const BG_IMG =
  "https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg";
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 5;

export default function NotificationScreen() {
  const [notificationData, setNotificationData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setRefreshing(true);
    getAPI("https://tradertunnel.herokuapp.com/api/push-notification").then(
      (result) => {
        setRefreshing(false);
        if (result.status === 200) {
          setNotificationData(result.data);
        }
      }
    );
  };

  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: statusBarHeight }}>
      <Image
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
      />
      {notificationData && notificationData.length > 0 ? (
        <Animated.FlatList
          data={notificationData}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            padding: SPACING,
            // paddingTop: StatusBar.currentHeight || 42,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadNotifications()}
            />
          }
          renderItem={({ item, index }) => {
            return (
              <Animated.View
                style={{
                  flexDirection: "row",
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: rgbaColor(255, 255, 255, 0.8),
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "800" }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: "500", paddingTop: 10 }}
                  >
                    {item.message}
                  </Text>
                  <Caption style={{ paddingTop: 5 }}>
                    {item.dateInString}
                  </Caption>
                </View>
              </Animated.View>
            );
          }}
        />
      ) : (
        <LoaderScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    borderColor: "#307ecc",
    height: 40,
    fontWeight: "700",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
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
  },
  text: {
    color: "#0c0c0c",
    fontSize: 20,
    fontFamily: "Roboto",
    width: "100%",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 44,
    backgroundColor: "white",
  },
  gridContainerButtons: {
    width: SIZE,
    height: SIZE,
  },
  carouselContainerButtons: {
    width: SIZE / 1.8,
    height: SIZE / 1.9,
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: "space-around",
  },
  navBar: {
    height: 55,
    backgroundColor: "white",
    elevation: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightNav: {
    flexDirection: "row",
  },
  navItem: {
    marginLeft: 25,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  carouselContainer: {
    marginTop: 30,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  itemLabel: {
    color: "white",
    fontSize: 20,
    padding: 20,
  },
  gridIcons: {
    zIndex: 1,
    alignSelf: "flex-end",
    position: "absolute",
    borderRadius: (SIZE + SIZE) / 2,
  },
  gridItemLabel: {
    color: "blue",
    fontSize: 15,
    padding: 20,
    alignSelf: "center",
    width: "100%",
    height: "80%",
    fontWeight: "bold",
    backgroundColor: "lightskyblue",
    alignItems: "center",
    borderRadius: 20,
  },
  carouselItemLabel: {
    color: "blue",
    fontSize: 12,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    fontWeight: "bold",
    alignContent: "center",
    backgroundColor: "lightskyblue",
    padding: 5,
    alignItems: "stretch",
    borderRadius: 10,
  },
  itemLabelButton: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    borderRadius: 20,
    paddingRight: 10,
    paddingTop: 5,
  },
  itemLabelButtonBottom: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "goldenrod",
    borderRadius: 20,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
