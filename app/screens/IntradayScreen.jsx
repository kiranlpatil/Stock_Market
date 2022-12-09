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
  FlatList,
} from "react-native";
const statusBarHeight = Constants.statusBarHeight;
import Constants from "expo-constants";
import { getAPI } from "../services/http-delegate.service";
import {
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
  Foundation,
  Fontisto,
} from "@expo/vector-icons";
import LoaderScreen from "./LoaderScreen";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SIZE = Dimensions.get("window").width / 3;

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 5;

export default function IntradayScreen(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadStockItems();
  }, []);

  async function loadStockItems() {
    const type = props.route.params.type;
    let link;
    if (type === "Intraday") {
      link =
        "https://traders-tunnel-info.onrender.com/api/stock-items/Intraday%20Buy";
    } else {
      link =
        "https://traders-tunnel-info.onrender.com/api/stock-items/Delivery%20Buy";
    }
    const result = await getAPI(link);
    if (result.status === "success") {
      setItems(result.data);
    }
    return result;
  }

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
      {items.length > 0 ? (
        <Animated.FlatList
          data={items}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            padding: SPACING,
            // paddingTop: StatusBar.currentHeight || 42,
          }}
          renderItem={({ item, index }) => {
            return (
              <Animated.View
                style={{
                  flexDirection: "row",
                  padding: SPACING,
                  marginBottom: SPACING,
                  // backgroundColor: rgbaColor(255, 255, 255, 0.8),
                  elevation: 5,
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                }}
              >
                <View>
                  <View style={styles.itemContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-around",
                      }}
                    >
                      <Text
                        style={{
                          ...styles.itemLabel,
                          justifyContent: "flex-start",
                          borderRadius: 20,
                          alignSelf: "center",
                          flex: 1,
                        }}
                      >
                        {item.stockName}
                      </Text>
                      <TouchableOpacity style={styles.itemLabelButton}>
                        <Text
                          style={{
                            ...styles.itemLabel,
                            justifyContent: "center",
                            borderRadius: 20,
                            fontSize: 17,
                            alignSelf: "center",
                            alignContent: "center",
                            backgroundColor: "green",
                          }}
                        >
                          {item.stockType}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                      }}
                    >
                      <FlatList
                        data={item.stockInnerItems}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            style={{
                              ...styles.carouselContainerButtons,
                              padding: 2,
                              flexDirection: "column",
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "lightgreen",
                                flex: 1,
                                justifyContent: "center",
                                borderRadius: 10,
                                alignContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  padding: 2,
                                  justifyContent: "flex-start",
                                  alignSelf: "center",
                                  fontSize: 13,
                                }}
                              >
                                {index === 0
                                  ? "Target 1"
                                  : index === 1
                                  ? "Target 2"
                                  : index === 2
                                  ? "Target 3"
                                  : "Stop Loss"}
                              </Text>
                              <Text
                                style={{
                                  padding: 1,
                                  justifyContent: "flex-end",
                                  alignSelf: "center",
                                  fontSize: 12,
                                }}
                              >
                                {item.value}
                              </Text>
                              <View
                                style={{
                                  justifyContent: "flex-end",
                                  padding: 2,
                                  paddingRight: 5,
                                  width: "100%",
                                  alignItems: "flex-end",
                                }}
                              >
                                {item.markColor !== "grey" && (
                                  <Ionicons
                                    name="checkmark-circle-sharp"
                                    size={15}
                                    color={item.markColor}
                                  />
                                )}
                                {item.markColor === "grey" && (
                                  <Text style={{ fontSize: 12 }} />
                                )}
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item._id}
                        numColumns={4}
                      />
                    </View>
                    <View style={{ paddingLeft: 12, paddingBottom: 15 }}>
                      <Text style={{ color: "black" }}>
                        {item.dateInString}
                      </Text>
                    </View>
                  </View>
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

    elevation: 2,
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
    fontSize: 18,
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
